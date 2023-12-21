<template>
    <v-layout dark>
      <client-only>
        <navbar :items="navbar" />
        <toolbar />
        <nuxt-child />
      </client-only>
    </v-layout>
  </template>
  <script>
  import Global from '~/plugins/mixins/global'
  import { mapGetters } from 'vuex'
  import _ from 'lodash'
  
  export default {
    data: () => ({
      drawer: null,
      role: null,
      adminRole: null,
      navbar: [],
      loading: false
    }),
    mixins: [Global],
    methods: {
      setNav() {
        this.navbar = [
          { icon: 'ic:baseline-space-dashboard', title: 'DASHBOARD', href: `/application`, children: [] },
          { icon: 'icon-park-solid:transaction-order', title: 'BOOKING TRANSACTION', href: `/application/admin`, children: [] },
          { icon: 'fluent:vehicle-car-profile-24-filled', title: 'VEHICLE LISTING ', href: `/application`, children: [] },
          { icon: 'tabler:report-money', title: 'FINANCIAL REPORT', href: `/applications`, children: [] },
        ]
      },
    },
    created() {
      this.setNav()
    }
  }
  </script>