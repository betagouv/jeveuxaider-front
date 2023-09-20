<template>
  <div class="relative">
    <ClientOnly>
      <Teleport to="#teleport-sidebar">
        <div class="text-center lg:text-left text-xl lg:text-2xl font-bold mb-6 lg:mb-12">
          Ça ne devrait pas prendre plus de 3 minutes 😉
        </div>
        <BaseSteps :steps="steps" />
      </Teleport>
    </ClientOnly>

    <div class="mb-6 lg:mb-12 text-center text-white">
      <h1 class="text-4xl lg:text-5xl font-medium leading-12 mb-4">
        <span class="font-bold">{{ form.name }}</span> en images !
      </h1>
    </div>
    <div class="max-w-xl mx-auto">
      <div class="px-8 py-6 bg-white text-black text-3xl font-extrabold leading-9 text-center">
        Faites briller votre organisation
      </div>
      <div class="p-8 bg-gray-50 border-t border-gray-200">
        <form id="inscription" class="gap-8 grid grid-cols-1" @submit.prevent="onSubmit">
          <BaseFormControl label="Logo" html-for="logo">
            <BaseImageCrop
              :default-value="form.logo"
              :ratio="null"
              :min-height="112"
              :preview-width="235"
              :preview-height="56"
              preview-fit="contain"
              preview-classes="p-2"
              @add="addFiles({ files: [$event], collection: 'structure__logo' })"
              @delete="deleteFile($event)"
              @crop="onManipulationsChange($event)"
            />
          </BaseFormControl>

          <BaseFormControl label="Visuels d'illustration" html-for="illustrations">
            <component
              :is="form.reseaux.length ? 'MediaPickerReseau' : 'MediaPickerDomaine'"
              :reseaux="form.reseaux"
              :domaine-ids="mediaPickerDomaineIds"
              :defaults="form.illustrations"
              :limit="2"
              collection="domaine__illustrations_organisation"
              preview-conversion="large"
              preview-sizes="100w, (min-width: 640px) 248px"
              class="grid sm:grid-cols-2 gap-4"
              @change="onMediaPickerChange($event, 'illustrations')"
            />
          </BaseFormControl>

          <DsfrButton size="lg" class="w-full" :loading="loading" @click.native.prevent="onSubmit">
            Terminer
          </DsfrButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import FormUploads from '@/mixins/form/uploads'

export default defineNuxtComponent({
  mixins: [FormUploads],
  async setup() {
    definePageMeta({
      layout: 'register-steps',
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })

    const { $stores } = useNuxtApp()

    if (!$stores.auth.currentRole || $stores.auth.currentRole.contextable_type !== 'structure') {
      return showError({ statusCode: 403 })
    }

    const organisation = await apiFetch(`/structures/${$stores.auth.currentRole.contextable_id}`)

    return {
      form: toRef(organisation),
    }
  },
  data() {
    return {
      loading: false,
      steps: [
        {
          name: 'Rejoignez le mouvement',
          status: 'complete',
          href: '/inscription/responsable/step/profile',
        },
        {
          name: 'Votre profil',
          status: 'complete',
          href: '/inscription/responsable/step/profile',
        },
        {
          name: "Informations sur l'organisation",
          status: 'complete',
          href: '/inscription/responsable/step/organisation',
        },
        {
          name: "Quelques mots sur l'organisation",
          status: 'complete',
          href: '/inscription/responsable/step/organisation-details',
        },
        {
          name: 'Votre organisation en images',
          status: 'current',
        },
      ],
    }
  },
  computed: {
    mediaPickerDomaineIds() {
      return this.form.domaines?.map((domaine) => domaine.id)
    },
  },
  methods: {
    async onSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      await apiFetch(`/structures/${this.form.id}`, {
        method: 'PUT',
        body: this.form,
      })
      await this.uploadFiles('structure', this.form.id)
      this.$plausible.trackEvent('Inscription responsable - Étape 5 - Votre organisation en images')
      if (this.form.territoire) {
        this.$router.push('/inscription/responsable/step/collectivite-confirmation')
      } else {
        this.$router.push('/inscription/responsable/step/organisation-confirmation')
      }
      this.loading = false
    },
    onMediaPickerChange(payload, field) {
      this.form[field].splice(payload.index, 1, payload.media)
    },
  },
})
</script>
