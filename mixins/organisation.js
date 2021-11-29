export default {
  computed: {
    color () {
      return this.organisation.color ?? '#B91C1C'
    },
    legalStatus () {
      switch (this.organisation.statut_juridique) {
        case 'Association':
          return "l'association"
        case 'Collectivité':
          return 'la collectivité'
        case 'Structure publique':
          return "l'organisation publique"
        case 'Structure privée':
          return "l'organisation privée"
        default:
          return "l'organisation"
      }
    }
  },
  methods: {}
}
