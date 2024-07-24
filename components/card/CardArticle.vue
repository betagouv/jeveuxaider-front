<template>
  <div
    class="card--article h-auto flex flex-col flex-1 bg-white overflow-hidden safari-fix-scale border border-[#E5E5E5]"
  >
    <div class="thumbnail--wrapper relative">
      <img
        v-if="article.media"
        :src="article.media.media_details.sizes.medium_large.source_url"
        :alt="article.title.rendered"
        class="w-full h-full object-cover"
        width="325"
        height="180"
      />

      <div class="custom-gradient absolute inset-0" />
    </div>

    <div class="m-8 flex-1 flex flex-col items-start">
      <div v-if="article.categories.length" class="mb-4 flex flex-wrap gap-2">
        <DsfrTag v-for="categoryId in article.categories" :key="categoryId">
          {{ category(categoryId) }}
        </DsfrTag>
      </div>

      <DsfrHeading
        as="h3"
        size="xs"
        class="line-clamp-3 mb-auto"
        :title="$filters.decodeHTMLEntities(article.title.rendered)"
      >
        {{ $filters.decodeHTMLEntities(article.title.rendered) }}
      </DsfrHeading>

      <div class="text-gray-600 text-base mt-4 line-clamp-2">
        {{ $filters.decodeHTMLEntities($filters.stripHTML(article.excerpt.rendered)) }}
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    article: {
      type: Object,
      default: null,
    },
  },
  methods: {
    category(id) {
      switch (id) {
        case 2:
          return 'Actualité'
        case 3:
          return 'Édito'
        case 4:
          return 'Focus'
        case 5:
          return 'Info'
        case 6:
          return 'Témoignage'
        default:
          return id
      }
    },
  },
})
</script>

<style lang="postcss" scoped>
.card--article {
  /* box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1); */
  @apply transition;
  @screen sm {
    &:hover {
      .thumbnail--wrapper img {
        transform: scale(1.05);
      }
    }
  }
}

.thumbnail--wrapper {
  height: 180px;
  @apply bg-gray-200 overflow-hidden;
  img {
    transition: all 0.25s;
  }
}

.custom-gradient {
  background: linear-gradient(183.3deg, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.7) 100%);
}
</style>
