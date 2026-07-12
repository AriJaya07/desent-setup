'use client';

import { useConfigurator } from '@/lib/context/ConfiguratorContext';
import { presets } from '@/lib/data/products';

export default function PresetBar() {
  const { dispatch } = useConfigurator();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
      <span
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--color-text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        Quick Start Presets
      </span>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-2)' }}>
        {presets.map((preset) => (
          <button
            key={preset.id}
            className="option-card"
            onClick={() => dispatch({ type: 'APPLY_PRESET', state: preset.state })}
            type="button"
            title={preset.description}
            style={{ padding: 'var(--space-2)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <span style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{preset.emoji}</span>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-text)', textAlign: 'center' }}>
              {preset.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
