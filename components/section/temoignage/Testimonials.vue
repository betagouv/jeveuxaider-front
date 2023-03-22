<template>
  <section v-if="testimonials.length" class="pt-12 pb-24 bg-gray-50 overflow-hidden relative">
    <img
      src="/images/homepage/deco_2.svg"
      alt=""
      class="deco--2 absolute hidden lg:block pointer-events-none"
      data-not-lazy
    >

    <img
      src="/images/homepage/deco_3.svg"
      alt=""
      class="deco--3 absolute hidden lg:block pointer-events-none"
      data-not-lazy
    >

    <div class="container mx-auto px-4 ">
      <h2
        :id="`label-parole-benevoles-${uuid}`"
        class="text-4xl lg:text-[40px] lg:leading-[42px] tracking-tight text-center text-gray-900"
      >
        Paroles de bénévoles<br>
        chez <span class="font-extrabold">{{ model.name }}</span>
      </h2>

      <Slideshow
        :infinite="true"
        :variable-width="false"
        :aria-labelledby="`label-parole-benevoles-${uuid}`"
        class="mt-12"
      >
        <div v-for="testimony in testimonials" :key="testimony.id">
          <div
            class="testimony--wrapper flex flex-col items-center space-y-6 text-center max-w-[768px] mx-auto"
          >
            <div class="text-xl lg:text-2xl leading-relaxed">
              "{{ testimony.testimony | decodeHTMLEntities }}"
            </div>

            <div class="flex items-center space-x-4">
              <Avatar
                :img-srcset="testimony.participation.profile.avatar ? testimony.participation.profile.avatar.urls.thumbMedium : null"
                :img-src="testimony.participation.profile.avatar ? testimony.participation.profile.avatar.urls.original : null"
                :initials="testimony.participation.profile.short_name"
                size="xs"
                class=""
              />

              <div
                class="text-left flex flex-col md:flex-row md:flex-wrap md:items-center"
              >
                <span class="font-bold text-[#111827]">
                  {{ testimony.participation.profile.first_name }}
                </span>
                <span
                  class="text-[#A7A7B0] font-bold mx-2 text-lg hidden md:inline-block"
                >/</span>
                <span class="text-[#A7A7B0]">
                  Bénévole
                </span>
              </div>
            </div>
          </div>
        </div>
      </Slideshow>
    </div>
  </section>
</template>

<script>
import uuid from '@/mixins/uuid'

export default {
  mixins: [uuid],
  props: {
    model: {
      type: Object,
      required: true
    },
    modelType: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: true,
      testimonials: []
    }
  },
  async fetch () {
    this.loading = true
    if (this.endpoint) {
      await this.$axios.get(this.endpoint).then((response) => {
        this.loading = false
        this.testimonials = response.data
      })
    }
  },
  computed: {
    endpoint () {
      if (this.modelType === 'organisation') {
        return `/temoignages/organisations/${this.model.id}`
      }
      return null
    }
  }
}
</script>

<style lang="postcss" scoped>

.deco--2 {
  left: calc(50% - 728px);
  top: 50px;
}

.deco--3 {
  right: calc(50% - 728px);
  top: -12px;
}

.testimony--wrapper {
  @screen sm {
    width: calc(100% - 150px);
  }
}

:deep(.slick-slider) {
  .wrapper--slick-dots {
    display: block !important;
  }

  .slick-dots {
    @apply !text-center;
  }

  .slick-track {
    @apply space-x-0;
  }

  .slick-list {
    overflow: hidden;
  }
}
</style>
