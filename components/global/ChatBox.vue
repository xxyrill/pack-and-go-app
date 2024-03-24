<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="340"
    left
    offset-x
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="#f0f0f0" fab dark fixed bottom right v-bind="attrs" v-on="on">
        <v-badge
          v-if="totalNotification"
          :content="totalNotification"
          color="green"
          overlap
        >
          <Icon icon="cryptocurrency-color:chat" width="60" height="60" />
        </v-badge>
        <Icon v-else icon="cryptocurrency-color:chat" width="60" height="60" />
      </v-btn>
    </template>
    <v-card>
        <v-card-title class="cyan lighten-2 py-1">
          <span class="body-1 font-weight-bold">Chat</span>
          <v-spacer></v-spacer> 
          <v-btn icon @click="menu = false">
            <Icon icon="fluent:minimize-12-filled" width="25" height="25" />
          </v-btn>
          </v-card-title>
        <v-card-text class="pa-0">
          <v-flex class="d-flex align-start">
            <v-flex md12 lg12 sm12 xs12 v-if="!selected">
              <v-card  outlined min-height="400" color="grey lighten-2">
                <v-list color="transparent">
                  <template v-for="(person, index) in rooms">
                    <v-list-item
                      dense
                      @click="selectedRoom(person)"
                    >
                      <v-list-item-avatar>
                        <v-img
                          v-if="log.type == 'customer'"
                          :src="person ? person.appointer ? person.appointer.profile_picture_path ? url+'/storage/'+person.appointer.profile_picture_path : imgs.empty_profile : imgs.empty_profile : imgs.empty_profile"
                          contain
                        ></v-img>
                        <v-img
                          v-else
                          :src="person ? person.customer ? person.customer.profile_picture_path ? url+'/storage/'+person.customer.profile_picture_path : imgs.empty_profile : imgs.empty_profile : imgs.empty_profile"
                          contain
                        ></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="font-weight-bold body-1">
                          {{ person ? 
                             (person.appointer ? 
                                (person.appointer.type == 'business' ? 
                                  (person.appointer.user_business.business_name) : 
                                  (person.appointer.first_name+' '+ person.appointer.last_name)) :
                                (person.customer ? 
                                  (person.customer.first_name+' '+person.customer.last_name): '')
                              ) : '' }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="caption"><span>Order number: </span><span class="font-italic">{{person ? person.booking ? person.booking.order_number ? person.booking.order_number : '' : '' :''}}</span></v-list-item-subtitle>
                      </v-list-item-content>
                      <v-badge v-if="person.chat_notifications_count > 0" color="error" bordered dot offset-x="1" offset-y="-10">
                        <template v-slot:badge>
                        </template>
                      </v-badge>
                    </v-list-item>
                  </template>
                </v-list>
              </v-card>
            </v-flex>
            <v-flex v-else>
              <v-card outlined min-height="350" color="grey lighten-2" scrollable>
                <v-card-title class="py-1 px-0">
                  <v-menu
                    bottom
                    :offset-x="true"
                    left
                    rounded
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        text
                        v-bind="attrs"
                        v-on="on"
                        depressed
                        :disabled="chat_room_name.user_blocked && block_user == 0 ? true : false"
                      >
                        <span v-if="chat_room_name.type == 'business'">{{ chat_room_name ? chat_room_name.user_business ? chat_room_name.user_business.business_name ? chat_room_name.user_business.business_name : '' : '' : '' }}</span>
                        <span v-else>{{ chat_room_name ? chat_room_name.first_name+' '+chat_room_name.last_name : '' }}</span>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-flex>
                        <v-btn block small text @click="viewProfile">View Profile</v-btn>
                      </v-flex>
                      <v-flex>
                        <v-btn v-if="block_user !== 0" block small text @click="blockUnblockedUser('unblocked')">Unblock User</v-btn>
                        <v-btn v-else block small text @click="blockUnblockedUser('blocked')">Block User</v-btn>
                      </v-flex>
                    </v-card>
                  </v-menu>
                  <v-spacer/>
                  <v-btn icon @click="selected = null">
                    <v-icon dark>
                      mdi-arrow-left
                    </v-icon>
                  </v-btn>
                </v-card-title>
                <v-divider/>
                <v-card flat color="grey lighten-2">
                  <v-card-text v-if="menu" ref="cardTextRef" style="max-height: 305px; overflow-y: auto;" class="scroll">
                    <v-layout column reverse pa-2>
                      <v-flex v-for="(message, index) in messages" :key="index" class="pa-2">
                        <h5 v-if="message.user_id == user" style="color: #757575;" class="d-flex justify-end">Me :</h5>
                        <h5 v-else style="color: #757575;" class="d-flex justify-start">
                          <span v-if="chat_room_name.type == 'business'">{{ chat_room_name ? chat_room_name.user_business ? chat_room_name.user_business.business_name ? chat_room_name.user_business.business_name : '' : '' : '' }} :</span>
                          <span v-else>{{ chat_room_name ? chat_room_name.first_name+' '+chat_room_name.last_name : '' }} :</span>
                        </h5>
                        <v-card :class="message.user_id == user ? 'rounded-xl rounded-br-0 pa-1 d-flex justify-end' : 'rounded-xl rounded-bl-0 pa-1 d-flex justify-start' " :color="message.user_id === user ? 'blue lighten-4' : '' ">
                          <span class="body-2 px-2" :style="{ maxWidth: '310px' }">{{ message ? message.message ? message.message : '' : '' }}</span>
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
                      <v-text-field
                        style="font-size: 12px;"
                        class="skekert"
                        dense
                        outlined
                        color="success"
                        :placeholder="chat_room_name.user_blocked || block_user == 1 ? 'Unable to message; account blocked.' : 'Write your message.'"
                        v-model="message"
                        @keyup.enter="sendMessage"
                        :disabled="chat_room_name.user_blocked || block_user == 1 ? true : false"
                        :error-messages="errors ? errors.message ? errors.message :'':''"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex md2 lg2 sm2 xs2 class="d-flex justify-center">
                      <v-btn :disabled="chat_room_name.user_blocked || block_user == 1 ? true : false" icon @click="sendMessage">
                        <v-icon dark>
                          mdi-send
                        </v-icon>
                      </v-btn>
                    </v-flex>
                </v-flex>
              </v-flex>
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
    chat_room_type: null,
    messages: [],
    rooms: [],
    reciever: null,
    notification: null,
    selected: null,
    url: process.env.API_URL,
    block_list: [],
    block_user: 0
  }),
  computed: {
    ...mapGetters('users', ['user']),
    ...mapGetters('login', ['log']),
    ...mapGetters('booking', ['message_details']),
    totalNotification(){
      let total = 0
      this.rooms.forEach(element => {
        if(element.chat_notifications_count > 0){
          total += 1
        }
      });
      return total
    }
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
    message_details : {
      handler() {
        if(Object.keys(this.message_details).length !== 0){
          this.menu = true
          this.selected = this.message_details
          this.chat_room_id = this.message_details.chat_room
          this.getBlockList(this.message_details.chat_room.id)
          this.getChatroomMessages(this.message_details.chat_room)
          this.chat_room_name = this.message_details.chat_room_name
          this.reciever = this.message_details.reciever_id
        }
      }, deep: true
    },
  },
  methods: {
    ...mapActions('chats', ['NEW_CHAT', 'CHATROOMS', 'MESSAGES', 'DELETE_NOTIFICATION']),
    ...mapMutations('booking', ['SET_MESSAGE_BOOKING']),
    ...mapActions('users', ['USER_BLOCKED', 'USER_BLOCKED_LIST']),
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
          if(this.selected){
            let payload = {
              message : this.message,
              user_id : this.user,
              created_at : moment().format('YYYY-MM-DD HH:mm:ss')
            }
            this.messages.unshift(payload)
          }
          this.message = null
          this.errors = {}
        }).catch(response => {
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
        this.clear()
      })
    },
    clear(){
      this.SET_MESSAGE_BOOKING({})
      this.menu = false
      this.selected = null
      this.block_user = 0
    },
    async selectedRoom(value){
      this.selected = value
      this.chat_room_id = value.id
      this.getChatroomMessages(this.chat_room_id)
      let chatroom_name = null
      if(this.log.type == 'driver' || this.log.type == 'business'){
        chatroom_name = value.customer
      }else if(this.log.type == 'customer'){
        chatroom_name = value.appointer
      }
      this.chat_room_name = chatroom_name
      this.getBlockList(this.chat_room_name.id)
      let reciever = null
      if(this.log.type == 'driver' || this.log.type == 'business'){
        reciever = value.customer_id
      }else if(this.log.type == 'customer'){
        reciever = value.appointer_id
      }
      this.reciever = reciever
      this.deleteNotif(value.id)
    },
    async deleteNotif(){
      let find = this.rooms.findIndex(ss => ss.id == this.chat_room_id)
      if(this.rooms[find].chat_notifications_count > 0){
        let payload = {
          chat_room_id : this.chat_room_id,
          receiver_id : this.user
        }
        await this.DELETE_NOTIFICATION(payload).then(data => {
          let find = this.rooms.findIndex(ss => ss.id == this.chat_room_id)
          this.rooms[find].chat_notifications_count = 0
        }) 
      }
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
        const pusher = new Pusher('0d84d078f56e91a0f704', {
          cluster: 'ap1',
          encrypted: true
        });
        let user = 'user_id.'+this.user
        const channelNotif = pusher.subscribe(user)
        channelNotif.bind('notification', (dd) => {
          let rooms = this.rooms
          let find_room = rooms.findIndex(ss => ss.id == dd.chat_room_id)
          if(find_room !== -1){
            if(rooms[find_room].hasOwnProperty('chat_notifications_count')){
              rooms[find_room].chat_notifications_count = 1
            }else{
              this.$set(rooms[find_room], 'chat_notifications_count', 1)
            }
          }else{
            this.getAllChatRooms()
          }
        })
        channelNotif.unsubscribe()
      }, 1000);
    },
    getMessages(){
      setTimeout(() => {
        const pusher = new Pusher('0d84d078f56e91a0f704', {
          cluster: 'ap1',
          encrypted: true
        });
        let user = 'user_id.'+this.user
        const channelMessages = pusher.subscribe(user)
        channelMessages.bind('chat', (dd) => {
          if(this.selected){
            if(this.chat_room_id == dd.chat_room_id){
              let payload = {
                message : dd.message,
                user_id : dd.reciever_user_id,
                created_at : moment().format('YYYY-MM-DD HH:mm:ss')
              }
              this.messages.unshift(payload)
            }
          }
        })
        channelMessages.unsubscribe()
      }, 1000);
    },
    async getBlockList(id){
      let payload = {
        user_id : id
      }
      await this.USER_BLOCKED_LIST(payload).then(data => {
        this.block_user = data.data
      })
    },
    async blockUnblockedUser(value){
      this.$swal.fire({
        title: `Are you sure you want to ${value == 'blocked' ? 'block' : 'unblock'} this person?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#009c25',
        cancelButtonColor: '#b6b6b6',
        confirmButtonText: 'Yes!',
        cancelButtonText: 'Cancel'
      }).then(async result => {
        if (result.isConfirmed) {
          let payload = {
            type : value,
            blocked_user : this.reciever
          }
          await this.USER_BLOCKED(payload).then(data => {
            let Toast = this.$swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = this.$swal.stopTimer;
                toast.onmouseleave = this.$swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: 'User has been successfully restricted.'
            });
            this.getAllChatRooms()
            this.clear()
          })
        }
      })
    },
    viewProfile(){
      this.goTo('/application/global-profile/'+this.reciever)
    }
  },
  mounted () {
    this.getNotifications()
    this.getMessages()
    this.getAllChatRooms()
  },
}
</script>