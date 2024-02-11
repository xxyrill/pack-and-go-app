<template>
  <v-card flat style="background-color: transparent;">
    <v-card-title>
      <span class="headline">
        Ratings
      </span>
    </v-card-title>
    <v-card-subtitle>
      <span>
        View customer ratings of your service
      </span>
    </v-card-subtitle>
    <v-card-text>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import axios from 'axios'
  export default {
    props: {
      user_info:[Object]
    },
    data: () => ({

    }),
    computed: {
    },
    methods: {
    },
    mounted () {
    }
    
  }
</script>