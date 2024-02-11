<template>
  <v-flex>
    <v-btn depressed color="info" @click="verifyPassword">Verify by password</v-btn>
    <v-dialog
      v-model="dialogPassword"
      width="400"
      persistent
    >
      <v-card class="rounded-xl">
        <v-card-title class="d-flex justify-center">
          <span>
            Password Authentication
          </span>
        </v-card-title>
        <v-card-subtitle class="d-flex justify-center">
          <span class="caption">
            Please enter your current password.
          </span>
        </v-card-subtitle>
        <v-card-text class="py-0">
          <v-layout column>
            <v-text-field
              v-if="!change_password_field"
              class="rounded-xl"
              outlined
              label="Password"
              v-model="password"
              persistent-placeholder
              dense
              prepend-inner-icon="mdi-lock-outline"
              @click:append="show = !show"
              :append-icon="show ? 'visibility' : 'visibility_off'"
              :type="show ? 'text' : 'password'"
              :error-messages="errors ? errors.password ? errors.password :'':''"
            />
          </v-layout>
          <v-layout column v-if="change_password_field">
            <v-flex md5>
              <v-flex>
                <v-text-field
                  class="rounded-xl"
                  outlined
                  label="New Password"
                  dense
                  v-model="passwords.new_password"
                  persistent-placeholder
                  prepend-inner-icon="mdi-lock-outline"
                  @click:append="showNew = !showNew"
                  :append-icon="showNew ? 'visibility' : 'visibility_off'"
                  :type="showNew ? 'text' : 'password'"
                  :error-messages="errors ? errors.new_password ? errors.new_password :'':''"
                />
              </v-flex>
              <v-flex>
                <v-text-field
                  class="rounded-xl"
                  outlined
                  label="Confirm Password"
                  dense
                  v-model="passwords.new_password_confirmation"
                  persistent-placeholder
                  prepend-inner-icon="mdi-lock-outline"
                  @click:append="showCurrent = !showCurrent"
                  :append-icon="showCurrent ? 'visibility' : 'visibility_off'"
                  :type="showCurrent ? 'text' : 'password'"
                  :error-messages="errors ? errors.new_password_confirmation ? errors.new_password_confirmation :'':''"
                />
              </v-flex>
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
import moment from 'moment';
export default {
  mixins: [Global],
  data: () => ({
    errors: {},
    dialogPassword: false,
    password: null,
    change_password_field: false,
    showNew: false,
    showCurrent: false,
    show: false,
    passwords: {}
  }),
  computed: {
  },
  watch: {
  },
  methods: {
    ...mapActions('users', ['USER_CHECK_PASSWORD', 'USER_UPDATE_PASSWORD']),
    async submit(){
      if(this.change_password_field === false){
        let payload = {
          password : this.password ? this.password : null
        }
        let validation = this.fieldsValidation(payload)
        if(validation.error == true){
          this.errors = validation.errors
        }else{
          await this.USER_CHECK_PASSWORD(payload).then(data => {
            this.errors = {}
            this.change_password_field = true
          }).catch(response => {
            this.errors = response.response.data.errors
          })
        }
      }else if(this.change_password_field === true){
        let payload = {
          new_password : this.passwords ? this.passwords.new_password ? this.passwords.new_password : null : null,
          new_password_confirmation : this.passwords ? this.passwords.new_password_confirmation ? this.passwords.new_password_confirmation : null : null
        }
        let validation = this.fieldsValidation(payload)
        if(validation.error == true){
          this.errors = validation.errors
        }else{
          if(this.passwords.new == this.passwords.new_confirm){
            this.errors = {}
            this.$set(payload, 'password', this.password)
            await this.USER_UPDATE_PASSWORD(payload).then(data => {
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
              this.close()
            }).catch(response => {
              this.errors = response.response.data.errors
            })
          }else{
            this.$set(this.errors, 'new', ['Password did not match'])
            this.$set(this.errors, 'new_confirm', ['Password did not match'])
          }
        }
      }
    },
    verifyPassword(){
      this.dialogPassword = true
      this.password = null
      this.errors = {}
      this.passwords = {}
      this.change_password_field = false
    },
    close(){
      this.dialogPassword = false
      this.password = null
      this.errors = {}
      this.passwords = {}
      this.change_password_field = false
    },
  },

  mounted () {
  }
}
</script>