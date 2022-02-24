export default (app) => {
  document.addEventListener('DOMContentLoaded', function () {
    const script = document.createElement('script')
    script.onload = function () {
      const tag = new window.ATInternet.Tracker.Tag()
      tag.page.set({
        name: app.route.fullPath
      })
      tag.dispatch()
    }
    script.src = '//tag.aticdn.net/610648/smarttag.js'
    script.async = true
    document.head.appendChild(script)

    app.app.router.afterEach(() => {
      if (window.ATInternet && window.ATInternet.Tracker) {
        const tag = new window.ATInternet.Tracker.Tag()

        tag.page.set({
          name: app.route.fullPath
        })
        tag.dispatch()
      }
    })
  })
}
