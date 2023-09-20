import { useAuthStore } from '~/store/auth'
import { useToast } from 'vue-toastification'
import ComponentToast from '@/components/Toast.vue'

export const useApiFetch: typeof useFetch = (url, opts?) => {
  return useFetch(url, useApiFetchOptions(url, opts))
}

export function apiFetch(url: string, opts?: any) {
  return $fetch(url, useApiFetchOptions(url, opts))
}

export function useApiFetchOptions(url: any, opts: any) {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()
  const accessToken = useCookie('access-token')?.value
  const accessTokenImpersonate = accessToken && useCookie('access-token-impersonate')?.value
  const headers: HeadersInit = {}

  headers.Authorization = `Bearer ${accessTokenImpersonate ?? accessToken}`
  if (accessTokenImpersonate) {
    headers.Impersonating = 'true'
  }
  if (authStore.contextRole) {
    headers['Context-Role'] = authStore.contextRole
  }

  return {
    key: url,
    baseURL: config.public.apiBaseUrl,
    onRequest({ options }: { options: any }) {
      options.headers = {
        ...options.headers,
        ...headers,
      }
      options.query = options.query || {}
      options.baseURL = `${config.public.apiUrl}/api`
    },
    ...opts,
    onResponseError({ response }: { response: any }) {
      if ([403, 404].includes(response.status)) {
        showError({
          statusCode: response.status,
          statusMessage: response.statusText,
        })
        return
      }

      const toast = useToast()

      switch (response.status) {
        case 401:
          if (response._data.message) {
            toast.error(response._data.message)
          }
          break
        case 422:
          if (response._data.message || response._data.errors) {
            toast.error({
              component: ComponentToast,
              props: {
                message: response._data.errors
                  ? 'Merci de corriger les éléments suivants'
                  : response._data.message,
                errors: response._data.errors,
              },
            })
          }
          break
      }
    },
  }
}
