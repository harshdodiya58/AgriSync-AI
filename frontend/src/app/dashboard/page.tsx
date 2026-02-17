'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { alertAPI } from '@/lib/api';

export default function DashboardPage() {
    const { user } = useAuth();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await alertAPI.getStats();
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const kpiCards = [
        { label: 'Total Users', value: stats?.totalUsers || 0, icon: '👥', color: '#0EA5E9', trend: '+12%' },
        { label: 'Predictions Made', value: stats?.totalPredictions || 0, icon: '🌾', color: '#10B981', trend: '+24%' },
        { label: 'Avg Yield (tons)', value: stats?.avgYield || 0, icon: '📊', color: '#8B5CF6', trend: '+8%' },
        { label: 'Active Alerts', value: stats?.recentAlerts?.length || 0, icon: '🔔', color: '#F97316', trend: '-5%' },
    ];

    return (
        <DashboardLayout>
            <div style={{ maxWidth: '1400px' }}>
                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                    <h1 className="gradient-text" style={{ fontSize: '32px', fontWeight: 900, marginBottom: '8px' }}>
                        Welcome back, {user?.name} 👋
                    </h1>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                        Here's what's happening with your farm intelligence today.
                    </p>
                </div>

                {/* KPI Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                    {kpiCards.map((card, i) => (
                        <div key={i} className="kpi-card">
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <div style={{
                                    width: '52px', height: '52px', borderRadius: '14px',
                                    background: `${card.color}20`, border: `2px solid ${card.color}40`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '24px',
                                }}>{card.icon}</div>
                                <span style={{
                                    fontSize: '12px', padding: '5px 12px', borderRadius: '8px',
                                    background: card.trend.startsWith('+') ? 'rgba(16,185,129,0.2)' : 'rgba(236,72,153,0.2)',
                                    color: card.trend.startsWith('+') ? '#34D399' : '#F472B6',
                                    fontWeight: 700,
                                    border: card.trend.startsWith('+') ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(236,72,153,0.3)',
                                }}>{card.trend}</span>
                            </div>
                            <div style={{ fontSize: '36px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '6px', letterSpacing: '-0.02em' }}>
                                {loading ? '...' : card.value}
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>{card.label}</div>
                        </div>
                    ))}
                </div>

                {/* Recent Alerts */}
                <div className="glass-card" style={{ padding: '24px' }}>
                    <h2 className="gradient-text-purple" style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>🔔</span> Recent Alerts
                    </h2>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading alerts...</div>
                    ) : stats?.recentAlerts?.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {stats.recentAlerts.slice(0, 5).map((alert: any, i: number) => (
                                <div key={i} style={{
                                    padding: '16px', borderRadius: '10px',
                                    background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.06)',
                                    display: 'flex', alignItems: 'center', gap: '16px',
                                }}>
                                    <span className={`badge badge-${alert.alertType === 'oversupply' ? 'warning' : 'danger'}`}>
                                        {alert.alertType}
                                    </span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#e2e8f0', marginBottom: '4px' }}>
                                            {alert.cropType.charAt(0).toUpperCase() + alert.cropType.slice(1)} — {alert.region}
                                        </div>
                                        <div style={{ fontSize: '13px', color: '#64748b' }}>{alert.recommendation}</div>
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#475569', whiteSpace: 'nowrap' }}>
                                        {new Date(alert.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                            No recent alerts. System is balanced.
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    {[
                        { label: 'Predict Yield', href: '/yield-prediction', icon: '🌾', color: '#22c55e' },
                        { label: 'View Forecast', href: '/demand-forecast', icon: '📊', color: '#3b82f6' },
                        { label: 'Check Sync', href: '/synchronization', icon: '🔄', color: '#8b5cf6' },
                    ].map((action, i) => (
                        <a key={i} href={action.href} style={{
                            padding: '20px', borderRadius: '12px', textDecoration: 'none',
                            background: `${action.color}10`, border: `1px solid ${action.color}30`,
                            display: 'flex', alignItems: 'center', gap: '12px',
                            transition: 'all 0.2s ease', cursor: 'pointer',
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            <span style={{ fontSize: '24px' }}>{action.icon}</span>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: '#e2e8f0' }}>{action.label}</span>
                        </a>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
