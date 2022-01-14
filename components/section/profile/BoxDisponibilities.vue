<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">
        Engagement
      </div>
      <Link to="/profile/edit" icon="ChevronRightIcon">
        Modifier
      </Link>
    </div>
    <Box variant="flat" padding="xs">
      <DescriptionList>
        <DescriptionListItem term="Visibilité" :description="profile.is_visible ? 'Visible des organisations' : 'Invisible des organisations'" />
        <DescriptionListItem term="Fréquence" :description="commitmentLabel" />
        <DescriptionListItem term="Périodes" :description="profile.disponibilities.map((item) => $options.filters.label(item,'disponibilities')).join(', ')" />
      </DescriptionList>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      required: true
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
