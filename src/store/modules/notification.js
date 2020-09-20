export default {
  namespaced: true,
  state: () => ({
    notifications: [], //Array<Notification>
    timeout: 5000,
  }),
  mutations: {
    /**
     * Exibe uma notificação
     * @param state
     * @param {Notification} notification
     */
    notify(state, notification) {
      const id = state.notifications.length + 1;
      state.notifications.unshift({id, ...notification});
      setTimeout(() => state.notifications.pop(), state.timeout);
    },
  },
  // actions: {},
  // getters: {},
};
