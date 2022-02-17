<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">
        Antennes
      </div>
      <Link :to="`/admin/organisations?filter[ofReseau]=${reseau.id}`" icon="ChevronRightIcon">
        Consulter
      </Link>
    </div>
    <Box variant="flat" padding="xs" :loading="!stats">
      <template v-if="stats">
        <div class="flex items-center">
          <div class="text-4xl font-semibold pr-4">
            {{ stats.organisations_actives }}
          </div>
          <div>
            <div class="font-semibold">
              {{ stats.organisations_actives | pluralize('antenne active', 'antennes actives', false) }}
            </div>
            <div class="text-gray-500 -mt-1">
              sur {{ stats.organisations_total| pluralize('antenne') }}
            </div>
          </div>
        </div>
      </template>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    reseau: {
      type: Object,
      required: true
    },
    stats: {
      type: Object,
      default: null
    }
  }
}
</script>
