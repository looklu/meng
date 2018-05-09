import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Content from '@/page/content'
import Apply from '@/page/apply'
import Buy from '@/page/buy'
import Attendee from '@/page/addAttendee'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/content/:id',
      component: Content
    },
    {
      path: '/apply/:id',
      component: Apply
    },
    {
      path: '/buy',
      component: Buy
    },
    {
      path: '/attendee/:userId/:attendeeId/:attendeeName/:mobile/:organization/:job?/:type',
      component: Attendee
    }
  ]
})
