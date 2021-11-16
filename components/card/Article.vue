<template>
  <div
    class="card--article h-auto flex flex-col flex-1 bg-white rounded-xl overflow-hidden safari-fix-scale"
  >
    <div class="thumbnail--wrapper relative">
      <img
        v-if="article.media"
        :src="article.media.media_details.sizes.medium_large.source_url"
        :alt="article.title.rendered"
        class="w-full h-full object-cover"
        width="325"
        height="180"
      >

      <div class="custom-gradient absolute inset-0" />
    </div>

    <div class="mx-8 my-6 flex-1 flex flex-col items-start space-y-6">
      <Badge>
        {{ article.categories[0] }}
      </Badge>

      <h3
        v-tooltip="{
          content: $options.filters.decodeHTMLEntities(
            article.title.rendered
          ),
          hideOnTargetClick: true,
        }"
        class="font-black text-black text-lg relative mb-auto line-clamp-3"
      >
        {{ article.title.rendered | decodeHTMLEntities }}
      </h3>

      <div class="text-gray-500 text-sm mt-2 line-clamp-2">
        {{ article.excerpt.rendered | stripHTML | decodeHTMLEntities }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: null
    }
  },
  computed: {}
}
</script>

<style lang="postcss" scoped>
.card--article {
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1);
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
    transition: all 0.4s ease-in-out;
  }
}

.custom-gradient {
  background: linear-gradient(
    183.3deg,
    rgba(0, 0, 0, 0) 80%,
    rgba(0, 0, 0, 0.7) 100%
  );
}
</style>
