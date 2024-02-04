<template>
  <v-flex>
    <v-btn
      small
      depressed
      color="info"
      @click="view"
    >
      View
    </v-btn>
    <v-dialog
      v-model="dialogView"
      width="600"
    >
      <v-card>
        <v-card-title>
          <v-menu
            offset-x
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                icon
                small
              >
                <Icon icon="iconoir:nav-arrow-down" width="25" height="25"/>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-title>TAG COMPLETE</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>TAG CANCELLED</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-title>
        <v-divider/>
        <v-card-text>
          <v-layout pa-3 column>
            <v-flex class="pa-1 rounded-xl text-center" style="background-color: #E0E0E0;">
              <span class="font-weight-black subtitle-1 "> Booking Details</span>
            </v-flex>
            <v-flex class="pa-1">
              <v-layout column>
                <span class="pa-1">Vehicle Type: <span class="font-weight-bold">{{ booking ? booking.vehicle_type ? booking.vehicle_type.type ? booking.vehicle_type.type : ''  : '' : '' }}</span></span>
                <span class="pa-1">Date & Time: <span class="font-weight-bold">{{ booking.booking_date_time_start | monthyear }} {{ booking.booking_date_time_start | time}} - {{ booking.booking_date_time_end | time}}</span></span>
                <span class="pa-1">Pick-up: <span class="font-weight-bold">{{ booking ? booking.pick_up_location ? booking.pick_up_location : '' : ''}}</span></span>
                <span class="pa-1">House Information: <span class="font-weight-bold">{{ booking ? booking.pickup_house_information ? booking.pickup_house_information : '' : ''}}</span></span>
                <span class="pa-1">Helper: <span class="font-weight-bold">{{ booking ? (booking.need_helper == true) ? 'YES' : 'NO' : ''}}</span></span>
                <span class="pa-1" v-if="booking.need_helper == true">Helper use elivator: <span class="font-weight-bold">{{ booking ? (booking.pickup_helper_elivator == true) ? 'YES' : 'NO' : ''}}</span></span>
                <span class="pa-1" v-if="booking.need_helper == true">Helper use stairs: <span class="font-weight-bold">{{ booking ? (booking.pickup_helper_stairs == true) ? 'YES' : 'NO' : ''}}</span></span>
                <span class="pa-1">Drop-off: <span class="font-weight-bold">{{ booking ? booking.drop_off_location ? booking.drop_off_location : '' : ''}}</span></span>
              </v-layout>
              <v-card outlined class="pa-1">
                Note: {{ booking ? booking.pickup_adition_remarks ? booking.pickup_adition_remarks : '' : '' }}
              </v-card>
            </v-flex>
            <v-flex class="pa-1 rounded-xl text-center" style="background-color: #E0E0E0;">
              <span class="font-weight-black subtitle-1 "> Price</span>
            </v-flex>
            <v-flex class="pa-1">
              <v-layout column>
                <span class="pa-1">Quoted Price: <span class="font-weight-bold" v-if="booking.price">₱{{ booking ? booking.price ? booking.price : '' : '' }}</span></span>
              </v-layout>
            </v-flex>
            <v-flex class="pa-1 rounded-xl text-center" style="background-color: #E0E0E0;">
              <span class="font-weight-black subtitle-1 "> Booking History</span>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider/>
        <v-card-actions>
          <v-spacer/>
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
    dialogView: false
  }),
  computed: {
  },
  watch: {
  },
  methods: {
    ...mapActions('booking', ['BOOKING_LIST', 'SET_OTP', 'BOOKING_UPDATE']),
    close(){
      this.dialogView = false
    },
    view(){
      this.dialogView = true
    }
  },

  mounted () {
  }
}
</script>