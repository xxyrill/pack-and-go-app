const initialState = () => {
  return {
    // nav: false,
    dynamicToolbarName: [],
  }
}
const state = () => {
  return initialState()
}

const mutations = {
  // SET_NAV (state, payload) {
  //   state.nav = payload
  // },
  SET_DYNAMIC_TOOLBAR_NAME (state, payload) {
    let index = state.dynamicToolbarName.findIndex(data => data.name === payload.name)
    if(index === -1){
      state.dynamicToolbarName.push(payload)
    }
  },
  REMOVE_SPECIFIC_NAME_IN_TOOLBAR (state, payload) {
    let index = state.dynamicToolbarName.findIndex(data => data.name === payload)
    if(index !== -1){
      state.dynamicToolbarName.splice(index, 1)
    }
  },
  RESET_STOREEVENTS_STATE (state) {
    /*
        FUNCTION:
        RESET TO INITIAL STATE. YOU WILL APPRECIATE THIS FUNCTIONALITY
        WHEN YOU ALREADY DEALING WITH COOKIE / LOCAL STORAGE
      */
    Object.assign(state, initialState())
  }
}

const getters = {
  // nav: state => state.nav,
  dynamicToolbarName: state => state.dynamicToolbarName
}

const actions = {

}

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations
}
