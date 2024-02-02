<template>
  <v-container>
    <v-card class="rounded-l" min-height="650" elevation="15">
      <v-card-title class="d-flex justify-center">
        <v-flex md7>
          <v-layout row mt-2 pa-6>
            <v-avatar
              color="primary"
              size="50"
              class="mx-2">
                  <span>
                    <Icon icon="akar-icons:person" color="white" width="25" height="25" />
                  </span>  
            </v-avatar>
            <v-flex class="d-flex align-center mx-2">
              <v-divider></v-divider>
            </v-flex>
            <v-avatar
              color="primary"
              size="50"
              class="mx-2">
                  <span>
                    <Icon icon="gravity-ui:shield-check" color="white" width="30" height="30" />
                  </span>  
            </v-avatar>
            <v-flex class="d-flex align-center mx-2">
              <v-divider ></v-divider>
            </v-flex>
            <v-avatar
              color="primary"
              size="50"
              class="mx-2">
                  <span>
                    <Icon icon="lucide:check-circle" color="white" width="30" height="30" />
                  </span>  
            </v-avatar>
          </v-layout>
        </v-flex>
      </v-card-title>
      <v-card-text>
        <v-flex v-if="step == 1">
          <v-layout justify-center>
            <v-flex md5>
              <v-flex class="mx-3">
                <v-text-field
                v-model="form.first_name"
                  dense
                  outlined
                  persistent-placeholder
                  label="First Name"
                  :error-messages="errors ? errors.first_name ? errors.first_name :'':''"
                  color="success"
                />
              </v-flex>
              <v-flex class="mx-3">
                <v-text-field
                  v-model="form.last_name"
                  dense
                  outlined
                  persistent-placeholder
                  label="Last Name"
                  :error-messages="errors ? errors.last_name ? errors.last_name :'':''"
                  color="success"
                />
              </v-flex>
              <v-flex class="mx-3">
                <v-text-field
                  v-model="form.user_name"
                  dense
                  outlined
                  persistent-placeholder
                  label="Username"
                  :error-messages="errors ? errors.user_name ? errors.user_name :'':''"
                  color="success"
                />
              </v-flex>
              <v-flex class="mx-3">
                <v-text-field
                  v-model="form.email"
                  dense
                  outlined
                  persistent-placeholder
                  label="Email"
                  :error-messages="errors ? errors.email ? errors.email :'':''"
                  color="success"
                />
              </v-flex>
              <v-flex class="mx-3">
                <v-text-field
                  v-model="form.password"
                  dense
                  outlined
                  persistent-placeholder
                  label="Password"
                  color="success"
                  :error-messages="errors ? errors.password ? errors.password :'':''"
                  type="password"
                />
              </v-flex>
              <v-flex class="mx-3">
                <v-text-field
                  v-model="form.confirm_password"
                  dense
                  outlined
                  persistent-placeholder
                  label="Confirm Password"
                  color="success"
                  :error-messages="errors ? errors.confirm_password ? errors.confirm_password :'':''"
                  type="password"
                />
              </v-flex>
            </v-flex>
          </v-layout>
          <v-flex class="d-flex justify-center">
            <v-btn
              color="primary"
              @click=nexStep(1)
            >
              Continue
            </v-btn>
          </v-flex>
        </v-flex>
        <v-flex v-if="step == 2">
          <v-layout wrap column align-center>
            <span class="headline font-weight-bold">Two Step Authentication</span>
            <span class="caption">Kindly enter your phone number and we will send you a security code.</span>
            <v-layout wrap row mt-3>
              <v-flex px-1>
                <v-text-field
                  v-model="form.contact_number"
                  dense
                  outlined
                  number
                  prefix="+63"
                  type="number"
                  color="success"
                  hide-spin-buttons
                  :error-messages="errors ? errors.otp ? errors.otp[0] : '' : ''"
                />
              </v-flex>
              <v-flex px-1>
                <v-btn
                  fab
                  dark
                  color="primary"
                  small
                  :loading="send_otp_loading"
                  @click="sendOtp"
                >
                  <v-icon dark>
                    mdi-send
                  </v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
            <v-card outlined width="300px" class="pa-3 mt-1">
              <span class="d-flex justify-center">Enter your OTP key here.</span>
              <v-otp-input
                length="6"
                v-model="verifyOtp"
              ></v-otp-input>
            </v-card>
          </v-layout>
        </v-flex>
        <v-flex v-if="step == 3">
          <v-layout wrap column align-center justify-center>
            <v-card class="pa-11" shaped raised elevation="15">
              <v-flex>
                <v-flex class="d-flex justify-center">
                  <v-icon color="green" size="100">
                    mdi-check-circle-outline
                  </v-icon>
                </v-flex>
                <v-flex class="d-flex justify-center">
                  <span class="headline font-weight-bold">Application Submited.</span>
                </v-flex>
                <v-flex class="d-flex justify-center mt-6">
                  <v-btn outlined color="green" @click="home">Home</v-btn>
                </v-flex>
              </v-flex>
            </v-card>
          </v-layout>
        </v-flex>
      </v-card-text>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      top
      shaped
      :color="color"
      timeout="2000"
      text
      right
    >
      <div class="d-flex align-center">
        <Icon class="mr-2" :icon="snackIcon" :color="color" width="20" height="20" />
        {{ message }}
      </div>
    </v-snackbar>
    <v-overlay :value="loadingOverlay">
      <div style="background-color: transparent;" class="loadingio-spinner-double-ring-r67hxmztili"><div class="ldio-r7oxen6f2k">
      <div></div>
      <div></div>
      <div><div></div></div>
      <div><div></div></div>
      </div></div>
    </v-overlay>
  </v-container>
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
      modal: false,
      step: 1,
      errors: {},
      form: {},
      dialog: false,
      email: null,
      show: false,
      password: null,
      loginloading: false,
      radio_color: "red",
      type: "customer",
      date_menu: false,
      expiry_date: null,
      vehicle_list: [],
      gender: [
        {name : "Male", value: "male"},
        {name : "Female", value: "female"}
      ],
      send_otp_loading: false,
      form: {},
      snackbar: false,
      color: null,
      message: null,
      snackIcon: null,
      verifyOtp: null,
      loadingOverlay: false
    }),
    computed: {
      ...mapGetters('login', ['log']),
    },
    watch: {
      'log': {
        handler() {
          this.data = this.log
        }, deep: true
      },
      'verifyOtp': {
        handler() {
          if(this.verifyOtp.length == 6){
            this.otpVerification()
          }
        }, deep: true
      }
    },

    methods: {
      ...mapActions('users', ['REGISTRATION_SEND_OTP', 'VERIFY_OTP', 'USERS_REGISTRATION', 'USER_VERIFY_FEILDS']),
      loginDialog() {
        this.dialog = true
      },
      async sendOtp() {
        if (this.form.contact_number === undefined || this.form.contact_number === null) {
          this.$set(this.errors, 'otp', ['Number field is required.'])
        }else{
          this.$delete(this.errors, 'otp')
          let payload = {
            contact_number : this.form.contact_number,
            type: 'registration'
          }
          this.send_otp_loading = true
          await this.REGISTRATION_SEND_OTP(payload).then(data => {
            this.snackbar = true
            this.message = data.data.message
            this.color = "success"
            this.snackIcon = "icon-park-solid:success"
            this.send_otp_loading = false
          }).catch(response => {
            this.snackbar = true
            this.message = response.response.data.message
            this.color = "error"
            this.snackIcon = "ic:baseline-error"
            this.send_otp_loading = false
          })
        }
      },
      close(){
        this.dialog = false
      },
      nexStep(value){
        if(value == 1){
          let payload = {
            first_name : this.form ? this.form.first_name ? this.form.first_name : null : null,
            last_name : this.form ? this.form.last_name ? this.form.last_name : null : null,
            user_name : this.form ? this.form.user_name ? this.form.user_name : null : null,
            email : this.form ? this.form.email ? this.form.email : null : null,
            password : this.form ? this.form.password ? this.form.password : null : null ,
            confirm_password : this.form.confirm_password ? this.form.confirm_password ? this.form.confirm_password : nul : null
          }
          let validation = this.fieldsValidation(payload)
          if(validation.error == true){
            this.errors = validation.errors
          }else{
            this.errors = {}
            if(this.form.password !== this.form.confirm_password){
              this.$set(this.errors, 'password', ['Password did not match.'])
              this.$set(this.errors, 'confirm_password', ['Password did not match.'])
            }else{
              this.$delete(this.errors, 'password')
              this.$delete(this.errors, 'confirm_password')
              let fields = {
                email : this.form.email,
                user_name : this.form.user_name
              }
              this.USER_VERIFY_FEILDS(fields).then(data => {
                this.step += 1
              }).catch(response => {
                this.errors = response.response.data.errors
              })
            }
          }
        }
      },
      async otpVerification(){
        if (this.form.contact_number === undefined || this.form.contact_number === null) {
          this.$set(this.errors, 'otp', ['Number field is required.'])
        }else{
          this.$delete(this.errors, 'otp')
          let payload = {
            otp_code : this.verifyOtp ? this.verifyOtp : null,
            contact_number : this.form ? this.form.contact_number ? this.form.contact_number : null : null
          }
          this.loadingOverlay = true
          await this.VERIFY_OTP(payload).then(async data => {
            await this.saveFinalWithVerification()
            setTimeout(() => {
              this.$swal.fire({
                title: data.data.message,
                icon: 'success',
                confirmButtonColor: '#009c25',
                confirmButtonText: 'OK'
              })
              this.loadingOverlay = false
              this.step += 1
            }, 2000);
          }).catch(response => {
            setTimeout(() => {
              this.$swal.fire({
                title: response.response.data.message,
                icon: 'error',
                confirmButtonColor: '#009c25',
                confirmButtonText: 'OK'
              })
              this.loadingOverlay = false
            }, 2000);
          })
        }
      },
      home(){
        this.goTo('/')
      },
      saveFinalWithVerification(){
        let payload = {
          first_name : this.form ? this.form.first_name ? this.form.first_name : null : null,
          last_name : this.form ? this.form.last_name ? this.form.last_name : null : null,
          middle_name : this.form ? this.form.middle_name ? this.form.middle_name : null : null,
          email : this.form ? this.form.email ? this.form.email : null : null,
          password : this.form ? this.form.password ? this.form.password : null : null,
          password_confirmation : this.form ? this.form.confirm_password ? this.form.confirm_password : null : null,
          user_name : this.form ? this.form.user_name ? this.form.user_name : null : null,
          type : 'customer',
          contact_number : this.form ? this.form.contact_number ? this.form.contact_number : null : null,
        }
        this.USERS_REGISTRATION(payload).then(data => {
          console.log(data.data);
        }).catch(response => {
          console.log(response.response)
        })
      }
    },

    mounted () {
    }
  }
</script>