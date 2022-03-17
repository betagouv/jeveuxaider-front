<template>
  <Drawer :is-open="Boolean(reseauId)" @close="$emit('close')">
    <template #title>
      <Heading v-if="reseau" :level="3" class="text-jva-blue-500">
        <nuxt-link :to="`/admin/contenus/reseaux/${reseauId}`" class="hover:underline" target="_blank">
          {{ reseau.name }}
        </nuxt-link>
      </Heading>
    </template>
    <template v-if="reseau">
      <OnlineIndicator :published="reseau.is_published" :link="reseau.full_url" class="mt-2" />
      <div class="flex gap-2 mt-4">
        <nuxt-link :to="`/admin/contenus/reseaux/${reseau.id}`" class="inline-flex">
          <Button variant="white" size="sm" icon="EyeIcon">
            Détails
          </Button>
        </nuxt-link>
        <nuxt-link :to="`/admin/contenus/reseaux/${reseau.id}/edit`" class="inline-flex">
          <Button variant="white" size="sm" icon="PencilIcon">
            Modifier
          </Button>
        </nuxt-link>
      </div>

      <div class="border-t -mx-6 my-6" />
      <BoxInformations class="mb-8" :reseau="reseau" />
      <div v-if="reseau.responsables.length > 0" class="mb-10">
        <template v-for="responsable in reseau.responsables">
          <BoxResponsable :key="responsable.id" :profile="responsable" />
        </template>
      </div>
      <Box v-else class="mb-8" variant="flat" padding="xs">
        Aucun responsable
      </Box>

      <BoxAntenne class="mb-8" :reseau="reseau" :stats="stats" />
      <BoxMission class="mb-8" :reseau="reseau" :stats="stats" />
      <BoxParticipation class="mb-8" :reseau="reseau" :stats="stats" />

      <div class="flex justify-center mb-10">
        <Link :to="`/admin/contenus/reseaux/${reseau.id}`" class="uppercase font-semibold text-sm hover:underline">
          Détails du réseau
        </Link>
      </div>
    </template>
  </Drawer>
</template>

<script>
import BoxInformations from '@/components/section/reseau/BoxInformations'
import BoxMission from '@/components/section/reseau/BoxMission'
import BoxAntenne from '@/components/section/reseau/BoxAntenne'
import BoxParticipation from '@/components/section/reseau/BoxParticipation'
import BoxResponsable from '@/components/section/reseau/BoxResponsable'
import OnlineIndicator from '@/components/custom/OnlineIndicator'

export default {
  components: {
    BoxInformations,
    BoxMission,
    BoxAntenne,
    BoxParticipation,
    BoxResponsable,
    OnlineIndicator
  },
  props: {
    reseauId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      reseau: null,
      stats: null
    }
  },
  async fetch () {
    if (!this.reseauId) {
      return null
    }
    const { data: reseau } = await this.$axios.get(`/reseaux/${this.reseauId}`)
    this.reseau = reseau
    const { data: stats } = await this.$axios.get(`/statistics/reseaux/${this.reseauId}`)
    this.stats = stats
    this.$emit('loaded', reseau)
  },
  watch: {
    reseauId: '$fetch'
  },
  methods: {

  }
}
</script>
