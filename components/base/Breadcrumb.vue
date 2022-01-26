<template>
  <nav
    class="py-1 flex"
    aria-label="Breadcrumb"
    :class="[
      { 'bg-jva-blue-500 border-[#3934a7] border-b': theme == 'dark' },
      { ' border-gray-200 border-b': theme == 'light' },
    ]"
  >
    <ol
      class="h-12 w-full max-w-full overflow-x-auto whitespace-nowrap flex items-center"
    >
      <li>
        <nuxt-link to="/">
          <HomeIcon
            class="h-4"
            :class="[
              { 'text-gray-500 hover:text-gray-700': theme == 'light' },
              { 'text-white hover:text-gray-200': theme == 'dark' },
              { 'text-white hover:text-gray-200': theme == 'transparent' },
            ]"
          />
        </nuxt-link>
      </li>
      <li v-for="(item, index) in items" :key="index" class="flex">
        <div
          v-if="item"
          class="flex items-center text-xxs uppercase font-semibold"
          :class="[
            { 'text-gray-500 hover:text-gray-700': theme == 'light' },
            { 'text-white hover:text-gray-200': theme == 'dark' },
            { 'text-white hover:text-gray-200': theme == 'transparent' },
          ]"
        >
          <ChevronRightIcon
            class="h-3"
            :class="[
              { 'text-gray-500 hover:text-gray-700': theme == 'light' },
              { 'text-white hover:text-gray-200': theme == 'dark' },
              { 'text-white hover:text-gray-200': theme == 'transparent' },
            ]"
          />

          <nuxt-link
            v-if="item.link"
            :to="item.link"
            class="flex h-full items-center"
          >
            {{ item.label }}
          </nuxt-link>

          <h1 v-else-if="item.h1">
            {{ item.label }}
          </h1>

          <span v-else>{{ item.label }}</span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      default: 'light'
    }
  }
}
</script>
