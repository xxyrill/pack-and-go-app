<template>
  <v-layout>
    <client-only>
      <toolbar/>
      <v-main>
        <v-container>
          <v-layout class="align-content-center justify-center pa-15" >
            <v-card outline class="pa-10 rounded-xl">
              <p class="headline text-center">LOGIN</p>
              <p class="caption text-center" >Please enter your email and password.</p>
              <v-flex>
                <v-text-field
                  outlined
                  dense
                  class="rounded-xl"
                  v-model="form.email"
                  label="Email Address"
                  persistent-placeholder
                  prepend-inner-icon="mail_outline"
                  placeholder="Email"
                  :error-messages="this.errors ? this.errors.email ? this.errors.email[0] : '' : ''"
                  v-on:keyup.enter="login"
                />
                
                <v-text-field
                  outlined
                  dense
                  class="rounded-xl"
                  v-model="form.password"
                  placeholder="Password"
                  persistent-placeholder
                  label="Password"
                  prepend-inner-icon="mdi-lock-outline"
                  @click:append="show = !show"
                  :append-icon="show ? 'visibility' : 'visibility_off'"
                  :type="show ? 'text' : 'password'"
                  :error-messages="this.errors ? this.errors.password ? this.errors.password[0] : '' : ''"
                  v-on:keyup.enter="login"
                />
              </v-flex>
              <p class="caption text-center"><a>Forgot password?</a></p>
              <v-flex class="d-flex justify-center">
                <v-btn block depressed @click="login" :loading="loginloading" class="white--text" color="#249d5d">
                  LOGIN
                </v-btn>
              </v-flex>
            </v-card>
          </v-layout>
        </v-container>
      </v-main>
    </client-only>
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
    form: {},
    email: null,
    show: false,
    password: null,
    loginloading: false,
  }),
  computed: {
        ...mapGetters('login', ['log']),
  },
  watch: {
    'log': {
      handler() {
        this.data = this.log
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
        this.SET_LOGIN(data.data)
        this.loginloading = false
      }).catch(error => {
        this.loginloading = false
        this.errors = error.response.data.errors;
      })
    }
  }
}
</script>