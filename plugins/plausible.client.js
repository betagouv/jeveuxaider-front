export default () => {
  // eslint-disable-next-line prettier/prettier
  ;(function () {
    const d = document
    const s = d.createElement('script')

    s.defer = 1
    s.dataDomain = 'jeveuxaider.gouv.fr'
    s.src = 'https://plausible.io/js/plausible.outbound-links.js'
    s.async = 1
    d.getElementsByTagName('head')[0].appendChild(s)
    window.plausible =
      window.plausible ||
      function () {
        ;(window.plausible.q = window.plausible.q || []).push(arguments)
      }
  })()
}
