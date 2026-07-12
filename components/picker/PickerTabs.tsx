'use client';

import { useState, type ReactNode } from 'react';
import { Armchair, Table, Sparkles } from 'lucide-react';
import DeskPicker from './DeskPicker';
import ChairPicker from './ChairPicker';
import AccessoryPicker from './AccessoryPicker';

type Tab = 'desks' | 'chairs' | 'accessories';

const tabs: { id: Tab; label: string; icon: ReactNode }[] = [
  { id: 'desks', label: 'Desks', icon: <Table size={15} /> },
  { id: 'chairs', label: 'Chairs', icon: <Armchair size={15} /> },
  { id: 'accessories', label: 'Extras', icon: <Sparkles size={15} /> },
];

export default function PickerTabs() {
  const [activeTab, setActiveTab] = useState<Tab>('desks');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div className="segmented-control" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className="segmented-btn"
            data-active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            type="button"
            style={{ position: 'relative' }}
          >
            {activeTab === tab.id && (
              <div className="segmented-highlight" style={{ left: 4, right: 4 }} />
            )}
            <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
              {tab.icon}
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      <div role="tabpanel" style={{ minHeight: '300px' }}>
        {activeTab === 'desks' && <DeskPicker />}
        {activeTab === 'chairs' && <ChairPicker />}
        {activeTab === 'accessories' && <AccessoryPicker />}
      </div>
    </div>
  );
}
