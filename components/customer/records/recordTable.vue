<template>
  <v-card flat color="#f0f0f0">
    <v-card-text>
      <v-layout style="min-height: 400px">
        <v-flex lg12 md12 sm12 xs12>
          <v-data-table
            color="primary"
            :headers="headers"
            :items="items"
            hide-default-footer
            class="elevation-0"
            loading-text="Loading... Please wait"
          >
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-fab-transition>
      
    </v-fab-transition>
    <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
    >
      <template v-slot:activator>
        <v-btn
          x-large
          icon
          color="#f0f0f0"
          dark
          absolute
          bottom
          right
          fab
          raised
          tile
          text
        >
          <Icon icon="mdi:message-group" height="70" width="70" color="black"/>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
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
    direction: 'top',
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: 'slide-y-reverse-transition',
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