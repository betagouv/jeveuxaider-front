<template>
  <transition-group name="fade-in" tag="div">
    <!-- <ElContainer v-if="loading" key="loading" v-loading="loading">
      <div class="w-full h-64"></div>
    </ElContainer> -->

    <section v-if="!loading" ref="container" key="loaded" class="bg-white p-6">
      <h3 class="text-xl leading-8 font-bold text-gray-900 mb-4">
        À propos de {{ profile.full_name }}
      </h3>

      <div v-if="profile.email" class="mb-2 flex">
        <div class="text-gray-500 w-24 text-sm mr-1">
          Email
        </div>
        <div class="text-gray-900 flex-1">
          {{ profile.email }}
        </div>
      </div>
      <div v-if="profile.mobile" class="mb-2 flex">
        <div class="text-gray-500 w-24 text-sm mr-1">
          Portable
        </div>
        <div class="text-gray-900 flex-1">
          {{ profile.mobile }}
        </div>
      </div>
      <div v-if="profile.phone" class="mb-2 flex">
        <div class="text-gray-500 w-24 text-sm mr-1">
          Téléphone
        </div>
        <div class="text-gray-900 flex-1">
          {{ profile.phone }}
        </div>
      </div>
      <div v-if="profile.birthday" class="mb-2 flex">
        <div class="text-gray-500 w-24 text-sm mr-1">
          Naissance
        </div>
        <div class="text-gray-900 flex-1">
          {{ $dayjs(profile.birthday).format('DD/MM/YYYY') }}
        </div>
      </div>
      <div v-if="profile.zip" class="mb-2 flex">
        <div class="text-gray-500 w-24 text-sm mr-1">
          Code postal
        </div>
        <div class="text-gray-900 flex-1">
          {{ profile.zip }}
        </div>
      </div>
      <div
        v-if="profile.domaines && profile.domaines.length > 0"
        class="mb-2 flex"
      >
        <div class="text-gray-500 w-24 text-sm mr-1">
          Domaines
        </div>
        <div class="text-gray-900 flex-1">
          {{
            profile.domaines
              .map(function (item) {
                return item.name
              })
              .join(', ')
          }}
        </div>
      </div>
      <div v-if="profile.skills && profile.skills.length > 0" class="mb-2 flex">
        <div class="text-gray-500 w-24 text-sm mr-1">
          Compétences
        </div>
        <div class="text-gray-900 flex-1">
          {{
            profile.skills
              .map(function (item) {
                return item.name
              })
              .join(', ')
          }}
        </div>
      </div>
      <div v-if="profile.disponibilities" class="mb-2 flex">
        <div class="text-gray-500 w-24 text-sm mr-1">
          Dispos
        </div>
        <div class="text-gray-900 flex-1">
          {{
            profile.disponibilities
              .map(
                (disponibility) =>
                  $options.filters.label(disponibility, 'disponibilities')
              )
              .join(', ')
          }}
        </div>
      </div>
      <div v-if="profile.commitment__duration" class="mb-2 flex">
        <div class="text-gray-500 w-24 text-sm mr-1">
          Fréquence
        </div>
        <div class="text-gray-900 flex-1">
          {{ profile.commitment__duration | label('duration') }}
          <template v-if="profile.commitment__time_period">
            <span>par</span>
            <span>
              {{ profile.commitment__time_period | label('time_period') }}
            </span>
          </template>
        </div>
      </div>
      <div v-if="profile.description" class="mb-2 flex">
        <div class="text-gray-500 w-24 text-sm mr-1">
          Motivation
        </div>
        <div class="text-gray-900 flex-1">
          {{ profile.description }}
        </div>
      </div>
    </section>
  </transition-group>
</template>
<script>
export default {
  data () {
    return {
      profile: null,
      loading: true
    }
  },
  async fetch () {
    this.loading = true
    const { data: profile } = await this.$axios.get(`/conversations/${this.conversation.id}/benevole`)

    this.profile = profile
    this.loading = false
  },
  computed: {
    conversation () {
      return this.$store.getters['messaging/conversation']
    }
  }
}
</script>
