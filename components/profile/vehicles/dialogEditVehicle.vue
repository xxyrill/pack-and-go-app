<template>
  <v-flex class="ma-0">
    <v-btn icon @click="addVehicle">
      <v-icon
        color="info"
      >
        mdi-pencil
      </v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog_add_vehicle"
      width="600"
    >
      <v-card class="rounded-xl">
        <v-card-title class="d-flex justify-center">
          <span>
            Edit vehicle
          </span>
        </v-card-title>
        <v-card-text class="pa-1">
          <v-layout column class="pa-4" justify-center>
            <v-flex class="px-2">
              <v-autocomplete
                v-model="items.vehicle_list_id"
                outlined
                :items="vehicle_list"
                label="Type"
                item-text="type"
                item-value="id"
                persistent-placeholder
                dense
                :error-messages="errors ? errors.vehicle_list_id ? errors.vehicle_list_id :'':''"
              />
            </v-flex>
            <v-flex>
              <v-layout row class="pa-3">
                <v-flex class="px-2">
                  <v-text-field
                    outlined
                    label="Make"
                    v-model="items.make"
                    persistent-placeholder
                    dense
                    :error-messages="errors ? errors.make ? errors.make :'':''"
                  />
                </v-flex>
                <v-flex class="px-2">
                  <v-text-field
                    outlined
                    label="Year Model"
                    v-model="items.year_model"
                    persistent-placeholder
                    dense
                    :error-messages="errors ? errors.year_model ? errors.year_model :'':''"
                  />
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex class="px-2">
              <v-text-field
                outlined
                label="Plate Number"
                v-model="items.plate_number"
                persistent-placeholder
                dense
                :error-messages="errors ? errors.plate_number ? errors.plate_number :'':''"
              />
            </v-flex>
            <v-flex>
              <v-layout row class="pa-3">
                <v-flex lg6 md6 sm12 xs12 class="px-2">
                  <v-file-input
                    outlined
                    label="Official Receipt"
                    v-model="form.or"
                    persistent-placeholder
                    prepend-icon=""
                    prepend-inner-icon="mdi-camera"
                    dense
                    :error-messages="errors ? errors.or ? errors.or :'':''"
                  >
                    <template v-slot:selection="{ text }">
                      <v-chip
                        small
                        label
                        color="primary"
                      >
                        {{ text }}
                      </v-chip>
                    </template>
                  </v-file-input>
                </v-flex>
                <v-flex lg6 md6 sm12 xs12 class="px-2">
                  <v-file-input
                    outlined
                    label="Certificate of Registration"
                    v-model="form.cr"
                    persistent-placeholder
                    prepend-icon=""
                    prepend-inner-icon="mdi-camera"
                    dense
                    :error-messages="errors ? errors.cr ? errors.cr :'':''"
                  >
                    <template v-slot:selection="{ text }">
                      <v-chip
                        small
                        label
                        color="primary"
                      >
                        {{ text }}
                      </v-chip>
                    </template>
                  </v-file-input>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn small dark depressed @click="submit">Confirm</v-btn>
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
import moment from 'moment';
import { Http } from '~/plugins/http'

export default {
  mixins: [Global],
  props: {
    items: [Object]
  },
  data: () => ({
    errors: {},
    dialog_add_vehicle: false,
    vehicle_list: [],
    form: {}
  }),
  computed: {
  },
  watch: {
  },
  methods: {
    ...mapActions('vehicle',['VEHICLE_LIST']),
    ...mapActions('users', ['USER_VEHICLE_STORE', 'USER_VEHICLE_UPDATE']),
    ...mapMutations('users', ['REFRESH_DATA_VEHICLES']),
    async getVehicleList(){
      let payload = {
        order_by : "type",
        sort_by : "asc"
      }
      await this.VEHICLE_LIST(payload).then(data => {
        this.vehicle_list = data.data.data
      }).catch(response => {
        this.$swal.fire({
            title: `Something went wrong.`,
            text: '',
            icon: 'error',
            confirmButtonColor: '#009c25',
            confirmButtonText: 'OK'
          })
      })
    },
    async submit(){
      let payload = {
        vehicle_list_id : this.items ? this.items.vehicle_list_id ? this.items.vehicle_list_id : null : null,
        make : this.items ? this.items.make ? this.items.make : null : null,
        year_model : this.items ? this.items.year_model ? this.items.year_model : null : null,
        plate_number : this.items ? this.items.plate_number ? this.items.plate_number : null : null,
      }
      let validation = this.fieldsValidation(payload)
      if(validation.error == true){
        this.errors = validation.errors
      }else{
        this.errors = {}
        this.$set(payload, 'id', this.items.id)
        await this.USER_VEHICLE_UPDATE(payload).then(async data => {
          if(this.form.or){
            await this.uploadDocuments('or', this.items.id, this.form.or)
          }
          if(this.form.cr){
            await this.uploadDocuments('cr', this.items.id, this.form.cr)
          }
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
          this.REFRESH_DATA_VEHICLES(true)
          this.close()
        }).catch(response => {
          this.errors = response.response.data.errors
        })
      }
    },
    async uploadDocuments(type, id, file){
      let fileData = new FormData()
      fileData.append("file", file);
      fileData.append("user_vehicle_id", id);
      fileData.append("type", type);
      await Http.post(`${process.env.API_URL}/api/user-vehicle/upload-documents`,
        fileData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-Requested-With': 'XMLHttpRequest'
          },
        }
      ).catch(() => {
        this.$swal.fire({
          title: `Something went wrong.`,
          text: 'Please try again.', 
          icon: 'error',
          confirmButtonColor: '#009c25',
          confirmButtonText: 'OK'
        })
      })
    },
    async addVehicle(){
      await this.getVehicleList()
      this.dialog_add_vehicle = true
    },
    close(){
      this.form = {}
      this.dialog_add_vehicle = false
    },
  },

  mounted () {
  }
}
</script>