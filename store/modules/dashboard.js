import { postApi } from '~/plugins/http'

const initialState = () => {
  return {
    searchDashBoard: {},
    viewDashStatusDia: false,
  }
}
const state = () => {
  return initialState()
}

const mutations = {
  SET_SEARCH_DASHBOARD (state, payload) {
    state.searchDashBoard = payload
  },
  SET_VIEW_DASH_STATUS_DIA (state, payload) {
    state.viewDashStatusDia = payload
  },
  RESET_DASHBOARD_STATE (state) {
    /*
        FUNCTION:
        RESET TO INITIAL STATE. YOU WILL APPRECIATE THIS FUNCTIONALITY
        WHEN YOU ALREADY DEALING WITH COOKIE / LOCAL STORAGE
      */
    Object.assign(state, initialState())
  }
}

const getters = {
  token: state => state.token,
  searchDashBoard: state => state.searchDashBoard,
  viewDashStatusDia: state => state.viewDashStatusDia,
}

const actions = {
  // DOWLOAD_APP ({ commit }, payload) {
  //   return postApi('/consolidations/app', payload)
  // },
}

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations
}
