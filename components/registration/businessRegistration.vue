<template>
  <v-layout class="justify-center pa-3 landing-order-img" fill-height>
    <v-flex lg5 md5 sm12 xs12>
      <v-card dark lg6 md6 sm12 xs12 class="rounded-xl" elevation="15" style="opacity: 90%;">
        <v-card-title class="d-flex justify-center">
          <v-flex>
            <v-layout row mt-2 pa-6>
              <v-avatar
                :color="(step > 1) ? 'success':'primary'"
                size="50"
                class="mx-2">
                    <span v-if="step > 1">
                      <Icon icon="ph:check-fat" color="white" width="25" height="25" />
                    </span>
                    <span v-else>
                      <Icon icon="akar-icons:person" color="white" width="25" height="25" />
                    </span>
              </v-avatar>
              <v-flex class="d-flex align-center mx-2">
                <v-divider></v-divider>
              </v-flex>
              <v-avatar
                :color="(step > 2) ? 'success':'primary'"
                size="50"
                class="mx-2">
                    <span v-if="step > 2">
                      <Icon icon="ph:check-fat" color="white" width="25" height="25" />
                    </span>  
                    <span v-else>
                      <Icon icon="gg:list" color="white" width="25" height="25" />
                    </span>
              </v-avatar>
              <v-flex class="d-flex align-center mx-2">
                <v-divider></v-divider>
              </v-flex>
              <v-avatar
                :color="(step > 3) ? 'success':'primary'"
                size="50"
                class="mx-2">
                    <span v-if="step > 3">
                      <Icon icon="ph:check-fat" color="white" width="25" height="25" />
                    </span>  
                    <span v-else>
                      <Icon icon="gravity-ui:shield-check" color="white" width="30" height="30" />
                    </span>
              </v-avatar>
              <v-flex class="d-flex align-center mx-2">
                <v-divider ></v-divider>
              </v-flex>
              <v-avatar
                :color="(step > 4) ? 'success':'primary'"
                size="50"
                class="mx-2">
                    <span v-if="step > 4">
                      <Icon icon="ph:check-fat" color="white" width="25" height="25" />
                    </span>  
                    <span v-else>
                      <Icon icon="lucide:check-circle" color="white" width="30" height="30" />
                    </span>
              </v-avatar>
            </v-layout>
          </v-flex>
        </v-card-title>
        <v-card-text>
          <v-flex v-if="step == 1">
            <v-layout justify-center>
              <v-flex lg10 md10 sm10 xs10>
                <v-flex class="pb-4 px-3">
                  <span class="subtitle-2">BUSINESS INFO: </span>
                </v-flex>
                <v-flex class="px-3" >
                  <v-text-field
                    v-model="form.business_name"
                    dense
                    outlined
                    label="Business Name"
                    persistent-placeholder
                    :error-messages="errors ? errors.business_name ? errors.business_name :'':''"
                    color="success"
                  />
                </v-flex>
                <v-flex class="px-3">
                  <v-text-field
                  v-model="form.first_name"
                    dense
                    outlined
                    persistent-placeholder
                    label="Owner First Name"
                    :error-messages="errors ? errors.first_name ? errors.first_name :'':''"
                    color="success"
                  />
                </v-flex>
                <v-flex class="px-3">
                  <v-text-field
                    v-model="form.last_name"
                    dense
                    outlined
                    persistent-placeholder
                    label="Owner Last Name"
                    :error-messages="errors ? errors.last_name ? errors.last_name :'':''"
                    color="success"
                  />
                </v-flex>
                <v-flex class="px-3">
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
                <v-flex class="px-3">
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
                <v-flex class="px-3">
                  <v-layout row wrap pt-2 px-2>
                    <v-flex lg6 md6 sm12 xs12 class="pa-1">
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
                    <v-flex lg6 md6 sm12 xs12 class="pa-1">
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
                  </v-layout>
                </v-flex>
              </v-flex>
            </v-layout>
            <v-flex class="d-flex justify-center">
              <v-btn
                color="primary"
                @click=nexStep(step)
              >
                Continue
              </v-btn>
            </v-flex>
          </v-flex>
          <v-flex v-if="step == 2" >
            <v-layout justify-center>
              <v-flex  lg10 md10 sm10 xs10>
                <v-flex class="px-3 pb-4">
                  <span class="subtitle-2">Business Address:</span>
                </v-flex>
                <v-flex class="px-3">
                  <v-text-field
                    v-model="form.business_address"
                    :error-messages="errors ? errors.business_address ? errors.business_address :'':''"
                    dense
                    color="success"
                    outlined
                    persistent-placeholder
                    label="Stree Name, Building, House No."
                  />
                </v-flex>
                <v-flex class="px-3 d-flex align-end">
                  <v-text-field
                    v-model="form.business_complete_address"
                    :error-messages="errors ? errors.business_complete_address ? errors.business_complete_address :'':''"
                    dense
                    color="success"
                    outlined
                    persistent-placeholder
                    label="Barangay, City, Province, Postal Code "
                  />
                </v-flex>
                <v-flex class="px-3 pb-4">
                  <span class="subtitle-2">BUSINESS ADDRESS:</span>
                </v-flex>
                <v-flex class="px-3">
                  <v-text-field
                    v-model="form.business_permit_number"
                    :error-messages="errors ? errors.business_permit_number ? errors.business_permit_number :'':''"
                    dense
                    outlined
                    color="success"
                    persistent-placeholder
                    label="Business Permit Number (optional)"
                  />
                </v-flex>
                <v-flex class="px-3">
                  <v-file-input
                    v-model="form.business_permit"
                    dense
                    outlined
                    prepend-icon=""
                    prepend-inner-icon="mdi-attachment"
                    :error-messages="errors ? errors.business_permit ? errors.business_permit :'':''"
                    label="Business Permit File (optional)"
                    placeholder="Please select a file"
                    persistent-placeholder
                  >
                    <template v-slot:selection="{ text }">
                      <v-chip
                        small
                        label
                        color="primary"
                      >
                        {{ text }}
                      </v-chip>
                    </template>
                  </v-file-input>
                </v-flex>
                <v-flex class="px-3">
                  <v-text-field
                    v-model="form.business_dti_number"
                    :error-messages="errors ? errors.business_dti_number ? errors.business_dti_number :'':''"
                    dense
                    outlined
                    persistent-placeholder
                    color="success"
                    label="DTI Registration Number (optional)"
                  />
                </v-flex>
                <v-flex class="px-3">
                  <v-file-input
                    v-model="form.dti"
                    dense
                    outlined
                    prepend-icon=""
                    prepend-inner-icon="mdi-attachment"
                    :error-messages="errors ? errors.dti ? errors.dti :'':''"
                    label="DTI File (optional)"
                    placeholder="Please select a file"
                    persistent-placeholder
                  >
                    <template v-slot:selection="{ text }">
                      <v-chip
                        small
                        label
                        color="primary"
                      >
                        {{ text }}
                      </v-chip>
                    </template>
                  </v-file-input>
                </v-flex>
                <v-flex class="px-3 pb-4">
                  <span class="subtitle-2">CONTACT PERSON:</span>
                </v-flex>
                <v-flex class="px-3">
                  <v-text-field
                    v-model="form.business_contact_person"
                    :error-messages="errors ? errors.business_contact_person ? errors.business_contact_person :'':''"
                    dense
                    color="success"
                    outlined
                    persistent-placeholder
                    label="Contact Person Name"
                  />
                </v-flex>
                <v-flex class="px-3">
                  <v-text-field
                    v-model="form.business_contact_person_number"
                    :error-messages="errors ? errors.business_contact_person_number ? errors.business_contact_person_number :'':''"
                    dense
                    color="success"
                    outlined
                    persistent-placeholder
                    label="Contact Person Phone"
                  />
                </v-flex>
              </v-flex>
            </v-layout>
            <v-flex class="d-flex justify-center">
              <v-btn
                outlined
                color="primary"
                @click=previous
                class="mx-1"
              >
                Back
              </v-btn>
              <v-btn
                color="primary"
                @click=nexStep(step)
              >
                Continue
              </v-btn>
            </v-flex>
          </v-flex>
          <v-flex v-if="step == 3">
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
                    maxlength="10"
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
              <v-flex class="d-flex justify-center pt-5">
                <v-btn
                  outlined
                  color="primary"
                  @click=previous(step)
                  class="mx-1"
                >
                  Back
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex v-if="step == 4">
            <v-layout justify-center pa-5>
              <v-card class="pa-11 rounded-xxl" light elevation="15">
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
    </v-flex>
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
  </v-layout>
