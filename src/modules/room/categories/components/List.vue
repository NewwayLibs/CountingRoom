<template>
  <div :style="{'padding-left': padding}">
    <template v-for="item in items">
      <v-list v-bind:key="item.id">
        <v-list-tile @click="edit(item)" ripple>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action-text>
            <v-chip small class="green white--text">
              {{ item.usage }}
            </v-chip>
          </v-list-tile-action-text>
        </v-list-tile>
      </v-list>

      <v-divider v-if="item.children.length"></v-divider>

      <category-list v-if="item.children.length" :items="item.children" :level="level + 1"></category-list>
    </template>
  </div>

</template>

<script>
  export default {
    name: 'CategoryList',
    props: {
      items: {
        type: Array,
        default: []
      },
      level: {
        type: Number,
        default: 0
      }
    },
    computed: {
      padding: function () {
        return this.level * 20 + 'px'
      }
    },
    data () {
      return {}
    },
    methods: {
      edit (category) {
        this.$bus.$emit('category.edit', category)
      }
    }
  }
</script>
