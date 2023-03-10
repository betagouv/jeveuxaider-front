<template>
  <div class="bg-jva-blue-500">
    <div class="container pt-6">
      <div class="text-jva-orange-300 text-xl xxs:text-2xl xs:text-3xl sm:text-[32px] font-bold mb-4">
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
      <Heading as="h1" size="alt-xl" class="mb-10" color="text-white">
        Devenez
        <span class="relative">
          <span>bénévole</span>
          <img
            aria-hidden="true"
            src="/images/home/sparkle-right.svg"
            width="40"
            height="43"
            class="absolute right-[-26px] -top-1 xxs:top-[6px] pointer-events-none"
          >
        </span>
      </Heading>
      <Button type="tertiary-no-outline" icon="RiSearchLine" @click="handleClick()">
        Trouvez une mission <span class="hidden xxs:inline"> de bénévolat</span>
      </Button>

      <img
        srcset="
          /images/home/trombinoscope-mobile.webp, /images/home/trombinoscope-mobile@2x.webp 2x,
          /images/home/trombinoscope-mobile.png, /images/home/trombinoscope-mobile@2x.png 2x
        "
        src="/images/home/trombinoscope-mobile.png"
        alt=""
        width="425"
        height="250"
        class="mt-10 object-contain w-full"
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
