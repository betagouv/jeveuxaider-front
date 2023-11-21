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
    validate(field) {
      this.formSchema
        .validateAt(field, this.form)
        .then(() => {
          delete this.errors.field
        })
        .catch((error) => {
          this.errors[field] = error.message
        })
    },
  },
}
