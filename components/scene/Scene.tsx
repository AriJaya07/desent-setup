'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useConfigurator } from '@/lib/context/ConfiguratorContext';
import { getProductById } from '@/lib/data/products';
import Image from 'next/image';
import SpaceScene from './SpaceScene';

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

export default function Scene() {
  const { state, activeSpace } = useConfigurator();

  if (activeSpace !== 'workspace') {
    return <SpaceScene spaceId={activeSpace} />;
  }

  const desk = getProductById(state.deskId);
  const chair = getProductById(state.chairId);

  return (
    <div className="scene-container" id="scene-container">
      {/* Floor line */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '0%',
          right: '0%',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, var(--color-border) 20%, var(--color-border) 80%, transparent)',
        }}
      />

      {/* Floor shadow under desk */}
      <div
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70%',
          height: '16px',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Chair (behind desk) */}
      <AnimatePresence mode="wait">
        {chair && (
          <motion.div
            key={chair.id}
            className="scene-layer"
            style={{ bottom: '9%', zIndex: 5, width: '25%' }}
            {...fadeScale}
            transition={itemTransition}
          >
            <Image
              src={chair.sceneAsset}
              alt={chair.name}
              width={240}
              height={280}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desk */}
      <AnimatePresence mode="wait">
        {desk && (
          <motion.div
            key={desk.id}
            className="scene-layer"
            style={{ bottom: '10%', zIndex: 10, width: '60%' }}
            {...fadeScale}
            transition={itemTransition}
          >
            <Image
              src={desk.sceneAsset}
              alt={desk.name}
              width={440}
              height={200}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Monitors on desk */}
      <AnimatePresence>
        {state.monitorCount >= 1 && (
          <motion.div
            key="monitor-1"
            className="scene-layer"
            style={{
              bottom: '43%',
              zIndex: 15,
              width: '22%',
              marginLeft: state.monitorCount === 2 ? '-11%' : '0',
            }}
            initial={{ opacity: 0, y: 20, scale: 0.85, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: 10, scale: 0.9, x: '-50%' }}
            transition={itemTransition}
          >
            <Image
              src="/assets/scene/monitor.svg"
              alt="Monitor"
              width={200}
              height={160}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {state.monitorCount >= 2 && (
          <motion.div
            key="monitor-2"
            className="scene-layer"
            style={{
              bottom: '43%',
              zIndex: 14,
              width: '22%',
              marginLeft: '11%',
            }}
            initial={{ opacity: 0, y: 20, scale: 0.85, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: 10, scale: 0.9, x: '-50%' }}
            transition={{ ...itemTransition, delay: 0.05 }}
          >
            <Image
              src="/assets/scene/monitor.svg"
              alt="Monitor 2"
              width={200}
              height={160}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lamp on desk */}
      <AnimatePresence>
        {state.hasLamp && (
          <motion.div
            key="lamp"
            className="scene-layer"
            style={{
              bottom: '36%',
              zIndex: 16,
              width: '12%',
              marginLeft: '24%',
            }}
            initial={{ opacity: 0, scale: 0.7, y: 10, x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, scale: 0.8, y: 5, x: '-50%' }}
            transition={itemTransition}
          >
            <Image
              src="/assets/scene/lamp.svg"
              alt="Desk Lamp"
              width={100}
              height={180}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plant beside desk */}
      <AnimatePresence>
        {state.hasPlant && (
          <motion.div
            key="plant"
            className="scene-layer"
            style={{
              bottom: '10%',
              zIndex: 20,
              width: '14%',
              marginLeft: '34%',
            }}
            initial={{ opacity: 0, scale: 0.7, y: 15, x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, scale: 0.8, y: 8, x: '-50%' }}
            transition={{ ...itemTransition, delay: 0.02 }}
          >
            <Image
              src="/assets/scene/plant.svg"
              alt="Monstera Plant"
              width={120}
              height={180}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state overlay */}
      {!desk && !chair && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 30,
          }}
        >
          <div
            style={{
              textAlign: 'center',
              color: 'var(--color-text-muted)',
              fontSize: '1.1rem',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🪑</div>
            <p>Pick a desk and chair to start building</p>
          </div>
        </div>
      )}
    </div>
  );
}
