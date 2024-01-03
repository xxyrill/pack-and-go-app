<template>
  <div>
    <v-flex md4>
      <v-text-field
        outlined
        dense
        class="rounded-l"
        v-model="form.email"
        persistent-placeholder
        prepend-inner-icon="mdi-magnify"
        label="Search by delivery info"
      />
    </v-flex>
    <v-layout >
      <v-spacer></v-spacer>
      <v-btn icon class="mt-2">
        <Icon icon="material-symbols:refresh" color="orange" width="24" height="24" />
      </v-btn>
      <v-flex md2 pa-1>
        <v-autocomplete
          outlined
          dense
          class="rounded-l"
          placeholder="Please select item"
        >

        </v-autocomplete>
      </v-flex>
      <v-flex md2 pa-1>
        <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="final_dates"
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="final_dates"
              label="Picker in dialog"
              prepend-inner-icon="mdi-calendar"
              readonly
              dense
              outlined
              class="rounded-l"
              v-bind="attrs"
              v-on="on"
              clearable
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="final_dates"
            scrollable
            range
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
              @click="$refs.dialog.save(final_dates)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
    </v-layout>
    
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
  export default {
    data: () => ({
      form: {},
      date_menu: false,
      modal: false,
      final_dates: null
    }),

    methods: {
    }
  }
</script>