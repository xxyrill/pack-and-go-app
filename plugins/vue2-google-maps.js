import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCZNcBmMDpyhmdaDGyMydNG-7iJ23BNUds",
    libraries: 'places',
  },
  installComponents: true,
})