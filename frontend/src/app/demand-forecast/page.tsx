'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { demandAPI } from '@/lib/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function DemandForecastPage() {
    const [forecast, setForecast] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ cropType: 'wheat', region: 'north', days: 30 });

    useEffect(() => {
        const fetchForecast = async () => {
            setLoading(true);
            try {
                const response = await demandAPI.getForecast(filters.cropType, filters.region, filters.days);
                setForecast(response.data);
            } catch (error) {
                console.error('Error fetching forecast:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchForecast();
    }, [filters]);

    return (
        <DashboardLayout>
            <div style={{ maxWidth: '1400px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#f1f5f9', marginBottom: '8px' }}>
                    📊 Demand Forecast
                </h1>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '32px' }}>
                    30-60 day market demand predictions with seasonal spike detection.
                </p>

                {/* Filters */}
                <div className="glass-card" style={{ padding: '20px', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>Crop Type</label>
                        <select className="form-select" value={filters.cropType} onChange={(e) => setFilters({ ...filters, cropType: e.target.value })}>
                            <option value="wheat">Wheat</option>
                            <option value="rice">Rice</option>
                            <option value="corn">Corn</option>
                        </select>
                    </div>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>Region</label>
                        <select className="form-select" value={filters.region} onChange={(e) => setFilters({ ...filters, region: e.target.value })}>
                            <option value="north">North</option>
                            <option value="south">South</option>
                            <option value="east">East</option>
                            <option value="west">West</option>
                            <option value="central">Central</option>
                        </select>
                    </div>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>Forecast Days</label>
                        <select className="form-select" value={filters.days} onChange={(e) => setFilters({ ...filters, days: parseInt(e.target.value) })}>
                            <option value="30">30 Days</option>
                            <option value="60">60 Days</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading forecast data...</div>
                ) : forecast ? (
                    <>
                        {/* Summary Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                            {[
                                { label: 'Total Demand', value: `${forecast.totalPredictedDemand} tons`, icon: '📦', color: '#3b82f6' },
                                { label: 'Avg Daily', value: `${forecast.avgDailyDemand} tons`, icon: '📈', color: '#22c55e' },
                                { label: 'Peak Demand', value: `${forecast.peakDemand} tons`, icon: '🔥', color: '#f59e0b' },
                                { label: 'Festival Spikes', value: forecast.festivalSpikes.length, icon: '🎉', color: '#8b5cf6' },
                            ].map((card, i) => (
                                <div key={i} className="glass-card" style={{ padding: '20px' }}>
                                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>{card.icon}</div>
                                    <div style={{ fontSize: '24px', fontWeight: 800, color: '#f1f5f9', marginBottom: '4px' }}>{card.value}</div>
                                    <div style={{ fontSize: '12px', color: '#64748b' }}>{card.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Chart */}
                        <div className="chart-container" style={{ marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9', marginBottom: '20px' }}>30-Day Demand Trend</h2>
                            <ResponsiveContainer width="100%" height={350}>
                                <LineChart data={forecast.dailyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="date" stroke="#64748b" style={{ fontSize: '12px' }}
                                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                                    <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                                    <Tooltip contentStyle={{
                                        background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '10px', color: '#f1f5f9', fontSize: '13px',
                                    }} />
                                    <Legend wrapperStyle={{ color: '#94a3b8', fontSize: '13px' }} />
                                    <Line type="monotone" dataKey="demand" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', r: 3 }}
                                        activeDot={{ r: 6, fill: '#22c55e' }} name="Demand (tons)" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Festival Spikes */}
                        {forecast.festivalSpikes.length > 0 && (
                            <div className="glass-card" style={{ padding: '24px' }}>
                                <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9', marginBottom: '16px' }}>🎉 Festival Demand Spikes</h2>
                                <div style={{ display: 'grid', gap: '12px' }}>
                                    {forecast.festivalSpikes.map((spike: any, i: number) => (
                                        <div key={i} style={{
                                            padding: '14px 16px', borderRadius: '10px',
                                            background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)',
                                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        }}>
                                            <div>
                                                <div style={{ fontSize: '14px', fontWeight: 600, color: '#c4b5fd' }}>{spike.festivalName}</div>
                                                <div style={{ fontSize: '12px', color: '#64748b' }}>{new Date(spike.date).toLocaleDateString()}</div>
                                            </div>
                                            <div style={{ fontSize: '18px', fontWeight: 700, color: '#a78bfa' }}>{spike.demand} tons</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                ) : null}
            </div>
        </DashboardLayout>
    );
}
