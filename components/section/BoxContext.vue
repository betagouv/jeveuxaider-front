<template>
  <BaseBox padding="xs" variant="flat" class="mb-8">
    <div class="flex items-center justify-between mb-2 text-cool-gray-500">
      <div class="text-xs font-semibold uppercase">
        <span>{{ context.type }}</span>
        <span v-if="['admin'].includes($stores.auth.contextRole)"> #{{ context.id }}</span>
      </div>
      <RiCloseLine
        v-if="context.closeContext"
        class="h-4 w-4 cursor-pointer"
        @click="() => context.closeContext()"
      />
    </div>
    <BaseHeading :level="3">
      <BaseLink :to="context.link">
        {{ $filters.clamp(context.name, 120) }}
      </BaseLink>
    </BaseHeading>
  </BaseBox>
</template>

<script>
export default defineNuxtComponent({
  props: {
    context: {
      type: Object,
      default: null,
    },
  },
})
</script>
