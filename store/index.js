import Vue from 'vue'
import Vuex from 'vuex'


import users from './modules/users'
import login from './modules/login'


Vue.use(Vuex)

const store = () => {
  return new Vuex.Store({
    modules: {
      users,
      login,
    }
  })
}

export default store
