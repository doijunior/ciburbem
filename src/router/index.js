import Vue from 'vue'
import Router from 'vue-router'
// import Assets from './views/Assets.vue'
// import NewEntry from './views/NewEntry.vue'
import Home from '../pages/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // {
    //   path: '/assets',
    //   name: 'assets',
    //   component: Assets
    // },
    // {
    //   path: '/entries/new',
    //   name: 'NewEntry',
    //   component: NewEntry
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
});
