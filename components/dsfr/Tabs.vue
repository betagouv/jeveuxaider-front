<template>
  <div>
    <ul role="tablist" :aria-label="name">
      <li role="presentation" class="flex items-stretch overflow-x-auto px-3 pb-1">
        <button
          v-for="(title, key) in tabs"
          :id="`tabpanel-${_uid}-${key}`"
          :key="title.content"
          :class="[
            'inline-flex items-center justify-center transition mx-1 px-4 py-2 border border-b-0 border-t-2 flex-none',
            {'bg-[#E3E3FD] border-[#E3E3FD]': key !== selected},
            {'bg-white text-jva-blue-500 border-t-jva-blue-500 border-b-white': key === selected},
          ]"
          tabindex="0"
          role="tab"
          aria-selected="true"
          :aria-controls="`tabpanel-${_uid}-${key}`"
          @click="selected = key"
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
      tabindex="0"
      :class="[
        'border p-4 -mt-1'
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
    }
  },
  data () {
    return {
      selected: 0
    }
  }
}
</script>
