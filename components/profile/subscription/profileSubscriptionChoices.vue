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
                <v-btn small color="info" class="rounded-xl" @click="updatePlan(item)"> Select Plan</v-btn>
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
    ...mapMutations('users', ['REFRESH_SUBSCRIPTION']),
    ...mapActions('users', ['USER_SUBSCRIBE_PLAN']),
    ...mapActions('subscription', ['GET_SUBSCRIPTIONS']),
    async getSubscription(){
      if(this.log){
        let payload = {
          status : 'active',
          type : this.log ? this.log.type ? this.log.type : null : null
        }
        await this.GET_SUBSCRIPTIONS(payload).then(data => {
          this.subscriptions_driver = data.data.data
        })
      }
    },
    async updatePlan(item){
      this.$swal.fire({
        title: `Are You Sure About Modifying Your Plan?`,
        text: "This action cannot be undone.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#009c25',
        cancelButtonColor: '#b6b6b6',
        confirmButtonText: 'Yes!',
        cancelButtonText: 'Cancel'
      }).then(async result => {
        if (result.isConfirmed) {
          let payload = {
            subscription_id : item ? item.id ? item.id : null : null
          }
          await this.USER_SUBSCRIBE_PLAN(payload).then(data => {
            this.REFRESH_SUBSCRIPTION(true)
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
              title: "Subscription Shift"
            });
          }).catch(response => {
            this.$swal.fire({
              title: 'Something went wrong. please contact administrator.',
              icon: 'error',
              confirmButtonColor: '#009c25',
              confirmButtonText: 'OK'
            })
          })
        }
      })
      
    }
  },

  mounted () {
    this.getSubscription()
  }
}
</script>