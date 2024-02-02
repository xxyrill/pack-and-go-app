import { postApi, patchApi, deleteApi } from '~/plugins/http'

const initialState = () => {
  return {
  }
}
const state = () => {
  return initialState()
}

const mutations = {
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
}

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations
}
