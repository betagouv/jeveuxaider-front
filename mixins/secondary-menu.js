export default {
  data () {
    return {
      selectedItem: this.$route.path
    }
  },
  computed: {
    mobileItems () {
      const items = []
      this.items.forEach((item) => {
        if (item.childrens) {
          item.childrens.forEach((item) => {
            items.push(item)
          })
        }
      })
      return items
    }
  },
  methods: {
    handleChangeItem (item) {
      this.$router.push(item.to)
    }
  }
}
