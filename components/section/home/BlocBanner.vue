<template>
  <div class="bg-jva-blue-500 overflow-hidden relative">
    <img
      src="/images/home/banner-ronds.svg"
      alt=""
      width="1592"
      height="691"
      aria-hidden="true"
      :class="[
        'pointer-events-none absolute inset-0 m-auto object-cover',
        'w-full h-[700px]',
        'md:h-[1000px]',
        'lg:w-[1024px] lg:h-[1200px] lg:translate-x-[-120px] lg:translate-y-[50px]',
        'xl:w-[1860px] xl:h-[1527px] lg:translate-x-[-162px] lg:translate-y-[38px]',
      ]"
    />
    <div
      :class="[
        'container relative',
        { 'pt-10 sm:pt-0': !$stores.auth.isLogged },
        { 'pt-12': $stores.auth.isLogged },
      ]"
    >
      <div class="relative sm:pt-10 sm:pb-14 lg:pt-14 lg:pb-20 xl:pt-[89px] xl:pb-[136px]">
        <div class="sm:max-w-[425px] lg:max-w-[600px] xl:max-w-[860px]">
          <template v-if="$stores.auth.isLogged">
            <div>
              <DsfrHeading
                as="h1"
                size="alt-xl"
                class="mb-10 xl:mb-20 xl:max-w-[720px]"
                color="text-white"
              >
                <span class="relative">
                  <span>{{ $stores.auth.profile.first_name }}</span>
                  <img
                    src="/images/home/sparkle-right.svg"
                    alt=""
                    width="40"
                    height="43"
                    aria-hidden="true"
                    :class="[
                      'absolute right-[-28px] xxs:right-[-32px] pointer-events-none lg:right-[-60px] lg:w-[80px]',
                      {
                        '-top-1 xxs:top-[4px] lg:top-[-20px]': !['d', 'f', 'l'].includes(
                          $stores.auth.profile.first_name.slice(-1)
                        ),
                      },
                      {
                        '-top-4 xxs:top-[-12px] lg:top-[-36px]': ['d', 'f', 'l'].includes(
                          $stores.auth.profile.first_name.slice(-1)
                        ),
                      },
                    ]"
                  /> </span
                ><br />
                <span>Et si on bougeait les lignes ? </span>
              </DsfrHeading>
            </div>
          </template>
          <template v-else>
            <div
              :class="[
                'text-jva-orange-300 font-bold mb-4 xl:mb-8',
                'text-xl xxs:text-2xl xs:text-3xl sm:text-[32px] xl:text-[46px] xl:leading-[46px]',
              ]"
            >
              <p>
                <span>Je veux </span>
                <Typer
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
                  class="text-jva-orange-300"
                />
              </p>
            </div>
            <DsfrHeading as="h1" size="alt-2xl" class="mb-10 xl:mb-16" color="text-white">
              <span class="relative left-[-4px] md:left-[-6px] lg:left-[-8px] xl:left-[-12px]"
                >Devenez
              </span>
              <span class="relative left-[-3px] md:left-[-5px] lg:left-[-6px] xl:left-[-8px]">
                <span>bénévole</span>
                <img
                  src="/images/home/sparkle-right.svg"
                  alt=""
                  aria-hidden="true"
                  width="40"
                  height="43"
                  class="absolute right-[-26px] -top-1 xxs:top-[6px] pointer-events-none xl:-right-16 xl:w-[80px]"
                />
              </span>
            </DsfrHeading>
          </template>
          <DsfrButton
            type="tertiary-no-outline"
            icon="RiSearchLine"
            icon-class="lg:!w-5 lg:!h-5 lg:!mr-3"
            class="lg:px-6 lg:py-3 lg:text-lg"
            @click="handleClick()"
          >
            <span>
              <span>Trouver une mission</span>
              <span class="hidden xxs:inline"> de bénévolat</span>
            </span>
          </DsfrButton>
        </div>

        <!-- DESKTOP -->
        <div
          :class="[
            'hidden sm:flex sm:gap-4 lg:gap-6 xl:gap-8 sm:items-center',
            'absolute top-0 -right-32 md:-right-12 xl:-right-48',
            'rotate-[4.89deg] -translate-y-16 lg:-translate-y-24 xl:-translate-y-36',
          ]"
        >
          <picture data-not-lazy>
            <source
              srcset="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
              media="(max-width: 640px)"
            />
            <img
              src="/images/home/trombi-desktop-strip-1.png"
              srcset="
                /images/home/trombi-desktop-strip-1.webp,
                /images/home/trombi-desktop-strip-1@2x.webp 2x,
                /images/home/trombi-desktop-strip-1.png,
                /images/home/trombi-desktop-strip-1@2x.png  2x
              "
              alt=""
              width="194"
              height="829"
              class="sm:w-[100px] lg:w-[145px] xl:w-auto pointer-events-none select-none parallax-1"
            />
          </picture>

          <picture data-not-lazy>
            <source
              srcset="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
              media="(max-width: 640px)"
            />
            <img
              src="/images/home/trombi-desktop-strip-2a.png"
              srcset="
                /images/home/trombi-desktop-strip-2a.webp,
                /images/home/trombi-desktop-strip-2a@2x.webp 2x,
                /images/home/trombi-desktop-strip-2a.png,
                /images/home/trombi-desktop-strip-2a@2x.png  2x
              "
              alt=""
              width="193"
              height="1114"
              class="sm:w-[100px] lg:w-[145px] xl:w-auto pointer-events-none select-none parallax-2"
            />
          </picture>

          <picture data-not-lazy>
            <source
              srcset="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
              media="(max-width: 640px)"
            />
            <img
              src="/images/home/trombi-desktop-strip-3.png"
              srcset="
                /images/home/trombi-desktop-strip-3.webp,
                /images/home/trombi-desktop-strip-3@2x.webp 2x,
                /images/home/trombi-desktop-strip-3.png,
                /images/home/trombi-desktop-strip-3@2x.png  2x
              "
              alt=""
              width="193"
              height="828"
              class="sm:w-[100px] lg:w-[145px] xl:w-auto pointer-events-none select-none parallax-3"
            />
          </picture>
        </div>
      </div>

      <!-- MOBILE -->
      <img
        srcset="
          /images/home/trombinoscope-mobile-2.webp,
          /images/home/trombinoscope-mobile-2@2x.webp 2x,
          /images/home/trombinoscope-mobile-2.png,
          /images/home/trombinoscope-mobile-2@2x.png  2x
        "
        src="/images/home/trombinoscope-mobile-2.png"
        alt=""
        width="425"
        height="250"
        class="mt-10 object-contain w-full sm:hidden pointer-events-none select-none"
      />
    </div>
  </div>
