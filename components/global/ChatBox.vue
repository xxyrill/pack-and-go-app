<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    left
    offset-x
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        color="#f0f0f0"
        dark
        bottom
        right
        fab
        v-bind="attrs"
        v-on="on"
      >
        <v-badge
          :content="2"
          :value="2"
          color="green"
          overlap
        >
          <Icon icon="cryptocurrency-color:chat" width="60" height="60" />
        </v-badge>
      </v-btn>
    </template>
    <v-card min-width="600">
        <v-card-title class="cyan lighten-2">
          <span class="body-1 font-weight-bold">Chat</span>
          <v-spacer></v-spacer> 
          <v-btn icon @click="menu = false">
            <Icon icon="fluent:minimize-12-filled" width="25" height="25" />
          </v-btn>
          </v-card-title>
        <v-card-text>
          <v-flex class="d-flex align-start">
            <v-flex pa-2 md7 lg7 sm7 xs7>
              <v-card outlined color="grey lighten-2" scrollable>
                <v-flex pa-4 px-5>
                  <v-layout row wrap align-center>
                    <v-flex>{{ chat_room_name ? chat_room_name.first_name ? chat_room_name.first_name : '' : '' }} {{ chat_room_name ? chat_room_name.last_name ? chat_room_name.last_name : '': ''  }}</v-flex>
                    <v-menu
                      bottom
                      :offset-x="true"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          icon
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon>
                            mdi-chevron-down
                          </v-icon>
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item>
                          <v-list-item-title>View Profile</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>Block User</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-layout>
                </v-flex>
                <v-divider/>
                <v-card flat color="grey lighten-2">
                  <v-card-text v-if="menu" ref="cardTextRef" style="max-height: 305px; overflow-y: auto;" class="scroll">
                    <v-layout column reverse pa-2>
                      <v-flex v-for="(message, index) in messages" :key="index" class="pa-2">
                        <v-card :class="message.user_id == user ? 'rounded-xl rounded-br-0 pa-1 d-flex justify-end' : 'rounded-xl rounded-bl-0 pa-1 d-flex justify-start' ">
                          <span class="body-2 px-2">{{ message ? message.message ? message.message : '' : '' }}</span>
                        </v-card>
                        <h6 style="color: #757575;" :class="message.user_id == user ? 'font-italic d-flex justify-end' : 'font-italic d-flex justify-start'">{{ message ? message.created_at ? message.created_at : '' : '' | monthdayyearwithtime}}</h6>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-card>
              <v-flex class="pa-2 d-flex align-start">
                <v-flex class="d-flex align-center">
                    <v-flex md10 lg10 sm10 xs10 class="d-flex justify-center">
                      <v-textarea
                        style="font-size: 12px;"
                        rows="1"
                        class="skekert"
                        dense
                        auto-grow
                        outlined
                        color="success"
                        placeholder="Write your message."
                        v-model="message"
                        :error-messages="errors ? errors.message ? errors.message :'':''"
                      >
                      </v-textarea>
                    </v-flex>
                    <v-flex md2 lg2 sm2 xs2 class="d-flex justify-center">
                      <v-btn icon @click="sendMessage">
                        <v-icon dark>
                          mdi-send
                        </v-icon>
                      </v-btn>
                    </v-flex>
                </v-flex>
              </v-flex>
            </v-flex>
            <v-flex pa-2 md5 lg5 sm5 xs5>
              <v-card  outlined min-height="400" color="grey lighten-2">
                <v-list color="transparent">
                  <v-list-item
                    v-for="(person, index) in rooms"
                    :key="index"
                    dense
                    @click="selectedRoom(person)"
                  >
                    <v-list-item-avatar>
                      <v-img
                        :src="imgs.empty_profile"
                        small
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ person ? person.appointer ? person.appointer.first_name+' '+ person.appointer.last_name : person.customer.first_name+' '+person.customer.last_name : '' }}</v-list-item-title>
                    </v-list-item-content>
                    <v-badge v-if="person.chat_notifications_count > 0" color="error" bordered dot offset-x="1" offset-y="-10">
                      <template v-slot:badge>
                      </template>
                    </v-badge>
                    <!-- <v-list-item-action>
                      <v-avatar
                        color="primary"
                        size="17"
                      >
                        <span class="white--text">{{ person.notification }} {{  getMessage }}</span>
                      </v-avatar>
                    </v-list-item-action> -->
                  </v-list-item>
                </v-list>
              </v-card>
            </v-flex>
          </v-flex>
        </v-card-text>
      </v-card>
  </v-menu>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import Pusher from 'pusher-js';
import axios from 'axios'
import Global from '~/plugins/mixins/global'
import moment from 'moment';
import Imagepath from '~/plugins/mixins/imagepath'

