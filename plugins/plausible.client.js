import Plausible from 'plausible-tracker'

export default ({ $config }, inject) => {
  const plausible = Plausible({
    domain: $config.plausible.site_id,
    trackLocalhost: true
  })
  plausible.enableAutoOutboundTracking()

  // Inject $plausible in Vue, context and store.
  inject('plausible', plausible)
}
