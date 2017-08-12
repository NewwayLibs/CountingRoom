import {default as ea} from '@/event-aggregator'

export default {
  methods: {
    notify: function (msg, options) {
      ea.$emit('notify', msg, options)
    }
  }
}
