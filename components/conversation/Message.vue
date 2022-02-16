<template>
  <div class="mb-4">
    <div class="flex items-start">
      <Avatar
        class="mr-4"
        :image="thumbnail"
        :initials="shortName"
        size="xs"
      />

      <div>
        <div class="flex items-baseline">
          <span class="font-bold mr-2">{{ name }}</span>
          <span v-if="date" class="text-cool-gray-600 font-light text-sm">
            {{ $dayjs(date).format('D MMM HH[h]mm') }}
          </span>
        </div>
        <div>
          <slot />
        </div>
      </div>
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
    shortName: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      default: null
    },
    date: {
      type: String,
      default: null
    }
  },
  computed: {
    formatStatus () {
      return this.status ? 'En cours' : 'Archivé'
    }
  }
}
</script>
