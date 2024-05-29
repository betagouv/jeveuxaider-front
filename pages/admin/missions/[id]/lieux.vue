<template>
  <FormMissionWrapper>
    <template #header>
      <LayoutHeaderFormMissions class="" title="Compléter votre mission" />
    </template>
    <div v-if="form">
      <h2 class="text-[28px] font-bold leading-9 mb-10">Où se situe la mission ?</h2>
      <CustomTips class="mb-10">
        <p class="mb-2">
          <strong>Les missions en présentiel</strong> nécessitent une présence sur place, dans un
          lieu ou un territoire. Elles seront visibles par les bénévoles les plus proches.
        </p>
        <p>
          <strong>Les missions à distance</strong> peuvent s’effectuer de n’importe où et seront
          visibles par les bénévoles de toute la France.
        </p>
      </CustomTips>

      <div class="space-y-10">
        <DsfrFormControl
          label="La mission est à réaliser "
          html-for="type"
          :error="errors.type"
          required
        >
          <div class="grid grid-cols-2 gap-4">
            <CustomOptionCard
              @click="onPresentielClick"
              :is-selected="form.type === 'Mission en présentiel'"
              title="En présentiel"
              description="Vous pourrez préciser le ou les lieux ensuite : villes, départements, etc."
            />
            <CustomOptionCard
              @click="onDistanceClick"
              :is-selected="form.type === 'Mission à distance'"
              title="À distance"
              description="Le bénévole peut réaliser la mission depuis chez lui ou n’importe où, à distance"
            />
          </div>
        </DsfrFormControl>

        <DsfrFormControl
          v-if="form.type === 'Mission en présentiel'"
          html-for="is_autonomy"
          info="En cochant cette case, vous pourrez indiquer plusieurs adresses ou villes"
        >
          <BaseToggle
            v-model="form.is_autonomy"
            label="La mission peut s’effectuer depuis plusieurs lieux (dans le même département)"
          />
        </DsfrFormControl>

        <DsfrFormControl
          v-if="form.type === 'Mission en présentiel'"
          label="Département"
          html-for="department"
          required
          :error="errors.department"
        >
          <DsfrSelect
            id="department"
            name="department"
            v-model="form.department"
            placeholder="Sélectionnez un département"
            :options="
              $labels.departments.map((option) => {
                return {
                  key: option.key,
                  label: `${option.key} - ${option.label}`,
                }
              })
            "
          />
        </DsfrFormControl>

        <template v-if="!form.is_autonomy && form.type === 'Mission en présentiel'">
          <DsfrFormControl
            label="Lieu de la mission"
            html-for="address"
            info="Si l'adresse n'est pas reconnue veuillez saisir le nom de la
              ville."
            required
            :error="errors.address"
          >
            <DsfrInputAutocomplete
              icon="RiMapPinLine"
              name="address"
              placeholder="Renseignez une adresse"
              :options="autocompleteOptions"
              attribute-key="id"
              attribute-label="label"
              attribute-right-label="typeLabel"
              :min-value-length="3"
              @selected="handleSelectedAddress"
              @fetch-suggestions="onFetchGeoSuggestions($event)"
            />
          </DsfrFormControl>
          <div v-if="form.zip" class="mt-6 grid grid-cols-1 gap-4">
            <div class="flex justify-between items-center">
              <div class="font-medium">{{ form.full_address }}</div>
              <DsfrButton
                icon-only
                size="xs"
                type="tertiary"
                icon="RiDeleteBinLine"
                icon-class="text-[#CE0500]"
                @click="onRemovedAddressItem"
              />
            </div>
          </div>
        </template>
        <template v-if="form.is_autonomy && form.type === 'Mission en présentiel'">
          <DsfrFormControl
            label="Codes postaux de la zone d'intervention (jusqu'à 25)"
            html-for="autonomy_zips"
            :error="errors.autonomy_zips"
            required
          >
            <DsfrInputAutocomplete
              icon="RiMapPinLine"
              name="autocomplete"
              placeholder="Recherche par ville ou code postal"
              :options="autocompleteOptions"
              attribute-key="id"
              attribute-label="label"
              attribute-right-label="typeLabel"
              :reset-value-on-select="true"
              :min-value-length="3"
              @selected="handleSelectedAutonomyZip"
              @fetch-suggestions="
                onFetchGeoSuggestions($event, {
                  inputGeoType: 'municipality',
                })
              "
            />
          </DsfrFormControl>
          <div
            v-if="form.autonomy_zips && form.autonomy_zips.length"
            class="mt-6 grid grid-cols-1 gap-4"
          >
            <div
              class="flex justify-between items-center"
              v-for="item in form.autonomy_zips"
              :key="item.zip"
            >
              <div class="font-medium">{{ item.city }}, {{ item.zip }}</div>
              <DsfrButton
                icon-only
                size="xs"
                type="tertiary"
                icon="RiDeleteBinLine"
                icon-class="text-[#CE0500]"
                @click="onRemovedZipItem(item)"
              />
            </div>
          </div>

          <DsfrFormControl
            label="Précisions sur la zone d'intervention (villes, lieux, etc.)"
            html-for="autonomy_precisions"
            :error="errors.autonomy_precisions"
          >
            <DsfrTextarea
              v-model="form.autonomy_precisions"
              name="autonomy_precisions"
              placeholder="Précisez en quelques mots les zones d'intervention du bénévole en autonomie"
              @keydown.enter.native.prevent
            />
          </DsfrFormControl>
        </template>
      </div>
    </div>
    <template #footer>
      <DsfrButton :loading="loading" @click="onValidateClick">{{
        $stores.formMission.isDraft ? 'Continuer' : 'Sauvegarder'
      }}</DsfrButton>
    </template>
  </FormMissionWrapper>
