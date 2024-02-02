import Vue from 'vue'
import Pusher from 'pusher-js'

Vue.use(new Pusher('0d84d078f56e91a0f704', {
  cluster: 'ap1',
  encrypted: true,
}))
