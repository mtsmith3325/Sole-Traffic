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

// Time-lapse traffic snapshots — relative traffic index (0-100) per zone
// Each snapshot represents cumulative/average traffic patterns up to that point in time.
// Values tell the story: entrance is always busy; back-of-store builds over time as
// campaigns and signage improvements take effect.
export const timelapseSnapshots = [
  {
    label: '1 Day',
    zones: {
      entrance: 88,
      'running-wall': 65,
      'lifestyle-endcap': 38,
      'fitting-area': 28,
      checkout: 55,
      'apparel-back': 14,
    },
  },
  {
    label: '3 Months',
    zones: {
      entrance: 93,
      'running-wall': 81,
      'lifestyle-endcap': 58,
      'fitting-area': 44,
      checkout: 70,
      'apparel-back': 30,
    },
  },
  {
    label: '6 Months',
    zones: {
      entrance: 91,
      'running-wall': 85,
      'lifestyle-endcap': 68,
      'fitting-area': 55,
      checkout: 76,
      'apparel-back': 46,
    },
  },
  {
    label: '1 Year',
    zones: {
      entrance: 95,
      'running-wall': 92,
      'lifestyle-endcap': 78,
      'fitting-area': 63,
      checkout: 83,
      'apparel-back': 60,
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
