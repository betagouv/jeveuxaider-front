<template>
  <div
    class="bg-white max-w-[320px] overflow-hidden shadow-lg cursor-pointer group transition flex flex-col"
  >
    <div
      v-if="stateText"
      class="text-white px-3 py-1 inline-block mx-auto z-10 font-medium text-xs"
      :class="{
        'bg-gray-500': ['draft'].includes(stateStyle),
        'bg-jva-red-500': ['error', 'refused'].includes(stateStyle),
        'bg-jva-green-500': ['success', 'validated'].includes(stateStyle),
        'bg-jva-orange-500': ['warning', 'waiting'].includes(stateStyle),
      }"
    >
      {{ stateText }}
    </div>
    <div class="h-36 overflow-hidden mt-[-28px]">
      <NuxtImg
        ref="image"
        class="object-cover h-full w-full group-hover:scale-105 transition"
        :srcset="imageSrcset"
        :src="imageSrc"
        sizes="320px"
        @error="onImgError"
      />
    </div>
    <div class="px-6 py-4 flex-1">
      <slot name="badges" />
      <div class="font-extrabold mb-2 tracking-tight text-lg line-clamp-4">
        {{ title }}
      </div>
      <p class="text-gray-500 text-sm">
        {{ description }}
      </p>
      <slot />
    </div>
    <slot name="footer" />
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    imageSrcset: {
      type: String,
      default: '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x',
    },
    imageSrc: {
      type: String,
      default: '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x',
    },
    stateText: {
      type: String,
      default: null,
    },
    stateStyle: {
      type: String,
      default: 'success',
    },
  },
  methods: {
    onImgError() {
      this.$refs.image.$el.srcset =
        '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
    },
  },
})
</script>
