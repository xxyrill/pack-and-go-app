<template>
  <v-card flat color="#f0f0f0">
    <v-card-text>
      <v-layout column style="min-height: 400px">
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
                    (item.status == 'pending') ? '#FFA726' 
                    :(item.status == 'confirmed') ? '#FFEE58'
                    :(item.status == 'cancelled') ? '#D32F2F'
                    :(item.status == 'completed') ? '#43A047'
                    :(item.status == 'reschedule') ? '#7E57C2' : 'gray'" class="px-4"><span style="color=white" class="font-weight-bold">{{ item.status | capitalfirst }}</span></v-card>
                  <span class="caption text-decoration-underline">#{{ item.order_number }}</span>
              </td>
              <td class="text-center">
                <div class="text-center">{{ item.booking_date_time_start | time}} - {{ item.booking_date_time_end | time}}</div>
                <div class="text-center" v-for="(data, index) in item.dates" :key="index"><span class="caption font-weight-bold">{{ data.date ? data.date  : '' | monthyear }}</span></div>
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
                        See all
                      </a>
                    </template>
                    <v-card class="pa-3">
                      <span class="font-weight-bold text-decoration-underline">{{ item.drop_off_location }}</span>
                    </v-card>
                  </v-menu>
                </div>
              </td>
              <td class="text-center">
                <div class="pa-2" v-if="item.driver">
                  <span v-if="item.driver.type == 'business'" :style="!item.driver ? 'color:red' : ''" :class=" item.driver ? 'font-weight-bold' : ''">
                    {{ item.driver ? item.driver.user_business ? item.driver.user_business.business_name ? item.driver.user_business.business_name : 'Not Assigned': 'Not Assigned': 'Not Assigned' }}
                  </span>
                  <span v-else-if="item.driver.type == 'driver' || item.driver.type == 'customer'" :style="!item.driver ? 'color:red' : ''" :class=" item.driver ? 'font-weight-bold' : ''">
                    {{ item.driver ? item.driver.first_name+' '+item.driver.last_name : 'Not Assigned' }}
                  </span>
                </div>
                <div v-else class="pa-2">
                  <span style="color: #F44336;">
                    Not Assigned
                  </span>
                </div>
              </td>
              <td class="text-center">{{ item.vehicle_list_id ? item.vehicle_type.type : '' }}</td>
              <td class="text-center">
                <v-flex class="pa-1">
                  <span v-if="item.price">{{ item.price | decimalcomma}}</span>
                  <span v-else style="color:#F44336">Not Set</span>
                </v-flex>
              </td>
              <td class="text-center px-0">
                <v-layout column>
                    <customer-records-view :booking="item"/>
                    <customer-records-price :booking="item"/>
                    <customer-records-rate :booking="item"/>
                    <customer-records-cancel :booking="item"/>
                </v-layout>
              </td>
            </tr>
          </template>
          </v-data-table>
        </v-flex>
        <v-flex>
          <v-pagination
            v-model="page"
            :length="pageCount"
            :total-visible="5"
            @input="updatePage"
            prev-icon="mdi-arrow-left-bold-outline"
            next-icon="mdi-arrow-right-bold-outline"
            circle
          ></v-pagination>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-flex class="d-flex justify-end">
    </v-flex>
    <v-dialog
      v-model="dialogApply"
      width="350"
    >
      <v-card class="rounded-xl">
        <v-card-text class="pa-0">
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
              <span class="font-italic caption">Note: The price you've enter will notify the customer and he/she will approved it.</span>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-flex class="text-center">
            <v-btn small dark depressed @click="sendOtp">Send</v-btn>
            <v-btn small depressed color="grey darken-1" @click="close">Close</v-btn>
          </v-flex>
        </v-card-actions>
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
    page: 1,
    form: {skip: 0, take: 5 },
    count: 0,
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
    ...mapGetters('users', ['user']),
    ...mapGetters('booking', ['refresh', 'filters']),
    pageCount () {
      if (this.form.take == null ||
                this.count == null
      ) return 0

      return Math.ceil(this.count / this.form.take)
    }
  },
  watch: {
    refresh: {
      handler() {
        if(this.refresh == true){
          this.getList()
        }
      }, deep: true
    },
    filters: {
      handler() {
        this.getList()
      }, deep: true
    }
  },
  methods: {
    ...mapMutations('booking',['SET_REFRESH']),
    ...mapActions('booking', ['BOOKING_LIST', 'SET_OTP', 'BOOKING_UPDATE']),
    ...mapActions('chats', ['CREATE_CHATROOM']),
    ...mapActions('users', ['VERIFY_OTP']),
    async getList(){
      this.loading = true
      let payload = {
        order_by : "id",
        sort_by : "desc",
        ...this.form,
        ...this.filters
      }
      await this.BOOKING_LIST(payload).then(data => {
        this.items = data.data.data
        this.count = data.data.details.total
        this.loading = false
        this.SET_REFRESH(false)
      }).catch(response => {
        this.loading = false
        this.SET_REFRESH(false)
      })
    },
    updatePage (pageIndex) {
      this.page = pageIndex
      this.form.skip = pageIndex === 1 ? 0 : (pageIndex - 1) * 5
      this.getList()
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
    apply(){
      this.dialogApply = true
    },
    sendOtp(item){
      let payload = {
        contact_number: item.alt_contact_number_one,
        type: 'booking_confirmation',
        order_number: item.order_number,
        delivery_date: moment(item.booking_date_time_start).format('D MMMM YYYY')+' '+moment(item.booking_date_time_start).format('h:mm A')+'-'+moment(item.booking_date_time_end).format('h:mm A'),
        route: item.pick_up_location+' - '+item.drop_off_location,
        type: item.vehicle_type.type,
      }
      this.SET_OTP(payload).then(data => {
        this.selected_booking = item
      })
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