export default {
  mixins: [Global, Imagepath],
  props: {
    chat_room: [Number],
    reciever_id: [Number],
    chat_owner: [Object]
  },
  data: () => ({
    errors: {},
    fav: true,
    menu: false,
    menuProfile: false,
    message: null,
    hints: true,
    chat_room_id: null,
    chat_room_name: null,
    messages: [],
    rooms: [],
    reciever: null,
    notification: null,
    recent: [
      {
        active: true,
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Jason Oner',
      },
      {
        active: true,
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Mike Carlson',
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Cindy Baker',
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Ali Connors',
      },
    ],
  }),
  computed: {
    ...mapGetters('users', ['user']),
    ...mapGetters('login', ['log']),
  },
  watch: {
    menu: {
      handler() {
        if(this.menu == true){
          setTimeout(() => {
            this.scrollToBottom()
          }, 1000);
        }
      }, deep: true
    },
    chat_room : {
      handler() {
        this.menu = true
        this.chat_room_id = this.chat_room
        this.getChatroomMessages(this.chat_room)
        this.chat_room_name = this.chat_owner
      }, deep: true
    },
    reciever_id : {
      handler() {
        this.reciever = this.reciever_id
      }, deep: true
    },
    rooms : {
      handler() {

      }, deep: true
    }
  },
  methods: {
    ...mapActions('chats', ['NEW_CHAT', 'CHATROOMS', 'MESSAGES', 'DELETE_NOTIFICATION']),
    scrollToBottom() {
      this.$nextTick(() => {
        const cardTextElement = this.$refs.cardTextRef;
        if (cardTextElement) {
          cardTextElement.scrollTop = cardTextElement.scrollHeight;
        }
      });
    },
    async sendMessage(){
      let payload = {
        message : this.message ? this.message : null
      }
      let validation = this.fieldsValidation(payload)
      if(validation.error == true){
        this.errors = validation.errors
      }else{
        let payload = {
          message : this.message,
          room_id : this.chat_room_id,
          reciever_id: this.reciever
        }
        await this.NEW_CHAT(payload).then(data => {
          this.getChatroomMessages(this.chat_room_id)
          this.message = null
          this.errors = {}
        }).catch(response => {
          this.getChatroomMessages(this.chat_room_id)
          this.message = null
          this.errors = {}
        })
      }
    },
    async getAllChatRooms(){
      let payload = {
        skip : 0,
        take : 20
      }
      await this.CHATROOMS(payload).then(async data => {
        this.rooms = data.data.data
        this.chat_room_id = data.data.data[0].id
        await this.getChatroomMessages(this.chat_room_id)
        if(this.log.type == 'driver'){
          this.reciever = data.data.data[0].customer_id
        }else if(this.log.type == 'customer'){
          this.reciever = data.data.data[0].appointer_id
        }
        this.chat_room_name = this.log.type == 'driver' ? data.data.data[0].customer : data.data.data[0].appointer
      })
    },
    selectedRoom(value){
      if(this.log){
        if(this.log.type == 'driver'){
          this.reciever = value.customer_id
        }else if(this.log.type == 'customer'){
          this.reciever = value.appointer_id
        }
      }
      this.chat_room_id = value.id
      this.chat_room_name = this.log.type == 'driver' ? value.customer : value.appointer
      this.getChatroomMessages(value.id)
      this.deleteNotif(value)
    },
    async deleteNotif(value){
      let payload = {
        chat_room_id : value.id,
        receiver_id : this.user
      }
      await this.DELETE_NOTIFICATION(payload).then(data => {
        let find = this.rooms.findIndex(ss => ss.id == value.id)
        this.rooms[find].chat_notifications_count = 0
      })
    },
    async getChatroomMessages(chat_room_id){
      let payload = {
        chat_room_id: chat_room_id
      }
      await this.MESSAGES(payload).then(data => {
        this.messages = data.data.data
        this.scrollToBottom()
      })
    },
    getNotifications(){
      setTimeout(() => {
        const pusher = new Pusher('20b6186a669f7f542987', {
          cluster: 'ap1',
          encrypted: true
        });
        let user = 'user_id.'+this.user
        const channelNotif = pusher.subscribe(user)
        channelNotif.bind('notification', (dd) => {
          if(dd.chat_room_id == this.chat_room_id){
            let payload = {
              id : this.chat_room_id
            }
            this.deleteNotif(payload)
          }
          let find_room = this.rooms.findIndex(ss => ss.id == dd.chat_room_id)
          if(find_room !== -1){
            if(this.rooms[find_room].hasOwnProperty('chat_notifications_count')){
              this.rooms[find_room].chat_notifications_count = 1
            }else{
              this.$set(this.rooms[find_room], 'chat_notifications_count', 1)
            }
          }
          // else{
          //   this.getAllChatRooms()
          //   let find_room = this.rooms.findIndex(ss => ss.id == dd.chat_room_id)
          //   if(find_room !== -1){
          //     if(this.rooms[find_room].hasOwnProperty('notification')){
          //       this.rooms[find_room].notification = true
          //     }else{
          //       this.$set(this.rooms[find_room], 'notification', true)
          //     }
          //   }
          // }
        })
        channelNotif.unsubscribe()
      }, 1000);
    }
  },

  mounted () {
    this.getNotifications()
    this.getAllChatRooms()
  },
}
</script>