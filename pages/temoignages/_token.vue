<template>
  <div>
    <TemoignageAlreadyExist v-if="temoignage" :temoignage="temoignage" />

    <template v-else>
      <transition name="fade" mode="out-in">
        <TemoignageGrade
          v-if="currentStep.slug == 'grade'"
          :mission="notificationTemoignage.participation.mission"
          :benevole="notificationTemoignage.participation.profile"
          :initial-form="form"
          @rating-selected="onRatingSelected"
        />

        <TemoignageTestimony
          v-else-if="currentStep.slug == 'testimony'"
          :notification-temoignage="notificationTemoignage"
          :mission="notificationTemoignage.participation.mission"
          :benevole="notificationTemoignage.participation.profile"
          :initial-form="form"
          @submit="onTestimonySubmit"
          @destroy="onDestroy"
        />

        <TemoignageThanks
          v-else-if="currentStep.slug == 'thanks'"
          :mission="notificationTemoignage.participation.mission"
          :benevole="notificationTemoignage.participation.profile"
          :initial-form="form"
        />
      </transition>
    </template>
  </div>
</template>

<script>
import TemoignageAlreadyExist from '@/components/section/temoignage/TemoignageAlreadyExist.vue'
import TemoignageGrade from '@/components/section/temoignage/Grade.vue'
import TemoignageTestimony from '@/components/section/temoignage/Testimony.vue'
import TemoignageThanks from '@/components/section/temoignage/Thanks.vue'

export default {
  components: {
    TemoignageThanks,
    TemoignageTestimony,
    TemoignageGrade,
    TemoignageAlreadyExist
  },
  layout: 'temoignage',
  async asyncData ({ $api, params, error, store, $axios }) {
    const { data: notificationTemoignage } = await $axios.get(
      `/notification-temoignage/${params.token}`
    )
    if (!notificationTemoignage) {
      return error({ statusCode: 404 })
    }

    const { data: temoignage } = await $axios.get(
      `/participations/${notificationTemoignage.participation_id}/temoignage`
    )

    return {
      notificationTemoignage,
      temoignage
    }
  },
  data () {
    return {
      form: {}
    }
  },
  head () {
    return {
      title: 'Votre note est importante et permet de contribuer à l\'amélioration des missions de bénévolat.',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Votre note est réservée à l\'administration pour améliorer la qualité des missions de bénévolat proposées.'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/images/share-image.jpg'
        }
      ]
    }
  },
  computed: {
    currentStep () {
      return this.$store.getters['temoignage/step']
    }
  },
  methods: {
    onRatingSelected (payload) {
      this.form = payload
      this.$store.dispatch('temoignage/nextStep')
    },
    onTestimonySubmit (payload) {
      // console.log('onTestimonySubmit', payload)
      this.form = payload
    },
    onDestroy (payload) {
      this.form = payload
    }
  }
}
</script>
