import { useAuthStore } from '~/store/auth'
import { array, string } from 'yup'
import activitiesOptions from '@/assets/activities.json'

export function useProfileValidation() {
  const authStore = useAuthStore()
  const profile = computed(() => authStore.profile)

  return {
    initialForm: computed(() => getInitialForm(profile.value)),
    schemaDisponibilities: array()
      .transform((v) => (!v ? [] : v))
      .test(
        'test-disponibilities-required',
        'Merci de sélectionner au moins 1 disponibilité',
        (disponibilities) => {
          return (
            (authStore.contextRole && ['admin'].includes(authStore.contextRole)) ||
            (disponibilities && disponibilities.length >= 1)
          )
        }
      ),
    schemaCommitmentDuration: string().nullable().required('Merci de choisir une durée'),
    schemaCommitmentTimePeriod: string().nullable().required('Merci de choisir une fréquence'),
    schemaMissionType: string().nullable(),
    schemaActivities: array().nullable(),
  }
}

function getInitialForm(profile?: Profile) {
  if (!profile) {
    return
  }

  return {
    ..._cloneDeep(profile),
    activities:
      profile.activities
        ?.map((act) => {
          return activitiesOptions.find((opt) => act.id === opt.id)
        })
        .sort((a, b) => (a && b && a.id > b.id ? 1 : a && b && a.id < b.id ? -1 : 0)) ?? [],
  }
}
