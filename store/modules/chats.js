import { postApi, patchApi, deleteApi } from '~/plugins/http'

const initialState = () => {
  return {
  }
}
const state = () => {
  return initialState()
}

const mutations = {
  RESET_CHATS_STATE (state) {
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
  NEW_CHAT ({ commit }, payload) {
    return postApi(`/chat/new`, payload)
  },
  MESSAGES ({ commit }, payload) {
    return postApi(`/chat/get`, payload)
  },
  CREATE_CHATROOM ({ commit }, payload) {
    return postApi(`/chat/chatroom/${payload.id}`, payload)
  },
  CHATROOMS ({ commit }, payload) {
    return postApi(`/chat/chatrooms`, payload)
  },
  DELETE_NOTIFICATION ({ commit }, payload) {
    return postApi('/chat/notif/delete', payload)
  }
}

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations
}
