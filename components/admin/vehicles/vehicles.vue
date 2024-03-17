<template>
  <v-card flat style="background-color: transparent;">
    <v-card-title class="d-flex justify-center">
      <span class="title">
        VEHICLE LISTINGS
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
                <template v-slot:item.type="{ item }">
                  <span class="font-weight-bold">{{item.vehicle ? item.vehicle.type ? item.vehicle.type : '' : ''}}</span>
                </template>
                <template v-slot:item.created_at="{ item }">
                  <span>{{created_at | datetime}}</span>
                </template>
                <template v-slot:item.status="{ item }">
                  <v-chip small :color="item.deleted_at ? '#aaaaaa' : '#22bb33'">
                    <span class="font-weight-bold">{{ item.deleted_at ? 'Inactive' : 'Active' }}</span>
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
      form: {skip: 0, take: 7 },
      headers: [
          { text: 'Vehicle Type',align: 'start',sortable: false , value: 'type' },
          { text: 'Date Added',align: 'center',sortable: false,value: 'created_at',},
          { text: 'Make',align: 'center',sortable: false , value: 'make' },
          { text: 'Year Model',align: 'center',sortable: false , value: 'year_model' },
          { text: 'Plate Number',align: 'center',sortable: false , value: 'plate_number' },
          { text: 'Status',align: 'center',sortable: false , value: 'status' }
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
      ...mapActions('users', ['USER_VEHICLE_LISTING']),
      async getData(){
        await this.USER_VEHICLE_LISTING(this.form).then((data) => {
          console.log(data.data)
          this.items = data.data.data
          this.count = data.data.details.total
        })
      },
      updatePage (pageIndex) {
        this.page = pageIndex
        this.form.skip = pageIndex === 1 ? 0 : (pageIndex - 1) * 7
        this.getData()
      },
    },
    mounted () {
      this.getData()
    }
    
  }
</script>