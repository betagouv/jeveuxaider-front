<template>
  <div class="bg-[#F5F5FE] py-4">
    <div class="container">
      <FormNewsletter />
      <div class="h-[1px] bg-[#6A6AF4] my-8" />
      <Heading as="h2" size="sm" class="mb-6">
        Suivez-nous <br> sur les réseaux sociaux
      </Heading>
      <div class="flex space-x-4 -ml-2">
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
  </div>
</template>

<script>
import Heading from '@/components/dsfr/Heading.vue'
import FormNewsletter from '@/components/section/home/FormNewsletter.vue'

export default {
  components: {
    Heading,
    FormNewsletter
  },
  data () {
    return {
      socialMedias: [
        {
          name: 'Twitter',
          icon: 'RiTwitterFill',
          url: 'https://twitter.com/ReserveCivique'
        },
        {
          name: 'Linkedin',
          icon: 'RiLinkedinBoxFill',
          url: 'https://fr.linkedin.com/company/jeveuxaider-gouv-fr'
        },
        {
          name: 'Facebook',
          icon: 'RiFacebookCircleFill',
          url: 'https://fr-fr.facebook.com/jeveuxaider.gouv.fr/'
        },
        {
          name: 'Instagram',
          icon: 'RiInstagramFill',
          url: 'https://www.instagram.com/jeveuxaider_gouv/?hl=fr'
        }
      ]
    }
  }
}
</script>
