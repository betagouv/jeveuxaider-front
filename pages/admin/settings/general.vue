<template>
  <div class="flex flex-col gap-8">
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb
          :links="[
            { text: 'Administration', to: '/admin' },
            { text: 'Paramètres' },
            { text: 'Général' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading title="Paramétrage général" />
    <BaseBox>
      <div class="space-y-8">
        <BaseToggle
          v-model="form.blog_active"
          label="Blog"
          description="Récupèration des articles du blog sur la page d'accueil"
        />
        <BaseToggle
          v-model="form.snu_mig_active"
          label="SNU MIG"
          description="Récupèration des actions en attente côté SNU"
        />
        <BaseToggle
          v-model="form.france_connect_active"
          label="France Connect"
          description="Activer le France Connect pour la connexion et l'inscription des utilisateurs"
        />
        <BaseToggle
          v-model="form.maintenance_mode_active"
          label="Mode de maintenance"
          description="Activer le mode maintenance pour les autres utilisateurs"
        />
        <BaseToggle
          v-model="form.light_mode_active"
          label="Mode dégradé"
          description="Activer le mode dégradé lors de très fort trafic (inscriptions désactivées)"
        />
        <div class="text-right">
          <BaseButton
            type="submit"
            variant="green"
            size="xl"
            :loading="loading"
            @click.native="onSubmit"
          >
            Enregistrer
          </BaseButton>
        </div>
      </div>
    </BaseBox>
  </div>
</template>

<script>
import { object, boolean } from 'yup'
import FormErrors from '@/mixins/form/errors'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    Breadcrumb,
  },
  mixins: [FormErrors],
  async setup() {
    definePageMeta({
      layout: 'admin-with-sidebar-menu',
      middleware: ['admin'],
    })
    const settings = await apiFetch('/settings/general')
    return {
      form: settings,
    }
  },
  data() {
    return {
      loading: false,
      formSchema: object({
        maintenance_mode_active: boolean(),
        france_connect_active: boolean(),
        light_mode_active: boolean(),
      }),
    }
  },
  methods: {
    onSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await this.$stores.settings.updateGeneral(this.form)
          this.$toast.success('Modifications enregistrées')
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>

<style></style>
