<template>
  <v-card flat style="background-color: transparent;">
    <v-card-title class="d-flex justify-center">
      <span class="title">
        BOOKING TRANSACTIONS
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
      <template>
        <v-card flat>
          <v-flex>
            <v-data-table
              :headers="headers"
              :items="items"
              hide-default-footer
            >
                <template v-slot:item.created_at="{ item }">
                  <span>{{created_at | datetime}}</span>
                </template>
                <template v-slot:item.name="{ item }">
                  <span class="font-weight-bold">
                    {{ item.customer ? item.customer.first_name : '' }} {{ item.customer.last_name ? item.customer.last_name : '' }}
                  </span>
                </template>
                <template v-slot:item.locations="{ item }">
                  <p>
                    From: <b>{{ item.pick_up_location ? item.pick_up_location : '' }}</b>
                  </p>
                  <p>
                    To: <b>{{ item.drop_off_location ? item.drop_off_location : '' }}</b>
                  </p>
                </template>
                <template v-slot:item.driver_name="{ item }">
                  <div class="pa-2" v-if="item.driver">
                    <span v-if="item.driver.type == 'business'" :style="!item.driver ? 'color:red' : ''" :class=" item.driver ? 'font-weight-bold' : ''">
                      {{ item.driver ? item.driver.user_business ? item.driver.user_business.business_name ? item.driver.user_business.business_name : 'Not Assigned': 'Not Assigned': 'Not Assigned' }}
                    </span>
                    <span v-else-if="item.driver.type == 'driver' || item.driver.type == 'customer'" :style="!item.driver ? 'color:red' : ''" :class=" item.driver ? 'font-weight-bold' : ''">
                      {{ item.driver ? item.driver.first_name+' '+item.driver.last_name : 'Not Assigned' }}
                    </span>
                  </div>
                  <div v-else class="pa-2">
                    <span style="color: #F44336;">
                      Not Assigned
                    </span>
                  </div>
                </template>
                <template v-slot:item.price="{ item }">
                  <span v-if="item.price">
                    {{ item.price ? item.price : 'N/A' }}
                  </span>
                  <span v-else style="color: red;">
                    N/A
                  </span>
                </template>
                <template v-slot:item.status="{ item }">
                  <v-chip small :color="
                        (item.status == 'pending') ? '#FFA726' 
                        :(item.status == 'confirmed') ? '#FFEE58'
                        :(item.status == 'cancelled') ? '#D32F2F'
                        :(item.status == 'completed') ? '#43A047'
                        :(item.status == 'reschedule') ? '#7E57C2' : 'gray'">
                    <span class="font-weight-bold">{{ item.status | capitalfirst }}</span>
                  </v-chip>
                </template>
            </v-data-table>
          </v-flex>
          <v-flex>
            <v-pagination
              v-model="page"
              :length="pageCount"
              :total-visible="5"
              @input="updatePage"
              prev-icon="mdi-arrow-left-bold-outline"
              next-icon="mdi-arrow-right-bold-outline"
              circle
            ></v-pagination>
          </v-flex>
        </v-card>
      </template>
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
      page : 1,
      count: 0,
      form: {skip: 0, take: 4 },
      headers: [
          { text: 'Order ID',align: 'start',sortable: false,value: 'order_number',},
          { text: 'Order Date',align: 'center',sortable: false , value: 'created_at' },
          { text: 'Customer Name',align: 'center',sortable: false , value: 'name' },
          { text: 'Pickup & Dropoff location',align: 'center',sortable: false , value: 'locations' },
          { text: 'Vehicle Type',align: 'center',sortable: false , value: 'vehicle_type.type' },
          { text: 'Driver Name',align: 'center',sortable: false , value: 'driver_name' },
          { text: 'Price',align: 'center',sortable: false , value: 'price' },
          { text: 'Status',align: 'center',sortable: false , value: 'status' },
        ],
    }),
    computed: {
      pageCount () {
        if (this.form.take == null ||
                  this.count == null
        ) return 0

        return Math.ceil(this.count / this.form.take)
      }
    },
    watch: {
    },
    methods: {
      ...mapActions('booking', ['BOOKING_LIST']),
      async getData(){
        await this.BOOKING_LIST(this.form).then((data) => {
          this.items = data.data.data
          this.count = data.data.details.total
        })
      },
      updatePage (pageIndex) {
        this.page = pageIndex
        this.form.skip = pageIndex === 1 ? 0 : (pageIndex - 1) * 4
        this.getData()
      },
    },
    mounted () {
      this.getData()
    }
    
  }
</script>