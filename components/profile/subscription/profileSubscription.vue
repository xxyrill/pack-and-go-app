<template>
  <v-card flat style="background-color: transparent;">
    <v-card-title>
      <span class="headline">
        Subscription
      </span>
    </v-card-title>
    <v-card-subtitle>
      <span>
        Manage your account scubscription and settings
      </span>
    </v-card-subtitle>
    <v-divider/>
    <v-card-text>
      <v-layout column wrap>
        <v-flex class="pa-1">
          <span class="headline font-weight-bold">Your Plan</span>
        </v-flex>
        <v-flex class="pa-1">
          <v-card class="rounded-xl pa-4 elevation-10" color="purple darken-4" v-if="user_subscription">
            <v-card-title>
              <span class="headline" style="color: white;">{{user_subscription ? user_subscription.subscription ? user_subscription.subscription.title ? user_subscription.subscription.title : '' : '' : ''}}</span>
            </v-card-title>
            <v-card-subtitle>
              <span class="caption" style="color: white;">{{user_subscription ? user_subscription.subscription ? user_subscription.subscription.description ? user_subscription.subscription.description : '' : '' : ''}}</span>
            </v-card-subtitle>
            <v-divider/>
            <v-card-text>
              <v-layout row wrap>
                <v-flex>
                  <v-layout column v-if="user_subscription">
                    <v-flex class="d-flex align-center" pa-2 v-for="(item, index) of user_subscription ? user_subscription.subscription ? user_subscription.subscription.subscription_inclusion ? user_subscription.subscription.subscription_inclusion : [] : [] : []" :key="index">
                      <Icon color="white" icon="material-symbols:check" width="25" height="25"/>
                      <span style="color: white;">{{item.inclusion}}</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex>
                  <v-layout column>
                    <v-flex class="d-flex align-center" pa-2>
                      <span style="color: white;" class="headline">Payment</span>
                    </v-flex>
                    <v-flex class="d-flex align-center" pa-2>
                      <span style="color: white;">Your next bill is Php {{user_subscription ? user_subscription.subscription ? user_subscription.subscription.price ? user_subscription.subscription.price : '0' : '0' : '0' | comma}} on {{getDateSubscriptionEnd}}.</span>
                    </v-flex>
                    <v-flex class="d-flex align-center" pa-2>
                      <span style="color: white;" class="pr-2">Payment method</span>
                      <v-img max-width="100" max-height="100" :src="imgs.maya_logo"/>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
          <v-flex>
            <profile-subscription-choices/>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import Imagepath from '~/plugins/mixins/imagepath'
import moment from 'moment';

  export default {
    mixins: [Imagepath],
    props: {
      user_info:[Object]
    },
    data: () => ({
      subscription_data : {},
      user_subscription : {}
    }),
    computed: {
      ...mapGetters('users', ['refresh_subscription']),
      getDateSubscriptionEnd(){
        if(this.user_subscription){
          if(this.user_subscription.user_subscription_pay){

          }else{
            let subscription_period = this.user_subscription ? 
                                      this.user_subscription.subscription ? 
                                      this.user_subscription.subscription.subscription_period ? 
                                      this.user_subscription.subscription.subscription_period
                                      : 0
                                      : 0
                                      : 0
            let subscription_start = this.user_subscription ?
                                    this.user_subscription.created_at ? 
                                    this.user_subscription.created_at
                                    : "1900-01-01 00:00:00"
                                    : "1900-01-01 00:00:00"
            let next_payment = moment(subscription_start)
                            .add(subscription_period, 'months')
                            .format('YYYY/MM/DD')
            return next_payment
          }
        }
      }
    },
    watch: {
      refresh_subscription: {
        handler() {
          if(this.refresh_subscription == true){
            this.getCurrentPlan()
          }
        }, deep: true
      },
    },
    methods: {
      ...mapActions('users', ['GET_SUBSCRIPTION', 'USER_CURRENT_PLAN']),
      ...mapMutations('users', ['REFRESH_SUBSCRIPTION']),
      getSubscriptionsData(){
        this.GET_SUBSCRIPTION().then(data => {
          this.subscription_data = data.data.data
        })
      },
      async getCurrentPlan(){
        await this.USER_CURRENT_PLAN().then(data => {
          this.user_subscription = data.data.data
          this.REFRESH_SUBSCRIPTION(false)
        }).catch(response => {
          this.$swal.fire({
            title: 'No subscription yet. Please subscribe to make booking.',
            icon: 'error',
            confirmButtonColor: '#009c25',
            confirmButtonText: 'OK'
          })
        })
      }
    },
    mounted () {
      this.getSubscriptionsData()
      this.getCurrentPlan()
    }
  }
</script>