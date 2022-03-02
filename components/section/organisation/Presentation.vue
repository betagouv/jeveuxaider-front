<template>
  <div class="relative bg-white lg:grid lg:grid-cols-2">
    <!-- LEFT -->
    <div class="col-span-2 lg:col-span-1">
      <header class="border-b flex justify-between items-stretch">
        <div class="p-4 border-r flex items-center">
          <img src="@/assets/images/marianne-logo.svg" width="55" class="my-auto">
        </div>

        <div class="p-4 flex items-center">
          <span class="text-xs uppercase text-gray-500 mr-3">
            Encouragé par
          </span>
          <nuxt-link to="/">
            <img
              src="@/assets/images/jeveuxaider-logo.svg"
              alt="Bénévolat je veux aider"
              title="Bénévolat association"
              width="140"
            >
          </nuxt-link>
        </div>
      </header>

      <div class="max-w-3xl lg:ml-auto">
        <div class="px-4 pb-8 md:p-8 lg:pt-6 xl:p-16 xl:pt-8">
          <Breadcrumb
            class="breadcrumb"
            :items="[{ label: organisation.name }]"
          />

          <img
            v-if="organisation.logo"
            :srcset="organisation.logo.urls.large"
            :alt="organisation.name"
            class="my-8 h-auto"
            style="max-width: 16rem; max-height: 120px"
            @error="onLogoError"
          >

          <h1
            class="mt-2 text-3xl sm:text-5xl sm:!leading-[1.1] tracking-tighter text-gray-900"
          >
            <div>Découvrez {{ organisation.statut_juridique|label('structure_legal_status', 'label2') }}</div>
            <span class="font-extrabold">{{ organisation.name }}</span>
          </h1>

          <div
            class="h-[2.5px] w-16 my-10"
            :style="`background-color: ${organisation.color ? organisation.color : '#B91C1C'}`"
          />

          <TextFormatted :max-lines="2" :text="organisation.description" class="text-cool-gray-500 text-lg" />
        </div>
      </div>

      <slot name="anchors" />
    </div>

    <!-- RIGHT -->
    <div>
      <img
        :srcset="srcSet"
        class="lg:absolute object-cover w-full lg:w-1/2 h-full max-h-[400px] lg:max-h-full"
        @error="onIllustrationError"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    organisation: {
      type: Object,
      required: true
    },
    srcSet: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      expandDescription: false
    }
  },
  methods: {
    onLogoError ($event) {
      $event.target.remove()
    },
    onIllustrationError ($event) {
      $event.target.srcset = '/images/organisation-default-2.webp'
    }
  }
}
</script>

<style lang="postcss" scoped>
.breadcrumb {
  border-bottom: 0 !important;
  ::v-deep ol {
    @apply px-0 !important;
  }
}

.footer--button {
  font-size: 10px;
  @apply font-bold uppercase py-6 outline-none transition-colors ease-in-out duration-200;
  &:focus-visible,
  &:hover {
    @apply bg-gray-100;
  }
  @screen sm {
    @apply text-sm;
  }
}
</style>
