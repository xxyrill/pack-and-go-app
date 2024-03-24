import { postApi, patchApi, deleteApi, getApi } from '~/plugins/http'

const initialState = () => {
  return {
    user: null,
    refresh: false,
    refresh_ratings: false,
    refresh_vehicles: false,
    refresh_subscription: false,
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
  REFRESH_SUBSCRIPTION (state, payload) {
    state.refresh_subscription = payload
  },
  REFRESH_RATINGS_DATA (state, payload) {
    state.refresh_ratings = payload
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
  refresh_ratings: state => state.refresh_ratings,
  permaAddress: state => state.permaAddress,
  currAddress: state => state.currAddress,
  refresh_subscription: state => state.refresh_subscription
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
  USER_RATE ({ commit }, payload) {
    return postApi(`/user/rate`, payload)
  },
  USER_RATINGS ({ commit }, payload) {
    return postApi(`/user/ratings`, payload)
  },
  USER_RATINGS_STARS ({ commit }, payload) {
    return getApi(`/user/ratings/stars`, payload)
  },
  USER_BLOCKED ({ commit }, payload) {
    return postApi(`/user/blocked`, payload)
  },
  USER_BLOCKED_LIST ({ commit }, payload) {
    return postApi(`/user/list`, payload)
  },
  USER_CURRENT_PLAN ({ commit }) {
    return getApi(`/user/current-plan`)
  },
  USER_SUBSCRIBE_PLAN ({ commit }, payload) {
    return postApi(`/user/subscribe-plan`, payload)
  },
  USER_DETAILS ({ commit }, payload) {
    return getApi(`/user/show/${payload.id}`, payload)
  },
  USER_FORGOT_PASSWORD ({ commit }, payload) {
    return postApi(`/user/forgot-password`, payload)
  },
  FORGOT_PASS_RESET ({ commit }, payload) {
    return postApi(`/user/password/save`, payload)
  },


  //USER RATING COMMENT
  USER_RATING_COMMENT_STORE ({ commit }, payload) {
    return postApi(`/user-rating-comment/store`, payload)
  },
  USER_RATINGS_COMMENT_UPDATE ({ commit }, payload) {
    return postApi(`/user-rating-comment/update`, payload)
  },
  USER_RATINGS_COMMENT_DELETE ({ commit }, payload) {
    return deleteApi(`/user-rating-comment/${payload.id}`, payload)
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
  USER_VEHICLE_LISTING ({ commit }, payload) {
    return postApi(`/user-vehicle/listing`, payload)
  },
}

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations
}
