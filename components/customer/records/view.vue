<template>
  <v-flex class="pa-1">
    <v-btn
      small
      depressed
      color="info"
      block
      @click="view"
    >
      View
    </v-btn>
    <v-dialog
      v-model="dialogView"
      width="600"
    >
      <v-card>
        <v-card-title :class="(booking.status == 'pending') ? 'orange lighten-1' 
                    :(booking.status == 'confirmed') ? 'yellow lighten-1'
                    :(booking.status == 'cancelled') ? 'red darken-2'
                    :(booking.status == 'completed') ? 'green darken-1'
                    :(booking.status == 'reschedule') ? 'deep-purple lighten-1' : 'gray'">
          <span class="subtitle-1 px-2 font-weight-bold">{{ booking.status | capitalfirst }} - {{ booking.order_number }}</span>
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
            <v-flex class="mt-2">
              <v-flex v-for="(item, index) of booking.booking_history" :key="index" class="pa-1">
                <span class="px-2">{{ item.created_at | monthdayyearwithtime }}</span> -
                <span class="px-2">{{ item.track_details }}</span>
              </v-flex>
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
    <v-dialog
      v-model="dialogCancel"
      width="400"
    >
      <v-card>
        <v-card-text>
          <v-layout pa-3 column justify-center align-center>
            <v-flex>
              <span> Reschedule reason</span>
            </v-flex>
            <v-flex>
              <v-autocomplete
                v-model="reason"
                outlined
                dense
                class="rounded-xl"
                :items="reasons"
                :error-messages="errors ? errors.reason ? errors.reason[0] : '' : ''"
              />
            </v-flex>
            <v-flex v-if="reason == 'Other reason'">
              <v-textarea
                v-model="other_reason"
                rows="1" 
                auto-grow 
                class="rounded-xl" 
                outlined
                persistent-placeholder
                label="Other reasons"
                dense
                :error-messages="errors ? errors.other_reason ? errors.other_reason[0] : '' : ''"/>
            </v-flex>
            <v-flex>
              <span>
                Move order will be rescheduled in the following day
              </span>
            </v-flex>
            <v-flex>
              <span>
                An email notification will be sent to the customer.
              </span>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider/>
        <v-card-actions>
          <v-flex class="text-center">
            <v-btn depressed color="black" style="color: white;" small @click="closeCancel">Cancel</v-btn>
            <v-btn depressed color="success" small @click="proceedCancelation">Proceed</v-btn>
          </v-flex>
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
    dialogCancel: false,
    reasons: [
      'Unreachable',
      'Not in pick-up address',
      'Bad weather',
      'Technical issues',
      'Other reason',
    ],
    reason: null,
    other_reason: null,
    errors: {}
  }),
  computed: {
  },
  watch: {
  },
  methods: {
    ...mapMutations('booking', ['SET_REFRESH']),
    ...mapActions('booking', ['BOOKING_LIST', 'SET_OTP', 'BOOKING_UPDATE', 'BOOKING_CANCEL','BOOKING_HISTORY']),
    close(){
      this.dialogView = false
    },
    view(){
      this.dialogView = true
    },
    tag(type){
      if(type == 'complete'){
        this.$swal.fire({
          title: `Would you like to tag the move order as complete?`,
          text: "This action cannot be undone.",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#009c25',
          cancelButtonColor: '#b6b6b6',
          confirmButtonText: 'Yes!',
          cancelButtonText: 'Cancel'
        }).then(async result => {
          if (result.isConfirmed) {
            await this.bookingHistory('completed')
            this.updateStatus('completed')
            this.close()
          }
        })
      }else{
        this.dialogCancel = true
      }
    },
    async updateStatus(status){
      let payload = {
        id: this.booking.id ? this.booking.id : null,
        status: status,
      }
      await this.BOOKING_UPDATE(payload).then(data => {
        this.SET_REFRESH(true)
      })
    },
    async bookingCancelation(){
      let payload = {
        booking_id : this.booking.id,
        reason : (this.reason == 'Other reason') ? this.other_reason : this.reason,
      }
      await this.BOOKING_CANCEL(payload).then(async data => {
        await this.bookingHistory('cancelled')
        this.dialogCancel = false
      })
    },
    async bookingHistory(status){
      let reason = (this.reason == 'Other reason') ? this.other_reason : this.reason
      let payload = {
        booking_id : this.booking.id,
        track_details : (status == 'completed') ? 'Delivered' : 'Cancelled (Driver). '+reason  
      }
      await this.BOOKING_HISTORY(payload)
    },
    proceedCancelation(){
      if(this.reason == '' || this.reason == null) { 
        this.$set(this.errors, 'reason', ['This field is required.'])
      }else{
        this.$delete(this.errors, 'reason')
        if(this.reason == 'Other reason'){
          if(this.other_reason == '' || this.other_reason == null){
            this.$set(this.errors, 'other_reason', ['This field is required.'])
          }else{
            this.$delete(this.errors, 'other_reason')
            this.functionCancel()
          }
        }else{
          this.functionCancel()
        }
      }
    },
    functionCancel(){
      this.$swal.fire({
        title: `Would you like to tag the move order as cancelled?`,
        text: "This action cannot be undone.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#009c25',
        cancelButtonColor: '#b6b6b6',
        confirmButtonText: 'Yes!',
        cancelButtonText: 'Cancel'
      }).then(async result => {
        if (result.isConfirmed) {
          await this.bookingCancelation()
          this.updateStatus('cancelled')
          this.close()
        }
      })
    },
    close(){
      this.dialogView = false
    },
    closeCancel(){
      this.dialogCancel = false
    }
  },

  mounted () {
  }
}
</script>