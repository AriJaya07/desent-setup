import { Product, Preset, ConfiguratorState } from '@/lib/types';

// ─── Desks ───────────────────────────────────────────────

export const desks: Product[] = [
  {
    id: 'desk-bamboo',
    name: 'Bamboo Standing Desk',
    category: 'desk',
    price: 450000,
    description: 'Natural bamboo top with adjustable height legs',
    thumbnail: '/assets/thumbnails/desk-bamboo.svg',
    sceneAsset: '/assets/scene/desk-bamboo.svg',
  },
  {
    id: 'desk-walnut',
    name: 'Walnut Classic Desk',
    category: 'desk',
    price: 350000,
    description: 'Rich walnut finish, solid build with cable management',
    thumbnail: '/assets/thumbnails/desk-walnut.svg',
    sceneAsset: '/assets/scene/desk-walnut.svg',
  },
  {
    id: 'desk-minimal',
    name: 'White Minimal Desk',
    category: 'desk',
    price: 280000,
    description: 'Clean white surface with slim metal legs',
    thumbnail: '/assets/thumbnails/desk-minimal.svg',
    sceneAsset: '/assets/scene/desk-minimal.svg',
  },
];

// ─── Chairs ──────────────────────────────────────────────

export const chairs: Product[] = [
  {
    id: 'chair-ergo',
    name: 'Ergonomic Mesh Chair',
    category: 'chair',
    price: 520000,
    description: 'Full mesh back with lumbar support and armrests',
    thumbnail: '/assets/thumbnails/chair-ergo.svg',
    sceneAsset: '/assets/scene/chair-ergo.svg',
  },
  {
    id: 'chair-mid',
    name: 'Mid-Century Chair',
    category: 'chair',
    price: 380000,
    description: 'Wooden legs with cushioned seat and back',
    thumbnail: '/assets/thumbnails/chair-mid.svg',
    sceneAsset: '/assets/scene/chair-mid.svg',
  },
  {
    id: 'chair-gaming',
    name: 'Premium Task Chair',
    category: 'chair',
    price: 680000,
    description: 'Fully adjustable with headrest and tilt lock',
    thumbnail: '/assets/thumbnails/chair-gaming.svg',
    sceneAsset: '/assets/scene/chair-gaming.svg',
  },
];

// ─── Accessories ─────────────────────────────────────────

export const accessories: Product[] = [
  {
    id: 'monitor',
    name: '27" Monitor',
    category: 'monitor',
    price: 250000,
    description: '27-inch IPS display with USB-C',
    thumbnail: '/assets/thumbnails/monitor.svg',
    sceneAsset: '/assets/scene/monitor.svg',
  },
  {
    id: 'lamp',
    name: 'Desk Lamp',
    category: 'lamp',
    price: 85000,
    description: 'Adjustable LED lamp with warm light',
    thumbnail: '/assets/thumbnails/lamp.svg',
    sceneAsset: '/assets/scene/lamp.svg',
  },
  {
    id: 'plant',
    name: 'Monstera Plant',
    category: 'plant',
    price: 65000,
    description: 'Low-maintenance tropical plant in ceramic pot',
    thumbnail: '/assets/thumbnails/plant.svg',
    sceneAsset: '/assets/scene/plant.svg',
  },
];

// ─── All products lookup ─────────────────────────────────

export const allProducts: Product[] = [...desks, ...chairs, ...accessories];

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

// ─── Price computation (derived, never stored) ───────────

export function computeTotal(state: ConfiguratorState): number {
  let total = 0;

  const desk = getProductById(state.deskId);
  if (desk) total += desk.price;

  const chair = getProductById(state.chairId);
  if (chair) total += chair.price;

  const monitor = getProductById('monitor');
  if (monitor) total += monitor.price * state.monitorCount;

  const lamp = getProductById('lamp');
  if (lamp && state.hasLamp) total += lamp.price;

  const plant = getProductById('plant');
  if (plant && state.hasPlant) total += plant.price;

  return total;
}

// ─── Format price (IDR) ─────────────────────────────────

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// ─── Selected items as list ──────────────────────────────

export function getSelectedItems(
  state: ConfiguratorState
): { product: Product; quantity: number }[] {
  const items: { product: Product; quantity: number }[] = [];

  const desk = getProductById(state.deskId);
  if (desk) items.push({ product: desk, quantity: 1 });

  const chair = getProductById(state.chairId);
  if (chair) items.push({ product: chair, quantity: 1 });

  if (state.monitorCount > 0) {
    const monitor = getProductById('monitor');
    if (monitor) items.push({ product: monitor, quantity: state.monitorCount });
  }

  if (state.hasLamp) {
    const lamp = getProductById('lamp');
    if (lamp) items.push({ product: lamp, quantity: 1 });
  }

  if (state.hasPlant) {
    const plant = getProductById('plant');
    if (plant) items.push({ product: plant, quantity: 1 });
  }

  return items;
}

// ─── Default state ───────────────────────────────────────

export const defaultState: ConfiguratorState = {
  deskId: 'desk-bamboo',
  chairId: 'chair-ergo',
  monitorCount: 1,
  hasLamp: false,
  hasPlant: false,
};

// ─── Presets ─────────────────────────────────────────────

export const presets: Preset[] = [
  {
    id: 'minimalist',
    name: 'Minimalist',
    emoji: '🧘',
    description: 'Clean desk, simple chair, nothing extra',
    state: {
      deskId: 'desk-minimal',
      chairId: 'chair-mid',
      monitorCount: 0,
      hasLamp: false,
      hasPlant: true,
    },
  },
  {
    id: 'creator',
    name: 'Creator Setup',
    emoji: '🎨',
    description: 'Dual monitors, great lighting, inspired by nature',
    state: {
      deskId: 'desk-bamboo',
      chairId: 'chair-ergo',
      monitorCount: 2,
      hasLamp: true,
      hasPlant: true,
    },
  },
  {
    id: 'focus',
    name: 'Focus Mode',
    emoji: '🎯',
    description: 'Ergonomic chair, standing desk, single screen',
    state: {
      deskId: 'desk-bamboo',
      chairId: 'chair-ergo',
      monitorCount: 1,
      hasLamp: true,
      hasPlant: false,
    },
  },
];
