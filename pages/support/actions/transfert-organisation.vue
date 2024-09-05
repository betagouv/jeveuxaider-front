<template>
  <div>
    <BaseAlertDialog
      icon="RiErrorWarningLine"
      title="Êtes-vous sûrs ?"
      :is-open="showAlert"
      button-label="Oui, je confirme"
      @confirm="handleConfirmSubmit()"
      @cancel="showAlert = false"
    >
      Vous êtes sur le point de transférer les missions et les responsables de « {{
        form.organisationFrom.name
      }}
      #{{ form.organisationFrom.id }} » vers « {{ form.organisationTo.name }} #{{
        form.organisationTo.id
      }} ».
    </BaseAlertDialog>
    <BaseAlertDialog
      icon="RiErrorWarningLine"
      title="Choisissez une organisation"
      :is-open="showDialogOrganisations"
      button-label="Sélectionner"
      container-class="overflow-visible"
      @confirm="handleSelectedOrganisation"
      @cancel="showDialogOrganisations = false"
    >
      <DsfrFormControl
        label="Rechercher une organisation"
        html-for="autocomplete"
        :error="errors.addresses"
        required
      >
        <DsfrInputAutocomplete
          icon="RiSearchLine"
          name="autocomplete"
          placeholder="Recherche par identifiant ou par nom"
          :options="autocompleteOptionsOrganisations"
          option-key-attribute="id"
          option-label-attribute="name"
          option-label-secondary-attribute="state"
          :show-key-in-options="true"
          :reset-value-on-select="false"
          :min-value-length="3"
          @selected="handleSelectedOrganisation"
          @fetch-suggestions="onFetchSuggestionsOrganisations($event)"
        />
      </DsfrFormControl>
    </BaseAlertDialog>
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb
          :links="[
            { text: 'Support', to: '/support' },
            { text: 'Actions' },
            { text: 'Transfert d\'une organisation' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <div class="flex flex-col gap-8">
      <BaseSectionHeading
        title="Transfert d'une organisation"
        secondary-title-bottom="Permet de transférer les missions et responsables d'une organisation à une autre"
      >
        <!-- <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <DsfrButton size="lg" :loading="loading" @click.native="handleSubmit">
              Exécuter le script
            </DsfrButton>
          </div>
        </template> -->
      </BaseSectionHeading>
      <BaseBox>
        <div class="flex gap-8 justify-center">
          <div class="max-w-[300px]">
            <div
              v-if="!form.organisationFrom"
              class="group h-[400px] w-[300px] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:border-jva-blue-500"
              @click="onClickSelectOrganisation('organisationFrom')"
            >
              <RiAddLine
                class="w-12 h-12 text-gray-600 group-hover:text-jva-blue-500 fill-current"
              />
              <div class="text-gray-600 group-hover:text-jva-blue-500">Organisation d'origine</div>
            </div>
            <div v-else class="flex flex-col gap-4 items-center">
              <CardOrganisation :organisation="form.organisationFrom" show-infos show-state />
              <div class="text-sm text-center text-gray-500">
                <div>Missions: {{ form.organisationFrom.missions_count }}</div>
                <div>Responsables: {{ form.organisationFrom.members_count }}</div>
              </div>
              <DsfrButton type="tertiary" @click="form.organisationFrom = null" size="sm"
                >Retirer</DsfrButton
              >
            </div>
          </div>
          <div class="flex items-center justify-center">
            <RiArrowRightLine class="w-12 h-12 text-gray-300 fill-current" />
          </div>
          <div class="max-w-[300px]">
            <div
              v-if="!form.organisationTo"
              class="group h-[400px] w-[300px] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:border-jva-blue-500"
              @click="onClickSelectOrganisation('organisationTo')"
            >
              <RiAddLine
                class="w-12 h-12 text-gray-600 group-hover:text-jva-blue-500 fill-current"
              />
              <div class="text-gray-600 group-hover:text-jva-blue-500">
                Organisation de destination
              </div>
            </div>
            <div v-else class="flex flex-col gap-4 items-center">
              <CardOrganisation :organisation="form.organisationTo" show-infos show-state />
              <div class="text-sm text-center text-gray-500">
                <div>Missions: {{ form.organisationTo.missions_count }}</div>
                <div>Responsables: {{ form.organisationTo.members_count }}</div>
              </div>
              <DsfrButton type="tertiary" @click="form.organisationTo = null" size="sm"
                >Retirer</DsfrButton
              >
            </div>
          </div>
        </div>
      </BaseBox>
      <div class="text-right">
        <DsfrButton size="lg" :loading="loading" @click.native="handleSubmit">
          Transférer
        </DsfrButton>
      </div>
    </div>
  </div>
</template>

<script>
import { object } from 'yup'
import FormErrors from '@/mixins/form/errors'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import CardOrganisation from '@/components/card/CardOrganisation.vue'

export default defineNuxtComponent({
  components: {
    Breadcrumb,
    CardOrganisation,
  },
  mixins: [FormErrors],
  setup() {
    definePageMeta({
      layout: 'support',
      middleware: ['admin'],
    })
  },
  data() {
    return {
      loading: false,
      showAlert: false,
      showDialogOrganisations: false,
      form: {
        organisationFrom: null,
        organisationTo: null,
      },
      formSchema: object({
        organisationFrom: object()
          .nullable()
          .required("Vous devez choisir une organisation d'origine"),
        organisationTo: object()
          .nullable()
          .required('Vous devez choisir une organisation de destination'),
      }),
      autocompleteOptionsOrganisations: [],
    }
  },
  methods: {
    onClickSelectOrganisation(field) {
      this.selectedField = field
      this.showDialogOrganisations = true
    },
    handleSelectedOrganisation(payload) {
      this.form[this.selectedField] = payload
      this.showDialogOrganisations = false
    },
    async onFetchSuggestionsOrganisations(value) {
      const res = await apiFetch('/structures', {
        params: {
          append: 'places_left,completion_rate',
          include: 'missionsCount,membersCount,domaines,reseaux,illustrations,overrideImage1',
          'filter[search]': value,
          pagination: 7,
        },
      })
      this.autocompleteOptionsOrganisations = res.data
    },
    async handleSubmit() {
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          this.showAlert = true
        })
        .catch((errors) => {
          console.log('errors', errors)
          this.setErrors(errors)
        })
        .finally(() => {})
    },
    async handleConfirmSubmit() {
      this.showAlert = false
      this.loading = true
      await apiFetch('/scripts/transfert-organisation', {
        method: 'POST',
        body: this.form,
      })
        .then(() => {
          this.$toast.success('Le transfert a été effectué !')
          this.$router.push(`/admin/organisations/${this.form.organisationTo.id}`)
        })
        .catch(() => {})
      this.loading = false
    },
  },
})
</script>

<style></style>
