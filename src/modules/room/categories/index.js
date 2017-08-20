import { mapActions, mapGetters, mapMutations } from 'vuex'
import store from '@/store'
import List from './components/List.vue'
import EditForm from './components/EditForm.vue'
import Notify from '@/mixins/notify'
import { deepCopy, listToTree } from '@/utils/utils'
import {
  CATEGORY_ADD,
  CATEGORY_DELETE,
  CATEGORY_INIT,
  CATEGORY_UPDATE,
  ROOM_MODULE_LOADED
} from '@/store/mutation-types'

export default {
  name: 'categories',
  components: {List, EditForm},
  mixins: [Notify],
  data () {
    return {
      isEdit: false,
      payload: null,
      parents: [],
      showEditForm: false
    }
  },
  created () {
    this.updateModule({title: this.$t('title.categories')})
    this.$bus.$on('category.edit', this.edit)
    this.$bus.$on('category.save', this.save)
    this.$bus.$on('category.cancel', this.cancel)
    this.$bus.$on('category.remove', this.remove)
  },
  beforeDestroy () {
    this.$bus.$off('category.edit', this.edit)
    this.$bus.$off('category.save', this.save)
    this.$bus.$off('category.cancel', this.cancel)
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('room/categories/' + CATEGORY_INIT)
      .then(response => {
        next()
      })
      .catch(e => {
        console.error('ON beforeRouteEnter', e)
        // this.error(e.getMessage())
      })
  },
  computed: {
    ...mapGetters('room/categories/', {
      incomeCategories: 'income',
      expenseCategories: 'expense'
    }),
    incomeTree () {
      return listToTree(deepCopy(this.incomeCategories))
    },
    expenseTree () {
      return listToTree(deepCopy(this.expenseCategories))
    }
  },
  methods: {
    ...mapMutations('room/', {
      updateModule: ROOM_MODULE_LOADED
    }),
    ...mapActions('room/categories/', {
      newCategory: CATEGORY_ADD,
      saveCategory: CATEGORY_UPDATE,
      removeCategory: CATEGORY_DELETE
    }),
    cancel () {
      this.payload = null
      this.showEditForm = false
    },
    add (type) {
      this.isEdit = false
      this.payload = {type: type}
      this.parents = (type === 'income') ? this.incomeCategories : this.expenseCategories
      this.showEditForm = true
    },
    edit (category) {
      this.isEdit = true
      this.payload = {...category}
      this.parents = (category.type === 'income') ? this.incomeCategories : this.expenseCategories
      this.showEditForm = true
    },
    save (category) {
      let saver = (this.isEdit) ? this.saveCategory(category) : this.newCategory(category)
      saver
        .then(() => {
          this.success('Category saved')
        })
        .catch(() => {
          this.error('Category save error')
        })
        .finally(() => {
          this.showEditForm = false
        })
    },
    remove (category) {
      this.removeCategory(category)
        .then(() => {
          this.success('Category removed')
        })
        .catch(() => {
          this.error('Category delete error')
        })
        .finally(() => {
          this.showEditForm = false
        })
    }
  }
}
