'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { syncAPI } from '@/lib/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function SynchronizationPage() {
    const [formData, setFormData] = useState({ cropType: 'wheat', region: 'north', supply: '', demand: '' });
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await syncAPI.compare({
                ...formData,
                supply: parseFloat(formData.supply),
                demand: parseFloat(formData.demand),
            });
            setResult(response.data);
        } catch (err: any) {
            setError(err.message || 'Sync comparison failed');
        } finally {
            setLoading(false);
        }
    };

    const chartData = result ? [
        { name: 'Supply', value: result.supply, fill: '#22c55e' },
        { name: 'Demand', value: result.demand, fill: '#3b82f6' },
    ] : [];

    return (
        <DashboardLayout>
            <div style={{ maxWidth: '1200px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#f1f5f9', marginBottom: '8px' }}>
                    🔄 Supply-Demand Synchronization
                </h1>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '32px' }}>
                    Compare farm supply with market demand to identify imbalances and get recommendations.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: '24px' }}>
                    {/* Form */}
                    <div className="glass-card" style={{ padding: '28px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9', marginBottom: '20px' }}>Input Data</h2>
                        {error && <div className="badge-danger" style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '10px' }}>{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>Crop Type</label>
                                    <select className="form-select" value={formData.cropType} onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}>
                                        <option value="wheat">Wheat</option>
                                        <option value="rice">Rice</option>
                                        <option value="corn">Corn</option>
                                        <option value="soybean">Soybean</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>Region</label>
                                    <select className="form-select" value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })}>
                                        <option value="north">North</option>
                                        <option value="south">South</option>
                                        <option value="east">East</option>
                                        <option value="west">West</option>
                                        <option value="central">Central</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>Supply (tons)</label>
                                    <input type="number" step="0.1" className="form-input" placeholder="e.g., 5000"
                                        value={formData.supply} onChange={(e) => setFormData({ ...formData, supply: e.target.value })} required />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>Demand (tons)</label>
                                    <input type="number" step="0.1" className="form-input" placeholder="e.g., 3200"
                                        value={formData.demand} onChange={(e) => setFormData({ ...formData, demand: e.target.value })} required />
                                </div>
                            </div>
                            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', marginTop: '24px', padding: '14px' }}>
                                {loading ? 'Analyzing...' : '🔄 Compare & Sync'}
                            </button>
                        </form>
                    </div>

                    {/* Results */}
                    {result && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {/* Chart */}
                            <div className="chart-container">
                                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9', marginBottom: '16px' }}>Supply vs Demand</h3>
                                <ResponsiveContainer width="100%" height={200}>
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                        <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: '13px' }} />
                                        <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                                        <Tooltip contentStyle={{
                                            background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '10px', color: '#f1f5f9', fontSize: '13px',
                                        }} />
                                        <Bar dataKey="value" radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Imbalance Card */}
                            <div className={`glass-card ${result.alertType === 'oversupply' ? 'glow-blue' : result.alertType === 'shortage' ? 'glow-purple' : 'glow-green'}`}
                                style={{ padding: '24px', textAlign: 'center' }}>
                                <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                                    Imbalance
                                </div>
                                <div style={{ fontSize: '36px', fontWeight: 800, color: result.imbalance > 0 ? '#3b82f6' : '#ef4444', marginBottom: '8px' }}>
                                    {result.imbalance > 0 ? '+' : ''}{result.imbalance} tons
                                </div>
                                <span className={`badge badge-${result.alertType === 'oversupply' ? 'warning' : result.alertType === 'shortage' ? 'danger' : 'success'}`}>
                                    {result.alertType.toUpperCase()}
                                </span>
                            </div>

                            {/* Recommendation */}
                            <div className="glass-card" style={{ padding: '20px', background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)' }}>
                                <div style={{ fontSize: '13px', fontWeight: 700, color: '#4ade80', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span>💡</span> AI Recommendation
                                </div>
                                <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.7 }}>
                                    {result.recommendation}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
