import { postApi, patchApi } from '~/plugins/http'
const initialState = () => {
  return {
    loginUser: {}
  }
}
const state = () => {
  return initialState()
}

const mutations = {
  SET_LOGIN (state, payload) {
    state.loginUser = payload
  },
  SET_USER_DATA (state, payload) {
    state.loginUser.user.avatar = payload
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
  loginUser: state => state.loginUser,
  token: state => state.token
}

const actions = {
  POST_LOGIN ({ commit }, payload) {
    return postApi('/auth/login', payload)
  },

  // 

  // UPDATE PROFILE 
  UPDATE_PROFILE ({ commit }, payload) {
    return patchApi(`/users/${payload.id}`, payload)
  },
  UPDATE_PROFILE_PICTURE ({ commit }, payload) {
    return patchApi(`/users/upload/${payload.id}`, payload)
  },
}

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations
}
