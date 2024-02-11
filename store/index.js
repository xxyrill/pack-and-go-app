import Vue from 'vue'
import Vuex from 'vuex'


import users from './modules/users'
import login from './modules/login'
import vehicle from './modules/vehicle'
import booking from './modules/booking'
import chats from './modules/chats'
import subscription from './modules/subscription'


Vue.use(Vuex)

const store = () => {
  return new Vuex.Store({
    modules: {
      users,
      login,
      vehicle,
      booking,
      chats,
      subscription
    }
  })
}

export default store
