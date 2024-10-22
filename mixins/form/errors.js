import Toast from '@/components/Toast.vue'
import { useToast } from 'vue-toastification'

export default {
  data() {
    return {
      errors: {},
    }
  },
  methods: {
    setErrors(errors, showToast = true) {
      this.resetErrors()
      errors?.inner?.forEach((error) => {
        this.errors[error.path] = error.message
      })
      if (showToast && errors.errors) {
        const toast = useToast()
        toast.error({
          component: Toast,
          props: {
            message: 'Merci de corriger les éléments suivants',
            errors: errors.errors,
          },
        })
      }
    },
    resetErrors() {
      this.errors = {}
    },
    isValid(field) {
      return this.formSchema.isValid(field)
    },
    validate(field) {
      console.log('validate', field)
      this.formSchema
        .validateAt(field, this.form)
        .then(() => {
          this.errors[field] = ''
        })
        .catch((error) => {
          this.errors[field] = error.message
        })
    },
    stringContainsEmail(string) {
      return /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/is.test(string)
    },
    stringContainsUrl(string) {
      return /(http|ftp|mailto|www)/.test(string)
    },
    stringContainsPhone(string) {
      return /(?:(?:(?:\+|00)33[ ]?(?:\(0\)[ ]?)?)|0){1}[1-9]{1}([ .-]?)(?:\d{2}\1?){3}\d{2}/.test(
        string
      )
    },
  },
}
