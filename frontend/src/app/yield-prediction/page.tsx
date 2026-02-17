'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { yieldAPI } from '@/lib/api';

export default function YieldPredictionPage() {
    const [formData, setFormData] = useState({
        cropType: 'wheat',
        region: 'north',
        landSize: '',
        soilType: 'loamy',
        weatherForecast: 'normal',
    });
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await yieldAPI.predict({
                ...formData,
                landSize: parseFloat(formData.landSize),
            });
            setResult(response.data);
        } catch (err: any) {
            setError(err.message || 'Prediction failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div style={{ maxWidth: '1200px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#f1f5f9', marginBottom: '8px' }}>
                    🌾 Yield Prediction
                </h1>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '32px' }}>
                    Predict crop yields using AI-powered analysis of soil, weather, and land data.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: '24px' }}>
                    {/* Form */}
                    <div className="glass-card" style={{ padding: '28px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9', marginBottom: '20px' }}>Input Parameters</h2>
                        {error && (
                            <div className="badge-danger" style={{ width: '100%', padding: '12px 16px', marginBottom: '20px', borderRadius: '10px' }}>
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>Crop Type</label>
                                    <select className="form-select" value={formData.cropType} onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}>
                                        <option value="wheat">Wheat</option>
                                        <option value="rice">Rice</option>
                                        <option value="corn">Corn</option>
                                        <option value="soybean">Soybean</option>
                                        <option value="cotton">Cotton</option>
                                        <option value="sugarcane">Sugarcane</option>
                                        <option value="potato">Potato</option>
                                        <option value="tomato">Tomato</option>
                                        <option value="onion">Onion</option>
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
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>Land Size (acres)</label>
                                    <input type="number" step="0.1" className="form-input" placeholder="e.g., 10.5"
                                        value={formData.landSize} onChange={(e) => setFormData({ ...formData, landSize: e.target.value })} required />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>Soil Type</label>
                                    <select className="form-select" value={formData.soilType} onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}>
                                        <option value="loamy">Loamy</option>
                                        <option value="clay">Clay</option>
                                        <option value="sandy">Sandy</option>
                                        <option value="silt">Silt</option>
                                        <option value="peat">Peat</option>
                                        <option value="chalky">Chalky</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>Weather Forecast</label>
                                    <select className="form-select" value={formData.weatherForecast} onChange={(e) => setFormData({ ...formData, weatherForecast: e.target.value })}>
                                        <option value="sunny">☀️ Sunny</option>
                                        <option value="normal">🌤️ Normal</option>
                                        <option value="cloudy">☁️ Cloudy</option>
                                        <option value="rainy">🌧️ Rainy</option>
                                        <option value="stormy">⛈️ Stormy</option>
                                        <option value="drought">🏜️ Drought</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', marginTop: '24px', padding: '14px' }}>
                                {loading ? 'Predicting...' : '🚀 Predict Yield'}
                            </button>
                        </form>
                    </div>

                    {/* Results */}
                    {result && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div className="glass-card glow-green" style={{ padding: '28px', textAlign: 'center' }}>
                                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Predicted Yield</div>
                                <div className="gradient-text-green" style={{ fontSize: '48px', fontWeight: 800, marginBottom: '4px' }}>
                                    {result.predictedYield}
                                </div>
                                <div style={{ fontSize: '16px', color: '#94a3b8', fontWeight: 500 }}>tons</div>
                            </div>

                            <div className="glass-card" style={{ padding: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                    <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 600 }}>Risk Score</span>
                                    <span className={`badge badge-${result.riskScore === 'Low' ? 'success' : result.riskScore === 'Medium' ? 'warning' : 'danger'}`}>
                                        {result.riskScore}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 600 }}>Confidence</span>
                                    <span style={{ fontSize: '18px', fontWeight: 700, color: '#22c55e' }}>{result.confidence}%</span>
                                </div>
                            </div>

                            <div className="glass-card" style={{ padding: '20px', background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)' }}>
                                <div style={{ fontSize: '13px', color: '#4ade80', fontWeight: 600, marginBottom: '8px' }}>✓ Prediction Complete</div>
                                <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6 }}>
                                    Based on {formData.landSize} acres of {formData.cropType} in {formData.region} region with {formData.soilType} soil under {formData.weatherForecast} conditions.
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
