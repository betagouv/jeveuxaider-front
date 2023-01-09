
export default {
  data () {
    return {
      showOptions: false,
      highlightIndex: null
    }
  },
  computed: {
    selectedOption: {
      get () {
        return this.value ? this.options.find(item => item[this.attributeKey] == this.value) : null
      },
      set (newItem) {
        this.$emit('changed', newItem)
        // this.handleSelectOption(newItem)
      }
    }
  },
  methods: {
    reset () {
      this.highlightIndex = null
      this.selectedOption = null
      this.showOptions = false
      this.$emit('input', null)
    },
    clickedOutside () {
      this.showOptions = false
    },
    handleSelectOption (item) {
      if (item && this.selectedOption && this.selectedOption[this.attributeKey] === item[this.attributeKey]) {
        this.$emit('input', null)
        this.selectedOption = null
      } else if (item) {
        this.$emit('input', item[this.attributeKey])
        this.selectedOption = item
      }
      this.$emit('blur')
      this.showOptions = false
      this.highlightIndex = null
    },
    onKeydown (e) {
      if (this.disabled) {
        return
      }
      const keyValue = e.which // enter key
      if (keyValue === 9) {
        this.showOptions = false
        this.highlightIndex = null
      }

      if (keyValue === 13) {
        if (this.highlightIndex !== null) {
          this.handleSelectOption(this.options[this.highlightIndex])
          return
        }
      }
      if (keyValue === 40 || keyValue === 38 || keyValue === 13) {
        e.preventDefault()
        e.stopPropagation()
        if (this.highlightIndex === null) {
          this.showOptions = true
          this.highlightIndex = 0
          return
        }
        if (keyValue === 40) {
          if (this.highlightIndex + 1 === this.options.length) {
            this.highlightIndex = 0
          } else {
            this.highlightIndex += 1
          }
        }
        if (keyValue === 38) {
          if (this.highlightIndex === 0) {
            this.highlightIndex = this.options.length - 1
          } else {
            this.highlightIndex -= 1
          }
        }
        this.$refs[`option_${this.highlightIndex}`]?.[0].scrollIntoView({
          block: 'nearest'
        })
      }
    }
  }
}
