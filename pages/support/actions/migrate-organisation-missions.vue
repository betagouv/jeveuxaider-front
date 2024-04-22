<template>
  <div>
    <BaseAlertDialog
      v-if="form.origin && form.destination"
      icon="RiErrorWarningLine"
      title="Êtes-vous sûrs ?"
      :is-open="showAlert"
      button-label="Oui, je confirme"
      @confirm="handleConfirmSubmit()"
      @cancel="showAlert = false"
    >
      Vous êtes sur le point de transférer les missions de « {{ form.origin.name }} #{{
        form.origin.id
      }} » vers « {{ form.destination.name }} #{{ form.destination.id }} ».
    </BaseAlertDialog>
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb
          :links="[
            { text: 'Support', to: '/support' },
            { text: 'Actions' },
            { text: 'Transfert de missions' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <div class="flex flex-col gap-8">
      <BaseSectionHeading
        title="Transfert de missions"
        secondary-title-bottom="Permet de transférer des missions et leurs responsables d'une organisation à une autre"
      >
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <BaseButton variant="green" size="xl" :loading="loading" @click.native="handleSubmit">
              Exécuter le script
            </BaseButton>
          </div>
        </template>
      </BaseSectionHeading>
      <BaseBox>
        <div class="max-w-xl space-y-10">
          <BaseFormControl
            html-for="origin"
            label="Organisation d'origine"
            required
            :error="errors.origin"
          >
            <BaseInputAutocomplete
              v-if="!form.origin"
              :modelValue="$route.query['filter[structure.name]']"
              icon="RiSearchLine"
              name="autocomplete"
              placeholder="Recherche par mots clés..."
              :options="autocompleteOptionsOrga"
              clear-after-selected
              show-key-in-options
              @fetch-suggestions="onFetchSuggestionsOrga"
              @selected="handleSelected($event, 'origin')"
            />
            <div v-else class="flex">
              <BaseTagFormItem :tag="form.origin" @removed="handleRemoveOrigin">
                <div class="truncate">#{{ form.origin.id }} {{ form.origin.name }}</div>
                <div class="text-gray-500 text-xs font-normal">
                  <div>
                    {{ form.origin.state }}
                  </div>
                  <div>{{ form.origin.missions_count }} mission(s)</div>
                </div>
              </BaseTagFormItem>
            </div>
          </BaseFormControl>
          <BaseFormControl
            v-if="form.origin"
            html-for="missions"
            :label="`Missions de « ${form.origin.name} » à transférer`"
            :error="errors.missions"
          >
            <BaseFormHelperText class="pb-2">
              Laissez vide si vous voulez transférer toutes les missions.
            </BaseFormHelperText>
            <BaseInputAutocomplete
              :modelValue="$route.query['filter[search]']"
              icon="RiSearchLine"
              name="autocomplete"
              placeholder="Recherche par mots clés..."
              :options="autocompleteOptionsMissions"
              clear-after-selected
              show-key-in-options
              @fetch-suggestions="onFetchSuggestionsMissions"
              @selected="handleSelectMission"
            />
            <div v-if="form.missions.length">
              <div class="flex flex-wrap gap-2 mt-4">
                <BaseTagFormItem
                  v-for="mission in form.missions"
                  :key="mission.id"
                  :tag="mission"
                  @removed="onRemovedMission"
                >
                  <div class="truncate">#{{ mission.id }} {{ mission.name }}</div>
                  <div class="text-gray-500 text-xs font-normal">
                    <div>
                      {{ mission.state }}
                    </div>
                    <div>{{ mission.participations_count }} participation(s)</div>
                  </div>
                </BaseTagFormItem>
              </div>
            </div>
          </BaseFormControl>
          <BaseFormControl
            html-for="destination"
            label="Organisation de destination"
            required
            :error="errors.destination"
          >
            <BaseInputAutocomplete
              v-if="!form.destination"
              :modelValue="$route.query['filter[structure.name]']"
              icon="RiSearchLine"
              name="autocomplete"
              placeholder="Recherche par mots clés..."
              :options="autocompleteOptionsOrga"
              clear-after-selected
              show-key-in-options
              @fetch-suggestions="onFetchSuggestionsOrga"
              @selected="handleSelected($event, 'destination')"
            />
            <div v-else class="flex">
              <BaseTagFormItem :tag="form.destination" @removed="form.destination = null">
                <div class="truncate">#{{ form.destination.id }} {{ form.destination.name }}</div>
                <div class="text-gray-500 text-xs font-normal">
                  <div>
                    {{ form.destination.state }}
                  </div>
                  <div>{{ form.destination.missions_count }} mission(s)</div>
                </div>
              </BaseTagFormItem>
            </div>
          </BaseFormControl>
        </div>
      </BaseBox>
    </div>
  </div>
</template>

<script>
import { object } from 'yup'
import FormErrors from '@/mixins/form/errors'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    Breadcrumb,
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
      form: {
        missions: [],
      },
      formSchema: object({
        origin: object().nullable().required(),
        destination: object().nullable().required(),
      }),
      autocompleteOptionsOrga: [],
      autocompleteOptionsMissions: [],
    }
  },
  methods: {
    handleRemoveOrigin() {
      this.form.origin = null
      this.form.missions = []
    },
    handleSelected(event, field) {
      if (event) {
        this.form[field] = event
        this.validate(field)
      }
    },
    async onFetchSuggestionsOrga(value) {
      const res = await apiFetch('/structures', {
        params: {
          include: 'missionsCount',
          'filter[search]': value,
          pagination: 7,
        },
      })
      this.autocompleteOptionsOrga = res.data
    },
    async onFetchSuggestionsMissions(value) {
      const res = await apiFetch('/missions', {
        params: {
          include: 'participationsCount',
          'filter[structure.id]': this.form.origin?.id,
          'filter[search]': value,
          pagination: 7,
        },
      })
      this.autocompleteOptionsMissions = res.data
    },
    handleSelectMission(mission) {
      if (mission) {
        const index = this.form.missions.findIndex((item) => item.id == mission.id)
        if (index === -1) {
          this.form.missions = [...this.form.missions, mission]
        }
      }
    },
    onRemovedMission(mission) {
      this.form.missions = this.form.missions.filter((item) => item.id !== mission.id)
    },
    async handleSubmit() {
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          this.showAlert = true
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {})
    },
    async handleConfirmSubmit() {
      this.showAlert = false
      this.loading = true
      await apiFetch('/scripts/migrate-organisation-missions', {
        method: 'POST',
        body: this.form,
      })
        .then(() => {
          this.$toast.success('Le transfert a été effectué !')
          this.$router.push(`/admin/organisations/${this.form.destination.id}`)
        })
        .catch(() => {})
      this.loading = false
    },
  },
})
</script>

<style></style>
