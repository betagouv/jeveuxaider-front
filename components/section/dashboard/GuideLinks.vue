<template>
  <Box>
    <Heading as="h2" :level="2" class="mb-8 font-extrabold">
      {{ $store.getters.contextRole === 'admin' ? 'Liens utiles' : 'Suivez le guide' }}
    </Heading>
    <StackedList class="border-t">
      <StackedListItem
        v-for="link,i in links"
        :key="i"
        :icon="link.icon"
        :link="link.link"
      >
        <div class="group-hover:underline font-bold">
          {{ link.title }}
        </div>
      </StackedListItem>
    </StackedList>
  </Box>
</template>

<script>
export default {
  computed: {
    links () {
      switch (this.$store.getters.contextRole) {
        case 'admin': return [
          { icon: '🏞', title: 'Territoires', link: '/admin/contenus/territoires' },
          { icon: '🗂', title: 'Modèles de missions', link: '/admin/contenus/modeles-mission' },
          { icon: '🌟', title: 'Retours d\'expériences', link: '/admin/temoignages' },
          { icon: '🗒️', title: 'Notes', link: '/admin/notes' },
          { icon: '📋', title: 'Ressources', link: '/admin/ressources' }
        ]
        case 'tete_de_reseau': return [
          { icon: '🗂', title: 'Modèles de missions', link: '/admin/contenus/modeles-mission' },
          { icon: '📋', title: 'Ressources', link: '/admin/ressources' }
        ]
        case 'referent':
          return [
            { icon: '🌟', title: 'Retours d\'expériences', link: '/admin/temoignages' },
            { icon: '🗒️', title: 'Notes', link: '/admin/notes' },
            { icon: '📋', title: 'Ressources', link: '/admin/ressources' }
          ]
        case 'responsable':
          return [
            { icon: '🌟', title: 'Retours d\'expériences', link: '/admin/temoignages' },
            { icon: '📋', title: 'Ressources', link: '/admin/ressources' }
          ]
        default: return [
          { icon: '📋', title: 'Ressources', link: '/admin/ressources' }
        ]
      }
    }
  }
}
</script>
