export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()

  if (!event.node.req.url?.includes('/missions-benevolat')) {
    return
  }

  if (event.node.req.url?.includes('activities.name=')) {
    let url = new URL(event.node.req.url, runtimeConfig.public.appUrl)
    const activitiesNameParam = url.searchParams.get('activities.name')?.split('|')
    if (!activitiesNameParam?.includes('Accompagnement aux activités sportives')) {
      return
    }

    const newActivitiesNameParam = activitiesNameParam?.map((activity) => {
      return activity.replace('Accompagnement aux activités sportives', 'Activités sportives')
    })
    url.searchParams.set('activities.name', [...new Set(newActivitiesNameParam)].join('|'))

    await sendRedirect(event, url.href)
  }
})
