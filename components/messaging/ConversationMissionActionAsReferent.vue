<template>
  <div class=" bg-pink-200">
    <div>Mission state {{ mission.state }}</div>
  <!-- Bouton [VALIDER] si en attente de validation / En cours de traitement -->
  <!-- Sinon on affiche le statut et on laisse que le bouton Autres -->
  <!-- Autre : En cours de traitement / Signaler / Mettre hors ligne -->
  </div>
</template>

<script>
export default {
  computed: {
    conversation () {
      return this.$store.getters['messaging2/activeConversation']
    },
    mission () {
      return this.conversation.conversable
    }
  }
}
</script>

<style>

</style>
