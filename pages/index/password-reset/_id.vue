<template>
  <client-only>
    <v-layout class="main-reset">
        <v-layout wrap align-center justify-center>
          <v-flex md4 lg4 sm4 xs4>
            <v-card class="rounded-xl pa-3" color="#E0E0E0">
              <v-card-title class="d-flex justify-center">
                <span class="font-weight-regular headline" >Reset account password</span>
              </v-card-title>
              <v-card-text>
                <v-layout column>
                  <v-flex>
                    <span>New Password <label style="color:blue; font-size:14px">*</label></span>
                    <v-text-field
                      filled
                      rounded
                      dense
                      clearable
                      v-model="form.password"
                      placeholder="New Password"
                      @click:append="show1 = !show1"
                      :append-icon="show1 ? 'visibility' : 'visibility_off'"
                      prepend-inner-icon="mdi-lock-outline"
                      :type="show1 ? 'text' : 'password'"
                      :error-messages="this.errorPass ? this.errorPass.password : ''"
                    >
                    </v-text-field>
                  </v-flex>
                
                  <v-flex>
                    <span>Confirmed Password <label style="color:blue; font-size:14px">*</label></span>
                    <v-text-field
                      filled
                      rounded
                      dense
                      clearable
                      v-model="form.password_confirmation"
                      @click:append="show2 = !show2"
                      :append-icon="show2 ? 'visibility' : 'visibility_off'"
                      placeholder="Confirmed Password"
                      prepend-inner-icon="mdi-lock-outline"
                      :type="show2 ? 'text' : 'password'"
                      @input="validatePassword"
                      :error-messages="this.errorPass ? this.errorPass.password_confirmation : ''"
                    >
                    </v-text-field> 
                  </v-flex>
                </v-layout>
                <div class="blue lighten-1 my-2" :class="{ 'fade-out': errorMessage}">{{ errorMessage }}</div>
              </v-card-text>
              <v-card-actions class="d-flex justify-center">
                <v-btn :loading="forgotPassLoading" @click="submitBtn()" color="primary">
                  Reset password
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
    </v-layout>
  </client-only>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Global from '~/plugins/mixins/global'

export default {
  mixins: [
    Global,
  ],
  data: () => ({
    form: {},
    errors: [],
    errorMessage: null,
    forgotPassLoading: false,
    show1: false,
    show2: false,
  }),
  methods: {
    ...mapActions('users', ['FORGOT_PASS_RESET',]),
    validatePassword() {
      this.errors.password_confirmation = this.form.password !== this.form.password_confirmation ? ['Passwords do not match.'] : '';
    },
    submitBtn() {
      this.forgotPassLoading = true
      this.$set(this.form, 'hash', this.$route.params.id)
      this.FORGOT_PASS_RESET(this.form).then( async data => {
        await this.$swal.fire({
          title: `Password Successfully Update.`,
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#009c25',
          confirmButtonText: 'OK'
        })
        this.forgotPassLoading = false
        if (process.browser) {
          window.location.href = process.env.SITE_URL
        }
      }).catch( response => {
        this.forgotPassLoading = false
        if(response.response.data.errors){
          this.errorPass = response.response.data.errors
        }
      })
    },

  },
}
</script>