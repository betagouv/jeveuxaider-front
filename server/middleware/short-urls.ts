export default defineEventHandler(async (event) => {
  let url

  if (event.node.req.url?.startsWith('/m/')) {
    url = event.node.req.url.replace('/m/', '/messages/')
  }

  if (url) {
    await sendRedirect(event, url)
  }
})
