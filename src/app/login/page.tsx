'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, formData);

      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminUser', JSON.stringify(response.data.user));
      toast.custom(
        (t) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: '#10b981',
              color: '#fff',
              padding: '12px 16px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              opacity: t.visible ? 1 : 0,
              transition: 'opacity 0.2s',
            }}
          >
            <span style={{ fontWeight: 600 }}>Login successful!</span>
            <button
              onClick={() => toast.dismiss(t.id)}
              style={{
                marginLeft: '4px',
                background: 'rgba(255,255,255,0.25)',
                border: 'none',
                borderRadius: '50%',
                width: '22px',
                height: '22px',
                cursor: 'pointer',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                lineHeight: 1,
                flexShrink: 0,
              }}
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        ),
        { duration: 3000 }
      );
      router.push('/admin/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4" style={{ overflow: 'hidden', background: '#020817' }}>
      <style>{`
        @keyframes bgBlob1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33%       { transform: translate(40px, -60px) scale(1.12); }
          66%       { transform: translate(-25px, 30px) scale(0.92); }
        }
        @keyframes bgBlob2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33%       { transform: translate(-50px, 40px) scale(1.18); }
          66%       { transform: translate(30px, -35px) scale(0.95); }
        }
        @keyframes bgBlob3 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50%       { transform: translate(20px, 30px) scale(1.08); }
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.04; }
          50%       { opacity: 0.09; }
        }
        @keyframes streak1 {
          0%   { transform: translateX(-300%) translateY(300%) rotate(-45deg); opacity: 0; }
          8%   { opacity: 0.8; }
          92%  { opacity: 0.8; }
          100% { transform: translateX(400%) translateY(-400%) rotate(-45deg); opacity: 0; }
        }
        @keyframes streak2 {
          0%   { transform: translateX(-300%) translateY(300%) rotate(-45deg); opacity: 0; }
          8%   { opacity: 0.5; }
          92%  { opacity: 0.5; }
          100% { transform: translateX(400%) translateY(-400%) rotate(-45deg); opacity: 0; }
        }
        @keyframes floatA {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.5; }
          50%       { transform: translateY(-22px) translateX(12px); opacity: 1; }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
          50%       { transform: translateY(18px) translateX(-10px); opacity: 0.9; }
        }
        @keyframes floatC {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.35; }
          50%       { transform: translateY(-14px) translateX(-16px); opacity: 0.8; }
        }
        @keyframes ringPulse {
          0%, 100% { opacity: 0.06; }
          50%       { opacity: 0.13; }
        }
      `}</style>

      {/* ── Base gradient ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(135deg, #020817 0%, #080d1f 45%, #030a18 70%, #020817 100%)',
      }} />

      {/* ── Blob — electric blue, top-left ── */}
      <div className="absolute pointer-events-none" style={{
        width: '700px', height: '700px',
        top: '-180px', left: '-200px',
        background: 'radial-gradient(circle, rgba(37,99,235,0.20) 0%, rgba(37,99,235,0.07) 40%, transparent 70%)',
        animation: 'bgBlob1 14s ease-in-out infinite',
        willChange: 'transform',
      }} />

      {/* ── Blob — violet-purple, bottom-right ── */}
      <div className="absolute pointer-events-none" style={{
        width: '800px', height: '800px',
        bottom: '-220px', right: '-220px',
        background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, rgba(124,58,237,0.06) 40%, transparent 70%)',
        animation: 'bgBlob2 18s ease-in-out infinite',
        willChange: 'transform',
      }} />

      {/* ── Blob — cyan, mid-right ── */}
      <div className="absolute pointer-events-none" style={{
        width: '550px', height: '550px',
        top: '35%', right: '-120px',
        background: 'radial-gradient(circle, rgba(6,182,212,0.13) 0%, rgba(6,182,212,0.04) 40%, transparent 70%)',
        animation: 'bgBlob3 11s ease-in-out infinite',
        willChange: 'transform',
      }} />

      {/* ── Blob — amber accent, bottom-left ── */}
      <div className="absolute pointer-events-none" style={{
        width: '400px', height: '400px',
        bottom: '-80px', left: '-80px',
        background: 'radial-gradient(circle, rgba(251,146,60,0.08) 0%, transparent 65%)',
        animation: 'bgBlob3 13s ease-in-out infinite reverse',
        willChange: 'transform',
      }} />

      {/* ── Grid overlay ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: [
          'linear-gradient(rgba(99,179,237,0.07) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(99,179,237,0.07) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '64px 64px',
        animation: 'gridPulse 5s ease-in-out infinite',
      }} />

      {/* ── Light streaks (clipped to viewport) ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          width: '1.5px', height: '260px',
          background: 'linear-gradient(to bottom, transparent, rgba(99,102,241,0.9), rgba(139,92,246,0.6), transparent)',
          top: '25%', left: '20%',
          animation: 'streak1 11s linear infinite',
          willChange: 'transform',
        }} />
        <div style={{
          position: 'absolute',
          width: '1px', height: '190px',
          background: 'linear-gradient(to bottom, transparent, rgba(6,182,212,0.75), transparent)',
          top: '50%', left: '68%',
          animation: 'streak2 15s linear infinite 5.5s',
          willChange: 'transform',
        }} />
      </div>

      {/* ── Floating glow particles ── */}
      <div className="absolute pointer-events-none rounded-full" style={{ width: '5px', height: '5px', background: 'rgba(96,165,250,0.9)', boxShadow: '0 0 10px 3px rgba(96,165,250,0.6)', top: '15%', left: '8%', animation: 'floatA 7s ease-in-out infinite' }} />
      <div className="absolute pointer-events-none rounded-full" style={{ width: '3px', height: '3px', background: 'rgba(167,139,250,0.9)', boxShadow: '0 0 8px 2px rgba(167,139,250,0.6)', top: '30%', left: '85%', animation: 'floatB 9s ease-in-out infinite 1s' }} />
      <div className="absolute pointer-events-none rounded-full" style={{ width: '4px', height: '4px', background: 'rgba(34,211,238,0.9)', boxShadow: '0 0 10px 3px rgba(34,211,238,0.6)', top: '70%', left: '12%', animation: 'floatC 8s ease-in-out infinite 2s' }} />
      <div className="absolute pointer-events-none rounded-full" style={{ width: '3px', height: '3px', background: 'rgba(96,165,250,0.8)', boxShadow: '0 0 8px 2px rgba(96,165,250,0.5)', top: '55%', left: '80%', animation: 'floatA 10s ease-in-out infinite 3s' }} />
      <div className="absolute pointer-events-none rounded-full" style={{ width: '5px', height: '5px', background: 'rgba(251,191,36,0.75)', boxShadow: '0 0 10px 3px rgba(251,191,36,0.4)', top: '85%', left: '72%', animation: 'floatB 11s ease-in-out infinite 0.5s' }} />
      <div className="absolute pointer-events-none rounded-full" style={{ width: '4px', height: '4px', background: 'rgba(167,139,250,0.8)', boxShadow: '0 0 8px 2px rgba(167,139,250,0.5)', top: '10%', left: '55%', animation: 'floatC 6s ease-in-out infinite 1.5s' }} />
      <div className="absolute pointer-events-none rounded-full" style={{ width: '3px', height: '3px', background: 'rgba(34,211,238,0.8)', boxShadow: '0 0 6px 2px rgba(34,211,238,0.5)', top: '90%', left: '30%', animation: 'floatA 8s ease-in-out infinite 4s' }} />
      <div className="absolute pointer-events-none rounded-full" style={{ width: '4px', height: '4px', background: 'rgba(96,165,250,0.7)', boxShadow: '0 0 9px 2px rgba(96,165,250,0.4)', top: '45%', left: '5%', animation: 'floatB 9s ease-in-out infinite 2.5s' }} />

      {/* ── Decorative concentric rings ── */}
      <div className="absolute pointer-events-none rounded-full" style={{
        width: '520px', height: '520px',
        border: '1px solid rgba(99,179,237,0.09)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'ringPulse 6s ease-in-out infinite',
      }} />
      <div className="absolute pointer-events-none rounded-full" style={{
        width: '780px', height: '780px',
        border: '1px solid rgba(99,179,237,0.05)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'ringPulse 8s ease-in-out infinite 2s',
      }} />

      {/* ── Login card — unchanged ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-600 mb-2">SISHAR Global Pvt. Ltd.</h1>
          <p className="text-dark-600">Premium Maize Business Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="admin@makka.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-dark-400 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-dark-600 mt-6">
          <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
            ← Back to Home
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
