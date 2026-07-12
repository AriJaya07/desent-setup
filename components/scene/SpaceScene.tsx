'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useConfigurator, SpaceCategory } from '@/lib/context/ConfiguratorContext';
import { getItemAssets, getSpaceMeta } from '@/lib/data/spaces';

const itemTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 25,
  mass: 0.8,
};

const fadeScale = {
  initial: { opacity: 0, scale: 0.92, y: 8, x: '-50%' },
  animate: { opacity: 1, scale: 1, y: 0, x: '-50%' },
  exit: { opacity: 0, scale: 0.95, y: -4, x: '-50%' },
};

type SpaceSceneProps = {
  spaceId: Exclude<SpaceCategory, 'workspace'>;
};

export default function SpaceScene({ spaceId }: SpaceSceneProps) {
  const { spaces, setActiveSpace } = useConfigurator();
  const meta = getSpaceMeta(spaceId);
  const items = spaces[spaceId];

  const positions = [
    { bottom: '12%', width: '28%', marginLeft: '-18%', zIndex: 10 },
    { bottom: '14%', width: '24%', marginLeft: '0%', zIndex: 12 },
    { bottom: '10%', width: '22%', marginLeft: '18%', zIndex: 11 },
    { bottom: '16%', width: '20%', marginLeft: '-32%', zIndex: 9 },
    { bottom: '11%', width: '20%', marginLeft: '32%', zIndex: 9 },
  ];

  return (
    <div
      className="scene-container space-scene"
      id="scene-container"
      style={{ background: meta.sceneBackground }}
    >
      <div className="space-scene-label">{meta.name}</div>

      <div
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '75%',
          height: '14px',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.05) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      <AnimatePresence mode="popLayout">
        {items.map((item, index) => {
          const pos = positions[index % positions.length];
          const assets = getItemAssets(item);

          return (
            <motion.div
              key={item.id}
              className="scene-layer"
              style={{
                bottom: pos.bottom,
                zIndex: pos.zIndex,
                width: pos.width,
                marginLeft: pos.marginLeft,
              }}
              layout
              {...fadeScale}
              transition={itemTransition}
            >
              <Image
                src={assets.sceneAsset}
                alt={item.name}
                width={240}
                height={200}
                style={{ width: '100%', height: 'auto' }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {items.length === 0 && (
        <div className="space-scene-empty">
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>
            {spaceId === 'coffee' && '☕'}
            {spaceId === 'outdoor' && '🏄'}
            {spaceId === 'relax' && '🛋️'}
            {spaceId === 'garage' && '🔧'}
          </div>
          <h2>{meta.name}</h2>
          <p>Add items below to preview them here.</p>
        </div>
      )}

      <button
        onClick={() => setActiveSpace('workspace')}
        className="btn-primary space-scene-back"
        type="button"
      >
        Back to Workspace
      </button>
    </div>
  );
}
