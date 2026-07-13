<template>
  <div class="st-app" style="min-height:100vh;background:var(--bg)">
    <header class="st-appbar">
      <div class="st-appbar-inner">
        <router-link to="/" class="st-wordmark">
          <div class="st-wordmark-dot">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1.5" fill="white"/>
              <rect x="8" y="1" width="5" height="5" rx="1.5" fill="white" opacity="0.55"/>
              <rect x="1" y="8" width="5" height="5" rx="1.5" fill="white" opacity="0.55"/>
              <rect x="8" y="8" width="5" height="5" rx="1.5" fill="white" opacity="0.3"/>
            </svg>
          </div>
          <span class="st-wordmark-name">Sole Traffic</span>
        </router-link>

        <nav class="st-nav">
          <router-link to="/" class="st-nav-link" :class="{ 'is-active': $route.path === '/' }">
            Heat Map
          </router-link>
          <router-link to="/campaigns" class="st-nav-link" :class="{ 'is-active': $route.path === '/campaigns' }">
            Campaign Planner
          </router-link>
        </nav>
      </div>
    </header>

    <router-view />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const $route = useRoute()
</script>
