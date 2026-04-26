'use client';

import { motion } from 'framer-motion';
import { Mail, ArrowRight, Heart, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function VerifyEmailPage() {
  const [sent, setSent] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)', padding: 24, position: 'relative' }}>
      <div className="ambient-bg">
        <div className="ambient-blob blob-1" />
        <div className="ambient-blob blob-2" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 2 }}
      >
        <div className="card" style={{ padding: 40, textAlign: 'center' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--teal))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: 'var(--shadow-glow)' }}
          >
            <Mail size={28} color="white" />
          </motion.div>

          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12 }}>Verify your email</h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 32 }}>
            We've sent a verification link to your email. Click the link to verify and continue setting up your account.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link href="/intake" className="btn btn-primary" style={{ width: '100%', padding: '14px 24px' }}>
              Continue (Mock Verify) <ArrowRight size={16} />
            </Link>
            <button onClick={() => setSent(true)} disabled={sent} className="btn btn-secondary" style={{ width: '100%', padding: '14px 24px' }}>
              {sent ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle2 size={16} style={{ color: 'var(--mint)' }} /> Email Resent!</span>
              ) : 'Resend Verification Email'}
            </button>
          </div>

          <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 12, color: 'var(--text-tertiary)' }}>
            <Heart size={12} style={{ color: 'var(--accent)' }} /> Secure authentication by DentalCare+
          </div>
        </div>
      </motion.div>
    </div>
  );
}
