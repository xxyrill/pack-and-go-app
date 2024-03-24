import { postApi, patchApi } from '~/plugins/http'
const initialState = () => {
  return {
  }
}
const state = () => {
  return initialState()
}

const mutations = {
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
}

const actions = {
  DASH_CARDS ({ commit }, payload) {
    return postApi('/dashboard/dash-cards', payload)
  },
  DASH_REVENUE ({ commit }, payload) {
    return postApi('/dashboard/revenue', payload)
  }
}

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations
}
