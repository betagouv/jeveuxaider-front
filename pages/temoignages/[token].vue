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

export default defineNuxtComponent({
  components: {
    TemoignageThanks,
    TemoignageTestimony,
    TemoignageGrade,
    TemoignageAlreadyExist,
  },
  async setup() {
    definePageMeta({
      middleware: ['authenticated'],
      layout: 'temoignage',
    })

    useHead({
      title:
        "Votre note est importante et permet de contribuer à l'amélioration des missions de bénévolat.",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "Votre note est réservée à l'administration pour améliorer la qualité des missions de bénévolat proposées.",
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/images/share-image.jpg',
        },
      ],
    })

    const route = useRoute()

    const notificationTemoignage = await apiFetch(`/notification-temoignage/${route.params.token}`)
    if (!notificationTemoignage) {
      return showError({ statusCode: 404 })
    }

    const response = await apiFetch(
      `/participations/${notificationTemoignage.participation_id}/temoignage`
    )

    return {
      notificationTemoignage,
      temoignage: response.temoignage,
    }
  },
  data() {
    return {
      form: {},
    }
  },
  computed: {
    currentStep() {
      return this.$stores.temoignage.step
    },
  },
  methods: {
    onRatingSelected(payload) {
      this.form = payload
      this.$stores.temoignage.nextStep()
    },
    onTestimonySubmit(payload) {
      this.form = payload
    },
    onDestroy(payload) {
      this.form = payload
    },
  },
})
</script>
