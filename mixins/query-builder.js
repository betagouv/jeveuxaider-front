import { debounce } from 'lodash'

export default {
  data () {
    return {
      queryResult: {}
    }
  },
  async fetch () {
    const { data } = await this.$axios.get(this.endpoint, {
      params: { ...this.queryParams, ...this.$route.query }
    })
    this.queryResult = data
    // window.scrollTo(0, 0)
  },
  fetchOnServer: false,
  computed: {
    context () {
      if (this.$route.query['filter[mission.structure.name]'] && this.$route.query['filter[mission.structure.id]']) {
        return {
          name: this.$route.query['filter[mission.structure.name]'],
          id: this.$route.query['filter[mission.structure.id]'],
          link: `/admin/organisations/${this.$route.query['filter[mission.structure.id]']}`,
          type: 'Organisation'
        }
      }
      if (this.$route.query['filter[structure.name]'] && this.$route.query['filter[structure.id]']) {
        return {
          name: this.$route.query['filter[structure.name]'],
          id: this.$route.query['filter[structure.id]'],
          link: `/admin/organisations/${this.$route.query['filter[structure.id]']}`,
          type: 'Organisation'
        }
      }
      if (this.$route.query['filter[mission.name]'] && this.$route.query['filter[mission.id]']) {
        return {
          name: this.$route.query['filter[mission.name]'],
          id: this.$route.query['filter[mission.id]'],
          link: `/admin/missions/${this.$route.query['filter[mission.id]']}`,
          type: 'Mission'
        }
      }
      if (this.$route.query['filter[structure.reseaux.name]'] && this.$route.query['filter[structure.reseaux.id]']) {
        return {
          name: this.$route.query['filter[structure.reseaux.name]'],
          id: this.$route.query['filter[structure.reseaux.id]'],
          link: `/admin/contenus/reseaux/${this.$route.query['filter[structure.reseaux.id]']}`,
          type: 'Réseau',
          closeContext: () => this.deleteAllFilters()
        }
      }
      if (this.$route.query['filter[reseaux.name]'] && this.$route.query['filter[reseaux.id]']) {
        return {
          name: this.$route.query['filter[reseaux.name]'],
          id: this.$route.query['filter[reseaux.id]'],
          link: `/admin/contenus/reseaux/${this.$route.query['filter[reseaux.id]']}`,
          type: 'Réseau',
          closeContext: () => this.deleteAllFilters()
        }
      }
      if (this.$route.query.reseau_name && this.$route.query['filter[ofReseau]']) {
        return {
          name: this.$route.query.reseau_name,
          id: this.$route.query['filter[ofReseau]'],
          link: `/admin/contenus/reseaux/${this.$route.query['filter[ofReseau]']}`,
          type: 'Réseau',
          closeContext: () => this.deleteAllFilters()
        }
      }
      if (this.$route.query.full_name && this.$route.query['filter[profile.id]']) {
        return {
          name: this.$route.query.full_name,
          id: this.$route.query['filter[profile.id]'],
          link: `/admin/utilisateurs/${this.$route.query['filter[profile.id]']}`,
          type: 'Utilisateur',
          closeContext: () => this.deleteAllFilters()
        }
      }
      if (this.$route.query.territoire_name && this.$route.query['filter[ofTerritoire]']) {
        return {
          name: this.$route.query.territoire_name,
          id: this.$route.query['filter[ofTerritoire]'],
          link: `/admin/contenus/territoires/${this.$route.query['filter[ofTerritoire]']}`,
          type: 'Territoire',
          closeContext: () => this.deleteAllFilters()
        }
      }
      if (this.$route.query.template_name && this.$route.query['filter[template.id]']) {
        return {
          name: this.$route.query.template_name,
          id: this.$route.query['filter[template.id]'],
          link: `/admin/contenus/modeles-mission?filter[search]=${this.$route.query.template_name}`,
          type: 'Template de mission',
          closeContext: () => this.deleteAllFilters()
        }
      }
      if (this.$route.query.template_name && this.$route.query['filter[mission.template.id]']) {
        return {
          name: this.$route.query.template_name,
          id: this.$route.query['filter[mission.template.id]'],
          link: `/admin/contenus/modeles-mission?filter[search]=${this.$route.query.template_name}`,
          type: 'Template de mission',
          closeContext: () => this.deleteAllFilters()
        }
      }
      return null
    }
  },
  watch: {
    $route: '$fetch'
  },
  methods: {
    changeFilter (filterName, filterValue, multiple = false) {
      if (this.timeout) {
        this.timeout.cancel()
      }
      this.timeout = debounce(() => {
        const filterQueryValues = this.$route.query[filterName] ? this.$route.query[filterName].split(',') : []
        if (filterQueryValues.includes(filterValue) || filterQueryValues === filterValue) { // L'option est déjà filtrée, on la retire
          this.deleteFilter(filterName, filterValue, multiple)
        } else if (filterValue === '' || filterValue === null) {
          this.deleteFilter(filterName, filterValue, multiple)
        } else {
          this.addFilter(filterName, filterValue, multiple)
        }
      }, 275)
      this.timeout()
    },
    addFilter (filterName, filterValue, multiple) {
      let filterQueryValues = this.$route.query[filterName] ? this.$route.query[filterName].split(',') : []
      if (multiple) {
        filterQueryValues.push(filterValue)
      } else {
        filterQueryValues = [filterValue]
      }

      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, [filterName]: filterQueryValues.join(','), page: undefined }
      })
    },
    deleteFilter (filterName, filterValue, multiple) {
      let filterQueryValues = this.$route.query[filterName] ? this.$route.query[filterName].split(',') : []

      if (multiple) {
        filterQueryValues = filterQueryValues.filter(value => value !== filterValue)
        if (filterQueryValues.length === 0) { filterQueryValues = undefined }
      } else {
        filterQueryValues = undefined
      }
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, [filterName]: filterQueryValues ? filterQueryValues.join(',') : undefined, page: undefined }
      })
    },
    deleteAllFilters () {
      this.$router.push({
        path: this.$route.path,
        query: {}
      })
    },

    changePage (page) {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, page }
      })
    },
    hasActiveFilters () {
      Object.keys(this.$route.query).forEach(key => this.$route.query[key] === undefined ? delete this.$route.query[key] : {})
      return Object.keys(this.$route.query).length === 0
    }
  }
}
