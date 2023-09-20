<template>
  <div class="fr-accordions-group">
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
.fr-accordions-group {
  @apply space-y-[-1px];
}

:deep(section) {
  &:first-child {
    @apply border-t-0;
  }
  &:last-child {
    @apply border-b-0;
  }
}
</style>
