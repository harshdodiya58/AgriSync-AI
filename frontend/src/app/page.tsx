'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

const features = [
  {
    icon: '🌾',
    title: 'AI Yield Prediction',
    desc: 'Predict crop yields with machine learning models analyzing soil, weather, and historical data.',
    color: '#22c55e',
  },
  {
    icon: '📊',
    title: 'Demand Forecasting',
    desc: 'Forecast 30-60 day market demand with seasonal spike detection and regional breakdowns.',
    color: '#3b82f6',
  },
  {
    icon: '🔄',
    title: 'Supply-Demand Sync',
    desc: 'Real-time synchronization engine matching farm supply to market demand intelligently.',
    color: '#8b5cf6',
  },
  {
    icon: '🔔',
    title: 'Smart Alerts',
    desc: 'Instant alerts for oversupply, shortage, and region diversion recommendations.',
    color: '#06b6d4',
  },
];

const stats = [
  { value: '99.2%', label: 'Prediction Accuracy' },
  { value: '50K+', label: 'Farms Connected' },
  { value: '₹2.4Cr', label: 'Waste Prevented' },
  { value: '12', label: 'Regions Active' },
];

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (isAuthenticated) router.push('/dashboard');
  }, [isAuthenticated, router]);

  if (!mounted) return null;

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', overflow: 'hidden', position: 'relative' }}>
      {/* Background glows */}
      <div className="hero-glow" style={{ top: '-200px', left: '-200px', background: 'radial-gradient(circle, rgba(34,197,94,0.3), transparent)' }} />
      <div className="hero-glow" style={{ top: '200px', right: '-300px', background: 'radial-gradient(circle, rgba(59,130,246,0.2), transparent)' }} />
      <div className="hero-glow" style={{ bottom: '-200px', left: '30%', background: 'radial-gradient(circle, rgba(139,92,246,0.15), transparent)' }} />

      {/* Navbar */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 48px', position: 'relative', zIndex: 10,
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px', fontWeight: 800, color: 'white',
          }}>A</div>
          <span style={{ fontSize: '20px', fontWeight: 700, color: '#f1f5f9' }}>AgriSync<span style={{ color: '#22c55e' }}>AI</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ThemeToggle />
          <Link href="/login" style={{
            padding: '10px 24px', borderRadius: '10px',
            color: '#94a3b8', fontSize: '14px', fontWeight: 600,
            textDecoration: 'none', transition: 'color 0.2s',
          }}>Sign In</Link>
          <Link href="/register" className="btn-primary" style={{ textDecoration: 'none' }}>
            Get Started →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        textAlign: 'center', padding: '80px 24px 60px',
        position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 16px', borderRadius: '9999px',
          background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
          marginBottom: '28px', fontSize: '13px', fontWeight: 600, color: '#4ade80',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
          Powered by Advanced AI Analytics
        </div>

        <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px' }}>
          <span style={{ color: '#f1f5f9' }}>Farm-to-Market</span><br />
          <span className="gradient-text">Intelligence Platform</span>
        </h1>

        <p style={{
          fontSize: '18px', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 40px',
          lineHeight: 1.7,
        }}>
          Synchronize agricultural supply with market demand using predictive AI.
          Reduce waste, maximize profits, and feed the world smarter.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/register" className="btn-primary" style={{
            textDecoration: 'none', padding: '14px 36px', fontSize: '16px',
          }}>
            🚀 Start Free
          </Link>
          <Link href="/login" className="btn-secondary" style={{
            textDecoration: 'none', padding: '14px 36px', fontSize: '16px',
            background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)',
          }}>
            View Demo
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1px', maxWidth: '900px', margin: '0 auto 80px',
        background: 'rgba(255,255,255,0.04)', borderRadius: '16px',
        overflow: 'hidden', position: 'relative', zIndex: 10,
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            background: 'rgba(15,23,42,0.8)', padding: '28px 24px',
            textAlign: 'center',
          }}>
            <div className="gradient-text" style={{ fontSize: '28px', fontWeight: 800, marginBottom: '4px' }}>{s.value}</div>
            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section style={{
        maxWidth: '1100px', margin: '0 auto', padding: '0 24px 100px',
        position: 'relative', zIndex: 10,
      }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 700, color: '#f1f5f9', marginBottom: '12px' }}>
          Intelligent Agriculture
        </h2>
        <p style={{ textAlign: 'center', fontSize: '16px', color: '#64748b', marginBottom: '48px' }}>
          Everything you need to bridge the gap between farms and markets.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {features.map((f, i) => (
            <div key={i} className="glass-card" style={{ padding: '32px 24px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: `${f.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '24px', marginBottom: '16px',
                border: `1px solid ${f.color}30`,
              }}>{f.icon}</div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#e2e8f0', marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.04)',
        padding: '32px 48px', textAlign: 'center',
        position: 'relative', zIndex: 10,
      }}>
        <p style={{ fontSize: '13px', color: '#475569' }}>
          © 2024 AgriSync AI. Built for smarter agriculture.
        </p>
      </footer>
    </div>
  );
}
