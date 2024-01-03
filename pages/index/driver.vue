<template>
  <v-main>
    <client-only>
    <toolbar/>
      <v-container>
        <v-card class="rounded-l" flat min-height="650">
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
                        <Icon icon="gg:list" color="white" width="25" height="25" />
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
                  <v-flex class="mx-3">
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
                  <v-flex class="mx-3">
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
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="form.expiry_date"
                        scrollable
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
                    <v-layout row wrap mx-3 mt-2>
                      <v-flex mr-1>
                        <v-file-input
                          v-model="form.driver_license_front"
                          outlined
                          dense
                          prepend-icon=""
                          label="License Front"
                          :error-messages="errors ? errors.driver_license_front ? errors.driver_license_front :'':''"
                          persistent-placeholder
                        ></v-file-input>
                      </v-flex>
                      <v-flex ml-1>
                        <v-file-input
                          v-model="form.driver_license_back"
                          dense
                          outlined
                          prepend-icon=""
                          :error-messages="errors ? errors.driver_license_back ? errors.driver_license_back :'':''"
                          label="License Back"
                          persistent-placeholder
                        ></v-file-input>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-flex>
              </v-layout>
              <v-flex class="d-flex justify-center mt-2">
                <v-btn
                  color="primary"
                  @click=nexStep(1)
                >
                  Continue
                </v-btn>
              </v-flex>
            </v-flex>
            <v-flex v-if="step == 2" >
              <v-layout justify-center>
                <v-flex md5>
                  <v-flex class="mx-3">
                    <v-autocomplete
                      v-model="form.vehicle_list_id"
                      :error-messages="errors ? errors.vehicle_list_id ? errors.vehicle_list_id :'':''"
                      dense
                      outlined
                      color="success"
                      persistent-placeholder
                      label="Type"
                    />
                  </v-flex>
                  <v-flex class="mx-3">
                    <v-text-field
                      v-model="form.make"
                      :error-messages="errors ? errors.make ? errors.make :'':''"
                      dense
                      outlined
                      persistent-placeholder
                      color="success"
                      label="Make"
                    />
                  </v-flex>
                  <v-flex class="mx-3">
                    <v-text-field
                      v-model="form.year_model"
                      :error-messages="errors ? errors.year_model ? errors.year_model :'':''"
                      dense
                      color="success"
                      outlined
                      persistent-placeholder
                      label="Year Model"
                    />
                  </v-flex>
                  <v-flex class="mx-3">
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
                  color="primary"
                  @click=nexStep(2)
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
                  ></v-otp-input>
                </v-card>
              </v-layout>
            </v-flex>
            <v-flex v-if="step == 4">
              <v-layout wrap column align-center justify-center>
                <v-card class="pa-11" rounded raised>
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
                      <v-btn outlined color="green">Home</v-btn>
                    </v-flex>
                  </v-flex>
                </v-card>
              </v-layout>
            </v-flex>
          </v-card-text>
        </v-card>
      </v-container>
    </client-only>
  </v-main>
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
      form: {}
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
      loginDialog() {
        this.dialog = true
      },
      sendOtp() {
        if (this.form.contact_number === undefined || this.form.contact_number === null) {
          this.$set(this.errors, 'otp', ['Number field is required.'])
        }else{
          this.$delete(this.errors, 'otp')
          this.send_otp_loading = true
          setTimeout(() => {
            this.send_otp_loading = false
          }, 10000);
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
              this.step += 1
              this.$delete(this.errors, 'password')
              this.$delete(this.errors, 'confirm_password')
            }
          }
        }else if (value == 2){
          let payload = {
            vehicle_list_id : this.form ? this.form.vehicle_list_id ? this.form.vehicle_list_id : null : null,
            make : this.form ? this.form.make ? this.form.make : null : null,
            year_model : this.form ? this.form.year_model ? this.form.year_model : null : null,
            plate_number : this.form ? this.form.plate_number ? this.form.plate_number : null : null,
            helper : this.form ? this.form.helper ? this.form.helper : null : null ,
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
              this.step += 1
              this.$delete(this.errors, 'password')
              this.$delete(this.errors, 'confirm_password')
            }
          }
        }
      }
    },

    mounted () {
    }
  }
</script>