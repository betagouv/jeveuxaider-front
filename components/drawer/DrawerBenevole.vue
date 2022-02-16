<template>
  <Drawer :is-open="Boolean(profile)" @close="$emit('close')">
    <template #title>
      <Heading v-if="profile" :level="3">
        {{ profile.first_name }} {{ profile.last_name[0] }}
      </Heading>
    </template>
    <template v-if="profile">
      <div class="mt-1 text-gray-500">
        {{ profile.type | label('profile_type') }}
      </div>
      <div class="border-t -mx-6 my-6" />
      <div class="mb-8">
        <div class="text-sm flex justify-between px-2 mb-2 items-center">
          <div class="uppercase font-semibold text-gray-600">
            Engagement
          </div>
        </div>
        <Box variant="flat" padding="xs">
          <DescriptionList>
            <DescriptionListItem term="Visibilité" :description="profile.is_visible ? 'Visible des organisations' : 'Invisible des organisations'" />
            <DescriptionListItem term="Fréquence" :description="commitmentLabel" />
            <DescriptionListItem v-if="profile.disponibilities" term="Périodes" :description="profile.disponibilities.map((item) => $options.filters.label(item,'disponibilities')).join(', ')" />
            <DescriptionListItem
              v-if="profile.skills"
              term="Compétences"
              :description="profile.skills.map(function (item) { return item.name.fr }).join(', ')"
            />
          </DescriptionList>
        </Box>
      </div>
      <div>
        <div class="text-sm flex justify-between px-2 mb-2 items-center">
          Profil
        </div>
        <Box variant="flat" padding="xs">
          <DescriptionList>
            <DescriptionListItem term="Code postal" :description="profile.zip" />
            <DescriptionListItem term="Profession" :description="$options.filters.label(profile.type,'profile_type')" />
            <DescriptionListItem
              v-if="profile.domaines"
              term="Domaines"
              :description="profile.domaines.map((item) => $options.filters.label(item, 'domaines')).join(', ')"
            />
            <DescriptionListItem
              v-if="profile.skills"
              term="Compétences"
              :description="profile.skills.map((item) => item.name.fr).join(', ')"
            />
          </DescriptionList>
        </Box>
      </div>
    </template>
  </Drawer>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      default: null
    }
  },
  computed: {
    commitmentLabel () {
      if (this.profile.commitment__time_period) {
        return `${this.$options.filters.label(this.profile.commitment__duration, 'duration')} par ${this.$options.filters.label(this.profile.commitment__time_period, 'time_period')}`
      }
      return this.$options.filters.label(this.profile.commitment__duration, 'duration')
    }
  }
}
</script>
