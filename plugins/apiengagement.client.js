/* eslint-disable */
export default ({ $config }) => {
  if (!$config.apiEngagement.tracking_key) {
    return;
  }
  document.addEventListener('DOMContentLoaded', function () {
    ; (function (i, s, o, g, r, a, m) {
      i.ApiEngagementObject = r
        ; (i[r] =
          i[r] ||
          function () {
            ; (i[r].q = i[r].q || []).push(arguments)
          }),
          (i[r].l = 1 * new Date())
        ; (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0])
      a.async = 1
      a.src = g
      m.parentNode.insertBefore(a, m)
    })(
      window,
      document,
      'script',
      'https://app.api-engagement.beta.gouv.fr/jstag.js',
      'apieng'
    )
    apieng('config', $config.apiEngagement.tracking_key)
  })
}
