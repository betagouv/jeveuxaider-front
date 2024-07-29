import { useAuthStore } from '~/store/auth'
import { array, string } from 'yup'

export function useProfileValidation() {
  const authStore = useAuthStore()
  // const profile = computed(() => authStore.profile)

  return {
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
  }
}
