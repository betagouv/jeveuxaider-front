export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  let url

  if (event.node.req.url?.startsWith('/m/')) {
    url = new URL(event.node.req.url.replace('/m/', '/messages/'), runtimeConfig.public.appUrl)
    url.searchParams.set('utm_source', 'sms_transac')
  }

  if (url) {
    await sendRedirect(event, url.href)
  }
})
