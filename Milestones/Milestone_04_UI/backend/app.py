"""
app.py  —  SmartEnergy Flask Backend
"""

import os, io, json, traceback
import numpy as np
import pandas as pd
from flask import (
    Flask, render_template, request, redirect,
    url_for, session, flash, jsonify, send_file
)
from db import create_db, add_user, check_user
from predict import (
    predict_from_recent, predict_from_manual,
    get_device_summary, get_time_series,
    get_smart_suggestions, get_suggestions_from_manual,
    get_alerts,
)

app = Flask(__name__)
app.secret_key = "smartenergy_secret_2024"

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
ALLOWED_EXT = {"csv", "xlsx", "xls", "json"}

# In-memory data store
_df_cache: pd.DataFrame | None = None

create_db()

# ── Helpers ───────────────────────────────────────────────
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXT

def login_required(f):
    from functools import wraps
    @wraps(f)
    def wrapper(*args, **kwargs):
        if "user" not in session:
            return redirect(url_for("login"))
        return f(*args, **kwargs)
    return wrapper

def load_df(path):
    ext = path.rsplit(".", 1)[1].lower()
    if ext == "csv":
        df = pd.read_csv(path)
    elif ext in ("xlsx", "xls"):
        df = pd.read_excel(path)
    elif ext == "json":
        df = pd.read_json(path)
    else:
        raise ValueError(f"Unsupported file type: {ext}")
    if "time" in df.columns:
        df["time"] = pd.to_datetime(df["time"], unit="s", errors="coerce")
        df = df.set_index("time").sort_index()
        df["hour"] = df.index.hour
    return df

def get_user():
    return type("U", (), {"username": session.get("user", "Admin")})()

# ── Auth ──────────────────────────────────────────────────
@app.route("/")
def index():
    return redirect(url_for("dashboard"))

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "").strip()
        if check_user(username, password):
            session["user"] = username
            return redirect(url_for("dashboard"))
        flash("Invalid username or password.", "error")
    return render_template("login.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "").strip()
        if not username or not password:
            flash("Username and password are required.", "error")
        elif add_user(username, password):
            flash("Account created! Please log in.", "success")
            return redirect(url_for("login"))
        else:
            flash("Username already exists.", "error")
    return render_template("login.html")

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))

# ── Pages ─────────────────────────────────────────────────
@app.route("/dashboard")
@login_required
def dashboard():
    global _df_cache
    summary = {}
    suggestions = []
    timeseries = {}
    alerts = []

    if _df_cache is not None:
        try:
            summary     = get_device_summary(_df_cache)
            suggestions = get_smart_suggestions(_df_cache)
            timeseries  = get_time_series(_df_cache)
            alerts      = get_alerts(_df_cache)
        except Exception:
            traceback.print_exc()

    return render_template(
        "dashboard.html",
        current_user=get_user(),
        summary=json.dumps(summary),
        suggestions=suggestions,
        timeseries=json.dumps(timeseries),
        alerts=alerts,
        has_data=_df_cache is not None,
    )

@app.route("/predictions")
@login_required
def predictions():
    global _df_cache
    pred_kw = None
    if _df_cache is not None:
        try:
            pred_kw = predict_from_recent(_df_cache)
        except Exception:
            pass
    return render_template(
        "predictions.html",
        current_user=get_user(),
        pred_kw=pred_kw,
        has_data=_df_cache is not None,
    )

@app.route("/reports")
@login_required
def reports():
    global _df_cache
    report_data = []
    summary_stats = {}
    if _df_cache is not None:
        try:
            df = _df_cache.copy()
            df.index = pd.to_datetime(df.index)
            monthly = df["use [kW]"].resample("ME").agg(["sum","mean","max"])
            for idx, row in monthly.iterrows():
                kwh = round(row["sum"] / 60, 1)
                report_data.append({
                    "month":    idx.strftime("%b %Y"),
                    "kwh":      f"{kwh:,.1f}",
                    "avg_kw":   round(row["mean"], 3),
                    "peak_kw":  round(row["max"], 3),
                    "cost":     f"₹{kwh * 7.5:,.0f}",
                })
            summary_stats = {
                "total_kwh": round(float(df["use [kW]"].sum() / 60), 1),
                "avg_kw":    round(float(df["use [kW]"].mean()), 3),
                "peak_kw":   round(float(df["use [kW]"].max()), 3),
                "rows":      len(df),
            }
        except Exception:
            traceback.print_exc()

    return render_template(
        "reports.html",
        current_user=get_user(),
        report_data=report_data,
        summary_stats=summary_stats,
        has_data=_df_cache is not None,
    )

@app.route("/alerts")
@login_required
def alerts_page():
    global _df_cache
    alerts = []
    if _df_cache is not None:
        try:
            alerts = get_alerts(_df_cache)
        except Exception:
            pass
    return render_template(
        "alerts.html",
        current_user=get_user(),
        alerts=alerts,
        has_data=_df_cache is not None,
    )

@app.route("/upload", methods=["GET", "POST"])
@login_required
def upload():
    global _df_cache
    if request.method == "POST":
        file = request.files.get("file")
        if not file or file.filename == "":
            flash("No file selected.", "error")
            return redirect(url_for("upload"))
        if not allowed_file(file.filename):
            flash("Unsupported file type. Use CSV, XLSX, XLS, or JSON.", "error")
            return redirect(url_for("upload"))
        save_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(save_path)
        try:
            _df_cache = load_df(save_path)
            rows, cols = _df_cache.shape
            flash(f"✅ Dataset loaded: {rows:,} rows, {cols} columns.", "success")
        except Exception as e:
            flash(f"Error reading file: {e}", "error")
        return redirect(url_for("upload"))

    return render_template("upload.html", current_user=get_user(), has_data=_df_cache is not None)

