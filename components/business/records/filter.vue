<template>
  <div>
    <v-flex md5 lg5 sm12 xs12 class="px-3">
      <v-text-field
        outlined
        dense
        class="rounded-xl"
        v-model="form.search"
        persistent-placeholder
        label="Search by delivery info"
        color="success"
        append-outer-icon="mdi-magnify"
        @keyup.enter="filter"
        @click:append-outer="filter"
      />
    </v-flex>
    <v-layout class="px-3">
      <v-spacer></v-spacer>
      <v-flex md3 lg3 sm6 lg6 pa-1>
        <v-autocomplete
          outlined
          dense
          v-model="form.status"
          :items="statuses"
          item-value="value"
          item-text="name"
          class="rounded-xl"
          persistent-placeholder
          label="Status"
          hide-selected
          color="success"
          @change="filter"
          clearable
          prepend-icon="mdi-refresh"
          @click:prepend="refresh"
        >
        </v-autocomplete>
      </v-flex>
      <v-flex md3 lg3 sm6 lg6 pa-1>
        <v-dialog
          v-model="modal"
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="form.date_range"
              label="Booking created"
              prepend-inner-icon="mdi-calendar"
              readonly
              dense
              outlined
              class="rounded-xl"
              persistent-placeholder
              v-bind="attrs"
              v-on="on"
              color="success"
              @click:clear="clear"
              clearable
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="form.date"
            scrollable
            range
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="modal = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="dateRange"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
    </v-layout>
    
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
  export default {
    data: () => ({
      form: {},
      date_menu: false,
      modal: false,
      final_dates: null,
      statuses: [
        { name : 'Pending', value : 'pending'},
        { name : 'Confirmed', value : 'confirmed'},
        { name : 'Reschedule', value : 'reschedule'},
        { name : 'Completed', value : 'completed'},
        { name : 'Cancelled', value : 'cancelled'}
      ]
    }),

    methods: {
      ...mapMutations('booking', ['SET_FILTERS', 'SET_REFRESH']),
      filter(){
        let payload = {
          search : this.form ? this.form.search ? this.form.search : null : null,
          status : this.form ? this.form.status ? this.form.status : null : null,
          date_range : this.form ? this.form.date_range ? this.form.date_range : null : null
        }
        this.SET_FILTERS(payload)
      },
      dateRange(){
        if(this.form.date){
          if(this.form.date.length == 2){
            if(this.form.date[0] < this.form.date[1]){
              this.form.date_range = this.form.date
              this.modal = false
              this.filter()
            }else{
              this.toastMessage('Ensure the selected start date is after the end date.')  
            }
          }else{
            this.toastMessage('Make sure to include both the beginning and ending dates.')
          }
        }else{
          this.toastMessage('Indicate your preferred dates.')
        }
      },
      toastMessage(message){
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
          title: message
        });
      },
      refresh(){
        this.SET_REFRESH(true)
      },
      clear(){
        this.$delete(this.form, 'date_range')
        this.$delete(this.form, 'date')
        this.filter()
      },
      mount(){
        this.SET_FILTERS({})
      }
    },
    mounted () {
      this.mount()
    }
  }
</script>