<template>
  <v-card flat style="background-color: transparent;">
    <v-card-title class="d-flex justify-center">
      <span class="title">
        DASHBOARD
      </span>
    </v-card-title>
    <v-card-subtitle class="d-flex aling-center pa-0 px-2">
      <span class="pa-2">
        <v-btn small color="info">
          <v-icon dense>
            mdi-filter
          </v-icon>
          Filter
        </v-btn>
      </span>
    </v-card-subtitle>
    <v-card-text>
      <v-layout wrap>
        <v-flex xs12 sm12 md6 lg6
          v-for="(item, index) in items" :key="index"
          class="pa-2"
        >
          <v-card class="outlined elevation-7" >
            <v-card-title>
              <v-layout wrap justify-space-between>
                <v-flex xs12 md6 class="pa-2">
                  <v-layout wrap justify-right align-right>
                    <v-flex xs12>
                      <span :class="`${item.color}--text`" style="font-size: 17px;">{{ item.title }}</span>
                    </v-flex>
                    <v-flex xs12>
                      <span class="grey--text" style="font-size: 25px;">{{ item.value }}</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card-title>
            <hr class="mb-0" :color="item.color"/>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import moment from 'moment'
import Global from '~/plugins/mixins/global'
import Imagepath from '~/plugins/mixins/imagepath'

  export default {
    mixins: [Global,Imagepath],
    props: {
    },
    data: () => ({
      items : []
    }),
    watch: {
    },
    methods: {
      ...mapActions('analytics', ['DASH_CARDS']),
      async getData(){
        await this.DASH_CARDS().then((data) => {
          let array = []
          Object.keys(data.data).forEach((key, value) => {
            let title = null
            let color = null
            if(key == 'pending'){
              title = 'Pending Transactions',
              color = 'indigo'
            }else if( key == 'completed'){
              title = 'Complete Transactions',
              color = 'green'
            }else if( key == 'cancelled'){
              title = 'Canceled Transactions',
              color = 'red'
            }else if( key == 'customers'){
              title = 'Total Customers',
              color = 'orange'
            }else if( key == 'vehicles'){
              title = 'Total Vehicles',
              color = 'teal'
            }else if( key == 'revenue'){
              title = 'Total Revenue',
              color = 'purple'
            }

            let payload = {
              title : title,
              value : value,
              color : color
            }
            console.log(value)
            array.push(payload)
          });
          this.items = array
        })
      }
    },
    mounted () {
      this.getData()
    }
    
  }
</script>