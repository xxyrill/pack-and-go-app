import { postApi, patchApi, deleteApi } from '~/plugins/http'

const initialState = () => {
  return {
    refresh : false,
  }
}
const state = () => {
  return initialState()
}

const mutations = {
  SET_REFRESH (state, payload) {
    state.refresh = payload
  },
  RESET_SUBSCRIPTION_STATE (state) {
      /*
        FUNCTION:
        RESET TO INITIAL STATE. YOU WILL APPRECIATE THIS FUNCTIONALITY
        WHEN YOU ALREADY DEALING WITH COOKIE / LOCAL STORAGE
      */
    Object.assign(state, initialState())
  }
}

const getters = {
  refresh: state => state.refresh,
}

const actions = {
  GET_SUBSCRIPTIONS ({ commit }, payload) {
    return postApi(`/subscription`, payload)
  }
}

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations
}
