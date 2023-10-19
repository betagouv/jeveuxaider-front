<template>
  <div class="container">Redirection en cours</div>
</template>

<script>
export default {
  async setup() {
    return await navigateTo('/charte-bon-fonctionnement/responsables', { redirectCode: 301 })
  },
}
</script>
