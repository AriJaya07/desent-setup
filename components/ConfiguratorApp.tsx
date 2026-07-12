'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import Scene from '@/components/scene/Scene';
import PickerTabs from '@/components/picker/PickerTabs';
import PresetBar from '@/components/picker/PresetBar';
import CheckoutPanel from '@/components/checkout/CheckoutPanel';
import { useConfigurator } from '@/lib/context/ConfiguratorContext';
import { formatPrice } from '@/lib/data/products';

export default function ConfiguratorApp() {
  const { total, isMinimumMet, setCheckoutView } = useConfigurator();

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Ignore when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === 'Enter' && isMinimumMet) {
        setCheckoutView('summary');
      }
      if (e.key === 'Escape') {
        setCheckoutView('closed');
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMinimumMet, setCheckoutView]);

  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <header
          style={{
            padding: 'var(--space-4) var(--space-6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--color-border)',
            background: 'rgba(250, 249, 247, 0.8)',
            backdropFilter: 'blur(12px)',
            position: 'sticky',
            top: 0,
            zIndex: 40,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--color-text)',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              monis<span style={{ color: 'var(--color-accent)' }}>.rent</span>
            </h1>
          </div>

          <motion.div
            className="price-badge"
            key={total}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>Monthly</span>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{formatPrice(total)}</span>
          </motion.div>
        </header>

        {/* Main content */}
        <main
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr',
            maxWidth: 1200,
            width: '100%',
            margin: '0 auto',
            padding: 'var(--space-6)',
            gap: 'var(--space-6)',
          }}
          className="configurator-grid"
        >
          {/* Scene area */}
          <div>
            <div
              style={{
                marginBottom: 'var(--space-4)',
              }}
            >
              <h2
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  margin: '0 0 var(--space-1)',
                  letterSpacing: '-0.02em',
                }}
              >
                Design Your Workspace
              </h2>
              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                }}
              >
                Pick furniture, add accessories, and see it come to life.
              </p>
            </div>
            <Scene />
          </div>

          {/* Picker area */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)',
            }}
          >
            <PresetBar />
            <PickerTabs />

            {/* CTA */}
            <div
              style={{
                padding: 'var(--space-4)',
                background: 'var(--color-bg-card)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  Monthly Total
                </span>
                <motion.span
                  key={total}
                  initial={{ y: -4, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: 'var(--color-accent)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {formatPrice(total)}
                </motion.span>
              </div>

              <button
                className="btn-primary"
                disabled={!isMinimumMet}
                onClick={() => setCheckoutView('summary')}
                type="button"
                id="ready-to-rent-btn"
                style={{ width: '100%', padding: 'var(--space-3) var(--space-6)' }}
              >
                <ShoppingBag size={16} />
                {isMinimumMet ? 'Ready to Rent?' : 'Select desk & chair to continue'}
              </button>

              {!isMinimumMet && (
                <p
                  style={{
                    textAlign: 'center',
                    fontSize: '0.72rem',
                    color: 'var(--color-text-muted)',
                    margin: 0,
                  }}
                >
                  Choose a desk and chair to unlock checkout
                </p>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer
          style={{
            padding: 'var(--space-4) var(--space-6)',
            textAlign: 'center',
            borderTop: '1px solid var(--color-border)',
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
          }}
        >
          monis.rent — Furniture rental for Bali&apos;s remote workers
        </footer>
      </div>

      <CheckoutPanel />
    </>
  );
}
