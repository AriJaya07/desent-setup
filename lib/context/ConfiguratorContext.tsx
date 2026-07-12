'use client';

import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import {
  ConfiguratorState,
  ConfiguratorAction,
  CheckoutView,
  SpacesState,
  SpacesAction,
  Toast,
} from '@/lib/types';
import {
  defaultState,
  computeTotal,
  getSelectedItems,
} from '@/lib/data/products';
import {
  defaultSpacesState,
  computeSpacesTotal,
  createSpaceItemId,
  getSpaceCatalogItem,
  getAllSpaceItems,
  getItemAssets,
  getItemDescription,
  getSpaceMeta,
} from '@/lib/data/spaces';
import { validateSpaceItemInput } from '@/lib/spaces-validation';

export type SpaceCategory = 'workspace' | 'coffee' | 'outdoor' | 'relax' | 'garage';

// ─── Reducers ────────────────────────────────────────────

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

function spacesReducer(state: SpacesState, action: SpacesAction): SpacesState {
  switch (action.type) {
    case 'ADD_CATALOG_ITEM': {
      const catalogItem = getSpaceCatalogItem(action.catalogId);
      if (!catalogItem || catalogItem.spaceId !== action.spaceId) return state;

      const newItem = {
        id: createSpaceItemId(),
        catalogId: catalogItem.id,
        name: catalogItem.name,
        price: catalogItem.price,
        isCustom: false,
      };

      return {
        ...state,
        [action.spaceId]: [...state[action.spaceId], newItem],
      };
    }
    case 'ADD_CUSTOM_ITEM': {
      const newItem = {
        id: createSpaceItemId(),
        name: action.name,
        price: action.price,
        isCustom: true,
      };

      return {
        ...state,
        [action.spaceId]: [...state[action.spaceId], newItem],
      };
    }
    case 'UPDATE_SPACE_ITEM':
      return {
        ...state,
        [action.spaceId]: state[action.spaceId].map((item) =>
          item.id === action.itemId
            ? { ...item, name: action.name, price: action.price }
            : item
        ),
      };
    case 'REMOVE_SPACE_ITEM':
      return {
        ...state,
        [action.spaceId]: state[action.spaceId].filter(
          (item) => item.id !== action.itemId
        ),
      };
    default:
      return state;
  }
}

// ─── Context shape ───────────────────────────────────────

type SelectedSpaceItem = {
  spaceId: SpaceCategory;
  spaceName: string;
  item: ReturnType<typeof getAllSpaceItems>[number]['item'];
  thumbnail: string;
  description: string;
};

type ConfiguratorContextValue = {
  state: ConfiguratorState;
  dispatch: React.Dispatch<ConfiguratorAction>;
  spaces: SpacesState;
  spacesDispatch: React.Dispatch<SpacesAction>;
  addCatalogItem: (spaceId: SpaceCategory, catalogId: string) => boolean;
  addCustomItem: (
    spaceId: SpaceCategory,
    name: string,
    priceInput: string
  ) => boolean;
  updateSpaceItem: (
    spaceId: SpaceCategory,
    itemId: string,
    name: string,
    priceInput: string
  ) => boolean;
  removeSpaceItem: (spaceId: SpaceCategory, itemId: string) => void;
  total: number;
  workspaceTotal: number;
  spacesTotal: number;
  selectedItems: ReturnType<typeof getSelectedItems>;
  selectedSpaceItems: SelectedSpaceItem[];
  checkoutView: CheckoutView;
  setCheckoutView: (view: CheckoutView) => void;
  isMinimumMet: boolean;
  activeSpace: SpaceCategory;
  setActiveSpace: (space: SpaceCategory) => void;
  expandedSpace: SpaceCategory | null;
  setExpandedSpace: (space: SpaceCategory | null) => void;
  toast: Toast | null;
  dismissToast: () => void;
};

const ConfiguratorContext = createContext<ConfiguratorContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────

