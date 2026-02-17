'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <header style={{
            position: 'sticky', top: 0, zIndex: 30,
            background: 'rgba(10,15,30,0.8)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '0 32px',
            height: '64px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
            {/* Left side - Page context */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: '#22c55e',
                    boxShadow: '0 0 12px rgba(34,197,94,0.6)',
                }} />
                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>
                    System Online
                </span>
                <span style={{
                    fontSize: '11px', padding: '3px 10px', borderRadius: '6px',
                    background: 'rgba(34,197,94,0.1)', color: '#4ade80',
                    border: '1px solid rgba(34,197,94,0.2)', fontWeight: 600
                }}>
                    AI Active
                </span>
            </div>

            {/* Right side - User actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Notifications bell */}
                <button style={{
                    position: 'relative', background: 'rgba(30,41,59,0.6)',
                    border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px',
                    padding: '8px', color: '#94a3b8', cursor: 'pointer',
                    transition: 'all 0.2s ease',
                }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(30,41,59,0.9)'; e.currentTarget.style.color = '#e2e8f0'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(30,41,59,0.6)'; e.currentTarget.style.color = '#94a3b8'; }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
                    </svg>
                    <div style={{
                        position: 'absolute', top: '4px', right: '4px',
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: '#ef4444', border: '2px solid #0a0f1e',
                    }} />
                </button>

                {/* User profile */}
                {user && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>{user.name}</div>
                            <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'capitalize' }}>{user.role}</div>
                        </div>
                        <button
                            onClick={logout}
                            style={{
                                background: 'rgba(239,68,68,0.1)',
                                border: '1px solid rgba(239,68,68,0.2)',
                                borderRadius: '10px', padding: '8px 16px',
                                color: '#fca5a5', fontSize: '13px', fontWeight: 600,
                                cursor: 'pointer', transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
