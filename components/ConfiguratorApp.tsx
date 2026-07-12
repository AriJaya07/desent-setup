'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Monitor, Leaf, ArrowRight, Coffee, Tent, Sofa, Wrench } from 'lucide-react';
import Scene from '@/components/scene/Scene';
import PickerTabs from '@/components/picker/PickerTabs';
import PresetBar from '@/components/picker/PresetBar';
import CheckoutPanel from '@/components/checkout/CheckoutPanel';
import { useConfigurator } from '@/lib/context/ConfiguratorContext';
import { formatPrice } from '@/lib/data/products';

export default function ConfiguratorApp() {
  const { state, dispatch, total, isMinimumMet, setCheckoutView } = useConfigurator();

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
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
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header
          style={{
            height: '80px',
            padding: '0 var(--space-6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--color-border)',
            background: 'var(--color-bg)',
            position: 'sticky',
            top: 0,
            zIndex: 40,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--color-text)',
                margin: 0,
                letterSpacing: '-0.03em',
              }}
            >
              monis<span style={{ color: 'var(--color-accent)' }}>.rent</span>
            </h1>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
            Design Your Workspace
          </div>
        </header>

        {/* Immersive Stage */}
        <main className="immersive-stage">
          {/* Left Panel: Pickers */}
          <motion.div 
            className="glass-panel panel-left animate-fade-in"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <PresetBar />
            <div style={{ height: 1, background: 'var(--color-border)', margin: 'var(--space-4) 0' }} />
            <PickerTabs />
          </motion.div>

          {/* Center: The Scene */}
          <Scene />

          {/* Right Panel: Quick Actions (as seen in sketch) */}
          <motion.div 
            className="panel-right-actions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <button
              className="btn-quick-add"
              onClick={() => dispatch({ type: 'SET_MONITOR_COUNT', count: state.monitorCount >= 2 ? 0 : state.monitorCount + 1 })}
            >
              <Monitor size={16} />
              {state.monitorCount >= 2 ? 'Remove Monitor' : '+ Add Monitor'}
            </button>
            <button
              className="btn-quick-add"
              onClick={() => dispatch({ type: 'TOGGLE_PLANT' })}
            >
              <Leaf size={16} />
              {state.hasPlant ? 'Remove Plant' : '+ Place a Plant'}
            </button>
          </motion.div>

          {/* Bottom Floating CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            style={{
              position: 'absolute',
              bottom: 'var(--space-8)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-3)',
              zIndex: 30,
            }}
          >
            <div
              className="glass-panel"
              style={{
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: '999px',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', paddingRight: 'var(--space-4)', borderRight: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Monthly Total
                </span>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-accent)', fontVariantNumeric: 'tabular-nums', lineHeight: 1.1 }}>
                  {formatPrice(total)}
                </span>
              </div>
              
              <button
                className="btn-primary"
                disabled={!isMinimumMet}
                onClick={() => setCheckoutView('summary')}
                style={{ padding: 'var(--space-3) var(--space-6)' }}
              >
                <ShoppingBag size={18} />
                {isMinimumMet ? 'Ready to Rent?' : 'Pick Desk & Chair'}
              </button>
            </div>
          </motion.div>
        </main>

        {/* Extended Zones (from sketch) */}
        <section style={{ padding: 'var(--space-12) var(--space-6)', background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 var(--space-2)' }}>More Spaces</h3>
              <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>Design every corner of your life. Coming soon.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
              {[
                { name: 'Coffee Station', icon: <Coffee size={24} />, action: '+ Add Coffee Machine' },
                { name: 'Outdoor Gear', icon: <Tent size={24} />, action: '+ Add Surfboard' },
                { name: 'Relax Zone', icon: <Sofa size={24} />, action: '+ Add Bean Bag' },
                { name: 'Garage Space', icon: <Wrench size={24} />, action: '+ Add Tool Shelf' },
              ].map((zone) => (
                <div
                  key={zone.name}
                  style={{
                    border: '1px dashed var(--color-border-hover)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-6)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 'var(--space-4)',
                    background: 'var(--color-slate-50)',
                    opacity: 0.7,
                    cursor: 'not-allowed'
                  }}
                >
                  <div style={{ color: 'var(--color-slate-400)' }}>{zone.icon}</div>
                  <h4 style={{ margin: 0, fontWeight: 600 }}>{zone.name}</h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', background: 'var(--color-slate-200)', padding: '4px 12px', borderRadius: 999 }}>
                    {zone.action}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            padding: 'var(--space-6)',
            textAlign: 'center',
            borderTop: '1px solid var(--color-border)',
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
            background: 'var(--color-bg)',
          }}
        >
          monis.rent — Furniture rental for Bali&apos;s remote workers
        </footer>
      </div>

      <CheckoutPanel />
    </>
  );
}
