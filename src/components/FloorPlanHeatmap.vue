<template>
  <div class="fp-root" :class="showHeat ? 'fp-light' : 'fp-dark'">

    <!-- ══════════════ HEAT MAP MODE (3D image + blob) ══════════════ -->
    <template v-if="showHeat">
      <div class="store-wrap">
        <img :src="storeImg" class="store-img" alt="Store floor plan isometric render" draggable="false" />

        <!-- Heat blob overlay — layers build the purple/pink/orange glow -->
        <div class="heat-overlay" :style="heatStyle" />

        <!-- Zone selection dots (invisible click targets over image areas) -->
        <button
          v-for="z in zones"
          :key="z.id"
          class="zone-hit"
          :class="{ active: z.id === selectedZoneId }"
          :style="zoneHitStyle(z.id)"
          :title="z.label"
          @click="emit('select-zone', z.id)"
        />
      </div>

      <!-- Bottom controls -->
      <div class="store-controls">
        <button class="view-pill">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M7 2L3 5.5L7 9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span style="display:inline-block;width:22px"/>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M4 2L8 5.5L4 9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button class="view-360">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2.5C10.485 2.5 12.5 4.515 12.5 7C12.5 9.485 10.485 11.5 8 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M8 13.5C5.515 13.5 3.5 11.485 3.5 9C3.5 6.515 5.515 4.5 8 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M11.5 10.5L13 11.5L11.5 12.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>360°</span>
        </button>
      </div>
    </template>

    <!-- ══════════════ PLAN MODE (SVG blueprint) ══════════════ -->
    <template v-else>
      <svg
        class="plan-svg"
        viewBox="0 0 960 560"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Store floor plan"
      >
        <defs>
          <pattern id="st-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.035)" stroke-width="1"/>
          </pattern>
          <filter id="zone-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <rect x="0" y="0" width="960" height="560" fill="#0D1117"/>
        <rect x="0" y="0" width="960" height="560" fill="url(#st-grid)"/>
        <rect x="14" y="14" width="932" height="532" rx="12" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
        <line x1="14" y1="162" x2="946" y2="162" stroke="rgba(255,255,255,0.055)" stroke-width="1"/>
        <line x1="14" y1="352" x2="946" y2="352" stroke="rgba(255,255,255,0.055)" stroke-width="1"/>
        <line x1="322" y1="162" x2="322" y2="352" stroke="rgba(255,255,255,0.055)" stroke-width="1"/>
        <line x1="630" y1="162" x2="630" y2="352" stroke="rgba(255,255,255,0.055)" stroke-width="1"/>

        <g v-for="zone in zoneLayout" :key="zone.id">
          <rect :x="zone.x" :y="zone.y" :width="zone.w" :height="zone.h" rx="8"
            :fill="zoneFill(zone.avgTraffic)"
            :opacity="zone.id === selectedZoneId ? 0.9 : 0.48"
            style="cursor:pointer;transition:opacity 140ms"
            @click="emit('select-zone', zone.id)"
          />
          <rect v-if="zone.id === selectedZoneId"
            :x="zone.x - 2" :y="zone.y - 2" :width="zone.w + 4" :height="zone.h + 4" rx="10"
            fill="none" stroke="rgba(255,255,255,0.88)" stroke-width="2"
            style="pointer-events:none" filter="url(#zone-glow)"
          />
          <rect :x="zone.x" :y="zone.y" :width="zone.w" :height="zone.h" rx="8"
            fill="transparent" style="cursor:pointer"
            @click="emit('select-zone', zone.id)"
          />
          <text :x="zone.x + 13" :y="zone.y + 25" class="zone-name-text"
            :opacity="zone.id === selectedZoneId ? 1 : 0.7">{{ zone.label }}</text>
          <text :x="zone.x + zone.w - 13" :y="zone.y + zone.h - 11"
            class="zone-hero-num" text-anchor="end"
            :opacity="zone.id === selectedZoneId ? 1 : 0.42">{{ zone.avgTraffic }}</text>
        </g>

        <g transform="translate(480, 543)">
          <polygon points="-8,0 0,-12 8,0" fill="rgba(255,255,255,0.18)"/>
          <text x="0" y="9" text-anchor="middle" class="entry-label">ENTRY</text>
        </g>
      </svg>

      <!-- Floating callout for plan mode -->
      <transition name="callout">
        <div v-if="selectedZone && !showHeat" class="zone-callout" :style="calloutStyle">
          <div class="zone-callout-zone">{{ selectedZone.label }}</div>
          <div class="zone-callout-stats">
            <div class="zone-callout-stat">
              <span class="callout-num">{{ selectedZone.avgTraffic }}</span>
              <span class="callout-lbl">Traffic</span>
            </div>
            <div class="callout-divider"/>
            <div class="zone-callout-stat">
              <span class="callout-num">{{ selectedZone.avgDwellSeconds }}<span class="callout-unit">s</span></span>
              <span class="callout-lbl">Dwell</span>
            </div>
            <div class="callout-divider"/>
            <div class="zone-callout-stat">
              <span class="callout-num callout-exit">{{ cap(selectedZone.exitVelocity) }}</span>
              <span class="callout-lbl">Exit</span>
            </div>
          </div>
        </div>
      </transition>

      <div class="plan-legend">
        <span class="l-pip" style="background:#16A34A"/>Low
        <span class="l-pip" style="background:#CA8A04;margin-left:10px"/>Mid
        <span class="l-pip" style="background:#DC2626;margin-left:10px"/>High
      </div>
    </template>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import storeImg from '../assets/images/3d/front-angle.png'

