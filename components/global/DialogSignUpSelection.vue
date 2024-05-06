<template>
  <div class="px-2">
    <v-btn rounded dark @click="dialogSignup" >SIGN UP</v-btn>
    <!-- <a style="color: white; text-decoration: none" class="mr-4 pa-2 subtitle-1" @click="loginDialog">LOGIN</a> -->
    <v-dialog
      v-model="dialog"
      width="450"
      overlay-color="black"
      class="rounded-xxl"
    >
      <v-card class="rounded-xxl" dark style="opacity: 90%;">
        <v-card-title class="d-flex justify-center">
          <v-flex class="pa-2">
            <p class="headline text-center">SUBSCRIBE AS?</p>
            <p class="caption text-center">Please specify your registration preference</p>
          </v-flex>
        </v-card-title>
        <v-card-text >
          <v-flex class="px-10 pb-5">
            <v-layout row wrap>
              <v-flex>
                <v-btn outlined color="primary" depressed @click="selected('customer')">CUSTOMER</v-btn>
              </v-flex>
              <v-flex>
                <v-btn outlined color="primary" depressed @click="selected('driver')">DRIVER</v-btn>
              </v-flex>
              <v-flex>
                <v-btn outlined color="primary" depressed @click="selected('business')">BUSINESS</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import axios from 'axios'
  import Global from '~/plugins/mixins/global'

  export default {
    props: {
      dataAbstract: [Object, Array]
    },
    mixins: [
      Global,
    ],
    data: () => ({
      dialog: false,
    }),

    methods: {
      dialogSignup(){
        this.dialog = true
      },
      selected(type){
        this.goTo('/'+type)
      }
    },

    mounted () {
    }
  }
</script>