<template>
  <v-layout>
    <v-container>
      <v-card>
        <v-card-text>
          <v-flex v-if="step == 1" class="d-flex justify-center pa-2">
            <v-flex pa-2>
              <v-flex class="d-flex justify-center" pa-1>
                <span class="headline font-weight-bold">Where to?</span>
              </v-flex>
              <v-flex class="d-flex justify-center" pa-1>
                <GmapMap
                  :center="{lat:7.0435, lng:125.4553}"
                  :zoom="13"
                  map-type-id="terrain"
                  :options="mapOptions"
                  @click="handleMapClick"
                  style="width: 1000px; height: 400px"
                >
                  <GmapMarker
                    v-if="fromMarkerPosition"
                    :position="fromMarkerPosition"
                    :clickable="true"
                  />
                  <GmapMarker
                    v-if="toMarkerPosition"
                    :position="toMarkerPosition"
                    :clickable="true"
                  />
                </GmapMap>
              </v-flex>
              <v-flex class="d-flex justify-center">
                <v-flex md8 sm12 lg8 xs12>
                  <v-layout wrap row mt-3 pa-2 justify-center>
                    <v-flex mx-1 class="d-flex justify-center align-center">
                      <v-text-field
                        v-model="fromLocation"
                        label="Location A"
                        prepend-inner-icon="mdi-map-marker"
                        clearable
                        dense
                        color="success"
                        outlined
                        persistent-placeholder
                        class="rounded-l"
                        :error-messages="errors ? errors.fromMarkerPosition ? errors.fromMarkerPosition :'':''"
                      ></v-text-field>
                    </v-flex>
                    <v-flex mx-1 class="d-flex justify-center align-center">
                      <v-text-field
                        v-model="toLocation"
                        label="Location B"
                        prepend-inner-icon="mdi-map-marker"
                        color="success"
                        dense
                        outlined
                        persistent-placeholder
                        class="rounded-l"
                        clearable
                        :error-messages="errors ? errors.toMarkerPosition ? errors.toMarkerPosition :'':''"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-flex>
            </v-flex>
          </v-flex>
          <v-flex v-if="step == 2" pa-3>
            <v-flex class="d-flex justify-center" ma-1>
              <span class="headline font-weight-bold">Location Details</span>
            </v-flex>
            <v-flex class="d-flex justify-center" ma-1>
              <span class="caption mx-2">Location A</span>
              <Icon icon="ion:arrow-up" width="18" height="18" :rotate="1" />
              <span class="caption mx-2">Location B</span>
            </v-flex>
            <v-flex class="d-flex justify-center" ma-1>
              <v-flex md6>
                <v-layout column>
                  <v-flex>
                    <v-text-field
                      v-model="fromLocation"
                      label="Location A"
                      prepend-inner-icon="mdi-map-marker"
                      readonly
                      dense
                      color="success"
                      outlined
                      persistent-placeholder
                      class="rounded-l"
                    ></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field
                      v-model="form.pickup_house_information"
                      clearable
                      dense
                      color="success"
                      outlined
                      placeholder="Unit or apartment number"
                      class="rounded-l"
                      :error-messages="errors ? errors.pickup_house_information ? errors.pickup_house_information :'':''"
                    ></v-text-field>
                    <v-checkbox
                      v-model="form.pickup_helper_stairs"
                      dense
                      label="Helper need to use stairs"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="form.pickup_helper_elivator"
                      dense
                      label="Helper can use elevator"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="form.pickup_ring_door"
                      dense
                      label="Need to ring doorbell"
                      outlined
                    ></v-checkbox>
                  </v-flex>
                  <v-flex>
                    <v-textarea
                      v-model="form.pickup_adition_remarks"
                      rows="1"
                      auto-grow=""
                      color="success"
                      outlined
                      placeholder="Additional location address (e.g. street number, name, house number)"
                    ></v-textarea>
                  </v-flex>
                  <v-flex>
                    <v-text-field
                      v-model="toLocation"
                      label="Location B"
                      prepend-inner-icon="mdi-map-marker"
                      readonly
                      color="success"
                      dense
                      outlined
                      persistent-placeholder
                      class="rounded-l"
                    ></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field
                      v-model="form.drop_off_house_information"
                      clearable
                      dense
                      color="success"
                      outlined
                      placeholder="Unit or apartment number"
                      class="rounded-l"
                      :error-messages="errors ? errors.drop_off_house_information ? errors.drop_off_house_information :'':''"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-flex>
          </v-flex>
          <v-flex v-if="step == 3" pa-3>
            <v-flex class="d-flex justify-center" ma-1>
              <span class="headline font-weight-bold">Select a Date & Time</span>
            </v-flex>
            <v-flex class="d-flex justify-center" ma-1>
              <v-flex md8>
                <v-flex ma-2>
                  <v-card outlined>
                    <v-sheet height="64">
                      <v-toolbar
                        flat
                      >
                        <v-btn
                          outlined
                          class="mr-4"
                          color="grey darken-2"
                          @click="setToday"
                        >
                          Today
                        </v-btn>
                        <v-btn
                          fab
                          text
                          small
                          color="grey darken-2"
                          @click="prev"
                        >
                          <v-icon small>
                            mdi-chevron-left
                          </v-icon>
                        </v-btn>
                        <v-btn
                          fab
                          text
                          small
                          color="grey darken-2"
                          @click="next"
                        >
                          <v-icon small>
                            mdi-chevron-right
                          </v-icon>
                        </v-btn>
                        <v-toolbar-title>
                          {{ date_selected | dateToWord}}
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                      </v-toolbar>
                    </v-sheet>
                    <v-sheet height="300">
                      <v-calendar
                        ref="calendar"
                        v-model="date_selected"
                        color="primary"
                        :type="type"
                      >
                      </v-calendar>
                    </v-sheet>
                  </v-card>
                </v-flex>
                <v-flex ma-2>
                  <v-card outlined>
                    <v-flex class="d-flex justify-center mt-2 ">
                      <span class="subtitle-1">My Pack&Go can start any time between</span>
                    </v-flex>
                    <v-layout row wrap pa-3>
                      <v-flex pa-3>
                        <v-dialog
                          ref="dialogStart"
                          v-model="timeStartDialog"
                          :return-value.sync="startTime"
                          persistent
                          width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              outlined
                              dense
                              v-model="startTime"
                              label="Picker in dialog"
                              prepend-inner-icon="mdi-clock-time-four-outline"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              :error-messages="errors ? errors.startTime ? errors.startTime :'':''"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="timeStartDialog"
                            v-model="startTime"
                            full-width
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="timeStartDialog = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.dialogStart.save(startTime)"
                            >
                              OK
                            </v-btn>
                          </v-time-picker>
                        </v-dialog>
                      </v-flex>
                      <v-flex pa-3>
                        <v-dialog
                          ref="dialogEnd"
                          v-model="timeEndDialog"
                          :return-value.sync="endTime"
                          persistent
                          width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              outlined
                              dense
                              v-model="endTime"
                              label="Picker in dialog"
                              prepend-inner-icon="mdi-clock-time-four-outline"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              :error-messages="errors ? errors.endTime ? errors.endTime :'':''"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="timeEndDialog"
                            v-model="endTime"
                            full-width
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="timeEndDialog = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.dialogEnd.save(endTime)"
                            >
                              OK
                            </v-btn>
                          </v-time-picker>
                        </v-dialog>
                      </v-flex>
                    </v-layout>
                    <v-flex class="d-flex justify-center">
                      <span class="caption">You'll receive a 30 minute delivery slot prior to your delivery.</span>
                    </v-flex>
                  </v-card>
                </v-flex>
              </v-flex>
            </v-flex>
          </v-flex>
          <v-flex v-if="step == 4" pa-3>
            <v-flex class="d-flex justify-center" ma-1 mt-5>
              <span class="display-1 font-weight-bold">Would you like to add a helper?</span>
            </v-flex>
            <v-flex class="d-flex justify-center">
              <div :style="helper == true ? 'background: #A5D6A7' : ''" class="rounded-lg ma-1 pa-1">
                <v-btn color="success" depressed @click="changeHelper(true)">
                  YES
                </v-btn>
              </div>
              <div :style="helper == false ? 'background: #EF9A9A' : '' " class="rounded-lg ma-1 pa-1">
                <v-btn color="error" depressed @click="changeHelper(false)">
                  NO
                </v-btn>
              </div>
            </v-flex>
            <v-flex class="d-flex justify-center" ma-1>
              <span class="display-1 font-weight-bold">What type of vehicle do you prefer?</span>
            </v-flex>
            <v-flex class="d-flex justify-center" ma-1>
              <v-dialog
                v-model="dialog_vehicles"
                width="600"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="blue"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    text
                    depressed
                    small
                    :ripple="false"
                  >
                    More information about vehicle sizes
                  </v-btn>
                </template>

                <v-card>
                  <v-card-text>
                    <v-simple-table dense class="pt-3">
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">
                              Vehicle
                            </th>
                            <th class="text-left">
                              Height (ft)
                            </th>
                            <th class="text-left">
                              Width (ft)
                            </th>
                            <th class="text-left">
                              Capacity (kg)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(item, index) in more_vehicles"
                            :key="index"
                          >
                            <td>{{ item.vehicle }}</td>
                            <td>{{ item.height }}</td>
                            <td>{{ item.width }}</td>
                            <td>{{ item.capacity }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-flex>
            <v-flex class="d-flex justify-center" ma-1>
              <v-flex md4>
                <v-autocomplete
                  v-model="form.vehicle_type_id"
                  outlined
                  :items="vehicle_list"
                  item-text="type"
                  return-object
                  dense
                  :error-messages="errors ? errors.vehicle_type_id ? errors.vehicle_type_id :'':''"
                />
              </v-flex>
            </v-flex>
          </v-flex>
          <v-flex v-if="step == 5" pa-3>
            <v-flex class="d-flex justify-center" ma-1>
              <v-flex md6>
                <v-card outlined>
                  <v-card-title class="d-flex justify-center">
                    Booking details
                  </v-card-title>
                  <v-card-text>
                    <v-layout column>
                      <v-flex>Vehicle type: {{ form.vehicle_type_id ? form.vehicle_type_id.type : '' }}</v-flex>
                      <v-flex>Date & time: {{ form.booking_date_time_start ? form.booking_date_time_start : '' }} - {{ form.booking_date_time_end ? form.booking_date_time_end : '' }}</v-flex>
                      <v-flex>Lot 34 Block 19 House 36</v-flex>
                      <v-flex>Pick-up: {{fromLocation ? fromLocation : ''}}</v-flex>
                      <v-flex>Drop-off: {{toLocation ? toLocation : ''}}</v-flex>
                      <v-card outlined class="pa-1">
                        {{ form.pickup_adition_remarks ? form.pickup_adition_remarks : '' }}
                      </v-card>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-flex>
            <v-flex class="d-flex justify-center" ma-1>
              <v-flex md6>
                <v-card outlined>
                  <v-card-title class="d-flex justify-center">
                    Your information
                  </v-card-title>
                  <v-card-text>
                    <v-layout column>
                      <v-flex>Name: {{userDetails ? userDetails.first_name ? userDetails.first_name : '' : ''}} {{userDetails ? userDetails.middle_name ? userDetails.middle_name : '' : ""}} {{userDetails ? userDetails.last_name ? userDetails.last_name : "" : ""}}</v-flex>
                      <v-flex>Contact No.: +63{{form.alt_contact_number_one ? form.alt_contact_number_one : ''}}</v-flex>
                      <v-flex>Alternative Contact No.: {{form.alt_contact_number_two ? '+63'+form.alt_contact_number_two : ''}}</v-flex>
                      <v-flex>Email: {{form.alt_email ? form.alt_email : ''}}</v-flex>
                    </v-layout>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-dialog
                      v-model="dialogUpdateUser"
                      width="400"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn 
                          small 
                          color="orange" 
                          depressed
                          v-bind="attrs"
                          v-on="on">
                          Update
                        </v-btn>
                      </template>

                      <v-card>
                        <v-card-title class="text-h6 grey lighten-2 justify-center">
                          Update Your Information
                        </v-card-title>

                        <v-card-text>
                          <v-flex pa-2  mt-4>
                            <v-layout column>
                              <v-flex>
                                <v-text-field
                                  v-model="form.alt_contact_number_one"
                                  label="Contact Number"
                                  clearable
                                  dense
                                  color="success"
                                  outlined
                                  prefix="+63"
                                  persistent-placeholder
                                  class="rounded-l"
                                ></v-text-field>
                              </v-flex>
                              <v-flex>
                                <v-text-field
                                  v-model="form.alt_contact_number_two"
                                  label="Alt. Contact Number (optional)"
                                  clearable
                                  dense
                                  color="success"
                                  prefix="+63"
                                  outlined
                                  persistent-placeholder
                                  class="rounded-l"
                                ></v-text-field>
                              </v-flex>
                              <v-flex>
                                <v-text-field
                                  v-model="form.alt_email"
                                  label="Email"
                                  clearable
                                  dense
                                  color="success"
                                  outlined
                                  persistent-placeholder
                                  class="rounded-l"
                                ></v-text-field>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="black"
                            depressed
                            @click="dialogUpdateUser = false"
                            style="color: white;"
                          >
                            Close
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-flex>
          </v-flex>
          <v-progress-linear :value="progress"></v-progress-linear>
        </v-card-text>
        <v-card-actions>
          <v-flex class="d-flex justify-end" ma-2>
            <v-btn 
              class="ma-1" 
              depressed 
              outlined 
              color="black"
              v-if="step > 1 "
              @click="backStep">
                <Icon icon="gg:arrow-up" width="25" height="25" :rotate="3" /> 
                Back
            </v-btn>
            <v-btn 
              class="ma-1" 
              depressed 
              color="black" 
              style="color:white" 
              v-if="step < 5 " 
              @click="continueStep(step)">
                Continue 
                <Icon icon="gg:arrow-up" width="25" height="25" :rotate="1" />
            </v-btn>
            <v-btn class="ma-1" depressed color="black" style="color:white" v-if="step == 5" @click="submitFinal" :loading="finalSubmitLoading">Request Booking</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-layout>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import axios from 'axios'
import Global from '~/plugins/mixins/global'
import moment from 'moment';
  export default {
    mixins: [
      Global,
    ],
    data: () => ({
      form: {},
      dialog_vehicles: false,
      dialog: false,
      errors: {},
      date_menu: false,
      modal: false,
      final_dates: null,
      step: 1,
      markers: [],
      mapOptions: {
        mapTypeId: 'roadmap', // You can set the map type to 'roadmap' to turn off terrain
        disableDefaultUI: true, // Disable default UI controls if needed
        zoomControl: true, // Enable zoom control
      },
      markerPosition: null,
      type: 'month',
      timeStartDialog: false,
      timeEndDialog: false,
      fromLocation: null,
      toLocation: null,
      fromMarkerPosition: null,
      toMarkerPosition: null,
      startTime: null,
      endTime: null,
      date_selected : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      helper: null,
      dialogUpdateUser: false,
      alt_contact_number_one: null,
      alt_contact_number_two: null,
      alt_email: null,
      vehicle_list: [],
      userDetails: null,
      finalSubmitLoading:false,
      more_vehicles: [
        {
          vehicle: 'Motorcycle',
          height: 3.5,
          width: 8,
          capacity: '150 (approx.)'
        },
        {
          vehicle: 'Jeepney Standard',
          height: 8,
          width: 6,
          capacity: '1,500 - 2,000 (approx.)'
        },
        {
          vehicle: 'Jeepney Extended',
          height: 8.5,
          width: 8,
          capacity: '2,000 - 2,500 (approx.)'
        },
        {
          vehicle: 'Taxi Sedan',
          height: 4.5,
          width: 6,
          capacity: '400 - 500 (approx.)'
        },
        {
          vehicle: 'Taxi MPV',
          height: 5,
          width: 6,
          capacity: '600 - 800 (approx.)'
        },
        {
          vehicle: '6-wheel Box Truck',
          height: 10,
          width: 7,
          capacity: '5,000 - 8,000 (approx.)'
        },
        {
          vehicle: '10-wheel Box Truck',
          height: 12,
          width: 8,
          capacity: '8,000 - 12,000 (approx.)'
        },
        {
          vehicle: 'Samll Flatbed Truc',
          height: 8,
          width: 6,
          capacity: '3,000 - 5,000 (approx.)'
        },
        {
          vehicle: 'Medium Flatbed Truck',
          height: 10,
          width: 7,
          capacity: '5,000 - 8,000 (approx.)'
        },
        {
          vehicle: 'Large Flatbed Truck',
          height: 12,
          width: 8,
          capacity: '8,000 - 12,000 (approx.)'
        },
      ]
    }),
    computed: {
      progress(){
        if(this.step == 1){
          return 20
        }else if( this.step == 2){
          return 40
        }else if( this.step == 3){
          return 60
        }else if( this.step == 4){
          return 80
        }else if( this.step == 5){
          return 100
        }
      }
    },
    methods: {
      ...mapActions('vehicle',['VEHICLE_LIST']),
      ...mapActions('users', ['GET_DETAILS_OF_CURRENT_LOGIN']),
      ...mapActions('booking', ['BOOKING_STORE']),
      changeHelper(value){
        this.helper = value
      },
      continueStep(step){
        if(step == 1) {
          let payload = {
            fromLocation : this.fromLocation,
            fromLocation : this.fromLocation
          }
          let validation = this.fieldsValidation(payload)
          if(validation.error == true){
            this.errors = validation.errors
          }else{
            this.step += 1
          }
        }else if(step == 2){
          let payload = {
            pickup_house_information : this.form.pickup_house_information,
            drop_off_house_information : this.form.drop_off_house_information
          }
          let validation = this.fieldsValidation(payload)
          if(validation.error == true){
            this.errors = validation.errors
          }else{
            let extra = {
              pick_up_location : this.fromLocation ? this.fromLocation  : null,
              pick_up_longitude : this.form ? this.fromMarkerPosition ? this.fromMarkerPosition.lng ? this.fromMarkerPosition.lng : null : null : null,
              pick_up_latitude : this.form ? this.fromMarkerPosition ? this.fromMarkerPosition.lat ? this.fromMarkerPosition.lat : null : null : null,
              drop_off_location : this.toLocation ? this.toLocation  : null,
              drop_off_longitude : this.form ? this.toMarkerPosition ? this.toMarkerPosition.lng ? this.toMarkerPosition.lng : null : null : null,
              drop_off_latitude : this.form ? this.toMarkerPosition ? this.toMarkerPosition.lat ? this.toMarkerPosition.lat : null : null : null,
              pickup_helper_stairs : this.form ? this.form.pickup_helper_stairs ? this.form.pickup_helper_stairs : false : false,
              pickup_helper_elivator : this.form ? this.form.pickup_helper_elivator ? this.form.pickup_helper_elivator : false : false,
              pickup_ring_door : this.form ? this.form.pickup_ring_door ? this.form.pickup_ring_door : false : false,
              pickup_adition_remarks : this.form.pickup_adition_remarks ? this.form.pickup_adition_remarks : null,
            }
            this.form = {
              ...this.form ,...extra
            }
            this.step += 1
          }
        }else if(step == 3){
          if(!this.date_selected){
            this.$swal.fire({
              title: `Please select a specific date.!`,
              text: '',
              icon: 'error',
              confirmButtonColor: '#009c25',
              confirmButtonText: 'OK'
            })
          }else{
            let payload = {
              startTime : this.startTime,
              endTime : this.endTime
            }
            let validation = this.fieldsValidation(payload)
            if(validation.error == true){
              this.errors = validation.errors
            }else{
              let start_date = `${this.date_selected} ${payload.startTime}:00`
              let end_date = `${this.date_selected} ${payload.endTime}:00`
              let dates = {
                booking_date_time_start : start_date ? moment(start_date).format('YYYY-MM-DD HH:mm:ss') : null,
                booking_date_time_end : end_date ? moment(end_date).format('YYYY-MM-DD HH:mm:ss') : null 
              }
              this.form = {
                ...this.form ,...dates
              }
              this.step += 1
            }
          }
        }else if(step == 4){
          let payload = {
            vehicle_type_id : this.form ? this.form.vehicle_type_id ? this.form.vehicle_type_id.id : null : null 
          }
          let validation = this.fieldsValidation(payload)
          console.log(validation)
          if(validation.error == true){
            this.errors = validation.errors
          }else{
            this.form.need_helper = this.need_helper ? this.need_helper : false,
            this.step += 1
          }
        }
      },
      backStep(){
        this.step -= 1
      },
      async handleMapClick(event) {
        const clickedPosition = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };

        if (!this.fromLocation) {
          // Set "from" location
          await this.reverseGeocode(clickedPosition).then(data => {
            this.fromLocation = data
            this.fromMarkerPosition = clickedPosition;
          }).catch(response => {
            this.$swal.fire({
              title: `Something went wrong!`,
              text: '',
              icon: 'error',
              confirmButtonColor: '#009c25',
              confirmButtonText: 'OK'
            })
          });
          
        } else if (!this.toLocation) {
          
          await this.reverseGeocode(clickedPosition).then(data => {
            this.toLocation = data
            this.toMarkerPosition = clickedPosition;
          }).catch(response => {
            this.$swal.fire({
              title: `Something went wrong!`,
              text: '',
              icon: 'error',
              confirmButtonColor: '#009c25',
              confirmButtonText: 'OK'
            })
          })
          
        } else {
          this.fromLocation = null;
          this.toLocation = null;
          this.fromMarkerPosition = null;
          this.toMarkerPosition = null;
        }
      },
      async reverseGeocode({ lat, lng }) {
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCZNcBmMDpyhmdaDGyMydNG-7iJ23BNUds`
          );

          const formattedAddress =
            response.data.results[0]?.formatted_address || 'Address not found';

          return formattedAddress;
        } catch (error) {
          return 'Error fetching address';
        }
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.form.date_selected = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
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
      async getDetails(){
        await this.GET_DETAILS_OF_CURRENT_LOGIN().then(data => {
          this.userDetails = data.data.data
          this.form.alt_contact_number_one = this.userDetails ? this.userDetails.contact_number ? this.userDetails.contact_number : null : null
          this.form.alt_email = this.userDetails ? this.userDetails.email ? this.userDetails.email : null : null
        }).catch(response => {
          console.log(response)
        })
      },
      async submitFinal(){
        this.finalSubmitLoading = true
        this.form.vehicle_list_id = this.form.vehicle_type_id.id
        await this.BOOKING_STORE(this.form).then(data => {
          this.$swal.fire({
            title: 'Thank you for your booking request!',
            text: 'One of our drivers will communicate with you in the chat box to discuss the best price for your move service. Your booking status is currently set to pending until both parties agree on the cost. We appreciate your business.',
            icon: 'success',
            confirmButtonColor: '#009c25',
            confirmButtonText: 'OK'
          })
          this.goTo('/application/customer')
          this.finalSubmitLoading = false
        }).catch( response => {
          this.finalSubmitLoading = false
          this.$swal.fire({
            title: 'Something went wrong.',
            text: 'try again later.',
            icon: 'error',
            confirmButtonColor: '#009c25',
            confirmButtonText: 'OK'
          })
        })
      }
    },
    mounted () {
      this.getVehicleList()
      this.getDetails()
    }
  }
</script>