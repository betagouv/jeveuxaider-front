<template>
  <div>
    <ul
      role="tablist"
      :aria-label="name"
      :class="[
        'flex items-stretch overflow-x-auto px-3 py-1',
        tabswrapperClass
      ]"
    >
      <li
        v-for="(tab, i) in tabs"
        :key="i"
        role="presentation"
      >
        <template v-if="tab">
          <button
            :id="`tabpanel-${uuid}-${tab.key}`"
            :key="tab.key"
            :class="[
              'inline-flex items-center justify-center transition mx-1 px-4 py-2 border border-b-0 border-t-2 flex-none',
              {'bg-[#E3E3FD] border-[#E3E3FD] sm:hover:border-[#C1C1FB] sm:hover:bg-[#C1C1FB] active:bg-[#ADADF9] active:border-[#ADADF9]': tab.key !== selectedKey},
              {'bg-white text-jva-blue-500 border-t-jva-blue-500 border-b-white sm:hover:bg-[#F6F6F6] active:bg-[#EDEDED]': tab.key === selectedKey},
            ]"
            role="tab"
            :aria-selected="tab.key === selectedKey || 'false'"
            :aria-controls="`tabpanel-${uuid}-${tab.key}-panel`"
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
        </template>
      </li>
    </ul>

    <template v-for="(tab) in tabs">
      <template v-if="tab">
        <div
          v-show="tab.key === selectedKey"
          :id="`tabpanel-${uuid}-${tab.key}-panel`"
          :key="tab.key"
          role="tabpanel"
          :aria-labelledby="`tabpanel-${uuid}-${tab.key}`"
          :class="[
            'border p-4 mt-[-5px]',
            tabpanelClass
          ]"
        >
          <slot :name="`tab-${tab.key}`" />
        </div>
      </template>
    </template>
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
    // selectedTab: {
    //   type: Number,
    //   default: 0
    // },
    selectedTabKey: {
      type: String,
      default: null
    },
    tabswrapperClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selectedKey: this.selectedTabKey
    }
  },
  methods: {
    handleTabClick (tab) {
      if (tab.to) {
        this.$router.push(tab.to)
      } else {
        this.selectedKey = tab.key
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
