<template>
  <div v-if="territoire.seo_engage_paragraphs">
    <hr class="opacity-25">

    <section class="section-associations bg-[#fafaff]">
      <div class="container mx-auto px-4 py-12">
        <h2 class="max-w-2xl mb-16">
          <p class="uppercase text-jva-red-500 font-extrabold text-sm mb-4">
            Bénévolat {{ territoire.suffix_title }}
          </p>

          <p
            class="text-3xl lg:text-4xl leading-none font-extrabold tracking-[-1px] lg:tracking-[-2px]"
          >
            {{ territoire.seo_engage_title }}
          </p>
        </h2>

        <div
          v-for="(item, key) in territoire.seo_engage_paragraphs"
          :key="item.uuid"
        >
          <hr class="">

          <div
            class="grid gap-8 lg:gap-16 lg:grid-cols-5 my-16"
            :class="[{ 'mb-6 lg:mb-16': key === last }]"
          >
            <h3
              class="lg:col-span-2 text-2xl font-extrabold tracking-[-1px]"
              v-html="item.title"
            />
            <div class="lg:col-span-3" v-html="item.description" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    territoire: {
      type: Object,
      required: true
    }
  },
  computed: {
    last () {
      return Object.keys(this.territoire.seo_engage_paragraphs).length - 1
    }
  }
}
</script>
