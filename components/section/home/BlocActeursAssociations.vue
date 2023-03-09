<template>
  <div class="p-8 bg-white shadow-xl">
    <div class="text-3xl font-bold">
      Associations et organisations publiques
    </div>
    <ul class="text-xl mt-8">
      <li>Inscrivez votre organisation <strong>en quelques clics</strong></li>
      <li><strong>Publiez vos missions</strong> de bénévolat</li>
      <li>Trouvez facilement de <strong>nouveaux bénévoles</strong></li>
    </ul>
    <div class="mt-8">
      <Button @click="handleClick()">
        Inscrivez votre organisation
      </Button>
    </div>
    <div class="mt-8">
      <div>IMG</div>
      <div class="text-[#3A3A3A]">
        <strong>Caroline et Sophie</strong> de JeVeuxAider.gouv.fr pour vous accompagner
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    Button
  },
  methods: {
    handleClick () {
      window.plausible &&
        window.plausible('Click CTA - Homepage - Associations - Inscrivez votre organisation', {
          props: { isLogged: this.$store.getters.isLogged }
        })
      this.$router.push('/inscription/responsable')
    }
  }
}
</script>

<style>

</style>
