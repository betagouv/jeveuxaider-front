<template>
  <BaseDrawer :is-open="Boolean(profileId)" @close="$emit('close')">
    <template #title>
      <BaseHeading v-if="profile" :level="3">
        À propos de {{ profile.first_name }} {{ profile.last_name }}
      </BaseHeading>
    </template>
    <div v-if="profile" class="grid grid-cols-1 border px-8 divide-y mt-8">
      <div class="py-8">
        <div class="text-xl font-bold text-gray-900 mb-4">Informations</div>
        <BaseDescriptionList>
          <BaseDescriptionListItem term="Email" :description="profile.email" />
          <BaseDescriptionListItem term="Mobile" :description="profile.mobile" />
          <BaseDescriptionListItem term="Téléphone" :description="profile.phone" />
          <BaseDescriptionListItem
            term="Âge"
            :description="profile.birthday ? $dayjs(profile.birthday).fromNow('year') : '-'"
          />
          <BaseDescriptionListItem
            term="Département"
            :description="`${profile.department} - ${$filters.label(
              profile.department,
              'departments'
            )}`"
          />
          <BaseDescriptionListItem term="Code postal" :description="profile.zip" />
          <BaseDescriptionListItem
            term="Profession"
            :description="$filters.label(profile.type, 'profile_type')"
          />
          <BaseDescriptionListItem term="Disponibilités" :description="formattedCommitment" />
        </BaseDescriptionList>
      </div>
      <div class="py-8">
        <div class="text-xl font-bold text-gray-900 mb-4">En quelques mots</div>
        <div class="text-cool-gray-500">
          {{ profile.description || 'Non rempli' }}
        </div>
      </div>
      <div class="py-8">
        <div class="text-xl font-bold text-gray-900 mb-4">Activités</div>
        <ul v-if="profile.activities?.length" class="flex flex-wrap gap-2">
          <DsfrBadge
            v-for="(activity, key) in profile.activities"
            :key="key"
            :no-icon="true"
            as="li"
          >
            {{ activity.name }}
          </DsfrBadge>
        </ul>
        <div v-else class="text-cool-gray-500">Aucune sélectionnée</div>
      </div>
      <div class="py-8">
        <div class="text-xl font-bold text-gray-900 mb-4">Compétences</div>
        <ul v-if="profile.skills?.length" class="flex flex-wrap gap-2">
          <DsfrBadge
            v-for="(skill, key) in profile.skills"
            :key="key"
            :no-icon="true"
            type="new"
            as="li"
          >
            {{ skill.name }}
          </DsfrBadge>
        </ul>
        <div v-else class="text-cool-gray-500">Aucune sélectionnée</div>
      </div>
    </div>
  </BaseDrawer>
</template>

<script>
export default defineNuxtComponent({
  props: {
    profileId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      profile: null,
    }
  },
  computed: {
    formattedCommitment() {
      if (this.profile.commitment__time_period) {
        return `${this.$filters.label(
          this.profile.commitment__duration,
          'duration'
        )} par ${this.$filters.label(this.profile.commitment__time_period, 'time_period')}`
      }
      return this.profile.commitment__duration
        ? this.$filters.label(this.profile.commitment__duration, 'duration')
        : null
    },
  },
  methods: {
    async fetch() {
      this.loading = true
      if (!this.profileId) {
        return
      }
      const { data: profile } = await useApiFetch(`/profiles/${this.profileId}`)
      this.profile = profile.value
      this.loading = false
    },
  },
  watch: {
    profileId: 'fetch',
  },
})
</script>
