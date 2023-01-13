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
          v-for="(title, key) in tabs"
          :id="`tabpanel-${_uid}-${key}`"
          :key="title.content"
          :class="[
            'inline-flex items-center justify-center transition mx-1 px-4 py-2 border border-b-0 border-t-2 flex-none',
            {'bg-[#E3E3FD] border-[#E3E3FD] sm:hover:border-[#C1C1FB] sm:hover:bg-[#C1C1FB] active:bg-[#ADADF9] active:border-[#ADADF9]': key !== selected},
            {'bg-white text-jva-blue-500 border-t-jva-blue-500 border-b-white sm:hover:bg-[#F6F6F6] active:bg-[#EDEDED]': key === selected},
          ]"
          tabindex="0"
          role="tab"
          aria-selected="true"
          :aria-controls="`tabpanel-${_uid}-${key}`"
          @click="() => {selected = key; $emit('selected', title)}"
        >
          <component
            :is="title.icon"
            v-if="title.icon"
            :class="[
              'fill-current flex-none mr-2',
              'ml-[0.125rem]',
              'w-4 h-4',
            ]"
          />
          <span class="font-bold">{{ title.content }}</span>
        </button>
      </li>
    </ul>

    <div
      v-for="(title, key) in tabs"
      v-show="key === selected"
      :id="`tabpanel-${_uid}-${key}-panel`"
      :key="key"
      role="tabpanel"
      :aria-labelledby="`tabpanel-${_uid}-${key}`"
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
export default {
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
