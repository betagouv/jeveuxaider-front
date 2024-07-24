<template>
  <div>
    <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">Liaisons</div>
    <BaseBox variant="flat" padding="xs">
      <BaseDescriptionList>
        <template v-if="term.vocabulary.name === 'Skills'">
          <BaseDescriptionListItem term="Bénévoles" :description="term.profiles_count" />
          <BaseDescriptionListItem term="Missions" :description="term.missions_count" />
        </template>
        <template v-else>
          <BaseDescriptionListItem term="Liaisons" :description="term.related_count" />
        </template>
      </BaseDescriptionList>
    </BaseBox>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    term: {
      type: Object,
      required: true,
    },
  },
})
</script>
