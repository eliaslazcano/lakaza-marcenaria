import JwtHelper from '../../helpers/JwtHelper';
import { config } from '@/config';
import router from '@/router';

export default {
  namespaced: true,
  state: () => ({
    token: null,
  }),
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    /**
     * Destroi a sessão, retornando para a tela de Login.
     * @param commit
     * @returns {Promise<void>}
     */
    async destroy({ commit }) {
      commit('setToken', null);
      localStorage.removeItem(config.localStorageVuexId);
      await router.push({name: 'Login'});
    },
  },
  getters: {
    logged(state) {
      return !!state.token;
    },
    payload(state) {
      return state.token ? JwtHelper.getPayload(state.token) : null;
    },
  },
}
