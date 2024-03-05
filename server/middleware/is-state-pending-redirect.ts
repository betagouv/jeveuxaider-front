export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()

  if (!event.node.req.url?.includes('admin/participations')) {
    return
  }

  if (event.node.req.url?.includes('filter[is_state_pending]=')) {
    let url = new URL(event.node.req.url, runtimeConfig.public.appUrl)
    if (url.searchParams.get('filter[is_state_pending]') === 'true') {
      url.searchParams.set('filter[state]', 'En cours de traitement,En attente de validation')
    }

    url.searchParams.delete('filter[is_state_pending]')
    await sendRedirect(event, url.href)
  }
})
