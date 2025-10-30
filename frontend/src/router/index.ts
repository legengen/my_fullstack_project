import { createRouter, createWebHistory } from 'vue-router'
import TacoDesigner from "../views/TacoDesignerView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/TacoDesigner',
      name: 'TacoDesigner',
      component: TacoDesigner,
    }
  ],
})

export default router
