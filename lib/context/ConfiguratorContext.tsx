'use client';

import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  type ReactNode,
} from 'react';
import {
  ConfiguratorState,
  ConfiguratorAction,
  CheckoutView,
} from '@/lib/types';

export type SpaceCategory = 'workspace' | 'coffee' | 'outdoor' | 'relax' | 'garage';
import { defaultState, computeTotal, getSelectedItems } from '@/lib/data/products';

// ─── Reducer ─────────────────────────────────────────────

function configuratorReducer(
  state: ConfiguratorState,
  action: ConfiguratorAction
): ConfiguratorState {
  switch (action.type) {
    case 'SET_DESK':
      return { ...state, deskId: action.deskId };
    case 'SET_CHAIR':
      return { ...state, chairId: action.chairId };
    case 'SET_MONITOR_COUNT':
      return { ...state, monitorCount: Math.max(0, Math.min(2, action.count)) };
    case 'TOGGLE_LAMP':
      return { ...state, hasLamp: !state.hasLamp };
    case 'TOGGLE_PLANT':
      return { ...state, hasPlant: !state.hasPlant };
    case 'APPLY_PRESET':
      return { ...action.state };
    case 'RESET':
      return { ...defaultState };
    default:
      return state;
  }
}

// ─── Context shape ───────────────────────────────────────

type ConfiguratorContextValue = {
  state: ConfiguratorState;
  dispatch: React.Dispatch<ConfiguratorAction>;
  total: number;
  selectedItems: ReturnType<typeof getSelectedItems>;
  checkoutView: CheckoutView;
  setCheckoutView: (view: CheckoutView) => void;
  isMinimumMet: boolean; // desk + chair both selected
  activeSpace: SpaceCategory;
  setActiveSpace: (space: SpaceCategory) => void;
};

const ConfiguratorContext = createContext<ConfiguratorContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────

export function ConfiguratorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(configuratorReducer, defaultState);
  const [checkoutView, setCheckoutView] = useReducer(
    (_: CheckoutView, next: CheckoutView) => next,
    'closed' as CheckoutView
  );
  const [activeSpace, setActiveSpace] = useReducer(
    (_: SpaceCategory, next: SpaceCategory) => next,
    'workspace' as SpaceCategory
  );

  const total = useMemo(() => computeTotal(state), [state]);
  const selectedItems = useMemo(() => getSelectedItems(state), [state]);
  const isMinimumMet = Boolean(state.deskId && state.chairId);

  const value = useMemo<ConfiguratorContextValue>(
    () => ({
      state,
      dispatch,
      total,
      selectedItems,
      checkoutView,
      setCheckoutView,
      isMinimumMet,
      activeSpace,
      setActiveSpace,
    }),
    [state, total, selectedItems, checkoutView, isMinimumMet, activeSpace]
  );

  return (
    <ConfiguratorContext.Provider value={value}>
      {children}
    </ConfiguratorContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────

export function useConfigurator(): ConfiguratorContextValue {
  const ctx = useContext(ConfiguratorContext);
  if (!ctx) {
    throw new Error('useConfigurator must be used within ConfiguratorProvider');
  }
  return ctx;
}
