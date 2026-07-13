<template>
  <div style="display:flex;flex-direction:column;gap:14px;height:100%">

    <!-- Active zone indicator -->
    <div class="campaign-zone-alert" :class="selectedZone ? 'active' : 'empty'">
      <span class="campaign-zone-dot"/>
      <span>{{ selectedZone ? selectedZone.label : 'Select a zone on the floor plan to begin' }}</span>
    </div>

    <!-- Score card (hero number) -->
    <ScoreCard
      :score-result="scoreResult"
      :selected-zone="selectedZone"
      :selected-placement="selectedPlacement"
      :selected-time-window="selectedTimeWindow"
    />

    <!-- Controls -->
    <div class="st-card" style="display:flex;flex-direction:column;gap:10px">
      <div class="st-section-label">Placement Settings</div>

      <v-select
        v-model="selectedPlacement"
        :items="placementTypes"
        label="Placement type"
        variant="outlined"
        density="compact"
        hide-details
        :disabled="!selectedZone"
        class="st-v-select"
      />
      <v-select
        v-model="selectedTimeWindow"
        :items="timeWindows"
        label="Time window"
        variant="outlined"
        density="compact"
        hide-details
        :disabled="!selectedZone"
        class="st-v-select"
      />

      <div style="display:flex;gap:8px;margin-top:2px">
        <label class="radio-opt" :class="{ active: campaignMode === 'existing' }">
          <input type="radio" v-model="campaignMode" value="existing" style="display:none"/>
          Use Existing
        </label>
        <label class="radio-opt" :class="{ active: campaignMode === 'new' }">
          <input type="radio" v-model="campaignMode" value="new" style="display:none"/>
          Create New
        </label>
      </div>

      <v-text-field
        v-if="campaignMode === 'new' || isEditing"
        v-model="newCampaignName"
        :label="isEditing ? 'Edit name' : 'Campaign name'"
        variant="outlined"
        density="compact"
        hide-details
        :disabled="!selectedZone"
        class="st-v-select"
      />

      <button
        v-if="campaignMode === 'new' || isEditing"
        class="save-btn"
        :disabled="!canPersist"
        @click="persistCampaign"
      >
        {{ isEditing ? 'Update Campaign' : 'Save Campaign' }}
      </button>
      <button v-if="isEditing" class="save-btn secondary" @click="cancelEdit">
        Cancel
      </button>

      <div v-if="saveMessage" class="save-toast">{{ saveMessage }}</div>
    </div>

    <!-- Zone campaigns list -->
    <div v-if="selectedZone" class="st-card" style="flex:1;overflow-y:auto">
      <div class="st-section-label">Campaigns in {{ selectedZone.label }}</div>

      <div v-if="zonesCampaigns.length" style="display:flex;flex-direction:column;gap:7px;margin-top:8px">
        <div v-for="c in zonesCampaigns" :key="c.id" class="campaign-row">
          <div style="flex:1;min-width:0">
            <div class="campaign-row-name">{{ c.name }}</div>
            <div class="campaign-row-meta">{{ c.placement }} · {{ c.timeWindow }} ·
              <span :style="{ color: bandColor(c.score) }">{{ c.score }}</span>
            </div>
          </div>
          <div class="campaign-row-actions">
            <button class="icon-btn" title="Edit" @click="startEdit(c)">
              <v-icon size="14">mdi-pencil-outline</v-icon>
            </button>
            <button class="icon-btn delete" title="Delete" @click="removeCampaign(c.id)">
              <v-icon size="14">mdi-delete-outline</v-icon>
            </button>
          </div>
        </div>
      </div>
      <div v-else style="font-size:12px;color:var(--text-2);margin-top:8px">
        No campaigns in this zone yet.
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import ScoreCard from './ScoreCard.vue'
import { placementTypes, timeWindows } from '../data/mockData'
import { useCampaignScore } from '../composables/useCampaignScore'

const props = defineProps({
  zones: { type: Array, required: true },
  campaigns: { type: Array, required: true },
  selectedZoneId: { type: String, default: '' },
})

const emit = defineEmits(['save-campaign', 'update-campaign', 'delete-campaign'])

const selectedPlacement = ref(placementTypes[0])
const selectedTimeWindow = ref(timeWindows[1])
const campaignMode = ref('existing')
const newCampaignName = ref('')
const saveMessage = ref('')
const editingId = ref('')
const { calculate } = useCampaignScore()

const selectedZone = computed(() => props.zones.find((z) => z.id === props.selectedZoneId) || null)
const isEditing = computed(() => Boolean(editingId.value))

const scoreResult = computed(() => {
  if (!selectedZone.value) return null
  return calculate({ zone: selectedZone.value, placementType: selectedPlacement.value, campaignMode: campaignMode.value, timeWindow: selectedTimeWindow.value })
})

const zonesCampaigns = computed(() => {
  if (!selectedZone.value) return []
  return props.campaigns.filter((c) => c.zoneId === selectedZone.value.id)
})

const canPersist = computed(() =>
  Boolean(selectedZone.value && scoreResult.value && newCampaignName.value.trim().length >= 3)
)

watch(selectedZone, (z) => {
  if (z?.id === 'fitting-area') selectedPlacement.value = 'Fitting Area Signage'
}, { immediate: true })

function persistCampaign() {
  if (!canPersist.value) return
  const payload = {
    zoneId: selectedZone.value.id,
    name: newCampaignName.value.trim(),
    placement: selectedPlacement.value,
    timeWindow: selectedTimeWindow.value,
    score: scoreResult.value.band,
  }
  if (isEditing.value) {
    emit('update-campaign', { id: editingId.value, ...payload })
    saveMessage.value = 'Campaign updated.'
  } else {
    emit('save-campaign', payload)
    saveMessage.value = 'Campaign saved.'
  }
  cancelEdit()
  campaignMode.value = 'existing'
  setTimeout(() => { saveMessage.value = '' }, 2200)
}

function startEdit(c) {
  editingId.value = c.id
  newCampaignName.value = c.name
  selectedPlacement.value = c.placement
  selectedTimeWindow.value = c.timeWindow
  campaignMode.value = 'existing'
}

function cancelEdit() {
  editingId.value = ''
  newCampaignName.value = ''
}

function removeCampaign(id) {
  if (!window.confirm('Delete this campaign?')) return
  emit('delete-campaign', id)
  if (editingId.value === id) cancelEdit()
}

function bandColor(band) {
  if (band === 'Strong') return 'var(--green)'
  if (band === 'Moderate') return 'var(--amber)'
  return 'var(--accent)'
}
</script>

<style scoped>
.radio-opt {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 12px;
  border-radius: var(--r-sm);
  font-size: 12px;
  font-weight: 600;
  color: var(--text-2);
  background: var(--surface-2);
  cursor: pointer;
  transition: background 100ms, color 100ms;
  border: 2px solid transparent;
}
.radio-opt.active { background: var(--text); color: #fff; border-color: var(--text); }
</style>
