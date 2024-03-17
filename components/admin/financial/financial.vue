<template>
  <v-card flat style="background-color: transparent;">
    <v-card-title class="d-flex justify-center">
      <span class="title">
        FINANCIAL REPORT
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
      <v-flex class="pa-3">
        TOTAL REVENUE : 
      </v-flex>
      <v-flex>
        <apexchart height="300" :options="chartOptions" :series="series"></apexchart>
      </v-flex>
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
      },
      series () {
        return [{
          name: 'Inflation',
          data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
        }]
      },
      chartOptions () {
        return {
          chart: {
            type: 'bar',
            toolbar: {
              tools: {
                download : false
              }
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded',
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
          },
          xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          },
          fill: {
            opacity: 1,
          },
        }
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