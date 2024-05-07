<template>
  <BaseBox padding="sm" :loading="loading">
    <template #header>
      <div class="flex gap-6 border-b border-gray-100 pb-6 mb-6">
        <div
          class="bg-[#E9F7FF] border-[#CCE0EB] border h-[56px] w-[56px] flex-none flex items-center justify-center"
        >
          <div class="text-[30px]">🧞‍♂️</div>
        </div>
        <div>
          <div class="text-lg text-gray-900 font-bold">On peut vous aider à modérer ?</div>
          <div class="text-sm text-gray-600">Vérifiez les alertes remontées par l’outil 🔍</div>
        </div>
      </div>
    </template>
    <div v-if="hasResults" class="grid grid-cols-1 gap-6">
      <DisclosureWarningWords :territoire="territoire" />

      <BaseDisclosure v-if="territoiresHasDuplicates">
        <template #button="{ isOpen }">
          <div class="flex font-semibold text-sm items-center group">
            <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
              <RiAlertFill class="h-5 w-5 text-[#FA7A35] fill-current mr-2" aria-hidden="true" />
              Potentiel doublon : {{ duplicatesTerritoires.length }}
            </div>
            <div class="w-full border-t mt-1 mx-2" />
            <RiIndeterminateCircleLine
              v-if="isOpen"
              class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5"
            />
            <RiAddCircleLine
              v-else
              class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5"
            />
          </div>
        </template>
        <div class="ml-7 mt-3 text-sm text-gray-500 space-y-2">
          <div>
            {{
              $filters.pluralize(
                duplicatesTerritoires.length,
                'autre territoire validée',
                'autres territoires validées'
              )
            }}
            avec un nom similaire.
          </div>
          <div>
            <nuxt-link
              no-prefetch
              v-for="duplicateTerritoire in duplicatesTerritoires"
              :key="duplicateTerritoire.id"
              :to="`/admin/contenus/territoires/${duplicateTerritoire.id}`"
              class="flex hover:underline hover:text-jva-blue-500"
              target="_blank"
            >
              #{{ duplicateTerritoire.id }} - {{ duplicateTerritoire.name }} ›
            </nuxt-link>
          </div>
          <div>
            <nuxt-link
              no-prefetch
              class="underline"
              :to="`/support/contents/doublons-territoires`"
              target="_blank"
            >
              Visualiser tous les autres potentiels doublons ›
            </nuxt-link>
          </div>
        </div>
      </BaseDisclosure>
    </div>
    <div v-else class="text-sm text-gray-500">
      Rien à signaler, tout semble correct, mais rien ne vaut une vérification humaine.
    </div>
  </BaseBox>
</template>

<script>
import DisclosureWarningWords from '@/components/section/territoire/DisclosureWarningWords.vue'
import MixinAideModeration from '@/mixins/territoire-aide-moderation'

export default defineNuxtComponent({
  components: {
    DisclosureWarningWords,
  },
  mixins: [MixinAideModeration],
  props: {
    territoire: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      default: 'Aide à la modération',
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.loading = true
      await Promise.all([this.fetchDoublonTerritoires()]).finally(() => {
        this.loading = false
      })
    },
  },
})
</script>
