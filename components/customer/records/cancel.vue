<template>
  <v-flex class="pa-1">
    <v-btn
      small
      depressed
      color="error"
      block
      :disabled="(booking.status == 'cancelled' || booking.status == 'completed' || booking.status == 'confirmed' || booking.status == 'reschedule') ? true : false"
      @click="view"
    >
      Cancel
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
        <v-card-text class="pb-0">
          <v-layout pa-3 column>
            <v-flex class="pa-1 rounded-xl text-center" style="background-color: #E0E0E0;">
              <span class="font-weight-black subtitle-1 "> Cancellation Details</span>
            </v-flex>
            <v-flex>
              <v-layout column>
                <v-flex class="px-4 pt-4">
                  <v-autocomplete 
                    v-model="reason" 
                    :items="reasons" 
                    outlined 
                    label="Reason for cancelling" 
                    persistent-placeholder 
                    dense
                    :error-messages="errors ? errors.reason ? errors.reason[0] : '' : ''"
                    />
                </v-flex>
                <v-flex class="px-4">
                  <v-textarea 
                    :disabled="reason == 'Other reason' ? false : true" 
                    v-model="other_reason" 
                    persistent-placeholder 
                    outlined 
                    auto-grow 
                    label="Other reason for cancellation (please specify)" 
                    dense
                    :error-messages="errors ? errors.other_reason ? errors.other_reason[0] : '' : ''"
                    />
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider/>
        <v-card-actions>
          <v-spacer/>
            <v-btn depressed color="success" small @click="proceedCancelation">Submit</v-btn>
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
    dialogCancel: false,
    reasons: [
      'Changing of plans',
      'Found another moving service',
      'Financial reason',
      'Personal emergency',
      'Unexpected circumstances',
      'Moving plans postponed',
      'Moving plans cancelled',
      'Other reason',
    ],
    errors: {},
    reason: null,
    other_reason: null,
  }),
  computed: {
  },
  watch: {
    reason: {
      handler() {
        if(this.reason !== 'Other reason'){
          this.other_reason = null
          this.errors = {}
        }
      }, deep: true
    },
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
        track_details : (status == 'completed') ? 'Delevered' : 'Cancelled (Driver). '+reason  
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
            title: "Appointment Withdrawn"
          });
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