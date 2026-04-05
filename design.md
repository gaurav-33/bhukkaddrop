# BhukkadDrop — Design System Reference
> Upload this file to Stitch as your design context document.
> Version 1.0 | React Native Expo (Mobile) + Next.js (Admin Web)

---

## 1. Brand Identity

**Product Name:** BhukkadDrop  
**Tagline:** *"Because cravings don't check the clock."*  
**Personality:** Hungry, unapologetic, street-smart, warm, fast.  
**Target Users:** College students (18–24) at NIT Patna Bihta | Late-night, mobile-first context.  
**Design Ethos:** Dark, spicy, tactile. Every screen should feel like it was designed at 1 AM for someone who hasn't eaten since 7 PM.

---

## 2. Color Palette

### Primary (Brand Core)
| Token | Hex | Usage |
|---|---|---|
| `--brand-orange` | `#FF5C1A` | CTAs, active tabs, highlights, price tags |
| `--brand-orange-dim` | `#CC4A14` | Pressed/hover state of brand orange |
| `--brand-orange-glow` | `rgba(255, 92, 26, 0.18)` | Card glow, selected card border, shimmer |

### Backgrounds (Dark Mode — Default)
| Token | Hex | Usage |
|---|---|---|
| `--bg-base` | `#0D0D0D` | App root background — near-black, warm tint |
| `--bg-surface` | `#161616` | Cards, bottom sheets, modals |
| `--bg-elevated` | `#1F1F1F` | Inputs, inactive pills, secondary cards |
| `--bg-overlay` | `rgba(0,0,0,0.72)` | Modal scrim, image overlays |

### Text
| Token | Hex | Usage |
|---|---|---|
| `--text-primary` | `#F5F0EB` | Headings, primary labels — warm off-white |
| `--text-secondary` | `#9E9990` | Subtext, metadata, timestamps |
| `--text-disabled` | `#4A4742` | Disabled states, placeholder text |
| `--text-inverse` | `#0D0D0D` | Text on brand-orange backgrounds |

### Semantic
| Token | Hex | Usage |
|---|---|---|
| `--success` | `#2ECC71` | Delivered badge, payment success |
| `--warning` | `#F39C12` | Preparing badge, low stock |
| `--error` | `#E74C3C` | Payment failed, error states |
| `--info` | `#3498DB` | Informational toasts |

### Accent Palette (Secondary Highlights)
| Token | Hex | Usage |
|---|---|---|
| `--accent-ember` | `#FF8C42` | Warm food photography tint, gradient end |
| `--accent-saffron` | `#FFC13B` | Rating stars, loyalty points |
| `--accent-chili` | `#D62839` | Spice level indicators, promo badges |
| `--border-subtle` | `#2A2A2A` | Card borders, dividers |
| `--border-active` | `#FF5C1A` | Selected input, focused element |

---

## 3. Typography

### Font Pairing Philosophy
Use **two fonts only**. A bold, expressive display font for headings and a legible, warm sans-serif for body copy. The combination should feel editorial and street-food-poster-inspired.

### Display Font — `Syne`
- Source: Google Fonts (`https://fonts.google.com/specimen/Syne`)
- Weights: **700 (Bold), 800 (ExtraBold)**
- Use for: App name, section headers, café names, hero CTAs
- Character: Geometric, irregular spacing, contemporary. Feels like a menu board at a cool dhaba.

### Body Font — `DM Sans`
- Source: Google Fonts (`https://fonts.google.com/specimen/DM+Sans`)
- Weights: **400 (Regular), 500 (Medium)**
- Use for: Menu items, descriptions, prices, status labels, all UI copy
- Character: Warm, readable at small sizes, modern but not cold.

### Type Scale (Mobile — React Native / CSS rem equivalent)
| Role | Font | Weight | Size | Line Height | Tracking |
|---|---|---|---|---|---|
| `display-xl` | Syne | 800 | 32px | 38px | -0.5px |
| `display-lg` | Syne | 700 | 26px | 32px | -0.3px |
| `heading` | Syne | 700 | 20px | 26px | -0.2px |
| `subheading` | DM Sans | 500 | 16px | 22px | 0px |
| `body` | DM Sans | 400 | 14px | 20px | 0.1px |
| `caption` | DM Sans | 400 | 12px | 16px | 0.2px |
| `label` | DM Sans | 500 | 11px | 14px | 0.8px uppercase |
| `price` | Syne | 700 | 16px | 20px | 0px |

