<template>
  <div class="space-y-12">
    <FormControl
      label="Titre"
      html-for="meta_title"
    >
      <Input
        v-model="form.title"
        name="meta_title"
        :placeholder="placeholders.title"
      />
    </FormControl>
    <FormControl
      label="Description"
      html-for="metatag_description"
    >
      <Textarea
        v-model="form.description"
        name="metatag_description"
        :placeholder="placeholders.description"
      />
    </FormControl>
  </div>
</template>

<script>
export default {
  props: {
    metas: { type: Object, required: true },
    placeholders: { type: Object, default: () => { return { title: '...', description: '...' } } }
  },
  data () {
    return {
      form: this.metas.properties
    }
  }
}
</script>
