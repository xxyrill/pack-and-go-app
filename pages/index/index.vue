<template>
  <v-app class="landing-bg-img">
    <toolbar-landing/>
    <v-layout>
      <v-flex md7 class="d-flex align-center flex-column">
        <v-flex pa-5 class="d-flex flex-column justify-center">
          <span style="font-weight: bold; font-size: 100px; color: #ffffff; font-family: 'Segoe UI Black', 'Segoe UI', sans-serif">
            Moving is
          </span>
          <span style="font-weight: bold; font-size: 100px; color: #ffffff; font-family: 'Segoe UI Black', 'Segoe UI', sans-serif;">
            what we
          </span>
          <span style="font-weight: bold; font-size: 100px; color: #ffffff; font-family: 'Segoe UI Black', 'Segoe UI', sans-serif;">
            love.
          </span>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Imagepath from '~/plugins/mixins/imagepath'
import Global from '~/plugins/mixins/global'

export default {
  mixins: [
    Global,
    Imagepath
  ],
  data: () => ({
    errors: {},
    errorMessage: '',
    form: {},
    email: null,
    show: false,
    password: null,
    loginloading: false,
  }),
  computed: {
  },
  watch: {
  },
  methods: {
    ...mapMutations('booking', ['RESET_BOOKING_STATE']),
    ...mapMutations('chats', ['RESET_CHATS_STATE']),
    ...mapMutations('login', ['RESET_LOGIN_STATE']),
    ...mapMutations('subscription', ['RESET_SUBSCRIPTION_STATE']),
    ...mapMutations('users', ['RESET_USERS_STATE']),
    ...mapMutations('vehicle', ['RESET_VEHICLE_STATE']),
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.RESET_BOOKING_STATE()
      vm.RESET_CHATS_STATE()
      vm.RESET_LOGIN_STATE()
      vm.RESET_SUBSCRIPTION_STATE()
      vm.RESET_USERS_STATE()
      vm.RESET_VEHICLE_STATE()
    })
  },
}
</script>