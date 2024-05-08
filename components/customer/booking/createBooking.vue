<template>
  <v-layout class="d-flex justify-center">
    <v-flex md9 lg9 sm12 xs12>
      <v-card class="rounded-xl" style="opacity: 90%" dark>
        <v-card-text>
          <v-flex v-if="step == 1" class="d-flex justify-center">
            <v-layout column>
              <v-flex py-6>
                <span style="font-family: 'Trebuchet MS', sans-serif; font-size: 30px;">What's the destination?</span>
              </v-flex>
              <v-flex pa-2>
                <v-layout row wrap>
                  <v-flex lg6 md6 sm12 xs12 pa-2>
                    <GmapMap
                      :center="currentLocation"
                      :zoom="19"
                      map-type-id="terrain"
                      :options="mapOptions"
                      @click="handleMapClick"
                      style="min-height: 470px; border: solid 2px;"
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
                  <v-flex lg6 md6 sm12 xs12 pa-2>
                    <v-flex class="d-flex justify-center">
                      <v-flex>
                        <v-layout column>
                          <v-flex>
                            <v-text-field
                              v-model="fromLocation"
                              label="Pick-up Location"
                              dense
                              color="success"
                              outlined
                              persistent-placeholder
                              class="rounded-l"
                              :error-messages="errors ? errors.fromLocation ? errors.fromLocation :'':''"
                            >
                              <template v-slot:prepend-inner>
                                <div @click="fetchCurrentLocation('from')" style="cursor: pointer;">
                                  <Icon icon="mdi:map-marker-radius-outline" width="23" height="23"  style="color: #bb2124" />
                                </div>
                              </template>
                              <template v-slot:append-outer>
                                <div @click="getCoordinatesLocation('from')" style="cursor: pointer;">
                                  <Icon icon="fluent:globe-search-20-filled" width="23" height="23"  style="color: #1fbbea" />
                                </div>
                              </template>
                            </v-text-field>
                          </v-flex>
                          <v-flex>
                            <v-text-field
                              v-model="form.pickup_house_information"
                              prepend-inner-icon="mdi-map-marker"
                              clearable
                              dense
                              color="success"
                              outlined
                              label="Unit or apartment number"
                              persistent-placeholder
                              class="rounded-l"
                              :error-messages="errors ? errors.pickup_house_information ? errors.pickup_house_information :'':''"
                            ></v-text-field>
                          </v-flex>
                          <v-flex px-2>
                            <v-layout row wrap>
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
                            </v-layout>
                          </v-flex>
                          <v-flex>
                            <v-textarea
                              v-model="form.pickup_adition_remarks"
                              rows="2"
                              color="success"
                              outlined
                              placeholder="Additional location address (e.g. street number, name, house number)"
                            ></v-textarea>
                          </v-flex>
                          <v-flex>
                            <v-text-field
                              v-model="toLocation"
                              label="Drop-off Location"
                              prepend-inner-icon="mdi-map-marker"
                              color="success"
                              dense
                              outlined
                              persistent-placeholder
                              class="rounded-l"
                              :error-messages="errors ? errors.toLocation ? errors.toLocation :'':''"
                            >
                            <template v-slot:prepend-inner>
                                <div @click="fetchCurrentLocation('to')" style="cursor: pointer;">
                                  <Icon icon="mdi:map-marker-radius-outline" width="23" height="23"  style="color: #bb2124" />
                                </div>
                              </template>
                              <template v-slot:append-outer>
                                <div @click="getCoordinatesLocation('to')" style="cursor: pointer;">
                                  <Icon icon="fluent:globe-search-20-filled" width="23" height="23"  style="color: #1fbbea" />
                                </div>
                              </template>
                            </v-text-field>
                          </v-flex>
                          <v-flex>
                            <v-text-field
                              v-model="form.drop_off_house_information"
                              clearable
                              dense
                              prepend-inner-icon="mdi-map-marker"
                              color="success"
                              outlined
                              label="Unit or apartment number"
                              class="rounded-l"
                              persistent-placeholder
                              :error-messages="errors ? errors.drop_off_house_information ? errors.drop_off_house_information :'':''"
                            ></v-text-field>
                          </v-flex>
                          <v-flex class="d-flex justify-end">
                            <v-btn 
                              depressed
                              color="success" 
                              style="color:white" 
                              v-if="step < 5 " 
                              @click="continueStep(step)">
                                Continue
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-flex>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex v-if="step == 2" class="d-flex justify-center">
            <v-layout column>
              <v-flex py-6 class="d-flex justify-center">
                <span style="font-family: 'Trebuchet MS', sans-serif; font-size: 30px;">Select a Date & Time and Add Item</span>
              </v-flex>
              <v-flex>
                <v-layout row wrap>
                  <v-flex lg5 md5 sm12 xs12 pa-2 class="d-flex justify-center">
                    <v-layout column pt-7>
                      <v-card flat class="d-flex justify-center">
                        <v-flex lg8 md8 xs12 sm12>
                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="date_selected"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="date_selected"
                                label="Select day"
                                prepend-inner-icon="mdi-calendar"
                                persistent-placeholder
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                outlined
                                dense
                                class="rounded-xl"
                                :error-messages="errors ? errors.date_selected ? errors.date_selected :'':''"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="date_selected"
                              no-title
                              scrollable
                              :min="dateNow"
                              class="rounded-xl"
                            >
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                color="primary"
                                @click="menu = false"
                              >
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(date_selected)"
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-flex>
                      </v-card>
                      <v-card flat class="d-flex justify-center">
                        <v-flex lg8 md8 xs12 sm12 pa-3>
                          <v-layout row wrap>
                            <v-flex lg6 md6 xs12 sm12 class="px-1">
                              <v-menu
                                ref="dialogStart"
                                v-model="timeStartDialog"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="startTime"
                                transition="scale-transition"
                                offset-y
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="startTime"
                                    outlined
                                    dense
                                    label="Select time"
                                    persistent-placeholder
                                    prepend-inner-icon="mdi-clock-time-four-outline"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    class="rounded-xl"
                                    :error-messages="errors ? errors.startTime ? errors.startTime :'':''"
                                  ></v-text-field>
                                </template>
                                <v-time-picker
                                  v-if="timeStartDialog"
                                  v-model="startTime"
                                  no-title
                                  class="rounded-xl"
                                  @click:minute="$refs.dialogStart.save(startTime)"
                                ></v-time-picker>
                              </v-menu>
                            </v-flex>
                            <v-flex lg6 md6 xs12 sm12 class="px-1">
                              <v-menu
                                ref="dialogEnd"
                                v-model="timeEndDialog"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="endTime"
                                transition="scale-transition"
                                offset-y
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="endTime"
                                    outlined
                                    dense
                                    label="Select time"
                                    persistent-placeholder
                                    prepend-inner-icon="mdi-clock-time-four-outline"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    class="rounded-xl"
                                    :error-messages="errors ? errors.endTime ? errors.endTime :'':''"
                                  ></v-text-field>
                                </template>
                                <v-time-picker
                                  v-if="timeEndDialog"
                                  v-model="endTime"
                                  no-title
                                  class="rounded-xl"
                                  @click:minute="$refs.dialogEnd.save(endTime)"
                                ></v-time-picker>
                              </v-menu>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-card>
                      <v-card flat>
                        <v-flex class="d-flex justify-center" ma-1 mt-5>
                          <span class="font-weight-bold">Would you like to add a helper?</span>
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
                          <span class="font-weight-bold">What type of vehicle do you prefer?</span>
                        </v-flex>
                        <v-flex class="d-flex justify-center" ma-1>
                          <v-dialog
                            v-model="dialog_vehicles"
                            width="1200"
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
                              <v-card-text class="pt-5">
                                <v-layout row wrap>
                                  <v-flex lg6 md6 sm12 xs12 class="pa-2">
                                    <v-card>
                                      <v-card-title>
                                        Vehicle Specification
                                      </v-card-title>
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
                                  </v-flex>
                                  <v-flex lg6 md6 sm12 xs12 class="pa-2">
                                    <v-card>
                                      <v-card-title>
                                        Move Baseline Price
                                      </v-card-title>
                                      <v-card-text>
                                        <v-simple-table dense class="pt-3">
                                          <template v-slot:default>
                                            <thead>
                                              <tr>
                                                <th class="text-left">
                                                  Distance (Km)
                                                </th>
                                                <th class="text-left">
                                                  Price (Php)
                                                </th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              <tr
                                                v-for="(item, index) in move_price"
                                                :key="index"
                                              >
                                                <td>{{ item.distance }}</td>
                                                <td>{{ item.price }}</td>
                                              </tr>
                                            </tbody>
                                          </template>
                                        </v-simple-table>
                                      </v-card-text>
                                    </v-card>
                                  </v-flex>
                                </v-layout>
                              </v-card-text>
                            </v-card>
                          </v-dialog>
                        </v-flex>
                        <v-flex class="d-flex justify-center" ma-1>
                          <v-flex md8 lg8 xs12 sm12>
                            <v-autocomplete
                              v-model="form.vehicle_type_id"
                              outlined
                              :items="vehicle_list"
                              item-text="type"
                              return-object
                              dense
                              class="rounded-xl"
                              :error-messages="errors ? errors.vehicle_type_id ? errors.vehicle_type_id :'':''"
                            />
                          </v-flex>
                        </v-flex>
                      </v-card>
                    </v-layout>
                  </v-flex>
                  <v-flex lg7 md7 sm12 xs12>
                    <v-card flat>
                      <v-card-title>
                        <v-spacer/>
                        <v-dialog
                          v-model="dialog_add_items"
                          width="400"
                          dark
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              depressed 
                              outlined
                              small
                              text
                              v-bind="attrs"
                              v-on="on"
                              color="info">
                                Add
                            </v-btn>
                          </template>
                          <v-card class="rounded-xl">
                            <v-card-title>
                              Item Form
                            </v-card-title>
                            <v-card-text class="pb-0" >
                              <v-layout column class="pt-4">
                                <v-flex>
                                  <v-textarea
                                    outlined 
                                    dense 
                                    rows="2"
                                    label="Item"
                                    v-model="form_items.item"
                                    :error-messages="errorsItemform ? errorsItemform.item ? errorsItemform.item :'':''"
                                    persistent-placeholder>
                                  </v-textarea>
                                </v-flex>
                                <v-flex>
                                  <v-layout row wrap class="pa-2">
                                    <v-flex lg4 md4 sm12 xs12 pa-1>
                                      <v-text-field
                                        outlined
                                        dense
                                        label="Quantity"
                                        type="number"
                                        persistent-placeholder
                                        hide-spin-buttons
                                        v-model="form_items.quantity"
                                        :error-messages="errorsItemform ? errorsItemform.quantity ? errorsItemform.quantity :'':''"
                                      ></v-text-field>
                                    </v-flex>
                                    <v-flex lg4 md4 sm12 xs12 pa-1>
                                      <v-text-field
                                        outlined
                                        dense
                                        label="Height(m)"
                                        persistent-placeholder
                                        v-model="form_items.height"
                                        :error-messages="errorsItemform ? errorsItemform.height ? errorsItemform.height :'':''"
                                      ></v-text-field>
                                    </v-flex>
                                    <v-flex lg4 md4 sm12 xs12 pa-1>
                                      <v-text-field
                                        outlined
                                        dense
                                        label="Weight(kg)"
                                        persistent-placeholder
                                        v-model="form_items.weight"
                                        :error-messages="errorsItemform ? errorsItemform.weight ? errorsItemform.weight :'':''"
                                      ></v-text-field>
                                    </v-flex>
                                  </v-layout>
                                </v-flex>
                              </v-layout>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer/>
                              <v-btn
                                outlined
                                depressed
                                color="info"
                                @click="closeDialogItems"
                                >
                                Close
                              </v-btn>
                              <v-btn
                                depressed
                                color="info"
                                @click="addDialogItems"
                                >
                                Submit
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-card-title>
                      <v-card-text>
                        <v-card class="rounded-xl pt-4" light>
                          <v-simple-table
                            fixed-header
                            height="362"
                            dense>
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-left">
                                    Item
                                  </th>
                                  <th class="text-center">
                                    Quantity
                                  </th>
                                  <th class="text-center">
                                    Height
                                  </th>
                                  <th class="text-center">
                                    Weight
                                  </th>
                                  <th class="text-center">
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(item, index) in deliver_items"
                                  :key="index"
                                >
                                  <td>{{ item.item }}</td>
                                  <td class="text-center">{{ item.quantity }}</td>
                                  <td class="text-center">{{ item.height }}</td>
                                  <td class="text-center">{{ item.weight }}</td>
                                  <td class="text-center">
                                    <v-btn 
                                    icon
                                    small
                                    color="error"
                                    @click="remove(index)">
                                      <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                  </td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-card>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
                <v-flex class="d-flex justify-end pt-3">
                  <v-btn
                    depressed 
                    outlined 
                    color="success"
                    class="ma-1"
                    v-if="step > 1 "
                    @click="backStep">
                      Back
                  </v-btn>
                  <v-btn 
                    depressed
                    color="success"
                    class="ma-1"
                    style="color:white" 
                    v-if="step < 3 " 
                    @click="continueStep(step)">
                      Continue
                  </v-btn>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex v-if="step == 3" class="pt-2">
            <v-layout row wrap>
              <v-flex lg6 md6 sm12 xs12 class="px-3">
                <v-layout column>
                  <v-flex class="py-2">
                    <v-flex>
                      <v-card outlined>
                        <v-card-title class="d-flex justify-center pb-0">
                          Booking details
                        </v-card-title>
                        <v-card-text>
                          <v-layout column>
                            <span class="subtitle-2 pa-1">
                              Vehicle type: <span class="font-weight-bold text-decoration-underline">{{ form.vehicle_type_id ? form.vehicle_type_id.type : '' }}</span>
                            </span>
                            <span class="subtitle-2 pa-1">
                              Date & time: <span class="font-weight-bold text-decoration-underline">{{ form.booking_date_time_start ? form.booking_date_time_start : '' }} - {{ form.booking_date_time_end ? form.booking_date_time_end : '' }}</span>
                            </span>
                            <span class="subtitle-2 pa-1">
                              Pick-up: <span class="font-weight-bold text-decoration-underline">{{fromLocation ? fromLocation : ''}}</span>
                            </span>
                            <span class="subtitle-2 pa-1">
                              Drop-off: <span class="font-weight-bold text-decoration-underline">{{toLocation ? toLocation : ''}}</span>
                            </span>
                            <span class="subtitle-2 pa-1">
                              Notes: <span class="font-italic">{{ form.pickup_adition_remarks ? form.pickup_adition_remarks : '' }}</span>
                            </span>
                          </v-layout>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-flex>
                  <v-flex class="py-1">
                    <v-flex>
                      <v-card outlined>
                        <v-card-title class="d-flex justify-center pb-0">
                          Your information
                        </v-card-title>
                        <v-card-text>
                          <v-layout column>
                            <span class="subtitle-2 pa-1">
                              Name: <span class="font-weight-bold text-decoration-underline">{{userDetails ? userDetails.first_name ? userDetails.first_name : '' : ''}} {{userDetails ? userDetails.middle_name ? userDetails.middle_name : '' : ""}} {{userDetails ? userDetails.last_name ? userDetails.last_name : "" : ""}}</span>
                            </span>
                            <span class="subtitle-2 pa-1">
                              Contact No.: <span class="font-weight-bold text-decoration-underline">+63{{form.alt_contact_number_one ? form.alt_contact_number_one : ''}}</span>
                            </span>
                            <span class="subtitle-2 pa-1">
                              Alternative Contact No.: <span class="font-weight-bold text-decoration-underline">{{form.alt_contact_number_two ? '+63'+form.alt_contact_number_two : ''}}</span>
                            </span>
                            <span class="subtitle-2 pa-1">
                              Email: <span class="font-weight-bold text-decoration-underline">{{form.alt_email ? form.alt_email : ''}}</span>
                            </span>
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
                                        maxlength="10"
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
                                        maxlength="10"
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
                </v-layout>
              </v-flex>
              <v-flex lg6 md6 sm12 xs12 class="px-3 pt-2">
                <v-card outlined class="pa-1">
                  <v-card-title class="d-flex justify-center">
                    Booking Items
                  </v-card-title>
                  <v-card-text>
                    <v-card class="rounded-xl pt-3" light>
                        <v-simple-table
                          fixed-header
                          height="406"
                          dense>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-left">
                                  Item
                                </th>
                                <th class="text-center">
                                  Quantity
                                </th>
                                <th class="text-center">
                                  Height
                                </th>
                                <th class="text-center">
                                  Weight
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(item, index) in deliver_items"
                                :key="index"
                              >
                                <td>{{ item.item }}</td>
                                <td class="text-center">{{ item.quantity }}</td>
                                <td class="text-center">{{ item.height }}</td>
                                <td class="text-center">{{ item.weight }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                    </v-card>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
            <v-flex class="d-flex justify-end pt-3">
              <v-btn
                depressed 
                outlined 
                color="success"
                class="ma-1"
                @click="backStep">
                  Back
              </v-btn>
              <v-btn 
                class="ma-1" 
                depressed 
                color="success" 
                @click="submitFinal" 
                :loading="finalSubmitLoading"
              >
                Request Booking
              </v-btn>
            </v-flex>
          </v-flex>
        </v-card-text>
      </v-card>
    </v-flex>    
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
      dialog_add_items: false,
      dialog: false,
      menu: false,
      errors: {},
      errorsItemform: {},
      date_menu: false,
      modal: false,
      form_items: {},
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
      date_selected : null,
      helper: null,
      dialogUpdateUser: false,
      alt_contact_number_one: null,
      alt_contact_number_two: null,
      alt_email: null,
      vehicle_list: [],
      userDetails: null,
      finalSubmitLoading:false,
      currentLocation: {},
      move_price : [
        {
          distance : '1-4',
          price : '1,000'
        },
        {
          distance : '5',
          price : '1,500'
        },
        {
          distance : '6',
          price : '1,800'
        },
        {
          distance : '7',
          price : '2,000'
        },
        {
          distance : '8',
          price : '2,200'
        },
        {
          distance : '9',
          price : '2,400'
        },
        {
          distance : '10',
          price : '2,500'
        },
        {
          distance : 'Distance surcharge',
          price : 'Additional 150 per km'
        }
      ],
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
      ],
      deliver_items: [],
      dateNow: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().substr(0, 10),
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
      closeDialogItems(){
        this.dialog_add_items = false
        this.form_items = {}
        this.errorsItemform = {}
      },
      addDialogItems(){
        let payload = {
          item : this.form_items ? this.form_items.item ? this.form_items.item : null : null,
          quantity : this.form_items ? this.form_items.quantity ? this.form_items.quantity : null : null,
        }
        let validation = this.fieldsValidation(payload)
        if(validation.error == true){
          this.errorsItemform = validation.errors
        }else{
          this.$set(payload,'height', this.form_items ? this.form_items.height ? this.form_items.height : 'N/A' : 'N/A')
          this.$set(payload,'weight', this.form_items ? this.form_items.weight ? this.form_items.weight : 'N/A' : 'N/A')
          this.deliver_items.push(payload)
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
            title: "Item added."
          });
          this.form_items = {}
        }
      },
      remove(index){
        this.deliver_items.splice(index,1)
      },
      continueStep(step){
        if(step == 1) {
          let payload = {
            fromLocation : this.fromLocation ? this.fromLocation : null,
            toLocation : this.toLocation ? this.toLocation : null,
            pickup_house_information : this.form ? this.form.pickup_house_information ? this.form.pickup_house_information : null : null,
            drop_off_house_information : this.form ? this.form.drop_off_house_information ? this.form.drop_off_house_information : null : null
          }
          let validation = this.fieldsValidation(payload)
          if(validation.error == true){
            this.errors = validation.errors
          }else{
            this.errors = {}
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
            console.log(this.form)
            this.step += 1
          }
        }else if(step == 2){
          let payload = {
            date_selected : this.date_selected ? this.date_selected : null,
            startTime : this.startTime ? this.startTime : null,
            endTime : this.endTime ? this.endTime : null,
            vehicle_type_id : this.form ? this.form.vehicle_type_id ? this.form.vehicle_type_id.id : null : null 
          }
          let validation = this.fieldsValidation(payload)
          if(validation.error == true){
            this.errors = validation.errors
          }else{
            this.errors = {}
            if(moment(this.startTime, 'HH:mm').format('HH:mm') >= moment(this.endTime, 'HH:mm').format('HH:mm')){
              this.$swal.fire({
                title: `Please check the time.`,
                text: `Please ensure that the start time is after the end time.`,
                icon: 'warning',
                confirmButtonColor: '#009c25',
                confirmButtonText: 'OK'
              })
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
              this.$set(this.form, 'need_helper', this.need_helper ? this.need_helper : false)
              this.step += 1
            }
          }
        }else if(step == 3){
        }
      },
      async getCoordinatesLocation(type){
        if(type){
          try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent((type == 'from') ? this.fromLocation : this.toLocation)}&key=AIzaSyCZNcBmMDpyhmdaDGyMydNG-7iJ23BNUds`);

            if (!response.ok) {
              throw new Error('Geocoding request failed');
            }

            const data = await response.json();

            if (data.results && data.results.length > 0) {
              const location = data.results[0].geometry.location;
              this.currentLocation = {
                lat: location.lat,
                lng: location.lng
              }
              console.log(this.currentLocation)
              if(type == 'from'){
                this.fromMarkerPosition = this.currentLocation
              }else if(type == 'to'){
                this.toMarkerPosition = this.currentLocation
              }else{
                this.$swal.fire({
                  title: `We cannot find the location`,
                  text: 'Please specify the location.',
                  icon: 'warning',
                  confirmButtonColor: '#009c25',
                  confirmButtonText: 'OK'
                })
              }
            } else {
              this.$swal.fire({
                title: `We cannot find the location`,
                text: 'Please specify the location.',
                icon: 'warning',
                confirmButtonColor: '#009c25',
                confirmButtonText: 'OK'
              })
            }
          } catch (error) {
            this.$swal.fire({
              title: `Something went wrong!`,
              text: 'Please try again.',
              icon: 'error',
              confirmButtonColor: '#009c25',
              confirmButtonText: 'OK'
            })
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
        })
      },
      async submitFinal(){
        let payload = {
          alt_contact_number_one : this.form ? this.form.alt_contact_number_one ? this.form.alt_contact_number_one : null : null,
          alt_email : this.form ? this.form.alt_email ? this.form.alt_email : null : null,
        }
        let validation = this.fieldsValidation(payload)
        if(validation.error == true){
          this.$swal.fire({
            title: `Please your information.`,
            text: `Please check the contact number or the email.`,
            icon: 'warning',
            confirmButtonColor: '#009c25',
            confirmButtonText: 'OK'
          })
        }else{
          this.finalSubmitLoading = true
          this.form.vehicle_list_id = this.form.vehicle_type_id.id
          this.$set(this.form, 'booking_items', this.deliver_items)
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
      async fetchCurrentLocation(type) {
        if (navigator.geolocation) {
            await navigator.geolocation.getCurrentPosition(async position => {
              this.currentLocation = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
              };
              if(type === 'from'){
                this.fromMarkerPosition = this.currentLocation
                await this.reverseGeocode(this.currentLocation).then(data => {
                  this.fromLocation = data
                }).catch(response => {
                  this.$swal.fire({
                    title: `Something went wrong!`,
                    text: '',
                    icon: 'error',
                    confirmButtonColor: '#009c25',
                    confirmButtonText: 'OK'
                  })
                })
              }else if(type === 'to'){
                this.toMarkerPosition = this.currentLocation
                await this.reverseGeocode(this.currentLocation).then(data => {
                  this.toLocation = data
                }).catch(response => {
                  this.$swal.fire({
                    title: `Something went wrong!`,
                    text: '',
                    icon: 'error',
                    confirmButtonColor: '#009c25',
                    confirmButtonText: 'OK'
                  })
                })
              }else{
                this.$swal.fire({
                  title: `We cannot find the location`,
                  text: 'Please specify the location.',
                  icon: 'warning',
                  confirmButtonColor: '#009c25',
                  confirmButtonText: 'OK'
                }) 
              }
            },
            error => {
              this.$swal.fire({
                title: 'Permission denied.',
                text: 'Please enable the location to continue book.',
                icon: 'error',
                confirmButtonColor: '#009c25',
                confirmButtonText: 'OK'
              })
            })
        } else {
            console.log("Geolocation is not supported in this browser.");
        }
      }
    },
    mounted () {
      this.fetchCurrentLocation('from')
      this.getVehicleList()
      this.getDetails()
      // this.loadGoogleMaps()
    }
  }
</script>