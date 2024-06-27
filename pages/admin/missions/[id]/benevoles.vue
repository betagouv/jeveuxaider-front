<template>
  <FormMissionWrapper>
    <template #header>
      <LayoutHeaderFormMissions class="" title="Compléter votre mission" />
    </template>
    <div v-if="form">
      <h2 class="text-[22px] lg:text-[28px] font-bold leading-9 mb-6 lg:mb-10">
        Combien de bénévoles recherchez-vous ?
      </h2>

      <CustomTips v-if="form.participations_max > 70" class="mb-10" variant="warning">
        <span class="font-bold">Ça fait beaucoup de bénévoles 😅</span><br />
        Toutes les demandes de participations devront être mises à jour (validées ou refusées). Nous
        vous conseillons de mobiliser progressivement des bénévoles, et de revoir votre besoin à la
        hausse si nécessaire.
      </CustomTips>
      <CustomTips v-else class="mb-10">
        Vous pourrez modifier le nombre de bénévoles recherchés en fonction des propositions d’aide
        reçues et de vos besoins s’ils évoluent !
      </CustomTips>

      <div
        class="relative flex flex-col space-x-4 items-center justify-center pt-4 mb-4 h-[120px] lg:h-[180px]"
      >
        <div class="flex space-x-0 pb-[40px]">
          <img
            v-for="i in illustrationsCount"
            :key="i"
            :src="`/images/illustrations/group-${i}.svg`"
            class="h-[80px] lg:h-[105px] w-auto"
          />
        </div>
        <div v-if="form.participations_max > 10" class="absolute w-full text-center bottom-[8px]">
          <div class="text-xs text-[#666666]">Et bien plus encore !</div>
        </div>
      </div>
      <div class="flex items-center justify-center gap-4">
        <button
          aria-
          class="border cursor-pointer p-2 lg:p-3 border-jva-blue-500 rounded-full text-jva-blue-500 hover:bg-[#F5F5FE]"
          @click="form.participations_max > 1 && form.participations_max--"
        >
          <RiSubtractLine class="fill-current h-4 w-4 lg:h-5 lg:w-5" />
        </button>

        <input
          type="number"
          min="1"
          name="participations_max"
          v-model="form.participations_max"
          class="outline-none focus:outline-none px-8 py-1 w-[150px] lg:w-[220px] text-center border-none text-[60px] lg:text-[80px] font-bold text-[#161616] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <button
          class="border cursor-pointer p-2 lg:p-3 border-jva-blue-500 rounded-full text-jva-blue-500 hover:bg-[#F5F5FE]"
          @click="form.participations_max++"
        >
          <RiAddLine class="fill-current h-4 w-4 lg:h-5 lg:w-5" />
        </button>
      </div>
      <div class="w-[120px] mx-auto border-b-2 border-b-[#161616]" />
      <div
        v-if="$stores.formMission.mission.state === 'Validée'"
        class="mt-8 text-[#666666] text-center"
      >
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
      <DsfrButton :loading="loading" :disabled="!isFormDirty" @click="onValidateClick">{{
        $stores.formMission.isDraft ? 'Sauvegarder et continuer' : 'Sauvegarder'
      }}</DsfrButton>
    </template>
  </FormMissionWrapper>
</template>

<script>
import FormMissionWrapper from '@/components/form/FormMissionWrapper'
import FormErrors from '@/mixins/form/errors'
import RiSubtractLine from 'vue-remix-icons/icons/ri-subtract-line.vue'
import RiAddLine from 'vue-remix-icons/icons/ri-add-line.vue'
import { number, object } from 'yup'
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
    RiSubtractLine,
    RiAddLine,
  },
  data() {
    return {
      loading: false,
      formSchema: object({
        participations_max: number()
          .min(1, 'Le nombre de bénévole(s) recherché(s) doit être supérieur à 0')
          .required('Le nombre de bénévole(s) recherché(s) est requis'),
      }),
    }
  },
  computed: {
    illustrationsCount() {
      return this.form.participations_max > 10 ? 10 : this.form.participations_max
    },
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
              if (this.$stores.formMission.isDraft) {
                this.$router.push(`/admin/missions/${mission.id}/benevoles-informations`)
              } else {
                this.$toast.success('Mission modifiée avec succès')
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