</template>

<script>
import FormMissionWrapper from '@/components/form/FormMissionWrapper'
import FormErrors from '@/mixins/form/errors'
import { string, object, array } from 'yup'
import MixinInputGeo from '@/mixins/input-geo'

export default defineNuxtComponent({
  setup() {
    definePageMeta({
      layout: 'form-mission',
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })
  },
  mixins: [FormErrors, MixinInputGeo],
  components: {
    FormMissionWrapper,
  },
  mounted() {
    this.form = _cloneDeep(this.$stores.formMission.mission)
  },
  data() {
    return {
      loading: false,
      form: null,
      formSchema: object({
        type: string().required('Le type de mission est requis'),
        department: string()
          .nullable()
          .when(['type'], {
            is: (type) => type == 'Mission en présentiel',
            then: (schema) => schema.required('Le département est requis'),
          }),
        zip: string()
          .nullable()
          .when(['type', 'is_autonomy'], {
            is: (type, is_autonomy) => type == 'Mission en présentiel' && !is_autonomy,
            then: (schema) => schema.required('Une adresse est requise'),
          }),
        autonomy_zips: array()
          .nullable()
          .when(['type', 'is_autonomy'], {
            is: (type, is_autonomy) => is_autonomy && type === 'Mission en présentiel',
            then: (schema) =>
              schema
                .min(1, 'Au moins une adresse est requise')
                .required('Au moins une adresse est requise'),
          }),
        // zip: string()
        //   .when(['type', 'is_autonomy'], {
        //     // eslint-disable-next-line camelcase
        //     is: (type, is_autonomy) =>
        //       type == 'Mission en présentiel' &&
        //       !is_autonomy &&
        //       this.form.zip &&
        //       this.form.department,
        //     then: (schema) =>
        //       schema.test(
        //         'test-zip',
        //         'Le code postal et le département ne correspondent pas',
        //         () => {
        //           const department = ['2A', '2B'].includes(this.form.department)
        //             ? '20'
        //             : this.form.department
        //           return this.form.zip && this.form.zip.startsWith(department)
        //         }
        //       ),
        //   })
        //   .when(['type', 'is_autonomy'], {
        //     // eslint-disable-next-line camelcase
        //     is: (type, is_autonomy) => type == 'Mission en présentiel' && !is_autonomy,
        //     then: (schema) => schema.nullable().required('Le code postal est requis'),
        //     otherwise: (schema) => schema.nullable(),
        //   }),
        // city: string()
        //   .nullable()
        //   .when(['type', 'is_autonomy'], {
        //     // eslint-disable-next-line camelcase
        //     is: (type, is_autonomy) => type == 'Mission en présentiel' && !is_autonomy,
        //     then: (schema) => schema.required('La ville est requise'),
        //     otherwise: (schema) => schema.nullable(),
        //   }),
        // autonomy_zips: array()
        //   .when(['type', 'is_autonomy'], {
        //     // eslint-disable-next-line camelcase
        //     is: (type, is_autonomy) => !is_autonomy || type !== 'Mission en présentiel',
        //     then: (schema) => schema.nullable(),
        //   })
        //   .when(['type', 'is_autonomy'], {
        //     // eslint-disable-next-line camelcase
        //     is: (type, is_autonomy) => type == 'Mission en présentiel' && is_autonomy,
        //     then: (schema) =>
        //       schema.min(1, 'Au moins un code postal requis').max(25, '25 codes postaux maximum'),
        //   })
        //   .when(['type', 'is_autonomy', 'department'], {
        //     // eslint-disable-next-line camelcase
        //     is: (type, is_autonomy, department) =>
        //       type == 'Mission en présentiel' && is_autonomy && department,
        //     then: (schema) =>
        //       schema.test(
        //         'test-zips',
        //         'Les codes postaux et le département ne correspondent pas',
        //         // eslint-disable-next-line camelcase
        //         (autonomy_zips) => {
        //           const zips = autonomy_zips.map((i) => i.zip)
        //           const department = ['2A', '2B'].includes(this.form.department)
        //             ? '20'
        //             : this.form.department
        //           return zips.every((zip) => zip.startsWith(department))
        //         }
        //       ),
        //     otherwise: (schema) => schema.nullable(),
        //   }),
      }),
    }
  },
  computed: {
    // mission() {
    //   return this.$stores.formMission.mission
    // },
  },
  methods: {
    onPresentielClick() {
      this.form.type = 'Mission en présentiel'
    },
    onDistanceClick() {
      this.form.type = 'Mission à distance'
      this.form.is_autonomy = false
    },
    onRemovedAddressItem() {
      this.clearAddress()
    },
    onRemovedZipItem(value) {
      console.log('onRemovedZipItem', value)
      this.form.autonomy_zips = this.form.autonomy_zips.filter((item) => item.zip !== value.zip)
    },
    handleSelectedAddress(selectedItem) {
      this.handleSelectedGeo(selectedItem)
      this.form.full_address = selectedItem?.label
    },
    handleSelectedAutonomyZip(selectedItem) {
      if (!this.form.autonomy_zips) {
        this.form.autonomy_zips = []
      }
      if (!selectedItem) {
        return
      }

      const zipsObject = selectedItem.id.includes('all_zips')
        ? selectedItem.postcodes.map((p) => {
            return { ...p, coordinates: [p.longitude, p.latitude], postcode: p.zip, city: p.label }
          })
        : [selectedItem]

      zipsObject.forEach((zipObject) => {
        zipObject.postcode.split(',').forEach((postcode) => {
          if (!this.form.autonomy_zips.map((a) => a.zip).includes(postcode)) {
            const newObject = {
              zip: postcode,
              latitude: zipObject.coordinates?.[1],
              longitude: zipObject.coordinates?.[0],
              city: zipObject.city,
            }
            if (zipObject.arrondissement) {
              newObject.arrondissement = zipObject.arrondissement
            }
            this.form.autonomy_zips.push(newObject)
          }
        })
      })

      this.validate('autonomy_zips')
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
              console.log(mission)
              this.$stores.formMission.updateFields(mission, [
                'type',
                'is_autonomy',
                'department',
                'autonomy_zips',
                'autonomy_precisions',
                'address',
                'zip',
                'city',
                'full_address',
                'latitude',
                'longitude',
              ])
              this.$toast.success('Mission modifié avec succès')
              if (this.$stores.formMission.isDraft) {
                this.$router.push(`/admin/missions/${mission.id}/benevoles`)
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
