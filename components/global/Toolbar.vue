<template>
    <v-app-bar elevation="0" app color="#483285">
        <v-toolbar-title class="white--text ml-3">PACK&GO</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="log.type === 'customer'" @click="book" text color="white">New Order</v-btn>
        <v-btn v-if="log.type === 'driver' || log.type === 'business' || log.type === 'customer'" text color="white" @click="records">Records</v-btn>
        <v-menu offset-y rounded="b-xl">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text 
              color="white"
              v-bind="attrs"
              v-on="on"
            >
              <span v-if="userDetails.type == 'business'">
                {{userDetails ? userDetails.user_business ? userDetails.user_business.business_name ? userDetails.user_business.business_name : '' : '' : ''}}
              </span>
              <span v-else-if="userDetails.type == 'driver' || userDetails.type == 'customer'">
                {{userDetails.first_name}} {{userDetails.middle_name}} {{userDetails.last_name}}
              </span>
            </v-btn>
          </template>
          <v-list class="text-center">
            <v-list-item>
              <v-list-item-title><a class="text-decoration-none" style="color: black;" :href="redirect">My Account</a></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title><a style="color: black;" @click="logout">Log out</a></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
    </v-app-bar>
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
      errors: {},
      form: {},
      dialog: false,
      email: null,
      show: false,
      password: null,
      loginloading: false,
      userDetails: {},
      items: [
        {
          type : 'My Profile',
          url : '/application/profile'
        },
        {
          type : 'Log out',
          url : null
        }
      ]
    }),
    computed: {
      ...mapGetters('login', ['log']),
      redirect(){
        if(this.log.type == 'customer'){
          return '/application/customer/profile'
        }else if(this.log.type == 'driver'){
          return '/application/driver/profile'
        }else if(this.log.type == 'business'){
          return '/application/business/profile'
        }
      }
    },
    watch: {
      'log': {
        handler() {
          this.data = this.log
        }, deep: true
      }
    },

    methods: {
      ...mapActions('users', ['GET_DETAILS_OF_CURRENT_LOGIN']),
      ...mapActions('login', ['POST_LOGOUT']),
      async getDetails(){
        await this.GET_DETAILS_OF_CURRENT_LOGIN().then(data => {
          this.userDetails = data.data.data
        }).catch(response => {
          console.log(response)
        })
      },
      async logout(){
        await this.POST_LOGOUT().then(data => {
          this.goTo('/')
        })
      },
      book(){
        this.goTo('/application/customer/booking')
      },
      records(){
        if (this.log.type == 'driver') {
          this.goTo('/application/driver') 
        }else if(this.log.type == 'customer') {
          this.goTo('/application/customer')
        }
      }
    },

    mounted () {
      this.getDetails()
    }
  }
</script>