</template>

<script>
import lax from 'lax.js'
import { Typer } from 'vue3-typer'
import 'vue3-typer/dist/vue-typer.css'

export default defineNuxtComponent({
  components: {
    Typer,
  },
  data() {
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
        'passer à l’action',
      ],
    }
  },
  mounted() {
    lax.init()
    lax.addDriver('scrollY', function () {
      return window.scrollY
    })
    lax.addElements('.parallax-1', {
      scrollY: {
        translateY: [
          [0, 'screenWidth'],
          [0, -150],
        ],
      },
    })
    lax.addElements('.parallax-2', {
      scrollY: {
        translateY: [
          [0, 'screenWidth'],
          [0, 200],
        ],
      },
    })
    lax.addElements('.parallax-3', {
      scrollY: {
        translateY: [
          [0, 'screenWidth'],
          [0, -300],
        ],
      },
    })
  },
  methods: {
    handleClick() {
      this.$plausible.trackEvent('Click CTA - Homepage', {
        props: { isLogged: this.$stores.auth.isLogged },
      })
      this.$router.push('/missions-benevolat')
    },
  },
})
</script>

<style lang="postcss" scoped>
:deep(.vue-typer) {
  .char.typed {
    @apply !text-jva-orange-300;
  }
  .char.selected {
    @apply text-jva-orange-300 bg-[#5077D4];
  }
  .caret {
    background-color: #6666bd;
  }
}
</style>
