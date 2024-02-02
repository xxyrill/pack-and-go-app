<template>
  <v-card flat color="#f0f0f0">
    <v-card-text>
      <v-layout style="min-height: 400px">
        <v-flex lg12 md12 sm12 xs12>
          <v-data-table
            color="primary"
            :headers="headers"
            :items="items"
            hide-default-footer
            class="elevation-0"
            :loading="loading"
            loading-text="Loading... Please wait"
          >
          <template v-slot:item="{ item }">
            <tr>
              <td class="text-center pa-2">
                  <v-card outlined :color="
                    (item.status == 'pending') ? 'orange' 
                    :(item.status == 'confirmed') ? 'yellow' : 'green'" class="px-4"><span style="color=white">{{ item.status | capitalfirst }}</span></v-card>
                  <span class="caption">{{ item.order_number }}</span>
                  <v-flex v-if="item.status == 'confirmed'" class="pa-1">
                    <v-btn small depressed color="purple lighten-2">Reschedule</v-btn>
                  </v-flex>
              </td>
              <td class="text-center">
                <div class="text-center">{{ item.booking_date_time_start | time}} - {{ item.booking_date_time_end | time}}</div>
                <div class="text-center">{{ item.booking_date_time_start | monthyear }}</div>
              </td>
              <td class="text-center pa-2">
                <div>
                  <span class="font-weight-bold ">{{ item.pick_up_location | dotdot}}</span>
                  <v-menu
                    bottom
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <a
                        v-bind="attrs"
                        v-on="on"
                      >
                        See all
                      </a>
                    </template>
                    <v-card class="pa-3">
                      <span class="font-weight-bold text-decoration-underline">{{ item.pick_up_location }}</span>
                    </v-card>
                  </v-menu>
                </div>
                <div>
                  <span class="font-weight-bold ">{{ item.drop_off_location | dotdot}}</span>
                  <v-menu
                    bottom
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <a
                        v-bind="attrs"
                        v-on="on"
                      >
                        See more
                      </a>
                    </template>
                    <v-card class="pa-3">
                      <span class="font-weight-bold text-decoration-underline">{{ item.drop_off_location }}</span>
                    </v-card>
                  </v-menu>
                </div>
              </td>
              <td class="text-center">
                <div class="pa-2">
                  <span :style="!item.driver ? 'color:red' : ''" :class=" item.driver ? 'font-weight-bold' : ''">{{ item.driver ? item.driver.first_name+' '+item.driver.last_name : 'Not Assigned' }}</span>
                </div>
                <div class="pa-2">
                  <v-btn
                    small
                    depressed
                    @click="message(item)"
                    color="primary">
                    Message
                  </v-btn>
                </div>
              </td>
              <td class="text-center">{{ item.vehicle_list_id ? item.vehicle_type.type : '' }}</td>
              <td class="text-center">
                <v-flex class="pa-1">{{ item.price ? item.price : 'Not Set'}}</v-flex>
                <v-flex class="pa-1" v-if="item.status == 'confirmed'">
                  <v-btn small depressed color="primary">Change</v-btn>
                </v-flex>
              </td>
              <td class="text-center">
                <v-flex>
                  <v-btn
                    small
                    depressed
                    color="success"
                    @click="apply(item)">
                    Accept
                  </v-btn>
                  <v-btn
                    small
                    depressed
                    color="info">
                    View
                  </v-btn>
                </v-flex>
              </td>
            </tr>
          </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-flex class="d-flex justify-end">
      <chat-box :chat_room="chat_room" :reciever_id="reciever_id" :chat_owner="chat_room_name"/>
    </v-flex>
    <v-dialog
      v-model="dialogApply"
      width="350"
    >
      <v-card>
        <v-card-text>
          <v-layout column justify-center align-center pa-5>
            <v-flex>
              <span>Please enter the agreed price</span>
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
              <span>Did not recieve the code? <a>Resend</a></span>
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
  </v-card>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import Global from '~/plugins/mixins/global'
import moment from 'moment';
export default {
  mixins: [Global],
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
    dialogApply: false,
    verifyOtp: null,
    price: null,
    errors: {},
    selected_booking: {},
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
    apply(item){
      let payload = {
        contact_number: item.alt_contact_number_one,
        type: 'booking_confirmation',
        order_number: item.order_number,
        delivery_date: moment(item.booking_date_time_start).format('D MMMM YYYY')+' '+moment(item.booking_date_time_start).format('h:mm A')+'-'+moment(item.booking_date_time_end).format('h:mm A'),
        route: item.pick_up_location+' - '+item.drop_off_location,
        type: item.vehicle_type.type,
      }
      this.SET_OTP(payload).then(data => {
        this.dialogApply = true
        this.selected_booking = item
        console.log(this.selected_booking)
      })
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
          contact_number : this.selected_booking ? this.selected_booking.alt_contact_number_one ? this.selected_booking.alt_contact_number_one : null : null
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
      this.dialogApply = false
      this.verifyOtp = null
      this.price = null
    },
    async updateBooking(){
      let payload = {
        id: this.selected_booking.id ? this.selected_booking.id : null,
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