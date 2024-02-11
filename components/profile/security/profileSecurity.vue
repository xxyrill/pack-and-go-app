<template>
  <v-card flat style="background-color: transparent;">
    <v-card-title>
      <span class="headline">
        Security Check
      </span>
    </v-card-title>
    <v-card-subtitle>
      <span>
        Change account password
      </span>
    </v-card-subtitle>
    <v-card-text>
      <v-container fluid>
        <v-layout column justify-center>
          <v-flex class="text-center pa-3">
            <Icon icon="uil:shield-check" width="192" height="192" />
          </v-flex>
          <v-flex class="text-center pa-1">  
              <span class="title">To protect your account security <br/>please verify your identity with one of the methods below.</span>
          </v-flex>
          <v-flex class="text-center pa-3">  
            <dialog-password/>
          </v-flex>
        </v-layout>
      </v-container>
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