import Toast from '@/components/base/Toast'

export default function ({ $axios, redirect, app, store, error, $message, $toast }) {
  $axios.interceptors.request.use(function (config) {
    const isExternalCall = config.url.includes('http')
    if (isExternalCall) {
      return config
    }
    if (!config.headers.Authorization) {
      const ACCESS_TOKEN = app.$cookies.get('access-token')
      const ACCESS_TOKEN_IMPERSONATE = app.$cookies.get(
        'access_token_impersonate'
      )
      if (ACCESS_TOKEN_IMPERSONATE) {
        config.headers.Authorization = `Bearer ${ACCESS_TOKEN_IMPERSONATE}`
      } else if (ACCESS_TOKEN) {
        config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`
      }
    }

    if (store.getters.contextRole) {
      config.headers['Context-Role'] = store.getters.contextRole
    }

    return config
  })

  $axios.onError((err) => {
    // console.log(err)
    // console.log(err.response.status)
    // console.log(err.response.data)

    switch (err.response.status) {
      case 401:
        app.$toast.error({
          component: Toast,
          props: {
            message: err.response.data.error || err.response.data.message
          }
        })
        break
      case 403:
        return error({
          statusCode: 403,
          message: err.message || err.response.data
        })
      case 404:
        return error({
          statusCode: 404,
          message: err.message || err.response.data
        })
      case 422:
        app.$toast.error({
          component: Toast,
          props: {
            message: 'Merci de corriger les éléments suivants',
            errors: err.response.data.errors
          }
        })
        break
    }
  })
}
