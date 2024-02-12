<template>
  <div class="flex justify-center mb-4">
    <img
      v-for="(portrait, index) in portraits"
      :key="index"
      :src="portrait"
      alt=""
      :class="[{ '-ml-1': index !== 0 }]"
      class="portrait rounded-full"
      style="width: 36px; height: 36px"
    />
    <div
      v-if="count - 3 > 0"
      class="h-9 w-9 text-cool-gray-500 shadow bg-gray-50 border font-bold inline-flex items-center justify-center rounded-full text-xs -ml-1"
    >
      {{ formattedBenevoleCount }}
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    count: {
      type: Number,
      required: true,
    },
  },
  computed: {
    formattedBenevoleCount() {
      const count = this.count - 3
      return count < 1000 ? `+${count}` : '+1k'
    },
    portraits() {
      const portraits = []
      const randomNumbers = []
      const portraitsCount = 74 // The total number of portraits existing
      const portraitsToGetCount = Math.min(this.count, 3)

      while (randomNumbers.length < portraitsToGetCount) {
        const result = Math.floor(Math.random() * portraitsCount) + 1
        if (!randomNumbers.includes(result)) {
          randomNumbers.push(result)
        }
      }

      randomNumbers.forEach((i) => {
        portraits.push(`/images/portraits/${i}.png`)
      })

      return portraits
    },
  },
})
</script>
