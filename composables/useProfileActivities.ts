import activitiesOptions from '@/assets/activities.json'

export function useProfileActivities() {
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

  return {
    popularActivities,
    activitiesOptions: activitiesOptions.sort((a, b) => a.name.localeCompare(b.name)),
    popularActivitiesOptions: computed(() =>
      activitiesOptions.filter((act) => popularActivities.includes(act.name))
    ),
    otherActivitiesOptions: computed(() =>
      activitiesOptions.filter((act) => !popularActivities.includes(act.name))
    ),
  }
}
