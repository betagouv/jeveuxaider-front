<template>
  <div>
    <DsfrHeading as="h2" size="sm" class="mb-6">
      Suivez-nous <br class="hidden lg:block" />
      sur les réseaux sociaux
    </DsfrHeading>

    <div class="flex justify-between -mx-2">
      <a
        v-for="socialMedia in socialMedias"
        :key="socialMedia.url"
        :href="socialMedia.url"
        target="_blank"
        :title="socialMedia.name"
        class="p-2 text-jva-blue-500 hover:text-jva-blue-800 active:text-jva-blue-900"
      >
        <component :is="socialMedia.icon" width="24" class="fill-current" />
      </a>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  data() {
    return {
      socialMedias: [
        {
          name: 'Twitter',
          icon: 'RiTwitterFill',
          url: 'https://twitter.com/ReserveCivique',
        },
        {
          name: 'Linkedin',
          icon: 'RiLinkedinBoxFill',
          url: 'https://fr.linkedin.com/company/jeveuxaider-gouv-fr',
        },
        {
          name: 'Facebook',
          icon: 'RiFacebookCircleFill',
          url: 'https://fr-fr.facebook.com/jeveuxaider.gouv.fr/',
        },
        {
          name: 'Instagram',
          icon: 'RiInstagramFill',
          url: 'https://www.instagram.com/jeveuxaider_gouv/?hl=fr',
        },
        // {
        //   name: 'Youtube',
        //   icon: 'RiYoutubeFill',
        //   url: ''
        // }
      ],
    }
  },
})
</script>
