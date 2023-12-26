<template>
  <div mt-3 class="d-flex justify-end rounded-xl">
    <v-btn class="mr-3" outlined large rounded text @click="loginDialog">SIGN UP</v-btn>
    <v-dialog
      v-model="dialog"
      max-width="700"
      overlay-color="black"
      class="rounded-xl"
      scrollable
    >
      <v-card class="rounded-xl" >
        <v-card-title>
          <v-layout wrap column>
            <v-flex>
              <span class="headline">SIGN UP</span>
            </v-flex>
            <!-- <v-flex>
              <span class="caption font-italic">Please ensure that all required fields are filled out before submitting the form. </span>
            </v-flex> -->
          </v-layout>
        </v-card-title>
        <v-card-text>
          <v-stepper
            :value=step
          >
            <v-stepper-header>
              <v-stepper-step step="1">
                Personal Information
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="2">
                Authentication
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="3">
                Completion
              </v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card>
                  <v-layout wrap row px-4 mt-2>
                    <v-flex class="mx-3">
                      <span>First Name:</span>
                      <v-text-field
                        dense
                        outlined
                      />
                    </v-flex>
                    <v-flex class="mx-3">
                      <span>Last Name:</span>
                      <v-text-field
                        dense
                        outlined
                      />
                    </v-flex>
                    <v-flex class="mx-3">
                      <span>Middle Name:</span>
                      <v-text-field
                        dense
                        outlined
                      />
                    </v-flex>
                    <v-flex class="mx-3">
                      <span>Gender:</span>
                      <v-autocomplete
                        dense
                        outlined
                        :items="gender"
                        item-text="name"
                        item-value="value"
                        append-icon=""
                      />
                    </v-flex>
                    <v-flex class="mx-3">
                      <span>Email:</span>
                      <v-text-field
                        dense
                        outlined
                      />
                    </v-flex>
                    <v-flex class="mx-3">
                      <span>Username:</span>
                      <v-text-field
                        dense
                        outlined
                      />
                    </v-flex>
                  </v-layout>
                  <v-layout class="wrap row px-4">
                    <v-flex class="mx-3">
                      <span>Password:</span>
                      <v-text-field
                        dense
                        outlined
                        type="password"
                      />
                    </v-flex>
                    <v-flex class="mx-3">
                      <span>Confirm Password:</span>
                      <v-text-field
                        dense
                        outlined
                        type="password"
                      />
                    </v-flex>
                    <v-flex class="mx-3">
                      <v-radio-group row v-model="type" dense>
                        <span class="mr-3 body-2 d-flex align-center">Sign up as:</span>
                        <v-radio
                          :color="radio_color"
                          value="customer"
                        >
                        <template #label>
                          <span class="body-2">As User</span>
                        </template>
                        </v-radio>
                        <v-radio
                          :color="radio_color"
                          value="driver"
                        >
                          <template #label>
                            <span class="body-2">As Driver</span>
                          </template>
                        </v-radio>
                        <v-radio
                          :color="radio_color"
                          value="business"
                        >
                          <template #label>
                            <span class="body-2">As Business</span>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </v-flex>
                  </v-layout>
                  <v-flex class="d-flex justify-end">
                    <v-btn
                      color="primary"
                      @click=nexStep(1)
                    >
                      Next
                    </v-btn>
                  </v-flex>
                </v-card>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card>
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
                </v-card>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card>
                  <v-layout wrap column align-center>
                    <v-icon color="green" size="100">
                      mdi-check-circle-outline
                    </v-icon>
                    <v-divider></v-divider>
                    <span class="headline font-weight-bold">Application Submited.</span>
                    <v-flex class="pt-4">
                      <v-btn depressed outlined color="red" @click="close">
                        Close
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
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
        this.step = 1
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
        this.step += value
      }
    },

    mounted () {
    }
  }
</script>