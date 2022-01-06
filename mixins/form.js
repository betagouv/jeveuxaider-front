import Toast from '@/components/base/Toast'

export default {
  data () {
    return {
      errors: {}
    }
  },
  methods: {
    setErrors (errors, showToast = true) {
      this.resetErrors()
      errors?.inner?.forEach((error) => {
        this.$set(this.errors, error.path, error.message)
      })
      if (showToast) {
        this.$toast.error({
          component: Toast,
          props: {
            message: 'Merci de corriger les éléments suivants',
            errors: errors.errors
          }
        })
      }
    },
    resetErrors () {
      this.errors = {}
    },
    validate (field) {
      this.formSchema
        .validateAt(field, this.form)
        .then(() => {
          this.$delete(this.errors, field)
        })
        .catch((error) => {
          this.$set(this.errors, field, error.message)
        })
    }
  }
}
