<template>
  <section v-if="articles.length > 0" class="py-16 bg-white overflow-hidden">
    <div class="container mx-auto px-8 sm:px-4 xl:max-w-[1412px]">
      <div class="mx-auto max-w-6xl">
        <div class="flex justify-between items-baseline mb-6">
          <h2
            class="text-4xl lg:text-[40px] lg:leading-[42px] tracking-tight text-center md:text-left"
          >
            Les actualités de
            <span>l'<strong class="font-extrabold">engagement</strong></span>
          </h2>
          <span
            class="hidden md:block ml-4 text-[32px] xl:text-[40px] text-[#A7A7B0] font-light"
          >
            #blog
          </span>
        </div>

        <Slideshow
          :slides-are-links="true"
          :more-link="{
            link: `https://jeveuxaider.gouv.fr/engagement/actualites/`,
            label: `Plus d'articles ›`,
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
import Slideshow from '@/components/advanced/Slideshow'
import CardArticle from '@/components/card/CardArticle'

export default {
  components: {
    Slideshow,
    CardArticle
  },
  data () {
    return {
      articles: []
    }
  },
  async fetch () {
    const { data: articles } = await this.$axios.get(
      `${this.$config.blog.restApiUrl}/posts/?per_page=6`,
      {
        excludeContextRole: true
      }
    )
    const articlesWithMedia = []
    for (const article of articles) {
      const url = article._links['wp:featuredmedia']
        ? article._links['wp:featuredmedia'][0].href
        : article._links['wp:attachment'][0].href
      const { data: media } = await this.$axios.get(url, {
        excludeContextRole: true
      })
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
  @apply !flex flex-col h-full max-w-[325px] transition rounded-[10px];
  width: calc(100vw - 64px) !important;
  @apply w-full;
}

::v-deep .slick-slider {
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
