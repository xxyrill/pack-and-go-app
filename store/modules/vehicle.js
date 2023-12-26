import { postApi, patchApi, deleteApi } from '~/plugins/http'

const initialState = () => {
  return {
  }
}
const state = () => {
  return initialState()
}

const mutations = {
  RESET_VEHICLE_STATE (state) {
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
  VEHICLE_LIST ({ commit }, payload) {
    return postApi(`/vehicle-dropdown`, payload)
  },
}

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations
}
