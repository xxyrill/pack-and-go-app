<template>
  <!-- <v-app-bar app elevation="0" color="transparent" prominent>
    <v-toolbar color="transparent" dense> -->
      <!-- <v-toolbar-title>
          <v-img :src=imgs.product_logo alt="Pack and Go Logo" max-height="150" max-width="400"></v-img>
      </v-toolbar-title> -->
      <!-- <v-spacer></v-spacer> -->
      <!-- <dialog-login/> -->
      <!-- <v-btn href="/customer" rounded text color="white">SIGN UP</v-btn> -->
      <!-- <a style="color: white; text-decoration: none" class="mr-4 pa-2 subtitle-1" href="/customer">SIGN UP</a>
      <a style="color: white; text-decoration: none" class="mr-4 pa-2 subtitle-1" href="/business">SIGN UP AS BUSINESS</a>
      <a style="color: white; text-decoration: none" class="mr-4 pa-2 subtitle-1" href="/driver">SIGN UP AS DRIVER</a> -->
    <!-- </v-toolbar>
  </v-app-bar> -->
  <v-card
    color="transparent"
    flat
    class="mt-5"
  >
    <v-toolbar dense color="transparent" class="elevation-0">
      <v-toolbar-title >
        <v-img :src=imgs.product_logo alt="Pack and Go Logo" max-height="100" max-width="250"></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <dialog-login/>
      <dialog-sign-up-selection/>
      <!-- <v-btn text href="/customer" rounded color="white">
        SIGN UP
      </v-btn>

      <v-btn text href="/business" rounded color="white">
        SIGN UP AS BUSINESS
      </v-btn>

      <v-btn text href="/driver" rounded color="white">
        SIGN UP AS DRIVER
      </v-btn> -->
    </v-toolbar>
  </v-card>
</template>
<script>
import Imagepath from '~/plugins/mixins/imagepath'
import Global from '~/plugins/mixins/global'

export default {
  mixins: [Global,Imagepath]
}
</script>