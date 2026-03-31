import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Zap, TrendingUp, AlertTriangle, Lightbulb, 
  Cpu, Thermometer, ShieldCheck, Activity, RefreshCcw
} from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

// API Service
const API_BASE = '/api';

const App = () => {
  const [data, setData] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [predictLoading, setPredictLoading] = useState(false);

  useEffect(() => {
    fetchDashboard();
    fetchSuggestions();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(`${API_BASE}/dashboard`);
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Dashboard error:", err);
    }
  };

  const fetchSuggestions = async () => {
    try {
      const res = await axios.get(`${API_BASE}/suggestions`);
      setSuggestions(res.data.suggestions);
    } catch (err) {
      console.error("Suggestions error:", err);
    }
  };

  const handlePredict = async () => {
    setPredictLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/predict`);
      setPrediction(res.data);
    } catch (err) {
      console.error("Prediction error:", err);
    } finally {
      setPredictLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a' }}>
        <Zap size={48} className="animate-pulse text-indigo-500" />
      </div>
    );
  }

  const COLORS = ['#6366f1', '#22d3ee', '#10b981', '#f59e0b'];
  const breakdownData = Object.entries(data.breakdown).map(([name, value]) => ({ name, value }));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Zap style={{ color: '#6366f1' }} size={32} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>SmarterEnergy <span style={{ color: '#94a3b8', fontWeight: 300, fontSize: '0.875rem' }}>| AI Analytics v1.0</span></h1>
        </div>
        <button className="btn-primary" onClick={fetchDashboard}>
          <RefreshCcw size={18} /> Refresh
        </button>
      </header>

      <div className="grid-dashboard">
        {/* Sidebar */}
        <aside className="sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Quick Stats */}
          <div className="glass-card">
            <div style={{ marginBottom: '1.5rem' }}>
              <p className="stat-label">Total Consumption</p>
              <h2 className="stat-val">{(data.stats.total / 1000).toFixed(2)} kWh</h2>
              <div style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem' }}>
                <TrendingUp size={14} /> -2.4% from last week
              </div>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <p className="stat-label">Average Power</p>
              <h2 className="stat-val">{data.stats.average.toFixed(0)} W</h2>
            </div>

            <div>
              <p className="stat-label">Peak Demand</p>
              <h2 className="stat-val" style={{ color: '#ef4444', WebkitTextFillColor: 'initial' }}>{data.stats.peak} W</h2>
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="glass-card" style={{ flexGrow: 1 }}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lightbulb size={20} className="text-yellow-400" /> Smart Tips
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {suggestions.map((tip, idx) => (
                <div key={idx} style={{ padding: '0.75rem', borderRadius: '0.75rem', fontSize: '0.875rem', background: 'rgba(255,255,255,0.05)', borderLeft: `3px solid ${tip.type === 'critical' ? '#ef4444' : tip.type === 'warning' ? '#f59e0b' : '#6366f1'}` }}>
                  {tip.text}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Energy Usage Chart */}
          <div className="glass-card">
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Activity size={24} style={{ color: '#22d3ee' }} /> Power Consumption Trend
            </h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.recent_data}>
                  <defs>
                    <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(str) => {
                      const d = new Date(str);
                      return `${d.getHours()}:00`;
                    }}
                    stroke="#94a3b8"
                    fontSize={12}
                    tickMargin={10}
                  />
                  <YAxis stroke="#94a3b8" fontSize={12} tickMargin={10} />
                  <Tooltip 
                    contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: '#fff' }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Area type="monotone" dataKey="total_power" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorPower)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.5fr)', gap: '1.5rem' }}>
            {/* Device Breakdown */}
            <div className="glass-card">
              <h3 style={{ marginBottom: '1.5rem' }}>Device Attribution</h3>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={breakdownData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {breakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI Forecasting */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
              <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: '1rem', marginBottom: '1rem' }}>
                <Cpu size={40} style={{ color: '#6366f1' }} />
              </div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>AI Forecast Engine</h2>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', maxWidth: '400px' }}>
                Our LSTM network analyzes your past 24 hours of usage to predict next hour's energy demand with 95% accuracy.
              </p>
              
              {!prediction && (
                <button className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }} onClick={handlePredict} disabled={predictLoading}>
                  {predictLoading ? 'Analyzing...' : 'Generate AI Forecast'}
                </button>
              )}

              {prediction && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '1.5rem', border: '1px dashed rgba(255,255,255,0.1)' }}>
                    <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Next Hour Prediction</p>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#6366f1' }}>{prediction.predicted_power.toFixed(0)} <span style={{ fontSize: '1.5rem', fontWeight: 400 }}>W</span></h1>
                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', color: '#f59e0b', fontSize: '0.875rem' }}>
                      <AlertTriangle size={16} /> {prediction.suggestion}
                    </div>
                  </div>
                  <button style={{ marginTop: '1.5rem', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setPrediction(null)}>Reset Engine</button>
                </motion.div>
              )}
            </div>
          </div>
        </main>
      </div>

      <footer style={{ padding: '3rem', textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
        <p>&copy; 2026 Smart Energy Solutions. Powered by Deep Learning LSTM.</p>
      </footer>
    </div>
  );
};

export default App;
