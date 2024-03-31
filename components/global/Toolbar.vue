<template>
    <v-app-bar elevation="0" app color="#483285">
        <v-toolbar-title class="white--text ml-3"><a :href="landing" style="text-decoration: none; color: white;">PACK&GO</a></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="log.type === 'customer'" @click="book" text color="white">New Order</v-btn>
        <v-btn v-if="log.type === 'driver' || log.type === 'business' || log.type === 'customer'" text color="white" @click="records">Records</v-btn>
        <v-menu offset-y rounded="b-xl" v-if="log.type">
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
  import moment from 'moment'

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
      },
      landing(){
        if(this.log){
          if(this.log.type == 'customer'){
            return '/application/customer'
          }else if(this.log.type == 'driver'){
            return '/application/driver'
          }else if(this.log.type == 'business'){
            return '/application/business'
          }else{
            return '/'
          }
        }else{
          return '/'
        }
      }
    },
    watch: {
      'log': {
        handler() {
          this.data = this.log
          this.getSuspension()
        }, deep: true
      }
    },

    methods: {
      ...mapActions('users', ['GET_DETAILS_OF_CURRENT_LOGIN', 'USER_SUSPENSION']),
      ...mapActions('login', ['POST_LOGOUT']),
      async getDetails(){
        await this.GET_DETAILS_OF_CURRENT_LOGIN().then(data => {
          this.userDetails = data.data.data
        }).catch(response => {
        })
      },
      async getSuspension(){
        if(this.log.type == 'driver' || this.log.type == 'business'){
          await this.USER_SUSPENSION().then(data => {
            if(data.data.suspended == true){
              this.$swal.fire({
                title: 'Account suspended.',
                html: `<p style='text-align: justify; text-justify: inter-word;'>Your rating is below 3.0 and your account will not be able to receive bookings for 7 days
                      from today. Your account will resume to get new bookings after 7 days and please ensure
                      that you need to get a rating of above 3.0 to remove the penalty. Booking will resume on <b>${moment(data.data.expiry).format('MMMM D, YYYY')}</b>.</p>`,
                icon: 'warning',
                confirmButtonColor: '#009c25',
                confirmButtonText: 'OK'
              })
            }
          }).catch(response => {
            this.$swal.fire({
              title: 'Something went wrong.',
              text: 'Please contact administrator.',
              icon: 'error',
              confirmButtonColor: '#009c25',
              confirmButtonText: 'OK'
            })
          }) 
        }
      },
      async logout(){
        this.$swal.fire({
          title: `Are you sure you want to log out?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#009c25',
          cancelButtonColor: '#b6b6b6',
          confirmButtonText: 'Yes!',
          cancelButtonText: 'Cancel'
        }).then(async result => {
          if (result.isConfirmed) {
            await this.POST_LOGOUT().then(data => {
              this.goTo('/')
              let Toast = this.$swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = this.$swal.stopTimer;
                  toast.onmouseleave = this.$swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: 'Log out.'
              });
            })
          }
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
        }else if(this.log.type == 'business') {
          this.goTo('/application/business')
        }
      }
    },

    mounted () {
      this.getDetails()
      this.getSuspension()
    }
  }
</script>