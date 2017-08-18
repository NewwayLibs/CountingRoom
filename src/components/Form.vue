<template>
  <div>
    <form :action="action" @submit.prevent="onSubmit">
      <v-tabs grow="grow" scroll-bars="scroll-bars" v-model="active" dark="dark" v-if="groupBy">
        <v-tabs-bar slot="activators">
          <v-tabs-item v-for="(field, key) in group.parents" :key="key" :href="'tab-' + key"
                       ripple="ripple"></v-tabs-item>
          <v-tabs-slider></v-tabs-slider>
        </v-tabs-bar>
        <v-tabs-content v-for="(fields, key) in group.children" :key="key" :id="'tab-' + key">
          <v-card flat="flat">
            <v-card-text>
              <v-field v-for="(field, name) in fields" :key="name" :name="name" :field="field"
                       v-model="model[name]"></v-field>
            </v-card-text>
          </v-card>
        </v-tabs-content>
      </v-tabs>

      <v-layout v-bind="{[inline? 'row': 'column']: true}" v-if="!groupBy">
        <v-field v-for="(field, name) in fields" :key="name" :name="name" :field="field"
                 v-model="model[name]"></v-field>

        <slot></slot>

        <v-flex xs12="xs12" class="pt-2 actions">
          <slot name="buttons">
            <v-btn primary="primary" dark="dark" type="submit" class="ma-0">{{$t(submitButtonText)}}
              <v-icon right="right" dark="dark">{{submitButtonIcon}}</v-icon>
            </v-btn>
          </slot>
        </v-flex>
      </v-layout>
    </form>
  </div>
</template>

<script>
  export default {
    props: {
      inline: {
        type: Boolean,
        default: false
      },
      groupBy: {
        required: false,
        type: String,
        default: null
      },
      action: {
        required: false,
        type: String,
        default: null
      },
      submitButtonText: {
        required: false,
        type: String,
        default: 'Submit'
      },
      submitButtonIcon: {
        required: false,
        type: String,
        default: 'fa-paper-plane'
      },
      method: {
        required: false,
        type: String,
        default: 'post'
      },
      value: {
        required: false,
        type: Object,
        default: () => { }
      },
      fields: {
        required: true,
        type: Object
      },
      messages: {
        required: false,
        type: Object,
        default: () => { }
      }

    },
    data () {
      return {
        model: this.value
      }
    },

    computed: {
      group () {
        if (!this.groupBy) {
          return null
        }
        let parents = {}
        let children = {}
        for (let k in this.fields) {
          let field = this.fields[k]
          let ref = field[this.groupBy]
          let parentKey = field.id
          if (ref === null) { // is parent
            parents[parentKey] = field
          } else { // is child
            if (!children[ref]) {
              children[ref] = {}
            }
            children[ref][k] = field
          }
        }
        return {parents, children}
      },

      autoSubmit () {
        return !!this.action
      }
    },
    watch: {
      'value' (val) {
        this.model = val
      },
      'model': 'updateFields'
    },
    methods: {

      getGroupedFields () { },
      getFieldError (fieldName) {
        for (let k in this.errors) {
          let error = this.errors[k]
          if (error.field === fieldName) {
            return error.message
          }
        }
      },
      updateFields () {

      },

      onSubmit () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$emit('input', this.model)
            if (!this.autoSubmit) {
              this.$emit('success', this.model)
              return false
            }

            this.$http[this.method](this.action, this.model)
            .then(({data}) => {
              this.$emit('success', data)
              this.hasError = false
            })
            .catch(({response}) => {
              let {status, data} = response
              this.hasError = true
              if (data.message) {
                this.errors = [data]
              }
              switch (status) {
                case 422:

                  this.errors = data
                  break
                default:

              }
              this.$emit('error', status, data)
            })
          }
        })
      }
    },
    mounted () {
      // this.$bus.showMessage('success', 'success')
    },
    created () {
      // global.validator.extend('unique', function (data, field, message, args, get) {
      //   return new Promise(function (resolve, reject) {
      //     // const fieldValue = get(data, field)
      //     return resolve('Unsupported in client.')
      //   })
      // }, this.$t('Field should be unique.'))
    }
  }
</script>
