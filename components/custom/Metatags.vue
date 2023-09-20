<template>
  <div class="space-y-12">
    <BaseFormControl label="Titre" html-for="meta_title">
      <BaseInput v-model="form.title" name="meta_title" :placeholder="placeholders.title" />
    </BaseFormControl>
    <BaseFormControl label="Description" html-for="metatag_description">
      <BaseTextarea
        v-model="form.description"
        name="metatag_description"
        :placeholder="placeholders.description"
      />
    </BaseFormControl>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    metas: { type: Object, required: true },
    placeholders: {
      type: Object,
      default: () => {
        return { title: '...', description: '...' }
      },
    },
  },
  data() {
    return {
      form: this.metas.properties,
    }
  },
})
</script>
