<template>
  <v-flex class="pa-1">
    <v-btn
      text
      @click="openDialog"
      color="primary"
      v-if="!rating.comment"
      small
    >
      Reply
    </v-btn>
    <v-dialog
      v-model="dialog_rating_comment_dialog"
      width="500"
    >
      <v-card rounded>
        <v-card-title>
          Share your thoughts in response.
        </v-card-title>
        <v-card-text class="py-0">
          <v-flex class="text-center">
            <v-textarea
              v-model="comment"
              outlined
              label="Your comment here..."
              persistent-placeholder
              small
              auto-grow
              class="rounded-xl"
            >

            </v-textarea>
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn depressed color="success" small @click="storeComment">Submit</v-btn>
          <v-btn depressed color="black" style="color: white;" small @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import Global from '~/plugins/mixins/global'
import moment from 'moment';
export default {
  mixins: [Global],
  props: {
    rating: [Object]
  },
  data: () => ({
    dialog_rating_comment_dialog: false,
    comment: null
  }),
  computed: {
  },
  watch: {
  },
  methods: {
    ...mapActions('users',['USER_RATING_COMMENT_STORE']),
    ...mapMutations('users', ['REFRESH_RATINGS_DATA']),
    openDialog(){
      this.dialog_rating_comment_dialog = true
    },
    closeDialog(){
      this.dialog_rating_comment_dialog = false
      this.comment = null
    },
    async storeComment(){
      let payload = {
        user_rating_id : this.rating ? this.rating.id : '',
        comment : this.comment ? this.comment : ''
      }
      await this.USER_RATING_COMMENT_STORE(payload).then(data => {
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
          title: 'Successfully posted your comment.'
        });
        this.REFRESH_RATINGS_DATA(true)
        this.closeDialog()
      }).catch(response => {
        this.closeDialog()
      })
    }
  },

  mounted () {
  }
}
</script>