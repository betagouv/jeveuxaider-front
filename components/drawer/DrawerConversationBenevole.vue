<template>
  <Drawer :is-open="Boolean(profileId)" @close="$emit('close')">
    <template #title>
      <Heading v-if="profile" :level="3">
        À propos de {{ profile.first_name }} {{ profile.last_name[0] }}
      </Heading>
    </template>
    <div v-if="profile" class="grid grid-cols-1 border px-8 divide-y mt-8">
      <div class="py-8">
        <div class="text-xl font-bold text-gray-900 mb-4">
          En quelques mots
        </div>
        <div class="text-cool-gray-500">
          {{ profile.description || 'Non rempli' }}
        </div>
      </div>
      <div class="py-8">
        <div class="text-xl font-bold text-gray-900 mb-4">
          Activités
        </div>
        <ul v-if="profile.activities?.length" class="flex flex-wrap gap-2">
          <Badge
            v-for="(activity, key) in profile.activities"
            :key="key"
            :no-icon="true"
            as="li"
          >
            {{ activity.name }}
          </Badge>
        </ul>
        <div v-else class="text-cool-gray-500">
          Aucune sélectionnée
        </div>
      </div>
      <div class="py-8">
        <div class="text-xl font-bold text-gray-900 mb-4">
          Compétences
        </div>
        <ul v-if="profile.skills?.length" class="flex flex-wrap gap-2">
          <Badge
            v-for="(skill, key) in profile.skills"
            :key="key"
            :no-icon="true"
            type="new"
            as="li"
          >
            {{ skill.name }}
          </Badge>
        </ul>
        <div v-else class="text-cool-gray-500">
          Aucune sélectionnée
        </div>
      </div>
    </div>
  </Drawer>
</template>

<script>
import Badge from '@/components/dsfr/Badge.vue'

export default {
  components: {
    Badge
  },
  props: {
    profileId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      profile: null
    }
  },
  async fetch () {
    this.loading = true
    if (!this.profileId) {
      return
    }
    const { data: profile } = await this.$axios.get(`/profiles/${this.profileId}`)
    this.profile = profile
    this.loading = false
  },
  computed: {

  },
  watch: {
    profileId: '$fetch'
  }
}
</script>
