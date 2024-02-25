<template>
  <v-flex class="pa-1">
    <v-btn
      small
      depressed
      color="success"
      block
      @click="view"
    >
      Price
    </v-btn>
    <v-dialog
      v-model="dialogView"
      width="400"
    >
      <v-card>
        <v-card-text>
          <v-layout pa-3 column>
            <v-flex class="pa-1 rounded-xl text-center" style="background-color: #E0E0E0;">
              <span class="font-weight-black subtitle-1 "> Pricing</span>
            </v-flex>
            <v-flex class="text-center">
              <span class="font-weight-italic caption">Please provide the OPT number sent to you to verify the booking amount. Your cooperation is greatly appreciated.</span>
            </v-flex>
            <v-flex class="pa-1">
              <v-flex class="d-flex justify-center">
                <v-card outlined width="300px" class="pa-3 mt-1">
                  <span class="d-flex justify-center">Enter your OTP key here.</span>
                  <v-otp-input
                    length="6"
                    :disabled="booking.booking_request_price ? false : true"
                    v-model="verifyOtp"
                    :error-messages="errors ? errors.verifyOtp ? errors.verifyOtp :'':''"
                  ></v-otp-input>
                </v-card>
              </v-flex>
            </v-flex>
            <v-flex mt-3>
              <v-layout column>
                <span class="title">Details: </span>
                <span>Appointment Handler: <span class="font-weight-bold">{{ booking ? 
                                              booking.booking_request_price ? 
                                              booking.booking_request_price.driver ? 
                                              (booking.booking_request_price.driver.first_name && booking.booking_request_price.driver.last_name) ?
                                              booking.booking_request_price.driver.first_name+' '+booking.booking_request_price.driver.last_name
                                              :'N/A'
                                              :'N/A'
                                              :'N/A'
                                              :'N/A'}}
                                            </span>
                </span>
                <span>Price: <span class="font-weight-bold">{{ booking ? booking.booking_request_price ? booking.booking_request_price.price ? '₱'+booking.booking_request_price.price : 'N/A' : 'N/A' : 'N/A'}}</span></span>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider/>
        <v-card-actions>
          <v-spacer/>
            <v-btn :disabled="booking.booking_request_price ? false : true" depressed color="success" small @click="verifyOtpAccept">Accept</v-btn>
            <v-btn depressed color="black" style="color: white;" small @click="close">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import Global from '~/plugins/mixins/global'
import moment from 'moment';
export default {
  mixins: [Global],
  props: {
    booking: [Object]
  },
  data: () => ({
    dialogView: false,
    errors: {},
    verifyOtp: null
  }),
  computed: {
  },
  watch: {
  },
  methods: {
    ...mapMutations('booking', ['SET_REFRESH']),
    ...mapActions('booking', ['BOOKING_UPDATE']),
    ...mapActions('users',['VERIFY_OTP']),
    close(){
      this.dialogView = false
      this.errors = {}
      this.verifyOtp = null
    },
    view(){
      this.dialogView = true
    },
    async verifyOtpAccept(){
      if(this.verifyOtp){
        this.errors = {}
        let payload = {
          otp_code : this.verifyOtp,
          contact_number : this.booking ? this.booking.alt_contact_number_one ? this.booking.alt_contact_number_one : null : null,
        }
        await this.VERIFY_OTP(payload).then(async data => {
          await this.updateBooking()
        }).catch(response => {
          this.$set(this.errors, 'verifyOtp', [response.response.data.message])  
          let Toast = this.$swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = this.$swal.stopTimer;
              toast.onmouseleave = this.$swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: response.response.data.message
          });
        })
      }else{
        this.$set(this.errors, 'verifyOtp', ['This field is required.'])
      }
    },
    async updateBooking(){
      let payload = {
        id: this.booking.id ? this.booking.id : null,
        status: 'confirmed',
        price: this.booking ? this.booking.booking_request_price ? this.booking.booking_request_price.price ? this.booking.booking_request_price.price : null : null : null,
        user_driver_id: this.booking ? this.booking.booking_request_price ? this.booking.booking_request_price.service_user_id ? this.booking.booking_request_price.service_user_id : null : null : null
      }
      await this.BOOKING_UPDATE(payload).then(data => {
        let Toast = this.$swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = this.$swal.stopTimer;
            toast.onmouseleave = this.$swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: 'Booking accepted.'
        });
        this.SET_REFRESH(true)
        this.close()
      }).catch(response => {
        this.$swal.fire({
          title: `Something went wrong!`,
          text: '',
          icon: 'error',
          confirmButtonColor: '#009c25',
          confirmButtonText: 'OK'
        })
      })
    }
  },

  mounted () {
  }
}
</script>