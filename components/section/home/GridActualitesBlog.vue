<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <template v-for="(article, index) in articles" :key="article.id">
        <a
          v-if="index === 1"
          href="https://www.jeveuxaider.gouv.fr/engagement/category/actualite/"
          target="_blank"
          class="card-scale-img bg-jva-blue-500 relative overflow-hidden"
        >
          <img
            srcset="
              /images/home/blog-bg-article-highlight.jpg,
              /images/home/blog-bg-article-highlight@2x.jpg 2x
            "
            src="/images/home/blog-bg-article-highlight.jpg"
            alt=""
            class="thumbnail object-cover h-full w-full"
          />
          <div class="text-white absolute bottom-0 p-8">
            <RiYoutubeFill class="h-8 fill-current" />
            <DsfrHeading as="h3" size="xs" class="mt-2">
              Une distribution alimentaire avec Emmaüs Solidarité
            </DsfrHeading>
          </div>
        </a>
        <a :href="`${urlBlog}/${article.slug}`" target="_blank" @click="onClick">
          <CardArticleLight :article="article" class="!h-full" />
        </a>
      </template>
    </div>
    <div class="mt-8">
      <NuxtLink
        no-prefetch
        to="https://www.jeveuxaider.gouv.fr/engagement/category/actualite/"
        class="flex-none"
        target="_blank"
      >
        <DsfrButton type="secondary" class="h-full"> Plus d’articles </DsfrButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import CardArticleLight from '@/components/card/CardArticleLight.vue'

export default defineNuxtComponent({
  components: {
    CardArticleLight,
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
    if (this.$stores.settings.general?.blog_active) {
      this.fetch()
    }
  },
  methods: {
    async fetch() {
      const runtimeConfig = useRuntimeConfig()

      const articles = await $fetch(`${runtimeConfig.public.blog.restApiUrl}/?per_page=3`)
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
    onClick() {
      this.$plausible.trackEvent('Homepage - Clique - Article du blog', {
        props: { isLogged: this.$stores.auth.isLogged },
      })
    },
  },
})
</script>

<style lang="postcss" scoped>
.card-scale-img {
  /* box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.05); */
  @apply transition;
  @screen sm {
    &:hover {
      img.thumbnail {
        transform: scale(1.05);
      }
      /* @apply shadow-xl; */
    }
  }
  img {
    transition: all 0.25s;
  }
}
</style>
