<template>
  <v-card flat style="background-color: transparent;">
    <v-card-title class="d-flex justify-center">
      <span class="title">
        DASHBOARD
      </span>
    </v-card-title>
    <v-card-subtitle class="d-flex aling-center pa-0 px-2">
      <span class="pa-2">
        <v-dialog
          v-model="modal"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              small
              color="primary"
            >
              <v-icon dense>
                mdi-filter
              </v-icon>
                Filter by Date
            </v-btn>
          </template>
          <v-date-picker
            v-model="date"
            scrollable
            range
          >
            <v-flex class="d-flex justify-center">
              <v-btn
                text
                color="warning"
                @click="clear"
              >
                Clear
              </v-btn>
              <v-btn
                text
                color="error"
                @click="modal = false"
              >
                Close
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="filter"
              >
                Submit
              </v-btn>
            </v-flex>
          </v-date-picker>
        </v-dialog>
      </span>
    </v-card-subtitle>
    <v-card-subtitle class="d-flex aling-center pa-0 px-2">
      <span class="pa-2 subtitle-2" v-if="date.length !== 0">
        Filter : {{ date[0] }} -> {{ date[1] }}
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
      items : [],
      modal: false,
      date: []
    }),
    watch: {
    },
    methods: {
      ...mapActions('analytics', ['DASH_CARDS']),
      filter(){
        this.getData()
      },
      clear(){
        this.date = []
        this.modal = false
        this.getData()
      },
      async getData(){
        let payload = {
          filter_date : this.date ? this.date : null
        }
        await this.DASH_CARDS(payload).then((data) => {
          this.items = []
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
              value : data.data[key],
              color : color
            }
            array.push(payload)
          });
          this.items = array
          if(this.date.length > 0){
            this.modal = false
          }
        })
      }
    },
    mounted () {
      this.getData()
    }
    
  }
</script>