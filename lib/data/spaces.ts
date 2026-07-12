import {
  ExtraSpaceId,
  SpaceCatalogItem,
  SpaceItem,
  SpacesState,
} from '@/lib/types';

// ─── Space metadata ──────────────────────────────────────

export type SpaceMeta = {
  id: ExtraSpaceId;
  name: string;
  defaultCatalogId: string;
  defaultAction: string;
  sceneBackground: string;
};

export const spaceMeta: SpaceMeta[] = [
  {
    id: 'coffee',
    name: 'Coffee Station',
    defaultCatalogId: 'coffee-machine',
    defaultAction: '+ Add Coffee Machine',
    sceneBackground: 'linear-gradient(180deg, #f5ebe0 0%, #fafafa 60%)',
  },
  {
    id: 'outdoor',
    name: 'Outdoor Gear',
    defaultCatalogId: 'surfboard',
    defaultAction: '+ Add Surfboard',
    sceneBackground: 'linear-gradient(180deg, #e8f4ea 0%, #fafafa 60%)',
  },
  {
    id: 'relax',
    name: 'Relax Zone',
    defaultCatalogId: 'bean-bag',
    defaultAction: '+ Add Bean Bag',
    sceneBackground: 'linear-gradient(180deg, #f0e8f5 0%, #fafafa 60%)',
  },
  {
    id: 'garage',
    name: 'Garage Space',
    defaultCatalogId: 'tool-shelf',
    defaultAction: '+ Add Tool Shelf',
    sceneBackground: 'linear-gradient(180deg, #ececec 0%, #fafafa 60%)',
  },
];

export function getSpaceMeta(id: ExtraSpaceId): SpaceMeta {
  return spaceMeta.find((s) => s.id === id)!;
}

// ─── Catalog ─────────────────────────────────────────────

export const spaceCatalog: SpaceCatalogItem[] = [
  {
    id: 'coffee-machine',
    spaceId: 'coffee',
    name: 'Coffee Machine',
    price: 320000,
    description: 'Espresso machine with milk frother',
    thumbnail: '/assets/thumbnails/coffee-machine.svg',
    sceneAsset: '/assets/scene/coffee-machine.svg',
  },
  {
    id: 'coffee-grinder',
    spaceId: 'coffee',
    name: 'Burr Grinder',
    price: 145000,
    description: 'Precision burr grinder for fresh beans',
    thumbnail: '/assets/thumbnails/coffee-grinder.svg',
    sceneAsset: '/assets/scene/coffee-grinder.svg',
  },
  {
    id: 'surfboard',
    spaceId: 'outdoor',
    name: 'Surfboard',
    price: 180000,
    description: '9ft soft-top board, perfect for Canggu waves',
    thumbnail: '/assets/thumbnails/surfboard.svg',
    sceneAsset: '/assets/scene/surfboard.svg',
  },
  {
    id: 'beach-chair',
    spaceId: 'outdoor',
    name: 'Beach Chair',
    price: 95000,
    description: 'Foldable lounger with sun shade',
    thumbnail: '/assets/thumbnails/beach-chair.svg',
    sceneAsset: '/assets/scene/beach-chair.svg',
  },
  {
    id: 'bean-bag',
    spaceId: 'relax',
    name: 'Bean Bag',
    price: 120000,
    description: 'Oversized lounger in terracotta fabric',
    thumbnail: '/assets/thumbnails/bean-bag.svg',
    sceneAsset: '/assets/scene/bean-bag.svg',
  },
  {
    id: 'floor-lamp',
    spaceId: 'relax',
    name: 'Floor Lamp',
    price: 85000,
    description: 'Warm ambient light for reading nooks',
    thumbnail: '/assets/thumbnails/floor-lamp.svg',
    sceneAsset: '/assets/scene/floor-lamp.svg',
  },
  {
    id: 'tool-shelf',
    spaceId: 'garage',
    name: 'Tool Shelf',
    price: 210000,
    description: 'Steel shelving with starter tool kit',
    thumbnail: '/assets/thumbnails/tool-shelf.svg',
    sceneAsset: '/assets/scene/tool-shelf.svg',
  },
  {
    id: 'bike-rack',
    spaceId: 'garage',
    name: 'Bike Rack',
    price: 75000,
    description: 'Wall-mounted rack for two bikes',
    thumbnail: '/assets/thumbnails/bike-rack.svg',
    sceneAsset: '/assets/scene/bike-rack.svg',
  },
];

export const customItemAssets = {
  thumbnail: '/assets/thumbnails/custom-item.svg',
  sceneAsset: '/assets/scene/custom-item.svg',
};

export function getSpaceCatalogItem(id: string): SpaceCatalogItem | undefined {
  return spaceCatalog.find((item) => item.id === id);
}

export function getCatalogForSpace(spaceId: ExtraSpaceId): SpaceCatalogItem[] {
  return spaceCatalog.filter((item) => item.spaceId === spaceId);
}

export function getItemAssets(item: SpaceItem): {
  thumbnail: string;
  sceneAsset: string;
} {
  if (item.catalogId) {
    const catalogItem = getSpaceCatalogItem(item.catalogId);
    if (catalogItem) {
      return {
        thumbnail: catalogItem.thumbnail,
        sceneAsset: catalogItem.sceneAsset,
      };
    }
  }
  return customItemAssets;
}

export function getItemDescription(item: SpaceItem): string {
  if (item.catalogId) {
    return getSpaceCatalogItem(item.catalogId)?.description ?? 'Custom space item';
  }
  return 'Custom space item';
}

// ─── State helpers ───────────────────────────────────────

export const defaultSpacesState: SpacesState = {
  coffee: [],
  outdoor: [],
  relax: [],
  garage: [],
};

export function computeSpacesTotal(spaces: SpacesState): number {
  return Object.values(spaces)
    .flat()
    .reduce((sum, item) => sum + item.price, 0);
}

export function getAllSpaceItems(
  spaces: SpacesState
): { spaceId: ExtraSpaceId; item: SpaceItem }[] {
  return (Object.entries(spaces) as [ExtraSpaceId, SpaceItem[]][]).flatMap(
    ([spaceId, items]) => items.map((item) => ({ spaceId, item }))
  );
}

export function createSpaceItemId(): string {
  return `space-item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
