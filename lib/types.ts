export type ProductCategory = 'desk' | 'chair' | 'monitor' | 'lamp' | 'plant';

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  thumbnail: string;
  sceneAsset: string;
};

export type ConfiguratorState = {
  deskId: string;
  chairId: string;
  monitorCount: number; // 0, 1, or 2
  hasLamp: boolean;
  hasPlant: boolean;
};

export type ConfiguratorAction =
  | { type: 'SET_DESK'; deskId: string }
  | { type: 'SET_CHAIR'; chairId: string }
  | { type: 'SET_MONITOR_COUNT'; count: number }
  | { type: 'TOGGLE_LAMP' }
  | { type: 'TOGGLE_PLANT' }
  | { type: 'APPLY_PRESET'; state: ConfiguratorState }
  | { type: 'RESET' };

export type CheckoutView = 'closed' | 'summary' | 'success';

export type Preset = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  state: ConfiguratorState;
};

// ─── More Spaces ─────────────────────────────────────────

export type ExtraSpaceId = 'coffee' | 'outdoor' | 'relax' | 'garage';

export type SpaceCatalogItem = {
  id: string;
  spaceId: ExtraSpaceId;
  name: string;
  price: number;
  description: string;
  thumbnail: string;
  sceneAsset: string;
};

export type SpaceItem = {
  id: string;
  catalogId?: string;
  name: string;
  price: number;
  isCustom: boolean;
};

export type SpacesState = Record<ExtraSpaceId, SpaceItem[]>;

export type SpacesAction =
  | { type: 'ADD_CATALOG_ITEM'; spaceId: ExtraSpaceId; catalogId: string }
  | {
      type: 'ADD_CUSTOM_ITEM';
      spaceId: ExtraSpaceId;
      name: string;
      price: number;
    }
  | {
      type: 'UPDATE_SPACE_ITEM';
      spaceId: ExtraSpaceId;
      itemId: string;
      name: string;
      price: number;
    }
  | { type: 'REMOVE_SPACE_ITEM'; spaceId: ExtraSpaceId; itemId: string };

export type ToastType = 'success' | 'error';

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
};
