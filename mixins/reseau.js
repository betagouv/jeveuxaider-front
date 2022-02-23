export default {
  computed: {
    reseauCity () {
      if (this.reseau.city?.startsWith('Paris ')) {
        return 'Paris'
      } else if (this.reseau.city?.startsWith('Lyon ')) {
        return 'Lyon'
      } else if (this.reseau.city?.startsWith('Marseille ')) {
        return 'Marseille'
      } else {
        return this.reseau.city?.replace(' Arrondissement', '')
      }
    }
  }
}
