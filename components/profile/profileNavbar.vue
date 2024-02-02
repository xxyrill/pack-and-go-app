<template>
  <v-layout>
    <v-navigation-drawer permanent app>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/women/81.jpg">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Jane Smith</v-list-item-title>
          <v-list-item-subtitle><a class="caption">Change Picture</a></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>
<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
  export default {
    data: () => ({
      items: [
        { title: 'Profile', icon: 'mdi-account' },
        { title: 'Change Password', icon: 'mdi-key' },
        { title: 'Vehicles', icon: 'mdi-car-estate' },
        { title: 'Service Hours', icon: 'mdi-hours-24' },
        { title: 'Subscription', icon: 'mdi-currency-usd' },
      ],
      right: null,
    }),
    computed: {
    },
    methods: {
    },
    mounted () {

    }
    
  }
</script>