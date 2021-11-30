export default {
  methods: {
    showErrors (fields) {
      const errors = []
      const nbErrors = Object.entries(fields).length

      if (nbErrors > 4) {
        errors.push(`${nbErrors} champs ne sont pas valides.`)
      } else {
        for (const property in fields) {
          errors.push(fields[property][0].message)
        }
      }

      this.$message.error({
        message: errors.join('\r\n')
      })
    }
  }
}
