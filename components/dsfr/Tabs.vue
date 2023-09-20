<template>
  <div>
    <div
      :class="['relative', { 'shadow-left': hasShadowLeft }, { 'shadow-right': hasShadowRight }]"
    >
      <ul
        ref="tablist"
        role="tablist"
        :aria-label="name"
        :class="['flex items-stretch overflow-x-auto px-3 py-1', tabswrapperClass]"
        @scroll="onScroll"
      >
        <li v-for="(tab, i) in tabs" :key="i" role="presentation">
          <template v-if="tab">
            <button
              :id="`tabpanel-${uuid}-${tab.key}`"
              :ref="`tab-${tab.key}`"
              :key="tab.key"
              :class="[
                'inline-flex items-center justify-center transition mx-1 px-4 py-2 border border-b-0 border-t-2 flex-none whitespace-nowrap',
                {
                  'bg-[#E3E3FD] border-[#E3E3FD] sm:hover:border-[#C1C1FB] sm:hover:bg-[#C1C1FB] active:bg-[#ADADF9] active:border-[#ADADF9]':
                    tab.key !== selectedKey,
                },
                {
                  'bg-white text-jva-blue-500 border-t-jva-blue-500 border-b-white sm:hover:bg-[#F6F6F6] active:bg-[#EDEDED]':
                    tab.key === selectedKey,
                },
              ]"
              role="tab"
              :aria-selected="tab.key === selectedKey || 'false'"
              :aria-controls="`tabpanel-${uuid}-${tab.key}-panel`"
              @click="handleTabClick(tab)"
            >
              <component
                :is="tab.icon"
                v-if="tab.icon"
                :class="['fill-current flex-none mr-2', 'ml-[0.125rem]', 'w-4 h-4']"
              />
              <span class="font-bold hidden sm:inline">{{ tab.content }}</span>
              <span class="font-bold inline sm:hidden">{{ tab.contentMobile || tab.content }}</span>
            </button>
          </template>
        </li>
      </ul>
    </div>

    <template v-for="tab in tabs">
      <template v-if="tab">
        <div
          v-show="tab.key === selectedKey"
          :id="`tabpanel-${uuid}-${tab.key}-panel`"
          :key="tab.key"
          role="tabpanel"
          :aria-labelledby="`tabpanel-${uuid}-${tab.key}`"
          :class="['border p-4 mt-[-5px]', tabpanelClass]"
        >
          <slot :name="`tab-${tab.key}`" />
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default defineNuxtComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    tabs: {
      type: Array,
      required: true,
    },
    tabpanelClass: {
      type: [String, Array],
      default: '',
    },
    selectedTabKey: {
      type: String,
      default: null,
    },
    tabswrapperClass: {
      type: [String, Array],
      default: '',
    },
  },
  data() {
    return {
      selectedKey: this.selectedTabKey ? this.selectedTabKey : this.tabs[0].key,
      hasShadowRight: false,
      hasShadowLeft: false,
      uuid: uuidv4(),
    }
  },
  computed: {
    firstTabKey() {
      return this.tabs[0]?.key
    },
    lastTabKey() {
      return this.tabs[this.tabs.length - 1]?.key
    },
  },
  mounted() {
    if (this.isElementInViewport(this.$refs.tablist)) {
      this.scrollSelectedTabIntoView({ behavior: 'auto' })
    }
  },
  methods: {
    handleTabClick(tab) {
      if (tab.to) {
        this.$router.push(tab.to)
      } else {
        this.selectedKey = tab.key
        this.scrollSelectedTabIntoView({ behavior: 'smooth' })
      }
      this.$emit('selected', tab)
    },
    isElementInViewport(el) {
      const rect = el.getBoundingClientRect()
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      )
    },
    onScroll() {
      const elFirst = this.$refs[`tab-${this.firstTabKey}`]?.[0]
      this.hasShadowLeft = elFirst && !this.isElementInViewport(elFirst)
      const elLast = this.$refs[`tab-${this.lastTabKey}`]?.[0]
      this.hasShadowRight = elLast && !this.isElementInViewport(elLast)
    },
    scrollSelectedTabIntoView({ behavior }) {
      this.$refs[`tab-${this.selectedKey}`]?.[0]?.scrollIntoView({
        inline: 'center',
        block: 'nearest',
        behavior,
      })
      this.onScroll()
    },
  },
})
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

.shadow-left::before,
.shadow-right::after {
  content: '';
  height: calc(100% - 8px);
  @apply w-4 absolute top-1 pointer-events-none;
}

/* @todo: props pour gérer la couleur */
.shadow-left::before {
  background: linear-gradient(to right, #f9f6f2, transparent);
  @apply left-0;
}
.shadow-right::after {
  background: linear-gradient(to right, transparent, #f9f6f2);
  @apply right-0;
}
</style>
