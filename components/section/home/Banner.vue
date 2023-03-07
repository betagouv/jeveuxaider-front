<template>
  <div class="relative h-[525px] bg-jva-blue-500 p-6">
    <div class="text-jva-orange-300 text-[32px] font-bold mb-4">
      Je veux être utile
    </div>
    <div>
      <Heading as="h1" size="alt-lg" class="mb-10" color="text-white">
        Devenez <span class="relative">bénévole <img class="absolute right-[-26px] top-[6px]" src="/images/home/sparkle-right.svg"></span>
      </Heading>
    </div>
    <Button type="tertiary-no-outline" icon="RiSearchLine" @click="handleClick()">
      Trouvez une mission de bénévolat
    </Button>
    <div class="absolute bottom-0 right-0 left-0">
      <picture>
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
      </picture>
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

<style>

</style>
