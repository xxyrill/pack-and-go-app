<template>
  <v-navigation-drawer
    v-model="navs" 
    app 
    class="navbar-bg scrollNav" 
    style="background-color: #ebebeb"
    light
    permanent
    :mini-variant.sync="mini" 
  >
  <div>
  <v-list-item class="px-2 py-5">
    <v-list-item-title class="text-capitalize" align="center">
        <v-avatar size="120">
        <v-img :src="imgs.empty_profile"></v-img>
        </v-avatar>
    </v-list-item-title>
  </v-list-item>
  </div>
    <v-list dense class="customnavs">
      <div>
        <template v-for="(item, i) in items">
          <v-list-item
          {{ item.href }}
            @click="goTo(item.href)"
            class="py-1 pointer"
            active-class="#F0ADAD"
          >
            <v-list-item-action >
              <Icon :icon="item.icon" width="22" height="22"/>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                  <span class="font-weight-bold">{{ item.title }}</span> 
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </div>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn block>
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
  import Global from '~/plugins/mixins/global'
  import Imagepath from '~/plugins/mixins/imagepath'
  import { mapMutations, mapGetters } from 'vuex'

  export default {
    data: () => ({
      mini: true,
      navs: true,
      form: {},
      image:{},
      show1: false,
      show2: false,
      roles: null
    }),
    props: {
      items: Array,
      preventive: Array,
      preventiveText: String,
      users: Object,
      choices: Array
    },
  
    mixins: [Global, Imagepath],

    computed: {
      ...mapGetters('navbarevents', ['nav', 'navbarLists']),
      ...mapGetters('login', ['loginUser']),
    },

    watch: {
      'nav': {
        handler () {
          this.getNavs()
        },
        deep: false
      },
      'navs': {
        handler(){
        },
        deep: true
      },
      'loginUser': {
        handler() {
          this.getRoleDisplay()
        },
        deep: true
      }
    },

    methods: {
      ...mapMutations('navbarevents', ['SET_NAV']),
      hide () {
        this.SET_NAV(false)
      },
      getNavs() {
        // this.navs = this.nav
      },
      getRoleDisplay () {
        if(this.loginUser.user){
          this.form = this.loginUser.user
          this.roles = this.form.roles.toString()
          if (this.form.avatar === 'users/default.png') {
            this.image.file = null
          } else {
            this.image.file = process.env.API_PIC + this.form.avatar
          }
        }
      }
    },

    mounted () {
      this.getRoleDisplay()
    }
  }
</script>