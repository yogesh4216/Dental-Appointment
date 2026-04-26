'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Sparkles, ArrowRight, CalendarDays, Activity, ShieldCheck, ChevronRight, Star, Heart } from 'lucide-react';
import Link from 'next/link';

const FadeUp = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      document.querySelectorAll('.card, .bento-card').forEach((el: any) => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div style={{ background: 'var(--bg-base)' }}>
      {/* Ambient Background */}
      <div className="ambient-bg">
        <div className="ambient-blob blob-1" />
        <div className="ambient-blob blob-2" />
        <div className="ambient-blob blob-3" />
      </div>

      {/* ═══ NAVIGATION ═══ */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 100,
        background: 'rgba(250, 251, 253, 0.82)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #2563EB, #0D9488)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Heart size={18} color="white" fill="white" />
            </div>
            DentalCare<span style={{ color: 'var(--accent)' }}>+</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 32, fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)' }}>
            <Link href="#features" style={{ transition: 'color 0.2s' }}>Features</Link>
            <Link href="#how" style={{ transition: 'color 0.2s' }}>How it Works</Link>
            <Link href="#" style={{ transition: 'color 0.2s' }}>Pricing</Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/login" className="btn btn-ghost" style={{ fontSize: 14 }}>Sign In</Link>
            <Link href="/signup" className="btn btn-primary btn-sm">Get Started <ArrowRight size={15} /></Link>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 120, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
        <motion.div style={{ y: heroY, opacity: heroOpacity, textAlign: 'center', maxWidth: 800, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, border: '1px solid var(--border-strong)', background: 'var(--bg-surface)', boxShadow: 'var(--shadow-sm)', marginBottom: 32, fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--mint)', boxShadow: '0 0 8px rgba(16,185,129,0.6)' }} />
            Now available — DentalCare+ 2.0
            <ChevronRight size={14} style={{ color: 'var(--text-tertiary)' }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 24 }}
          >
            Your smile deserves
            <br />
            <span className="text-gradient">premium care.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 540, margin: '0 auto 40px', lineHeight: 1.7, fontWeight: 400 }}
          >
            Book appointments, track your health, and manage your dental journey — all in one beautifully crafted patient portal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}
          >
            <Link href="/signup" className="btn btn-primary btn-lg" style={{ fontSize: 16, padding: '16px 36px' }}>
              Start Your Journey <ArrowRight size={18} />
            </Link>
            <Link href="#features" className="btn btn-secondary btn-lg" style={{ fontSize: 16, padding: '16px 36px' }}>
              Explore Features
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginTop: 48, color: 'var(--text-tertiary)', fontSize: 13 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />)}
              <span style={{ marginLeft: 6 }}>4.9 Rating</span>
            </div>
            <span style={{ width: 1, height: 16, background: 'var(--border-strong)' }} />
            <span>10,000+ patients</span>
            <span style={{ width: 1, height: 16, background: 'var(--border-strong)' }} />
            <span>HIPAA Compliant</span>
          </motion.div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 80, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', maxWidth: 1100, margin: '60px auto 0', padding: '0 24px', perspective: 2000, position: 'relative', zIndex: 2 }}
        >
          <div style={{
            borderRadius: 24, overflow: 'hidden',
            border: '1px solid var(--border)',
            boxShadow: '0 40px 120px -20px rgba(37,99,235,0.12), 0 0 0 1px var(--border)',
            background: 'var(--bg-surface)',
          }}>
            {/* Browser Chrome */}
            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-subtle)' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
              </div>
              <div style={{ flex: 1, textAlign: 'center', fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 500 }}>dashboard — DentalCare+</div>
            </div>
            {/* Mock Dashboard */}
            <div style={{ display: 'flex', minHeight: 480 }}>
              {/* Sidebar mock */}
              <div style={{ width: 220, borderRight: '1px solid var(--border)', padding: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ height: 12, width: 100, background: 'var(--bg-subtle)', borderRadius: 6, marginBottom: 20 }} />
                {[1,2,3,4,5].map(i => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, background: i === 1 ? 'var(--accent-soft)' : 'transparent' }}>
                    <div style={{ width: 18, height: 18, borderRadius: 6, background: i === 1 ? 'var(--accent)' : 'var(--bg-subtle)', opacity: i === 1 ? 1 : 0.5 }} />
                    <div style={{ height: 10, width: 70, background: i === 1 ? 'var(--accent)' : 'var(--bg-subtle)', borderRadius: 4, opacity: i === 1 ? 0.3 : 0.4 }} />
                  </div>
                ))}
              </div>
              {/* Main area */}
              <div style={{ flex: 1, padding: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <div style={{ height: 18, width: 180, background: 'var(--bg-subtle)', borderRadius: 6 }} />
                  <div style={{ height: 32, width: 110, background: 'var(--accent)', borderRadius: 99, opacity: 0.9 }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
                  {[
                    { accent: 'var(--accent)', value: '2', label: 'Upcoming' },
                    { accent: 'var(--teal)', value: '14', label: 'Past Visits' },
                    { accent: 'var(--mint)', value: '92', label: 'Health Score' },
                  ].map((item, i) => (
                    <div key={i} style={{ padding: 20, borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
                      <div style={{ width: 32, height: 32, borderRadius: 10, background: `${item.accent}15`, marginBottom: 16 }} />
                      <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)', lineHeight: 1 }}>{item.value}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4 }}>{item.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ height: 200, borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg-surface)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '60%', background: 'linear-gradient(to top, var(--accent-soft), transparent)' }} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══ FEATURES BENTO ═══ */}
      <section id="features" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <FadeUp>
          <div style={{ marginBottom: 64 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Features</p>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>Everything you need,<br/>nothing you don't.</h2>
            <p style={{ fontSize: 17, color: 'var(--text-secondary)', maxWidth: 500, lineHeight: 1.7 }}>A refined set of tools designed to make dental care simple, beautiful, and stress-free.</p>
          </div>
        </FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: 260, gap: 20 }}>
          {[
            { span: '2', icon: <CalendarDays size={28} />, title: 'Frictionless Booking', desc: 'Find your specialist, pick a slot, confirm in seconds. No phone calls, no waiting.', bg: 'linear-gradient(135deg, #EFF6FF, #F0FDFA)' },
            { span: '1', icon: <Activity size={28} />, title: 'Health Insights', desc: 'AI-driven summaries of your dental journey and care recommendations.', bg: 'linear-gradient(135deg, #F5F3FF, #FDF4FF)' },
            { span: '1', icon: <ShieldCheck size={28} />, title: 'Secure Records', desc: 'Bank-level encryption for all your medical data.', bg: 'linear-gradient(135deg, #F0FDF4, #F5F7FA)' },
            { span: '2', icon: <Sparkles size={28} />, title: 'Smart Care Assistant', desc: 'Personalized reminders, wellness tips, and treatment tracking powered by AI.', bg: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)' },
          ].map((f, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="bento-card" style={{ gridColumn: `span ${f.span}`, height: '100%', background: f.bg, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--bg-surface)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', marginBottom: 20 }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 400 }}>{f.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ padding: '100px 24px' }}>
        <FadeUp>
          <div style={{
            maxWidth: 900, margin: '0 auto', textAlign: 'center',
            borderRadius: 32, padding: '80px 40px',
            background: 'linear-gradient(135deg, #2563EB, #0D9488)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', filter: 'blur(60px)' }} />
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: 'white', marginBottom: 16, letterSpacing: '-0.03em' }}>
              Ready for modern dental care?
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.8)', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.7 }}>
              Join thousands of patients already enjoying a beautifully simple healthcare experience.
            </p>
            <Link href="/signup" className="btn" style={{ background: 'white', color: 'var(--accent)', fontWeight: 600, padding: '16px 36px', fontSize: 16, borderRadius: 99, boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
              Get Started Free <ArrowRight size={18} />
            </Link>
          </div>
        </FadeUp>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 24px', background: 'var(--bg-surface)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 18 }}>
            DentalCare<span style={{ color: 'var(--accent)' }}>+</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>© 2026 DentalCare+. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
