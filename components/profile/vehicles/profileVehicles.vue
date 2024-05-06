  <template>
  <v-card flat style="background-color: transparent;">
    <v-card-title>
      <span class="headline">
        My Vehicles
      </span>
    </v-card-title>
    <v-card-subtitle>
      <span>
        Manage your vehicles
      </span>
    </v-card-subtitle>
    <v-card-text>
      <v-layout column>
        <v-flex class="text-end pa-1" v-if="type !== 'driver'">
          <dialog-add-vehicle/>
        </v-flex>
        <v-flex class="pa-1">
          <v-card outlined>
            <v-data-table
              :headers="headers"
              :items="items"
              hide-default-footer
              flat
            >
            <template v-slot:item.status="{ item }">
              <span style="color: green;">Active</span>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-flex class="d-flex align-center">
                <v-flex class="ma-0">
                  <dialog-edit-vehicle :items="item"/>
                </v-flex>
                <v-flex class="ma-0">
                  <v-btn icon @click="deleteVehicle(item)">
                    <v-icon
                      color="error"
                    >
                      mdi-toggle-switch-off-outline
                    </v-icon>
                  </v-btn>
                </v-flex>
              </v-flex>
            </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import axios from 'axios'
  export default {
    props: {
      user_info:[Object]
    },
    data: () => ({
      vehicles: [],
      headers: [
        { text: 'Type', align: 'start', sortable: false, value: 'vehicle.type'},
        { text: 'Make', align: 'center', sortable: false, value: 'make'},
        { text: 'Year Model', align: 'center', sortable: false, value: 'year_model'},
        { text: 'Plate Number', align: 'center', sortable: false, value: 'plate_number'},
        { text: 'Status', align: 'center', sortable: false, value: 'status'},
        { text: 'Actions', align: 'center', sortable: false, value: 'actions'},
      ],
      items: [],
      type: null
    }),
    computed: {
      ...mapGetters('users', ['refresh_vehicles']),
      ...mapGetters('login', ['log'])
    },
    watch: {
      refresh_vehicles: {
        handler() {
          if(this.refresh_vehicles == true){
            this.getVehicles()
          }
        }, deep: true
      },
      log: {
        handler() {
          this.setType()    
        }, deep: true
      },
    },
    methods: {
      ...mapActions('users', ['USER_VEHICLE', 'USER_VEHICLE_DELETE']),
      ...mapMutations('users', ['REFRESH_DATA_VEHICLES']),
      setType(){
        this.type = this.log.type
      },
      async getVehicles(){
        await this.USER_VEHICLE().then(data => {
          this.items = data.data.data
          this.REFRESH_DATA_VEHICLES(false)
        })
      },
      async deleteVehicle(item){
        this.$swal.fire({
          title: `Are you sure you want to delete this?`,
          text: "This action cannot be undone.",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#009c25',
          cancelButtonColor: '#b6b6b6',
          confirmButtonText: 'Yes!',
          cancelButtonText: 'Cancel'
        }).then(async result => {
          if (result.isConfirmed) {
            let payload = {
              id : item.id
            }
            await this.USER_VEHICLE_DELETE(payload).then(data =>{
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
              this.getVehicles()
            }).catch(response => {
              this.$swal.fire({
                title: `Something went wrong`,
                text: 'Please try again later.',
                icon: 'error',
                confirmButtonColor: '#009c25',
                confirmButtonText: 'OK'
              })
            })  
          }
        })
      }
    },
    mounted () {
      this.getVehicles()
    }
    
  }
</script>