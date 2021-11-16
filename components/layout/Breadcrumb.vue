<template>
  <nav
    class="py-4 flex"
    aria-label="Breadcrumb"
    :class="[
      { 'bg-jva-blue-500 border-jva-blue-500 border-b': theme == 'dark' },
      { 'bg-white border-gray-200 border-b': theme == 'light' },
    ]"
  >
    <ol
      class="h-6 w-full max-w-full overflow-x-auto whitespace-nowrap px-4 flex"
    >
      <li v-for="(item, index) in withHome" :key="index" class="flex">
        <div
          v-if="item"
          class="flex items-center text-xxs uppercase font-semibold"
          :class="[
            { 'text-gray-500 hover:text-gray-700': theme == 'light' },
            { 'text-white hover:text-gray-200': theme == 'dark' },
            { 'text-white hover:text-gray-200': theme == 'transparent' },
          ]"
        >
          <div
            v-if="index != 0"
            class="mx-3 w-1 h-1 border-b border-r transform -rotate-45"
            :class="[
              { 'border-gray-500': theme == 'light' },
              { 'border-white': theme == 'dark' },
              { 'border-white': theme == 'transparent' },
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
  },
  computed: {
    withHome () {
      return [{ label: 'Accueil', link: '/' }, ...this.items]
    }
  }
}
</script>
