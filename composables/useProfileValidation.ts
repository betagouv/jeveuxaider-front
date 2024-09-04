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
    schemaCommitment: string()
      .nullable()
      .test(
        'is-commitment-required',
        'Merci de choisir une fréquence parmi celles proposées',
        (commitment) => {
          return (
            (authStore.contextRole && ['admin'].includes(authStore.contextRole)) || !!commitment
          )
        }
      ),
    schemaActivities: array().nullable(),
    schemaType: string()
      .nullable()
      .test('test-profession-required', 'Une profession est requise', (type?: string | null) => {
        return (authStore.contextRole && ['admin'].includes(authStore.contextRole)) || !!type
      }),
    schemaCertifications: array().nullable(),
    schemaDescription: string().nullable(),
    schemaSkills: array().nullable(),
    schemaTypeMissions: string()
      .nullable()
      .test(
        'test-type-missions-required',
        "Merci d'indiquer vos préférences de mission",
        (type_missions?: string | null) => {
          return (
            (authStore.contextRole && ['admin'].includes(authStore.contextRole)) || !!type_missions
          )
        }
      ),
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