---

## 4. Spacing System

Base unit: `4px`
```
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px
--space-6: 24px
--space-8: 32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
```

**Card padding:** `16px` horizontal, `14px` vertical  
**Screen horizontal margin:** `16px`  
**Section gap:** `24px`  
**Item list gap:** `12px`

---

## 5. Border Radius

```
--radius-sm: 8px    → Badges, chips, small tags
--radius-md: 12px   → Input fields, secondary cards
--radius-lg: 16px   → Primary cards, image containers
--radius-xl: 20px   → Bottom sheets, modals
--radius-full: 9999px → Pills, avatar circles, toggle switches
```

---

## 6. Shadows & Elevation

Dark-mode shadows use warm-tinted glows rather than grey box-shadows.

```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.4);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.5);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.6);
--shadow-brand: 0 4px 24px rgba(255, 92, 26, 0.25);
--shadow-card-hover: 0 0 0 1px #FF5C1A, 0 8px 32px rgba(255, 92, 26, 0.15);
```

---

## 7. Iconography

- **Icon Library:** Phosphor Icons (`phosphor-react-native` / `phosphor-react`)
- **Style:** `Regular` weight for most icons, `Bold` for CTAs and active states
- **Size scale:** `16px` (inline), `20px` (standard), `24px` (nav), `28px` (hero)
- **Color rule:** Active icons use `--brand-orange`. Inactive use `--text-secondary`.
- **Never use:** flat colorful emoji-style icons. Keep it monochromatic.

---

## 8. Component Specifications

### 8.1 Bottom Navigation Bar (Mobile)
- Background: `--bg-surface` with `border-top: 1px solid --border-subtle`
- 4 tabs: Home, Search, Orders, Profile
- Active tab: icon + label in `--brand-orange`, with an orange dot or underline indicator
- Inactive: icon only in `--text-secondary` (label hidden)
- Height: `64px` + safe area inset

### 8.2 Cafe Card (Home Screen)
- Full-width card with 180px tall image at top (object-fit: cover)
- Dark gradient overlay from bottom: `linear-gradient(to top, rgba(0,0,0,0.85), transparent)`
- Cafe name in `display-lg` overlaid on image
- Bottom strip: rating (⭐ amber), cuisine tags (pill chips), open/closed badge
- Open badge: `--success` green dot + "Open" label
- Closed badge: `--text-disabled` + "Closed" label
- Card border: `1px solid --border-subtle`
- On hover/press: `--shadow-card-hover`

### 8.3 Menu Item Card (Horizontal List)
- Layout: `72px square thumbnail` left + content right
- Content: item name `subheading`, description `caption secondary`, price `price orange`
- Add button: `+` circle button in `--brand-orange`, `32px` diameter
- Out of stock: thumbnail grayscale + "Sold Out" chip over image
- Padding: `12px`, separator line between items `1px solid --border-subtle`

### 8.4 Order Status Tracker (4 Steps)
- Horizontal step track: 4 nodes connected by line
- Completed node: filled orange circle with checkmark icon
- Active node: pulsing orange ring animation (scale 1→1.3, opacity 1→0, infinite)
- Upcoming node: hollow circle `--border-subtle` color
- Connector line: gradient from orange (completed) to `--border-subtle` (upcoming)
- Labels below each node: `caption` text, active label in `--text-primary`, rest in `--text-secondary`
- Steps: Accepted → Preparing → Out for Delivery → Delivered

### 8.5 Primary Button (CTA)
- Background: `--brand-orange`
- Text: `--text-inverse` (dark), `subheading` weight, uppercase tracking
- Height: `52px`, border-radius: `--radius-md`
- Pressed state: background `--brand-orange-dim`, scale `0.97`
- Shadow: `--shadow-brand`
- Full-width on mobile screens

