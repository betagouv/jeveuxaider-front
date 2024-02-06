<template>
  <div class="relative">
    <button
      :aria-expanded="isOpen || 'false'"
      class="flex w-full"
      @click="isOpen = !isOpen"
      @keydown.esc="isOpen = false"
    >
      <slot name="button" :isOpen="isOpen" :activeValue="activeValue"> Toggle facet </slot>
    </button>

    <transition name="fade-in">
      <div
        v-if="isOpen"
        v-click-outside="() => (isOpen = false)"
        class="mt-2 absolute right-0 xl:right-auto z-20 bg-white border shadow-xl text-[15px] w-[350px]"
        @keydown.esc="isOpen = false"
      >
        <div class="p-4 space-y-3">
          <div class="font-medium">{{ legend }}</div>
          <div class="space-y-2">
            <div
              v-for="option in options"
              :key="option.key"
              class="cursor-pointer flex items-center"
            >
              <input
                :id="`option__${name}_${option.key}`"
                :name="`${name}`"
                type="radio"
                :checked="isChecked"
                class="rounded-full text-jva-blue-500"
                @change="handleChange(option.key)"
              />
              <label
                :for="`option__${name}_${option.key}`"
                class="ml-2 flex justify-between truncate flex-1"
              >
                <div class="truncate">
                  {{ option.label }}
                </div>
                <div class="text-gray-600 ml-1 font-light">count</div>
              </label>
            </div>
          </div>
        </div>

        <div class="border-t px-6 py-3 flex justify-end">
          <button
            class="text-sm"
            :class="[
              { 'text-gray-400 pointer-events-none': !activeValue },
              {
                'text-jva-blue-500 cursor-pointer hover:underline': activeValue,
              },
            ]"
            :disabled="!activeValue"
            @click="handleClickEffacer()"
          >
            Effacer
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default defineNuxtComponent({
  emits: ['changed'],
  props: {
    name: { type: String, required: true },
    legend: { type: String, required: true },
    options: { type: Array, required: true },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    isChecked() {
      return false
    },
    activeValue() {
      return null
    },
  },
  watch: {
    //   '$route.query.duration'(newVal) {
    //     this.commitment__duration = newVal
    //   },
    //   '$route.query.time_period'(newVal) {
    //     this.commitment__time_period = newVal
    //   },
  },
  methods: {
    handleChange(value) {
      console.log('handleChange', value)
      this.$emit('changed', value)
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          [this.name]: `${value}`,
          page: undefined,
        },
      })
    },
    handleClickEffacer() {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          [this.name]: undefined,
          page: undefined,
        },
      })
      this.isOpen = false
    },
  },
})
</script>
