<template>
  <div
    v-if="
      territoire.seo_recruit_title &&
      (territoire.promoted_organisations.length || territoire.seo_recruit_description)
    "
  >
    <section class="section-associations bg-white">
      <div class="container mx-auto px-4 py-12">
        <div v-if="territoire.seo_recruit_title" class="grid gap-16 lg:grid-cols-2">
          <div>
            <h2>
              <p class="uppercase text-jva-red-500 font-extrabold text-sm mb-4">
                Associations {{ territoire.suffix_title }}
              </p>

              <p
                class="text-3xl lg:text-4xl leading-none font-extrabold tracking-[-1px] lg:tracking-[-2px]"
              >
                {{ territoire.seo_recruit_title }}
              </p>
            </h2>

            <div class="mt-12 grid grid-cols-2 gap-8">
              <img
                v-for="media in territoire.promoted_organisations"
                :key="media.id"
                class="mx-auto lg:mx-0 my-auto w-full sm:w-auto h-20 object-contain"
                :alt="media.name"
                :srcset="media.urls.small"
                style="max-width: 130px"
                @error="$event.target.remove()"
              />
            </div>
          </div>

          <BaseTextFormatted :text="territoire.seo_recruit_description" class="tracking-tight" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    territoire: {
      type: Object,
      required: true,
    },
  },
})
</script>