### 8.6 Input Field
- Background: `--bg-elevated`
- Border: `1px solid --border-subtle`, focus → `1px solid --border-active`
- Text: `--text-primary`, placeholder `--text-disabled`
- Height: `48px`, padding: `0 14px`, border-radius: `--radius-md`
- Label above: `label` style, `--text-secondary`

### 8.7 Badge / Status Chip
- Accepted: bg `rgba(52,152,219,0.15)`, text `--info`, border `rgba(52,152,219,0.3)`
- Preparing: bg `rgba(243,156,18,0.15)`, text `--warning`, border `rgba(243,156,18,0.3)`
- Out for Delivery: bg `rgba(255,92,26,0.15)`, text `--brand-orange`, border `rgba(255,92,26,0.3)`
- Delivered: bg `rgba(46,204,113,0.15)`, text `--success`, border `rgba(46,204,113,0.3)`
- Font: `label` style, uppercase

### 8.8 Cart Bottom Sheet
- Slides up from bottom, 80% screen height
- Background: `--bg-surface` with `border-radius: --radius-xl` top corners only
- Drag handle: `40px × 4px` pill, `--border-subtle` color, centered at top
- Header: "Your Order" heading + item count badge
- Item list: scrollable, compact row layout
- Total row: bold, separated by top border
- Footer: `Place Order` CTA button, sticky at bottom

### 8.9 Toast / Push Notification Preview
- Position: top of screen, below status bar
- Background: `--bg-elevated` with left border `4px solid --brand-orange`
- Icon left, title + body right
- Auto-dismiss after 3s with slide-up animation
- Border-radius: `--radius-md`

---

## 9. Page-by-Page Design Specs

### PAGE 1 — Splash / Onboarding Screen
- Full-screen `--bg-base` background
- Center: BhukkadDrop wordmark in `display-xl` Syne ExtraBold, `--brand-orange`
- Below wordmark: tagline in `caption` italic, `--text-secondary`
- Background texture: faint radial gradient from brand-orange-glow at center
- Bottom: "Get Started" CTA + "Sign In" ghost button

### PAGE 2 — Authentication Screen (OTP / Google)
- Top half: large food illustration or abstract orange blob/gradient
- Card section (bottom 55% of screen): rounded top corners, `--bg-surface`
- Heading: "What's your number, bhukkad?" — Syne bold, playful
- Phone input with country code prefix
- "Send OTP" CTA in brand orange
- Divider "or" with Google Sign-In button (dark-themed)
- Fine print: `caption` text, `--text-secondary`

### PAGE 3 — Home Screen (Student App)
**Header Section:**
- Left: Greeting text "Hey Raunak 👋" + campus name `--text-secondary`
- Right: Cart icon with item count badge (orange), notification bell
- Location chip: pin icon + "NIT Patna Bihta" in small pill

**Hero Banner (Optional Promo):**
- Full-width, 140px tall, rounded corners
- Background: dark gradient + food imagery
- Promo text overlaid

**"Open Now" Section:**
- Section label: `label` style uppercase, `--brand-orange`
- Horizontal scroll of Cafe Cards (as per spec 8.2)
- Empty state: "Everyone's asleep. Try after 8 AM 😴"

**"All Cafes" Section:**
- Vertical list of Cafe Cards
- Show ETA chip on each: "~15 min" in brand orange pill

### PAGE 4 — Cafe Detail / Menu Page
**Hero:**
- Full-width image, 220px tall, parallax scroll effect
- Back button (circle, `--bg-overlay` backdrop)
- Cafe name `display-lg` below image
- Row: rating badge + total reviews + open status + ETA

**Sticky Category Tab Bar:**
- Horizontal scroll pills below hero
- Active pill: `--brand-orange` fill, `--text-inverse`
- Inactive: `--bg-elevated` fill, `--text-secondary`
- Sticks to top on scroll past hero

**Menu Sections:**
- Section header: category name `heading`, `--text-primary`
- Items list as per spec 8.3

