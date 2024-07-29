<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :is-open="isOpen"
        title="Quelles activités de bénévolat vous intéressent ?"
        :prevent-click-outside="true"
        :sticky-footer="true"
        header-class="-mr-2"
        content-class="-mr-2 pt-0 pb-6 sm:pb-8"
        @close="$emit('cancel')"
      >
        <div class="">
          <p class="formatted-text text-[#666666] text-pretty max-w-[600px]">
            En ajoutant des activités favorites, nous pourrons vous suggérer des missions qui vous
            correspondent.
          </p>

          <p class="uppercase text-sm font-bold text-[#666666] mt-9 mb-5">
            Activités les plus recherchées
          </p>
          <DsfrCheckboxRichGroup
            v-model="popularActivities"
            :options="popularActivitiesOptions"
            name="activities"
            class="grid @xl:grid-cols-2 gap-2"
            option-class="text-sm rounded-[4px] py-3 px-4"
            label-class="w-full whitespace-normal"
          >
            <template #default="{ option }">
              <div class="flex items-center justify-between gap-2">
                <div class="line-clamp-2">{{ option.name }}</div>
                <div class="text-sm @xl:text-xl !leading-none">{{ option.icon }}</div>
              </div>
            </template>
          </DsfrCheckboxRichGroup>

          <p class="uppercase text-sm font-bold text-[#666666] mt-9 mb-5">
            Toutes les autres activités
          </p>
          <DsfrCheckboxRichGroup
            v-model="activities"
            :options="otherActivitiesOptions"
            name="activities"
            class="grid @xl:grid-cols-2 gap-2"
            option-class="text-sm rounded-[4px] py-3 px-4"
            label-class="w-full whitespace-normal"
          >
            <template #default="{ option }">
              <div class="flex items-center justify-between gap-2">
                <div class="line-clamp-2">{{ option.name }}</div>
                <div class="text-sm @xl:text-xl !leading-none">{{ option.icon }}</div>
              </div>
            </template>
          </DsfrCheckboxRichGroup>
        </div>

        <template #footer>
          <DsfrButton type="secondary" @click="onCancel">Annuler</DsfrButton>
          <DsfrButton @click="onConfirm">Valider</DsfrButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
import activitiesOptions from '@/assets/activities.json'

const popularActivities = [
  'Mentorat & parrainage',
  "Lutte contre l'isolement",
  'Événementiel',
  'Animation / Loisirs',
  'Secourisme et sécurité civile',
  'Soutien scolaire et formation',
  'Services à la personne',
  'Soins aux animaux',
  'Distribution',
]

export default defineNuxtComponent({
  emits: ['cancel', 'confirm'],
  props: {
    isOpen: { type: Boolean, default: false },
    initialActivities: { type: Array, default: null },
  },
  data() {
    return {
      activities: null,
      popularActivities: null,
      activitiesOptions: activitiesOptions.sort((a, b) => a.name.localeCompare(b.name)),
    }
  },
  watch: {
    initialActivities: {
      handler(newVal) {
        this.activities = newVal
          .filter((act) => !popularActivities.includes(act.name))
          .map((act) => {
            return activitiesOptions.find((opt) => act.id === opt.id)
          })
        this.popularActivities = newVal
          .filter((act) => popularActivities.includes(act.name))
          .map((act) => {
            return activitiesOptions.find((opt) => act.id === opt.id)
          })
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    popularActivitiesOptions() {
      return this.activitiesOptions.filter((act) => popularActivities.includes(act.name))
    },
    otherActivitiesOptions() {
      return this.activitiesOptions.filter((act) => !popularActivities.includes(act.name))
    },
  },
  methods: {
    onConfirm() {
      this.$emit(
        'confirm',
        [...this.popularActivities, ...this.activities].sort((a, b) =>
          a.key > b.key ? 1 : a.key < b.key ? -1 : 0
        )
      )
    },
    onCancel() {
      this.reset()
      this.$emit('cancel')
    },
    reset() {
      this.activities = this.initialActivities
        .filter((act) => !popularActivities.includes(act.name))
        .map((act) => {
          return activitiesOptions.find((opt) => act.id === opt.id)
        })
      this.popularActivities = this.initialActivities
        .filter((act) => popularActivities.includes(act.name))
        .map((act) => {
          return activitiesOptions.find((opt) => act.id === opt.id)
        })
    },
  },
})
</script>
