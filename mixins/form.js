import Toast from '@/components/base/Toast'

export default {
  data () {
    return {
      errors: {}
    }
  },
  methods: {
    setErrors (errors) {
      this.resetErrors()
      errors?.inner?.forEach((error) => {
        this.$set(this.errors, error.path, error.message)
      })
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
    },
    showErrorsInToast (fields) {
      this.$toast.error({
        component: Toast,
        props: {
          message: 'Merci de corriger les éléments suivants',
          errors: fields.errors
        }
      })
    }
  }
}
