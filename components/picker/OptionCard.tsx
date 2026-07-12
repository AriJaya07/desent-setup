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
    >
      <div
        style={{
          width: 64,
          height: 52,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          src={thumbnail}
          alt={name}
          width={64}
          height={52}
          style={{ width: 'auto', height: 'auto', maxWidth: 64, maxHeight: 52 }}
        />
      </div>
      <span
        style={{
          fontSize: '0.8rem',
          fontWeight: 600,
          color: 'var(--color-text)',
          textAlign: 'center',
          lineHeight: 1.3,
        }}
      >
        {name}
      </span>
      <span
        style={{
          fontSize: '0.75rem',
          fontWeight: 500,
          color: 'var(--color-text-muted)',
        }}
      >
        {formatPrice(price)}/mo
      </span>
    </button>
  );
}
