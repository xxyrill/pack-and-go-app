<template>
  <v-layout fill-height>
    <v-navigation-drawer permanent>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img @click="open" :src="user_info.profile_picture_path ? url+'/storage/'+user_info.profile_picture_path : imgs.empty_profile">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-if="user_info.type == 'business'">{{user_info ? user_info.user_business ? user_info.user_business.business_name ? user_info.user_business.business_name : '' : '' :''}}</v-list-item-title>
          <v-list-item-title v-else>{{user_info.first_name | capitalfirst}} {{user_info.last_name | capitalfirst}}</v-list-item-title>
          <v-list-item-subtitle><a class="caption" @click="open">Change Picture</a></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :href="item.href"
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
    <v-dialog
      v-model="dialog_change_profile"
      width="400"
    >
      <v-card class="rounded-xl">
        <v-card-title class="d-flex justify-center pb-0">
          <span>
            Updating Profile Picture
          </span>
        </v-card-title>
        <v-card-text class="pa-1">
          <v-layout column justify-center>
            <v-flex class="text-center pa-2">
              <v-card class="elevation-9">
                <v-img contain min-height="200" max-height="200" :src="imageUrl" v-if="file"></v-img>
              </v-card>
            </v-flex>
            <v-flex class="pa-2">
              <v-file-input
                outlined
                v-model="file"
                prepend-icon=""
                prepend-inner-icon="mdi mdi-camera"
                accept="image/*"
                dense
                @change="handleFileChange"
                :error-messages="errors ? errors.file ? errors.file :'':''"
              />
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn small dark depressed @click="submit">Save</v-btn>
          <v-btn small depressed color="grey darken-1" @click="close">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import Global from '~/plugins/mixins/global'
import Imagepath from '~/plugins/mixins/imagepath'
import { Http } from '~/plugins/http'

  export default {
    mixins: [Imagepath,Global],
    props: {
      user_info: [Object]
    },
    data: () => ({
      items: [],
      right: null,
      dialog_change_profile: false,
      file: null,
      imageUrl: null,
      errors: {},
      url: process.env.API_URL,
    }),
    computed: {
      ...mapGetters('login', ['log'])
    },
    watch: {
    log: {
      handler() {
        this.setNavBar()
      }, deep: true
    }
  },
    methods: {
      ...mapMutations('users', ['REFRESH_DATA']),
      setNavBar(){
        if(this.log.type == 'customer'){
          this.items = [
            { title: 'Profile', icon: 'mdi-account' , href: '/application/driver/profile'},
            { title: 'Change Password', icon: 'mdi-key', href: '/application/driver/profile/security' }
          ]
        }else if(this.log.type == 'driver'){
          this.items = [
            { title: 'Profile', icon: 'mdi-account' , href: '/application/driver/profile'},
            { title: 'Change Password', icon: 'mdi-key', href: '/application/driver/profile/security' },
            { title: 'Vehicles', icon: 'mdi-car-estate', href: '/application/driver/profile/vehicles' },
            { title: 'Subscription', icon: 'mdi-currency-usd', href: '/application/driver/profile/subscription' },
            { title: 'Ratings', icon: 'mdi-star', href: '/application/driver/profile/ratings' },
          ]
        }else if(this.log.type == 'business'){
          this.items = [
            { title: 'Profile', icon: 'mdi-account' , href: '/application/driver/profile'},
            { title: 'Change Password', icon: 'mdi-key', href: '/application/driver/profile/security' },
            { title: 'Vehicles', icon: 'mdi-car-estate', href: '/application/driver/profile/vehicles' },
            { title: 'Subscription', icon: 'mdi-currency-usd', href: '/application/driver/profile/subscription' },
            { title: 'Ratings', icon: 'mdi-star', href: '/application/driver/profile/ratings' },
          ]
        }else{
          this.items = []
        }
      },
      close(){
        this.dialog_change_profile = false
        this.file = null
        this.imageUrl = null
      },
      open(){
        this.dialog_change_profile = true
      },
      handleFileChange() {
        if (this.file) {
          const reader = new FileReader();

          reader.onload = (e) => {
            this.imageUrl = e.target.result;
          };

          reader.readAsDataURL(this.file);
        }
      },
      async submit(){
        let payload = {
          file : this.file ? this.file : null
        }
        let validation = this.fieldsValidation(payload)
        if(validation.error == true){
          this.errors = validation.errors
        }else{
          let fileData = new FormData()
          fileData.append("file", this.file);
          await Http.post(`${process.env.API_URL}/api/user/update-profile-picture`,
            fileData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'X-Requested-With': 'XMLHttpRequest'
              },
            }
          ).then(data => {
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
              title: data.data.message
            });
            this.REFRESH_DATA(true)
            this.close()
          }).catch((response) => {
            this.$swal.fire({
              title: `Something went wrong.`,
              text: 'Please try again.', 
              icon: 'error',
              confirmButtonColor: '#009c25',
              confirmButtonText: 'OK'
            })
            this.close()
          })
        }
      },
      close(){
        this.dialog_change_profile = false
        this.file = null
      }
    },
    mounted () {
      this.setNavBar()
    }
    
  }
</script>