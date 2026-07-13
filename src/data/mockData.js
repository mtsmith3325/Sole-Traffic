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
