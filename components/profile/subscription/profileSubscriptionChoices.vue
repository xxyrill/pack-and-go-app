<template>
  <v-card>
    <v-card-title>
      <span></span>
    </v-card-title>
  </v-card>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import axios from 'axios'
  export default {
    props: {
      user_info:[Object]
    },
    data: () => ({

    }),
    computed: {
    },
    methods: {
      ...mapActions('subscription', ['GET_SUBSCRIPTIONS']),
      getSubscriptionsData(){
        let payload = {
          type : 'driver',
          status : 'active'
        }
        this.GET_SUBSCRIPTIONS(payload).then(data => {
          console.log(data.data.data)
        })
      }
    },
    mounted () {
      this.getSubscriptionsData()
    }
  }
</script>