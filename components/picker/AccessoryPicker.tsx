'use client';

import Image from 'next/image';
import { useConfigurator } from '@/lib/context/ConfiguratorContext';
import { accessories, formatPrice } from '@/lib/data/products';
import { Minus, Plus } from 'lucide-react';

export default function AccessoryPicker() {
  const { state, dispatch } = useConfigurator();

  const monitor = accessories.find((a) => a.category === 'monitor')!;
  const lamp = accessories.find((a) => a.category === 'lamp')!;
  const plant = accessories.find((a) => a.category === 'plant')!;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      {/* Monitor counter */}
      <div
        className="option-card"
        data-selected={state.monitorCount > 0}
        style={{ flexDirection: 'row', justifyContent: 'space-between', cursor: 'default' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ width: 48, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              src={monitor.thumbnail}
              alt={monitor.name}
              width={48}
              height={40}
              style={{ width: 'auto', height: 'auto', maxWidth: 48, maxHeight: 40 }}
            />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{monitor.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              {formatPrice(monitor.price)}/mo each
            </div>
          </div>
        </div>
        <div className="counter-group">
          <button
            className="counter-btn"
            onClick={() => dispatch({ type: 'SET_MONITOR_COUNT', count: state.monitorCount - 1 })}
            disabled={state.monitorCount <= 0}
            type="button"
            aria-label="Remove monitor"
          >
            <Minus size={14} />
          </button>
          <span
            style={{
              width: 28,
              textAlign: 'center',
              fontWeight: 600,
              fontSize: '0.9rem',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {state.monitorCount}
          </span>
          <button
            className="counter-btn"
            onClick={() => dispatch({ type: 'SET_MONITOR_COUNT', count: state.monitorCount + 1 })}
            disabled={state.monitorCount >= 2}
            type="button"
            aria-label="Add monitor"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Lamp toggle */}
      <button
        className="option-card"
        data-selected={state.hasLamp}
        onClick={() => dispatch({ type: 'TOGGLE_LAMP' })}
        type="button"
        aria-pressed={state.hasLamp}
        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ width: 48, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              src={lamp.thumbnail}
              alt={lamp.name}
              width={48}
              height={40}
              style={{ width: 'auto', height: 'auto', maxWidth: 48, maxHeight: 40 }}
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{lamp.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              {formatPrice(lamp.price)}/mo
            </div>
          </div>
        </div>
        <div
          style={{
            width: 40,
            height: 24,
            borderRadius: 12,
            background: state.hasLamp ? 'var(--color-accent)' : 'var(--color-slate-200)',
            position: 'relative',
            transition: 'background 150ms ease-out',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: '#fff',
              position: 'absolute',
              top: 3,
              left: state.hasLamp ? 19 : 3,
              transition: 'left 150ms ease-out',
              boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            }}
          />
        </div>
      </button>

      {/* Plant toggle */}
      <button
        className="option-card"
        data-selected={state.hasPlant}
        onClick={() => dispatch({ type: 'TOGGLE_PLANT' })}
        type="button"
        aria-pressed={state.hasPlant}
        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ width: 48, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              src={plant.thumbnail}
              alt={plant.name}
              width={48}
              height={40}
              style={{ width: 'auto', height: 'auto', maxWidth: 48, maxHeight: 40 }}
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{plant.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              {formatPrice(plant.price)}/mo
            </div>
          </div>
        </div>
        <div
          style={{
            width: 40,
            height: 24,
            borderRadius: 12,
            background: state.hasPlant ? 'var(--color-accent)' : 'var(--color-slate-200)',
            position: 'relative',
            transition: 'background 150ms ease-out',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: '#fff',
              position: 'absolute',
              top: 3,
              left: state.hasPlant ? 19 : 3,
              transition: 'left 150ms ease-out',
              boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            }}
          />
        </div>
      </button>
    </div>
  );
}
