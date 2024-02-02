import { postApi, patchApi, deleteApi } from '~/plugins/http'

const initialState = () => {
  return {
    user: null
  }
}
const state = () => {
  return initialState()
}

const mutations = {
  SET_USER_ID (state, payload) {
    state.user = payload
  },

  SET_USER_PERMA_ADDRESS (state, payload) {
    state.userRegister.permaAddress = payload
  },

  SET_USER_CURR_ADDRESS (state, payload) {
    state.userRegister.currAddress = payload
  },

  RESET_USERS_STATE (state) {
      /*
        FUNCTION:
        RESET TO INITIAL STATE. YOU WILL APPRECIATE THIS FUNCTIONALITY
        WHEN YOU ALREADY DEALING WITH COOKIE / LOCAL STORAGE
      */
    Object.assign(state, initialState())
  }
}

const getters = {
  user: state => state.user,
  permaAddress: state => state.permaAddress,
  currAddress: state => state.currAddress,
}

const actions = {

  //USERS
  USERS_REGISTRATION ({ commit }, payload) {
    return postApi(`/user-registration`, payload)
  },
  USER_VERIFY_FEILDS ({ commit }, payload) {
    return postApi('/verify-feilds', payload)
  },
  GET_DETAILS_OF_CURRENT_LOGIN ({ commit }, payload) {
    return postApi('/user/get', payload)
  },

  //OTP
  REGISTRATION_SEND_OTP ({ commit }, payload) {
    return postApi(`send-otp/`, payload)
  },
  VERIFY_OTP ({ commit }, payload) {
    return postApi(`verify/`, payload)
  },

}

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations
}
