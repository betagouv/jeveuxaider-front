<template>
  <div class="flex flex-col gap-8">
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb
          :links="[
            { text: 'Administration', to: '/admin' },
            { text: 'Paramètres' },
            { text: 'Messages' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading title="Messages" />

    <BaseBox>
      <div class="space-y-8">
        <BaseFormControl
          label="Auteur des petits mots"
          html-for="title"
          required
          :error="errors.title"
        >
          <BaseInput v-model="form.title" name="title" placeholder="Le petit mot de Margot" />
        </BaseFormControl>
        <BaseFormControl
          label="Le petit mot pour les bénévoles"
          html-for="benevole"
          required
          :error="errors.benevole"
        >
          <BaseRichEditor
            v-model="form.benevole"
            :toolbar="['bold', 'link']"
            name="benevole"
            placeholder="Message que vous souhaitez afficher..."
          />
        </BaseFormControl>
        <BaseFormControl
          label="Le petit mot pour les responsables d'organisations"
          html-for="responsable_organisation"
          required
          :error="errors.responsable_organisation"
        >
          <BaseRichEditor
            v-model="form.responsable_organisation"
            :toolbar="['bold', 'link']"
            name="responsable_organisation"
            placeholder="Message que vous souhaitez afficher..."
          />
        </BaseFormControl>
        <BaseFormControl
          label="Le petit mot pour les responsables de réseaux"
          html-for="responsable_reseau"
          required
          :error="errors.responsable_reseau"
        >
          <BaseRichEditor
            v-model="form.responsable_reseau"
            :toolbar="['bold', 'link']"
            name="responsable_reseau"
            placeholder="Message que vous souhaitez afficher..."
          />
        </BaseFormControl>
        <BaseFormControl
          label="Le petit mot pour les responsables de collectivités territoriales"
          html-for="responsable_territoire"
          required
          :error="errors.responsable_territoire"
        >
          <BaseRichEditor
            v-model="form.responsable_territoire"
            :toolbar="['bold', 'link']"
            name="responsable_territoire"
            placeholder="Message que vous souhaitez afficher..."
          />
        </BaseFormControl>
        <BaseFormControl
          label="Le petit mot pour les référents departementaux"
          html-for="referent_departemental"
          required
          :error="errors.referent_departemental"
        >
          <BaseRichEditor
            v-model="form.referent_departemental"
            :toolbar="['bold', 'link']"
            name="referent_departemental"
            placeholder="Message que vous souhaitez afficher..."
          />
        </BaseFormControl>
        <BaseFormControl
          label="Le petit mot pour les référents régionaux"
          html-for="referent_regional"
          required
          :error="errors.referent_regional"
        >
          <BaseRichEditor
            v-model="form.referent_regional"
            :toolbar="['bold', 'link']"
            name="referent_regional"
            placeholder="Message que vous souhaitez afficher..."
          />
        </BaseFormControl>
        <BaseFormControl
          label="Le petit mot pour les modérateurs"
          html-for="admin"
          required
          :error="errors.admin"
        >
          <BaseRichEditor
            v-model="form.admin"
            :toolbar="['bold', 'link']"
            name="admin"
            placeholder="Message que vous souhaitez afficher..."
          />
        </BaseFormControl>
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
import { string, object } from 'yup'
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

    const settings = await apiFetch('/settings/messages')
    return {
      form: settings,
    }
  },
  data() {
    return {
      loading: false,
      formSchema: object({
        title: string().required(),
        benevole: string().required(),
        responsable_organisation: string().required(),
        responsable_reseau: string().required(),
        responsable_territoire: string().required(),
        referent_departemental: string().required(),
        referent_regional: string().required(),
        admin: string().required(),
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
          await apiFetch('/settings/messages', {
            method: 'POST',
            body: this.form,
          })
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
