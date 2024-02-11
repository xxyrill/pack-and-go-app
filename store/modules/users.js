import { postApi, patchApi, deleteApi, getApi } from '~/plugins/http'

const initialState = () => {
  return {
    user: null,
    refresh: false,
    refresh_vehicles: false
  }
}
const state = () => {
  return initialState()
}

const mutations = {
  SET_USER_ID (state, payload) {
    state.user = payload
  },
  REFRESH_DATA (state, payload) {
    state.refresh = payload
  },
  REFRESH_DATA_VEHICLES (state, payload) {
    state.refresh_vehicles = payload
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
  refresh_vehicles: state => state.refresh_vehicles,
  refresh: state => state.refresh,
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
  USER_UPDATE ({ commit }, payload) {
    return patchApi(`/user/${payload.id}`, payload)
  },
  USER_UPDATE_EMAIL ({ commit }, payload) {
    return postApi(`/user/update/email`, payload)
  },
  USER_UPDATE_CONTACT_NUMBER ({ commit }, payload) {
    return postApi(`/user/update/contact-number`, payload)
  },
  USER_CHECK_PASSWORD ({ commit }, payload) {
    return postApi(`/user/check/password`, payload)
  },
  USER_UPDATE_PASSWORD ({ commit }, payload) {
    return postApi(`/user/update/password`, payload)
  },


  //OTP
  REGISTRATION_SEND_OTP ({ commit }, payload) {
    return postApi(`send-otp/`, payload)
  },
  SEND_EMAIL_UPDATE_OTP ({ commit }, payload) {
    return postApi(`send-otp-mail/`, payload)
  },
  SEND_CONTACT_NUMBER_UPDATE_OTP ({ commit }, payload) {
    return postApi(`/send-otp-contact-number`, payload)
  },
  VERIFY_OTP ({ commit }, payload) {
    return postApi(`verify/`, payload)
  },
  GET_SUBSCRIPTION ({ commit }, payload) {
    return getApi(`/user/subscription`, payload)
  },

  //User Vehicles
  USER_VEHICLE ({ commit }, payload) {
    return postApi(`/user-vehicle`, payload)
  },
  USER_VEHICLE_STORE ({ commit }, payload) {
    return postApi(`/user-vehicle/store`, payload)
  },
  USER_VEHICLE_UPDATE ({ commit }, payload) {
    return patchApi(`/user-vehicle/${payload.id}`, payload)
  },
  USER_VEHICLE_DELETE ({ commit }, payload) {
    return deleteApi(`/user-vehicle/${payload.id}`, payload)
  },
}

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations
}
