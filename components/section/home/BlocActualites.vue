<template>
  <div class="bg-white py-12 overflow-hidden">
    <div class="container">
      <Heading id="label-slideshow-articles" as="h2" size="alt-xs" class="mb-6">
        Les actualités de l’engagement
      </Heading>
      <p class="text-[#4D4D4D] text-xl">
        Restez informé de l'actualité de tous ceux qui font vivre l'engagement en France
      </p>
      <div v-if="articles.length" class="mt-12">
        <Slideshow
          :slides-are-links="true"
          aria-labelledby="label-slideshow-articles"
        >
          <a
            v-for="article in articles"
            :key="article.id"
            class="slide-wrapper"
            :href="`${$config.blog.url}/${article.slug}`"
            target="_blank"
          >
            <CardArticle :article="article" class="!h-full" />
          </a>
        </Slideshow>
      </div>
      <div class="mt-8 text-center">
        <Button type="tertiary" @click="handleClick()">
          Plus d’articles
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Button from '@/components/dsfr/Button.vue'
import CardArticle from '@/components/card/CardArticle.vue'
import Heading from '@/components/dsfr/Heading.vue'

export default {
  components: {
    Button,
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
.slide-wrapper {
  @apply !flex flex-col h-full max-w-[323px] transition;
  width: calc(100vw - 64px) !important; /* To let the next slide appear */
}
</style>