const props = defineProps({
  zones: { type: Array, required: true },
  selectedZoneId: { type: String, default: '' },
  showHeat: { type: Boolean, default: false },
})
const emit = defineEmits(['select-zone'])

// ─── Plan mode ───────────────────────────────────────────────────────────────

const SHAPE = {
  entrance:           { x: 30,  y: 24,  w: 280, h: 122 },
  'running-wall':     { x: 338, y: 24,  w: 592, h: 122 },
  'lifestyle-endcap': { x: 30,  y: 176, w: 276, h: 160 },
  'fitting-area':     { x: 330, y: 176, w: 276, h: 160 },
  checkout:           { x: 630, y: 176, w: 300, h: 160 },
  'apparel-back':     { x: 30,  y: 366, w: 900, h: 160 },
}

const zoneLayout = computed(() =>
  props.zones.map((z) => ({ ...z, ...(SHAPE[z.id] || { x: 0, y: 0, w: 150, h: 100 }) }))
)

const selectedZone = computed(() => props.zones.find((z) => z.id === props.selectedZoneId) || null)

const calloutStyle = computed(() => {
  const s = SHAPE[props.selectedZoneId]
  if (!s) return {}
  const cx = ((s.x + s.w / 2) / 960) * 100
  if (s.y < 100) {
    return { left: cx + '%', top: ((s.y + s.h) / 560 * 100) + '%', transform: 'translate(-50%, 12px)' }
  }
  return { left: cx + '%', top: (s.y / 560 * 100) + '%', transform: 'translate(-50%, calc(-100% - 12px))' }
})

function zoneFill(v) {
  if (v >= 75) return '#DC2626'
  if (v >= 45) return '#CA8A04'
  return '#16A34A'
}

function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : '' }

// ─── Heat map mode ────────────────────────────────────────────────────────────

// Approximate % positions of zone centers within the 3D image viewport
const ZONE_HEAT_POS = {
  entrance:           { cx: '50%', cy: '72%' },
  'running-wall':     { cx: '68%', cy: '33%' },
  'lifestyle-endcap': { cx: '48%', cy: '50%' },
  'fitting-area':     { cx: '28%', cy: '50%' },
  checkout:           { cx: '52%', cy: '63%' },
  'apparel-back':     { cx: '50%', cy: '28%' },
}

const DEFAULT_POS = { cx: '50%', cy: '46%' }

const heatStyle = computed(() => {
  const pos = ZONE_HEAT_POS[props.selectedZoneId] || DEFAULT_POS
  const cx = pos.cx
  const cy = pos.cy

  // Traffic-light heat: red core → yellow mid → green outer
  return {
    background: [
      // Red hotspot core (high traffic)
      `radial-gradient(circle 140px at ${cx} ${cy}, rgba(220,38,38,1.0) 0%, rgba(239,68,68,1.0) 30%, rgba(234,179,8,0.70) 58%, transparent 80%)`,
      // Yellow secondary ring (medium traffic)
      `radial-gradient(circle 260px at ${cx} ${cy}, rgba(234,179,8,0.55) 0%, rgba(234,179,8,0.30) 48%, transparent 72%)`,
      // Green outer aura (low traffic bleed)
      `radial-gradient(circle 380px at ${cx} ${cy}, rgba(22,163,74,0.38) 0%, rgba(34,197,94,0.18) 55%, transparent 78%)`,
      // Faint green ambient
      `radial-gradient(circle 480px at ${cx} ${cy}, rgba(34,197,94,0.10) 0%, transparent 65%)`,
    ].join(','),
  }
})

// Zone click hit-area positions (% within the store image)
const ZONE_HIT = {
  entrance:           { left: '44%', top: '66%', width: '16%', height: '12%' },
  'running-wall':     { left: '56%', top: '24%', width: '28%', height: '18%' },
  'lifestyle-endcap': { left: '38%', top: '42%', width: '18%', height: '16%' },
  'fitting-area':     { left: '20%', top: '42%', width: '18%', height: '16%' },
  checkout:           { left: '44%', top: '56%', width: '16%', height: '14%' },
  'apparel-back':     { left: '30%', top: '26%', width: '28%', height: '14%' },
}

