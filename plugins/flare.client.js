import { flare } from '@flareapp/flare-client'
import { flareVue } from '@flareapp/flare-vue'
import Vue from 'vue'

export default ({ $config, store }) => {
  flare.light($config.flare.projectKey)

  if (store.getters.profile) {
    flare.addContextGroup('user', store.getters.profile)
    flare.addContextGroup('currentRole', store.getters.currentRole)
  }

  Vue.use(flareVue)
}
