<template>
  <div>
    <ul role="tablist" :aria-label="name">
      <li
        role="presentation"
        :class="[
          'flex items-stretch overflow-x-auto px-3 py-1',
          tabswrapperClass
        ]"
      >
        <button
          v-for="(tab, key) in tabs"
          :id="`tabpanel-${uuid}-${key}`"
          :key="tab.content"
          :class="[
            'inline-flex items-center justify-center transition mx-1 px-4 py-2 border border-b-0 border-t-2 flex-none',
            {'bg-[#E3E3FD] border-[#E3E3FD] sm:hover:border-[#C1C1FB] sm:hover:bg-[#C1C1FB] active:bg-[#ADADF9] active:border-[#ADADF9]': key !== selected},
            {'bg-white text-jva-blue-500 border-t-jva-blue-500 border-b-white sm:hover:bg-[#F6F6F6] active:bg-[#EDEDED]': key === selected},
          ]"
          role="tab"
          :aria-selected="selected === key || 'false'"
          :aria-controls="`tabpanel-${uuid}-${key}-panel`"
          @click="handleTabClick(tab)"
        >
          <component
            :is="tab.icon"
            v-if="tab.icon"
            :class="[
              'fill-current flex-none mr-2',
              'ml-[0.125rem]',
              'w-4 h-4',
            ]"
          />
          <span class="font-bold">{{ tab.content }}</span>
        </button>
      </li>
    </ul>

    <div
      v-for="(title, key) in tabs"
      v-show="key === selected"
      :id="`tabpanel-${uuid}-${key}-panel`"
      :key="key"
      role="tabpanel"
      :aria-labelledby="`tabpanel-${uuid}-${key}`"
      :class="[
        'border p-4 mt-[-5px]',
        tabpanelClass
      ]"
    >
      <slot :name="`tab-${key}`" />
    </div>
  </div>
</template>

<script>
import uuid from '@/mixins/uuid'

export default {
  mixins: [uuid],
  props: {
    name: {
      type: String,
      required: true
    },
    tabs: {
      type: Array,
      required: true
    },
    tabpanelClass: {
      type: String,
      default: ''
    },
    selectedTab: {
      type: Number,
      default: 0
    },
    tabswrapperClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selected: this.selectedTab
    }
  },
  methods: {
    handleTabClick (tab) {
      if (tab.to) {
        this.$router.push(tab.to)
      } else {
        this.selected = tab.key
      }
      this.$emit('selected', tab)
    }
  }
}
</script>

<style lang="postcss" scoped>
button {
  outline: none;
  &:focus-visible {
    outline-style: solid;
    outline-color: #0a76f6;
    outline-width: 2px;
    outline-offset: 2px;
  }
}
</style>
