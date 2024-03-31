<template>
  <v-card flat style="background-color: transparent;">
    <v-card-title>
      <span class="headline">
        Ratings
      </span>
    </v-card-title>
    <v-card-subtitle>
      <v-flex>
        <span>
          View customer ratings of your service
        </span>
      </v-flex>
      <v-flex class="py-3" v-if="averageRating <= 3 && rating.rating_numbers >= 40">
        <v-card flat class="rounded-xl pa-2" color="warning">
          <span class="font-weight-bold">Attention:</span><span>Your account is penalized for 7 days from today due to a very low rating.</span>
          <v-tooltip bottom max-width="300">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="black"
                class="pa-0 ma-0"
                text
                v-bind="attrs"
                v-on="on"
              >
                <span class="font-weight-bold text-decoration-underline">WHAT'S THIS?</span>
              </v-btn>
            </template>
            <span>Your rating is below 3.0 and your account will not be able to receive bookings for 7 days
              from today. Your account will resume to get new bookings after 7 days and please ensure
              that you need to get a rating of above 3.0 to remove the penalty.
            </span>
          </v-tooltip>
        </v-card>
      </v-flex>
    </v-card-subtitle>
    <v-divider/>
    <v-card-text>
      <v-card flat>
        <v-card-title>
          <span>Ratings: {{ averageRating }} ({{rating.rating_numbers ?? 0}} ratings)</span>
        </v-card-title>
        <v-card-text>
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
        </v-card-text>
        <v-divider/>
        <v-card-actions class="d-flex justify-center">
          <v-pagination
            v-model="page"
            :length="pageCount"
            :total-visible="5"
            @input="updatePage"
            circle
            navigation-color="blue lighten-3"
            navigation-text-color="black"
          ></v-pagination>
        </v-card-actions>
      </v-card>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import Global from '~/plugins/mixins/global'
import Imagepath from '~/plugins/mixins/imagepath'
import axios from 'axios'
  export default {
    mixins: [Imagepath,Global],
    props: {
      user_info:[Object]
    },
    data: () => ({
      ratings : [],
      url: process.env.API_URL,
      page: 1,
      rating: {},
      show: false,
      form: {skip: 0, take: 3 },
      count: 0,
    }),
    computed: {
      ...mapGetters('users', ['refresh_ratings']),
      averageRating(){
        if(this.rating.total_stars && this.rating.rating_numbers){
          let total = 0
          total = parseInt(this.rating.total_stars) / this.rating.rating_numbers
          return total.toFixed(1)
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
      ...mapActions('users', ['USER_RATINGS', 'USER_RATINGS_COMMENT_DELETE', 'USER_RATINGS_STARS']),
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
      }
    },
    mounted () {
      this.getRatings()
      this.getRating()
    }
    
  }
</script>