<template>
  <div>
    <div class="text-center">
      <h1
        class="text-2xl sm:text-[38px] sm:leading-tight font-bold text-jva-blue-500 tracking-[-1px]"
      >
        <span class="font-extrabold">{{ benevole.first_name }}</span
        >, comment s'est déroulée votre mission&nbsp;?
      </h1>

      <div class="font-medium text-md sm:text-xl text-[#808080]">
        {{ mission.name }}
      </div>

      <div class="py-8">
        <ClientOnly>
          <StarRating
            v-model:rating="form.grade"
            :rating="form.grade"
            class="justify-center"
            :show-rating="false"
            inactive-color="#E0E0E0"
            active-color="#EF9F03"
            :rounded-corners="true"
            @update:rating="$emit('rating-selected', form)"
          />
        </ClientOnly>
      </div>

      <div class="sm:text-lg text-[#808080] max-w-[420px] mx-auto">
        Cette note est <strong>réservée à l’administration</strong> pour améliorer la qualité des
        missions proposées.
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  emits: ['rating-selected'],
  props: {
    benevole: {
      type: Object,
      required: true,
    },
    mission: {
      type: Object,
      required: true,
    },
    initialForm: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: { ...this.initialForm },
    }
  },
})
</script>

<style lang="postcss" scoped>
.vue-star-rating {
  :deep(span.vue-star-rating-star) {
    @apply !mr-2 sm:!mr-[50px];
    &:last-of-type {
      @apply !mr-0;
    }
    @screen sm {
      @apply transition hover:scale-125;
    }
  }
  :deep(svg.vue-star-rating-star) {
    filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.05));
    @apply !w-[50px] !h-[50px] sm:!w-[77px] sm:!h-[77px];
  }
}
</style>
