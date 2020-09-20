<template>
  <div
    v-if="renderContainer"
    style="position: absolute; width: 100%"
    class="d-flex flex-column"
    :class="{'align-center': $vuetify.breakpoint.smAndDown, 'align-end': !$vuetify.breakpoint.smAndDown}"
  >
    <transition-group name="slide-x-reverse-transition" appear>
      <v-alert
        v-for="n in notifications"
        :key="n.id"
        :type="n.type"
        :border="n.border"
        :colored-border="n.coloredBorder"
        :dense="n.dense"
        :dismissible="n.dismissible"
        :class="{'mr-3': !$vuetify.breakpoint.smAndDown}"
        width="20rem"
        max-width="96%"
        elevation="2"
        class="mt-2 mb-0"
      >{{n.text}}</v-alert>
    </transition-group>
  </div>
</template>

<script>
  export default {
    name: "Notifications",
    data:() => ({
      renderContainer: false,
    }),
    computed: {
      /**
       * Notificações
       * @returns {array<Notification>}
       */
      notifications() {
        return this.$store.state.notification.notifications;
      },
    },
    watch: {
      notifications(v) {
        if (v.length > 0) this.renderContainer = true;
        else {
          setTimeout(() => this.renderContainer = false, 500);
        }
      },
    },
  }
</script>

<style scoped>

</style>
