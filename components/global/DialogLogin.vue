<template>
  <div class="px-2">
    <v-btn rounded dark @click="loginDialog">LOGIN</v-btn>
    <!-- <a style="color: white; text-decoration: none" class="mr-4 pa-2 subtitle-1" @click="loginDialog">LOGIN</a> -->
    <v-dialog
      v-model="dialog"
      :width="login ? 400 : 450"
      overlay-color="black"
      class="rounded-xxl"
      dark
    >
      <v-card class="rounded-xxl" style="opacity: 90%;">
        <v-card-title class="d-flex justify-center">
          <v-flex class="pa-2" v-if="login">
            <p class="headline text-center">LOGIN</p>
            <p class="caption text-center">Please enter your email and password</p>
          </v-flex>
          <v-flex v-else class="pa-2">
            <p class="headline text-center">Forgot Password</p>
            <p class="caption text-center">Enter your email and we'll send you a link to reset your password</p>
          </v-flex>
        </v-card-title>
        <v-card-text v-if="login">
          <v-flex class="px-10 pb-5">
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
              v-on:keyup.enter="loginFunction"
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
              v-on:keyup.enter="loginFunction"
            />
            <p class="caption text-center"><a style="color: #8ec3eb;" @click="forgotPassword">Forgot password?</a></p>
            <v-btn block depressed @click="loginFunction" :loading="loginloading" class="white--text" color="#249d5d">
              LOGIN
            </v-btn>
          </v-flex>
        </v-card-text>
        <v-card-text v-else>
          <v-flex class="px-10 pb-5">
            <v-text-field
              outlined
              dense
              color="black"
              class="rounded-xl"
              v-model="form.forgot_password"
              label="Email Address"
              persistent-placeholder
              prepend-inner-icon="mail_outline"
              placeholder="Email"
              :error-messages="this.errors ? this.errors.forgot_password ? this.errors.forgot_password[0] : '' : ''"
            />
            <v-btn block depressed @click="sentEmail" :loading="loginloadingForgot" class="white--text" color="#1E88E5">
              Submit
            </v-btn>
            <v-btn block text @click="goBack" :loading="loginloading" color="#1E88E5">
              <Icon icon="solar:alt-arrow-left-linear" width="20" height="20"/>
              Back to Login
            </v-btn>
          </v-flex>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import axios from 'axios'
  import Global from '~/plugins/mixins/global'

  export default {
    props: {
      dataAbstract: [Object, Array]
    },
    mixins: [
      Global,
    ],
    data: () => ({
      errors: {},
      form: {},
      dialog: false,
      email: null,
      show: false,
      password: null,
      loginloading: false,
      login: true,
      loginloadingForgot: false
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
      ...mapMutations('users', ['SET_USER_ID']),
      ...mapActions('users', ['USER_FORGOT_PASSWORD']),
      loginFunction() {
        this.loginloading = true
        let login = {
          email: this.form.email ? this.form.email : null,
          password: this.form.password ? this.form.password : null,
        }
      this.POST_LOGIN(login).then(data => {
          this.SET_LOGIN(data.data)
          this.SET_USER_ID(data.data.id)
          localStorage.setItem('token', data.data.token)
          if (!_.isNull(localStorage.getItem('token'))) {
            if(data.data.type == 'customer'){
              this.goTo('/application/customer')
              this.loginloading = false
            } else if(data.data.type == 'driver') {
              this.goTo('/application/driver')
              this.loginloading = false
            } else if(data.data.type == 'business') {
              this.goTo('/application/business')
              this.loginloading = false
            } else if(data.data.type == 'admin') {
              this.goTo('/admin')
              this.loginloading = false
            }else{
              this.goTo('/')
            }
          }else{
            this.goTo('/application/customer')
          }
        }).catch(response => {
          this.loginloading = false
          this.errors = response.response.data.errors;
        })
      },
      forgotPassword() {
        this.login = false
      },
      loginDialog() {
        this.dialog = true
      },
      goBack() { 
        this.login = true
      },
      async sentEmail() {
        this.loginloadingForgot = true
        let payload = {
          email : this.form.forgot_password
        }
        await this.USER_FORGOT_PASSWORD(payload).then(data => {
          this.login = true
          this.$swal.fire({
            title: 'An email has been sent. Please check your email.',
            icon: 'success',
            confirmButtonColor: '#009c25',
            confirmButtonText: 'OK'
          })
          this.loginloadingForgot = false
        }).catch(response => {
          this.$swal.fire({
            title: 'Something went wrong. Please try again.',
            icon: 'error',
            confirmButtonColor: '#009c25',
            confirmButtonText: 'OK'
          })
          this.loginloadingForgot = false
        })
      }
    },

    mounted () {
    }
  }
</script>