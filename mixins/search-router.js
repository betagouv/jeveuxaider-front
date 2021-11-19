import algoliasearch from 'algoliasearch/lite'
import { createServerRootMixin } from 'vue-instantsearch'
import qs from 'qs'

const searchClient = algoliasearch(
  process.env.algolia.appId,
  process.env.algolia.searchKey
)

function stringifyQuery (query) {
  const result = qs.stringify(query)
  return result ? '?' + result : ''
}

function parseQuery (query) {
  return qs.parse(query)
}

// remove indexName
function removeIndex (routeState) {
  if (`${process.env.algolia.missionsIndex}` in routeState) { routeState = routeState[`${process.env.algolia.missionsIndex}`] }

  return routeState
}

// restore indexName
function addIndex (routeState) {
  routeState = {
    [`${process.env.algolia.missionsIndex}`]: routeState
  }
  return routeState
}

function nuxtRouter (vueRouter) {
  return {
    read () {
      return addIndex(parseQuery(vueRouter.currentRoute.query))
    },
    write (routeState) {
      // Nothing here, we do our own logic
    },
    createURL (routeState) {
      routeState = removeIndex(routeState)
      const url = vueRouter.resolve({
        query: routeState
      }).href
      return url
    },
    onUpdate (cb) {
      if (typeof window === 'undefined') { return }
      this._onPopState = (event) => {
        cb(this.read())
      }
      window.addEventListener('popstate', this._onPopState)
    },
    dispose () {
      if (typeof window === 'undefined') { return }
      window.removeEventListener('popstate', this._onPopState)
    }
  }
}

export default {
  provide () {
    return {
      // Provide the InstantSearch instance for SSR
      $_ais_ssrInstantSearchInstance: this.instantsearch
    }
  },
  serverPrefetch () {
    return this.instantsearch.findResultsState(this).then((algoliaState) => {
      // @Bug -> Si décommenté impossible de faire marcher les props dans AisConfigure sans un hot reload...
      // ... et si commenté, warnings The client-side rendered virtual DOM tree is not matching server-rendered content
      // this.$ssrContext.nuxt.algoliaState = algoliaState
    })
  },
  data () {
    // Create it in `data` to access the Vue Router
    const mixin = createServerRootMixin({
      indexName: process.env.algolia.missionsIndex,
      searchClient,
      routing: {
        router: nuxtRouter(this.$router)
      }
    })

    return {
      ...mixin.data(),
      routeState: {
        query: this.$route.query.query
      }
    }
  },
  computed: {
    beforeMount () {
      const results =
        (this.$nuxt.context && this.$nuxt.context.nuxtState.algoliaState) ||
        window.__NUXT__.algoliaState

      this.instantsearch.hydrate(results)

      // Remove the SSR state so it can't be applied again by mistake
      delete this.$nuxt.context.nuxtState.algoliaState
      delete window.__NUXT__.algoliaState
    }
  },
  methods: {
    readUrl () {
      const routeState = qs.parse(this.$router.currentRoute.query)
      this.$set(this, 'routeState', routeState)
    },
    writeUrl () {
      this.$router.push(stringifyQuery(this.routeState))
    }
  }
}
