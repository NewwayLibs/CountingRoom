<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6 offset-md3>
        <v-card>
          <v-toolbar class="indigo" dark>
            <v-toolbar-title>Auth</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              label="Email"
              class="mt-5"
              v-model="email"
              required
            ></v-text-field>
            <v-text-field
              label="Password"
              v-model="password"
              required
              :append-icon="password_visible ? 'visibility_off' : 'visibility'"
              :append-icon-cb="() => (password_visible = !password_visible)"
              :type="password_visible ? 'text' : 'password'"
              counter
            ></v-text-field>

            <v-btn
              :loading="loading"
              @click="submit()"
              :disabled="loading"
              class="blue-grey white--text"
            >
              Login
              <v-icon right dark>security</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script src="./index.js"></script>
<style lang="sass" src="./index.sass"></style>