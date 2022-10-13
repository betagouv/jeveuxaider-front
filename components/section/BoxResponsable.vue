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
        <div class="py-2 sm:gap-4 sm:flex">
          <dt class="text-sm text-gray-500 flex-none" style="width: calc(33.3333%);">
            Nom
          </dt>
          <dd class="mt-1 text-sm text-gray-900 font-semibold sm:mt-0 flex-1" style="word-break: break-word;">
            {{ responsable.full_name }}
            <div
              v-if="$store.getters.contextRole == 'admin' && responsable.tags"
              class="mt-1 flex flex-wrap gap-1"
            >
              <Badge v-for="tag in responsable.tags" :key="tag.id" size="xxs" color="gray-light">
                {{ tag.name }}
              </Badge>
            </div>
          </dd>
        </div>
        <DescriptionListItem term="E-mail" :description="responsable.email" />
        <DescriptionListItem term="Mobile" :description="responsable.mobile" />
        <DescriptionListItemMasquerade v-if="$store.getters.contextRole === 'admin'" :profile="responsable" />
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
