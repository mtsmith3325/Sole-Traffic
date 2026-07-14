// Conceptual/mock data only. No real store or New Balance data.

export const zones = [
  {
    id: 'entrance',
    label: 'Entrance / Front Table',
    avgTraffic: 92, // relative index, 0-100
    avgDwellSeconds: 25,
    exitVelocity: 'fast',
  },
  {
    id: 'running-wall',
    label: 'Running Shoe Wall',
    avgTraffic: 78,
    avgDwellSeconds: 140,
    exitVelocity: 'slow',
  },
  {
    id: 'lifestyle-endcap',
    label: 'Lifestyle Endcap',
    avgTraffic: 55,
    avgDwellSeconds: 60,
    exitVelocity: 'medium',
  },
  {
    id: 'fitting-area',
    label: 'Fitting Area',
    avgTraffic: 40,
    avgDwellSeconds: 210,
    exitVelocity: 'slow',
  },
  {
    id: 'apparel-back',
    label: 'Apparel — Back Wall',
    avgTraffic: 22,
    avgDwellSeconds: 45,
    exitVelocity: 'fast',
  },
  {
    id: 'checkout',
    label: 'Checkout / Kiosk',
    avgTraffic: 65,
    avgDwellSeconds: 80,
    exitVelocity: 'medium',
  },
]

export const placementTypes = [
  'Endcap',
  'In-Aisle Promotion',
  'Digital Kiosk',
  'Window Display',
  'Fitting Area Signage',
]

export const timeWindows = ['Morning', 'Afternoon', 'Evening', 'Weekend']

// Time-lapse traffic snapshots — relative traffic index (0-100) per zone.
// Story: at Day 1 traffic is flat and spread across the whole floor.
// Over months it consolidates — entrance and running wall become dominant
// hotspots while back-of-store cools down, creating true clustering by year 1.
export const timelapseSnapshots = [
  {
    label: '1 Day',
    zones: {
      entrance: 68,
      'running-wall': 55,
      'lifestyle-endcap': 44,
      'fitting-area': 38,
      checkout: 50,
      'apparel-back': 35,
    },
  },
  {
    label: '3 Months',
    zones: {
      entrance: 84,   // red
      'running-wall': 80,   // red
      'lifestyle-endcap': 58,
      'fitting-area': 42,
      checkout: 76,   // red
      'apparel-back': 30,
    },
  },
  {
    label: '6 Months',
    zones: {
      entrance: 93,   // red
      'running-wall': 90,   // red
      'lifestyle-endcap': 76,  // red
      'fitting-area': 40,
      checkout: 87,   // red
      'apparel-back': 22,
    },
  },
  {
    label: '1 Year',
    zones: {
      entrance: 98,   // red
      'running-wall': 96,   // red
      'lifestyle-endcap': 82,  // red
      'fitting-area': 32,
      checkout: 92,   // red
      'apparel-back': 14,
    },
  },
]

export const sampleCampaigns = [
  {
    id: 'c1',
    zoneId: 'running-wall',
    name: 'Spring Running Launch',
    placement: 'Endcap',
    timeWindow: 'Afternoon',
    score: 'Strong',
  },
  {
    id: 'c2',
    zoneId: 'apparel-back',
    name: 'Apparel Clearance',
    placement: 'In-Aisle Promotion',
    timeWindow: 'Weekend',
    score: 'Weak',
  },
  {
    id: 'c3',
    zoneId: 'checkout',
    name: 'Loyalty App Upsell',
    placement: 'Digital Kiosk',
    timeWindow: 'Evening',
    score: 'Moderate',
  },
]
