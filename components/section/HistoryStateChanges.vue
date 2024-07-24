<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">Évolution des statuts</div>
    </div>
    <BaseBox variant="flat" padding="xs" :loading="loading">
      <div v-if="queryStateChanges && queryStateChanges.length > 0" class="flow-root">
        <ul role="list" class="-mb-8">
          <li v-for="(change, i) in queryStateChanges" :key="change.id">
            <div class="relative pb-8">
              <span
                v-if="i !== queryStateChanges.length - 1"
                class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                aria-hidden="true"
              />
              <div class="relative flex space-x-3">
                <div>
                  <span
                    v-if="change.properties.attributes.state === 'Brouillon'"
                    class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
                  >
                    <RiDraftLine class="h-4 w-4 text-white" fill="currentColor" />
                  </span>
                  <span
                    v-if="change.properties.attributes.state === 'En attente de validation'"
                    class="h-8 w-8 rounded-full bg-jva-orange-500 flex items-center justify-center ring-8 ring-white"
                  >
                    <RiHistoryLine class="h-4 w-4 text-white" fill="currentColor" />
                  </span>
                  <span
                    v-if="change.properties.attributes.state === 'En cours de traitement'"
                    class="h-8 w-8 rounded-full bg-jva-orange-500 flex items-center justify-center ring-8 ring-white"
                  >
                    <RiHistoryLine class="h-4 w-4 text-white" fill="currentColor" />
                  </span>
                  <span
                    v-if="change.properties.attributes.state === 'Validée'"
                    class="h-8 w-8 rounded-full bg-jva-green-500 flex items-center justify-center ring-8 ring-white"
                  >
                    <RiCheckLine class="h-4 w-4 text-white" fill="currentColor" />
                  </span>
                  <span
                    v-if="change.properties.attributes.state === 'Signalée'"
                    class="h-8 w-8 rounded-full bg-jva-red-500 flex items-center justify-center ring-8 ring-white"
                  >
                    <RiCloseLine class="h-4 w-4 text-white" fill="currentColor" />
                  </span>
                  <span
                    v-if="change.properties.attributes.state === 'Désinscrite'"
                    class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
                  >
                    <RiLogoutBoxRLine class="h-4 w-4 text-white" fill="currentColor" />
                  </span>
                  <span
                    v-if="change.properties.attributes.state === 'Refusée'"
                    class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
                  >
                    <RiCloseLine class="h-4 w-4 text-white" fill="currentColor" />
                  </span>
                  <span
                    v-if="change.properties.attributes.state === 'Annulée'"
                    class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
                  >
                    <RiCloseLine class="h-4 w-4 text-white" fill="currentColor" />
                  </span>
                  <span
                    v-if="change.properties.attributes.state === 'Terminée'"
                    class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
                  >
                    <RiFlagLine class="h-4 w-4 text-white" fill="currentColor" />
                  </span>
                </div>
                <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p class="text-sm text-gray-500">
                      <span class="font-medium text-gray-800">{{
                        change.causer ? change.causer.profile.full_name : '[AUTO]'
                      }}</span>
                      a passé le statut à
                      <span class="font-semibold text-gray-900">{{
                        change.properties.attributes.state
                      }}</span>
                    </p>
                  </div>
                  <div class="whitespace-nowrap text-right text-sm text-gray-500">
                    <time :datetime="change.created_at">{{
                      $dayjs(change.created_at).format('DD/MM/YY')
                    }}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </BaseBox>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    modelId: {
      type: Number,
      required: true,
    },
    modelType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      queryStateChanges: null,
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      if (!this.modelId) {
        return
      }
      this.loading = true
      const response = await apiFetch(`/activity-logs/${this.modelType}/${this.modelId}/states`)
      this.queryStateChanges = response
      this.loading = false
    },
  },
  watch: {
    modelId: 'fetch',
  },
})
</script>
