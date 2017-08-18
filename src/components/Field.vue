<template>
  <v-flex xs12="xs12">
    <v-select v-if="['select', 'select2'].includes(field.type)" :items="field.choices" v-model="model"
              v-bind="field"></v-select>
    <template v-else-if="['radios', 'checkboxes'].indexOf(field.type) &gt; -1">
      <p>{{$t(field.label)}}</p>
      <v-layout row="row" wrap="wrap">
        <v-flex v-bind="{[field.width]: true}" xs12="xs12" v-for="option in field.choices" :key="field.value">
          <component v-model="model" hide-details="hide-details" :is="field.type == 'radios' ? 'v-radio' : 'v-checkbox'"
                     :key="option.value" :value="option.value" :label="option.text"></component>
        </v-flex>
      </v-layout>
    </template>
    <template v-else-if="['date', 'datetime', 'time'].indexOf(field.type) &gt; -1">
      <v-menu>
        <v-text-field slot="activator" v-model="model" :label="$t(field.label)"></v-text-field>
        <v-date-picker v-model="model" no-title="no-title" scrollable="scrollable" actions="actions"></v-date-picker>
      </v-menu>
    </template>
    <div :class="inputGroupClass" v-else-if="field.type == 'html'">
      <label>{{$t(field.label)}}</label>
      <div class="pt-2">
        <quill-editor v-model="model"></quill-editor>
      </div>
    </div>
    <v-text-field v-else v-model='model' v-bind='field' :label="$t(field.label)"
                  :type="field.type" :multiLine="field.type == 'textarea'"
                  :name="name"
                  :error-messages="vErrors.collect(name)"
                  v-validate.initial="field.validation"
    >
    </v-text-field>
    <!--todo dropzone-->
    <!--<div :class="inputGroupClass" v-else-if="['file', 'image', 'video'].includes(field.type)">
      <label>{{$t(field.label)}}</label>
      <div class="pt-2">
        <dropzone :id="'dropzone_' + name" :url="$store.state.config.ajaxUploadUrl">
          <input type="hidden" v-model="model"/>
        </dropzone>
      </div>
    </div>-->
  </v-flex>
</template>

<script>
  export default {
    inject: ['$validator'],
    props: {
      field: {
        type: Object,
        required: true
      },
      name: {
        type: String,
        required: false
      },
      value: {
        required: false
      }
    },
    data () {
      return {
        inputGroupClass: 'input-group input-group--dirty input-group--text-field'
      }
    },
    computed: {

      model: {
        get () {
          return this.value
        },
        set (val) {
          this.$emit('input', val)
        }
      }
    },
    methods: {
      onSelectFile (e) {
        console.log(e)
      }
    }
  }
</script>