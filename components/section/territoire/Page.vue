<template>
  <div>
    <ClientOnly>
      <Teleport
        v-if="!territoire.is_published || territoire.state !== 'validated'"
        to="#teleport-header-top"
      >
        <transition name="fade">
          <BaseBanner>
            La page n'est pas visible car elle est
            {{ territoire.is_published ? 'en ligne' : 'hors ligne' }} et a le statut « {{
              $filters.label(territoire.state, 'territoire_workflow_states')
            }} »
            <template #action>
              <DsfrLink
                icon="RiArrowRightLine"
                :to="`/admin/contenus/territoires/${territoire.id}/edit`"
              >
                Gérer
              </DsfrLink>
            </template>
          </BaseBanner>
        </transition>
      </Teleport>
    </ClientOnly>

    <TerritoireBanner :territoire="territoire" />

    <div v-if="territoire.type == 'city' && logo" class="bg-white pt-12">
      <div class="container">
        <NuxtImg
          ref="logo"
          :src="territoire.logo?.urls.original"
          :srcset="logo"
          :alt="territoire.name"
          class="mx-auto"
          style="max-height: 110px"
          @error="$refs.logo.$el.remove()"
        />
      </div>
    </div>

    <Search :territoire="territoire" />
    <Promote :territoire="territoire" class="pb-24" />
    <Cities v-if="territoire.type == 'city'" :territoire="territoire" :cities="cities" />
    <Associations :territoire="territoire" />
    <Engagement :territoire="territoire" />
    <Subscribe :territoire="territoire" />
  </div>
</template>

<script>
import TerritoireBanner from '@/components/section/territoire/Banner.vue'
import Search from '@/components/section/territoire/Search.vue'
import Promote from '@/components/section/territoire/Promote.vue'
import Cities from '@/components/section/territoire/Cities.vue'
import Associations from '@/components/section/territoire/Associations.vue'
import Engagement from '@/components/section/territoire/Engagement.vue'
import Subscribe from '@/components/section/territoire/Subscribe.vue'

export default defineNuxtComponent({
  components: {
    TerritoireBanner,
    Promote,
    Cities,
    Associations,
    Engagement,
    Subscribe,
    Search,
  },
  props: {
    territoire: {
      type: Object,
      required: true,
    },
    cities: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    logo() {
      return this.territoire.logo?.urls.small
    },
  },
})
</script>
