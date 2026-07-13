# Sole Traffic — Floor Plan Heat Map & Campaign Planner

## Overview

Sole Traffic is a two-screen conceptual retail operations tool built for a
New Balance brick-and-mortar store. It gives store operations and category
teams a visual, floor-plan-based way to understand how shoppers move through
the space, and to plan promotional campaigns in the exact spots where they'll
have the most impact. All data in this build is invented/simplified for the
purposes of this case study — no real New Balance traffic or sales data is
used or implied.

Current implementation status: interactive MVP is working. Both routes are live,
floor-plan zones are clickable, zone context is carried between screens, and the
campaign scorecard updates with formula-based recommendations.

## How It Works

**Screen 1 — Traffic Heat Map**
A rendering of a New Balance store blueprint overlaid with a heat map showing
foot traffic intensity by zone. Each zone surfaces:
- Average foot traffic
- Average dwell time (where shoppers linger)
- Exit velocity (where shoppers move through fastest)

Current state in code:
- Interactive floor-plan blueprint with zone heat coloring
- Clickable zones with side-panel metrics
- Direct handoff to Campaign Planner for selected zone

**Screen 2 — Campaign Planner**
Users click a zone on the same floor plan and either select an existing
campaign or create a new one. Each zone supports placement types (endcap,
in-aisle promotion, digital kiosk, etc.) and returns a Strong–Weak
engagement score based on:
- Traffic and dwell data from Screen 1
- Time-of-day visibility windows
- Digital add-on recommendations for that placement type

Current state in code:
- Zone-aware planner controls (placement, time window, campaign mode)
- Scorecard with numeric score, score band, confidence, and rationale
- Digital add-on recommendations generated from zone behavior and placement

## Tech Stack
- Vue 3 + Vuetify (Material-based component library)
- Vite (build tooling)
- Conceptual/mock data only (no backend, no real store data)

## Requirements
- Node.js 18+
- npm 9+

## Getting Started
```bash
npm install
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build locally:
```bash
npm run preview
```

## Project Structure
```
src/
  components/   Reusable UI: heat map overlay, zone cards, score card, etc.
  views/        The two main screens (Heatmap, Campaign Planner)
  data/         Mock traffic + campaign data
  styles/       Vuetify theme config (New Balance-inspired palette)
  router/       Navigation between the two screens
docs/           Design notes and planning artifacts
```

## Status
In progress for Protogen P301.

Completed:
- Project bootstrapped with Vue 3, Vite, Vue Router, and Vuetify
- Two routes are working: / and /campaigns
- Mock data pipelines are wired into core components
- Interactive floor-plan zone selection is implemented
- Zone query-state handoff from Heat Map to Campaign Planner is implemented
- Formula-driven campaign scoring and recommendations are implemented
- Campaign creation now persists in localStorage across reloads
- Router views use lazy-loaded route components for initial code splitting
- Campaign records now support edit and delete actions in-zone

Planned next:
- Add optional backend sync for saved campaigns
- Tune zone geometry and visual polish against final design comps
- Add campaign result history and comparison view

See BRIEF.md for detailed requirements and acceptance targets.
