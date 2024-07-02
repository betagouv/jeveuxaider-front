<template>
  <BaseDrawer :is-open="Boolean(profile)" @close="$emit('close')">
    <template #title>
      <BaseHeading v-if="profile" :level="3">
        {{ profile.secret_name }}
      </BaseHeading>
    </template>
    <template v-if="profile">
      <div class="mt-1 text-gray-500">
        {{ $filters.label(profile.type, 'profile_type') }}
      </div>
      <div class="border-t -mx-6 my-6" />
      <div class="mb-8">
        <div class="text-sm flex justify-between px-2 mb-2 items-center">
          <div class="uppercase font-semibold text-gray-600">Engagement</div>
        </div>
        <BaseBox variant="flat" padding="xs">
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
            <BaseDescriptionListItem
              v-if="profile.skills"
              term="Compétences"
              :description="
                profile.skills
                  .map(function (item) {
                    return item.name
                  })
                  .join(', ')
              "
            />
          </BaseDescriptionList>
        </BaseBox>
      </div>
      <div>
        <div class="text-sm flex justify-between px-2 mb-2 items-center">
          <div class="uppercase font-semibold text-gray-600">Profil</div>
        </div>
        <BaseBox variant="flat" padding="xs">
          <BaseDescriptionList>
            <BaseDescriptionListItem term="Code postal" :description="profile.zip" />
            <BaseDescriptionListItem
              term="Profession"
              :description="$filters.label(profile.type, 'profile_type')"
            />
            <BaseDescriptionListItem
              v-if="profile.domaines"
              term="Domaines"
              :description="
                profile.domaines.map((item) => $filters.label(item, 'domaines')).join(', ')
              "
            />
            <BaseDescriptionListItem
              v-if="profile.skills"
              term="Compétences"
              :description="profile.skills.map((item) => item.name).join(', ')"
            />
          </BaseDescriptionList>
        </BaseBox>
      </div>
    </template>
  </BaseDrawer>
</template>

<script>
export default defineNuxtComponent({
  props: {
    profile: {
      type: Object,
      default: null,
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
