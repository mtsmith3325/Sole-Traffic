# BRIEF.md — Sole Traffic (P301)

> Status: In Progress

## Industry and User
- Industry: Retail and Consumer Goods
- Brand concept: New Balance (conceptual reference only, no real brand data)
- Primary users:
  - Store operations lead
  - Category or visual merchandising manager
  - Regional retail performance analyst

## Problem
Store teams do not have a visual way to connect shopper movement with campaign placement decisions. Current reporting is spreadsheet-first and does not reflect where shoppers actually slow down, pass through, or convert in physical zones.

## Goal
Build a two-screen internal web app that helps teams:
- Understand traffic intensity and dwell patterns by floor-plan zone
- Compare zone behavior at a glance
- Plan and score promotional placements in the same zones

## Screen 1: Traffic Heat Map
- Purpose: Show zone-level foot traffic and behavior on a floor plan
- Data shown:
  - Zone traffic index
  - Dwell score
  - Exit velocity
- Key interactions:
  - Hover and click zone overlays
  - Select a zone to inspect details in a side panel
  - Navigate to campaign planning for the selected zone

## Screen 2: Campaign Planner
- Purpose: Plan promotions by zone and estimate engagement quality
- Data shown:
  - Existing campaigns by zone
  - Placement type options (endcap, in-aisle, digital kiosk)
  - Campaign scorecard with confidence level
- Key interactions:
  - Select zone on floor plan
  - Assign or create a campaign
  - Compare placement options before confirming
- Scoring logic:
  - Weighted by traffic strength, dwell potential, and visibility window
  - Includes simple digital add-on recommendations based on zone behavior

## Design Direction
- Visual language: Clean retail operations cockpit with strong layout hierarchy
- Palette: Neutral base with New Balance-inspired accents for status highlights
- Typography: System-safe sans-serif hierarchy with strong section contrast
- Signature element: Blueprint-style floor plan overlay used consistently across both screens

## Data and Architecture
- Data source: Mock JSON and local JavaScript objects only
- Frontend stack: Vue 3, Vue Router, Vuetify, Vite
- No backend services in this phase

## Success Criteria
- Two routes are functional:
  - Heat Map: /
  - Campaign Planner: /campaigns
- Floor plan zones render and can be selected
- Campaign scorecard updates based on zone and placement inputs
- App runs locally with npm install and npm run dev

## Out of Scope
- Real store data or integrations
- User authentication and role management
- Native mobile app delivery (responsive web only)
