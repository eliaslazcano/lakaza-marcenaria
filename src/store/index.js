import Vue from 'vue'
import Vuex from 'vuex'
import { sessionStore, snackbarStore, notificationStore } from './modules'
import { config } from '@/config'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dark: false,
    loading: false,
  },
  mutations: {
    initialiseStore() {
      if (localStorage.getItem(config.localStorageVuexId)) {
        const state = JSON.parse(localStorage.getItem(config.localStorageVuexId));
        if (state.session.token) {
          state.loading = false;
          this.replaceState(state);
        }
      }
    },
    /**
     * Ativa ou desativa o tema escuro
     * @param state
     * @param {boolean} payload
     */
    setDark(state, payload) {
      state.dark = payload;
    },
    /**
     * Exibe ou esconde a tela de carregamento master da aplicação
     * @param state
     * @param {boolean} payload
     */
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  modules: {
    session: sessionStore,
    snackbar: snackbarStore,
    notification: notificationStore,
  },
  // actions: {},
});
