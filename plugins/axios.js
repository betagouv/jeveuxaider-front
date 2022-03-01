import Toast from '@/components/base/Toast'

export default function ({ $axios, redirect, app, store, error, $message, $toast }) {
  $axios.interceptors.request.use(function (config) {
    const isExternalCall = config.url.includes('http')

    if (isExternalCall) {
      return config
    }
    if (!config.headers.Authorization) {
      const ACCESS_TOKEN = app.$cookies.get('access-token')
      let ACCESS_TOKEN_IMPERSONATE = app.$cookies.get(
        'access-token-impersonate'
      )
      if (ACCESS_TOKEN_IMPERSONATE && !ACCESS_TOKEN) {
        app.$cookies.remove('access-token-impersonate')
        ACCESS_TOKEN_IMPERSONATE = null
      }
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
    // console.log(err.response.data)
    // console.log(err.response.status)
    // console.log(err.response.data)

    switch (err.response.status) {
      case 401:
        app.$toast.error({
          component: Toast,
          props: {
            message: err.response.data.message || err.response.data.error
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
          message: err.response.data.message || err.message || err.response.data
        })
      case 422:
        if (err.response.data.message && !err.response.data.errors) {
          app.$toast.error({
            component: Toast,
            props: {
              message: err.response.data.message
            }
          })
        } else {
          app.$toast.error({
            component: Toast,
            props: {
              message: 'Merci de corriger les éléments suivants',
              errors: err.response.data.errors
            }
          })
        }

        break
    }
  })
}
