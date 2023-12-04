import { mapMutations } from 'vuex'
import _ from 'lodash'

export default {
  data: () => ({

  }),
  methods: {
    ...mapMutations('storeevents', ['SET_DYNAMIC_TOOLBAR_NAME', 'REMOVE_SPECIFIC_NAME_IN_TOOLBAR']),
    goTo(route) {
      if (!_.isUndefined(localStorage.token)) {
        this.$router.push(route)
      } else {
        this.$router.push('/logout')
        this.$router.push('/')
      }
      console.log('dave', route)
    },
    toolBarName (payload) {
      this.SET_DYNAMIC_TOOLBAR_NAME(payload)
    },
    toolBarNameRemove (payload) {
      this.REMOVE_SPECIFIC_NAME_IN_TOOLBAR(payload)
    },
    isUndefined (payload) {
      if (!_.isUndefined(payload)) {
        return true
      } else {
        return false
      }
    },
    isEmpty (payload) {
      if (!_.isEmpty(payload)) {
        return true
      } else {
        return false
      }
    },
    isNull (payload) {
      if (!_.isNull(payload)) {
        return true
      } else {
        return false
      }
    },
    isObject (payload) {
      if (!_.isObject(payload)) {
        return true
      } else {
        return false
      }
    },
    isNaN (payload) {
      if (!_.isNaN(payload)) {
        return true
      } else {
        return false
      }
    }
  }
}
