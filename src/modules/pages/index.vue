<template>
  <div v-if="page" class="hello">
    <h1>{{ page.title }}</h1>
    <div>{{ page.content }}</div>
    <links></links>
  </div>
  <div v-else>
    <v-progress-circular indeterminate class="primary--text"></v-progress-circular>
  </div>
</template>
<script src="./index.js"></script>