<template>
  <v-container fluid class="fill-height background-image">
    <v-hover v-slot:default="{ hover }">
      <v-card
        class="mx-auto"
        :class="{'hide-card': (!hover && !user && !password), 'elevation-5': hover}"
        shaped
        width="400"
        max-width="94%"
        style="transition: all 400ms"
      >
        <v-form @submit.prevent="submitLogin" ref="form-login">
          <v-card-title class="flex-column pb-0">
            <v-avatar class="elevation-2 mb-3" height="6rem" width="6rem">
              <img src="@/assets/logo.png">
            </v-avatar>
            <p class="title">{{config.loginTitle}}</p>
          </v-card-title>
          <v-card-text>
            <v-text-field
              label="Usuario"
              placeholder="usuario"
              prepend-inner-icon="mdi-account"
              :rules="userRules"
              v-model="user"
              outlined
              autofocus
              autocomplete="on"
              autocapitalize="off"
              class="mb-3"
            ></v-text-field>
            <v-text-field
              label="Senha"
              placeholder="senha"
              prepend-inner-icon="mdi-lock"
              :rules="passwordRules"
              v-model="password"
              outlined
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              autocomplete="current-password"
              autocapitalize="off"
              class="mb-3"
            ></v-text-field>
            <v-btn
              rounded
              large
              color="primary"
              type="submit"
              block
            >ENTRAR</v-btn>
            <v-btn
              text
              class="mx-auto d-block mt-3"
              @click="dialogRecover = true"
            >Esqueci minha senha</v-btn>
          </v-card-text>
        </v-form>
      </v-card>
    </v-hover>
    <v-dialog v-model="dialogRecover" width="500" max-width="94%">
      <v-card>
        <v-form @submit.prevent="submitRecover" ref="form-recover">
          <v-card-title class="primary white--text mb-5">Reset de senha</v-card-title>
          <v-card-text class="pb-0">
            <v-text-field
              label="Usuario"
              placeholder="usuario"
              prepend-inner-icon="mdi-account"
              :rules="userRules"
              v-model="user"
              outlined
              autocomplete="on"
              autocapitalize="off"
              class="mb-3"
            ></v-text-field>
            <v-text-field
              label="E-mail"
              placeholder="e-mail"
              prepend-inner-icon="mdi-email"
              :rules="emailRules"
              v-model="email"
              outlined
              autocomplete="off"
              autocapitalize="off"
            ></v-text-field>
            <p class="text-center body-2">Este procedimento enviará uma nova senha para o seu e-mail.</p>
          </v-card-text>
          <v-divider/>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="blue darken-1" text @click="dialogRecover = false">Cancelar</v-btn>
            <v-btn color="blue darken-1" text type="submit">Solicitar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { config } from '@/config';
export default {
  name: "Login",
  data: () => ({
    config,
    user: '',
    password: '',
    email: '',
    showPassword: false,
    userRules: [
      v => !!v || 'O nome de usuario é obrigatório',
      v => (!/\s/g.test(v)) || 'Não pode conter espaços',
    ],
    passwordRules: [
      v => !!v || 'Digite sua senha',
      v => (v && v.length >= 4) || 'Precisa ter pelo menos 4 caracteres',
      v => (v && v.length <= 16) || 'O limite é 16 caracteres',
      v => (!/\s/g.test(v)) || 'Espaços não são permitidos',
    ],
    emailRules: [
      v => !!v || 'E-mail é obrigatório',
      v => /.+@.+\..+/.test(v) || 'Insira um e-mail válido',
    ],
    dialogRecover: false,
  }),
  methods: {
    submitLogin() {
      if (!this.$refs['form-login'].validate()) return;
      alert('implement...');
    },
    submitRecover() {
      if (!this.$refs['form-recover'].validate()) return;
      alert('implement..');
    },
  },
}
</script>

<style scoped>
  .background-image {
    background-image: url('https://picsum.photos/1920/1080');
    background-size: cover;
  }
  .hide-card {
    opacity: .6;
  }
</style>
