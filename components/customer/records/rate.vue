<template>
  <v-flex class="pa-1">
    <v-btn
      small
      depressed
      color="yellow"
      block
      @click="opendialog"
      :disabled="(booking.status == 'completed' && booking.rated == false) ? false : true"
    >
      Rate
    </v-btn>
    <v-dialog
      v-model="dialogRate"
      width="400"
    >
      <v-card>
        <v-card-text class="py-0">
          <v-layout pa-2 column>
            <v-flex class="pa-1 rounded-xl text-center" style="background-color: #E0E0E0;">
              <span class="font-weight-black subtitle-1 "> Move Service Feedback</span>
            </v-flex>
            <v-flex class="pa-1">
              <v-layout column>
                <span class="pa-1 title font-weight-black text-center">Overall Satisfaction</span>
                <span class="pa-1 caption text-center">Rate your overall satisfaction with the driver's service, including factors like professionalism, care for items, communication, and punctuality.</span>
                <v-flex class="text-center">
                  <v-rating
                    v-model="form.rating"
                    color="yellow darken-3"
                    background-color="black"
                    hover
                    large
                  ></v-rating>
                </v-flex>
                <v-flex>
                  <v-textarea 
                    v-model="form.additional_comment" 
                    dense 
                    full-width
                    row-height="12" 
                    auto-grow
                    outlined 
                    no-resize
                    placeholder="Add comment..."/>
                </v-flex>
                <v-flex class="text-center">
                  <v-flex>
                    <v-btn depressed color="grey lighten-1" small @click="close">Cancel</v-btn>
                    <v-btn depressed color="success" small @click="save">Submit</v-btn>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
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
    booking: [Object]
  },
  data: () => ({
    dialogRate: false,
    dialogCancel: false,
    form: {},
    errors: {}
    
  }),
  computed: {
  },
  watch: {
  },
  methods: {
    ...mapMutations('booking', ['SET_REFRESH']),
    ...mapActions('users', ['USER_RATE']),
    opendialog(){
      this.dialogRate = true
    },
    close(){
      this.dialogRate = false
      this.form = {}
      this.errors = {}
    },
    save(){
      if(this.form.rating){
        let payload = {
          service_user_id : this.booking.user_driver_id,
          booking_id : this.booking.id,
          rate : this.form.rating,
          additional_comment : this.form.additional_comment,
        }
        this.USER_RATE(payload).then(data => {
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
            title: "We've securely stored your valuable feedback."
          });
          this.SET_REFRESH(true)
          this.close()
        }).catch(response => {
          this.$swal.fire({
            title: `Something went wrong!`,
            text: '',
            icon: 'error',
            confirmButtonColor: '#009c25',
            confirmButtonText: 'OK'
          })
          this.close()
        })
      }else{
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
            icon: "error",
            title: "Your rating is important; please provide a corresponding value."
          });
      }
    }
  },

  mounted () {
  }
}
</script>