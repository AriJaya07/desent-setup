'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Pencil, Trash2, Check, X, Plus } from 'lucide-react';
import { SpaceItem } from '@/lib/types';
import { useConfigurator, SpaceCategory } from '@/lib/context/ConfiguratorContext';
import { formatPrice } from '@/lib/data/products';
import { getItemAssets } from '@/lib/data/spaces';

type SpaceItemRowProps = {
  spaceId: SpaceCategory;
  item: SpaceItem;
};

export default function SpaceItemRow({ spaceId, item }: SpaceItemRowProps) {
  const { updateSpaceItem, removeSpaceItem } = useConfigurator();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(String(item.price));
  const assets = getItemAssets(item);

  function handleSave() {
    const saved = updateSpaceItem(spaceId, item.id, name, price);
    if (saved) {
      setIsEditing(false);
    }
  }

  function handleCancel() {
    setName(item.name);
    setPrice(String(item.price));
    setIsEditing(false);
  }

  function handleRemove() {
    removeSpaceItem(spaceId, item.id);
  }

  if (isEditing) {
    return (
      <div className="space-item-row space-item-row-editing">
        <div className="space-item-edit-fields">
          <input
            className="space-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Item name"
            aria-label="Item name"
            maxLength={50}
          />
          <input
            className="space-input"
            value={price}
            onChange={(e) => setPrice(e.target.value.replace(/[^\d]/g, ''))}
            placeholder="Monthly price"
            aria-label="Monthly price"
            inputMode="numeric"
          />
        </div>
        <div className="space-item-actions">
          <button
            type="button"
            className="space-icon-btn space-icon-btn-save"
            onClick={handleSave}
            aria-label="Save changes"
          >
            <Check size={16} />
          </button>
          <button
            type="button"
            className="space-icon-btn"
            onClick={handleCancel}
            aria-label="Cancel editing"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-item-row">
      <div className="space-item-info">
        <div className="space-item-thumb">
          <Image
            src={assets.thumbnail}
            alt=""
            fill
            style={{ objectFit: 'contain' }}
            sizes="36px"
          />
        </div>
        <div>
          <div className="space-item-name">
            {item.name}
            {item.isCustom && (
              <span className="space-item-badge">Custom</span>
            )}
          </div>
          <div className="space-item-price">{formatPrice(item.price)}/mo</div>
        </div>
      </div>
      <div className="space-item-actions">
        <button
          type="button"
          className="space-icon-btn"
          onClick={() => setIsEditing(true)}
          aria-label={`Edit ${item.name}`}
        >
          <Pencil size={15} />
        </button>
        <button
          type="button"
          className="space-icon-btn space-icon-btn-danger"
          onClick={handleRemove}
          aria-label={`Remove ${item.name}`}
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}

type AddCustomItemFormProps = {
  spaceId: SpaceCategory;
  onClose: () => void;
};

export function AddCustomItemForm({ spaceId, onClose }: AddCustomItemFormProps) {
  const { addCustomItem } = useConfigurator();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const added = addCustomItem(spaceId, name, price);
    if (added) {
      setName('');
      setPrice('');
      onClose();
    }
  }

  return (
    <form className="space-custom-form" onSubmit={handleSubmit}>
      <div className="space-custom-form-header">
        <Plus size={16} />
        <span>Add custom item</span>
      </div>
      <div className="space-custom-form-fields">
        <input
          className="space-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
          aria-label="Custom item name"
          maxLength={50}
          required
        />
        <input
          className="space-input"
          value={price}
          onChange={(e) => setPrice(e.target.value.replace(/[^\d]/g, ''))}
          placeholder="Monthly price (IDR)"
          aria-label="Custom item price"
          inputMode="numeric"
          required
        />
      </div>
      <div className="space-custom-form-actions">
        <button type="button" className="btn-ghost" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn-secondary">
          Add Item
        </button>
      </div>
    </form>
  );
}
