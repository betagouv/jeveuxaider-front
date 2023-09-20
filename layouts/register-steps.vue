<template>
  <div class="w-full lg:min-h-screen flex flex-col lg:flex-row">
    <div class="bg-white lg:w-1/3">
      <div class="p-6 lg:p-12 border-b border-cool-gray-100 text-center">
        <NuxtLink to="/" class="inline-block">
          <img
            src="@/assets/images/jeveuxaider-logo.svg"
            alt=""
            class="mx-auto"
            width="243"
            height="39"
          />
        </NuxtLink>
      </div>
      <div class="p-6 lg:p-12">
        <div id="teleport-sidebar"></div>
      </div>
    </div>
    <div id="step-container" class="lg:w-2/3 relative bg-[#081992]">
      <img
        class="z-1 object-cover absolute h-screen lg:h-auto w-full max-h-full object-top"
        alt="JeVeuxAider.gouv.fr"
        srcset="
          /images/bg-jva.webp,
          /images/bg-jva@2x.webp 2x,
          /images/bg-jva.jpg
        "
        data-not-lazy
      />

      <div class="p-6 lg:p-12">
        <NuxtPage />
      </div>
    </div>

    <div id="teleport-body-end"></div>
  </div>
</template>

<script>
import MixinPlausible from '@/mixins/plausible.js'

export default {
  mixins: [MixinPlausible],
  setup() {
    useHead({
      bodyAttrs: {
        class: 'full-height-layout',
      },
    })
  },
}
</script>

<style lang="postcss" scoped>
.aside {
  @screen lg {
    position: fixed;
    max-width: 390px;
    min-height: 100vh;
  }
}

.main-content {
  @screen lg {
    margin-left: 390px;
  }
}

.logo {
  width: 150px;
  @screen lg {
    max-width: 230px;
  }
}
</style>
