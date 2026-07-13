const EXIT_VELOCITY_SCORE = {
  slow: 1,
  medium: 0.7,
  fast: 0.45,
}

const PLACEMENT_MULTIPLIER = {
  Endcap: 1,
  'In-Aisle Promotion': 0.92,
  'Digital Kiosk': 0.96,
  'Window Display': 0.88,
  'Fitting Area Signage': 1.04,
}

const TIME_MULTIPLIER = {
  Morning: 0.92,
  Afternoon: 1,
  Evening: 1.04,
  Weekend: 1.08,
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function scoreBand(score) {
  if (score >= 78) {
    return 'Strong'
  }
  if (score >= 58) {
    return 'Moderate'
  }
  return 'Weak'
}

function confidenceBand(zone) {
  if (zone.avgTraffic >= 70 && zone.avgDwellSeconds >= 90) {
    return 'High'
  }
  if (zone.avgTraffic >= 45) {
    return 'Medium'
  }
  return 'Low'
}

function digitalRecommendations({ zone, placementType, score }) {
  const recommendations = []

  if (placementType !== 'Digital Kiosk') {
    recommendations.push('Add a QR landing page to convert in-store attention into mobile follow-up.')
  }

  if (zone.exitVelocity === 'fast') {
    recommendations.push('Use concise 5-7 word message framing with high-contrast visuals for quick pass-through zones.')
  }

  if (zone.avgDwellSeconds >= 120) {
    recommendations.push('Layer product comparison content since this zone supports longer decision time.')
  }

  if (score >= 75) {
    recommendations.push('Prioritize premium inventory in this zone for campaign launch week.')
  }

  if (!recommendations.length) {
    recommendations.push('Maintain baseline signage and monitor week-over-week lift before scaling spend.')
  }

  return recommendations
}

export function useCampaignScore() {
  function calculate({ zone, placementType, campaignMode, timeWindow }) {
    if (!zone) {
      return null
    }

    const trafficComponent = clamp(zone.avgTraffic / 100, 0, 1)
    const dwellComponent = clamp(zone.avgDwellSeconds / 240, 0, 1)
    const velocityComponent = EXIT_VELOCITY_SCORE[zone.exitVelocity] ?? 0.6

    const baseScore =
      (trafficComponent * 0.45 + dwellComponent * 0.35 + velocityComponent * 0.2) * 100

    const placementBoost = PLACEMENT_MULTIPLIER[placementType] ?? 1
    const timeBoost = TIME_MULTIPLIER[timeWindow] ?? 1
    const modeBoost = campaignMode === 'existing' ? 1.03 : 0.97

    const numericScore = Math.round(clamp(baseScore * placementBoost * timeBoost * modeBoost, 20, 99))
    const band = scoreBand(numericScore)
    const confidence = confidenceBand(zone)

    return {
      numericScore,
      band,
      confidence,
      rationale: [
        `Traffic index contributes ${Math.round(trafficComponent * 45)} of 45 possible weighted points.`,
        `Dwell behavior contributes ${Math.round(dwellComponent * 35)} of 35 weighted points.`,
        `Exit velocity modifier (${zone.exitVelocity}) contributes ${Math.round(velocityComponent * 20)} of 20 weighted points.`,
      ],
      recommendations: digitalRecommendations({
        zone,
        placementType,
        score: numericScore,
      }),
    }
  }

  return { calculate }
}
