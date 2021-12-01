// import { Message } from 'element-ui'

export default function ({ $axios, redirect, app, store, error, $message }) {
  $axios.interceptors.request.use(function (config) {
    const ACCESS_TOKEN = app.$cookies.get('access_token')
    const ACCESS_TOKEN_IMPERSONATE = app.$cookies.get(
      'access_token_impersonate'
    )
    if (!config.headers.Authorization) {
      if (ACCESS_TOKEN_IMPERSONATE) {
        config.headers.Authorization = `Bearer ${ACCESS_TOKEN_IMPERSONATE}`
      } else if (ACCESS_TOKEN) {
        config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`
      }
    }

    // if (store.getters.contextRole && !config.excludeContextRole) {
    //   config.headers['Context-Role'] = store.getters.contextRole
    // }

    return config
  })

  //   $axios.onError((err) => {
  //     console.log(err)
  //     console.log(err.response.status)
  //     console.log(err.response.data)

  //     if (err.response.status === 404) {
  //       return error({
  //         statusCode: 404,
  //         message: err.message || err.response.data
  //       })
  //     }
  //     if (err.response.status === 403) {
  //       return error({
  //         statusCode: 403,
  //         message: err.message || err.response.data
  //       })
  //     }

//     if (err.response && err.response.data) {
//       if (err.response.data.errors) {
//         $message({
//           message: formatErrors(err.response.data.errors),
//           dangerouslyUseHTMLString: true,
//           type: 'error'
//         })
//       } else if (err.response.data.message) {
//         $message({
//           message: err.response.data.message,
//           type: 'error'
//         })
//       } else if (err.response.data.error) {
//         $message({
//           message: err.response.data.error,
//           dangerouslyUseHTMLString: true,
//           type: 'error'
//         })
//       }
//     }
//   })
}

// function formatErrors (errors) {
//   let string = ''
//   for (const errorField in errors) {
//     string += errors[errorField][0] + '<br />'
//   }
//   return string
// }
