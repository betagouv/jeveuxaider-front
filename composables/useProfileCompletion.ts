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
    isSkillsOrCertificationsCompleted: computed(() =>
      isSkillsOrCertificationsCompleted(profile.value)
    ),
    isActivitiesCompleted: computed(() => isActivitiesCompleted(profile.value)),
    isMissionTypeCompleted: computed(() => isMissionTypeCompleted(profile.value)),
    isSkillCompleted: computed(() => isSkillCompleted(profile.value)),
    isCertificationCompleted: computed(() => isCertificationCompleted(profile.value)),
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
  // @todo: scinder les points dans les champs qui composent l'étape
  if (isDisponibilitiesCompleted(profile)) points += 15
  if (isActivitiesCompleted(profile)) points += 20
  if (isMissionTypeCompleted(profile)) points += 10
  if (isSkillsOrCertificationsCompleted(profile)) points += 10
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
  return !!profile?.commitment && profile?.disponibilities?.length > 0
}

function isPreferencesCompleted(profile?: Profile) {
  return isActivitiesCompleted(profile) && isMissionTypeCompleted(profile)
}

function isMotMotivationCompleted(profile?: Profile) {
  return !!profile?.description
}

function isProfilePictureCompleted(profile?: Profile) {
  return !!profile?.avatar
}

function isSkillsOrCertificationsCompleted(profile?: Profile) {
  return isSkillCompleted(profile) || isCertificationCompleted(profile)
}

function isActivitiesCompleted(profile?: Profile) {
  return profile?.activities && profile?.activities.length > 0
}

function isMissionTypeCompleted(profile?: Profile) {
  return !!profile?.type_missions
}

function isSkillCompleted(profile?: Profile) {
  return profile?.skills && profile.skills.length > 0
}

function isCertificationCompleted(profile?: Profile) {
  return profile?.certifications ? profile.certifications.length > 0 : false
}
