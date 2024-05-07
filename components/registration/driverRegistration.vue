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
                  <span class="subtitle-2">PERSONAL INFO: </span>
                </v-flex>
                <v-flex class="px-3">
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
                <v-flex class="px-3">
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
                <v-flex class="pb-4 px-3">
                  <span class="subtitle-2">LICENSE INFO: </span>
                </v-flex>
                <v-flex class="px-3">
                  <v-text-field
                    v-model="form.driver_license_number"
                    dense
                    outlined
                    persistent-placeholder
                    label="Drivers License Number"
                    color="success"
                    :error-messages="errors ? errors.driver_license_number ? errors.driver_license_number :'':''"
                  />
                </v-flex>
                <v-flex class="px-3">
                  <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="form.expiry_date"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.expiry_date"
                        label="Drivers License Expiry"
                        readonly
                        outlined
                        persistent-placeholder
                        dense
                        :error-messages="errors ? errors.expiry_date ? errors.expiry_date :'':''"
                        v-bind="attrs"
                        color="success"
                        v-on="on"
                        placeholder="YYYY-MM-DD"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.expiry_date"
                      scrollable
                      :min="dateNow"
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="modal = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog.save(form.expiry_date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>
                <v-flex>
                  <v-layout row wrap pt-2 px-5>
                    <v-flex lg6 md6 sm12 xs12 class="pa-1">
                      <v-file-input
                        v-model="form.driver_license_front"
                        outlined
                        dense
                        prepend-icon=""
                        prepend-inner-icon="mdi-camera"
                        label="License Front"
                        :error-messages="errors ? errors.driver_license_front ? errors.driver_license_front :'':''"
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
                    <v-flex lg6 md6 sm12 xs12 class="pa-1">
                      <v-file-input
                        v-model="form.driver_license_back"
                        dense
                        outlined
                        prepend-icon=""
                        prepend-inner-icon="mdi-camera"
                        :error-messages="errors ? errors.driver_license_back ? errors.driver_license_back :'':''"
                        label="License Back"
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
                  </v-layout>
                </v-flex>
              </v-flex>
            </v-layout>
            <v-flex class="d-flex justify-center mt-2">
              <v-btn
                color="primary"
                @click=nexStep(step)
              >
                Continue
              </v-btn>
            </v-flex>
          </v-flex>
          <v-flex v-if="step == 2">
            <v-layout justify-center>
              <v-flex lg10 md10 sm10 xs10>
                <v-flex class="pb-4 px-3">
                  <span class="subtitle-2">VEHICLE INFO: </span>
                </v-flex>
                <v-flex class="px-3">
                  <v-autocomplete
                    v-model="form.vehicle_list_id"
                    :error-messages="errors ? errors.vehicle_list_id ? errors.vehicle_list_id :'':''"
                    dense
                    outlined
                    color="success"
                    :items="vehicleList"
                    item-text="type"
                    item-value="id"
                    persistent-placeholder
                    label="Type"
                  />
                </v-flex>
                <v-flex class="px-3">
                  <v-text-field
                    v-model="form.make"
                    :error-messages="errors ? errors.make ? errors.make :'':''"
                    dense
                    outlined
                    persistent-placeholder
                    color="success"
                    label="Make (optional when type is Jeepney Standard or Jeepney Extended)"
                  />
                </v-flex>
                <v-flex class="px-3">
                  <v-text-field
                    v-model="form.year_model"
                    :error-messages="errors ? errors.year_model ? errors.year_model :'':''"
                    dense
                    color="success"
                    outlined
                    persistent-placeholder
                    label="Year Model (optional when type is Jeepney Standard or Jeepney Extended)"
                  />
                </v-flex>
                <v-flex class="px-3">
                  <v-text-field
                    v-model="form.plate_number"
                    :error-messages="errors ? errors.plate_number ? errors.plate_number :'':''"
                    dense
                    color="success"
                    outlined
                    persistent-placeholder
                    label="Plate Number"
                  />
                </v-flex>
                <v-flex class="mx-3 d-flex justify-center">
                  <v-checkbox
                    v-model="form.helper"
                    dense
                    label="Do you have a helper?"
                  ></v-checkbox>
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
                class="mx-1"
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
                  @click=previous
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
      loadingOverlay: false,
      vehicleList: [],
      dateNow: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000).toISOString().substr(0, 10),
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
      ...mapActions('vehicle', ['VEHICLE_LIST']),
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
            first_name : this.form ? this.form.first_name ? this.form.first_name : null : null,
            last_name : this.form ? this.form.last_name ? this.form.last_name : null : null,
            user_name : this.form ? this.form.user_name ? this.form.user_name : null : null,
            email : this.form ? this.form.email ? this.form.email : null : null,
            password : this.form ? this.form.password ? this.form.password : null : null ,
            confirm_password : this.form.confirm_password ? this.form.confirm_password ? this.form.confirm_password : nul : null,
            driver_license_number : this.form.driver_license_number ? this.form.driver_license_number ? this.form.driver_license_number : nul : null,
            expiry_date : this.form.expiry_date ? this.form.expiry_date ? this.form.expiry_date : nul : null,
            driver_license_front : this.form.driver_license_front ? this.form.driver_license_front ? this.form.driver_license_front : nul : null,
            driver_license_back : this.form.driver_license_back ? this.form.driver_license_back ? this.form.driver_license_back : nul : null,
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
        }else if (value == 2){
          let payload = {
            vehicle_list_id : this.form ? this.form.vehicle_list_id ? this.form.vehicle_list_id : null : null,
            plate_number : this.form ? this.form.plate_number ? this.form.plate_number : null : null,
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
              if(this.form.vehicle_list_id === 2 || this.form.vehicle_list_id === 3 ){
                this.step += 1
              }else{
                let validation_extension = {
                  make : this.form ? this.form.make ? this.form.make : null : null,
                  year_model : this.form ? this.form.year_model ? this.form.year_model : null : null, 
                }
                let validate_extention = this.fieldsValidation(validation_extension)
                if(validate_extention.error == true){
                  this.errors = validate_extention.errors
                }else{
                  this.errors = {}
                  this.step += 1
                }
              }
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
      async saveFinalWithVerification(){
        let payload = {
          first_name : this.form ? this.form.first_name ? this.form.first_name : null : null,
          last_name : this.form ? this.form.last_name ? this.form.last_name : null : null,
          middle_name : this.form ? this.form.middle_name ? this.form.middle_name : null : null,
          email : this.form ? this.form.email ? this.form.email : null : null,
          password : this.form ? this.form.password ? this.form.password : null : null,
          password_confirmation : this.form ? this.form.confirm_password ? this.form.confirm_password : null : null,
          user_name : this.form ? this.form.user_name ? this.form.user_name : null : null,
          type : 'driver',
          contact_number : this.form ? this.form.contact_number ? this.form.contact_number : null : null,

          vehicle_list_id : this.form ? this.form.vehicle_list_id ? this.form.vehicle_list_id : null : null,
          driver_license_number : this.form ? this.form.driver_license_number ? this.form.driver_license_number : null : null,
          make : this.form ? this.form.make ? this.form.make : null : null,
          year_model : this.form ? this.form.year_model ? this.form.year_model : null : null,
          plate_number : this.form ? this.form.plate_number ? this.form.plate_number : null : null,
          helper : this.form ? this.form.helper ? this.form.helper : false : false,
        }
        await this.USERS_REGISTRATION(payload).then(async data => {
          await this.saveLicense(data.data.id.id, 'front', this.form.driver_license_front)
          await this.saveLicense(data.data.id.id, 'back', this.form.driver_license_back)
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
      async saveLicense(id, type, file){
        let fileData = new FormData()
        fileData.append("file", file);
        fileData.append("user_driver_details_id", id);
        fileData.append("type", type);
        await Http.post(`${process.env.API_URL}/api/user/registration/save-license-file`,
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
      async getVehicleList(){
        let payload = {
          order_by : 'type',
          sort_by : 'asc'
        }
        await this.VEHICLE_LIST(payload).then(data => {
          this.vehicleList = data.data.data
        })
      }
    },

    mounted () {
      this.getVehicleList()
    }
  }
</script>