'use client';

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus } from 'lucide-react';
import { ExtraSpaceId } from '@/lib/types';
import { useConfigurator, SpaceCategory } from '@/lib/context/ConfiguratorContext';
import {
  getCatalogForSpace,
  getSpaceMeta,
  spaceMeta,
} from '@/lib/data/spaces';
import SpaceItemRow, { AddCustomItemForm } from './SpaceItemRow';
import { formatPrice } from '@/lib/data/products';

type SpaceCardProps = {
  spaceId: ExtraSpaceId;
  icon: ReactNode;
};

function SpaceCard({ spaceId, icon }: SpaceCardProps) {
  const {
    spaces,
    activeSpace,
    setActiveSpace,
    expandedSpace,
    setExpandedSpace,
    addCatalogItem,
  } = useConfigurator();

  const meta = getSpaceMeta(spaceId);
  const items = spaces[spaceId];
  const isExpanded = expandedSpace === spaceId;
  const isActive = activeSpace === spaceId;
  const catalogOptions = getCatalogForSpace(spaceId);
  const spaceTotal = items.reduce((sum, item) => sum + item.price, 0);
  const [showCustomForm, setShowCustomForm] = useState(false);

  function handleToggle() {
    const nextExpanded = isExpanded ? null : spaceId;
    setExpandedSpace(nextExpanded);
    setActiveSpace(spaceId);
    if (!isExpanded) {
      setShowCustomForm(false);
    }
  }

  function handleAddDefault(e: React.MouseEvent) {
    e.stopPropagation();
    setActiveSpace(spaceId);
    setExpandedSpace(spaceId);
    addCatalogItem(spaceId, meta.defaultCatalogId);
  }

  function handleAddCatalog(catalogId: string) {
    addCatalogItem(spaceId, catalogId);
  }

  return (
    <div
      className={`space-card ${isExpanded ? 'space-card-expanded' : ''} ${isActive ? 'space-card-active' : ''}`}
    >
      <button
        type="button"
        className="space-card-header"
        onClick={handleToggle}
        aria-expanded={isExpanded}
      >
        <div className="space-card-icon">{icon}</div>
        <div className="space-card-title-group">
          <h4 className="space-card-title">{meta.name}</h4>
          <p className="space-card-subtitle">
            {items.length === 0
              ? 'No items yet'
              : `${items.length} item${items.length === 1 ? '' : 's'} · ${formatPrice(spaceTotal)}/mo`}
          </p>
        </div>
        <div className="space-card-header-actions">
          {items.length > 0 && (
            <span className="space-count-badge">{items.length}</span>
          )}
          <ChevronDown
            size={18}
            className={`space-chevron ${isExpanded ? 'space-chevron-open' : ''}`}
          />
        </div>
      </button>

      {!isExpanded && (
        <button
          type="button"
          className="space-quick-add"
          onClick={handleAddDefault}
        >
          {meta.defaultAction}
        </button>
      )}

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="space-card-body"
          >
            {items.length > 0 ? (
              <div className="space-items-list">
                {items.map((item) => (
                  <SpaceItemRow
                    key={item.id}
                    spaceId={spaceId as SpaceCategory}
                    item={item}
                  />
                ))}
              </div>
            ) : (
              <div className="space-empty-state">
                <p>Start with a default item or add your own.</p>
              </div>
            )}

            <div className="space-actions">
              <button
                type="button"
                className="btn-quick-add space-action-btn"
                onClick={() => addCatalogItem(spaceId, meta.defaultCatalogId)}
              >
                <Plus size={14} />
                {meta.defaultAction}
              </button>

              <div className="space-catalog-options">
                {catalogOptions
                  .filter((option) => option.id !== meta.defaultCatalogId)
                  .map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className="space-catalog-btn"
                      onClick={() => handleAddCatalog(option.id)}
                    >
                      + {option.name}
                    </button>
                  ))}
              </div>

              {!showCustomForm ? (
                <button
                  type="button"
                  className="btn-ghost space-custom-trigger"
                  onClick={() => setShowCustomForm(true)}
                >
                  <Plus size={14} />
                  Add custom item
                </button>
              ) : (
                <AddCustomItemForm
                  spaceId={spaceId as SpaceCategory}
                  onClose={() => setShowCustomForm(false)}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type MoreSpacesSectionProps = {
  icons: Record<ExtraSpaceId, ReactNode>;
};

export default function MoreSpacesSection({ icons }: MoreSpacesSectionProps) {
  return (
    <section className="more-spaces-section">
      <div className="more-spaces-inner">
        <div className="more-spaces-header">
          <h3>More Spaces</h3>
          <p>Design every corner of your life. Add, edit, and manage items for each space.</p>
        </div>

        <div className="space-cards-grid">
          {spaceMeta.map((space) => (
            <SpaceCard key={space.id} spaceId={space.id} icon={icons[space.id]} />
          ))}
        </div>
      </div>
    </section>
  );
}
