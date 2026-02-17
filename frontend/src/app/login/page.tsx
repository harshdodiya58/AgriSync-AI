'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
        } catch (err: any) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', position: 'relative',
            background: '#0a0f1e', overflow: 'hidden',
        }}>
            {/* Background effects */}
            <div className="hero-glow" style={{ top: '-100px', right: '-100px', background: 'radial-gradient(circle, rgba(34,197,94,0.2), transparent)' }} />
            <div className="hero-glow" style={{ bottom: '-200px', left: '-100px', background: 'radial-gradient(circle, rgba(59,130,246,0.15), transparent)' }} />

            {/* Left panel - Branding */}
            <div style={{
                flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
                padding: '60px', position: 'relative', zIndex: 10,
            }} className="login-left">
                <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
                    <div style={{
                        width: '48px', height: '48px', borderRadius: '14px',
                        background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '22px', fontWeight: 800, color: 'white',
                    }}>A</div>
                    <span style={{ fontSize: '24px', fontWeight: 700, color: '#f1f5f9' }}>AgriSync<span style={{ color: '#22c55e' }}>AI</span></span>
                </Link>

                <h1 style={{ fontSize: '42px', fontWeight: 800, color: '#f1f5f9', lineHeight: 1.2, marginBottom: '16px' }}>
                    Welcome Back<span style={{ color: '#22c55e' }}>.</span>
                </h1>
                <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.7, maxWidth: '400px' }}>
                    Sign in to access your farm intelligence dashboard and continue optimizing your supply chain.
                </p>

                <div style={{ marginTop: '48px', display: 'flex', gap: '24px' }}>
                    {[
                        { icon: '🌾', label: 'Yield Tracking' },
                        { icon: '📈', label: 'Market Analytics' },
                        { icon: '🔔', label: 'Smart Alerts' },
                    ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>{item.icon}</span>
                            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right panel - Form */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '40px', position: 'relative', zIndex: 10, width: '480px',
            }}>
                <div style={{ width: '100%', maxWidth: '400px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#f1f5f9', marginBottom: '8px' }}>Sign In</h2>
                    <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '32px' }}>Enter your credentials to continue</p>

                    {error && (
                        <div style={{
                            padding: '12px 16px', borderRadius: '10px',
                            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                            color: '#fca5a5', fontSize: '13px', marginBottom: '20px',
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
                                Email Address
                            </label>
                            <input
                                type="email" className="form-input" placeholder="farmer@example.com"
                                value={email} onChange={(e) => setEmail(e.target.value)} required
                            />
                        </div>
                        <div style={{ marginBottom: '28px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
                                Password
                            </label>
                            <input
                                type="password" className="form-input" placeholder="Enter your password"
                                value={password} onChange={(e) => setPassword(e.target.value)} required
                            />
                        </div>
                        <button type="submit" className="btn-primary" disabled={loading}
                            style={{ width: '100%', padding: '14px', fontSize: '15px' }}
                        >
                            {loading ? (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{
                                        width: '16px', height: '16px', borderRadius: '50%',
                                        border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white',
                                        animation: 'spin 0.6s linear infinite', display: 'inline-block',
                                    }} />
                                    Signing in...
                                </span>
                            ) : 'Sign In →'}
                        </button>
                    </form>

                    <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
                        Don&apos;t have an account?{' '}
                        <Link href="/register" style={{ color: '#22c55e', fontWeight: 600, textDecoration: 'none' }}>
                            Create Account
                        </Link>
                    </p>

                    {/* Demo credentials */}
                    <div style={{
                        marginTop: '24px', padding: '16px', borderRadius: '12px',
                        background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)',
                    }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: '#60a5fa', marginBottom: '8px' }}>Demo Credentials</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.8 }}>
                            <div>👨‍🌾 farmer@example.com / password123</div>
                            <div>🏭 processor@example.com / password123</div>
                            <div>👑 admin@example.com / password123</div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .login-left { display: none !important; }
        }
      `}</style>
        </div>
    );
}
