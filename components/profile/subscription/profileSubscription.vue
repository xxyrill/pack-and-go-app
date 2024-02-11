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
          <v-card class="rounded-xl pa-4 elevation-15" color="purple darken-4">
            <v-card-title>
              <span class="headline" style="color: white;">6 Months Subscription</span>
            </v-card-title>
            <v-card-subtitle>
              <span class="caption" style="color: white;">Php 8,550 every 6 months. Cancel anytime.</span>
            </v-card-subtitle>
            <v-divider/>
            <v-card-text>
              <v-layout row wrap>
                <v-flex>
                  <v-layout column>
                    <v-flex class="d-flex align-center" pa-2>
                      <Icon color="white" icon="material-symbols:check" width="25" height="25"/>
                      <span style="color: white;">Includes two vehicle</span>
                    </v-flex>
                    <v-flex class="d-flex align-center" pa-2>
                      <Icon color="white" icon="material-symbols:check" width="25" height="25"/>
                      <span style="color: white;">Saved Php 450 in every 6 months</span>
                    </v-flex>
                    <v-flex class="d-flex align-center" pa-2>
                      <Icon color="white" icon="material-symbols:check" width="25" height="25"/>
                      <span style="color: white;">Biannual subscription</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex>
                  <v-layout column>
                    <v-flex class="d-flex align-center" pa-2>
                      <span style="color: white;" class="headline">Payment</span>
                    </v-flex>
                    <v-flex class="d-flex align-center" pa-2>
                      <span style="color: white;">Your next bill is Php, 8,550 on 12/20/2023.</span>
                    </v-flex>
                    <v-flex class="d-flex align-center" pa-2>
                      <span style="color: white;">Payment method</span>
                      <v-img max-width="100" max-height="100" :src="imgs.maya_logo"/>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
          <v-flex pa-3>
            <v-btn small depressed color="primary">
              CHANGE PLAN
            </v-btn>
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

  export default {
    mixins: [Imagepath],
    props: {
      user_info:[Object]
    },
    data: () => ({
      subscription_data : {}
    }),
    computed: {
    },
    methods: {
      ...mapActions('users', ['GET_SUBSCRIPTION']),
      getSubscriptionsData(){
        this.GET_SUBSCRIPTION().then(data => {
          this.subscription_data = data.data.data
        })
      }
    },
    mounted () {
      this.getSubscriptionsData()
    }
  }
</script>