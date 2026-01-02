'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Check, Zap, Shield, TrendingUp, Layers, Users, Target } from 'lucide-react';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    setIsAuthenticated(!!token);
  }, []);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Blazing fast performance with optimized architecture',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure & Safe',
      description: 'Enterprise-grade security with JWT authentication',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Scalable',
      description: 'Built to scale from startup to enterprise',
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: 'Modern Stack',
      description: 'Powered by Next.js, Node.js, and MongoDB',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-purple-600 to-pink-400 relative overflow-hidden">
      {/* Modern Soft Gradient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-blue-200/40 to-green-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-green-200/30 to-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-green-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b-2 border-blue-400 sticky top-0 z-50 relative shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Target className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-extrabold text-blue-900 tracking-wide drop-shadow-lg">Wheller</span>
            </div>
            <div className="flex items-center" style={{ gap: '10px' }}>
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className="btn-primary shadow-md hover:shadow-lg transition-shadow text-base px-6 py-2"
                  >
                    Go to Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      Cookies.remove('token');
                      router.push('/login');
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded-lg shadow-md transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="font-extrabold text-green-500 hover:text-green-600 text-xl underline drop-shadow-lg"
                    style={{ color: '#22c55e', fontWeight: 900, textDecoration: 'underline', textShadow: '0 2px 8px #0002' }}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="btn-primary shadow-md hover:shadow-lg transition-shadow text-base px-6 py-2"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-extrabold text-green-400 mb-6 drop-shadow-2xl tracking-tight"
              style={{ fontWeight: 900, color: '#22c55e', textShadow: '0 2px 16px #0008' }}
            >
              <span className="font-extrabold text-green-400" style={{ color: '#22c55e', fontWeight: 900 }}>More than 1 million tasks managed with Wheller</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl font-extrabold text-green-400 mb-8 drop-shadow"
              style={{ color: '#22c55e', fontWeight: 900 }}
            >
              Follow the crowd. Do yourself proud.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
                >
                  Go to Dashboard <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <Link
                  href="/register"
                  className="px-8 py-4 rounded-xl font-extrabold text-lg flex items-center justify-center gap-2 transition-colors shadow-2xl hover:shadow-2xl border-2 border-green-700 bg-green-700 text-white hover:bg-green-800 hover:border-green-800"
                  style={{ color: '#22c55e', backgroundColor: '#14532d', borderColor: '#14532d', fontWeight: 900, textShadow: '0 2px 8px #0004' }}
                >
                  <span style={{ color: '#22c55e', fontWeight: 900 }}>SIGN UP NOW</span> <ArrowRight className="w-5 h-5" style={{ color: '#22c55e' }} />
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-green-400 mb-4 drop-shadow-2xl tracking-tight" style={{ color: '#22c55e', fontWeight: 900 }}>
              Everything you need to manage tasks
            </h2>
            <p className="text-xl font-extrabold text-green-400 drop-shadow" style={{ color: '#22c55e', fontWeight: 900 }}>
              Powerful features to help you stay organized and productive
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="card p-8 rounded-2xl shadow-2xl bg-white/95 border-2 border-white/60 hover:shadow-2xl transition-all duration-200"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-pink-400 rounded-lg flex items-center justify-center text-white mb-4 shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-extrabold text-green-300 mb-2 drop-shadow-lg" style={{ color: '#86efac', fontWeight: 900 }}>{feature.title}</h3>
                <p className="text-lg font-extrabold text-green-300 drop-shadow" style={{ color: '#86efac', fontWeight: 900 }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="card p-8 bg-white/95 border-2 border-blue-400 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-5xl font-extrabold text-pink-400 mb-2" style={{ color: '#ec4899', fontWeight: 900 }}>99.9%</div>
                <div className="text-pink-500 font-extrabold" style={{ color: '#db2777', fontWeight: 900 }}>Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-extrabold text-pink-400 mb-2" style={{ color: '#ec4899', fontWeight: 900 }}>10k+</div>
                <div className="text-pink-500 font-extrabold" style={{ color: '#db2777', fontWeight: 900 }}>Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-extrabold text-pink-400 mb-2" style={{ color: '#ec4899', fontWeight: 900 }}>&lt;100ms</div>
                <div className="text-pink-500 font-extrabold" style={{ color: '#db2777', fontWeight: 900 }}>Response Time</div>
              </div>
            </div>

            {/* Separator */}
            <div className="border-t border-gray-200 my-8"></div>

            {/* Footer */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-500 rounded-full flex items-center justify-center shadow-md">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-extrabold text-blue-900 tracking-wide drop-shadow-lg">Wheller</span>
              </div>
              <p className="text-white/90 font-semibold drop-shadow">
                © 2026 Wheller by Bharat Sai. Built with <span className="text-red-400">❤️</span> for productivity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