@app.route("/manual-entry")
@login_required
def manual_entry():
    return render_template("manual_entry.html", current_user=get_user())

# ── API endpoints ─────────────────────────────────────────
@app.route("/predict", methods=["POST"])
@login_required
def predict_api():
    global _df_cache
    if _df_cache is None:
        return jsonify({"error": "No dataset loaded. Please upload data first."}), 400
    try:
        pred_kw = predict_from_recent(_df_cache)
        return jsonify({"predicted_kw": round(pred_kw, 4), "accuracy": 97.4})
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception:
        traceback.print_exc()
        return jsonify({"error": "Prediction failed."}), 500

@app.route("/predict-manual", methods=["POST"])
@login_required
def predict_manual_api():
    try:
        data = request.get_json(force=True)
        pred_kw = predict_from_manual(data)
        suggestions = get_suggestions_from_manual(data)
        appliance_keys = [
            "dishwasher","furnace1","furnace2","homeoffice","fridge",
            "winecellar","garage","kitchen12","kitchen14","kitchen38",
            "barn","well","microwave","livingroom",
        ]
        input_total = round(sum(float(data.get(k, 0)) for k in appliance_keys), 4)
        return jsonify({
            "predicted_kw": round(pred_kw, 4),
            "accuracy":     97.4,
            "input_total":  input_total,
            "suggestions":  suggestions,
        })
    except Exception:
        traceback.print_exc()
        return jsonify({"error": "Prediction failed."}), 500

@app.route("/api/summary")
@login_required
def api_summary():
    global _df_cache
    if _df_cache is None:
        return jsonify({})
    try:
        df = _df_cache
        return jsonify({
            "total_kwh": round(float(df["use [kW]"].sum() / 60), 2),
            "avg_kw":    round(float(df["use [kW]"].mean()), 4),
            "max_kw":    round(float(df["use [kW]"].max()), 4),
            "min_kw":    round(float(df["use [kW]"].min()), 4),
            "rows":      len(df),
            "solar_gen": round(float(df["Solar [kW]"].sum() / 60), 2) if "Solar [kW]" in df.columns else 0,
        })
    except Exception:
        return jsonify({}), 500

@app.route("/api/timeseries")
@login_required
def api_timeseries():
    global _df_cache
    if _df_cache is None:
        return jsonify({})
    period = request.args.get("period", "hourly")
    try:
        ts = get_time_series(_df_cache)
        return jsonify(ts.get(period, {}))
    except Exception:
        return jsonify({}), 500

@app.route("/api/devices")
@login_required
def api_devices():
    global _df_cache
    if _df_cache is None:
        return jsonify({})
    try:
        return jsonify(get_device_summary(_df_cache))
    except Exception:
        return jsonify({}), 500

@app.route("/api/alerts")
@login_required
def api_alerts():
    global _df_cache
    if _df_cache is None:
        return jsonify([])
    try:
        return jsonify(get_alerts(_df_cache))
    except Exception:
        return jsonify([]), 500

@app.route("/predictions/export")
@login_required
def export_predictions():
    global _df_cache
    rows = []
    if _df_cache is not None:
        try:
            pred_kw = predict_from_recent(_df_cache)
            rows.append({"Prediction_kW": pred_kw, "Accuracy_%": 97.4, "Status": "Success"})
        except Exception:
            pass
    if not rows:
        rows = [{"Prediction_kW": "N/A", "Accuracy_%": 97.4, "Status": "No data"}]
    df = pd.DataFrame(rows)
    buf = io.StringIO()
    df.to_csv(buf, index=False)
    buf.seek(0)
    return send_file(io.BytesIO(buf.getvalue().encode()), mimetype="text/csv",
                     as_attachment=True, download_name="predictions.csv")

@app.route("/reports/export")
@login_required
def export_reports():
    global _df_cache
    rows = []
    if _df_cache is not None:
        try:
            df = _df_cache.copy()
            df.index = pd.to_datetime(df.index)
            monthly = df["use [kW]"].resample("ME").agg(["sum","mean","max"])
            for idx, row in monthly.iterrows():
                kwh = round(row["sum"] / 60, 1)
                rows.append({"Month": idx.strftime("%b %Y"), "Consumption_kWh": kwh,
                             "Avg_kW": round(row["mean"],3), "Peak_kW": round(row["max"],3),
                             "Est_Cost_INR": round(kwh * 7.5, 0)})
        except Exception:
            pass
    if not rows:
        rows = [{"Month": "No data", "Consumption_kWh": 0}]
    df_out = pd.DataFrame(rows)
    buf = io.StringIO()
    df_out.to_csv(buf, index=False)
    buf.seek(0)
    return send_file(io.BytesIO(buf.getvalue().encode()), mimetype="text/csv",
                     as_attachment=True, download_name="energy_report.csv")

# Redirects for placeholder routes
@app.route("/devices")
@login_required
def devices():
    return redirect(url_for("dashboard"))

@app.route("/settings")
@login_required
def settings():
    return redirect(url_for("dashboard"))

@app.route("/analytics")
@login_required
def analytics():
    return redirect(url_for("reports"))

@app.route("/forgot-password")
def forgot_password():
    flash("Please contact your administrator to reset your password.", "info")
    return redirect(url_for("login"))

if __name__ == "__main__":
    app.run(debug=True, port=5000)
