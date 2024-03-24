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
              <v-card-subtitle class="d-flex justify-center py-0">
                <span class="subtitle-2" style="color: white;">{{item.description}}</span>
              </v-card-subtitle>
              <v-divider/>
              <v-card-text style="min-height: 150px;">
                <ul v-for="(it, ind) of item.subscription_inclusion" :key="ind">
                  <li style="color: white;">
                    <span class="caption" style="color: white;">{{ it.inclusion }}</span>
                  </li> 
                </ul>
              </v-card-text>
              <v-card-actions class="d-flex justify-center pa-1">
                <profile-subscription-apply :subscription="item"/>
              </v-card-actions>
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
    ...mapGetters('login', ['log'])
  },
  watch: {
    log: {
        handler() {
          if(this.log){
            this.getSubscription()
          }
        }, deep: true
      },
  },
  methods: {
    ...mapActions('subscription', ['GET_SUBSCRIPTIONS']),
    async getSubscription(){
      if(this.log){
        setTimeout(() => {
          let payload = {
            status : 'active',
            type : this.log ? this.log.type ? this.log.type : null : null
          }
          this.GET_SUBSCRIPTIONS(payload).then(data => {
            this.subscriptions_driver = data.data.data
          })
        }, 1000);
      }
    },
  },
  mounted () {
    this.getSubscription()
  }
}
</script>