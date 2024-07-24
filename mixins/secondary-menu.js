export default {
  data() {
    return {
      selectedItem: this.$route.path,
    }
  },
  computed: {
    mobileItems() {
      const items = []
      this.items.forEach((item) => {
        if (item && item.childrens) {
          item.childrens.forEach((item) => {
            if (item) {
              items.push(item)
            }
          })
        }
      })
      return items
    },
  },
  methods: {
    handleChangeItem(item) {
      if (!item) {
        return
      }

      if (item.to) {
        this.$router.push(item.to)
      } else if (item.href) {
        window.location.href = item.href
      }
    },
  },
}
