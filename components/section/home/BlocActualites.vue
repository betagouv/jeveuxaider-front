<template>
  <div class="bg-white py-12 xl:py-24 overflow-hidden">
    <div class="container">
      <div class="lg:flex lg:justify-between lg:items-center lg:gap-6 xl:gap-8">
        <div>
          <DsfrHeading id="label-slideshow-articles" as="h2" size="alt-sm" class="mb-6 md:mb-2">
            Les actualités de l’engagement
          </DsfrHeading>
          <p class="text-[#4D4D4D] text-xl xl:text-2xl">
            Restez informé de l'actualité de tous ceux qui font vivre l'engagement en France
          </p>
        </div>
        <div class="hidden lg:block flex-none">
          <div class="flex space-x-2">
            <div id="slideshowArticlesArrows" />
            <DsfrButton
              to="https://www.jeveuxaider.gouv.fr/engagement/actualites/"
              :is-external="true"
              class="flex-none"
              type="secondary"
            >
              Plus d’articles
            </DsfrButton>
          </div>
        </div>
      </div>

      <div v-if="articles.length" class="mt-12">
        <BaseSlideshow
          navigation-id="slideshowArticlesArrows"
          aria-labelledby="label-slideshow-articles"
        >
          <swiper-slide v-for="article in articles" :key="article.id" class="slide-wrapper">
            <a
              :href="`${urlBlog}/${article.slug}`"
              target="_blank"
              class="h-full"
              @click="onSlideClick"
            >
              <CardArticle :article="article" class="!h-full" />
            </a>
          </swiper-slide>
        </BaseSlideshow>
      </div>
      <div class="lg:hidden mt-8 text-center">
        <DsfrButton
          to="https://www.jeveuxaider.gouv.fr/engagement/actualites/"
          :is-external="true"
          type="tertiary"
        >
          Plus d’articles
        </DsfrButton>
      </div>
    </div>
  </div>
</template>

<script>
import CardArticle from '@/components/card/CardArticle.vue'

export default defineNuxtComponent({
  components: {
    CardArticle,
  },
  setup() {
    const runtimeConfig = useRuntimeConfig()
    return {
      urlBlog: runtimeConfig.public.blog.url,
    }
  },
  data() {
    return {
      articles: [],
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const runtimeConfig = useRuntimeConfig()

      const articles = await $fetch(`${runtimeConfig.public.blog.restApiUrl}/?per_page=6`)
      const articlesWithMedia = []
      // @todo: promise.all
      for (const article of articles) {
        const url = article._links['wp:featuredmedia']
          ? article._links['wp:featuredmedia'][0].href
          : article._links['wp:attachment'][0].href
        const media = await $fetch(url)
        if (!Array.isArray(media)) {
          articlesWithMedia.push({ ...article, media })
        } else {
          articlesWithMedia.push({ ...article, media: media[0] })
        }
      }
      this.articles = articlesWithMedia
    },
    onSlideClick() {
      this.$plausible.trackEvent('Homepage - Clique - Article du blog', {
        props: { isLogged: this.$stores.auth.isLogged },
      })
    },
  },
})
</script>

<style lang="postcss" scoped>
.slide-wrapper {
  @apply !flex flex-col h-full max-w-[320px] transition;
  width: calc(100vw - 64px) !important; /* To let the next slide appear */
}
</style>
