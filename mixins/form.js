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
      console.log('validating', field)
      this.formSchema
        .validateAt(field, this.form)
        .then(() => {
          this.$delete(this.errors, field)
        })
        .catch((error) => {
          this.$set(this.errors, field, error.message)
        })
    }
    // showErrors (fields) {
    //   const errors = []
    //   const nbErrors = Object.entries(fields).length

    //   if (nbErrors > 4) {
    //     errors.push(`${nbErrors} champs ne sont pas valides.`)
    //   } else {
    //     for (const property in fields) {
    //       errors.push(fields[property][0].message)
    //     }
    //   }

    //   this.$message.error({
    //     message: errors.join('\r\n')
    //   })
    // }
  }
}
