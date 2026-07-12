'use client';

import Image from 'next/image';
import { formatPrice } from '@/lib/data/products';

type OptionCardProps = {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
  isSelected: boolean;
  onSelect: () => void;
};

export default function OptionCard({
  name,
  price,
  thumbnail,
  isSelected,
  onSelect,
}: OptionCardProps) {
  return (
    <button
      className="option-card"
      data-selected={isSelected}
      onClick={onSelect}
      type="button"
      aria-pressed={isSelected}
      style={{
        width: '100%',
      }}
    >
      {isSelected && (
        <div style={{
          position: 'absolute',
          top: 8,
          right: 8,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--color-accent)'
        }} />
      )}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 64,
          marginBottom: 'var(--space-2)'
        }}
      >
        <Image
          src={thumbnail}
          alt={name}
          fill
          style={{ objectFit: 'contain' }}
          sizes="64px"
        />
      </div>
      <span
        style={{
          fontSize: '0.8rem',
          fontWeight: 600,
          color: 'var(--color-text)',
          textAlign: 'center',
          lineHeight: 1.2,
          marginBottom: '2px'
        }}
      >
        {name}
      </span>
      <span
        style={{
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
        }}
      >
        {formatPrice(price)}/mo
      </span>
    </button>
  );
}
