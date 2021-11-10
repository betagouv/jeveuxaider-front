export default {
  methods: {
    // Pas de classe dynamique pour éviter problèmes de purge.
    domainColor (domainId) {
      let colorClass
      switch (domainId) {
        case 1:
          colorClass = 'text-domaine-covid'
          break
        case 2:
          colorClass = 'text-domaine-education'
          break
        case 3:
          colorClass = 'text-domaine-sante'
          break
        case 4:
          colorClass = 'text-domaine-nature'
          break
        case 6:
          colorClass = 'text-domaine-solidarite'
          break
        case 7:
          colorClass = 'text-domaine-sport'
          break
        case 8:
          colorClass = 'text-domaine-prevention'
          break
        case 9:
          colorClass = 'text-domaine-memoire'
          break
        case 10:
          colorClass = 'text-domaine-cooperation'
          break
        case 11:
          colorClass = 'text-domaine-culture'
          break
        default:
          colorClass = 'text-jva-blue-500'
          break
      }

      return colorClass
    },
    domainBgColor (domainId) {
      let colorClass
      switch (domainId) {
        case 1:
          colorClass = 'bg-domaine-covid'
          break
        case 2:
          colorClass = 'bg-domaine-education'
          break
        case 3:
          colorClass = 'bg-domaine-sante'
          break
        case 4:
          colorClass = 'bg-domaine-nature'
          break
        case 6:
          colorClass = 'bg-domaine-solidarite'
          break
        case 7:
          colorClass = 'bg-domaine-sport'
          break
        case 8:
          colorClass = 'bg-domaine-prevention'
          break
        case 9:
          colorClass = 'bg-domaine-memoire'
          break
        case 10:
          colorClass = 'bg-domaine-cooperation'
          break
        case 11:
          colorClass = 'bg-domaine-culture'
          break
        default:
          colorClass = 'bg-jva-blue-500'
          break
      }

      return colorClass
    }
  },
  computed: {
    domainId () {
      return (
        this.thematique?.domaine_id ??
        this.mission?.domaine_id ??
        this.mission?.template?.domaine_id
      )
    }
  }
}
