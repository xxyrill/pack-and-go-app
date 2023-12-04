<template>
  <v-layout class="main-reset">
      <toolbar />
        <v-main class="main-reset">
        </v-main>
  </v-layout>
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

<style scoped>
.main-reset {
  margin: 0;
  padding: 0;
}
</style>