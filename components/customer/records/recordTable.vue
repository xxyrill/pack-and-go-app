<template>
  <v-card flat color="transparent">
    <v-card-text>
      <v-layout style="min-height: 400px">
        <v-flex lg12 md12 sm12 xs12>
          <v-data-table
            :headers="headers"
            :items="items"
            hide-default-footer
            class="elevation-0"
            :loading="loading"
            loading-text="Loading... Please wait"
          >
          <template v-slot:item="{ item }">
            <tr>
              <td class="text-center pa-2">
                  <v-card outlined :color="item.status == 'pending' ? 'orange' : 'green'" class="px-4"><span style="color=white">{{ item.status | capitalfirst }}</span></v-card>
                  <span class="caption">{{ item.order_number }}</span>
              </td>
              <td class="text-center">
                <div class="text-center">{{ item.booking_date_time_start | time}} - {{ item.booking_date_time_end | time}}</div>
                <div class="text-center">{{ item.booking_date_time_start | monthyear }}</div>
              </td>
              <td class="text-left pa-2">
                <div>
                  <span class="font-weight-bold ">From:</span> {{ item.pick_up_location | dotdot}}
                  <v-menu
                    bottom
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <a
                        v-bind="attrs"
                        v-on="on"
                      >
                        See more...
                      </a>
                    </template>
                    <v-card class="pa-3">
                      <span class="font-weight-bold text-decoration-underline">{{ item.pick_up_location }}</span>
                    </v-card>
                  </v-menu>
                </div>
                <div>
                  <span class="font-weight-bold ">To:</span> {{ item.drop_off_location | dotdot}}
                  <v-menu
                    bottom
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <a
                        v-bind="attrs"
                        v-on="on"
                      >
                        See more...
                      </a>
                    </template>
                    <v-card class="pa-3">
                      <span class="font-weight-bold text-decoration-underline">{{ item.drop_off_location }}</span>
                    </v-card>
                  </v-menu>
                </div>
              </td>
              <td class="text-center">{{ item.user_driver_id ? item.user_driver_id : 'Not Assigned' }}</td>
              <td class="text-center">{{ item.vehicle_list_id ? item.vehicle_type.type : '' }}</td>
              <td class="text-center">Not Set</td>
              <td class="text-center">
                <v-flex>
                  <v-btn
                    small
                    depressed
                    color="info">
                    View
                  </v-btn>
                  <v-btn
                    small
                    depressed
                    color="error">
                    Cancel
                  </v-btn>
                </v-flex>
              </td>
            </tr>
          </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-flex class="d-flex justify-end">
      <chat-box/>
    </v-flex>
  </v-card>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import axios from 'axios'
import Global from '~/plugins/mixins/global'
import moment from 'moment';
export default {
  mixins: [Global],
  data: () => ({
    items: [],
    headers: [
      { text: 'Status', align: 'center', sortable: false, value: 'status' },
      { text: 'Delivery date', align: 'center', sortable: false, value: 'delivery_date' },
      { text: 'Route', align: 'center', sortable: false, value: 'route' },
      { text: 'Driver', align: 'center', sortable: false, value: 'customer' },
      { text: 'Type', align: 'center', sortable: false, value: 'type' },
      { text: 'Price', align: 'center', sortable: false, value: 'price' },
      { text: '', align: 'center', sortable: false, value: 'action' },
    ],
    loading: false,
    fav: true,
    menu: false,
    message: false,
    hints: true,
    recent: [
      {
        active: true,
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Jason Oner',
      },
      {
        active: true,
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Mike Carlson',
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Cindy Baker',
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Ali Connors',
      },
    ],
  }),
  computed: {
  },
  watch: {
  },
  methods: {
    ...mapActions('booking', ['BOOKING_LIST']),
    async getList(){
      this.loading = true
      let payload = {
        order_by : "id",
        sort_by : "desc",
        skip: 0,
        take: 6
      }
      await this.BOOKING_LIST(payload).then(data => {
        this.items = data.data.data
        this.loading = false
      }).catch(response => {
        this.loading = false
      })
    },
  },

  mounted () {
    this.getList()
  }
}
</script>