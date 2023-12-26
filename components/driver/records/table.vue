<template>
  <v-card elevation-10 class=" px-3 ">
    <v-layout style="min-height: 670px">
      <v-flex lg12 md12 sm12 xs12>
        <v-data-table
          :headers="headers"
          :items="items"
          hide-default-footer
          class="elevation-0"
          loading-text="Loading... Please wait"
        >
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import Global from '~/plugins/mixins/global'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  mixins: [Global],
  data: () => ({
    items: [],
    headers: [
      { text: 'Status', align: 'left', sortable: false, value: 'status' },
      { text: 'Delivery date', align: 'left', sortable: false, value: 'delivery_date' },
      { text: 'Route', align: 'left', sortable: false, value: 'route' },
      { text: 'Customer', align: 'left', sortable: false, value: 'customer' },
      { text: 'Type', align: 'center', sortable: false, value: 'type' },
      { text: 'Price', align: 'center', sortable: false, value: 'price' },
      { text: 'Degree', align: 'center', sortable: false, value: 'degree' },
      { text: '', align: 'center', sortable: false, value: 'action' },
    ],
    loading: false,
  }),
  computed: {
  },
  watch: {
  },
  methods: {
  },

  mounted () {
  }
}
</script>