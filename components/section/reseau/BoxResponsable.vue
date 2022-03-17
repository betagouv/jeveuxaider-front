<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">
        Responsable
      </div>
      <Link v-if="['admin', 'referent'].includes($store.getters.contextRole)" :to="`/admin/utilisateurs/${responsable.id}`" icon="ChevronRightIcon">
        Consulter
      </Link>
    </div>
    <Box variant="flat" padding="xs">
      <DescriptionList v-if="responsable">
        <DescriptionListItem term="Nom" :description="responsable.full_name" />
        <DescriptionListItem term="E-mail" :description="responsable.email" />
        <DescriptionListItem term="Mobile" :description="responsable.mobile" />
      </DescriptionList>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    responsable: {
      type: Object,
      required: true
    }
  }
}
</script>
