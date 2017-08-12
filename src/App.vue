<template>
  <div id="app">
    <!-- set progressbar -->
    <vue-progress-bar></vue-progress-bar>

    <v-snackbar
      :timeout="notifyData.timeout"
      :top="notifyData.y === 'top'"
      :bottom="notifyData.y === 'bottom'"
      :right="notifyData.x === 'right'"
      :left="notifyData.x === 'left'"
      :multi-line="notifyData.mode === 'multi-line'"
      :vertical="notifyData.mode === 'vertical'"
      v-model="notifyData.status"
    >
      {{ notifyData.text }}
      <v-btn flat class="pink--text" @click.native="notifyData.status = false">Close</v-btn>
    </v-snackbar>

    <v-snackbar
      :timeout="notifyData.timeout"
      :top="notifyData.y === 'top'"
      :bottom="notifyData.y === 'bottom'"
      :right="notifyData.x === 'right'"
      :left="notifyData.x === 'left'"
      :multi-line="notifyData.mode === 'multi-line'"
      :vertical="notifyData.mode === 'vertical'"
      v-model="notifyData.status"
    >
      {{ notifyData.text }}
      <v-btn flat class="pink--text" @click.native="notifyData.status = false">Close</v-btn>
    </v-snackbar>

    <router-view></router-view>
  </div>
</template>

<script>
  import {default as ea} from '@/event-aggregator'
  import {assign} from 'lodash'

  export default {
    name: 'app',
    data () {
      return {
        notifiers: [],
        notifyData: {
          status: false,
          mode: 'vertical',
          x: 'right',
          y: 'bottom',
          timeout: 5000,
          text: null
        }
      }
    },
    mounted () {
      //  [App.vue specific] When App.vue is finish loading finish the progress bar
      this.$Progress.finish()
    },
    created () {
      //  [App.vue specific] When App.vue is first loaded start the progress bar
      this.$Progress.start()
      //  hook the progress bar to start before we move router-view
      this.$router.beforeEach((to, from, next) => {
        //  does the page we want to go to have a meta.progress object
        if (to.meta.progress !== undefined) {
          let meta = to.meta.progress
          // parse meta tags
          this.$Progress.parseMeta(meta)
        }
        //  start the progress bar
        this.$Progress.start()
        //  continue to next page
        next()
      })
      //  hook the progress bar to finish after we've finished moving router-view
      this.$router.afterEach((to, from) => {
        //  finish the progress bar
        this.$Progress.finish()
      })

      ea.$on('notify', this.notify)
    },
    methods: {
      notify (msg, options) {
        assign(this.notifyData, options)
        console.log('app notify', msg)
        this.notifyData.text = msg
        this.notifyData.status = true
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
