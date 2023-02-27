<template>
  <div class=" bg-pink-200">
    <div>Participation state {{ participation.state }}</div>
  <!-- Bouton [VALIDER] si en attente de validation / En cours de traitement -->
  <!-- Sinon on affiche le statut et on laisse que le bouton Autres -->
  <!-- Autre : Décliner / Annuler / Archiver ? (à discuter) -->
  </div>
</template>

<script>
export default {
  computed: {
    conversation () {
      return this.$store.getters['messaging2/activeConversation']
    },
    participation () {
      return this.conversation.conversable
    }
  }
}
</script>

<style>

</style>
