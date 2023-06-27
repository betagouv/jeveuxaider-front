<template>
  <div class="container">
    Redirection en cours
  </div>
</template>

<script>

export default {
  asyncData ({ redirect }) {
    redirect(301, '/charte-bon-fonctionnement/responsables')
  }
}
</script>
