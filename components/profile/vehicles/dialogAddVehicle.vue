<template>
  <v-flex>
    <v-btn depressed color="info" @click="addVehicle" small>Add Vehicle</v-btn>
    <v-dialog
      v-model="dialog_add_vehicle"
      width="600"
    >
      <v-card class="rounded-xl">
        <v-card-title class="d-flex justify-center">
          <span>
            Adding Vehicle's
          </span>
        </v-card-title>
        <v-card-text class="pa-1">
          <v-layout column class="pa-4" justify-center>
            <v-flex class="px-2">
              <v-autocomplete
                v-model="form.vehicle_list_id"
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
                    v-model="form.make"
                    persistent-placeholder
                    dense
                    :error-messages="errors ? errors.make ? errors.make :'':''"
                  />
                </v-flex>
                <v-flex class="px-2">
                  <v-text-field
                    outlined
                    label="Year Model"
                    v-model="form.year_model"
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
                v-model="form.plate_number"
                persistent-placeholder
                dense
                :error-messages="errors ? errors.plate_number ? errors.plate_number :'':''"
              />
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
export default {
  mixins: [Global],
  data: () => ({
    errors: {},
    form: {},
    dialog_add_vehicle: false,
    vehicle_list: []
  }),
  computed: {
  },
  watch: {
  },
  methods: {
    ...mapActions('vehicle',['VEHICLE_LIST']),
    ...mapActions('users', ['USER_VEHICLE_STORE']),
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
        vehicle_list_id : this.form ? this.form.vehicle_list_id ? this.form.vehicle_list_id : null : null,
        make : this.form ? this.form.make ? this.form.make : null : null,
        year_model : this.form ? this.form.year_model ? this.form.year_model : null : null,
        plate_number : this.form ? this.form.plate_number ? this.form.plate_number : null : null,
      }
      let validation = this.fieldsValidation(payload)
      if(validation.error == true){
        this.errors = validation.errors
      }else{
        this.errors = {}
        await this.USER_VEHICLE_STORE(payload).then(data => {
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
    async addVehicle(){
      await this.getVehicleList()
      this.dialog_add_vehicle = true
    },
    close(){
      this.dialog_add_vehicle = false
      this.form = {}
    },
  },

  mounted () {
  }
}
</script>