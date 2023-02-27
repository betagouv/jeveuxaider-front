<template>
  <div>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <select id="tabs" name="tabs" class="block w-full focus:ring-jva-blue-500 focus:border-jva-blue-500 border-gray-300 rounded-md">
        <option v-for="tab in filteredTabs" :key="tab.name" :selected="tab.current">
          {{ tab.name }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-gray-200 overflow-hidden">
        <nav v-dragscroll class="overflow-hidden -mb-px flex space-x-4 xl:space-x-8" aria-label="Tabs">
          <nuxt-link
            v-for="tab in filteredTabs"
            :key="tab.name"
            :to="tab.to"
            :class="[
              tab.current ? 'border-jva-blue-500 text-jva-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'group inline-flex items-center py-4 px-1 border-b-2 font-bold text-md']"
            :aria-current="tab.current ? 'page' : undefined"
          >
            <component :is="tab.icon" v-if="tab.icon" :class="[tab.current ? 'text-jva-blue-500' : 'text-gray-400 group-hover:text-gray-500', '-ml-0.5 mr-2 h-5 w-5']" aria-hidden="true" />
            <span>{{ tab.name }}</span> <span v-if="tab.count" class="font-normal">&nbsp;({{ tab.count }})</span>
          </nuxt-link>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true
    }
  },
  computed: {
    filteredTabs () {
      return this.tabs.filter(n => n)
    }
  }
}
</script>
