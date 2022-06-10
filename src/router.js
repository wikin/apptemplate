import { createRouter, createWebHistory } from 'vue-router'
import PageHome from '@/views/PageHome.vue'
import PageNotFound from '@/views/PageNotFound.vue'

const routes = [
  {
    path: '/',
    name: 'PageHome',
    component: PageHome,
  },
  {
    path: '/team',
    name: 'Team',
    component: function () {
      return import(/* webpackChunkName: "team" */ '@/views/PageTeam.vue')
    },
  },
  {
    path: '/docs',
    name: 'Docs',
    component: function () {
      return import(/* webpackChunkName: "docs" */ '@/views/PageDocs.vue')
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: function () {
      return import(
        /* webpackChunkName: "settings" */ '@/views/PageSettings.vue'
      )
    },
  },
  { path: '/:pathMatch(.*)*', component: PageNotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
