import { useAuthStore } from '~/store/auth'

export function useProfileCompletion() {
  const authStore = useAuthStore()
  const profile = computed(() => authStore.profile)

  return {
    profile,
    totalPoints: computed(() => getTotalPoints(profile.value)),
    isContactInformationsCompleted: computed(() => isContactInformationsCompleted(profile.value)),
    isDisponibilitiesCompleted: computed(() => isDisponibilitiesCompleted(profile.value)),
    isPreferencesCompleted: computed(() => isPreferencesCompleted(profile.value)),
    isMotMotivationCompleted: computed(() => isMotMotivationCompleted(profile.value)),
    isProfilePictureCompleted: computed(() => isProfilePictureCompleted(profile.value)),
    isSkillsAndCertificationsCompleted: computed(() =>
      isSkillsAndCertificationsCompleted(profile.value)
    ),
  }
}

function getTotalPoints(profile?: Profile) {
  let points = 0
  if (!!profile?.first_name) points += 5
  if (!!profile?.last_name) points += 5
  if (!!profile?.birthday) points += 10
  if (!!profile?.zip) points += 10
  if (!!profile?.type) points += 5
  if (!!profile?.description) points += 5
  if (!!profile?.avatar) points += 5
  if (!!profile?.type_missions) points += 10
  if (isDisponibilitiesCompleted(profile)) points += 15
  if (isPreferencesCompleted(profile)) points += 20
  if (isSkillsAndCertificationsCompleted(profile)) points += 10
  return points
}

function isContactInformationsCompleted(profile?: Profile) {
  return (
    !!profile?.email &&
    !!profile?.mobile &&
    !!profile?.type &&
    !!profile?.birthday &&
    !!profile?.zip
  )
}

function isDisponibilitiesCompleted(profile?: Profile) {
  return !!profile?.commitment__duration && profile?.disponibilities?.length > 0
}

function isPreferencesCompleted(profile?: Profile) {
  return profile?.activities && profile?.activities.length > 0 && !!profile?.type_missions
}

function isMotMotivationCompleted(profile?: Profile) {
  return !!profile?.description
}

function isProfilePictureCompleted(profile?: Profile) {
  return !!profile?.avatar
}

function isSkillsAndCertificationsCompleted(profile?: Profile) {
  return (
    (profile?.skills && profile?.skills.length > 0) ||
    (profile?.certifications && profile?.certifications.length > 0)
  )
}
