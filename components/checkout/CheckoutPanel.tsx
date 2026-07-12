'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useConfigurator } from '@/lib/context/ConfiguratorContext';
import { formatPrice } from '@/lib/data/products';
import SuccessState from './SuccessState';
import Image from 'next/image';

export default function CheckoutPanel() {
  const { checkoutView, setCheckoutView, selectedItems, total } = useConfigurator();

  if (checkoutView === 'closed') return null;

  return (
    <AnimatePresence>
      <motion.div
        className="checkout-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => setCheckoutView('closed')}
      >
        <motion.div
          className="checkout-panel"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 10 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          {checkoutView === 'success' ? (
            <SuccessState />
          ) : (
            <>
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-6)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <ShoppingBag size={20} style={{ color: 'var(--color-accent)' }} />
                  <h2
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--color-text)',
                      margin: 0,
                    }}
                  >
                    Your Setup
                  </h2>
                </div>
                <button
                  onClick={() => setCheckoutView('closed')}
                  type="button"
                  aria-label="Close checkout"
                  style={{
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    background: 'var(--color-slate-100)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    color: 'var(--color-text-secondary)',
                    transition: 'background 150ms ease-out',
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Items list */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-3)',
                  marginBottom: 'var(--space-6)',
                }}
              >
                {selectedItems.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 'var(--space-3) var(--space-4)',
                      background: 'var(--color-slate-50)',
                      borderRadius: 'var(--radius-md)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <div
                        style={{
                          width: 40,
                          height: 36,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Image
                          src={product.thumbnail}
                          alt={product.name}
                          width={40}
                          height={36}
                          style={{ width: 'auto', height: 'auto', maxWidth: 40, maxHeight: 36 }}
                        />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                          {product.name}
                          {quantity > 1 && (
                            <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>
                              {' '}
                              × {quantity}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                          {product.description}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        whiteSpace: 'nowrap',
                        marginLeft: 'var(--space-3)',
                      }}
                    >
                      {formatPrice(product.price * quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div
                style={{
                  height: 1,
                  background: 'var(--color-border)',
                  margin: '0 0 var(--space-4)',
                }}
              />

              {/* Total */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: 'var(--space-6)',
                }}
              >
                <span
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  Monthly Total
                </span>
                <span
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--color-accent)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {formatPrice(total)}
                </span>
              </div>

              {/* Confirm button */}
              <button
                className="btn-primary"
                onClick={() => setCheckoutView('success')}
                type="button"
                id="rent-confirm-btn"
                style={{ width: '100%', padding: 'var(--space-4) var(--space-6)', fontSize: '1rem' }}
              >
                Rent Your Setup
                <ArrowRight size={18} />
              </button>

              <p
                style={{
                  textAlign: 'center',
                  fontSize: '0.75rem',
                  color: 'var(--color-text-muted)',
                  marginTop: 'var(--space-3)',
                  margin: 'var(--space-3) 0 0',
                }}
              >
                Free delivery within Bali • Cancel anytime
              </p>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
