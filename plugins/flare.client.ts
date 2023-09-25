import { flare } from '@flareapp/flare-client'
import { flareVue } from '@flareapp/flare-vue'

export default defineNuxtPlugin(({ $config, vueApp }) => {
  if (!$config.public.flare.projectKey) {
    return
  }

  flare.light($config.public.flare.projectKey)
  flare.beforeSubmit = (report: any) => {
    return {
      ...report,
      application_path: report.context.request?.url,
    }
  }

  const { $stores } = useNuxtApp()
  if ($stores.auth.user?.profile) {
    flare.addContextGroup('user', $stores.auth.user?.profile)
    flare.addContextGroup('currentRole', $stores.auth.currentRole)
  }

  vueApp.use(flareVue)
})
