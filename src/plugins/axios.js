import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { config } from '@/config'
import { Notification } from "@/models";

/**
 * Cria uma instancia Axios com regras da aplicação.
 * @param {function(string)} errorCallback - Callback com mensagem de erro para feedback.
 * @returns {AxiosInstance}
 */
const createWebClient = (errorCallback) => {
  //Axios Instance
  const axiosClient = axios.create({timeout: config.http.requestTimeout, baseURL: config.http.requestBaseUrl});
  //Request Interceptor
  const beforeSend = function (config) {
    //Inject Authorization Header
    if (store.state.session.token) config.headers.Authorization = store.state.session.token;
    return config;
  }
  //Error Handler
  const onError = function (error) {
    if (error.response) {
      if (error.response.data) if (error.response.data.mensagem) errorCallback(error.response.data.mensagem);
      if (error.response.status === 410) store.dispatch('session/destroy');
    } else if (error.request) {
      if (error.code === 'ECONNABORTED') errorCallback('A conexão excedeu o tempo limite, tente novamente.')
      else if (error.request.status === 0) errorCallback('Sem conexão com o servidor, verifique a sua internet e tente novamente mais tarde. [' + error.message + ']');
      else errorCallback('Erro ' + error.request.status);
    }
    // eslint-disable-next-line no-console
    console.log('HTTP Error', error.message);
    return Promise.reject(error);
  }
  //Apply settings
  axiosClient.interceptors.request.use(beforeSend, error => Promise.reject(error));
  axiosClient.interceptors.response.use(res => res, onError);
  return axiosClient;
};

Vue.prototype.$httpSilent = createWebClient(errorMessage => console.log(errorMessage));
const api = Vue.prototype.$http = createWebClient(errorMessage => {
  store.commit('notification/notify', new Notification({text: errorMessage, type: 'error'}));
});

export default api;
