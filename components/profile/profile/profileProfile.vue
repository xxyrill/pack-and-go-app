<template>
  <v-card flat style="background-color: transparent;">
    <v-card-title>
      <span class="headline">
        My Profile
      </span>
    </v-card-title>
    <v-card-subtitle class="d-flex aling-center pa-0 px-2">
      <span class="pa-2">
        Manage and secure your account
      </span>
      <v-flex class="text-end pa-1">
        <v-btn small color="info" @click="edit" :disabled="edit_data">
          <v-icon dense>
            mdi-pencil
          </v-icon>
          Edit
        </v-btn>
      </v-flex>
    </v-card-subtitle>
    <v-card-text>
      <v-divider/>
      <v-layout column class="pa-3 body-1">
        <v-flex class="py-4" v-if="user_data.type == 'business'">
          <v-layout row>
            <v-flex md2 lg2 sm12 xs12 class="d-flex align-center">
              <span>Business name:</span>
            </v-flex>
            <v-flex md10 lg10 sm12 xs12>
              <v-flex md6 lg6 sm12 xs12>
                <v-text-field 
                  outlined 
                  dense 
                  v-model="user_data.business_name"
                  color="success"
                  :disabled="!edit_data"
                  class="skekert rounded-xl"
                  style="font-weight: bold;"
                  :error-messages="errors ? errors.business_name ? errors.business_name :'':''"
                  ref="business_name"
                    >
                </v-text-field>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="py-4">
          <v-layout row>
            <v-flex md2 lg2 sm12 xs12 class="d-flex align-center">
              <span>Username:</span>
            </v-flex>
            <v-flex md10 lg10 sm12 xs12>
              <v-flex md6 lg6 sm12 xs12>
                <v-text-field 
                  outlined 
                  dense 
                  v-model="user_data.user_name"
                  color="success"
                  :disabled="!edit_data"
                  class="skekert rounded-xl"
                  style="font-weight: bold;"
                  ref="user_name"
                  :error-messages="errors ? errors.user_name ? errors.user_name :'':''"
                    >
                </v-text-field>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="py-4">
          <v-layout row>
            <v-flex md2 lg2 sm12 xs12 class="d-flex align-center">
            <span v-if="user_data.type == 'business'">Owner First Name:</span>
            <span v-else>First Name:</span>
            </v-flex>
            <v-flex md10 lg10 sm12 xs12>
              <v-flex md6 lg6 sm12 xs12>
                <v-text-field 
                  outlined 
                  dense 
                  v-model="user_data.first_name"
                  color="success"
                  :disabled="!edit_data"
                  class="skekert rounded-xl"
                  style="font-weight: bold;"
                  ref="first_name"
                  :error-messages="errors ? errors.first_name ? errors.first_name :'':''"
                    >
                </v-text-field>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="py-4">
          <v-layout row>
            <v-flex md2 lg2 sm12 xs12 class="d-flex align-center">
            <span v-if="user_data.type == 'business'">Owner Last Name:</span>
            <span v-else>Last Name:</span>
            </v-flex>
            <v-flex md10 lg10 sm12 xs12>
              <v-flex md6 lg6 sm12 xs12>
                <v-text-field 
                  outlined 
                  dense 
                  v-model="user_data.last_name"
                  color="success"
                  :disabled="!edit_data"
                  class="skekert rounded-xl"
                  ref="last_name"
                  style="font-weight: bold;"
                  :error-messages="errors ? errors.last_name ? errors.last_name :'':''"
                    >
                </v-text-field>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="py-4" v-if="user_data.type != 'business'">
          <v-layout row>
            <v-flex md2 lg2 sm12 xs12 class="d-flex align-center">
            <span>Middle Name:</span>
            </v-flex>
            <v-flex md10 lg10 sm12 xs12>
              <v-flex md6 lg6 sm12 xs12>
                <v-text-field 
                  outlined 
                  dense 
                  v-model="user_data.middle_name"
                  color="success"
                  :disabled="!edit_data"
                  class="skekert rounded-xl"
                  style="font-weight: bold;">
                </v-text-field>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="py-4" v-if="user_data.type != 'business'">
          <v-layout row>
            <v-flex md2 lg2 sm12 xs12 class="d-flex align-center">
            <span>Suffix:</span>
            </v-flex>
            <v-flex md10 lg10 sm12 xs12>
              <v-flex md1 lg1 sm12 xs12>
                <v-text-field 
                  outlined 
                  dense 
                  v-model="user_data.suffix"
                  color="success"
                  :disabled="!edit_data"
                  class="skekert rounded-xl"
                  style="font-weight: bold;">
                </v-text-field>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="py-4"  v-if="user_data.type != 'business'">
          <v-layout row>
            <v-flex md2 lg2 sm12 xs12 class="d-flex align-center">
            <span>Gender:</span>
            </v-flex>
            <v-flex md10 lg10 sm12 xs12>
              <v-flex md6 lg6 sm12 xs12>
                <v-radio-group
                  v-model="user_data.gender"
                  row
                  hide-details
                  class="ma-0"
                  :disabled="!edit_data"
                  dense
                  ref="gender"
                  :error-messages="errors ? errors.gender ? errors.gender :'':''"
                >
                  <v-radio
                    label="Male"
                    value="male"
                  ></v-radio>
                  <v-radio
                    label="Female"
                    value="female"
                  ></v-radio>
                </v-radio-group>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="py-4"  v-if="user_data.type != 'business'">
          <v-layout row>
            <v-flex md2 lg2 sm12 xs12 class="d-flex align-center">
            <span>Birth Date:</span>
            </v-flex>
            <v-flex md10 lg10 sm12 xs12>
              <v-flex md6 lg6 sm12 xs12>
                <v-dialog
                  ref="dia"
                  v-model="modal"
                  :return-value.sync="user_data.birth_date"
                  persistent
                  width="290px"
                  :disabled="!edit_data"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="user_data.birth_date"
                      outlined
                      dense
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      class="skekert rounded-xl"
                      style="font-weight: bold;"
                      :disabled="!edit_data"
                      ref="birth_date"
                      :error-messages="errors ? errors.birth_date ? errors.birth_date :'':''"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="user_data.birth_date"
                    scrollable
                    min="1900-01-01"
                    :max="now"
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
                      @click="$refs.dia.save(user_data.birth_date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="py-4">
          <v-layout row>
            <v-flex md2 lg2 sm12 xs12 class="d-flex align-center">
            <span>Email:</span>
            </v-flex>
            <v-flex md10 lg10 sm12 xs12>
              <v-flex md6 lg6 sm12 xs12>
                <v-text-field 
                  outlined 
                  dense 
                  v-model="user_data.email"
                  color="success"
                  class="skekert rounded-xl"
                  disabled
                  style="font-weight: bold;">
                </v-text-field>
                <profile-update-email/>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="py-4">
          <v-layout row>
            <v-flex md2 lg2 sm12 xs12 class="d-flex align-center">
            <span>Phone Number:</span>
            </v-flex>
            <v-flex md10 lg10 sm12 xs12>
              <v-flex md6 lg6 sm12 xs12>
                <v-text-field 
                  outlined 
                  dense 
                  v-model="user_data.contact_number"
                  color="success"
                  class="skekert rounded-xl"
                  prefix="+63"
                  disabled
                  style="font-weight: bold;">
                </v-text-field>
                <profile-update-contact-number/>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-divider/>
      <v-layout row class="pa-3" v-if="type == 'driver'">
        <v-flex md6 lg6 sm12 xs12>
          <v-layout column class="pa-3 body-1">
            <v-flex class="py-4">
              <v-layout row>
                <v-flex md4 lg4 sm6 xs6 class="d-flex align-center">
                <span>License no.:</span>
                </v-flex>
                <v-flex md8 lg8 sm6 xs6>
                  <v-flex md12>
                    <v-text-field
                      v-model="user_data.driver_license_number"
                      outlined 
                      dense 
                      color="success"
                      class="skekert rounded-xl"
                      :disabled="!edit_data"
                      style="font-weight: bold;"
                      ref="driver_license_number"
                      :error-messages="errors ? errors.driver_license_number ? errors.driver_license_number :'':''"
                      >
                    </v-text-field>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex class="py-4">
              <v-layout row>
                <v-flex md4 lg4 sm6 xs6 class="d-flex align-center">
                <span>Expiration date:</span>
                </v-flex>
                <v-flex md8 lg8 sm6 xs6>
                  <v-flex md12>
                    <v-dialog
                      ref="di"
                      v-model="modal_license"
                      :return-value.sync="user_data.license_expiry_date"
                      persistent
                      width="290px"
                      :disabled="!edit_data"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="user_data.license_expiry_date"
                          outlined
                          dense
                          prepend-inner-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          class="skekert rounded-xl"
                          placeholder="N/A"
                          style="font-weight: bold;"
                          :disabled="!edit_data"
                          ref="birth_date"
                          :error-messages="errors ? errors.birth_date ? errors.birth_date :'':''"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="user_data.license_expiry_date"
                        scrollable
                        :min="now"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="modal_license = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.di.save(user_data.license_expiry_date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex class="py-4">
              <v-layout row>
                <v-flex md4 lg4 sm6 xs6>
                <span>Status:</span>
                </v-flex>
                <v-flex md8 lg8 sm6 xs6>
                  <span class="font-weight-bold" style="color: green;">Active</span>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex md6 lg6 sm12 xs12>
          <v-layout row class="pa-3 body-1">
            <v-flex md6 lg6 sm12 xs12 class="pa-4">
              <v-layout column>
                <v-flex class="text-center pa-2">
                  <span>Front Photo</span>
                </v-flex>
                <v-flex class="text-center pa-2">
                  <v-hover>
                    <template v-slot:default="{ hover }">
                      <v-card
                        class="mx-auto elevation-15"
                      >
                      
                        <v-img min-height="200" max-height="200" contain :src="user_data.front_license_path ? url+'/storage/'+user_data.front_license_path : imgs.no_file"></v-img>
                        <v-fade-transition>
                          <v-overlay
                            v-if="user_data.back_license_path && hover"
                            absolute
                            color="#036358"
                          >
                            <v-btn color="orange darken-1" @click="openDialog(url+'/storage/'+user_data.front_license_path)">View ID</v-btn>
                          </v-overlay>
                        </v-fade-transition>
                      </v-card>
                    </template>
                  </v-hover>
                </v-flex>
                <v-flex class="pa-2">
                  <profile-update-license :type="'front'" :user_driver_id="user_data.user_driver_id"/>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex md6 lg6 sm12 xs12 class="pa-4">
              <v-layout column>
                <v-flex class="text-center pa-2">
                  <span>Back Photo</span>
                </v-flex>
                <v-flex class="text-center pa-2">
                  <v-hover>
                    <template v-slot:default="{ hover }">
                      <v-card
                        class="mx-auto elevation-15"
                      >
                        <v-img contain min-height="200" max-height="200" :src="user_data.back_license_path ? url+'/storage/'+user_data.back_license_path : imgs.no_file"></v-img>
                        <v-fade-transition>
                          <v-overlay
                            absolute
                            color="#036358"
                            v-if="user_data.back_license_path && hover"
                          >
                            <v-btn color="orange darken-1" @click="openDialog(url+'/storage/'+user_data.back_license_path)">View ID</v-btn>
                          </v-overlay>
                        </v-fade-transition>
                      </v-card>
                    </template>
                  </v-hover>
                </v-flex>
                <v-flex class="pa-2">
                  <profile-update-license :type="'back'" :user_driver_id="user_data.user_driver_id"/>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-divider/>
      <v-layout column class="pa-3 body-1" v-if="type == 'business'">
        <v-flex py-4>
          <v-layout row>
            <v-flex py-4>
              <span class="title">Business Information </span>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="py-4">
          <v-layout row>
            <v-flex md2 lg2 sm12 xs12 class="d-flex align-center">
              <span>Business Address:</span>
            </v-flex>
            <v-flex md10 lg10 sm12 xs12>
              <v-flex md6 lg6 sm12 xs12>
                <v-text-field 
                  outlined 
                  dense 
                  v-model="user_data.business_address"
                  color="success"
                  :disabled="!edit_data"
                  class="skekert rounded-xl"
                  style="font-weight: bold;"
                  persistent-placeholder
                  label="Street Name, Building, House No."
                  :error-messages="errors ? errors.business_address ? errors.business_address :'':''"
                    >
                </v-text-field>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="py-4">
          <v-layout row>
            <v-flex md2 lg2 sm12 xs12 class="d-flex align-center">
            </v-flex>
            <v-flex md10 lg10 sm12 xs12>
              <v-flex md6>
                <v-text-field 
                  outlined 
                  dense 
                  v-model="user_data.business_complete_address"
                  color="success"
                  :disabled="!edit_data"
                  class="skekert rounded-xl"
                  style="font-weight: bold;"
                  persistent-placeholder
                  label="Barangay, City, Province, Postal Code"
                  :error-messages="errors ? errors.business_complete_address ? errors.business_complete_address :'':''"
                    >
                </v-text-field>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="py-4">
          <v-layout row>
            <v-flex md2 lg2 sm12 xs12 class="d-flex align-center">
            <span>Business Permit Number:</span>
            </v-flex>
            <v-flex md10 lg10 sm12 xs12>
              <v-flex md6 lg6 sm12 xs12>
                <v-text-field 
                  outlined 
                  dense 
                  v-model="user_data.business_permit_number"
                  color="success"
                  :disabled="!edit_data"
                  class="skekert rounded-xl"
                  style="font-weight: bold;"
                  :error-messages="errors ? errors.business_permit_number ? errors.business_permit_number :'':''"
                    >
                </v-text-field>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="py-4">
          <v-layout row>
            <v-flex md2 lg2 sm12 xs12 class="d-flex align-center">
            <span>DTI Registration Number:</span>
            </v-flex>
            <v-flex md10 lg10 sm12 xs12>
              <v-flex md6 lg6 sm12 xs12>
                <v-text-field 
                  outlined 
                  dense 
                  v-model="user_data.business_dti_number"
                  color="success"
                  :disabled="!edit_data"
                  class="skekert rounded-xl"
                  style="font-weight: bold;"
                  :error-messages="errors ? errors.business_dti_number ? errors.business_dti_number :'':''"
                    >
                </v-text-field>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="py-4">
          <v-layout row>
            <v-flex md2 lg2 sm12 xs12 class="d-flex align-center">
            <span>Contact Person Name:</span>
            </v-flex>
            <v-flex md10 lg10 sm12 xs12>
              <v-flex md6 lg6 sm12 xs12>
                <v-text-field 
                  outlined 
                  dense 
                  v-model="user_data.business_contact_person"
                  color="success"
                  :disabled="!edit_data"
                  class="skekert rounded-xl"
                  style="font-weight: bold;"
                  :error-messages="errors ? errors.business_contact_person ? errors.business_contact_person :'':''"
                    >
                </v-text-field>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="py-4">
          <v-layout row>
            <v-flex md2 lg2 sm12 xs12 class="d-flex align-center">
            <span>Contact Person Number:</span>
            </v-flex>
            <v-flex md10 lg10 sm12 xs12>
              <v-flex md6 lg6 sm12 xs12>
                <v-text-field 
                  outlined 
                  dense 
                  v-model="user_data.business_contact_person_number"
                  color="success"
                  :disabled="!edit_data"
                  class="skekert rounded-xl"
                  style="font-weight: bold;"
                  :error-messages="errors ? errors.business_contact_person_number ? errors.business_contact_person_number :'':''"
                    >
                </v-text-field>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-divider/>
      <v-layout column  v-if="type == 'driver'">
        <v-flex md2 lg2 sm12 xs12 class="d-flex align-center">
          <span class="pa-3 body-1">Secondary ID:</span>
        </v-flex>
        <v-layout>
          <v-flex md4 lg4 sm12 xs12>
            <v-flex class="pa-2">
              <v-hover>
                <template v-slot:default="{ hover }">
                  <v-card
                    class="mx-auto elevation-15"
                  >
                  
                    <v-img min-height="200" max-height="200" contain :src="user_data.secondary_id_path ? url+'/storage/'+user_data.secondary_id_path : imgs.no_file"></v-img>
                    <v-fade-transition>
                      <v-overlay
                        v-if="user_data.secondary_id_path && hover"
                        absolute
                        color="#036358"
                      >
                        <v-btn color="orange darken-1" @click="openDialog(url+'/storage/'+user_data.secondary_id_path)">View ID</v-btn>
                      </v-overlay>
                    </v-fade-transition>
                  </v-card>
                </template>
              </v-hover>
            </v-flex>
            <v-flex class="pa-2">
              <profile-update-ids :type="'driver'" :user_driver_id="user_data.user_driver_id"/>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-layout>
      <v-flex column  v-if="type == 'business'">
        <v-layout row wrap class="pa-3">
          <v-flex md4 lg4 sm12 xs12>
            <v-flex class="d-flex align-center justify-center pa-2">
              <span class="pa-3 body-1">Government ID:</span>
            </v-flex>
            <v-layout>
              <v-flex>
                <v-flex class="pa-2">
                  <v-hover>
                    <template v-slot:default="{ hover }">
                      <v-card
                        class="mx-auto elevation-15"
                      >
                      
                        <v-img min-height="200" max-height="200" contain :src="user_data.government_id_path ? url+'/storage/'+user_data.government_id_path : imgs.no_file"></v-img>
                        <v-fade-transition>
                          <v-overlay
                            v-if="user_data.government_id_path && hover"
                            absolute
                            color="#036358"
                          >
                            <v-btn color="orange darken-1" @click="openDialog(url+'/storage/'+user_data.government_id_path)">View ID</v-btn>
                          </v-overlay>
                        </v-fade-transition>
                      </v-card>
                    </template>
                  </v-hover>
                </v-flex>
                <v-flex class="pa-2">
                  <profile-update-ids :type="'business'" :user_business_id="user_data.user_business_id"/>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex md4 lg4 sm12 xs12>
            <v-flex class="d-flex align-center justify-center pa-2">
              <span class="pa-3 body-1">DTI Registration File:</span>
            </v-flex>
            <v-layout>
              <v-flex>
                <v-flex class="pa-2">
                  <v-hover>
                    <template v-slot:default="{ hover }">
                      <v-card
                        class="mx-auto elevation-15"
                      >
                      
                        <v-img min-height="200" max-height="200" contain :src="user_data.dti_registration_path ? url+'/storage/'+user_data.dti_registration_path : imgs.no_file"></v-img>
                        <v-fade-transition>
                          <v-overlay
                            v-if="user_data.dti_registration_path && hover"
                            absolute
                            color="#036358"
                          >
                            <v-btn color="orange darken-1" @click="openDialog(url+'/storage/'+user_data.dti_registration_path)">View ID</v-btn>
                          </v-overlay>
                        </v-fade-transition>
                      </v-card>
                    </template>
                  </v-hover>
                </v-flex>
                <v-flex class="pa-2">
                  <profile-update-ids :type="'dti'" :user_business_id="user_data.user_business_id"/>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex md4 lg4 sm12 xs12>
            <v-flex class="d-flex align-center justify-center pa-2">
              <span class="pa-3 body-1">Business Permit File:</span>
            </v-flex>
            <v-layout>
              <v-flex>
                <v-flex class="pa-2">
                  <v-hover>
                    <template v-slot:default="{ hover }">
                      <v-card
                        class="mx-auto elevation-15"
                      >
                      
                        <v-img min-height="200" max-height="200" contain :src="user_data.business_permit_path ? url+'/storage/'+user_data.business_permit_path : imgs.no_file"></v-img>
                        <v-fade-transition>
                          <v-overlay
                            v-if="user_data.business_permit_path && hover"
                            absolute
                            color="#036358"
                          >
                            <v-btn color="orange darken-1" @click="openDialog(url+'/storage/'+user_data.business_permit_path)">View ID</v-btn>
                          </v-overlay>
                        </v-fade-transition>
                      </v-card>
                    </template>
                  </v-hover>
                </v-flex>
                <v-flex class="pa-2">
                  <profile-update-ids :type="'business_permit'" :user_business_id="user_data.user_business_id"/>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-divider/>
      <v-flex class="text-end pa-2">
        <v-btn small color="success" @click="save" :disabled="!edit_data" :loading="loading_save"> 
          <v-icon dense>
            mdi mdi-content-save-edit
          </v-icon>
          Save
        </v-btn>
        <v-btn small color="error" @click="cancel" :disabled="!edit_data">
          <v-icon dense>
            mdi mdi-close-thick
          </v-icon>
          Cancel
        </v-btn>
      </v-flex>
    </v-card-text>
    <v-dialog
      v-model="dialog"
      width="800"
    >
      <v-card>
        <v-card-text class="pa-0">
          <v-img :src="dialogImage" contain/>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import moment from 'moment'
