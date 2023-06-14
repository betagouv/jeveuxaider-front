<template>
  <div class=" bg-pink-200">
    <div>Organisation state {{ organisation.state }}</div>
  <!-- Pour référent Bouton [VALIDER] si en attente de validation / En cours de traitement -->
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
    organisation () {
      return this.conversation.conversable
    }
  }
}
</script>