export function ConfiguratorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(configuratorReducer, defaultState);
  const [spaces, spacesDispatch] = useReducer(spacesReducer, defaultSpacesState);
  const [checkoutView, setCheckoutView] = useReducer(
    (_: CheckoutView, next: CheckoutView) => next,
    'closed' as CheckoutView
  );
  const [activeSpace, setActiveSpace] = useReducer(
    (_: SpaceCategory, next: SpaceCategory) => next,
    'workspace' as SpaceCategory
  );
  const [expandedSpace, setExpandedSpace] = useReducer(
    (_: SpaceCategory | null, next: SpaceCategory | null) => next,
    null as SpaceCategory | null
  );
  const [toast, setToast] = useReducer(
    (_: Toast | null, next: Toast | null) => next,
    null as Toast | null
  );

  const showToast = useCallback((message: string, type: Toast['type']) => {
    setToast({ id: `${Date.now()}`, message, type });
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const addCatalogItem = useCallback(
    (spaceId: SpaceCategory, catalogId: string) => {
      if (spaceId === 'workspace') return false;

      const catalogItem = getSpaceCatalogItem(catalogId);
      if (!catalogItem || catalogItem.spaceId !== spaceId) {
        showToast('Could not add that item. Please try again.', 'error');
        return false;
      }

      spacesDispatch({ type: 'ADD_CATALOG_ITEM', spaceId, catalogId });
      showToast(`${catalogItem.name} added to ${getSpaceMeta(spaceId).name}.`, 'success');
      return true;
    },
    [showToast]
  );

  const addCustomItem = useCallback(
    (spaceId: SpaceCategory, name: string, priceInput: string) => {
      if (spaceId === 'workspace') return false;

      const result = validateSpaceItemInput(name, priceInput);
      if (!result.ok) {
        showToast(result.error, 'error');
        return false;
      }

      spacesDispatch({
        type: 'ADD_CUSTOM_ITEM',
        spaceId,
        name: result.name,
        price: result.price,
      });
      showToast(`${result.name} added to ${getSpaceMeta(spaceId).name}.`, 'success');
      return true;
    },
    [showToast]
  );

  const updateSpaceItem = useCallback(
    (
      spaceId: SpaceCategory,
      itemId: string,
      name: string,
      priceInput: string
    ) => {
      if (spaceId === 'workspace') return false;

      const result = validateSpaceItemInput(name, priceInput);
      if (!result.ok) {
        showToast(result.error, 'error');
        return false;
      }

      spacesDispatch({
        type: 'UPDATE_SPACE_ITEM',
        spaceId,
        itemId,
        name: result.name,
        price: result.price,
      });
      showToast('Item updated.', 'success');
      return true;
    },
    [showToast]
  );

  const removeSpaceItem = useCallback(
    (spaceId: SpaceCategory, itemId: string) => {
      if (spaceId === 'workspace') return;

      const item = spaces[spaceId]?.find((entry) => entry.id === itemId);
      spacesDispatch({ type: 'REMOVE_SPACE_ITEM', spaceId, itemId });
      showToast(item ? `${item.name} removed.` : 'Item removed.', 'success');
    },
    [spaces, showToast]
  );

  const workspaceTotal = useMemo(() => computeTotal(state), [state]);
  const spacesTotal = useMemo(() => computeSpacesTotal(spaces), [spaces]);
  const total = workspaceTotal + spacesTotal;
  const selectedItems = useMemo(() => getSelectedItems(state), [state]);
  const selectedSpaceItems = useMemo<SelectedSpaceItem[]>(
    () =>
      getAllSpaceItems(spaces).map(({ spaceId, item }) => {
        const assets = getItemAssets(item);
        return {
          spaceId,
          spaceName: getSpaceMeta(spaceId).name,
          item,
          thumbnail: assets.thumbnail,
          description: getItemDescription(item),
        };
      }),
    [spaces]
  );
  const isMinimumMet = Boolean(state.deskId && state.chairId);

  const value = useMemo<ConfiguratorContextValue>(
    () => ({
      state,
      dispatch,
      spaces,
      spacesDispatch,
      addCatalogItem,
      addCustomItem,
      updateSpaceItem,
      removeSpaceItem,
      total,
      workspaceTotal,
      spacesTotal,
      selectedItems,
      selectedSpaceItems,
      checkoutView,
      setCheckoutView,
      isMinimumMet,
      activeSpace,
      setActiveSpace,
      expandedSpace,
      setExpandedSpace,
      toast,
      dismissToast,
    }),
    [
      state,
      spaces,
      addCatalogItem,
      addCustomItem,
      updateSpaceItem,
      removeSpaceItem,
      total,
      workspaceTotal,
      spacesTotal,
      selectedItems,
      selectedSpaceItems,
      checkoutView,
      isMinimumMet,
      activeSpace,
      expandedSpace,
      toast,
      dismissToast,
    ]
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
