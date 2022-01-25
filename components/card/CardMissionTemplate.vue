<template>
  <div
    class="max-w-[320px] rounded-lg overflow-hidden shadow-lg cursor-pointer group hover:scale-105 transition flex flex-col"
  >
    <div
      class="text-white px-3 py-1 inline-block mx-auto z-10 font-medium text-xs rounded-b"
      :class="{
        'bg-gray-500': ['draft'].includes(stateStyle),
        'bg-jva-red-500': ['refused'].includes(stateStyle),
        'bg-jva-green-500': ['success','validated'].includes(stateStyle),
        'bg-jva-orange-500': ['warning','waiting'].includes(stateStyle),
      }"
    >
      {{ stateText }}
    </div>
    <img class="object-cover h-36 w-full mt-[-24px]" :src="imageUrl">
    <div class="px-6 py-4 flex-1">
      <div class="font-extrabold mb-2 tracking-tight text-lg line-clamp-4">
        {{ title }}
      </div>
      <p class="text-gray-500 text-sm">
        {{ description }}
      </p>
    </div>
    <div
      class="border-t text-jva-blue-500 font-semibold text-center py-4 group-hover:bg-jva-blue-500 group-hover:text-white"
    >
      {{ actionTitle }}
    </div>
  </div>
</template>

<script>
// import MissionMixin from '@/mixins/MissionMixin'

export default {
//   mixins: [MissionMixin],
  props: {
    title: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    imageUrl: {
      type: String,
      default: '/images/missions/card-thumbnail-default@2x.jpg'
    },
    actionTitle: {
      type: String,
      default: 'Choisir'
    },
    actionLink: {
      type: String,
      default: null
    },
    stateText: {
      type: String,
      default: 'Validation automatique'
    },
    stateStyle: {
      type: String,
      default: 'success'
    }
  }
}
</script>
