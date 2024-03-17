import Vue from 'vue'
import Vuex from 'vuex'


import users from './modules/users'
import login from './modules/login'
import vehicle from './modules/vehicle'
import booking from './modules/booking'
import chats from './modules/chats'
import subscription from './modules/subscription'
import analytics from './modules/analytics'


Vue.use(Vuex)

const store = () => {
  return new Vuex.Store({
    modules: {
      users,
      login,
      vehicle,
      booking,
      chats,
      subscription,
      analytics
    }
  })
}

export default store
