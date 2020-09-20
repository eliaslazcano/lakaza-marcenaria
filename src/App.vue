<template>
  <v-app :dark="$store.state.dark">
    <v-navigation-drawer
      app
      clipped
      v-if="$store.getters['session/logged']"
      v-model="showMenu"
    >
      <template v-slot:prepend>
        <v-list>
          <v-list-item two-line>
            <v-list-item-avatar>
              <v-avatar color="primary" class="font-weight-medium white--text elevation-2">
                <!-- Use <img> here -->
                <template>AB</template>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>NOME</v-list-item-title>
              <v-list-item-subtitle>CARGO</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
      <v-divider/>
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Início</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="px-2 pb-3">
          <v-btn
            v-if="!$vuetify.breakpoint.lgAndUp"
            @click="exit"
            color="primary"
            class="white--text"
            block
          >
            <v-icon class="mr-1">mdi-power-standby</v-icon>SAIR
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
      v-if="$store.getters['session/logged']"
    >
      <v-app-bar-nav-icon @click.stop="showMenu = !showMenu" />
      <v-toolbar-title class="ml-0 pl-4">{{config.appBarTitle}}</v-toolbar-title>
      <v-spacer/>
      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn icon v-on="{ ...menu, ...tooltip }" v-bind="attrs">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <span>Opções</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item @click="exit">
            <v-list-item-content>
              <v-list-item-title class="d-flex align-center">
                <v-icon class="mr-2">mdi-power-standby</v-icon>
                Sair
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <transition name="fade-transition" @after-leave="scrollTop" mode="out-in">
        <router-view/>
      </transition>
    </v-main>
    <v-snackbar
      :top="snackbar.top"
      :bottom="snackbar.bottom"
      :left="snackbar.left"
      :right="snackbar.right"
      :timeout="snackbar.timeout"
      :vertical="snackbar.vertical"
      :multi-line="snackbar.multiLine"
      :color="snackbar.color"
      :absolute="snackbar.absolute"
      :value="$store.state.snackbar.show"
      @input="$store.commit('snackbar/hide')"
    >{{snackbar.text}}</v-snackbar>
    <v-overlay :value="$store.state.loading">
      <v-progress-circular indeterminate size="48"></v-progress-circular>
    </v-overlay>
    <notifications/>
  </v-app>
</template>

<script>
import { Snackbar } from '@/models';
import { config } from '@/config';
import Notifications from "@/components/Notifications";

export default {
  name: 'App',
  components: {Notifications},
  data: () => ({
    showMenu: null,
    config,
  }),
  methods: {
    scrollTop() {
      window.scrollTo(0, 0);
    },
    exit() {
      this.showMenu = false;
      this.$store.dispatch('session/destroy');
    },
  },
  computed: {
    /**
     * Obtém a configuração do snackbar global
     * @returns {Snackbar}
     */
    snackbar() {
      return this.$store.state.snackbar.config ? this.$store.state.snackbar.config : new Snackbar();
    }
  }
};
</script>

<style lang="scss">
  @media print {
    .v-main {
      margin-top: -50px;
    }
  }
</style>
