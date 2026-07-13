import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'heatmap',
    component: () => import('../views/HeatmapView.vue'),
  },
  {
    path: '/campaigns',
    name: 'campaigns',
    component: () => import('../views/CampaignView.vue'),
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
