<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div v-if="showTitle" class="uppercase font-semibold text-gray-600">
        Engagement
      </div>
      <Link v-if="showAction" :to="linkAction" class="text-jva-blue-500">
        {{ linkLabel }}
      </Link>
    </div>
    <Box :variant="boxVariant" :padding="boxPadding">
      <slot name="box-before" />
      <DescriptionList>
        <DescriptionListItem term="Visibilité" :description="profile.is_visible ? 'Visible des organisations' : 'Invisible des organisations'" />
        <DescriptionListItem term="Fréquence" :description="commitmentLabel" />
        <DescriptionListItem v-if="profile.disponibilities" term="Périodes" :description="profile.disponibilities.map((item) => $options.filters.label(item,'disponibilities')).join(', ')" />
      </DescriptionList>
    </Box>
  </div>
</template>

<script>
import Link from '@/components/dsfr/Link'

export default {
  components: {
    Link
  },
  props: {
    profile: {
      type: Object,
      required: true
    },
    showAction: {
      type: Boolean,
      default: true
    },
    linkAction: {
      type: String,
      default: '/profile/edit'
    },
    linkLabel: {
      type: String,
      default: 'Modifier'
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    boxVariant: {
      type: [String],
      default: 'flat'
    },
    boxPadding: {
      type: [String, Boolean],
      default: 'xs'
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
