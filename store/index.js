import Vue from 'vue'
import Vuex from 'vuex'


import users from './modules/users'
import login from './modules/login'
import vehicle from './modules/vehicle'


Vue.use(Vuex)

const store = () => {
  return new Vuex.Store({
    modules: {
      users,
      login,
      vehicle
    }
  })
}

export default store
