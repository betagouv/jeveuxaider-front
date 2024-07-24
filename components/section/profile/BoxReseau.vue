<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">Réseau</div>
      <DsfrLink
        v-if="['admin', 'referent'].includes($stores.auth.contextRole)"
        :to="`/admin/contenus/reseaux/${reseau.id}`"
        class="text-jva-blue-500"
      >
        Consulter
      </DsfrLink>
    </div>
    <BaseBox variant="flat" padding="xs">
      <BaseDescriptionList>
        <BaseDescriptionListItem term="Nom" :description="reseau.name" />
      </BaseDescriptionList>
    </BaseBox>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    reseau: {
      type: Object,
      required: true,
    },
  },
})
</script>
