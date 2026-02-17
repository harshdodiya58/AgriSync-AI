'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

// SVG icon components
const DashboardIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
);

const YieldIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
);

const DemandIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
);

const SyncIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </svg>
);

const AlertIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
);

const AdminIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
);

const MenuIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: DashboardIcon, roles: ['farmer', 'processor', 'admin'] },
    { href: '/yield-prediction', label: 'Yield Prediction', icon: YieldIcon, roles: ['farmer', 'admin'] },
    { href: '/demand-forecast', label: 'Demand Forecast', icon: DemandIcon, roles: ['farmer', 'processor', 'admin'] },
    { href: '/synchronization', label: 'Synchronization', icon: SyncIcon, roles: ['farmer', 'processor', 'admin'] },
    { href: '/alerts', label: 'Alerts', icon: AlertIcon, roles: ['farmer', 'processor', 'admin'] },
    { href: '/admin', label: 'Admin Panel', icon: AdminIcon, roles: ['admin'] },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { user } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);

    const filteredNav = navItems.filter(item => user && item.roles.includes(user.role));

    const SidebarContent = () => (
        <>
            {/* Logo */}
            <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(14,165,233,0.1)' }}>
                <Link href="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '40px', height: '40px', borderRadius: '12px',
                        background: 'linear-gradient(135deg, #0EA5E9, #8B5CF6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '18px', fontWeight: 800, color: 'white',
                        boxShadow: '0 4px 12px rgba(14,165,233,0.3)'
                    }}>
                        A
                    </div>
                    <div>
                        <div className="gradient-text-blue" style={{ fontSize: '16px', fontWeight: 800, lineHeight: 1.2 }}>AgriSync</div>
                        <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>AI Platform</div>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav style={{ padding: '16px 12px', flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 16px', marginBottom: '8px' }}>
                    Navigation
                </div>
                {filteredNav.map(item => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                            className={`sidebar-link ${isActive ? 'active' : ''}`}
                            style={{ marginBottom: '4px', textDecoration: 'none' }}
                        >
                            <item.icon />
                            <span>{item.label}</span>
                            {isActive && (
                                <div style={{
                                    marginLeft: 'auto', width: '8px', height: '8px', borderRadius: '50%',
                                    background: '#0EA5E9', boxShadow: '0 0 12px rgba(14,165,233,0.8)'
                                }} />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User info at bottom */}
            {user && (
                <div style={{
                    padding: '16px 20px', borderTop: '1px solid rgba(14,165,233,0.1)',
                    display: 'flex', alignItems: 'center', gap: '12px'
                }}>
                    <div style={{
                        width: '36px', height: '36px', borderRadius: '10px',
                        background: 'linear-gradient(135deg, #0EA5E9, #8B5CF6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '14px', fontWeight: 700, color: 'white',
                        boxShadow: '0 2px 8px rgba(14,165,233,0.3)'
                    }}>
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'capitalize' }}>{user.role}</div>
                    </div>
                </div>
            )}
        </>
    );

    return (
        <>
            {/* Mobile toggle button */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{
                    position: 'fixed', top: '16px', left: '16px', zIndex: 60,
                    background: 'rgba(30,41,59,0.9)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px', padding: '8px', color: '#e2e8f0', cursor: 'pointer',
                    display: 'none',
                }}
                className="mobile-menu-btn"
            >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    onClick={() => setMobileOpen(false)}
                    style={{
                        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
                        zIndex: 40, display: 'none',
                    }}
                    className="mobile-overlay"
                />
            )}

            {/* Sidebar */}
            <aside
                style={{
                    position: 'fixed', top: 0, left: 0, bottom: 0,
                    width: '260px', background: 'rgba(15,23,42,0.95)',
                    borderRight: '1px solid rgba(14,165,233,0.15)',
                    backdropFilter: 'blur(20px)',
                    display: 'flex', flexDirection: 'column',
                    zIndex: 50,
                    transition: 'transform 0.3s ease',
                }}
                className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}
            >
                <SidebarContent />
            </aside>

            <style jsx global>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: block !important; }
          .mobile-overlay { display: block !important; }
          .sidebar { transform: translateX(-100%); }
          .sidebar.sidebar-open { transform: translateX(0); }
        }
      `}</style>
        </>
    );
}
