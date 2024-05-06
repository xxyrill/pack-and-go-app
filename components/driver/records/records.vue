<template>
  <v-layout fill-height class="landing-order-img">
    <v-layout column wrap pa-4>
      <v-flex>
        <driver-records-filter/>
      </v-flex>
      <v-flex>
        <driver-records-table/>
      </v-flex>
      <v-flex>
        <chat-box/>
      </v-flex>
    </v-layout>
  </v-layout>
</template>
<script>
import { mapActions } from 'vuex'
import Global from '~/plugins/mixins/global'
  export default {
    mixins: [Global],
    data: () => ({
      
    }),
    methods: {
      ...mapActions('users', ['USER_CURRENT_PLAN']),
      async getCurrentPlan(){
        await this.USER_CURRENT_PLAN().then(data => {
          if(data.data.data == null){
            this.$swal.fire({
              title: 'No subscription yet. Please subscribe to make booking.',
              icon: 'warning',
              confirmButtonColor: '#42A5F5',
              confirmButtonText: 'Go to Subscription'
            }).then((result) => {
              if (result.isConfirmed) {
                this.goTo('driver/profile/subscription')
              }
            })
          }
        }).catch(response => {
          this.$swal.fire({
            title: 'Something went wrong.',
            text: 'Please contact administrator.',
            icon: 'error',
            confirmButtonColor: '#009c25',
            confirmButtonText: 'OK'
          })
        })
      }
    },
    mounted () {
      this.getCurrentPlan()
    }
  }
</script>