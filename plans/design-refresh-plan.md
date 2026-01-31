# PM OS Design Refresh Plan

## Overview
Transform the PM OS app to have a more appealing, Linear/Stripe-inspired design with medium density while keeping some vibrant colors for a cleaner aesthetic.

## Design Principles

### 1. Density (Medium)
- **Spacing scale**: Reduce from current generous spacing to tighter, more purposeful spacing
- **Card padding**: 16px → 12-14px
- **Section gaps**: 24px → 16-20px
- **Grid gaps**: 16px → 12px
- **Line height**: 1.6 → 1.5 for better density

### 2. Visual Style
- **Borders over shadows**: Replace most shadow-elevation with subtle borders
- **Border radius**: Reduce from 0.75rem (12px) to 0.5rem (8px) for cleaner look
- **Color palette**: Keep emerald primary, but make it more refined
- **Background**: Cleaner gradients, less visual noise

### 3. Typography
- **Font stack**: Modern system fonts (Inter-like)
- **Hierarchy**: Clearer distinction between headings and body
- **Sizes**: Slightly reduced for density

### 4. Components

#### Cards
- Remove heavy shadow-elevation classes
- Add subtle border (1px, low opacity)
- Reduce padding
- Cleaner hover states (subtle background change)

#### Buttons
- Smaller padding
- Subtle borders instead of heavy shadows
- Refined hover states

#### Sidebar
- More compact navigation items
- Reduced icon sizes
- Cleaner active states (subtle background, not heavy borders)

#### Tables/Lists
- Tighter row spacing
- Subtle dividers
- Better information hierarchy

## Page-by-Page Changes

### Layout (`Layout.tsx`)
- Reduce header padding
- Cleaner search input styling
- Simpler background (reduce gradient mesh intensity)

### Sidebar (`Sidebar.tsx`)
- Compact nav items (py-2 → py-1.5)
- Smaller icons (h-4 w-4 → h-4 w-4, but tighter spacing)
- Remove heavy border-left active indicator, use subtle background
- Remove decorative gradient orbs

### HomePage (`HomePage.tsx`)
- Hero: Tighter padding, cleaner gradient
- Stage cards: Compact grid, smaller icons, less padding
- Featured section: Side-by-side layout, denser cards

### StagePage (`StagePage.tsx`)
- Header: Compact layout
- Tabs: Smaller height, subtler styling
- Content: Denser insight cards, tighter spacing

### InventoryPage (`InventoryPage.tsx`)
- Table: Tighter rows, smaller text
- Expandable rows: Cleaner animation, denser content
- Search: More compact

### WorkflowsPage (`WorkflowsPage.tsx`)
- List view: Already fairly dense, refine spacing
- Category badges: Smaller, subtler
- Row hover: Cleaner background change

### WorkflowDetailPage (`WorkflowDetailPage.tsx`)
- Header: Compact
- Content: Tighter markdown spacing
- TOC: More compact

## CSS Changes (`index.css`)

### Variables to Update
```css
--radius: 0.5rem; /* was 0.75rem */
```

### New Utilities to Add
- `.border-subtle` - 1px border with low opacity
- `.bg-surface` - clean surface background
- `.text-balance` - better text wrapping
- Density-based spacing utilities

### Utilities to Remove/Reduce
- Heavy `shadow-elevation-*` classes (keep only for modals/dropdowns)
- `hover-lift` with large transforms
- `border-gradient` pseudo-element complexity

## Color Refinement

### Current → New
- Keep emerald primary but reduce saturation slightly
- Muted colors: More neutral grays
- Background: Cleaner, less gradient mesh
- Accent purple: Keep but use more sparingly

## Animation Refinement

### Keep
- Fade-in animations (subtle)
- Icon hover effects

### Reduce/Remove
- Heavy hover lifts
- Pulse glow effects (too distracting)
- Shimmer effects (unless loading)

## Implementation Order

1. **CSS Foundation** - Update variables, add new utilities
2. **Core Components** - Card, Button, Badge
3. **Layout & Sidebar** - Global navigation
4. **Pages** - Home, Stage, Inventory, Workflows, Detail
5. **Polish** - Animations, responsive, final review

## Success Criteria

- [ ] All pages feel more cohesive and professional
- [ ] Information density increased by ~30%
- [ ] Visual hierarchy is clearer
- [ ] Animations are subtle and purposeful
- [ ] Mobile experience remains good
- [ ] Dark mode works consistently
