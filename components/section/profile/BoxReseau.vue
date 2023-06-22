<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">
        Réseau
      </div>
      <Link
        v-if="['admin', 'referent'].includes($store.getters.contextRole)"
        :to="`/admin/contenus/reseaux/${reseau.id}`"
        class="text-jva-blue-500"
      >
        Consulter
      </Link>
    </div>
    <Box variant="flat" padding="xs">
      <DescriptionList>
        <DescriptionListItem term="Nom" :description="reseau.name" />
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
    reseau: {
      type: Object,
      required: true
    }
  }
}
</script>
