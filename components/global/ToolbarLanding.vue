<template>
  <v-app-bar app elevation="0" color="transparent" prominent>
    <v-toolbar-title>
        <v-img :src=imgs.product_logo alt="Pack and Go Logo" max-height="150" max-width="400"></v-img>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- <v-flex mt-3 class="d-flex justify-end" >
      <v-btn class="mr-3" outlined large rounded text @click="login">LOGIN</v-btn>
    </v-flex> -->
    <dialog-login/>
    <a style="color: white; text-decoration: none" class="mr-4 pa-2 subtitle-1" href="/customer">SIGN UP</a>
    <a style="color: white; text-decoration: none" class="mr-4 pa-2 subtitle-1" href="/business">SIGN UP AS BUSINESS</a>
    <a style="color: white; text-decoration: none" class="mr-4 pa-2 subtitle-1" href="/driver">SIGN UP AS DRIVER</a>
    <!-- <dialog-sign-up/> -->
    <!-- <dialog-sign-up-business/> -->
    <!-- <dialog-sign-up-driver/> -->
  </v-app-bar>
</template>
<script>
import Imagepath from '~/plugins/mixins/imagepath'
import Global from '~/plugins/mixins/global'

export default {
  mixins: [Global,Imagepath],
  methods: {
    login(){
      this.goToLogin('/login')
    }
  }
}
</script>