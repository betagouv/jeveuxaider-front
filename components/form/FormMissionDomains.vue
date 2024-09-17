<template>
  <div
    role="listbox"
    aria-label="Choisissez le domaine d'action de votre mission"
    aria-required="true"
    class="grid grid-cols-1 lg:grid-cols-2 gap-4"
    tabindex="-1"
    @focusout="onFocusout"
  >
    <div
      v-for="(domain, i) in domains"
      :key="domain.key"
      ref="refDomains"
      role="option"
      :aria-selected="selectedDomain?.key === domain.key ? true : false"
      :tabindex="indexToFocus === i ? 0 : -1"
      :class="[
        'relative group shadow-lg p-6 text-center border-2 flex flex-col items-center justify-center cursor-pointer hover:border-[#8585F6] transition ease-out duration-300',
        selectedDomain && selectedDomain.key === domain.key
          ? 'border-[#8585F6] bg-[#F5F5FE]'
          : 'border-transparent bg-white',
      ]"
      @click="$emit('change', domain)"
      @keydown.enter="$emit('change', domain)"
      @keydown.space="$emit('change', domain)"
      @keydown.arrow-left.prevent="selectPreviousDomain"
      @keydown.arrow-up.prevent="selectPreviousDomain"
      @keydown.arrow-right.prevent="selectNextDomain"
      @keydown.arrow-down.prevent="selectNextDomain"
      @focus="onFocus(domain)"
    >
      <RiCheckboxCircleFill
        :class="[
          'h-6 text-jva-blue-500 fill-current absolute top-3 right-3 opacity-0',
          'transition-all ease-out duration-300 group-hover:text-jva-blue-500',
          { 'opacity-100': selectedDomain && selectedDomain.key === domain.key },
        ]"
      />
      <div class="text-4xl mb-2" aria-hidden="true">
        {{ domain.emoji }}
      </div>
      <span
        :class="[
          'leading-tight font-bold group-hover:text-jva-blue-500',
          selectedDomain && selectedDomain.key === domain.key
            ? 'text-jva-blue-500'
            : 'text-[#161616]',
        ]"
      >
        {{ domain.label }}
      </span>
    </div>
  </div>
</template>

<script>
import domains from '@/assets/domaines.json'

export default defineNuxtComponent({
  emits: ['change'],
  props: {
    selectedDomain: { type: [Object, null], default: null },
  },
  setup() {
    return {
      domains: domains.sort((a, b) => a.label.localeCompare(b.label)),
      indexToFocus: 0,
    }
  },
  methods: {
    selectPreviousDomain() {
      this.indexToFocus--
      if (this.indexToFocus < 0) {
        this.indexToFocus = this.domains.length - 1
      }
      this.$refs.refDomains[this.indexToFocus].focus()
    },
    selectNextDomain() {
      this.indexToFocus++
      if (this.indexToFocus > this.domains.length - 1) {
        this.indexToFocus = 0
      }
      this.$refs.refDomains[this.indexToFocus].focus()
    },
    onFocusout($event) {
      // If focus is still in the component, do nothing
      if (this.$el.contains($event.relatedTarget)) {
        return
      }

      // Reset the focused index on tab out
      this.indexToFocus = this.selectedDomain
        ? domains.findIndex((domain) => domain.key === this.selectedDomain.key)
        : 0
    },
    onFocus(domain) {
      // Reset the focused index on tab in
      this.indexToFocus = this.domains.findIndex((d) => d.key === domain.key)
    },
  },
  watch: {
    selectedDomain(newVal) {
      if (!newVal) {
        this.indexToFocus = 0
      }
    },
  },
})
</script>
