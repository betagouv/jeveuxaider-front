<template>
  <FormMissionEditWrapper>
    <template #header>
      <LayoutHeaderFormMissions class="" title="Compléter votre mission" />
    </template>
    <div v-if="form">
      <h2 class="text-[28px] font-bold leading-9 mb-10">Combien de bénévoles recherchez-vous ?</h2>
      <CustomTips class="mb-10">
        Vous pourrez modifier le nombre de bénévoles recherchés en fonction des demandes de
        participation reçues et de vos besoins s’ils évoluent !
      </CustomTips>
      <div class="flex items-center justify-center gap-4">
        <button
          aria-
          class="border cursor-pointer p-3 border-jva-blue-500 rounded-full text-jva-blue-500 hover:bg-[#F5F5FE]"
          @click="form.participations_max > 1 && form.participations_max--"
        >
          <RiSubtractLine class="fill-current h-5 w-5" />
        </button>

        <input
          type="number"
          min="1"
          name="participations_max"
          v-model="form.participations_max"
          class="outline-none focus:outline-none border-b px-8 py-1 w-[220px] text-center border-none text-[80px] font-bold text-[#161616] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <button
          class="border cursor-pointer p-3 border-jva-blue-500 rounded-full text-jva-blue-500 hover:bg-[#F5F5FE]"
          @click="form.participations_max++"
        >
          <RiAddLine class="fill-current h-5 w-5" />
        </button>
      </div>
      <div class="mt-8 text-[#666666] text-center">
        {{
          $filters.pluralize(
            $stores.formMission.mission.places_left,
            'place restante',
            'places restantes'
          )
        }}
      </div>
    </div>
    <template #footer>
      <DsfrButton :loading="loading" @click="onValidateClick">{{
        $stores.formMission.isDraft ? 'Continuer' : 'Sauvegarder'
      }}</DsfrButton>
    </template>
  </FormMissionEditWrapper>
</template>

<script>
import FormMissionEditWrapper from '@/components/form/FormMissionEditWrapper'
import FormErrors from '@/mixins/form/errors'
import RiSubtractLine from 'vue-remix-icons/icons/ri-subtract-line.vue'
import RiAddLine from 'vue-remix-icons/icons/ri-add-line.vue'
import { number, object } from 'yup'

export default defineNuxtComponent({
  setup() {
    definePageMeta({
      layout: 'form-mission',
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })
  },
  mixins: [FormErrors],
  components: {
    FormMissionEditWrapper,
    RiSubtractLine,
    RiAddLine,
  },
  mounted() {
    this.form = _cloneDeep(this.$stores.formMission.mission)
  },
  data() {
    return {
      loading: false,
      form: null,
      formSchema: object({
        participations_max: number()
          .min(1, 'Le nombre de bénévole(s) recherché(s) doit être supérieur à 0')
          .required('Le nombre de bénévole(s) recherché(s) est requis'),
      }),
    }
  },
  computed: {
    // mission() {
    //   return this.$stores.formMission.mission
    // },
  },
  methods: {
    async onValidateClick() {
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await apiFetch(`/missions/${this.form.id}/benevoles`, {
            method: 'PUT',
            body: this.form,
          })
            .then(async (mission) => {
              console.log(mission)
              // this.$stores.formMission.setMission(mission)
              this.$stores.formMission.updateFields(mission, ['participations_max', 'places_left'])
              this.$toast.success('Mission modifiée avec succès')
              if (this.$stores.formMission.isDraft) {
                this.$router.push(`/admin/missions/${mission.id}/benevoles-informations`)
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
