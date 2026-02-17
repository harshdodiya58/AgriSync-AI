'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { alertAPI } from '@/lib/api';

export default function AlertsPage() {
    const [alerts, setAlerts] = useState<any[]>([]);
    const [summary, setSummary] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchAlerts = async () => {
            setLoading(true);
            try {
                const response = await alertAPI.getAlerts(filter === 'all' ? undefined : filter);
                setAlerts(response.data);
                setSummary(response.summary);
            } catch (error) {
                console.error('Error fetching alerts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAlerts();
    }, [filter]);

    return (
        <DashboardLayout>
            <div style={{ maxWidth: '1200px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#f1f5f9', marginBottom: '8px' }}>
                    🔔 Alerts & Notifications
                </h1>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '32px' }}>
                    Real-time alerts for supply-demand imbalances and actionable recommendations.
                </p>

                {/* Summary Cards */}
                {summary && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                        {[
                            { label: 'Total Alerts', value: summary.total, icon: '🔔', color: '#3b82f6' },
                            { label: 'Oversupply', value: summary.oversupply, icon: '📦', color: '#f59e0b' },
                            { label: 'Shortage', value: summary.shortage, icon: '⚠️', color: '#ef4444' },
                            { label: 'Critical', value: summary.critical, icon: '🚨', color: '#dc2626' },
                        ].map((card, i) => (
                            <div key={i} className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
                                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{card.icon}</div>
                                <div style={{ fontSize: '32px', fontWeight: 800, color: '#f1f5f9', marginBottom: '4px' }}>{card.value}</div>
                                <div style={{ fontSize: '12px', color: '#64748b' }}>{card.label}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Filter */}
                <div style={{ marginBottom: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['all', 'oversupply', 'shortage'].map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                            style={{
                                padding: '8px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 600,
                                background: filter === f ? 'rgba(34,197,94,0.15)' : 'rgba(15,23,42,0.8)',
                                border: filter === f ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(255,255,255,0.06)',
                                color: filter === f ? '#4ade80' : '#94a3b8',
                                cursor: 'pointer', transition: 'all 0.2s ease', textTransform: 'capitalize',
                            }}
                        >{f === 'all' ? 'All Alerts' : f}</button>
                    ))}
                </div>

                {/* Alerts List */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading alerts...</div>
                ) : alerts.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {alerts.map((alert, i) => (
                            <div key={i} className="glass-card" style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span className={`badge badge-${alert.alertType === 'oversupply' ? 'warning' : 'danger'}`}>
                                            {alert.alertType}
                                        </span>
                                        <span className={`badge badge-${alert.severity === 'critical' ? 'danger' : alert.severity === 'high' ? 'warning' : 'info'}`}>
                                            {alert.severity}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#475569' }}>
                                        {new Date(alert.createdAt).toLocaleString()}
                                    </div>
                                </div>
                                <div style={{ marginBottom: '12px' }}>
                                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#e2e8f0', marginBottom: '6px' }}>
                                        {alert.cropType.charAt(0).toUpperCase() + alert.cropType.slice(1)} — {alert.region} Region
                                    </div>
                                    <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', gap: '20px' }}>
                                        <span>Supply: <strong style={{ color: '#22c55e' }}>{alert.supply} tons</strong></span>
                                        <span>Demand: <strong style={{ color: '#3b82f6' }}>{alert.demand} tons</strong></span>
                                        <span>Imbalance: <strong style={{ color: alert.imbalance > 0 ? '#f59e0b' : '#ef4444' }}>
                                            {alert.imbalance > 0 ? '+' : ''}{alert.imbalance} tons ({alert.imbalancePercentage}%)
                                        </strong></span>
                                    </div>
                                </div>
                                <div style={{
                                    padding: '12px 16px', borderRadius: '10px',
                                    background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)',
                                }}>
                                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#4ade80', marginBottom: '4px' }}>💡 Recommendation</div>
                                    <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6 }}>{alert.recommendation}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="glass-card" style={{ padding: '60px', textAlign: 'center' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                        <div style={{ fontSize: '16px', fontWeight: 600, color: '#e2e8f0', marginBottom: '8px' }}>No Active Alerts</div>
                        <div style={{ fontSize: '14px', color: '#64748b' }}>All supply-demand balances are optimal.</div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
