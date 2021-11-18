// Pas de classe dynamique pour éviter problèmes de purge.

export default {
  methods: {
    domainColor (domainId) {
      switch (domainId) {
        case 1:
          return 'text-domaine-covid'
        case 2:
          return 'text-domaine-education'
        case 3:
          return 'text-domaine-sante'
        case 4:
          return 'text-domaine-nature'
        case 6:
          return 'text-domaine-solidarite'
        case 7:
          return 'text-domaine-sport'
        case 8:
          return 'text-domaine-prevention'
        case 9:
          return 'text-domaine-memoire'
        case 10:
          return 'text-domaine-cooperation'
        case 11:
          return 'text-domaine-culture'
        default:
          return 'text-jva-blue-500'
      }
    },
    domainBgColor (domainId) {
      switch (domainId) {
        case 1:
          return 'bg-domaine-covid'
        case 2:
          return 'bg-domaine-education'
        case 3:
          return 'bg-domaine-sante'
        case 4:
          return 'bg-domaine-nature'
        case 6:
          return 'bg-domaine-solidarite'
        case 7:
          return 'bg-domaine-sport'
        case 8:
          return 'bg-domaine-prevention'
        case 9:
          return 'bg-domaine-memoire'
        case 10:
          return 'bg-domaine-cooperation'
        case 11:
          return 'bg-domaine-culture'
        default:
          return 'bg-jva-blue-500'
      }
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
