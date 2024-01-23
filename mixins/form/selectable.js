export default {
  emits: ['update:modelValue', 'changed', 'blur'],
  data() {
    return {
      showOptions: false,
      highlightIndex: this.modelValue
        ? this.options.findIndex((option) => {
            return option[this.attributeKey] == this.modelValue
          })
        : 0,
      enableUnselect: false,
    }
  },
  computed: {
    // @todo: supprimer quand refactoring single et multiple done,
    // remplacer par modelValue dans le code
    splittedModelValue() {
      if (Array.isArray(this.modelValue)) {
        return this.modelValue
      }
      if (typeof this.modelValue === 'string') {
        return this.modelValue?.split(',')
      }
      return []
    },
    activeOptions() {
      return this.options.filter((o) =>
        this.splittedModelValue.includes(String(o[this.attributeKey]))
      )
    },
  },
  watch: {
    async showOptions(newVal) {
      await this.$nextTick()
      if (newVal) {
        this.highlightScrollIntoView()
      }
    },
    modelValue(newVal) {
      if (!this.multiple) {
        // @todo: tester !
        // @todo ensuite: supprimer
        // remplacer @changed par @update:modelValue (BaseSelectAdvanced, BaseFilterSelectAdvanced)
        // FiltersYears, SelectAdvancedMessageTemplate, SecondaryMenuAdmin, SecondaryMenuResponsable,
        // SecondaryMenuStatistics, SecondaryMenuStatisticsPublic, SecondaryMenuSupport,
        // SecondaryMenuTeteDeReseau, CommitmentFilter, CommitmentMobileFilter
        this.$emit(
          'changed',
          this.options.find((o) => o[this.attributeKey] === newVal)
        )

        this.setHighlightedIndexFromActiveOptions()
      }
    },
  },
  methods: {
    reset() {
      this.highlightIndex = 0
      this.showOptions = false
      this.$emit('update:modelValue', null)
    },
    clickedOutside() {
      this.showOptions = false
    },

    // @todo: refactoring single et multiple, toujours renvoyer un array pour modelValue
    handleSelectOption(item) {
      if (item) {
        this.$emit('update:modelValue', this.isOptionActive(item) ? null : item[this.attributeKey])
      }
      this.$emit('blur')
      this.showOptions = false
    },
    handleSelectOptionMultiple(item) {
      if (this.multiple) {
        this.$emit('update:modelValue', item[this.attributeKey])
      }
    },

    onClick(e) {
      if (!this.disabled) {
        this.showOptions = !this.showOptions
      }
      this.highlightScrollIntoView()
    },
    onKeydown(e) {
      if (this.disabled) {
        return
      }

      if (e.key === 'Tab') {
        this.showOptions = false
        this.setHighlightedIndexFromActiveOptions()
        return
      }

      if (e.key === 'Enter' && this.showOptions) {
        e.preventDefault()
        e.stopPropagation()
        this.handleSelectOption(this.options[this.highlightIndex])
        return
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
        e.preventDefault()
        e.stopPropagation()

        if (!this.showOptions) {
          this.showOptions = true
        }

        if (this.options.every((item) => item.disabled)) {
          return
        }

        let offset = 1
        if (e.key === 'ArrowDown') {
          let index =
            this.highlightIndex + offset > this.options.length - 1 ? -1 : this.highlightIndex
          while (this.options[index + offset]?.disabled) {
            offset += 1
            if (index + offset > this.options.length - 1) {
              index = -1
              offset = 1
            }
          }
          this.highlightIndex = index + offset
        }
        if (e.key === 'ArrowUp') {
          let index = this.highlightIndex - offset < 0 ? this.options.length : this.highlightIndex
          while (this.options[index - offset]?.disabled) {
            offset += 1
            index = index - offset < 0 ? this.options.length : index
          }

          this.highlightIndex = index - offset
        }

        this.highlightScrollIntoView()
      }
    },
    async highlightScrollIntoView() {
      await this.$nextTick()
      this.$refs[`option_${this.highlightIndex}`]?.[0].scrollIntoView({
        block: 'nearest',
      })
    },
    isOptionActive(option) {
      return this.activeOptions.some((o) => o[this.attributeKey] == option[this.attributeKey])
    },
    setHighlightedIndexFromActiveOptions() {
      const index = this.options.findIndex(
        (o) => o[this.attributeKey] === this.activeOptions[0]?.[this.attributeKey] ?? 0
      )
      this.highlightIndex = index !== -1 ? index : 0
    },
  },
}
