<template>
  <nav
    class="py-1 flex"
    aria-label="Breadcrumb"
    :class="[
      { 'bg-jva-blue-500 border-[#3934a7] border-b': theme == 'dark' },
      { 'border-gray-200 border-b': theme == 'light' },
    ]"
  >
    <ol class="h-12 w-full max-w-full overflow-x-auto whitespace-nowrap flex items-center">
      <li>
        <nuxt-link no-prefetch to="/">
          <HomeIcon
            class="w-3 h-3"
            :class="[
              { 'text-[#666666] hover:text-gray-700': theme == 'light' },
              { 'text-white hover:text-gray-200': theme == 'dark' },
              { 'text-white hover:text-gray-200': theme == 'transparent' },
            ]"
          />
        </nuxt-link>
      </li>
      <li v-for="(item, index) in items" :key="index" class="flex">
        <div
          v-if="item"
          class="flex items-center text-xs"
          :class="[
            { 'text-[#666666] hover:text-gray-700': theme == 'light' },
            { 'text-white hover:text-gray-200': theme == 'dark' },
            { 'text-white hover:text-gray-200': theme == 'transparent' },
          ]"
        >
          <RiArrowRightLine
            class="h-3"
            :class="[
              { 'text-[#666666] hover:text-gray-700': theme == 'light' },
              { 'text-white hover:text-gray-200': theme == 'dark' },
              { 'text-white hover:text-gray-200': theme == 'transparent' },
            ]"
          />

          <nuxt-link
            no-prefetch
            v-if="item.link"
            :to="item.link"
            class="inline-flex h-full items-center"
          >
            <span class="truncate max-w-xs">{{ item.label }}</span>
          </nuxt-link>

          <component :is="item.h1 ? 'h1' : 'div'" v-else class="inline-flex">
            <span class="truncate max-w-xs">{{ item.label }}</span>
          </component>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script>
export default defineNuxtComponent({
  props: {
    items: {
      type: Array,
      required: true,
    },
    theme: {
      type: String,
      default: 'light',
    },
  },
})
</script>