function zoneHitStyle(id) {
  return ZONE_HIT[id] || { left: '0', top: '0', width: '0', height: '0' }
}
</script>

<style scoped>
/* ── Root ─────────────────────────────────────────────── */
.fp-root { position:relative; width:100%; height:100%; display:flex; flex-direction:column; overflow:hidden; }
.fp-dark { background:#0D1117; }
.fp-light { background:#ffffff; }

/* ── Plan mode ────────────────────────────────────────── */
.plan-svg { width:100%; height:100%; display:block; flex:1; }
.zone-name-text { font-family:'Inter',-apple-system,sans-serif; font-size:11px; font-weight:600; fill:rgba(255,255,255,0.9); letter-spacing:0.04em; text-transform:uppercase; pointer-events:none; }
.zone-hero-num  { font-family:'Inter',-apple-system,sans-serif; font-size:30px; font-weight:700; fill:rgba(255,255,255,0.85); letter-spacing:-0.03em; pointer-events:none; }
.entry-label    { font-family:'Inter',-apple-system,sans-serif; font-size:9px; font-weight:600; fill:rgba(255,255,255,0.22); letter-spacing:0.12em; }

/* ── Floating callout (plan mode) ─────────────────────── */
.zone-callout { position:absolute; background:rgba(6,8,12,0.97); backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px); border:1px solid rgba(255,255,255,0.11); border-radius:14px; padding:12px 18px 14px; pointer-events:none; z-index:20; box-shadow:0 8px 40px rgba(0,0,0,0.6); min-width:200px; }
.zone-callout-zone { font-size:10px; font-weight:600; color:rgba(255,255,255,0.38); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:10px; }
.zone-callout-stats { display:flex; align-items:center; gap:14px; }
.zone-callout-stat { display:flex; flex-direction:column; gap:3px; }
.callout-num  { font-size:28px; font-weight:700; color:#fff; line-height:1; letter-spacing:-0.03em; }
.callout-unit { font-size:13px; font-weight:400; color:rgba(255,255,255,0.48); margin-left:1px; }
.callout-exit { font-size:20px; }
.callout-lbl  { font-size:9px; font-weight:600; color:rgba(255,255,255,0.32); text-transform:uppercase; letter-spacing:0.09em; }
.callout-divider { width:1px; height:34px; background:rgba(255,255,255,0.1); flex-shrink:0; }

/* ── Plan legend ─────────────────────────────────────── */
.plan-legend { position:absolute; bottom:16px; left:18px; display:flex; align-items:center; gap:5px; font-size:10px; font-weight:500; color:rgba(255,255,255,0.38); background:rgba(6,8,12,0.75); backdrop-filter:blur(8px); padding:5px 12px; border-radius:999px; border:1px solid rgba(255,255,255,0.07); letter-spacing:0.03em; }
.l-pip { display:inline-block; width:8px; height:8px; border-radius:50%; }

/* ── Heat map mode ───────────────────────────────────── */
.store-wrap { flex:1; position:relative; display:flex; align-items:center; justify-content:center; overflow:hidden; padding: 24px 32px 56px; }

.store-img { max-width:100%; max-height:100%; width:auto; height:auto; object-fit:contain; display:block; position:relative; z-index:1; user-select:none; -webkit-user-drag:none; }

.heat-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  mix-blend-mode: screen;
}

/* Invisible zone hit targets over image */
.zone-hit {
  position: absolute;
  z-index: 3;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
  transition: background 120ms;
}
.zone-hit:hover { background: rgba(255,255,255,0.08); }
.zone-hit.active { background: rgba(255,255,255,0.12); }

/* ── Bottom controls ─────────────────────────────────── */
.store-controls {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 10;
}

.view-pill {
  pointer-events: all;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 28px;
  border-radius: 999px;
  background: #F8C840;
  border: none;
  cursor: pointer;
  color: #1A1200;
  font-size: 13px;
  font-weight: 700;
  box-shadow: 0 4px 18px rgba(248,200,64,0.40);
  transition: transform 120ms, box-shadow 120ms;
  gap: 4px;
}
.view-pill:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(248,200,64,0.52); }

.view-360 {
  position: absolute;
  right: 20px;
  pointer-events: all;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(255,255,255,0.82);
  border: 1px solid rgba(0,0,0,0.08);
  cursor: pointer;
  color: #1A1A1A;
  font-size: 12px;
  font-weight: 600;
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 120ms;
}
.view-360:hover { transform: translateY(-1px); }

/* ── Transitions ─────────────────────────────────────── */
.callout-enter-active, .callout-leave-active { transition:opacity 180ms ease; }
.callout-enter-from, .callout-leave-to { opacity:0; }
</style>
