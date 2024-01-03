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
                  <v-flex class="mx-3" >
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
                  <v-flex class="mx-3">
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
                  <v-flex class="mx-3">
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
            <v-flex v-if="step == 2" >
              <v-layout justify-center>
                <v-flex md5>
                  <v-flex class="mx-3 mb-2">
                    <span>Business Address:</span>
                  </v-flex>
                  <v-flex class="mx-3">
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
                  <v-flex class="mx-3 d-flex align-end">
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
                  <v-flex class="mx-3">
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
                  <v-flex class="mx-3">
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
                  <v-flex class="mx-3">
                    <v-text-field
                      v-model="form.business_tourism_number"
                      :error-messages="errors ? errors.business_tourism_number ? errors.business_tourism_number :'':''"
                      dense
                      color="success"
                      outlined
                      persistent-placeholder
                      label="City Tourism Number (optional)"
                    />
                  </v-flex>
                  <v-flex class="mx-3">
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
                  <v-flex class="mx-3">
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
      step: 2,
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
              this.step += 1
              this.$delete(this.errors, 'password')
              this.$delete(this.errors, 'confirm_password')
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
      }
    },

    mounted () {
    }
  }
</script>