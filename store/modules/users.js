import { postApi, patchApi, deleteApi } from '~/plugins/http'

const initialState = () => {
  return {
    userRegister: {
      basicInfo: {},
      permaAddress: {},
      currAddress: {}
    }
  }
}
const state = () => {
  return initialState()
}

const mutations = {
  SET_USER_BASIC_INFO (state, payload) {
    state.userRegister.basicInfo = payload
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
  basicInfo: state => state.basicInfo,
  permaAddress: state => state.permaAddress,
  currAddress: state => state.currAddress,
}

const actions = {

  //USERS
  USERS_TABLE ({ commit }, payload) {
    return postApi(`/users`, payload)
  },
  CREATE_USERS ({ commit }, payload) {
    return postApi(`/users/create`, payload)
  },
  REGISTER_USERS ({ commit }, payload) {
    return postApi(`/users/register`, payload)
  },
  STORE_USERS ({ commit }, payload) {
    return postApi(`/users/store`, payload)
  },
  DELETE_USER ({ commit }, payload) {
    return deleteApi(`/users/delete/${id}`, payload)
  },
  EDIT_USER ({ commit }, payload) {
    return deleteApi(`/users/edit/${id}`, payload)
  },
  SHOW_USER ({ commit }, payload) {
    return getApi(`/users/show/${id}`, payload)
  },
  UPDATE_USER ({ commit }, payload) {
    return patchApi(`users/update/${id}`, payload)
  },

  
  //PERMANENT ADDRESS
  USER_PERMANENT_ADDRESS ({ commit }, payload) {
    return postApi(`address/permanent/`, payload)
  }, 

  //CURRENT ADDRESS
  USER_CURRENT_ADDRESS ({ commit }, payload) {
    return postApi(`address/current/`, payload)
  },

}

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations
}
