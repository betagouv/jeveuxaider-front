<template>
  <div class="flex flex-col justify-center items-center pt-12 pb-32">
    <component :is="icon" class="h-12 w-auto fill-current text-gray-600" />
    <div class="font-bold mt-4">
      {{ title }}
    </div>
    <slot name="description">
      <div class="text-gray-600">Il n'y a aucun résultat avec les filtres actuels</div>
    </slot>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    icon: {
      type: String,
      default: 'RiSearchLine',
    },
    title: {
      type: String,
      default: 'Aucun résultat trouvé',
    },
  },
  methods: {},
})
</script>
