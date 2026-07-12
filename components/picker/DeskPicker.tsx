'use client';

import { desks } from '@/lib/data/products';
import { useConfigurator } from '@/lib/context/ConfiguratorContext';
import OptionCard from './OptionCard';

export default function DeskPicker() {
  const { state, dispatch } = useConfigurator();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: 'var(--space-3)',
      }}
    >
      {desks.map((desk) => (
        <OptionCard
          key={desk.id}
          id={desk.id}
          name={desk.name}
          price={desk.price}
          thumbnail={desk.thumbnail}
          isSelected={state.deskId === desk.id}
          onSelect={() => dispatch({ type: 'SET_DESK', deskId: desk.id })}
        />
      ))}
    </div>
  );
}
