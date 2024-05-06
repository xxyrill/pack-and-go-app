<template>
  <v-layout fill-height class="landing-order-img">
    <v-flex pa-3>
      <customer-booking-create/>
    </v-flex>
  </v-layout>
</template>
<script>
import Vue from 'vue'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import Global from '~/plugins/mixins/global'
import moment from 'moment';
export default {
  mixins: [Global],
  props: {
  },
  data: () => ({
  }),
  computed: {
  },
  watch: {
  },
  methods: {
    ...mapActions('booking', ['BOOKING_NOTIFICATION']),
    async getNotification(){
      await this.BOOKING_NOTIFICATION().then(data => {
        if(data.data.status == true){
          this.$swal.fire({
            text: `Please note that since you 
                    have cancelled/missed your 
                    last 3 consecutive move 
                    services within 24 hours 
                    of the scheduled day of 
                    your move service, the 
                    assigned driver/mover
                    may require you to pay
                    a deposit fee of 50% of
                    the agreed price of the
                    service for your next booking.
                    This is to ensure that our driver's
                    time is valued and we can provide the
                    best service to all of our customers.
                    Thank you for your understanding.`,
            icon: 'warning',
            confirmButtonColor: '#009c25',
            confirmButtonText: 'OK'
          })
        }
      })
    }
  },
  mounted () {
    this.getNotification()
  }
}
</script>