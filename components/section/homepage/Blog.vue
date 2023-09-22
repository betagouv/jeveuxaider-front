<!-- <template>
  <section v-if="articles.length > 0" class="py-16 bg-white overflow-hidden">
    <div class="container mx-auto px-8 sm:px-4">
      <div class="mx-auto max-w-6xl">
        <div class="flex justify-between items-baseline mb-12">
          <DsfrHeading :id="`label-blog-${uuid}`" as="h2" size="2xl">
            Les actualités de l'engagement
          </DsfrHeading>

          <p class="hidden md:block ml-4 text-[32px] xl:text-[40px] text-[#A7A7B0]">#blog</p>
        </div>

        <BaseSlideshow
          :slides-are-links="true"
          :more-link="{
            link: `https://jeveuxaider.gouv.fr/engagement/actualites/`,
            label: `Plus d'articles`,
            isExternal: true,
          }"
          :aria-labelledby="`label-blog-${uuid}`"
        >
          <a
            v-for="article in articles"
            :key="article.id"
            class="card--article--wrapper"
            :href="`${blogUrl}/${article.slug}`"
            target="_blank"
          >
            <CardArticle :article="article" class="!h-full" />
          </a>
        </BaseSlideshow>
      </div>
    </div>
  </section>
</template>

<script>
import CardArticle from '@/components/card/CardArticle.vue'
import uuid from '@/mixins/uuid'

export default defineNuxtComponent({
  components: {
    CardArticle,
    Heading,
  },
  mixins: [uuid],
  data() {
    return {
      articles: [],
    }
  },
  created() {
    this.fetch()
  },
  computed: {
    blogUrl() {
      const runtimeConfig = useRuntimeConfig()
      return runtimeConfig.public.blog.url
    },
  },
  methods: {
    async fetch() {
      const runtimeConfig = useRuntimeConfig()
      const articles = await $fetch(`${runtimeConfig.public.blog.restApiUrl}/?per_page=6`)
      const articlesWithMedia = []
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
  },
})
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
  .slick-dots {
    @screen xl {
      display: none !important;
    }
  }
}
</style> -->
