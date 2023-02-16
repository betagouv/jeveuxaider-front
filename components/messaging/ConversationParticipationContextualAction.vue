<template>
  <div>Participation state {{ participation.state }}</div>
  <!-- Bouton [VALIDER] si en attente de validation / En cours de traitement -->
  <!-- Sinon on affiche le statut et on laisse que le bouton Autres -->
  <!-- Autre : Décliner / Annuler / Archiver ? (à discuter) -->
</template>

<script>
export default {
  props: {
    conversation: {
      type: Object,
      required: true
    }
  },
  computed: {
    participation () {
      return this.conversation.conversable
    }
  }
}
</script>

<style>

</style>
