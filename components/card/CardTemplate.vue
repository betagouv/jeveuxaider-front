<template>
  <div
    :class="[
      'relative border-2 shadow-lg cursor-pointer hover:shadow-xl hover:border-[#8585F6]',
      isSelected ? 'bg-[#F5F5FE] border-[#8585F6]' : 'border-transparent bg-white',
    ]"
  >
    <RiCheckboxCircleFill
      v-if="isSelected"
      class="h-6 text-jva-blue-500 fill-current absolute top-3 right-3"
    />
    <div class="flex">
      <template v-if="template === null">
        <div class="relative flex justify-center items-center w-[214px] bg-[#F5F5FE]">
          <div class="absolute top-0">
            <div
              class="bg-[#B34000] text-white px-3 py-1 inline-block mx-auto z-10 font-medium text-xs"
            >
              Validation par le référent
            </div>
          </div>
          <RiEditBoxLine class="text-[#8585F6] h-8 fill-current" />
        </div>
        <div class="relative flex-1 p-6">
          <slot name="tags"></slot>
          <div class="line-clamp-2 font-bold my-4 h-[48px]">Personnalisez votre mission</div>
          <div class="text-[#666666] text-xs">L'intégralité des champs sont éditables</div>
        </div>
      </template>
      <template v-else>
        <div class="relative flex justify-center items-center w-[214px] bg-[#F5F5FE]">
          <div class="absolute top-0">
            <div
              class="bg-[#18753C] text-white px-3 py-1 inline-block mx-auto z-10 font-medium text-xs"
            >
              Validation immédiate
            </div>
          </div>
          <NuxtImg
            ref="image"
            class="object-cover h-full w-full group-hover:scale-105 transition"
            :srcset="template.photo ? template.photo.urls.card : undefined"
            :src="template.photo ? template.photo.urls.original : undefined"
            sizes="320px"
            @error="onImgError"
          />
        </div>
        <div class="relative flex-1 p-6">
          <slot name="tags"></slot>

          <div class="line-clamp-2 font-bold my-4 h-[48px]">{{ template.subtitle }}</div>
          <div class="text-[#666666] text-xs line-clamp-1">{{ template.title }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import RiEditBoxLine from 'vue-remix-icons/icons/ri-edit-box-line.vue'
import RiCheckboxCircleFill from 'vue-remix-icons/icons/ri-checkbox-circle-fill.vue'

export default defineNuxtComponent({
  components: {
    RiEditBoxLine,
    RiCheckboxCircleFill,
  },
  props: {
    template: {
      type: Object,
      default: null,
    },
    isSelected: {
      type: Boolean,
      default: false,
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
