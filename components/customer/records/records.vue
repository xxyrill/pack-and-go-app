<template>
  <v-layout fill-height class="landing-order-img">
    <v-layout column wrap pa-4>
      <v-flex>
        <customer-records-filter/>
      </v-flex>
      <v-flex>
        <customer-records-table/>
      </v-flex>
      <v-flex>
        <chat-box/>
      </v-flex>
    </v-layout>
  </v-layout>
</template>