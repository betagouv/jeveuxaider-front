<template>
  <div>
    <DsfrFormControl html-for="algolia-search">
      <AlgoliaInputAutocomplete
        index="termsIndex"
        variant="dsfr"
        attribute-right-label="group"
        :search-parameters="{
          facetFilters: [['vocabulary_name:Skills']],
          hitsPerPage: 6,
        }"
        @selected="handleSelectSkillItems"
      />
    </DsfrFormControl>

    <div v-if="skills.length" class="mt-6">
      <div class="flex flex-wrap gap-2">
        <DsfrTag
          v-for="item in skills"
          :key="item.id"
          size="md"
          as="button"
          context="deletable"
          @delete="onRemovedSkillItem(item)"
          class="max-w-[300px]"
        >
          {{ item.name }}
        </DsfrTag>
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    modelValue: { type: Array, required: true },
  },
  setup() {
    return {}
  },
  data() {
    return {
      skills: this.modelValue,
    }
  },
  methods: {
    handleSelectSkillItems(item) {
      if (!this.skills.some((skill) => skill.id === item.id)) {
        this.skills = [...this.skills, item]
      }
    },
    onRemovedSkillItem(item) {
      this.skills = this.skills.filter((skill) => skill.id !== item.id)
    },
  },
  watch: {
    skills(newVal) {
      this.$emit('update:modelValue', newVal)
    },
  },
})
</script>
