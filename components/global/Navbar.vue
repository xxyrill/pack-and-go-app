<template>
  <!-- <v-navigation-drawer
    v-model="navs" 
    app 
    class="navbar-bg scroll-y scroll" 
    style="background-color: #007437"
    light 
    :mini-variant.sync="mini" 
    stateless
    permanent
    expand-on-hover
  >  -->
  <v-navigation-drawer
    v-model="navs" 
    app 
    class="navbar-bg scrollNav" 
    style="background-color: #006832"
    light
    permanent
    :mini-variant.sync="mini" 
  >
  <div
    class="navbarIMG"
  >
    <!-- <v-list-item class="pa-2" style="background-color: #004c78">
      <v-list-item-avatar>
        <v-img :src="imgs.dohLogo"></v-img>
      </v-list-item-avatar>
      <v-list-item-title style="color:white; font-size: 18px; font-weight: 300">E-FIINNG SYSTEM</v-list-item-title>
    </v-list-item> -->

    <v-list-item class="pa-2" style="background-color: #024723c9">
        <v-list-item-avatar v-if="this.image.file == null">
          <v-img :src="imgs.emptyImg"></v-img>
        </v-list-item-avatar>
        <v-list-item-avatar v-else>
          <v-img :src="this.image.file"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title style="color:white; font-size: 18px; font-weight: bold;">{{ this.form.name }}</v-list-item-title>
          <v-list-item-title style="color:white; font-size: 13px; font-weight: 300;">{{ this.form.department ? this.form.department.abbreviation : '' }}</v-list-item-title>
          <!-- <v-list-item-title style="color:white; font-size: 14px; font-weight: 300;"> Role: {{ this.form.role ? this.form.role.display_name : '' }}</v-list-item-title>
          <v-list-item-title v-if="this.roles !== ''" style="color:white; font-size: 14px; font-weight: 300; "> Other Role: {{ this.roles ? this.roles : null}}</v-list-item-title> -->
        </v-list-item-content>
        <v-btn
          icon
          color="white"
          @click.stop="mini = !mini"
        >
          <v-icon>dehaze</v-icon>
        </v-btn>
    </v-list-item>
  </div>


       <!-- <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img :src="imgs.dohLogo"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>John Leider</v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item> -->
    <!-- </v-list> -->
    <v-list dense class="customnavs">
      <div :class="customHeight">
        <template v-for="(item, i) in items">
          <v-layout v-if="item.heading" :key="i" row align-center >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                  {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-right">
              <v-btn small flat></v-btn>
            </v-flex>
          </v-layout>

          <v-divider v-else-if="item.divider" :key="i" light class="my-3"></v-divider>

          <v-list-item v-else-if="item.children.length == 0"
            :key="i"
            @click="goTo(item.href)"
            class="py-1 pointer"
            active-class="#F0ADAD"
            :class="active(item)"
          >
            <v-list-item-action >
              <Icon color="white" :icon="item.icon" width="22" height="22"/>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title style="color: white;">
                <span style="font-size: 15px; font-weight: 300">{{ item.title }}</span> 
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group
            v-else
            :key="item.title"
            :prepend-icon="item.icon"
            :value="false"
            class="iconColor"
          >
            <template v-slot:activator>
              <v-list-item class="removePadding">
                <v-list-item-action >
                  <v-icon color="white" size="18px">{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title style="color: white">
                    <span style="font-size: 15px; font-weight: 300">{{ item.title }}</span> 
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>

            <template v-for="(list, i) in item.children">
              <v-list-item
                v-if="list.children.length == 0"
                :key="i"
                @click="goTo(list.href)"
                class="py-1 pointer ml-3"
              >
                <v-list-item-action>
                  <v-icon light>{{ list.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title style="color: white" v-if="list.badge === true">
                    <v-badge right class="navbar-badge" :color="list.badgeColor">
                      <template v-slot:badge>
                        <span>2</span>
                      </template>
                      <span>{{ list.title }}</span>
                    </v-badge>
                  </v-list-item-title>
                  <v-list-item-title style="color: white" v-else>
                    {{ list.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-group
                v-else
                :key="list.title"
                :append-icon="list.icon"
                :value="false"
                class="iconColor"
                sub-group
              >
                <template v-slot:activator>
                  <v-list-item>
                    <!-- <v-list-item-action >
                      <v-icon color="white" size="18px">{{ list.icon }}</v-icon>
                    </v-list-item-action> -->
                    <v-list-item-content>
                      <v-list-item-title style="color: white">
                        <span style="font-size: 15px; font-weight: 300">{{ list.title }}</span> 
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>

                <template v-for="(third, i) in list.children">
                  <v-list-item
                    :key="i"
                    @click="goTo(third.href)"
                    class="py-1 pointer ml-3"
                  >
                    <v-list-item-action>
                      <v-icon light>{{ third.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title style="color: white" v-if="third.badge === true">
                        <v-badge right class="navbar-badge" :color="third.badgeColor">
                          <template v-slot:badge>
                            <span>3</span>
                          </template>
                          <span>{{ third.title }}</span>
                        </v-badge>
                      </v-list-item-title>
                      <v-list-item-title style="color: white" v-else>
                        {{ third.title }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list-group>

            </template>
          </v-list-group>
        </template>
      </div>
    </v-list>
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

      customHeight () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
            return 'customHeightMD'
          case 'sm':
            return 'customHeightMD'
          case 'md':
            return 'customHeightMD'
          default:
            return 'customHeightLG'
        }
      }
      // isPersistent () {
      //   if (this.$vuetify.breakpoint.mdAndUp) return true
      //   return false
      // },
      // isTemporary () {
      //   if (this.$vuetify.breakpoint.smAndDown) return true
      //   return false
      // },
      // isAbsolute () {
      //   if (this.$vuetify.breakpoint.smAndDown) return true
      //   return false
      // },
      // zindexstyle () {
      //   if (this.$vuetify.breakpoint.smAndDown) {
      //     return 'z-index: 200'
      //   } else {
      //     return 'z-index: 0'
      //   }
      // }
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
          // if(this.navs === false){
          //   this.SET_NAV(true)
          // }else {
          //   this.SET_NAV(false)
          // }
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
      active (payload) {
        if (this.$nuxt._route.fullPath === payload.goTo) {
          return 'active-route'
        } else {
          return ''
        }
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
<style lang="stylus">
  .customHeightMD
    height: 70vh !important
  .customHeightLRG
    height: 85vh !important
</style>