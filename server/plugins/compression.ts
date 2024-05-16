import { useCompression } from 'h3-compression'

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:response', async (response, { event }) => {
    if (
      response.headers?.['content-type'].startsWith('text/html') &&
      !event?.context?.matchedRoute?.path.startsWith('/__nuxt')
    ) {
      await useCompression(event, response)
    }
  })
})
