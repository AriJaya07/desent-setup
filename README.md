# monis.rent — Workspace Configurator

A playful, visual configurator that lets you build your dream Bali workspace and see it come to life before you rent it.

## Live Demo
Check out the live demo [here](https://desent-setup.vercel.app/). (To be updated after deployment)

## Approach
Given the 4-8 hour time constraint, I optimized for **disproportionate polish on a small surface area**. Rather than building a sprawling catalog with a complex backend, the focus is entirely on the front-end user experience: making the act of configuring a workspace feel fast, fluid, and delightful. 

**Visual Direction:**
I chose a flat, illustrated layered scene over a 3D or photo-composite approach. 
1. It yields the best delight-per-hour ratio.
2. It sidesteps the "uncanny valley" of slightly misaligned photo shadows.
3. It keeps the asset payload incredibly lightweight (pure SVGs) while still communicating the aesthetic vibe of the furniture.

**State Management:**
I opted for **React Context + `useReducer`** instead of reaching for Zustand or Redux. 
For a configurator of this scale (a handful of fields like `deskId`, `chairId`, `monitorCount`), Context avoids unnecessary dependencies and provides a clean, native way to manage global state. The state shape is small, static, and predictable. Total pricing and selected item lists are treated as derived values computed on the fly from the raw state, ensuring a single source of truth and eliminating synchronization bugs.

## Tech Stack
- **Next.js (App Router)** - For rapid scaffolding and optimized asset delivery
- **React Context + `useReducer`** - For clean, dependency-free state management
- **Tailwind CSS (v4)** - For utility-first styling with a custom warm color palette
- **Framer Motion** - For fluid, declarative spring animations during item swaps
- **Lucide React** - For clean, consistent UI iconography

## What I'd Add With More Time
- **Drag-and-drop accessory placement:** Allowing users to freely position the lamp or plant on the desk surface.
- **Automated test suite:** Jest/React Testing Library tests for the reducer logic and price computation functions to prevent regressions as the catalog grows.
- **Persistence & Auth:** Saving configurations to local storage or a backend so users can share links to their specific setup (e.g., via URL query params or a shortlink) or return to them later.
- **CMS Integration:** Moving the product catalog from a hardcoded `products.ts` file to a headless CMS if the inventory changes frequently.

## Running Locally

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
