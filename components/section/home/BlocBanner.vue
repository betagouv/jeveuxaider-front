<template>
  <div class="bg-jva-blue-500 overflow-hidden">
    <div class="container pt-6 sm:pt-0">
      <div class="relative sm:pt-10 sm:pb-14 lg:pt-14 lg:pb-20 xl:pt-20 xl:pb-32">
        <div class="sm:max-w-[425px] lg:max-w-[600px] xl:max-w-[860px]">
          <template v-if="$store.getters.isLogged">
            <div>
              <Heading as="h1" size="alt-xl" class="mb-10 xl:mb-20" color="text-white">
                <span class="relative">
                  <span>{{ $store.getters.profile.first_name }}</span>
                  <img
                    aria-hidden="true"
                    src="/images/home/sparkle-right.svg"
                    width="40"
                    height="43"
                    class="absolute right-[-26px] -top-1 xxs:top-[6px] pointer-events-none lg:right-[-60px] lg:top-[-10px] lg:w-[80px]"
                  >
                </span><br>
                <span>ravis de vous voir connecté </span>
              </Heading>
            </div>
          </template>
          <template v-else>
            <div
              :class="[
                'text-jva-orange-300 font-bold mb-4 xl:mb-12',
                'text-xl xxs:text-2xl xs:text-3xl sm:text-[32px] xl:text-[56px] xl:leading-[56px]'
              ]"
            >
              <client-only>
                <div>
                  <p>
                    <span>Je veux</span>
                    <vue-typer
                      :text="words"
                      :repeat="Infinity"
                      :shuffle="true"
                      initial-action="typing"
                      :pre-type-delay="70"
                      :type-delay="70"
                      :pre-erase-delay="2000"
                      :erase-delay="250"
                      erase-style="select-all"
                      :erase-on-complete="false"
                      caret-animation="blink"
                      class="ml-2 text-jva-orange-300"
                    />
                  </p>
                </div>
                <p slot="placeholder" class="truncate">
                  <span class="truncate"> {{ words.map(word => `Je veux ${word}`).join(', ') }} </span>
                </p>
              </client-only>
            </div>
            <Heading as="h1" size="alt-2xl" class="mb-10 xl:mb-20" color="text-white">
              <span>Devenez </span>
              <span class="relative">
                <span>bénévole</span>
                <img
                  aria-hidden="true"
                  src="/images/home/sparkle-right.svg"
                  width="40"
                  height="43"
                  class="absolute right-[-26px] -top-1 xxs:top-[6px] pointer-events-none xl:-right-16 xl:w-[80px]"
                >
              </span>
            </Heading>
          </template>
          <Button
            type="tertiary-no-outline"
            icon="RiSearchLine"
            class="xl:px-6 xl:py-3 xl:text-lg"
            @click="handleClick()"
          >
            Trouvez une mission <span class="hidden xxs:inline">de bénévolat</span>
          </Button>
        </div>

        <!-- DESKTOP -->
        <div
          :class="[
            'hidden sm:flex sm:gap-4 lg:gap-6 xl:gap-8 sm:items-center',
            'absolute top-0 -right-32 md:-right-12 xl:-right-48',
            'rotate-6 -translate-y-16 lg:-translate-y-24 xl:-translate-y-36'
          ]"
        >
          <picture data-not-lazy>
            <source srcset="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" media="(max-width: 640px)">
            <img
              src="/images/home/trombi-desktop-strip-1.png"
              srcset="
                /images/home/trombi-desktop-strip-1.webp, /images/home/trombi-desktop-strip-1@2x.webp 2x,
                /images/home/trombi-desktop-strip-1.png, /images/home/trombi-desktop-strip-1@2x.png 2x
              "
              alt=""
              width="194"
              height="829"
              class="sm:w-[100px] lg:w-[145px] xl:w-auto"
            >
          </picture>

          <picture data-not-lazy>
            <source srcset="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" media="(max-width: 640px)">
            <img
              src="/images/home/trombi-desktop-strip-2.png"
              srcset="
              /images/home/trombi-desktop-strip-2.webp, /images/home/trombi-desktop-strip-2@2x.webp 2x,
              /images/home/trombi-desktop-strip-2.png, /images/home/trombi-desktop-strip-2@2x.png 2x
            "
              alt=""
              width="193"
              height="1114"
              class="sm:w-[100px] lg:w-[145px] xl:w-auto"
            >
          </picture>

          <picture data-not-lazy>
            <source srcset="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" media="(max-width: 640px)">
            <img
              src="/images/home/trombi-desktop-strip-3.png"
              srcset="
              /images/home/trombi-desktop-strip-3.webp, /images/home/trombi-desktop-strip-3@2x.webp 2x,
              /images/home/trombi-desktop-strip-3.png, /images/home/trombi-desktop-strip-3@2x.png 2x
            "
              alt=""
              width="193"
              height="828"
              class="sm:w-[100px] lg:w-[145px] xl:w-auto"
            >
          </picture>
        </div>
      </div>

      <!-- MOBILE -->
      <img
        srcset="
          /images/home/trombinoscope-mobile.webp, /images/home/trombinoscope-mobile@2x.webp 2x,
          /images/home/trombinoscope-mobile.png, /images/home/trombinoscope-mobile@2x.png 2x
        "
        src="/images/home/trombinoscope-mobile.png"
        alt=""
        width="425"
        height="250"
        class="mt-10 object-contain w-full sm:hidden"
      >
    </div>
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'
import Heading from '@/components/dsfr/Heading.vue'

export default {
  components: {
    Button,
    Heading
  },
  data () {
    return {
      words: [
        'aider',
        'du sens',
        'plus de solidarité',
        'être utile',
        'partager',
        'avoir de l’impact',
        'être fier de moi',
        'apprendre',
        'passer à l’action'
      ]
    }
  },
  methods: {
    handleClick () {
      window.plausible &&
        window.plausible('Click CTA - Homepage', {
          props: { isLogged: this.$store.getters.isLogged }
        })
      this.$router.push('/missions-benevolat')
    }
  }
}
</script>

<style lang="postcss" scoped>
:deep(.vue-typer) {
  .custom.char.typed {
    @apply text-jva-orange-300
  }
  .custom.char.selected {
    @apply text-jva-orange-300 bg-[#5077D4]
  }
  .custom.caret {
    background-color: #6666BD;
  }
}
</style>