import Global from '~/plugins/mixins/global'
import Imagepath from '~/plugins/mixins/imagepath'

  export default {
    mixins: [Global,Imagepath],
    props: {
      user_info:[Object]
    },
    data: () => ({
      edit_data: false,
      date: null,
      modal: false,
      modal_license: false,
      dialog: false,
      now: moment().format('YYYY-MM-DD'),
      errors: {},
      loading_save: false,
      user_data: {},
      url: process.env.API_URL,
      dialogImage: null,
      type: null
    }),
    computed: {
      ...mapGetters('login', ['log'])
    },
    watch: {
      user_info: {
        handler() {
          this.setData()
        }, deep: true
      },
      log: {
        handler() {
          this.setType()    
        }, deep: true
      },
    },
    methods: {
      ...mapActions('users', ['USER_UPDATE']),
      ...mapMutations('users', ['REFRESH_DATA']),
      setType(){
        this.type = this.log.type
      },
      setData(){
        let payload = {
          id: this.user_info ? this.user_info.id ? this.user_info.id : null : null,
          first_name: this.user_info ? this.user_info.first_name ? this.user_info.first_name : null : null,
          last_name: this.user_info ? this.user_info.last_name ? this.user_info.last_name : null : null,
          middle_name: this.user_info ? this.user_info.middle_name ? this.user_info.middle_name : null : null,
          suffix: this.user_info ? this.user_info.suffix ? this.user_info.suffix : null : null,
          user_name: this.user_info ? this.user_info.user_name ? this.user_info.user_name : null : null,
          email: this.user_info ? this.user_info.email ? this.user_info.email : null : null,
          type: this.user_info ? this.user_info.type ? this.user_info.type : null : null,
          contact_number: this.user_info ? this.user_info.contact_number ? this.user_info.contact_number : null : null,
          created_at: this.user_info ? this.user_info.created_at ? this.user_info.created_at : null : null,
          gender: this.user_info ? this.user_info.gender ? this.user_info.gender : null : null,
          new: this.user_info ? this.user_info.new ? this.user_info.new : null : null,
          profile_picture_path: this.user_info ? this.user_info.profile_picture_path ? this.user_info.profile_picture_path : null : null,
          birth_date: this.user_info ? this.user_info.birth_date ? this.user_info.birth_date : null : null,
          user_driver_id : this.user_info ? this.user_info.user_driver ? this.user_info.user_driver.id ? this.user_info.user_driver.id : null : null : null,
          vehicle_list_id : this.user_info ? this.user_info.user_driver ? this.user_info.user_driver.vehicle_list_id ? this.user_info.user_driver.vehicle_list_id : null : null : null,
          driver_license_number : this.user_info ? this.user_info.user_driver ? this.user_info.user_driver.driver_license_number ? this.user_info.user_driver.driver_license_number : null : null : null,
          front_license_path : this.user_info ? this.user_info.user_driver ? this.user_info.user_driver.front_license_path ? this.user_info.user_driver.front_license_path : null : null : null,
          back_license_path : this.user_info ? this.user_info.user_driver ? this.user_info.user_driver.back_license_path ? this.user_info.user_driver.back_license_path : null : null : null,
          make : this.user_info ? this.user_info.user_driver ? this.user_info.user_driver.make ? this.user_info.user_driver.make : null : null : null,
          year_model : this.user_info ? this.user_info.user_driver ? this.user_info.user_driver.year_model ? this.user_info.user_driver.year_model : null : null : null,
          plate_number : this.user_info ? this.user_info.user_driver ? this.user_info.user_driver.plate_number ? this.user_info.user_driver.plate_number : null : null : null,
          helper : this.user_info ? this.user_info.user_driver ? this.user_info.user_driver.helper ? this.user_info.user_driver.helper : null : null : null,
          created_at : this.user_info ? this.user_info.user_driver ? this.user_info.user_driver.created_at ? this.user_info.user_driver.created_at : null : null : null,
          license_expiry_date : this.user_info ? this.user_info.user_driver ? this.user_info.user_driver.license_expiry_date ? this.user_info.user_driver.license_expiry_date : null : null : null,
          secondary_id_path : this.user_info ? this.user_info.user_driver ? this.user_info.user_driver.secondary_id_path ? this.user_info.user_driver.secondary_id_path : null : null : null,

          user_business_id : this.user_info ? this.user_info.user_business ? this.user_info.user_business.id ? this.user_info.user_business.id : null : null : null,
          business_name : this.user_info ? this.user_info.user_business ? this.user_info.user_business.business_name ? this.user_info.user_business.business_name : null : null : null,
          business_address : this.user_info ? this.user_info.user_business ? this.user_info.user_business.business_address ? this.user_info.user_business.business_address : null : null : null,
          business_complete_address : this.user_info ? this.user_info.user_business ? this.user_info.user_business.business_complete_address ? this.user_info.user_business.business_complete_address : null : null : null,
          business_permit_number : this.user_info ? this.user_info.user_business ? this.user_info.user_business.business_permit_number ? this.user_info.user_business.business_permit_number : null : null : null,
          business_dti_number : this.user_info ? this.user_info.user_business ? this.user_info.user_business.business_dti_number ? this.user_info.user_business.business_dti_number : null : null : null,
          business_city_tourism_number : this.user_info ? this.user_info.user_business ? this.user_info.user_business.business_tourism_number ? this.user_info.user_business.business_tourism_number : null : null : null,
          business_contact_person : this.user_info ? this.user_info.user_business ? this.user_info.user_business.business_contact_person ? this.user_info.user_business.business_contact_person : null : null : null,
          business_contact_person_number : this.user_info ? this.user_info.user_business ? this.user_info.user_business.business_contact_person_number ? this.user_info.user_business.business_contact_person_number : null : null : null,
          government_id_path : this.user_info ? this.user_info.user_business ? this.user_info.user_business.government_id_path ? this.user_info.user_business.government_id_path : null : null : null,
          dti_registration_path : this.user_info ? this.user_info.user_business ? this.user_info.user_business.dti_registration_path ? this.user_info.user_business.dti_registration_path : null : null : null,
          business_permit_path : this.user_info ? this.user_info.user_business ? this.user_info.user_business.business_permit_path ? this.user_info.user_business.business_permit_path : null : null : null
        }
        this.user_data = payload
      },
      edit(){
        this.edit_data = true
      },
      cancel(){
        this.edit_data = false
      },
      save(){
        let payload = {}
        if(this.type == 'customer'){
          payload = {
            id : this.user_data ? this.user_data.id ? this.user_data.id : null : null,
            first_name : this.user_data ? this.user_data.first_name ? this.user_data.first_name : null : null,
            last_name : this.user_data ? this.user_data.last_name ? this.user_data.last_name : null : null,
            user_name : this.user_data ? this.user_data.user_name ? this.user_data.user_name : null : null,
            gender : this.user_data ? this.user_data.gender ? this.user_data.gender : null : null,
            birth_date : this.user_data ? this.user_data.birth_date ? this.user_data.birth_date : null : null,
          }
        }else if(this.type == 'driver'){
          payload = {
            id : this.user_data ? this.user_data.id ? this.user_data.id : null : null,
            first_name : this.user_data ? this.user_data.first_name ? this.user_data.first_name : null : null,
            last_name : this.user_data ? this.user_data.last_name ? this.user_data.last_name : null : null,
            user_name : this.user_data ? this.user_data.user_name ? this.user_data.user_name : null : null,
            gender : this.user_data ? this.user_data.gender ? this.user_data.gender : null : null,
            birth_date : this.user_data ? this.user_data.birth_date ? this.user_data.birth_date : null : null,
            user_driver_id : this.user_data ? this.user_data.user_driver_id ? this.user_data.user_driver_id : null : null,
            driver_license_number : this.user_data ? this.user_data.driver_license_number ? this.user_data.driver_license_number : null : null,
            license_expiry_date : this.user_data ? this.user_data.license_expiry_date ? this.user_data.license_expiry_date : null : null
          }
        }else if(this.type == 'business'){
          payload = {
            id : this.user_data ? this.user_data.id ? this.user_data.id : null : null,
            first_name : this.user_data ? this.user_data.first_name ? this.user_data.first_name : null : null,
            last_name : this.user_data ? this.user_data.last_name ? this.user_data.last_name : null : null,
            user_name : this.user_data ? this.user_data.user_name ? this.user_data.user_name : null : null,
            business_name : this.user_data ? this.user_data.business_name ? this.user_data.business_name : null : null,
            business_address : this.user_data ? this.user_data.business_address ? this.user_data.business_address : null : null,
            business_complete_address : this.user_data ? this.user_data.business_complete_address ? this.user_data.business_complete_address : null : null,
            business_permit_number : this.user_data ? this.user_data.business_permit_number ? this.user_data.business_permit_number : null : null,
            business_dti_number : this.user_data ? this.user_data.business_dti_number ? this.user_data.business_dti_number : null : null,
            business_city_tourism_number : this.user_data ? this.user_data.business_city_tourism_number ? this.user_data.business_city_tourism_number : null : null,
            business_contact_person : this.user_data ? this.user_data.business_contact_person ? this.user_data.business_contact_person : null : null,
            business_contact_person_number : this.user_data ? this.user_data.business_contact_person_number ? this.user_data.business_contact_person_number : null : null,
          }
        }
        let validation = this.fieldsValidation(payload)
        if(validation.error == true){
          this.errors = validation.errors
          let focus = Object.keys(validation.errors)
          if(focus.length > 0){
            this.$refs[focus[0]].focus()
          }
        }else{
          this.loading_save = true
          this.$set(payload, 'middle_name', this.user_data ? this.user_data.middle_name ? this.user_data.middle_name : null : null )
          this.$set(payload, 'suffix', this.user_data ? this.user_data.suffix ? this.user_data.suffix : null : null)
          this.$set(payload, 'type', this.type)
          this.USER_UPDATE(payload).then(data => {
            this.loading_save = false
            this.REFRESH_DATA(true)
            this.cancel()
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
              title: "Information update process is complete."
            });
          }).catch(response => {
            this.loading_save = false
            this.$swal.fire({
              title: `Something went wrong`,
              text: 'Please try again later.',
              icon: 'error',
              confirmButtonColor: '#009c25',
              confirmButtonText: 'OK'
            })
          })
        }
      },
      openDialog(image){
        this.dialog = true
        this.dialogImage = image
      }
    },
    mounted () {
      this.setData()
      this.setType()
    }
    
  }
</script>