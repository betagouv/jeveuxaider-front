<template>
  <div v-if="activity.seo_engage_paragraphs">
    <hr class="opacity-25" />

    <section class="section-associations bg-[#fafaff]">
      <div class="container mx-auto px-4 py-12">
        <h2 class="max-w-2xl mb-16">
          <p class="uppercase text-jva-red-500 font-extrabold text-sm mb-4">
            Bénévolat {{ activity.suffix_title }}
          </p>

          <p
            class="text-3xl lg:text-4xl leading-none font-extrabold tracking-[-1px] lg:tracking-[-2px]"
          >
            {{ activity.seo_engage_title }}
          </p>
        </h2>

        <div v-for="(item, key) in activity.seo_engage_paragraphs" :key="item.uuid">
          <hr />

          <div
            class="grid gap-8 lg:gap-16 lg:grid-cols-5 my-16"
            :class="[{ 'mb-6 lg:mb-16': key === last }]"
          >
            <h3 class="lg:col-span-2 text-2xl font-extrabold tracking-[-1px]" v-html="item.title" />

            <BaseTextFormatted class="lg:col-span-3 tracking-tight" :text="item.description" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    activity: {
      type: Object,
      required: true,
    },
  },
  computed: {
    last() {
      return Object.keys(this.activity.seo_engage_paragraphs).length - 1
    },
  },
})
</script>
