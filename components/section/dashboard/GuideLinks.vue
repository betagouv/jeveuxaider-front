<template>
  <BaseBox>
    <BaseHeading as="h2" :level="3" class="mb-8 font-extrabold">
      {{ $stores.auth.contextRole === 'admin' ? 'Liens utiles' : 'Suivez le guide' }}
    </BaseHeading>
    <BaseStackedList class="border-t">
      <BaseStackedListItem v-for="(link, i) in links" :key="i" :icon="link.icon" :link="link.link">
        <div class="group-hover:underline font-bold">
          {{ link.title }}
        </div>
      </BaseStackedListItem>
    </BaseStackedList>
  </BaseBox>
</template>

<script>
export default defineNuxtComponent({
  computed: {
    links() {
      switch (this.$stores.auth.contextRole) {
        case 'admin':
          return [
            {
              icon: '🏞',
              title: 'Territoires',
              link: '/admin/contenus/territoires',
            },
            {
              icon: '🗂',
              title: 'Modèles de missions',
              link: '/admin/contenus/modeles-mission',
            },
            {
              icon: '🌟',
              title: "Retours d'expériences",
              link: '/admin/temoignages',
            },
            { icon: '🗒️', title: 'Notes', link: '/admin/notes' },
            { icon: '📋', title: 'Ressources', link: '/admin/ressources' },
          ]
        case 'tete_de_reseau':
          return [
            {
              icon: '🗂',
              title: 'Modèles de missions',
              link: '/admin/contenus/modeles-mission',
            },
            { icon: '📋', title: 'Ressources', link: '/admin/ressources' },
          ]
        case 'referent':
          return [
            {
              icon: '🌟',
              title: "Retours d'expériences",
              link: '/admin/temoignages',
            },
            { icon: '🗒️', title: 'Notes', link: '/admin/notes' },
            { icon: '📋', title: 'Ressources', link: '/admin/ressources' },
          ]
        case 'responsable':
          return [
            {
              icon: '🌟',
              title: "Retours d'expériences",
              link: '/admin/temoignages',
            },
            { icon: '📋', title: 'Ressources', link: '/admin/ressources' },
          ]
        default:
          return [{ icon: '📋', title: 'Ressources', link: '/admin/ressources' }]
      }
    },
  },
})
</script>
