<template>
  <client-only>
    <v-date-picker v-model="date" is-required :model-config="modelConfig">
      <template #default="data">
        <div class="flex items-center relative w-full">
          <input
            class="px-6 py-3 text-sm appearance-none rounded-xl block w-full placeholder-gray-text-400 focus:outline-none border border-gray-200 focus:ring-jva-blue-500 focus:border-jva-blue-500 focus:ring-1 overflow-ellipsis"
            :value="data.inputValue"
            placeholder="jj/mm/aaaa"
            v-on="data.inputEvents"
          >
          <div class="absolute right-4">
            <CalendarIcon
              class="h-4 w-4 text-gray-400"
            />
          </div>
        </div>
      </template>
    </v-date-picker>
  </client-only>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null
    },
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      date: this.value,
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD'
      }
    }
  },
  watch: {
    date (val) {
      this.$emit('input', val)
    }
  }
}
</script>
