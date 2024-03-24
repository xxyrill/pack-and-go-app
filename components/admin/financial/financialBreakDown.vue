<template>
  <v-card flat style="background-color: transparent;">
    <v-card-title class="d-flex justify-center">
      <span class="title">
        FINANCIAL REPORT
      </span>
    </v-card-title>
    <v-card-subtitle class="d-flex aling-center pa-0 px-2">
      <v-flex md2 lg2 sm12 xs12 pa-1>
        <v-autocomplete
          outlined
          dense
          v-model="year"
          :items="years"
          class="rounded-xl"
          persistent-placeholder
          label="Filter by Year: "
          hide-selected
          color="success"
          @change="getData"
          clearable
        >
        </v-autocomplete>
      </v-flex>
    </v-card-subtitle>
    <v-card-text>
      <v-flex class="pa-3">
        TOTAL REVENUE : {{ overall_revenue | decimalcomma }}
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
      modal: false,
      form: {},
      date: [],
      revenue: [],
      year: new Date().getFullYear(),
      overall_revenue: 0,
      years: []
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
          data: this.revenue
        }]
      },
      chartOptions () {
        return {
          chart: {
            type: 'bar',
            toolbar: {
              tools: {
                download : true
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
          yaxis: {
            title: {
              text: '(Peso)'
            }
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
      ...mapActions('analytics', ['DASH_REVENUE']),
      generateYears() {
      const currentYear = new Date().getFullYear();
        for (let year = currentYear; year >= 2000; year--) {
          this.years.push(year);
        }
      },
      async getData(){
        let payload = {
          year : this.year ? this.year : null
        }
        await this.DASH_REVENUE(payload).then((data) => {
          let result = [
            parseFloat(data.data.data[1]),
            parseFloat(data.data.data[2]),
            parseFloat(data.data.data[3]),
            parseFloat(data.data.data[4]),
            parseFloat(data.data.data[5]),
            parseFloat(data.data.data[6]),
            parseFloat(data.data.data[7]),
            parseFloat(data.data.data[8]),
            parseFloat(data.data.data[9]),
            parseFloat(data.data.data[10]),
            parseFloat(data.data.data[11]),
            parseFloat(data.data.data[12])
          ]
          this.revenue = result
          this.overall_revenue = result.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        })
      },
      updatePage (pageIndex) {
        this.page = pageIndex
        this.form.skip = pageIndex === 1 ? 0 : (pageIndex - 1) * 7
        this.getData()
      },
    },
    mounted () {
      this.generateYears()
      this.getData()
    }
    
  }
</script>