</template>
<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import axios from 'axios'
  import Global from '~/plugins/mixins/global'
  import { Http } from '~/plugins/http'

  export default {
    props: {
      dataAbstract: [Object, Array]
    },
    mixins: [
      Global,
    ],
    data: () => ({
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
      previous(){
        this.step -= 1
      },
      nexStep(value){
        if(value == 1){
          let payload = {
            business_name : this.form ? this.form.business_name ? this.form.business_name : null : null,
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
        }else if(value == 2){
          let payload = {
            business_address : this.form ? this.form.business_address ? this.form.business_address : null : null,
            business_complete_address : this.form ? this.form.business_complete_address ? this.form.business_complete_address : null : null,
            business_contact_person : this.form ? this.form.business_contact_person ? this.form.business_contact_person : null : null,
            business_contact_person_number : this.form ? this.form.business_contact_person_number ? this.form.business_contact_person_number : null : null,
          }
          let validation = this.fieldsValidation(payload)
          if(validation.error == true){
            this.errors = validation.errors
          }else{
            this.step += 1
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
      async saveFinalWithVerification(){
        let payload = {
          first_name : this.form ? this.form.first_name ? this.form.first_name : null : null,
          last_name : this.form ? this.form.last_name ? this.form.last_name : null : null,
          middle_name : this.form ? this.form.middle_name ? this.form.middle_name : null : null,
          email : this.form ? this.form.email ? this.form.email : null : null,
          password : this.form ? this.form.password ? this.form.password : null : null,
          password_confirmation : this.form ? this.form.confirm_password ? this.form.confirm_password : null : null,
          user_name : this.form ? this.form.user_name ? this.form.user_name : null : null,
          type : 'business',
          contact_number : this.form ? this.form.contact_number ? this.form.contact_number : null : null,
          business_name : this.form ? this.form.business_name ? this.form.business_name : null : null,
          business_address : this.form ? this.form.business_address ? this.form.business_address : null : null,
          business_complete_address : this.form ? this.form.business_complete_address ? this.form.business_complete_address : null : null,
          business_contact_person : this.form ? this.form.business_contact_person ? this.form.business_contact_person : null : null,
          business_contact_person_number : this.form ? this.form.business_contact_person_number ? this.form.business_contact_person_number : null : null,
          business_permit_number : this.form ? this.form.business_permit_number ? this.form.business_permit_number : null : null,
          business_dti_number : this.form ? this.form.business_dti_number ? this.form.business_dti_number : null : null,
          business_tourism_number : this.form ? this.form.business_tourism_number ? this.form.business_tourism_number : null : null,
        }
        await this.USERS_REGISTRATION(payload).then(async data => {
          if(this.form.business_permit){
            await this.savePermits(data.data.id.id, 'business_permit', this.form.business_permit)
          }
          if(this.form.dti){
            await this.savePermits(data.data.id.id, 'dti', this.form.dti)
          }
        }).catch(response => {
          this.$swal.fire({
            title: `Something went wrong.`,
            text: 'Please try again.', 
            icon: 'error',
            confirmButtonColor: '#009c25',
            confirmButtonText: 'OK'
          })
        })
      },
      async savePermits(id, type, file){
        let fileData = new FormData()
        fileData.append("file", file);
        fileData.append("user_business_details_id", id);
        fileData.append("type", type);
        await Http.post(`${process.env.API_URL}/api/user/registration/ids`,
          fileData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'X-Requested-With': 'XMLHttpRequest'
            },
          }
        ).catch(() => {
          this.$swal.fire({
            title: `Something went wrong.`,
            text: 'Please try again.', 
            icon: 'error',
            confirmButtonColor: '#009c25',
            confirmButtonText: 'OK'
          })
        })
      },
    },

    mounted () {
    }
  }
</script>