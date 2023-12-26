<template>
  <v-layout>
    <v-container>
      <v-card>
        <v-flex v-if="step == 1" class="d-flex justify-center pa-2">
          <v-layout column justify-center align-center pa-2>
            <v-flex pa-1>
              <span class="headline font-weight-bold">Where to?</span>
            </v-flex>
            <v-flex pa-1>
              <GmapMap
                :center="{lat:7.0435, lng:125.4553}"
                :zoom="13"
                map-type-id="terrain"
                :options="mapOptions"
                @click="handleMapClick"
                style="width: 1000px; height: 400px"
              >
                <GmapMarker
                  v-if="markerPosition"
                  :position="markerPosition"
                  :clickable="true"
                />
              </GmapMap>
            </v-flex>
            <v-flex>
              <v-layout wrap row mt-3 pa-2>
                <v-flex mx-1>
                  <v-text-field
                    label="Location A"
                    prepend-inner-icon="mdi-map-marker"
                    clearable
                    readonly
                    dense
                    color="success"
                    outlined
                    persistent-placeholder
                    class="rounded-l"
                  ></v-text-field>
                </v-flex>
                <v-flex mx-1 mt-1>
                  <Icon icon="gravity-ui:arrow-up" width="30" height="30" :rotate="1" />
                </v-flex>
                <v-flex mx-1>
                  <v-text-field
                    label="Location B"
                    prepend-inner-icon="mdi-map-marker"
                    readonly
                    color="success"
                    dense
                    outlined
                    persistent-placeholder
                    class="rounded-l"
                    clearable
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex v-if="step == 2">
          step2
        </v-flex>
        <v-flex v-if="step == 3">
          step3
        </v-flex>
        <v-flex v-if="step == 3">
          step3
        </v-flex>
        <v-flex v-if="step == 3">
          step3
        </v-flex>
        
        <v-progress-linear value="20"></v-progress-linear>
      </v-card>
    </v-container>
  </v-layout>
</template>
<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
  export default {
    data: () => ({
      form: {},
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
      markerPosition: null
    }),

    methods: {
      async handleMapClick(event) {
        this.markerPosition = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };

        // Reverse geocode the coordinates to get the address
        const address = await this.reverseGeocode(this.markerPosition);

        // Log the coordinates and address to the console
        console.log('Clicked position:', this.markerPosition);
        console.log('Address:', address);
      },
      async reverseGeocode({ lat, lng }) {
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCZNcBmMDpyhmdaDGyMydNG-7iJ23BNUds`
          );

          // Extract the formatted address from the response
          const formattedAddress =
            response.data.results[0]?.formatted_address || 'Address not found';

          return formattedAddress;
        } catch (error) {
          console.error('Error fetching address:', error);
          return 'Error fetching address';
        }
      },
    }
  }
</script>