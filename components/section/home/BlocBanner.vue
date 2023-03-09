<template>
  <div class="bg-jva-blue-500">
    <div class="p-6">
      <div class="text-jva-orange-300 text-[32px] font-bold mb-4">
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
      </div>
      <div>
        <Heading as="h1" size="alt-lg" class="mb-10" color="text-white">
          Devenez <span class="relative">bénévole <img class="absolute right-[-26px] top-[6px]" src="/images/home/sparkle-right.svg"></span>
        </Heading>
      </div>
      <Button type="tertiary-no-outline" icon="RiSearchLine" @click="handleClick()">
        Trouvez une mission de bénévolat
      </Button>
    </div>
    <div class="">
      <img
        srcset="
          /images/home/trombinoscope.webp,
          /images/home/trombinoscope@2x.webp 2x,
          /images/home/trombinoscope.png,
          /images/home/trombinoscope@2x.png 2x
        "
        alt="Trombinoscope"
        class=""
        data-not-lazy
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
