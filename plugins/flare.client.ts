import { flare } from '@flareapp/js'
import { flareVue } from '@flareapp/flare-vue'

const excludeContainsMessagesErrors = [
  '403',
  '401',
  '422',
  'Failed to fetch',
  'dynamically imported module',
  'Network Error',
]

export default defineNuxtPlugin(({ $config, vueApp }) => {
  if (!$config.public.flare.projectKey) {
    return
  }

  flare.light($config.public.flare.projectKey)
  flare.beforeSubmit = (report: any) => {
    // if message contains string in excludeContainsMessagesErrors, return false
    if (excludeContainsMessagesErrors.some((message) => report.message.includes(message))) {
      return false
    }

    return {
      ...report,
      application_path: report.context.request?.url,
    }
  }

  const { $stores } = useNuxtApp()
  if ($stores.auth.user?.profile) {
    flare.addContextGroup('user', $stores.auth.user?.profile)
    flare.addContextGroup('currentRole', $stores.auth?.currentRole)
  }

  vueApp.use(flareVue)
})
