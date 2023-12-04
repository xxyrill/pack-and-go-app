<template>
        <v-navigation-drawer v-model="drawer" dark fixed app color="#990907">
        <!-- Sidebar content goes here -->
        <v-row align="center" justify="center" class="mt-3 white--text" no-gutters>
          <v-col cols="auto">
            <!-- <img src="images/avatar.png" style="max-height: 100px;" alt="Avatar"> -->
          </v-col>
          <v-col>
            <v-list-item-content class="text-center">
              <v-list-item-title class="subtitle-1"></v-list-item-title>
              <v-list-item-subtitle class="caption"></v-list-item-subtitle>
            </v-list-item-content>
          </v-col>
        </v-row>
        <v-list>
          <template v-for="item in menus">
            <v-list-group v-if="item.submenu" color="white" :key="item.title"
              :class="['nav-item', { 'nav-item-active': item.isActive }]" v-model="item.active"
              :prepend-icon="item.action" no-action>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item v-for="child in item.items" :key="child.title">
                <v-list-item-content>
                  <v-list-item-title>{{ child.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-list-item v-else :key="item.title" :class="['nav-item', { 'nav-item-active': item.isActive }]">
              <v-list-item-icon>
                <v-icon>{{ item.action }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-navigation-drawer>
</template>

<script>
export default {
    data: () => ({
      drawer: true,
        menus: [
        {
            action: 'mdi-view-dashboard',
            submenu: false,
            isActive: true,
            items: [{}],
            title: 'Dashboard',
        },
        {
            action: 'mdi-account',
            submenu: false,
            isActive: false,
            items: [
            { title: 'Breakfast & brunch' },
            { title: 'New American' },
            { title: 'Sushi' },
            ],
            title: 'Public Profile',
        },
        {
            action: 'mdi-bulletin-board',
            submenu: true,
            isActive: false,
            items: [{ title: 'List Item' }],
            title: 'Bulletins',
        },
        {
            action: 'mdi-clipboard-check',
            submenu: true,
            isActive: false,
            items: [{ title: 'List Item' }],
            title: 'Credentials',
        },
        {
            action: 'mdi-bottle-tonic-plus',
            submenu: true,
            isActive: false,
            items: [{ title: 'List Item' }],
            title: 'Jobs',
        },
        {
            action: 'mdi-cart',
            submenu: true,
            isActive: false,
            items: [{ title: 'List Item' }],
            title: 'Shop',
        },
        {
            action: 'mdi-currency-usd',
            submenu: false,
            isActive: false,
            items: [{ title: 'List Item' }],
            title: 'Payment Status',
        },
        {
            action: 'mdi-gift',
            submenu: false,
            isActive: false,
            items: [{}],
            title: 'Perks',
        },
        {
            action: 'mdi-information',
            submenu: false,
            isActive: false,
            items: [{}],
            title: 'About Us',
        }]
    })

}
</script>