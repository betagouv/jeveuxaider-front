export default {
  data () {
    return {
      errors: {}
    }
  },
  methods: {
    setErrors (errors) {
      errors?.inner?.forEach((error) => {
        this.$set(this.errors, error.path, error.message)
      })
    }
    // validate (field) {
    //   this.formSchema
    //     .validateAt(field, this.form)
    //     .then(() => {
    //       this.errors[field] = ''
    //     })
    //     .catch((err) => {
    //       this.errors[field] = err.message
    //     })
    // }
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
