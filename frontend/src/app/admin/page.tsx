'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { adminAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

export default function AdminPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState<any>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

    useEffect(() => {
        if (user && user.role !== 'admin') {
            router.push('/dashboard');
            return;
        }
        fetchData();
    }, [user, router, currentPage, searchTerm, roleFilter]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [statsRes, usersRes] = await Promise.all([
                adminAPI.getSystemStats(),
                adminAPI.getAllUsers(searchTerm, roleFilter, currentPage, 10)
            ]);
            setStats(statsRes.data);
            setUsers(usersRes.data);
            setTotalPages(usersRes.totalPages);
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleUpdate = async (userId: string, newRole: string) => {
        try {
            await adminAPI.updateUserRole(userId, newRole);
            setEditingUser(null);
            fetchData();
        } catch (error: any) {
            alert(error.message || 'Failed to update role');
        }
    };

    const handleDeleteUser = async (userId: string) => {
        try {
            await adminAPI.deleteUser(userId);
            setShowDeleteConfirm(null);
            fetchData();
        } catch (error: any) {
            alert(error.message || 'Failed to delete user');
        }
    };

    if (!user || user.role !== 'admin') return null;

    return (
        <DashboardLayout>
            <div style={{ maxWidth: '1400px' }}>
                <h1 className="gradient-text" style={{ fontSize: '32px', fontWeight: 900, marginBottom: '8px' }}>
                    👑 Admin Control Center
                </h1>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '32px' }}>
                    Complete system oversight and user management
                </p>

                {loading && !stats ? (
                    <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
                        <div className="shimmer" style={{ width: '60px', height: '60px', borderRadius: '50%', margin: '0 auto 20px', background: 'var(--electric-blue)' }}></div>
                        Loading admin data...
                    </div>
                ) : stats ? (
                    <>
                        {/* System Stats */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                            {[
                                { label: 'Total Users', value: stats.totalUsers, icon: '👥', color: '#0EA5E9', desc: 'Registered accounts', breakdown: `${stats.farmerCount} farmers, ${stats.processorCount} processors, ${stats.adminCount} admins` },
                                { label: 'Yield Predictions', value: stats.totalPredictions, icon: '🌾', color: '#10B981', desc: 'Total predictions made' },
                                { label: 'Sync Records', value: stats.totalSyncRecords, icon: '🔄', color: '#8B5CF6', desc: 'Supply-demand comparisons' },
                                { label: 'Total Yield', value: `${stats.totalYield} tons`, icon: '📦', color: '#F97316', desc: 'Cumulative predicted yield' },
                            ].map((card, i) => (
                                <div key={i} className="kpi-card glow-blue">
                                    <div style={{
                                        width: '56px', height: '56px', borderRadius: '14px',
                                        background: `${card.color}20`, border: `2px solid ${card.color}40`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '26px', marginBottom: '16px',
                                    }}>{card.icon}</div>
                                    <div style={{ fontSize: '38px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '6px', letterSpacing: '-0.02em' }}>{card.value}</div>
                                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>{card.label}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{card.desc}</div>
                                    {card.breakdown && <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '8px', opacity: 0.7 }}>{card.breakdown}</div>}
                                </div>
                            ))}
                        </div>

                        {/* User Management */}
                        <div className="glass-card" style={{ padding: '32px', marginBottom: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
                                    <span className="gradient-text-blue">User Management</span>
                                </h2>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <input
                                        type="text"
                                        placeholder="Search users..."
                                        className="form-input"
                                        value={searchTerm}
                                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                        style={{ width: '250px' }}
                                    />
                                    <select
                                        className="form-select"
                                        value={roleFilter}
                                        onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
                                        style={{ width: '150px' }}
                                    >
                                        <option value="all">All Roles</option>
                                        <option value="farmer">Farmers</option>
                                        <option value="processor">Processors</option>
                                        <option value="admin">Admins</option>
                                    </select>
                                </div>
                            </div>

                            {/* Users Table */}
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                                    <thead>
                                        <tr style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            <th style={{ textAlign: 'left', padding: '12px 16px' }}>User</th>
                                            <th style={{ textAlign: 'left', padding: '12px 16px' }}>Email</th>
                                            <th style={{ textAlign: 'left', padding: '12px 16px' }}>Role</th>
                                            <th style={{ textAlign: 'left', padding: '12px 16px' }}>Joined</th>
                                            <th style={{ textAlign: 'right', padding: '12px 16px' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((u) => (
                                            <tr key={u._id} style={{
                                                background: 'rgba(15,23,42,0.6)',
                                                borderRadius: '10px',
                                                transition: 'all 0.2s ease',
                                            }}>
                                                <td style={{ padding: '16px', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                        <div style={{
                                                            width: '40px', height: '40px', borderRadius: '50%',
                                                            background: 'linear-gradient(135deg, #0EA5E9, #8B5CF6)',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            fontSize: '16px', fontWeight: 700, color: 'white'
                                                        }}>
                                                            {u.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{u.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>{u.email}</td>
                                                <td style={{ padding: '16px' }}>
                                                    {editingUser?._id === u._id ? (
                                                        <select
                                                            className="form-select"
                                                            defaultValue={u.role}
                                                            onChange={(e) => handleRoleUpdate(u._id, e.target.value)}
                                                            style={{ width: '130px', padding: '6px 12px', fontSize: '12px' }}
                                                        >
                                                            <option value="farmer">Farmer</option>
                                                            <option value="processor">Processor</option>
                                                            <option value="admin">Admin</option>
                                                        </select>
                                                    ) : (
                                                        <span className={`badge badge-${u.role === 'admin' ? 'danger' : u.role === 'processor' ? 'warning' : 'success'}`}>
                                                            {u.role}
                                                        </span>
                                                    )}
                                                </td>
                                                <td style={{ padding: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
                                                    {new Date(u.createdAt).toLocaleDateString()}
                                                </td>
                                                <td style={{ padding: '16px', textAlign: 'right', borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>
                                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                        <button
                                                            onClick={() => setEditingUser(editingUser?._id === u._id ? null : u)}
                                                            style={{
                                                                padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                                                                background: 'rgba(14,165,233,0.15)', color: '#0EA5E9',
                                                                border: '1px solid rgba(14,165,233,0.3)', cursor: 'pointer',
                                                                transition: 'all 0.2s ease'
                                                            }}
                                                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(14,165,233,0.25)'}
                                                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(14,165,233,0.15)'}
                                                        >
                                                            {editingUser?._id === u._id ? '✓ Save' : '✏️ Edit'}
                                                        </button>
                                                        {u._id !== user._id && (
                                                            <button
                                                                onClick={() => setShowDeleteConfirm(u._id)}
                                                                style={{
                                                                    padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                                                                    background: 'rgba(236,72,153,0.15)', color: '#EC4899',
                                                                    border: '1px solid rgba(236,72,153,0.3)', cursor: 'pointer',
                                                                    transition: 'all 0.2s ease'
                                                                }}
                                                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(236,72,153,0.25)'}
                                                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(236,72,153,0.15)'}
                                                            >
                                                                🗑️ Delete
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="btn-secondary"
                                        style={{ padding: '8px 16px', fontSize: '13px' }}
                                    >
                                        ← Previous
                                    </button>
                                    <span style={{ padding: '8px 16px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600 }}>
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="btn-secondary"
                                        style={{ padding: '8px 16px', fontSize: '13px' }}
                                    >
                                        Next →
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Recent Activity & System Health */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="glass-card" style={{ padding: '28px' }}>
                                <h3 className="gradient-text-purple" style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px' }}>
                                    Recent Activity
                                </h3>
                                {stats.recentActivity && stats.recentActivity.length > 0 ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {stats.recentActivity.slice(0, 5).map((activity: any, i: number) => (
                                            <div key={i} style={{
                                                padding: '14px', borderRadius: '10px',
                                                background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(14,165,233,0.15)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <span className={`badge badge-${activity.alertType === 'oversupply' ? 'warning' : 'danger'}`}>
                                                        {activity.alertType}
                                                    </span>
                                                    <div>
                                                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                                                            {activity.cropType} — {activity.region}
                                                        </div>
                                                        <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                                                            Imbalance: {activity.imbalance > 0 ? '+' : ''}{activity.imbalance} tons
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                                                    {new Date(activity.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dim)' }}>No recent activity</div>
                                )}
                            </div>

                            <div className="glass-card" style={{ padding: '28px' }}>
                                <h3 className="gradient-text-green" style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px' }}>
                                    System Health
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                    {[
                                        { label: 'API Status', status: 'Operational', color: '#10B981', icon: '✓' },
                                        { label: 'Database', status: 'Connected', color: '#10B981', icon: '✓' },
                                        { label: 'AI Engine', status: 'Active', color: '#0EA5E9', icon: '⚡' },
                                        { label: 'Sync Service', status: 'Running', color: '#8B5CF6', icon: '🔄' },
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>{item.label}</span>
                                            <span style={{
                                                fontSize: '13px', padding: '6px 14px', borderRadius: '8px',
                                                background: `${item.color}20`, color: item.color,
                                                border: `1px solid ${item.color}40`, fontWeight: 700,
                                                display: 'flex', alignItems: 'center', gap: '6px'
                                            }}>
                                                <span>{item.icon}</span>
                                                {item.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                ) : null}
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1000, backdropFilter: 'blur(8px)'
                }} onClick={() => setShowDeleteConfirm(null)}>
                    <div className="glass-card glow-orange" style={{ padding: '32px', maxWidth: '400px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
                        <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
                            ⚠️ Confirm Deletion
                        </h3>
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                            Are you sure you want to delete this user? This action cannot be undone.
                        </p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="btn-secondary"
                                style={{ padding: '10px 20px' }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeleteUser(showDeleteConfirm)}
                                className="btn-danger"
                                style={{ padding: '10px 20px' }}
                            >
                                Delete User
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
