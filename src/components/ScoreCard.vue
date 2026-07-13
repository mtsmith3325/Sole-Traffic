<template>
  <div class="st-card" style="text-align:center">
    <!-- Empty -->
    <div v-if="!selectedZone" class="empty-state" style="min-height:100px">
      <div class="empty-icon">◈</div>
      <div>Select a zone to calculate engagement score.</div>
    </div>

    <template v-else>
      <!-- Hero number -->
      <div class="score-hero-wrap">
        <div class="score-hero-number" :class="bandClass">
          {{ scoreResult?.numericScore ?? '—' }}
        </div>
        <div style="margin-top:8px;display:flex;align-items:center;justify-content:center;gap:6px;flex-wrap:wrap">
          <span class="score-band-chip" :class="bandClass">{{ scoreResult?.band || '—' }}</span>
          <span class="score-confidence-chip">{{ scoreResult?.confidence }} confidence</span>
        </div>
        <div style="margin-top:6px;font-size:11px;color:var(--text-2)">
          {{ selectedZone.label }} · {{ selectedPlacement }} · {{ selectedTimeWindow }}
        </div>
      </div>

      <!-- Rationale -->
      <div style="text-align:left;border-top:1px solid var(--border);padding-top:12px;margin-top:4px">
        <div class="st-section-label">How this score was calculated</div>
        <ul class="score-rationale-list" style="margin-top:6px">
          <li v-for="item in scoreResult?.rationale || []" :key="item">{{ item }}</li>
        </ul>
      </div>

      <!-- Recommendations -->
      <div style="text-align:left;border-top:1px solid var(--border);padding-top:12px;margin-top:12px">
        <div class="st-section-label">Digital Add-On Recommendations</div>
        <ul class="score-rationale-list" style="margin-top:6px">
          <li v-for="item in scoreResult?.recommendations || []" :key="item">{{ item }}</li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  scoreResult: { type: Object, default: null },
  selectedZone: { type: Object, default: null },
  selectedPlacement: { type: String, default: '' },
  selectedTimeWindow: { type: String, default: '' },
})

const bandClass = computed(() => {
  const b = props.scoreResult?.band
  if (b === 'Strong') return 'strong'
  if (b === 'Moderate') return 'moderate'
  return 'weak'
})
</script>
