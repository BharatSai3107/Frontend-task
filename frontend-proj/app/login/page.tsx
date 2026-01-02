'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '@/utils/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, Target } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await api.post('/auth/login', formData);
      Cookies.set('token', res.data.token);
      toast.success('Welcome back to Wheller! 🎉');
      setTimeout(() => router.push('/dashboard'), 500);
    } catch (err: any) {
      toast.error(err.response?.data?.msg || err.response?.data?.errors?.[0]?.msg || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <Toaster position="top-right" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--primary-600), var(--primary-500))' }}>
              <Target className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold" style={{ color: 'var(--primary-700)' }}>Wheller</span>
          </Link>
          <p className="text-2xl font-extrabold text-green-500" style={{ color: '#22c55e', fontWeight: 900 }}>Sign in to your account</p>
        </div>

        {/* Login Card */}
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="form-label">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 icon-muted w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="form-label">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 icon-muted w-5 h-5" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (errors.password) setErrors({ ...errors, password: undefined });
                  }}
                  className={`input-field ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50 font-extrabold text-green-500 border-2 border-green-400 bg-white hover:bg-green-50 transition-all text-xl shadow-lg"
              style={{ color: '#22c55e', fontWeight: 900, borderColor: '#22c55e' }}
            >
              {loading ? 'Signing in...' : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/register" className="font-extrabold text-green-500 hover:text-green-600 text-lg underline" style={{ color: '#22c55e', fontWeight: 900 }}>
                Sign up now -&gt;
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xl font-extrabold text-green-500 hover:text-green-600"
            style={{ color: '#22c55e', fontWeight: 900 }}
          >
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
