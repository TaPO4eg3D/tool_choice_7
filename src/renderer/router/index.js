import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/alternatives',
      name: 'alternatives',
      component: require('@/components/alternatives/AlternativesPage').default
    },
    {
      path: '/criterias',
      name: 'criterias',
      component: require('@/components/criterias/CriteriasPage').default
    },
    {
      path: '/',
      name: 'main-page',
      component: require('@/components/main-page/MainPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
