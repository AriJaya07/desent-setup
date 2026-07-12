'use client';

import { chairs } from '@/lib/data/products';
import { useConfigurator } from '@/lib/context/ConfiguratorContext';
import OptionCard from './OptionCard';

export default function ChairPicker() {
  const { state, dispatch } = useConfigurator();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: 'var(--space-3)',
      }}
    >
      {chairs.map((chair) => (
        <OptionCard
          key={chair.id}
          id={chair.id}
          name={chair.name}
          price={chair.price}
          thumbnail={chair.thumbnail}
          isSelected={state.chairId === chair.id}
          onSelect={() => dispatch({ type: 'SET_CHAIR', chairId: chair.id })}
        />
      ))}
    </div>
  );
}
