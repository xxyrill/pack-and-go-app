import { postApi, patchApi } from '~/plugins/http'
const initialState = () => {
  return {
    log: {}
  }
}
const state = () => {
  return initialState()
}

const mutations = {
  SET_LOGIN (state, payload) {
    state.log = payload
  },
  SET_USER_DATA (state, payload) {
    state.log.user.avatar = payload
  },
  RESET_LOGIN_STATE (state) {
    /*
        FUNCTION:
        RESET TO INITIAL STATE. YOU WILL APPRECIATE THIS FUNCTIONALITY
        WHEN YOU ALREADY DEALING WITH COOKIE / LOCAL STORAGE
      */
    Object.assign(state, initialState())
  }
}

const getters = {
  log: state => state.log,
  token: state => state.token
}

const actions = {
  POST_LOGIN ({ commit }, payload) {
    return postApi('/login', payload)
  },
  POST_LOGOUT ({ commit }, payload) {
    return postApi('/logout', payload)
  },
}

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations
}
