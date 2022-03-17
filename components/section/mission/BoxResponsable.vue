<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">
        Responsable
      </div>
      <Link v-if="['admin', 'referent'].includes($store.getters.contextRole)" :to="`/admin/utilisateurs/${profile.id}`" icon="ChevronRightIcon">
        Consulter
      </Link>
    </div>
    <Box variant="flat" padding="xs">
      <DescriptionList v-if="profile">
        <DescriptionListItem term="Nom" :description="profile.full_name" />
        <DescriptionListItem term="E-mail" :description="profile.email" />
        <DescriptionListItem term="Mobile" :description="profile.mobile" />
        <DescriptionListItemMasquerade v-if="$store.getters.contextRole === 'admin'" :profile="profile" />
      </DescriptionList>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      required: true
    }
  }
}
</script>
