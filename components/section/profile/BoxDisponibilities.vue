<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div v-if="showTitle" class="uppercase font-semibold text-gray-600">Engagement</div>
      <DsfrLink v-if="showAction" :to="linkAction" class="text-jva-blue-500">
        {{ linkLabel }}
      </DsfrLink>
    </div>
    <BaseBox :variant="boxVariant" :padding="boxPadding">
      <slot name="box-before" />
      <BaseDescriptionList>
        <BaseDescriptionListItem
          term="Visibilité"
          :description="
            profile.is_visible ? 'Visible des organisations' : 'Invisible des organisations'
          "
        />
        <BaseDescriptionListItem term="Fréquence" :description="commitmentLabel" />
        <BaseDescriptionListItem
          v-if="profile.disponibilities"
          term="Périodes"
          :description="
            profile.disponibilities
              .map((item) => $filters.label(item, 'disponibilities'))
              .join(', ')
          "
        />
      </BaseDescriptionList>
    </BaseBox>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    profile: {
      type: Object,
      required: true,
    },
    showAction: {
      type: Boolean,
      default: true,
    },
    linkAction: {
      type: String,
      default: '/profile/edit',
    },
    linkLabel: {
      type: String,
      default: 'Modifier',
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    boxVariant: {
      type: [String],
      default: 'flat',
    },
    boxPadding: {
      type: [String, Boolean],
      default: 'xs',
    },
  },
  computed: {
    commitmentLabel() {
      if (this.profile.commitment__time_period) {
        return `${this.$filters.label(
          this.profile.commitment__duration,
          'duration'
        )} par ${this.$filters.label(this.profile.commitment__time_period, 'time_period')}`
      }
      return this.$filters.label(this.profile.commitment__duration, 'duration')
    },
  },
})
</script>
