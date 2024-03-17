<template>
  <v-layout class="pa-0 mt-15">
    <v-flex md2 lg2 sm2 xs2>
      <navigation-bar :user_info="user_info"/>
    </v-flex>
    <v-flex md10 lg10 sm10 xs10 class="pa-3">
      <booking-transaction-table/>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import axios from 'axios'
  export default {
    data: () => ({
      user_info: {},
    }),
    computed: {
      ...mapGetters('users', ['refresh'])
    },
    watch: {
      refresh: {
        handler() {
          if(this.refresh == true){
            this.getUserDetails()
          }
        }, deep: true
      },
    },
    methods: {
      ...mapActions('users', ['GET_DETAILS_OF_CURRENT_LOGIN']),
      ...mapMutations('users', ['REFRESH_DATA']),
      async getUserDetails(){
        await this.GET_DETAILS_OF_CURRENT_LOGIN().then(data => {
          this.REFRESH_DATA(false)
          this.user_info = data.data.data
        })
      }
    },
    mounted () {
      this.getUserDetails()
    }
    
  }
</script>