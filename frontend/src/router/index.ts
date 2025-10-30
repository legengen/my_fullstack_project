import { createRouter, createWebHistory } from 'vue-router'
import TacoDesigner from "../views/TacoDesignerView.vue"
import TacoOrderView from "../views/TacoOrderView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/TacoDesigner',
      name: 'TacoDesigner',
      component: TacoDesigner,
    },
    {
      path: '/TacoOrder',
      name: 'TacoOrder',
      component: TacoOrderView
    }
  ],
})

export default router
