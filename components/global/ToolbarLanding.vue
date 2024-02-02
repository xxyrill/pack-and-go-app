<template>
  <v-app-bar app elevation="0" color="transparent" prominent>
    <v-toolbar-title>
        <v-img :src=imgs.product_logo alt="Pack and Go Logo" max-height="150" max-width="400" @click="this.goTo('/')"></v-img>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <dialog-login/>
    <a style="color: white; text-decoration: none" class="mr-4 pa-2 subtitle-1" href="/customer">SIGN UP</a>
    <a style="color: white; text-decoration: none" class="mr-4 pa-2 subtitle-1" href="/business">SIGN UP AS BUSINESS</a>
    <a style="color: white; text-decoration: none" class="mr-4 pa-2 subtitle-1" href="/driver">SIGN UP AS DRIVER</a>
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