**Floating Cart Bar (bottom):**
- Appears when cart has ≥1 item
- Left: item count badge + "View Cart"
- Right: total price in brand orange
- Background: `--brand-orange`, text dark
- Height: `56px`, margin `16px`, border-radius `--radius-lg`

### PAGE 5 — Cart & Checkout
- Screen title: "Your Order"
- Restaurant name subheading
- Item list: name + qty controls + line total
- Delivery Note input (optional text area)
- Promo code input field
- Cost Breakdown card: subtotal, delivery fee (if any), total
- Payment section: UPI logos (GPay, PhonePe, Paytm icons) in a row
- "Pay ₹{total} via UPI" — primary CTA

### PAGE 6 — Order Placed / Payment Confirmation
- Large success animation: checkmark lottie or CSS animated circle → checkmark
- "Order Placed! 🎉" heading, `display-lg`
- Subtext: "Your order is with [Cafe Name]. Sit tight!"
- Order ID displayed: `caption` monospace style
- Divider
- 4-step tracker shown immediately (at step 1: Accepted)
- "Track Order" CTA + "Back to Home" ghost link

### PAGE 7 — Live Order Tracking Screen
- Status Tracker component (spec 8.4) — prominent, top third of screen
- Current status as large badge (spec 8.7) centered
- Estimated time: large countdown or "~12 min" display
- Order summary card below (collapsed, expandable)
- Delivery address section
- Bottom: "Need help?" ghost button → contact/support

### PAGE 8 — Order History Screen
- List of past orders, most recent first
- Each row: cafe name + date + total + status badge
- Expandable on tap to show item list
- "Reorder" quick-action button per entry (V1.5)
- Empty state: illustration + "No orders yet. Your stomach is waiting." copy

### PAGE 9 — Profile Screen
- Avatar circle (initials or photo) + name + campus badge
- Stats row: total orders, favourite cafe, member since
- Settings list: Notification preferences, Address book, Payment methods, Logout
- Dark/Light mode toggle (V2 — dark forced in V1)
- App version footer: `caption` style

---

## 10. Admin Dashboard Design (Next.js Web — Cafe Owner)

### Design Direction
The admin dashboard shares the BhukkadDrop brand but pivots to a **slightly lighter dark** theme for desktop use — think "command center" energy. High information density, clear data hierarchy.

### Admin Color Overrides
- `--admin-bg-base`: `#111111`
- `--admin-bg-surface`: `#1A1A1A`
- `--admin-sidebar-bg`: `#0D0D0D`
- `--admin-sidebar-active`: left border `4px solid --brand-orange` + `rgba(255,92,26,0.08)` bg

### Layout
- **Sidebar (240px):** Logo top, nav links with icons (Phosphor), active state as above
- **Top Bar (60px):** Cafe name + open/closed toggle + notification bell + admin avatar
- **Main Content Area:** Right of sidebar, padded `24px`, scrollable

### Admin Pages

