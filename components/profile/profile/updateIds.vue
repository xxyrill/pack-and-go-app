<template>
  <v-flex>
    <v-btn depressed color="info" @click="openDialog" small block>UPLOAD IMAGE</v-btn>
    <v-dialog
      v-model="dialogUpdateLicense"
      width="400"
    >
      <v-card class="rounded-xl">
        <v-card-title class="d-flex justify-center">
          <span v-if="type === 'driver'">
            Secondary ID Image Uploading
          </span>
          <span v-if="type === 'business'">
            Government ID Image Uploading
          </span>
          <span v-if="type === 'dti'">
            DTI Registration Image Uploading
          </span>
          <span v-if="type === 'business_permit'">
            Business Permit Image Uploading
          </span>
        </v-card-title>
        <v-card-subtitle class="d-flex justify-center">
          <span class="text-center caption">
            Please ensure that your identification card (ID) is valid and legitimate.
          </span>
        </v-card-subtitle>
        <v-card-text class="pa-0">
          <v-layout column justify-center>
            <v-flex class="px-6">
              <v-file-input
                outlined
                v-model="file"
                prepend-icon=""
                prepend-inner-icon="mdi mdi-camera"
                accept="image/*"
                dense
                :error-messages="errors ? errors.file ? errors.file :'':''"
              />
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn small dark depressed @click="submit">Submit</v-btn>
          <v-btn small depressed color="grey darken-1" @click="close">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import Global from '~/plugins/mixins/global'
import { Http } from '~/plugins/http'
import moment from 'moment';
export default {
  props: {
    type: [String],
    user_driver_id: [Number],
    user_business_id: [Number]
  },
  mixins: [Global],
  data: () => ({
    errors: {},
    dialogUpdateLicense: false,
    file: null
  }),
  computed: {
  },
  watch: {
  },
  methods: {
    ...mapMutations('users', ['REFRESH_DATA']),
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
        fileData.append(((this.type == 'driver') ? "user_driver_details_id" : "user_business_details_id"), ((this.type == 'driver') ? this.user_driver_id : this.user_business_id));
        fileData.append("type", this.type);
        await Http.post(`${process.env.API_URL}/api/user/registration/ids`,
          fileData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'X-Requested-With': 'XMLHttpRequest'
            },
          }
        ).then(data => {
          this.$swal.fire({
            title: `ID has been updated`,
            text: '', 
            icon: 'success',
            confirmButtonColor: '#009c25',
            confirmButtonText: 'OK'
          })
          this.dialogUpdateLicense = false
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
          this.dialogUpdateLicense = false
        })
      }
    },
    openDialog(){
      this.dialogUpdateLicense = true
    },
    close(){
      this.dialogUpdateLicense = false
      this.file = null
    },
  },

  mounted () {
  }
}
</script>