<template>
  <v-flex>
    <v-btn small depressed color="primary" @click="change">Change</v-btn>
    <v-dialog
      v-model="dialogChange"
      width="350"
    >
      <v-card>
        <v-card-text>
          <v-layout column justify-center align-center pa-5>
            <v-flex>
              <span>Please enter the new price</span>
            </v-flex>
            <v-flex>
              <v-text-field 
                outlined 
                dense 
                v-model="price"
                :error-messages="errors ? errors.price ? errors.price :'':''"
              />
            </v-flex>
            <v-flex class="text-center">
              <span>Please confirm the move service by entering the confirmation code provided by the customer.</span>
            </v-flex>
            <v-flex>
              <v-otp-input
                length="6"
                v-model="verifyOtp"
                :error-messages="errors ? errors.verifyOtp ? errors.verifyOtp :'':''"
              />
            </v-flex>
            <v-flex>
              <span>Did not recieve the code? <a @click="sendOtp">Resend</a></span>
            </v-flex>
            <v-flex class="pa-1">
              <v-btn small dark depressed @click="otpVerification">Submit</v-btn>
            </v-flex>
            <v-flex class="pa-1">
              <v-btn small depressed color="grey darken-1" @click="close">Close</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
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
    items: [],
    headers: [
      { text: 'Status', align: 'center', sortable: false, value: 'status' },
      { text: 'Delivery date', align: 'center', sortable: false, value: 'delivery_date' },
      { text: 'Route', align: 'center', sortable: false, value: 'route' },
      { text: 'Driver', align: 'center', sortable: false, value: 'customer' },
      { text: 'Type', align: 'center', sortable: false, value: 'type' },
      { text: 'Price', align: 'center', sortable: false, value: 'price' },
      { text: '', align: 'center', sortable: false, value: 'action' },
    ],
    loading: false,
    chat_room: null,
    reciever_id: null,
    chat_room_name: null,
    dialogChange: false,
    verifyOtp: null,
    price: null,
    errors: {}
  }),
  computed: {
    ...mapGetters('users', ['user'])
  },
  watch: {
  },
  methods: {
    ...mapActions('booking', ['BOOKING_LIST', 'SET_OTP', 'BOOKING_UPDATE']),
    ...mapActions('chats', ['CREATE_CHATROOM']),
    ...mapActions('users', ['VERIFY_OTP']),
    async getList(){
      this.loading = true
      let payload = {
        order_by : "id",
        sort_by : "desc",
        skip : 0,
        take : 5
      }
      await this.BOOKING_LIST(payload).then(data => {
        this.items = data.data.data
        this.loading = false
      }).catch(response => {
        this.loading = false
      })
    },
    async message(item){
      let payload = {
        id : item.id,
        customer_id : item.user_id
      }
      await this.CREATE_CHATROOM(payload).then(data => {
        this.chat_room = data.data.data
        this.reciever_id = item.user_id
        this.chat_room_name = item.customer
      })
    },
    async change(){
      await this.sendOtp()
      this.dialogChange = true
    },
    async sendOtp(){
      let payload = {
        contact_number: this.booking.alt_contact_number_one,
        type: 'booking_confirmation',
        order_number: this.booking.order_number,
        delivery_date: moment(this.booking.booking_date_time_start).format('D MMMM YYYY')+' '+moment(this.booking.booking_date_time_start).format('h:mm A')+'-'+moment(this.booking.booking_date_time_end).format('h:mm A'),
        route: this.booking.pick_up_location+' - '+this.booking.drop_off_location,
        type: this.booking.vehicle_type.type,
      }
      await this.SET_OTP(payload)
    },
    async otpVerification(){
      let payload_validation = {
        price : this.price ? this.price : null,
        verifyOtp : this.verifyOtp ? this.verifyOtp : null
      }
      let validation = this.fieldsValidation(payload_validation)
      if(validation.error == true){
        this.errors = validation.errors
      }else{
        let payload = {
          otp_code : this.verifyOtp ? this.verifyOtp : null,
          contact_number : this.booking ? this.booking.alt_contact_number_one ? this.booking.alt_contact_number_one : null : null
        }
        await this.VERIFY_OTP(payload).then(async data => {
          await this.updateBooking()
          this.close()
          setTimeout(() => {
            this.$swal.fire({
              title: data.data.message,
              icon: 'success',
              confirmButtonColor: '#009c25',
              confirmButtonText: 'OK'
            })
          }, 1000);
        }).catch(response => {
          this.close()
          setTimeout(() => {
            this.$swal.fire({
              title: response.response.data.message,
              icon: 'error',
              confirmButtonColor: '#009c25',
              confirmButtonText: 'OK'
            })
          }, 1000);
        })
      }
    },
    close(){
      this.dialogChange = false
      this.verifyOtp = null
      this.price = null
    },
    async updateBooking(){
      let payload = {
        id: this.booking.id ? this.booking.id : null,
        status: 'confirmed',
        price: this.price ? this.price : null,
        user_driver_id: this.user ? this.user : null
      }
      await this.BOOKING_UPDATE(payload).then(data => {
        this.getList()
      })
    }
  },

  mounted () {
    this.getList()
  }
}
</script>