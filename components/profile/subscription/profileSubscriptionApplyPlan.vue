<template>
  <v-flex class="pa-1">
    <v-btn
      small
      depressed
      color="info"
      block
      class="rounded-xl"
      @click="openDialog"
    >
      Select Plan
    </v-btn>
    <v-dialog
      v-model="dialog"
      transition="dialog-top-transition"
      width="450"
      hide-overlay
    >
      <v-card flat>
        <v-card-title>
          <span>Payment: </span>
        </v-card-title>
        <v-card-text >
          <v-layout column class="pa-3">
            <v-flex>
              <v-text-field 
                outlined 
                label="Card Holder Name"
                v-model="form.card_holder"
                :error-messages="errors ? errors.card_holder ? errors.card_holder :'':''">

              </v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                outlined
                v-mask="'XXXX-XXXX-XXXX-XXXX'"
                v-model="form.card_number"
                label="Card Number"
                :error-messages="errors ? errors.card_number ? errors.card_number :'':''">
                <template v-slot:append>
                  <img :src="imgs.master_card" alt="master card" style="height: 24px; margin-right: 8px;">
                  <img :src="imgs.visa" alt="visa" style="height: 24px; margin-right: 8px;">
                </template>
              </v-text-field>
            </v-flex>
            <v-flex>
              <v-layout row wrap >
                <v-flex md6 lg6 sm6 xs6 class="pa-3">
                  <v-layout column>
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="form.card_expiry"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="form.card_expiry"
                          label="MM/YY"
                          outlined
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          :error-messages="errors ? errors.card_expiry ? errors.card_expiry :'':''"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="form.card_expiry"
                        type="month"
                        scrollable
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
                          @click="$refs.dialog.save(form.card_expiry)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-layout>
                </v-flex>
                <v-flex md6 lg6 sm6 xs6 class="pa-3">
                  <v-layout column>
                    <v-text-field
                      outlined 
                      v-mask="'###'"
                      v-model="form.extra"
                      :error-messages="errors ? errors.extra ? errors.extra :'':''"
                      label="000">

                    </v-text-field>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex>
              <v-btn depressed block large color="#FFF176" @click="submit">
                <Icon icon="material-symbols-light:lock" width="24" height="24" />
                PAY {{ subscription.price | decimalcomma }}
              </v-btn>
              <span class="caption">
                By clicking the button you confirm to have accepted <a>Terms and Service.</a>
              </span>
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
import { mask } from 'vue-the-mask';
import Global from '~/plugins/mixins/global'
import Imagepath from '~/plugins/mixins/imagepath'
import moment from 'moment';
export default {
  mixins: [Global, Imagepath],
  props: {
    subscription: [Object]
  },
  data: () => ({
    dialog: false,
    modal: false,
    form: {},
    errors: {}
  }),
  computed: {
  },
  watch: {
  },
  methods: {
    ...mapMutations('users', ['REFRESH_SUBSCRIPTION']),
    ...mapActions('users', ['USER_SUBSCRIBE_PLAN']),
    openDialog(){
      this.form = {}
      this.errors = {}
      this.dialog = true
    },
    closeDialog(){
      this.dialog = false
    },
    submit(){
      let payload = {
        card_holder : this.form ? this.form.card_holder ? this.form.card_holder : null : null,
        card_number : this.form ? this.form.card_number ? this.form.card_number : null : null,
        card_expiry : this.form ? this.form.card_expiry ? this.form.card_expiry : null : null,
        extra : this.form ? this.form.extra ? this.form.extra : null : null,
      }
      let validation = this.fieldsValidation(payload)
      if(validation.error == true){
        this.errors = validation.errors
      }else{
        this.$swal.fire({
          title: `Are you sure you want to proceed?`,
          text: "Please check thoroughly your details.",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#009c25',
          cancelButtonColor: '#b6b6b6',
          confirmButtonText: 'Yes!',
          cancelButtonText: 'Cancel'
        }).then(async result => {
          if (result.isConfirmed) {
            let payload = {
              subscription_id : this.subscription ? this.subscription.id ? this.subscription.id : null : null
            }
            await this.USER_SUBSCRIBE_PLAN(payload).then(data => {
              this.REFRESH_SUBSCRIPTION(true)
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
                title: `Subscription to `+this.subscription.title+'.'
              });
            }).catch(response => {
              this.$swal.fire({
                title: 'Something went wrong. please contact administrator.',
                icon: 'error',
                confirmButtonColor: '#009c25',
                confirmButtonText: 'OK'
              })
            })
          }
        })
      }
    }
  },

  mounted () {
  }
}
</script>