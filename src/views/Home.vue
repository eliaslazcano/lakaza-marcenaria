<template>
  <v-container class="d-flex flex-column justify-center align-center">
    <img alt="App logo" src="../assets/logo.png" class="mb-5">
    <v-btn
      class="mb-5"
      color="primary"
      @click="$snackbar({text: 'Hello World', color: 'warning'})"
    >Snackbar</v-btn>

    <v-btn
      color="primary"
      @click="$loading(true)"
    >Loading</v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
}
</script>
