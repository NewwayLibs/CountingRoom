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
          <v-card-text>Income: {{ incomeCategories.length }}</v-card-text>
          <list :items="incomeCategories"></list>
        </v-card>
      </v-tabs-content>
      <v-tabs-content :id="'expenses'">
        <v-card flat>
          <v-card-text>Expense: {{ expenseCategories.length }}</v-card-text>
        </v-card>
      </v-tabs-content>
    </v-tabs>

    <edit-form v-if="showEditForm" :category="editData" :list="editParents"></edit-form>


    <h3>Income list: {{ incomeCategories.length }}</h3>
  </div>
</template>
<script src="./index.js"></script>