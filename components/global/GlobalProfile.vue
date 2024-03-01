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
                        <v-img contain  :src="imgs.empty_profile"/>
                      </v-avatar>
                    </v-flex>
                    <v-flex lg7 md7 sm12 xs12 :class="$vuetify.breakpoint.smAndDown ? 'text-center' : '' ">
                      <h3 class="mx-2">Jay Mar M. Mendoza</h3>
                      <h4 class="mx-2">Driver</h4>
                      <v-flex>
                        <v-btn>Chat</v-btn>
                        <v-btn>Block</v-btn>
                      </v-flex>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex md7 lg7 sm12 xs12 class="pa-0 align-center">
                  <v-layout row wrap class="pa-3">
                    <v-flex md6 lg6 sm12 xs12>
                      <v-layout column>
                        <v-flex>
                          <span>Vehicles: 2</span>
                        </v-flex>
                        <v-flex>
                          <span>Ratings: 4.0 (5 Ratings)</span>
                        </v-flex>
                        <v-flex>
                          <span>Helper: Available</span>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex md6 lg6 sm12 xs12>
                      <v-layout column>
                        <v-flex>
                          <span>Vehicles: 2</span>
                        </v-flex>
                        <v-flex>
                          <span>Ratings: 4.0 (5 Ratings)</span>
                        </v-flex>
                        <v-flex>
                          <span>Helper: Available</span>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
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
        let total = 0
        total = parseInt(this.rating.total_stars) / this.rating.rating_numbers
        return total
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