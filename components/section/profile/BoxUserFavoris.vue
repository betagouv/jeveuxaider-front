<template>
  <BaseBox v-if="showBox">
    <BaseHeading as="h2" :level="3" class="text-black">
      Vous avez {{ $filters.pluralize(favoritesCount, 'favori') }}
    </BaseHeading>

    <div class="text-[#666666]">Proposez votre aide dès maintenant !</div>
    <DsfrButton type="secondary" to="/profile/favoris" class="mt-8"
      >Accéder à mes favoris</DsfrButton
    >
  </BaseBox>
</template>

<script>
export default defineNuxtComponent({
  props: {},
  data() {
    return {}
  },
  computed: {
    showBox() {
      return this.$stores.auth.user.favorite_missions.length > 0
    },
    favoritesCount() {
      return this.$stores.auth.user.favorite_missions.length
    },
  },
  methods: {},
})
</script>
