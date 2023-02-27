
export default {
  data () {
    return {
      showOptions: false,
      highlightIndex: this.value ? this.options.findIndex((option) => { return option.key == this.value }) : 0
    }
  },
  computed: {
    selectedOption: {
      get () {
        return this.value ? this.options.find(item => item[this.attributeKey] == this.value) : null
      },
      set (newItem) {
        this.$emit('changed', newItem)
        if (newItem) {
          const index = this.options.findIndex((option) => { return option.key === newItem.key })
          this.highlightIndex = index
        } else {
          this.highlightIndex = 0
        }
      }
    }
  },
  methods: {
    reset () {
      this.highlightIndex = 0
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
    },
    onClick (e) {
      if (!this.disabled) {
        this.showOptions = !this.showOptions
      }
      this.highlightScrollIntoView()
    },
    onKeydown (e) {
      if (this.disabled) {
        return
      }

      if (e.key === 'Tab') {
        this.showOptions = false
        if (this.selectedOption) {
          const index = this.options.findIndex((option) => { return option.key === this.selectedOption.key })
          this.highlightIndex = index
        }
      }

      if (e.key === 'Enter') {
        if (this.showOptions) {
          e.preventDefault()
          e.stopPropagation()
          this.handleSelectOption(this.options[this.highlightIndex])
          return
        }
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
        e.preventDefault()
        e.stopPropagation()

        if (!this.showOptions) {
          this.showOptions = true
        }

        if (e.key === 'Enter' && !this.selectedOption) {
          this.highlightIndex = 0
        }

        if (e.key === 'ArrowDown') {
          if (this.highlightIndex + 1 === this.options.length) {
            this.highlightIndex = 0
          } else {
            this.highlightIndex += 1
          }
        }
        if (e.key === 'ArrowUp') {
          if (this.highlightIndex === 0) {
            this.highlightIndex = this.options.length - 1
          } else {
            this.highlightIndex -= 1
          }
        }

        this.highlightScrollIntoView()
      }
    },
    async highlightScrollIntoView () {
      await this.$nextTick()
      this.$refs[`option_${this.highlightIndex}`]?.[0].scrollIntoView({
        block: 'nearest'
      })
    }
  }
}
