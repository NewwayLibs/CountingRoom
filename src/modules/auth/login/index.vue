<template>

  <div>
    <v-dialog :value="show" persistent>
      <v-card hover style="background:white">
        <v-container fill-height fluid class="deep-purple darken-1">
          <v-card-title class="white&#45;&#45;text">
            <div class="text-xs-center"> {{ $t("login")}}</div>
          </v-card-title>
        </v-container>
        <v-container fill-height fluid>
          <v-card-text class="pt-4">
            <v-form v-model="model" :fields="fields" @success="submit" submitButtonText="login">
              <div class="flex pb-2"><small>{{ $t("required_field")}}</small></div>
            </v-form>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
  </div>


  <!--<v-container fluid>
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
              class="blue-grey white&#45;&#45;text"
            >
              Login
              <v-icon right dark>security</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>-->
</template>
<script src="./index.js"></script>
<style lang="sass" src="./index.sass"></style>