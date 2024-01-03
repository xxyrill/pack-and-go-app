<template>
    <v-app-bar elevation="0" app color="#483285">
        <v-toolbar-title class="white--text ml-3" @click="home" style="cursor:pointer;">PACK&GO</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text color="white">New Order</v-btn>
        <v-btn text color="white">Records</v-btn>
        <v-btn text color="white">Jay Mar Mendoza</v-btn>
    </v-app-bar>
</template>
<script>
import Imagepath from '~/plugins/mixins/imagepath'
import Global from '~/plugins/mixins/global'

export default {
  mixins: [Global,Imagepath],
  methods: {
    home(){
      this.goToLogin('/')
    }
  }
}
</script>