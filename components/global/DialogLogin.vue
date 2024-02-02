<template>
  <div mt-3 class="d-flex justify-end rounded-xxl">
    <!-- <v-btn class="mr-3" large rounded text @click="loginDialog" color="white">LOGIN</v-btn> -->
    <a style="color: white; text-decoration: none" class="mr-4 pa-2 subtitle-1" @click="loginDialog">LOGIN</a>
    <v-dialog
      v-model="dialog"
      width="350"
      overlay-color="black"
      class="rounded-xxl"
    >
      <v-card class="rounded-xxl" >
        <v-card-title class="d-flex justify-center">
          <v-flex class="pa-2">
            <p class="headline text-center">LOGIN</p>
            <p class="caption text-center">Please enter your email and password</p>
          </v-flex>
        </v-card-title>
        <v-card-text>
          <v-flex class="px-10 pb-5">
            <v-text-field
              outlined
              dense
              color="black"
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
              color="black"
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
            <p class="caption text-center"><a style="color: black;">Forgot password?</a></p>
            <v-btn block depressed @click="login" :loading="loginloading" class="white--text" color="#249d5d">
              LOGIN
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
      login() {
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
            console.log(data.data.type)
            if(data.data.type == 'customer'){
              this.goTo('/application/customer')
              this.loginloading = false
            } else if(data.data.type == 'driver') {
              this.goTo('/application/driver')
              this.loginloading = false
            } else if(data.data.type == 'business') {
              this.goTo('/application/business')
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
      loginDialog() {
        this.dialog = true
      },
    },

    mounted () {
    }
  }
</script>