<template>
  <div>
    <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">
      Liaisons
    </div>
    <Box variant="flat" padding="xs">
      <DescriptionList>
        <template v-if="term.vocabulary.name === 'Skills'">
          <DescriptionListItem term="Bénévoles" :description="term.profiles_count" />
          <DescriptionListItem term="Missions" :description="term.missions_count" />
        </template>
        <template v-else>
          <DescriptionListItem term="Liaisons" :description="term.related_count" />
        </template>
      </DescriptionList>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    term: {
      type: Object,
      required: true
    }
  }
}
</script>
