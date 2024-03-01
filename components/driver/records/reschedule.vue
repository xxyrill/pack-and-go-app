<template>
  <v-flex>
    <v-btn 
      small 
      depressed 
      color="#7E57C2" 
      @click="reschedule" 
      :disabled="booking.status == 'confirmed' ? false : true"
    >
      Reschedule
    </v-btn>
    <v-dialog
      v-model="dialogReschedule"
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
            <v-btn depressed color="grey lighten-1" small @click="close">Cancel</v-btn>
            <v-btn depressed color="success" small @click="proceed" :loading="loading">Proceed</v-btn>
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
    dialogReschedule: false,
    reason: null,
    reasons: [
      'Unreachable',
      'Not in pick-up address',
      'Bad weather',
      'Technical issues',
      'Other reason',
    ],
    other_reason: null,
    loading: false,
    errors: {}
  }),
  computed: {
  },
  watch: {
  },
  methods: {
    ...mapMutations('booking', ['SET_REFRESH']),
    ...mapActions('booking', ['BOOKING_LIST', 'SET_OTP', 'BOOKING_UPDATE', 'BOOKING_RESCHEDULE', 'SEND_MAIL']),
    close(){
      this.dialogReschedule = false
    },
    reschedule(){
      this.dialogReschedule = true
    },
    proceed(){
      if(this.reason == '' || this.reason == null) { 
        this.$set(this.errors, 'reason', ['This field is required.'])
      }else{
        this.$delete(this.errors, 'reason')
        if(this.reason == 'Other reason'){
          if(this.other_reason == '' || this.other_reason == null){
            this.$set(this.errors, 'other_reason', ['This field is required.'])
          }else{
            this.$delete(this.errors, 'other_reason')
            this.sendMail()
          }
        }else{
          this.sendMail()
        }
      }
    },
    async sendMail(){
      this.loading = true
      let payload = {
        email : this.booking.alt_email,
        booking_id : this.booking.id,
        booking_exact_date : this.booking ? this.booking.dates ?  this.booking.dates[0] ? this.booking.dates[0].date ? this.booking.dates[0].date : '' : '' : '' : '',
        booking_reschedule_date : this.booking ? this.booking.dates ?  this.booking.dates[0] ? this.booking.dates[0].date ? moment(this.booking.dates[0].date).add(1, 'day').format('YYYY-MM-DD') : '' : '' : '' : '',
      }
      await this.SEND_MAIL(payload).then(async data => {
        await this.saveReschedule()
      }).catch(response => {
        this.loading = false
        this.dialogReschedule = false
      })
    },
    async saveReschedule(){
      let payload = {
        reason : (this.reason == 'Other reason') ? this.other_reason : this.reason,
        booking_id : this.booking.id,
        booking_date : this.booking ? this.booking.dates ?  this.booking.dates[0] ? this.booking.dates[0].date ? this.booking.dates[0].date : '' : '' : '' : ''
      }
      await this.BOOKING_RESCHEDULE(payload).then(async data => {
        this.loading = false
        this.dialogReschedule = false
        this.SET_REFRESH(true)
        this.$swal.fire({
          title: 'Booking Rescheduled.',
          icon: 'success',
          confirmButtonColor: '#009c25',
          confirmButtonText: 'OK'
        })
      }).catch(response => {
        this.SET_REFRESH(true)
        this.loading = false
        this.dialogReschedule = false
      })
    }
  },

  mounted () {
  }
}
</script>