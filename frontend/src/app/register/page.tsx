'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('farmer');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
        setLoading(true);
        try {
            await register(name, email, password, role);
        } catch (err: any) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const roles = [
        { value: 'farmer', label: '👨‍🌾 Farmer', desc: 'Predict yields, manage crops' },
        { value: 'processor', label: '🏭 Processor', desc: 'Track demand, manage supply' },
        { value: 'admin', label: '👑 Admin', desc: 'Full system access' },
    ];

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', position: 'relative',
            background: '#0a0f1e', overflow: 'hidden',
        }}>
            <div className="hero-glow" style={{ top: '-100px', left: '-200px', background: 'radial-gradient(circle, rgba(139,92,246,0.2), transparent)' }} />
            <div className="hero-glow" style={{ bottom: '-200px', right: '-100px', background: 'radial-gradient(circle, rgba(34,197,94,0.15), transparent)' }} />

            {/* Left panel */}
            <div style={{
                flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
                padding: '60px', position: 'relative', zIndex: 10,
            }} className="register-left">
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
                    Join the Future<span style={{ color: '#22c55e' }}>.</span>
                </h1>
                <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.7, maxWidth: '400px' }}>
                    Create your account and start bridging the gap between farm supply and market demand with AI-powered insights.
                </p>

                <div style={{
                    marginTop: '48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '400px',
                }}>
                    {[
                        { val: '99%', lbl: 'Accuracy' },
                        { val: '24/7', lbl: 'Monitoring' },
                        { val: '50K+', lbl: 'Users' },
                        { val: 'Free', lbl: 'To Start' },
                    ].map((s, i) => (
                        <div key={i} style={{
                            padding: '16px', borderRadius: '12px',
                            background: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.06)',
                        }}>
                            <div className="gradient-text" style={{ fontSize: '20px', fontWeight: 800 }}>{s.val}</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>{s.lbl}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right panel */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '40px', position: 'relative', zIndex: 10, width: '500px',
            }}>
                <div style={{ width: '100%', maxWidth: '420px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#f1f5f9', marginBottom: '8px' }}>Create Account</h2>
                    <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '28px' }}>Fill in your details to get started</p>

                    {error && (
                        <div style={{
                            padding: '12px 16px', borderRadius: '10px',
                            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                            color: '#fca5a5', fontSize: '13px', marginBottom: '20px',
                        }}>{error}</div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>Full Name</label>
                            <input type="text" className="form-input" placeholder="Enter your name"
                                value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>Email</label>
                            <input type="email" className="form-input" placeholder="you@example.com"
                                value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>Password</label>
                            <input type="password" className="form-input" placeholder="Min 6 characters"
                                value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '10px' }}>Select Role</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {roles.map(r => (
                                    <button key={r.value} type="button" onClick={() => setRole(r.value)}
                                        style={{
                                            flex: 1, padding: '12px 8px', borderRadius: '10px', cursor: 'pointer',
                                            background: role === r.value ? 'rgba(34,197,94,0.1)' : 'rgba(15,23,42,0.8)',
                                            border: role === r.value ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(255,255,255,0.06)',
                                            transition: 'all 0.2s ease', textAlign: 'center',
                                        }}
                                    >
                                        <div style={{ fontSize: '20px', marginBottom: '4px' }}>{r.label.split(' ')[0]}</div>
                                        <div style={{ fontSize: '12px', fontWeight: 600, color: role === r.value ? '#4ade80' : '#94a3b8' }}>
                                            {r.value.charAt(0).toUpperCase() + r.value.slice(1)}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="btn-primary" disabled={loading}
                            style={{ width: '100%', padding: '14px', fontSize: '15px' }}
                        >
                            {loading ? 'Creating Account...' : 'Create Account →'}
                        </button>
                    </form>

                    <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
                        Already have an account?{' '}
                        <Link href="/login" style={{ color: '#22c55e', fontWeight: 600, textDecoration: 'none' }}>Sign In</Link>
                    </p>
                </div>
            </div>

            <style jsx>{`
        @media (max-width: 768px) {
          .register-left { display: none !important; }
        }
      `}</style>
        </div>
    );
}
