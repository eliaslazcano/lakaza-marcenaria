export default {
  namespaced: true,
  state: () => ({
    show: false,
    config: null,
  }),
  mutations: {
    /**
     * Exibe o snackbar
     * @param state
     * @param {Snackbar} payload
     */
    show(state, payload) {
      if (payload) {
        state.config = payload;
        state.show = true;
      }
    },
    /**
     * Oculta o snackbar
     * @param state
     */
    hide(state) {
      state.show = false;
    },
  },
  // actions: {},
  // getters: {},
};
