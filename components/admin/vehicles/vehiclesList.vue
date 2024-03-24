<template>
  <v-card flat style="background-color: transparent;">
    <v-card-title class="d-flex justify-center">
      <span class="title">
        VEHICLE LISTINGS
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
      <v-flex md2 lg2 sm12 xs12 pa-1>
        <v-autocomplete
          outlined
          dense
          v-model="status"
          :items="statuses"
          item-value="value"
          item-text="name"
          class="rounded-xl"
          persistent-placeholder
          label="Status"
          hide-selected
          color="success"
          @change="filter"
          clearable
        >
        </v-autocomplete>
      </v-flex>
    </v-card-subtitle>
    <v-card-subtitle class="d-flex aling-center pa-0 px-2">
      <span class="pa-2 subtitle-2" v-if="date.length !== 0 || status !== null">
        Filter : <span v-if="date.length !== 0">{{ date[0] }} -> {{ date[1] }}</span><span v-if="date.length !== 0 && status !== null">,</span> <span v-if="status">{{ status | capitalfirst}}</span>
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
                  <span>{{item.created_at | datetime}}</span>
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
      date : [],
      modal: false,
      status: null,
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
      statuses: [
        { name : 'Active', value : 'active'},
        { name : 'Inactive', value : 'inactive'}
      ]
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
          this.items = data.data.data
          this.count = data.data.details.total
        })
      },
      updatePage (pageIndex) {
        this.page = pageIndex
        this.form.skip = pageIndex === 1 ? 0 : (pageIndex - 1) * 7
        this.getData()
      },
      filter(){
        this.$set(this.form, 'status', this.status ? this.status : null)
        this.$set(this.form, 'filter_date', this.date ? this.date : null)
        this.getData()
        this.modal = false
      },
      clear(){
        this.date = []
        this.modal = false
        this.filter()
      },
    },
    mounted () {
      this.getData()
    }
    
  }
</script>