**Dashboard / Home:**
- Stats row: 4 metric cards (Today's Orders, Revenue, Avg Order Value, Pending)
- Each card: large number `display-lg`, label `caption`, trend arrow colored
- Order Queue table below: real-time list with Accept / Reject buttons
- Recent activity feed (right sidebar panel)

**Order Queue (Main Focus):**
- Full-width table: Order ID, Student, Items (count), Total, Time, Status, Action
- Status column: colored badge per spec 8.7
- Action column: status update dropdown or quick-action buttons
- New order row flashes subtly (animation: background pulse from orange-glow)
- Filter tabs: All | Pending | Active | Completed

**Menu Manager:**
- Left panel: category list (draggable to reorder)
- Right panel: items grid (2-column card grid)
- Item card: thumbnail + name + price + availability toggle (pill switch)
- Availability toggle: orange (on) vs grey (off), animated slide
- "+ Add Item" floating button, `--brand-orange`

**Analytics Page:**
- Revenue chart: line chart, orange line on dark grid
- Top items: horizontal bar chart, orange bars
- Peak hours heatmap: 7-day × 24-hour grid, intensity-colored cells
- All charts: minimal axis lines, `--border-subtle` grid, no backgrounds

---

## 11. Motion & Animation Principles

**Philosophy:** Purposeful, never decorative for its own sake. Every animation should tell the user something about state change.

| Interaction | Animation |
|---|---|
| Screen enter | Slide up 16px + fade in, 220ms ease-out |
| Screen exit | Fade out + scale 0.97, 180ms ease-in |
| Card press | Scale 0.97, 120ms ease, then release |
| CTA press | Scale 0.96 + brightness 90%, 100ms |
| Bottom sheet open | Slide up from 100%, 300ms spring (damping 20) |
| Status step complete | Node fills orange left-to-right, 400ms, connector draws |
| Order placed success | Checkmark draws with stroke animation, 600ms |
| Toast appear | Slide down + fade in, 200ms ease-out |
| Tab switch | Content cross-fades, 150ms |
| Floating cart appear | Scale 0→1 + slide up, 280ms spring |
| Active order pulse | Radial orange ring expand + fade, 1.5s infinite |

**Easing tokens:**
```
--ease-out: cubic-bezier(0.0, 0.0, 0.2, 1)
--ease-in: cubic-bezier(0.4, 0.0, 1, 1)
--ease-inout: cubic-bezier(0.4, 0.0, 0.2, 1)
--spring: cubic-bezier(0.34, 1.56, 0.64, 1)
```

---

## 12. Imagery & Illustration Style

**Food Photography:**
- Dark, moody, top-down or 45° angle shots
- Warm tungsten lighting, steam preferred
- Never bright studio-white backgrounds
- Apply subtle warm filter: sepia-tinted shadows, slightly desaturated

**Illustrations (Empty States / Onboarding):**
- Style: Flat with depth — layered shapes, warm color fills
- Palette: Brand orange + cream + deep brown backgrounds
- Characters: Stylised, not photorealistic. No generic stock-art faces.
- Icons in illustrations: Phosphor icon style, chunky stroke weight

**Image Treatment in Cards:**
- Always apply bottom gradient overlay for text legibility
- Default placeholder: `--bg-elevated` with fork-knife icon centered

---

## 13. Accessibility & Contrast

- All body text must meet **WCAG AA** minimum (4.5:1 contrast ratio)
- Brand orange `#FF5C1A` on `#0D0D0D` base = **5.4:1** ✅
- Off-white `#F5F0EB` on `#161616` surface = **11.2:1** ✅
- Interactive elements minimum tap target: **44×44px**
- Never convey state through color alone — always pair with icon or label

---

## 14. Naming Conventions (For Stitch Component Names)

```
BDSplashScreen
BDAuthScreen
BDHomeScreen
BDCafeDetailScreen
BDCartSheet
BDCheckoutScreen
BDOrderConfirmScreen
BDOrderTrackingScreen
BDOrderHistoryScreen
BDProfileScreen

BDAdminDashboard
BDAdminOrderQueue
BDAdminMenuManager
BDAdminAnalytics

BDCafeCard
BDMenuItemCard
BDOrderStatusTracker
BDStatusBadge
BDCartFloatingBar
BDBottomNav
BDPrimaryButton
BDInputField
BDToast
BDCategoryTabBar
```

---

## 15. Do's and Don'ts

### DO ✅
- Use Syne for all headings. Never substitute with Inter or Roboto.
- Use dark backgrounds for all mobile screens — no light mode in V1.
- Always show food in warm, moody lighting.
- Use brand orange sparingly but boldly — it should pop every time.
- Animate state changes. Static order status is not acceptable.
- Use Phosphor icons consistently throughout.
- Show empty states with personality — copy should be witty and brand-consistent.

### DON'T ❌
- Don't use white or light grey backgrounds anywhere in the mobile app.
- Don't use generic purple-gradient aesthetics.
- Don't use more than 2 fonts.
- Don't use rounded-corner cards with drop shadows on white (Material Design look).
- Don't show GPS maps or route overlays — V1 uses status notifications only.
- Don't add a light mode toggle in V1.
- Don't use blue as a primary action colour — that's Zomato/Swiggy. We are not them.
