<template>
  <v-flex>
    <v-btn text color="info" @click="openDialog" small >Change</v-btn>
    <v-dialog
      v-model="dialogUpdateLicense"
      width="500"
    >
      <v-card class="rounded-xl">
        <v-card-text class="pa-3">
          <v-stepper
            v-model="e1"
            vertical
            flat
          >
            <v-stepper-step
              step="1"
              editable
            >
              Edit phone number
            </v-stepper-step>

            <v-stepper-content step="1">
              <v-card class="pa-1" flat shaped>
                <v-card-text class="py-0">
                  <v-layout column>
                    <v-flex>
                      <v-text-field
                        outlined
                        v-model="contact_number"
                        dense
                        label="New phone number"
                        prefix="+63"
                        maxlength="10"
                        persistent-placeholder
                        class="rounded-xl"
                        :error-messages="errors ? errors.contact_number ? errors.contact_number :'':''"
                      />
                    </v-flex>
                  </v-layout>
                </v-card-text>
                <v-card-actions>
                  <v-btn small dark depressed @click="sentOtp">Send</v-btn>
                  <v-btn small depressed color="grey darken-1" @click="close">Cancel</v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>

            <v-stepper-step
              step="2"
              editable
            >
              Authentication
              <small>Your verification code is sent via sms to <small class="font-weight-bold">{{ contact_number ? +'+63'+contact_number : 'N/A' }}</small></small>
            </v-stepper-step>

            <v-stepper-content step="2">
              <v-card class="pa-1" flat shaped>
                <v-card-text class="py-0">
                  <v-layout column justify-center>
                    <v-flex class="text-center">
                      <v-otp-input
                        length="6"
                        v-model="otp_code"
                        :error-messages="errors ? errors.otp_code ? errors.otp_code :'':''"
                      ></v-otp-input>
                    </v-flex>
                    <v-flex class="text-center">
                      <span>Did you not recieve the code?</span><a @click="sentOtp"> Resend</a>
                    </v-flex>
                  </v-layout>
                </v-card-text>
                <v-card-actions>
                  <v-btn small dark depressed @click="authenticate">Submit</v-btn>
                  <v-btn small depressed @click="close" color="grey darken-1">Cancel</v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
          </v-stepper>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-flex>
</template>
<script>
import Vue from 'vue'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import Global from '~/plugins/mixins/global'
import { Http } from '~/plugins/http'
import moment from 'moment';
export default {
  props: {
    type: [String],
    user_driver_id: [Number]
  },
  mixins: [Global],
  data: () => ({
    errors: {},
    dialogUpdateLicense: false,
    contact_number: null,
    otp_code: null,
    e1: 1,
  }),
  computed: {
  },
  watch: {
    'contact_number': {
      handler(){
        if(this.contact_number   !== undefined) {
            const result = this.contact_number 
              .replace(/[^0-9.]/g, "");
            Vue.nextTick(() => this.contact_number   = result);
        }
      }
    }
  },
  methods: {
    ...mapActions('users', ['SEND_CONTACT_NUMBER_UPDATE_OTP', 'USER_UPDATE_CONTACT_NUMBER']),
    ...mapMutations('users', ['REFRESH_DATA']),
    async authenticate(){
      let payload = {
        otp_code : this.otp_code ? this.otp_code : null
      }
      let validation = this.fieldsValidation(payload)
      if(validation.error == true){
        this.errors = validation.errors
      }else{
        let payload = {
          contact_number : this.contact_number,
          otp_code : this.otp_code
        }
        await this.USER_UPDATE_CONTACT_NUMBER(payload).then(data => {
          this.$swal.fire({
            title: `Contact number has been renewed.`,
            text: '', 
            icon: 'success',
            confirmButtonColor: '#009c25',
            confirmButtonText: 'OK'
          })
          this.REFRESH_DATA(true)
          this.close
        }).catch(response => {
          this.$swal.fire({
            title: `Invalid OTP code`,
            text: 'Please try again.', 
            icon: 'error',
            confirmButtonColor: '#009c25',
            confirmButtonText: 'OK'
          })
        })
      }
    },
    async sentOtp(){
      let payload = {
        contact_number : this.contact_number ? this.contact_number : null,
      }
      let validation = this.fieldsValidation(payload)
      if(validation.error == true){
        this.errors = validation.errors
      }else{
        await this.SEND_CONTACT_NUMBER_UPDATE_OTP(payload).then(data => {
          this.e1 = 2
        }).catch(response => {
          this.errors = response.response.data.errors
        })
      }
    },
    openDialog(){
      this.dialogUpdateLicense = true
    },
    close(){
      this.errors = {}
      this.dialogUpdateLicense = false
      this.email = null
      this.confirm_email = null
      this.otp_code = null
      this.e1 = 1
    },
  },

  mounted () {
  }
}
</script>