<template>
  <div
    class="card--article h-auto flex flex-col flex-1 bg-white rounded-[10px] overflow-hidden safari-fix-scale"
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

    <div class="m-8 flex-1 flex flex-col items-start space-y-6">
      <client-only>
        <v-clamp
          tag="h3"
          :max-lines="3"
          autoresize
          class="text-[#111111] text-2xl leading-[28px] font-bold relative mb-auto"
        >
          {{ article.title.rendered | decodeHTMLEntities }}

          <template slot="after" slot-scope="{ clamped }">
            <!-- Tooltip if clamped -->
            <span
              v-if="clamped"
              v-tooltip="{
                delay: { show: 700, hide: 100 },
                content: $options.filters.decodeHTMLEntities(
                  article.title.rendered
                ),
                hideOnTargetClick: true,
                placement: 'top',
              }"
              class="absolute w-full h-full top-0 left-0"
            />
          </template>
        </v-clamp>

        <h3
          slot="placeholder"
          class="text-[#111111] text-2xl leading-[28px] font-bold relative mb-auto"
        >
          {{ article.title.rendered }}
        </h3>
      </client-only>

      <client-only>
        <v-clamp :max-lines="2" autoresize class="text-[#696974]">
          {{ article.excerpt.rendered | stripHTML | decodeHTMLEntities }}
        </v-clamp>

        <div slot="placeholder" class="text-[#696974]">
          {{ article.excerpt.rendered | stripHTML | decodeHTMLEntities }}
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
import VClamp from 'vue-clamp'

export default {
  components: {
    VClamp
  },
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
