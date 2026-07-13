<template>
  <div class="view-shell">
    <div class="view-header">
      <span class="view-title">Campaign Planner</span>
      <span class="view-subtitle">Score placement opportunities by zone and build campaigns from traffic data.</span>
    </div>

    <div class="two-pane">
      <div class="pane-left">
        <CampaignPlanner
          :zones="zones"
          :campaigns="campaigns"
          :selected-zone-id="selectedZoneId"
          @save-campaign="saveCampaign"
          @update-campaign="updateCampaign"
          @delete-campaign="deleteCampaign"
        />
      </div>
      <div class="pane-right">
        <FloorPlanHeatmap
          :zones="zones"
          :selected-zone-id="selectedZoneId"
          @select-zone="setZone"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FloorPlanHeatmap from '../components/FloorPlanHeatmap.vue'
import CampaignPlanner from '../components/CampaignPlanner.vue'
import { zones, sampleCampaigns } from '../data/mockData'

const STORAGE_KEY = 'sole-traffic-campaigns-v1'
const route = useRoute()
const router = useRouter()
const campaigns = ref([...sampleCampaigns])

const selectedZoneId = computed(() => {
  const q = route.query.zone
  return typeof q === 'string' ? q : ''
})

function setZone(id) {
  router.replace({ query: { ...route.query, zone: id } })
}

function saveCampaign(payload) {
  campaigns.value = [{ id: `u-${Date.now()}`, ...payload }, ...campaigns.value]
}

function updateCampaign(payload) {
  campaigns.value = campaigns.value.map((c) => c.id === payload.id ? { ...c, ...payload } : c)
}

function deleteCampaign(id) {
  campaigns.value = campaigns.value.filter((c) => c.id !== id)
}

onMounted(() => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) campaigns.value = parsed
    }
  } catch {}
})

watch(campaigns, (v) => localStorage.setItem(STORAGE_KEY, JSON.stringify(v)), { deep: true })
</script>
