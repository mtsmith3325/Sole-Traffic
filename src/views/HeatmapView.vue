<template>
  <div class="view-shell">
    <!-- KPI strip -->
    <div class="kpi-strip">
      <div class="kpi-cell">
        <span class="kpi-label">Active Zones</span>
        <span class="kpi-number">{{ zones.length }}<span class="kpi-unit"> zones</span></span>
      </div>
      <div class="kpi-cell">
        <span class="kpi-label">Peak Traffic Zone</span>
        <span class="kpi-number">{{ peakZone.avgTraffic }}<span class="kpi-unit"> /100</span></span>
        <span class="kpi-sub">{{ peakZone.label }}</span>
      </div>
      <div class="kpi-cell">
        <span class="kpi-label">Avg Dwell Time</span>
        <span class="kpi-number">{{ avgDwell }}<span class="kpi-unit">s</span></span>
      </div>
      <div class="kpi-cell">
        <span class="kpi-label">High-Traffic Zones</span>
        <span class="kpi-number">{{ highCount }}<span class="kpi-unit"> of {{ zones.length }}</span></span>
      </div>
    </div>

    <!-- Two-pane -->
    <div class="two-pane">
      <!-- Left panel -->
      <div class="pane-left">
        <!-- Selected zone stats -->
        <transition name="fade-slide" mode="out-in">
          <div v-if="selectedZone" :key="selectedZone.id" class="st-card">
            <div class="st-section-label">Selected Zone</div>
            <div class="zone-header-name">{{ selectedZone.label }}</div>

            <div class="stat-grid">
              <div class="stat-cell">
                <span class="stat-label">Traffic Index</span>
                <span class="stat-number" :style="{ color: trafficColor(selectedZone.avgTraffic) }">
                  {{ selectedZone.avgTraffic }}
                </span>
                <span class="stat-sub">out of 100</span>
              </div>
              <div class="stat-cell">
                <span class="stat-label">Dwell Time</span>
                <span class="stat-number">{{ selectedZone.avgDwellSeconds }}<span class="stat-unit">s</span></span>
              </div>
              <div class="stat-cell" style="grid-column:1/-1">
                <span class="stat-label">Exit Velocity</span>
                <span class="stat-number" style="font-size:26px;text-transform:capitalize">
                  {{ selectedZone.exitVelocity }}
                </span>
                <span class="stat-sub">{{ exitDesc(selectedZone.exitVelocity) }}</span>
              </div>
            </div>

            <button class="plan-action-btn" @click="goToPlanner">
              Plan Campaign for This Zone &nbsp;→
            </button>
          </div>

          <div v-else key="empty" class="st-card empty-state">
            <div class="empty-icon">▦</div>
            <div>Click any zone on the floor plan to inspect its traffic and behavior data.</div>
          </div>
        </transition>

        <!-- Zone list -->
        <div>
          <div class="st-section-label">All Zones</div>
          <div class="zone-list">
            <div
              v-for="zone in zonesSorted"
              :key="zone.id"
              class="zone-row"
              :class="{ 'is-active': zone.id === selectedZoneId }"
              @click="setZone(zone.id)"
            >
              <span class="zone-dot" :style="{ background: trafficColor(zone.avgTraffic) }"/>
              <span class="zone-row-name">{{ zone.label }}</span>
              <span class="zone-row-meta">
                <span>{{ zone.avgTraffic }}</span>
                <span>{{ zone.avgDwellSeconds }}s</span>
                <span class="velocity-chip" :class="zone.exitVelocity">{{ zone.exitVelocity }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right pane: 3D store + heat blob -->
      <div class="pane-right pane-right--light">
        <FloorPlanHeatmap
          :zones="zones"
          :selected-zone-id="selectedZoneId"
          :show-heat="true"
          @select-zone="setZone"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FloorPlanHeatmap from '../components/FloorPlanHeatmap.vue'
import { zones } from '../data/mockData'

const route = useRoute()
const router = useRouter()

const selectedZoneId = computed(() => {
  const q = route.query.zone
  return typeof q === 'string' ? q : ''
})

const selectedZone = computed(() => zones.find((z) => z.id === selectedZoneId.value) || null)

const zonesSorted = computed(() => [...zones].sort((a, b) => b.avgTraffic - a.avgTraffic))

const peakZone = computed(() => zones.reduce((a, b) => (b.avgTraffic > a.avgTraffic ? b : a)))
const avgDwell = computed(() => Math.round(zones.reduce((s, z) => s + z.avgDwellSeconds, 0) / zones.length))
const highCount = computed(() => zones.filter((z) => z.avgTraffic >= 65).length)

function setZone(id) {
  router.replace({ query: { ...route.query, zone: id } })
}

function goToPlanner() {
  if (!selectedZoneId.value) return
  router.push({ path: '/campaigns', query: { zone: selectedZoneId.value } })
}

function trafficColor(v) {
  if (v >= 75) return '#B22010'
  if (v >= 45) return '#B45309'
  return '#2D8A5E'
}

function exitDesc(v) {
  if (v === 'slow') return 'Shoppers linger — high conversion potential'
  if (v === 'fast') return 'Quick pass-through — high visibility window'
  return 'Moderate movement — balanced placement value'
}
</script>
