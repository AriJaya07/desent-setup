'use client';

import { useConfigurator } from '@/lib/context/ConfiguratorContext';
import { presets, computeTotal, formatPrice } from '@/lib/data/products';

export default function PresetBar() {
  const { dispatch } = useConfigurator();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
      <span
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--color-text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        Quick Start
      </span>
      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
        {presets.map((preset) => (
          <button
            key={preset.id}
            className="preset-card"
            onClick={() => dispatch({ type: 'APPLY_PRESET', state: preset.state })}
            type="button"
            title={preset.description}
          >
            <span style={{ fontSize: '1.2rem' }}>{preset.emoji}</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text)' }}>
                {preset.name}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                {formatPrice(computeTotal(preset.state))}/mo
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
