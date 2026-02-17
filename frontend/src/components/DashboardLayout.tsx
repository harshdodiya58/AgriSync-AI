'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div style={{
                height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#0a0f1e',
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '48px', height: '48px', borderRadius: '50%',
                        border: '3px solid rgba(34,197,94,0.2)',
                        borderTopColor: '#22c55e',
                        animation: 'spin 0.8s linear infinite',
                        margin: '0 auto 16px',
                    }} />
                    <div style={{ color: '#64748b', fontSize: '14px' }}>Loading AgriSync AI...</div>
                </div>
                <style jsx>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0f1e' }}>
            <Sidebar />
            <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }} className="main-content">
                <Navbar />
                <main className="gradient-mesh page-enter" style={{ flex: 1, padding: '24px 32px', overflowY: 'auto' }}>
                    {children}
                </main>
                <style jsx global>{`
          @media (max-width: 768px) {
            .main-content { margin-left: 0 !important; }
          }
        `}</style>
            </div>
        </div>
    );
}
