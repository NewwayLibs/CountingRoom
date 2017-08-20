import { mapActions, mapGetters, mapMutations } from 'vuex'
import store from '@/store'
import List from './components/List.vue'
import EditForm from './components/EditForm.vue'
import { CATEGORY_INIT, CATEGORY_UPDATE, ROOM_MODULE_LOADED } from '@/store/mutation-types'

export default {
  name: 'categories',
  components: {List, EditForm},
  data () {
    return {
      isEdit: false,
      editCategory: null,
      editData: null,
      editParents: [],
      showEditForm: false
    }
  },
  created () {
    this.updateModule({title: this.$t('title.categories')})
    this.$bus.$on('category.edit', this.edit)
    this.$bus.$on('category.save', this.save)
    this.$bus.$on('category.cancel', this.cancel)
  },
  beforeDestroy () {
    this.$bus.$off('category.edit', this.edit)
    this.$bus.$off('category.save', this.save)
    this.$bus.$off('category.cancel', this.cancel)
  },
  beforeRouteEnter (to, from, next) {
    console.log(to.params, to)
    store.dispatch('room/categories/' + CATEGORY_INIT)
      .then(response => {
        console.log('ON beforeRouteEnter', response)
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
    })
  },
  methods: {
    ...mapMutations('room/', {
      updateModule: ROOM_MODULE_LOADED
    }),
    ...mapActions('room/categories/', {
      saveCategory: CATEGORY_UPDATE
    }),
    cancel () {
      this.editCategory = null
      this.editData = null
      this.showEditForm = false
    },
    edit (category) {
      console.log('edit', category)
      this.isEdit = true
      this.editCategory = category
      this.editData = {...category}
      if (category.type === 'income') {
        this.editParents = this.incomeCategories
      } else {
        this.editParents = this.expenseCategories
      }

      this.showEditForm = true
    },
    save (category) {
      console.log('save', category)
      if (this.isEdit) {
        this.saveCategory(category)
      }
      this.showEditForm = false
    }
  }
}
