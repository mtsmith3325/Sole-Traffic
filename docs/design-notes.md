# Design Notes — Data + Map Product UI
### Reviewed: Fleetory (fleet dashboard), Sakura (restaurant/local discovery), Persian real-estate app

---

## 1. The Big Pattern: "Panel + Map" Split

All three screens are built on the same structural idea, just skinned differently:

- **Left/content zone** — cards, stats, entity detail (a truck, a restaurant, a house)
- **Right zone** — a map that isn't decoration, it's a *second data surface* (heatmap, pins, price overlays)

This is the core layout to steal for the prototype: **don't treat the map as an afterthought widget — give it 40–50% of the canvas and let it carry real information density** (heat, clusters, callouts), not just a location pin.

Takeaway: build the prototype around a **two-pane shell** — detail/data pane on one side, live map pane on the other — rather than a single stacked page.

---

## 2. Color & Materiality

| Screen | Base | Accent | Feel |
|---|---|---|---|
| Fleetory | Near-white / light gray (#f2f2f0-ish) | Sage/mint green | Clinical, calm, "premium EV tech" |
| Sakura | White cards + deep navy map | Indigo (CTAs) + amber/gold (currency) + violet-white heat glow | App-native, nightlife/discovery energy |
| Real Estate | Warm neutral, blurred photography | Orange/red heat gradient, black stat chips | Editorial, warm, human |

**Pattern:** every screen is **~90% neutral (white/gray/beige) with one loud accent color reserved almost entirely for data-critical elements** — never for decoration. Green = efficiency/eco in Fleetory. Amber = currency in Sakura. Orange/red = price heat in real estate.

Rule for the prototype: **pick exactly one accent color and spend it only on the number that matters most** (the KPI, the price, the score). Everything else stays grayscale.

Dark surfaces are used specifically for **map/heat panels**, not for the whole app — light UI, dark map is the recurring contrast.

---

## 3. Typography

- Big, bold, tight-tracked numerals (48–64px) for the hero stat, e.g. "128", "94%", "6.2 min", "37.3min", "ن ۱۲۰ متر"
- Tiny uppercase or muted-gray labels sit *above or beside* the number, never overpowering it
- Units (%, min, kWh/km) are set smaller and lighter than the number itself, almost like a superscript
- Body/label text is a plain geometric sans, no display fonts — the numbers do the branding work, not the typeface

Takeaway: in the prototype, **numbers should visually dominate their card**. Treat every stat as "giant figure + tiny caption," not as a labeled paragraph.

---

## 4. Card System

- Uniform **rounded corners** (16–24px radius) across all card types — photo cards, stat cards, map callouts
- Cards float on the neutral background with **soft, low-contrast shadows** — no hard borders
- Consistent internal padding; icon (in a soft circular chip) + label + value is the default row pattern
- Small "expand/external-link" arrow icon (↗) in card headers — signals "this card is a preview of something deeper," useful for a drill-down prototype
- Pills/chips (rounded-full) used for tags: "In Transit," category chips, coin balances

Component to standardize: **StatCard** (icon chip, label, big number, small delta/sub-label) — this single component reappears, restyled, in all three screens (battery %, on-time %, coins earned, avg time spent, bedrooms, deposit).

---

## 5. The Map Treatment (this is the differentiator)

Three distinct map languages worth having as **modes** in the prototype:

1. **Clean/operational map** (Fleetory): light line-art map, minimal color, custom cube/box icons as pins, floating zoom controls bottom-right, expand icon top-right. Used for *fleet/asset tracking*.
2. **Dark heatmap** (Sakura): near-black map with a glowing blue/purple/white heat blob overlaying street geometry, bottom stat strip with 3 metric chips. Used for *foot-traffic / popularity / behavioral density*.
3. **Warm heatmap** (real estate): light beige map with orange/red gradient overlay, a single black "tooltip" pin showing 3 stacked stats at the point of interest, RTL text. Used for *price/value intensity by area*.

Common thread across all map variants: **a floating dark chip/tooltip that clusters 2–3 key numbers right at the pin**, rather than a sidebar. This "pin callout with mini stat cluster" is a strong, reusable interaction pattern.

Takeaway: the map should support at least a **heat-overlay mode** and a **clean-pin mode**, both using the same floating stat-chip component for callouts.

---

## 6. Data Density Without Clutter

Each screen packs 6–10 distinct data points on one view, but reads as calm because of:
- Consistent grid/alignment (everything snaps to a card grid)
- One hierarchy of size per screen (hero number > card number > label > caption)
- Generous negative space between card clusters
- Photography/3D renders used to break up the data grid (the truck render, the restaurant photo, the kitchen photo) — visual "breathing" moments between stat blocks

Takeaway: budget real imagery or a hero render as a **visual anchor** in the middle of the dashboard, don't let it become all charts and numbers.

---

## 7. Recommendations for the Prototype

**Adopt:**
- Two-pane shell: content/detail pane + persistent map pane
- One neutral palette + one accent color, accent reserved for the single most important metric
- StatCard component: icon chip + label + big number + optional delta
- Floating map callout/tooltip with a 2–3 stat cluster, dark chip on light map or light chip on dark map
- Rounded-corner, soft-shadow card system throughout, no hard borders
- A hero visual (illustration, 3D render, or photo) as a centerpiece, not just charts

**Avoid:**
- Competing accent colors on one screen
- Small, low-contrast numerals — numbers should be the loudest visual element after the map
- Cramming the map into a small corner widget — it should be a first-class pane
- Sharp corners / heavy borders — everything here is soft-radius and shadow-based

**Open decision for the prototype:** which map mode is the "home" state — clean/operational (Fleetory) or heat-driven (Sakura/real-estate)? This determines whether the product reads as an *ops/monitoring tool* or a *discovery/insight tool*, and should be picked before wiring up the layout.
