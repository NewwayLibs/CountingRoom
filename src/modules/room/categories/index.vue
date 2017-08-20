<template>
  <div>
    <v-tabs fixed light icons centered>
      <v-tabs-bar slot="activators" class="grey lighten-4">
        <v-tabs-slider class="primary"></v-tabs-slider>
        <v-tabs-item href="#income" class="primary--text">
          <v-icon>fa-money</v-icon>
          <div>{{ $t('categories.income') }}</div>
        </v-tabs-item>
        <v-tabs-item href="#expenses" class="primary--text">
          <v-icon>fa-credit-card-alt</v-icon>
          {{ $t('categories.expenses') }}
        </v-tabs-item>
      </v-tabs-bar>
      <v-tabs-content :id="'income'">
        <v-card flat>
          <v-container fluid>
            <v-layout row>
              <v-flex xs2 offset-xs10>
                <v-btn dark primary small left @click="add('income')">
                  <v-icon>fa-plus</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
          <list :items="incomeTree"></list>
        </v-card>
      </v-tabs-content>
      <v-tabs-content :id="'expenses'">
        <v-card flat>
          <v-container fluid>
            <v-layout row>
              <v-flex xs2 offset-xs10>
                <v-btn dark primary small left @click="add('expense')">
                  <v-icon>fa-plus</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
          <list :items="expenseTree"></list>
        </v-card>
      </v-tabs-content>
    </v-tabs>

    <edit-form v-if="showEditForm" :category="payload" :list="parents"></edit-form>
  </div>
</template>
<script src="./index.js"></script>