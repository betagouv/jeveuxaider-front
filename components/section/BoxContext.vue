<template>
  <Box padding="xs" variant="flat" class="mb-8">
    <div class="flex items-center justify-between mb-2 text-cool-gray-500">
      <div class="text-xs font-semibold uppercase">
        <span>{{ context.type }}</span>
        <span v-if="['admin'].includes($store.getters.contextRole)"> #{{ context.id }}</span>
      </div>
      <XIcon v-if="context.closeContext" class="h-4 w-4 cursor-pointer" @click="() => context.closeContext()" />
    </div>
    <Heading :level="3">
      <Link :to="context.link">
        {{ context.name }}
      </Link>
    </Heading>
  </Box>
</template>

<script>
export default {
  props: {
    context: {
      type: Object,
      default: null
    }
  }
}
</script>
