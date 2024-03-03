<template>
  <v-flex py-5>
    <v-card flat>
      <v-card-title class="px-0">
        <span class="headline font-weight-bold">Available Plans</span>
      </v-card-title>
      <v-card-text class="px-0">
        <v-layout wrap row>
          <v-flex v-for="(item, index) of subscriptions_driver" :key="index" class="pa-2">
            <v-card class="rounded-xl pa-2" color="purple darken-4">
              <v-card-title class="d-flex justify-center">
                <span class="title" style="color: white;">{{item.title}}</span>
              </v-card-title>
              <v-card-sub-title class="d-flex justify-center py-0">
                <span class="subtitle-2" style="color: white;">{{item.description}}</span>
              </v-card-sub-title>
              <v-divider/>
              <v-card-subtitle>
                <span class="caption" style="color: white;">Php 8,550 every 6 months. Cancel anytime.</span>
              </v-card-subtitle>
              <v-divider/>
              <v-card-text>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-flex>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import Global from '~/plugins/mixins/global'
import Imagepath from '~/plugins/mixins/imagepath'
import moment from 'moment';
export default {
  mixins: [Global,Imagepath],
  data: () => ({
    errors: {},
    form: {},
    dialog_add_vehicle: false,
    vehicle_list: [],
    subscriptions_driver: []
  }),
  computed: {
  },
  watch: {
  },
  methods: {
    ...mapActions('vehicle',['VEHICLE_LIST']),
    ...mapActions('users', ['USER_VEHICLE_STORE']),
    ...mapMutations('users', ['REFRESH_DATA_VEHICLES']),
    ...mapActions('subscription', ['GET_SUBSCRIPTIONS']),
    async getSubscription(){
      let payload = {
        status : 'active',
        type : 'driver'
      }
      await this.GET_SUBSCRIPTIONS(payload).then(data => {
        this.subscriptions_driver = data.data.data
      })
    },
  },

  mounted () {
    this.getSubscription()
  }
}
</script>