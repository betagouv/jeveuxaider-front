<template>
  <section v-if="articles.length > 0" class="py-16 bg-white overflow-hidden">
    <div class="container mx-auto px-8 sm:px-4 ">
      <div class="mx-auto max-w-6xl">
        <div class="flex justify-between items-baseline mb-12">
          <Heading as="h2" size="2xl">
            Les actualités de l'engagement
          </Heading>

          <span
            class="hidden md:block ml-4 text-[32px] xl:text-[40px] text-[#A7A7B0]"
          >
            #blog
          </span>
        </div>

        <Slideshow
          :slides-are-links="true"
          :more-link="{
            link: `https://jeveuxaider.gouv.fr/engagement/actualites/`,
            label: `Plus d'articles`,
            isExternal: true,
          }"
          :slides-count="articles.length"
        >
          <a
            v-for="article in articles"
            :key="article.id"
            class="card--article--wrapper"
            :href="`${$config.blog.url}/${article.slug}`"
            target="_blank"
          >
            <CardArticle :article="article" class="!h-full" />
          </a>
        </Slideshow>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import CardArticle from '@/components/card/CardArticle'
import Heading from '@/components/dsfr/Heading.vue'

export default {
  components: {
    CardArticle,
    Heading
  },
  data () {
    return {
      articles: []
    }
  },
  fetchOnServer: false,
  async fetch () {
    const { data: articles } = await axios.get(
      `${this.$config.blog.restApiUrl}/?per_page=6`
    )
    const articlesWithMedia = []
    for (const article of articles) {
      const url = article._links['wp:featuredmedia']
        ? article._links['wp:featuredmedia'][0].href
        : article._links['wp:attachment'][0].href
      const { data: media } = await axios.get(url)
      if (!Array.isArray(media)) {
        articlesWithMedia.push({ ...article, media })
      } else {
        articlesWithMedia.push({ ...article, media: media[0] })
      }
    }
    this.articles = articlesWithMedia
  }
}
</script>

<style lang="postcss" scoped>
.card--article--wrapper {
  @apply !flex flex-col h-full max-w-[325px] transition;
  width: calc(100vw - 64px) !important;
  @apply w-full;
}

:deep(.slick-slider) {
  .slick-arrow {
    &.slick-prev {
      @apply translate-x-[-104px];
    }
    &.slick-next {
      @apply translate-x-[104px];
    }
  }
}
</style>
