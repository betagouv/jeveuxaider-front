import { v4 as uuidv4 } from 'uuid'

export default {
  methods: {
    onParagraphAddItem(field, newRow) {
      if (!this.form[field]) {
        this.form[field] = []
      }
      this.form[field].push({ ...newRow, uuid: uuidv4() })
    },
    onParagraphUpdateItem(field, event) {
      this.form[field].splice(event.index, 1, event.payload)
    },
    onParagraphRemoveItem(field, index) {
      this.form[field].splice(index, 1)
    },
  },
}
