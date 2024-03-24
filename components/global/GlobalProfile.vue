<template>
  <v-container>
    <v-card flat color="transparent">
      <v-card-text>
        <v-card flat color="transparent">
          <v-card-title>
            <v-layout column>
              <v-layout row>
                <v-flex md5 lg5 sm12 xs12 class="d-flex align-start mt-2">
                  <v-layout row class="pa-4">
                    <v-flex lg5 md5 sm12 xs12 class="text-center">
                      <v-avatar
                        color="primary"
                        size="120"
                      >
                        <v-img contain  :src="user_details ? user_details.profile_picture_path ? url+'/storage/'+user_details.profile_picture_path  : imgs.empty_profile :imgs.empty_profile"/>
                      </v-avatar>
                    </v-flex>
                    <v-flex lg7 md7 sm12 xs12 :class="$vuetify.breakpoint.smAndDown ? 'text-center' : '' ">
                      <h4 v-if="user_details.type == 'driver' || user_details.type == 'customer'">{{user_details ? user_details.first_name ? user_details.first_name : '' : '' | capitalfirst}} {{user_details ? user_details.last_name ? user_details.last_name : '' : '' | capitalfirst}}</h4>
                      <h4 v-else>{{user_details ? user_details.user_business ? user_details.user_business.business_name ? user_details.user_business.business_name : '' : '' : '' | capitalfirst}}</h4>
                      <h5>{{user_details ? user_details.type ? (user_details.type !== 'customer') ? user_details.type : ''  : '' : '' | capitalfirst}}</h5>
                      <v-flex>
                        <span class="subtitle-2">Contact #: {{ user_details ? user_details.contact_number ? user_details.contact_number : '' : '' }}</span>
                      </v-flex>
                      <v-flex>
                        <span class="subtitle-2">Email: {{ user_details ? user_details.email ? user_details.email : '' : '' }}</span>
                      </v-flex>
                      <v-flex>
                        <v-btn rounded v-if="user_details.user_blocked_reverse" small @click="blockUser('unblocked')" style="color:blue">Unblock User</v-btn>
                        <v-btn rounded v-else small @click="blockUser('blocked')" style="color:red">Block User</v-btn>
                      </v-flex>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-divider v-if="user_details.type !== 'customer'" :vertical="$vuetify.breakpoint.smAndDown ? false : true"/>
                <v-flex md7 lg7 sm12 xs12 class="pa-3 d-flex align-center">
                  <v-flex v-if="user_details.type === 'driver'">
                    <v-layout row wrap class="pa-3">
                      <v-flex md6 lg6 sm12 xs12>
                        <v-layout column>
                          <v-flex>
                            <h5>Vehicles: {{ user_details ? user_details.user_vehicles_count ? user_details.user_vehicles_count : '' : '' }}</h5>
                          </v-flex>
                          <v-flex>
                            <h5>Ratings: {{averageRating}} ({{this.count}} Ratings)</h5>
                          </v-flex>
                          <v-flex>
                            <h5>Helper: {{ user_details ? user_details.user_driver ? user_details.user_driver ? user_details.user_driver.helper ? '(Available)' : '(Unavailable)' : '' : '' : '' }}</h5>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex md6 lg6 sm12 xs12>
                        <v-layout column>
                          <v-flex>
                            <h5>Contact #: {{ user_details ? user_details.contact_number ? user_details.contact_number : '' : '' }}</h5>
                          </v-flex>
                          <v-flex>
                            <h5>Email: {{ user_details ? user_details.email ? user_details.email : '' : '' }}</h5>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex v-if="user_details.type === 'business'">
                    <v-layout row wrap class="pa-3">
                      <v-flex md6 lg6 sm12 xs12>
                        <v-layout column>
                          <v-flex>
                            <h5>Business Permit No.: {{ user_details ? user_details.user_business ? user_details.user_business ? user_details.user_business.business_permit_number ? user_details.user_business.business_permit_number : '' : '' : '' : '' }}</h5>
                          </v-flex>
                          <v-flex>
                            <h5>Vehicles: {{ user_details ? user_details.user_vehicles_count ? user_details.user_vehicles_count : '' : '' }}</h5>
                          </v-flex>
                          <v-flex>
                            <h5>Ratings: {{averageRating}} ({{this.count}} Ratings)</h5>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex md6 lg6 sm12 xs12>
                        <v-layout column>
                          <v-flex>
                            <h5>Contact Person: {{ user_details ? user_details.user_business ? user_details.user_business ? user_details.user_business.business_contact_person ? user_details.user_business.business_contact_person : '' : '' : '' : '' }}</h5>
                          </v-flex>
                          <v-flex>
                            <h5>Contact #: {{ user_details ? user_details.contact_number ? user_details.contact_number : '' : '' }}</h5>
                          </v-flex>
                          <v-flex>
                            <h5>Email: {{ user_details ? user_details.email ? user_details.email : '' : '' }}</h5>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-layout>
          </v-card-title>
          <v-divider/>
          <v-card-text>
            <v-container>
              <v-layout column>
                <v-layout row v-for="(item, index) of ratings" :key="index" class="py-3">
                  <v-flex md4 lg4 sm12 xs12 class="d-flex align-start mt-2">
                    <v-layout row class="pa-4">
                      <v-flex lg4 md4 sm12 xs12 class="text-center">
                        <v-avatar
                          color="primary"
                          size="80"
                        >
                          <v-img contain  :src="item ? item.customer ? item.customer.profile_picture_path ? url+'/storage/'+item.customer.profile_picture_path : imgs.empty_profile : imgs.empty_profile : imgs.empty_profile"/>
                        </v-avatar>
                      </v-flex>
                      <v-flex lg8 md8 sm12 xs12 :class="$vuetify.breakpoint.smAndDown ? 'text-center' : '' ">
                        <h3 class="mx-2">{{ item ? item.customer ? item.customer.first_name ? item.customer.first_name : '' : '' : '' }} {{ item ? item.customer ? item.customer.last_name ? item.customer.last_name : '' : '' : '' }}</h3>
                        <v-rating
                          v-model="item.rate"
                          size="20"
                          color="yellow darken-3"
                          background-color="black"
                          readonly
                        ></v-rating>
                        <h4 class="mx-2">{{ item ? item.created_at : '' | monthdayyear}}</h4>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex md8 lg8 sm12 xs12 class="pa-0 align-center">
                    <v-card class="pa-3 rounded-l" color="purple lighten-4">
                      <p class="font-italic">"{{ item ? item.additional_comment ? item.additional_comment : '' : '' }}"</p>
                    </v-card>
                    <v-flex class="text-end py-1">
                      <profile-rating-comment-store-dialog :rating="item"/>  
                    </v-flex>
                    <v-layout row v-if="item.comment" class="pa-3">
                      <v-flex md2 class="text-center">
                        <v-avatar
                          color="primary"
                          size="80"
                        >
                          <img contain :src="item 
                                                ? item.comment
                                                ? item.comment.service 
                                                ? item.comment.service.profile_picture_path 
                                                ? url+'/storage/'+item.comment.service.profile_picture_path
                                                : imgs.empty_profile 
                                                : imgs.empty_profile 
                                                : imgs.empty_profile
                                                : imgs.empty_profile"/>
                        </v-avatar>
                      </v-flex>
                      <v-flex md10>
                        <v-card class="pa-3 rounded-l" color="purple lighten-4">
                          <p class="font-italic">"{{ item ? item.comment ? item.comment.comment : '' : '' }}"</p>
                        </v-card>
                        <v-card flat>
                          <v-card-actions>
                            <v-spacer/>
                            <profile-rating-comment-update-dialog :rating="item"/>
                            <v-btn small color="error" text @click="deleteComment(item.comment.id)">Delete</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-pagination
              v-model="page"
              :length="pageCount"
              :total-visible="5"
              @input="updatePage"
              prev-icon="mdi-arrow-left-bold-outline"
              next-icon="mdi-arrow-right-bold-outline"
              circle
            ></v-pagination>
          </v-card-actions>
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import Global from '~/plugins/mixins/global'
import Imagepath from '~/plugins/mixins/imagepath'
import axios from 'axios'
  export default {
    mixins: [Imagepath,Global],
    data: () => ({
      ratings : [],
      url: process.env.API_URL,
      page: 1,
      rating: {},
      show: false,
      form: {skip: 0, take: 3 },
      url: process.env.API_URL,
      count: 0,
      user_details: {}
    }),
    computed: {
      ...mapGetters('users', ['refresh_ratings']),
      ...mapGetters('login', ['log']),
      averageRating(){
        if(this.rating.total_stars && this.rating.rating_numbers){
          let total = 0
          total = parseInt(this.rating.total_stars) / this.rating.rating_numbers
          return total
        }else{
          return 0
        }
      },
      pageCount () {
        if (this.form.take == null ||
                  this.count == null
        ) return 0

        return Math.ceil(this.count / this.form.take)
      }
    },
    watch: {
    refresh_ratings: {
      handler() {
        if(this.refresh_ratings == true){
          this.getRatings()
        }
      }, deep: true
    },
  },
    methods: {
      ...mapActions('users', ['USER_RATINGS', 'USER_RATINGS_COMMENT_DELETE', 'USER_RATINGS_STARS', 'USER_DETAILS', 'USER_BLOCKED']),
      ...mapMutations('users', ['REFRESH_RATINGS_DATA']),
      async getRatings(){
        await this.USER_RATINGS(this.form).then(data => {
          this.ratings = data.data.data
          this.count = data.data.details.total
          this.REFRESH_RATINGS_DATA(false)
        })
      },
      updatePage (pageIndex) {
        this.page = pageIndex
        this.form.skip = pageIndex === 1 ? 0 : (pageIndex - 1) * 3
        this.getRatings()
      },
      async deleteComment(id){
        this.$swal.fire({
          title: `Are you sure you want to delete this comment?`,
          text: "This action cannot be undone.",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#009c25',
          cancelButtonColor: '#b6b6b6',
          confirmButtonText: 'Yes!',
          cancelButtonText: 'Cancel'
        }).then(async result => {
          if (result.isConfirmed) {
            let payload = {
              id : id
            }
            await this.USER_RATINGS_COMMENT_DELETE(payload).then(data => {
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
                title: 'Comment successfully removed.'
              });
              this.getRatings()
            })
          }
        })
      },
      async getRating(){
        await this.USER_RATINGS_STARS().then(data => {
          this.rating = data.data
        })
      },
      async getUserData(){
        let payload = {
          id: this.$route.params ? this.$route.params.id ? this.$route.params.id : null : null
        }
        await this.USER_DETAILS(payload).then(data => {
          this.user_details = data.data.data
        }).catch(response => {
          if(response.response.status == 404){
            if(this.log.type == 'customer'){
              this.goTo('/application/customer')
            }else if(this.log.type == 'business'){
              this.goTo('/application/business')
            }else if(this.log.type == 'driver'){
              this.goTo('/application/driver')
            }else{
              this.goTo('/')
            }
          }
        })
      },
      async blockUser(type){
        this.$swal.fire({
          title: `Are you certain you want to proceed with blocking this individual?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#009c25',
          cancelButtonColor: '#b6b6b6',
          confirmButtonText: 'Yes!',
          cancelButtonText: 'Cancel'
        }).then(async result => {
          if (result.isConfirmed) {
            let payload = {
              blocked_user : this.$route.params ? this.$route.params.id ? this.$route.params.id : null : null,
              type : type
            }
            await this.USER_BLOCKED(payload).then(data => {
              this.getUserData()
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
                title: (type == 'blocked') ? `The user's access has been temporarily restricted` : `The user's access has been restored.`
              });
            })
          }
        })
        
      }
    },
    mounted () {
      this.getRatings()
      this.getRating()
      this.getUserData()
    }
    
  }
</script>