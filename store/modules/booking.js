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
  RESET_BOOKING_STATE (state) {
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
  BOOKING_STORE ({ commit }, payload) {
    return postApi(`/booking/store`, payload)
  },
  BOOKING_UPDATE ({ commit }, payload) {
    return patchApi(`/booking/update/${payload.id}`, payload)
  },
  BOOKING_LIST ({ commit }, payload) {
    return postApi(`/booking`, payload)
  },
  SET_OTP ({ commit }, payload) {
    return postApi(`/send-otp`, payload)
  },
  SEND_MAIL ({ commit }, payload) {
    return postApi(`/send-mail`, payload)
  },
  BOOKING_RESCHEDULE ({ commit }, payload) {
    return postApi(`/booking/reschedule`, payload)
  },
  BOOKING_CANCEL ({ commit }, payload) {
    return postApi(`/booking/canceled`, payload)
  },
  BOOKING_HISTORY ({ commit }, payload) {
    return postApi(`/booking/history`, payload)
  },
}

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations
}
