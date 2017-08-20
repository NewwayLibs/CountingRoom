<template>
  <v-dialog :value="true" lazy absolute persistent width="400px">
    <v-card>
      <v-card-text>
        <v-container fluid>
          <v-layout row>
            <v-flex>
              <v-text-field
                name="title"
                label="Title"
                v-model="category.title"
                :error-messages="vErrors.collect('title')"
                v-validate="'required|min:3'"
                :append-icon="'fa-font'"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex>
              <v-text-field
                name="icon"
                label="Icon"
                v-model="category.icon"
                :error-messages="vErrors.collect('icon')"
                v-validate="'required|min:3'"
                :append-icon="'fa-picture-o'"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex>
              <v-select
                v-bind:items="types"
                v-model="category.type"
                label="Type"
                :append-icon="'fa-angle-down'"
              ></v-select>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex>
              <v-select
                v-bind:items="parents"
                v-model="category.parent_id"
                label="Parent"
                :append-icon="'fa-angle-down'"
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions v-if="!loading">
        <v-btn v-if="category.id" error class="text-xs-left" @click="remove()">Delete</v-btn>
        <v-spacer></v-spacer>
        <v-btn secondary @click="cancel()">Cancel</v-btn>
        <v-btn primary @click="save()" :disabled="!isValid">Save</v-btn>
      </v-card-actions>
      <v-card-actions v-else>
        <v-spacer></v-spacer>
        <v-progress-circular indeterminate center class="primary--text"></v-progress-circular>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'EditForm',
    props: {
      category: {
        type: Object,
        required: true
      },
      list: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        loading: false,
        types: [
          {value: 'income', text: 'Income'},
          {value: 'expense', text: 'Expense'}
        ]
      }
    },
    computed: {
      isValid () {
        return !this.vErrors.any()
      },
      parents () {
        let list = [
          {value: null, text: ''}
        ]
        this.list.forEach(row => {
          if (row.id !== this.category.id) {
            list.push({value: row.id, text: row.title})
          }
        })
        return list
      }
    },
    methods: {
      save () {
        this.loading = true
        this.$bus.$emit('category.save', this.category)
      },
      cancel () {
        this.loading = true
        this.$bus.$emit('category.cancel')
      },
      remove () {
        this.loading = true
        this.$bus.$emit('category.remove', this.category)
      }
    }
  }
</script>