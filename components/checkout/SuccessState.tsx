'use client';

import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useConfigurator } from '@/lib/context/ConfiguratorContext';

export default function SuccessState() {
  const { setCheckoutView, dispatch } = useConfigurator();

  const handleDone = () => {
    setCheckoutView('closed');
    dispatch({ type: 'RESET' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: 'var(--space-8) 0',
      }}
    >
      {/* Success icon with glow */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
        style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--color-accent-light), var(--color-accent))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'var(--space-6)',
          boxShadow: '0 8px 32px rgba(196, 112, 75, 0.3)',
        }}
      >
        <CheckCircle size={36} color="#fff" strokeWidth={2.5} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--color-text)',
          margin: '0 0 var(--space-2)',
        }}
      >
        You&apos;re all set! 🎉
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: '0.95rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.6,
          maxWidth: 320,
          margin: '0 0 var(--space-8)',
        }}
      >
        Your workspace is being prepared. We&apos;ll deliver and set up everything in your Bali space within 48 hours.
      </motion.p>

      {/* Next steps */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-8)',
        }}
      >
        {[
          { step: '1', text: 'Confirmation email sent' },
          { step: '2', text: 'Team schedules delivery slot' },
          { step: '3', text: 'Setup & enjoy your workspace' },
        ].map((item) => (
          <div
            key={item.step}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              padding: 'var(--space-3) var(--space-4)',
              background: 'var(--color-slate-50)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'var(--color-accent-subtle)',
                color: 'var(--color-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {item.step}
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              {item.text}
            </span>
          </div>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="btn-primary"
        onClick={handleDone}
        type="button"
        style={{ padding: 'var(--space-3) var(--space-8)' }}
      >
        Build Another Setup
        <ArrowRight size={16} />
      </motion.button>
    </motion.div>
  );
}
