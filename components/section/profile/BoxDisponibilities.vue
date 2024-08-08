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
        <BaseDescriptionListItem
          term="Engagement"
          :description="$filters.label(profile.commitment, 'commitment')"
        />
        <BaseDescriptionListItem
          term="Disponibilités"
          :description="
            profile.disponibilities
              ?.map((item) => $filters.label(item, 'disponibilities'))
              ?.join(', ')
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
})
</script>
