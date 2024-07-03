<template>
  <FormMissionWrapper>
    <template #header>
      <LayoutHeaderFormMissions class="" title="Compléter votre mission" />
    </template>
    <div v-if="form">
      <h2 class="text-[22px] lg:text-[28px] font-bold leading-9 mb-6 lg:mb-10">
        Où se situe la mission ?
      </h2>
      <CustomTips class="mb-6 lg:mb-10">
        <p class="mb-2">
          <strong>Les missions en présentiel</strong> nécessitent une présence sur place. Elles
          seront visibles par les bénévoles les plus proches.
        </p>
        <p>
          <strong>Les missions à distance</strong> ne demandent pas au bénévole de se déplacer. Il
          peut réaliser la mission d’où il le souhaite. Ces missions sont visibles par les bénévoles
          de toute la France.
        </p>
      </CustomTips>

      <div class="space-y-10">
        <DsfrFormControl
          label="La mission est à réaliser"
          html-for="type"
          :error="errors.type"
          required
        >
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <CustomOptionCard
              @click="onPresentielClick"
              :is-selected="form.type === 'Mission en présentiel'"
              :is-recommended="
                $stores.formMission.mission?.template?.recommendation_type === 'onsite'
              "
              title="En présentiel"
              description="Vous pourrez préciser le ou les lieux ensuite : villes, départements, etc."
            />
            <CustomOptionCard
              @click="onDistanceClick"
              :is-selected="form.type === 'Mission à distance'"
              :is-recommended="
                $stores.formMission.mission?.template?.recommendation_type === 'remote'
              "
              title="À distance"
              description="Le bénévole peut réaliser la mission depuis chez lui ou n’importe où, à distance"
            />
          </div>
        </DsfrFormControl>

        <template v-if="form.type === 'Mission en présentiel'">
          <DsfrFormControl
            label="Ville ou adresse exacte"
            html-for="addresses"
            info="Vous pouvez ajouter plusieurs villes ou adresses au sein du même département"
            :error="errors.addresses"
            required
          >
            <DsfrInputAutocomplete
              icon="RiMapPinLine"
              name="addresses"
              placeholder="Exemple : 4 rue de Rivoli, 75001 Paris"
              :options="autocompleteOptions"
              attribute-key="id"
              attribute-label="label"
              attribute-right-label="context"
              :reset-value-on-select="true"
              :min-value-length="3"
              @selected="handleSelectedAddress"
              @fetch-suggestions="onFetchGeoSuggestions($event)"
            />
          </DsfrFormControl>
          <div
            v-if="form.addresses && form.addresses.length"
            class="mt-6 grid grid-cols-1 divide-y"
          >
            <div
              class="flex justify-between items-center py-4"
              v-for="item in form.addresses"
              :key="item.id"
            >
              <div>
                <div class="first-letter:uppercase">{{ item.label }}</div>
                <div class="text-sm text-gray-500 font-medium">
                  {{ item.department }}, {{ $filters.label(item.department, 'departments') }},
                  {{ $filters.label(item.department, 'departments_regions') }}
                </div>
              </div>
              <DsfrButton
                icon-only
                size="xs"
                type="tertiary"
                icon="RiDeleteBinLine"
                icon-class="text-[#CE0500]"
                @click="onRemovedAddressItem(item)"
              />
            </div>
          </div>

          <DsfrFormControl
            label="Précisions sur la zone d'intervention (villes, lieux, etc.)"
            html-for="addresses_precisions"
            :error="errors.addresses_precisions"
          >
            <DsfrTextarea
              v-model="form.addresses_precisions"
              name="addresses_precisions"
              placeholder="Précisez en quelques mots les zones d'intervention du bénévole"
              @keydown.enter.native.prevent
            />
          </DsfrFormControl>
        </template>
      </div>
    </div>
    <template #footer>
      <DsfrButton :loading="loading" :disabled="!isFormDirty" @click="onValidateClick">{{
        $stores.formMission.isDraft ? 'Enregistrer et continuer' : 'Enregistrer'
      }}</DsfrButton>
    </template>
  </FormMissionWrapper>
</template>

<script>
import FormMissionWrapper from '@/components/form/FormMissionWrapper'
import FormErrors from '@/mixins/form/errors'
import { string, object, array } from 'yup'
import FormMission from '@/mixins/form/mission'

export default defineNuxtComponent({
  setup() {
    definePageMeta({
      layout: 'form-mission',
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })
  },
  mixins: [FormErrors, FormMission],
  components: {
    FormMissionWrapper,
  },
  data() {
    return {
      loading: false,
      autocompleteOptions: [],
      formSchema: object({
        type: string().required('Le type de mission est requis'),
        addresses: array()
          .nullable()
          .when(['type'], {
            is: (type) => type === 'Mission en présentiel',
            then: (schema) =>
              schema
                .min(1, 'Veuillez ajouter au moins une adresse')
                .required('Veuillez ajouter au moins une adresse'),
          }),
      }),
    }
  },
  computed: {},
  methods: {
    onPresentielClick() {
      this.form.type = 'Mission en présentiel'
    },
    onDistanceClick() {
      this.form.type = 'Mission à distance'
      // this.form.is_autonomy = false
    },
    onRemovedAddressItem(address) {
      this.form.addresses = this.form.addresses.filter((item) => item.id !== address.id)
    },
    handleSelectedAddress(selectedItem) {
      console.log(selectedItem)
      // this.form.addresses = [
      //   ...this.form.addresses,
      //   {
      //     id: selectedItem.id,
      //     label:
      //       selectedItem.type === 'municipality'
      //         ? `${selectedItem.postcode} ${selectedItem.city}`
      //         : selectedItem.label,
      //     street: selectedItem.street,
      //     zip: selectedItem.postcode,
      //     city: selectedItem.city,
      //     longitude: selectedItem.coordinates[0],
      //     latitude: selectedItem.coordinates[1],
      //     department: selectedItem.context?.split(', ')[0],
      //   },
      // ]

      if (!selectedItem) {
        return
      }

      this.form.addresses.push({
        id: selectedItem.id,
        label:
          selectedItem.type === 'municipality'
            ? `${selectedItem.postcode} ${selectedItem.city}`
            : selectedItem.label,
        street: selectedItem.street,
        zip: selectedItem.postcode,
        city: selectedItem.city,
        longitude: selectedItem.coordinates[0],
        latitude: selectedItem.coordinates[1],
        department: selectedItem.context?.split(', ')[0],
      })
      this.validate('addresses')
    },
    async onFetchGeoSuggestions(payload, config = {}) {
      this.autocompleteOptions = await useGeolocationFetch(payload, {
        context: 'input',
        ...config,
      })
    },
    async onValidateClick() {
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await apiFetch(`/missions/${this.form.id}/lieux`, {
            method: 'PUT',
            body: this.form,
          })
            .then(async (mission) => {
              this.$stores.formMission.updateFields(mission, [
                'type',
                'addresses',
                'department',
                'addresses_precisions',
              ])
              if (this.$stores.formMission.isDraft) {
                this.$router.push(`/admin/missions/${mission.id}/benevoles`)
              } else {
                this.$toast.success('Mission modifié avec succès')
              }
            })
            .catch(() => {})
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
