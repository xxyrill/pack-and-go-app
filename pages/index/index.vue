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
import Global from '~/plugins/mixins/global'

export default {
  mixins: [
    Global,
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
        ...mapGetters('login', ['loginUser']),
  },
  watch: {
    'loginUser': {
      handler() {
        this.data = this.loginUser
      }, deep: true
    }
  },
  methods: {
    ...mapActions('login', ['POST_LOGIN']),
    ...mapMutations('login', ['SET_LOGIN']),
    login() {
      this.loginloading = true
      let login = {
        email: this.form.email ? this.form.email : null,
        password: this.form.password ? this.form.password : null,
      }
     this.POST_LOGIN(login).then(data => {
        console.log('data',data)
        // console.log('error', data.data.errors.Message[0])
        this.SET_LOGIN(data)
        // this.goTo('/users')
      }).catch(error => {
        this.loginloading = false
        console.log('errorajsdkljaskldjkas', error)
        // this.error('qwe', data.data.errors.Message[0])
        // this.errorMessage = error.data.errors.Message[0];
      })
    }
  }
}
</script>