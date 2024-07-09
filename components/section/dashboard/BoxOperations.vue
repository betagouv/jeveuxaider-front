<template>
  <BaseBox variant="shadow" padding="sm">
    <BaseHeading as="h2" :level="3" class="mb-8"> Nos opérations nationales </BaseHeading>

    <div class="flex flex-col gap-1">
      <div class="flex justify-center items-center gap-4">
        <div class="text-[42px]">🌞</div>
        <div class="flex-1" data-v-inspector="components/base/StackedListItem.vue:26:5">
          <div class="text-gray-900 font-semibold">
            Opérations canicules <DsfrBadge size="sm">En cours</DsfrBadge>
          </div>
          <div class="text-gray-600 text-sm">Du 1er juillet au 31 aout</div>
        </div>
      </div>
      <div class="flex justify-center items-center gap-4">
        <div class="text-[42px]">📚</div>
        <div class="flex-1" data-v-inspector="components/base/StackedListItem.vue:26:5">
          <div class="text-gray-900 font-semibold">
            Septembre pour apprendre <DsfrBadge type="gray" size="sm">À venir</DsfrBadge>
          </div>
          <div class="text-gray-600 text-sm">Du 1er au 30 septembre</div>
        </div>
      </div>
      <div class="flex justify-center items-center gap-4">
        <div class="text-[42px]">🎄</div>
        <div class="flex-1" data-v-inspector="components/base/StackedListItem.vue:26:5">
          <div class="text-gray-900 font-semibold">
            Décembre ensemble <DsfrBadge type="gray" size="sm">À venir</DsfrBadge>
          </div>
          <div class="text-gray-600 text-sm">Du 1er au 31 décembre</div>
        </div>
      </div>
    </div>
    <div class="mt-8"><DsfrButton type="tertiary">En savoir plus</DsfrButton></div>
  </BaseBox>
</template>

<script>
export default defineNuxtComponent({
  components: {},
  props: {},
  data() {
    return {}
  },
  methods: {},
})
</script>
