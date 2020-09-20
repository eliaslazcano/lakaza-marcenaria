import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@babel/polyfill';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import '@/plugins/axios';
import { config } from "@/config";
import { Snackbar, Notification } from "@/models";

Vue.config.productionTip = false

/**
 * Exibe o snackbar global da aplicação
 * @param {string} text
 * @param {string} color
 * @param {boolean} top
 * @param {boolean} bottom
 * @param {boolean} left
 * @param {boolean} right
 * @param {number} timeout
 * @param {boolean} vertical
 * @param {boolean} multiLine
 * @param {boolean} absolute
 */
Vue.prototype.$snackbar = ({text, color = 'primary', top = false, bottom = false, left = false, right = false, timeout = 5000, vertical = false, multiLine = false, absolute = false}) => {
  store.commit('snackbar/show', new Snackbar({
    text,
    color,
    top,
    bottom,
    left,
    right,
    timeout,
    vertical,
    multiLine,
    absolute,
  }));
};

/**
 * Exibe uma notificação
 * @param {string} text
 * @param {'success'|'info'|'warning'|'error'} type
 * @param {'top'|'right'|'bottom'|'left'} border
 * @param {boolean} coloredBorder
 * @param {boolean} dense
 * @param {boolean} dismissible
 */
Vue.prototype.$notify = ({text, type = 'info', border = undefined, coloredBorder = false, dense = false, dismissible = false}) => {
  store.commit('notification/notify', new Notification({text, type, border, coloredBorder, dense, dismissible}));
};

/**
 * Exibe o loading global da aplicação
 * @param {boolean} show - Exibe ou esconde o loader
 */
Vue.prototype.$loading = (show) => {
  store.commit('setLoading', show);
};

store.subscribe((mutation, state) => {
  localStorage.setItem(config.localStorageVuexId, JSON.stringify(state));
});
store.commit('initialiseStore');

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
