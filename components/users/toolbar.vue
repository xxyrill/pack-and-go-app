<template>
        <v-app-bar app color="grey-lighten-4">
        <img :src="imageUrl" class="ml-2" height="25">
        <v-toolbar-title class="text-caption ml-3"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items align="center">
          <v-row align="center" no-gutters>
            <v-col cols="auto">
              <v-badge :content="3" :value="3" color="#990907" overlap>
                <v-icon medium color="#990907">
                  mdi-cart
                </v-icon>
              </v-badge>

            </v-col>
            <v-col cols="auto" class="px-6">
              <div class="d-flex align-center text-hcdc-red"></div>
            </v-col>
            <v-col cols="auto" class="mr-5">
              <img :src="imageUrl" height="30" :alt="description">
            </v-col>
          </v-row>
        </v-toolbar-items>
      </v-app-bar>
</template>
<script>
export default {
    props: {
        title: String
    }
,
data() {
    return {
      imageUrl: "",
      description: "Avatar"
    };
  },
}
</script>