<template>
  <div
    ref="menuActions"
    :class="[isPinned ? 'bg-white shadow-lg z-50' : '']"
    class="sticky z-40 top-0 py-4 -mt-4"
  >
    <div class="container">
      <div
        :class="[
          'flex justify-between flex-col lg:flex-row',
          isPinned ? 'lg:items-center' : 'lg:items-start',
        ]"
      >
        <div>
          <div :class="['mr-4', isPinned ? 'flex items-center space-x-3' : 'flex-col']">
            <BaseHeading :level="1" :class="['flex-shrink-0', isPinned && '!text-2xl']">
              Territoire
              <span
                v-if="['admin'].includes($stores.auth.contextRole)"
                class="font-normal text-gray-500"
                >#{{ territoire.id }}</span
              >
            </BaseHeading>
            <div :class="['flex items-center gap-3 flex-wrap', isPinned ? '' : 'mt-2']">
              <Badges :class="[isPinned ? 'hidden xl:flex' : '']" :territoire="territoire" />
              <DsfrLink
                v-if="hasPageOnline"
                :to="`/villes/${territoire.slug}`"
                :is-external="true"
                class="text-xs font-normal flex-shrink-0"
              >
                Voir le territoire
              </DsfrLink>
            </div>
          </div>
        </div>

        <div class="flex-col sm:flex-row flex gap-3 mt-4 lg:mt-0">
          <slot name="actions">
            <nuxt-link
              v-if="canManageTerritoire"
              no-prefetch
              :to="`/admin/contenus/territoires/${territoire.id}/edit`"
            >
              <DsfrButton type="primary">
                <RiPencilLine class="h-5 w-5 fill-current" /> Modifier
              </DsfrButton>
            </nuxt-link>
            <!-- <SelectOrganisationState
              v-if="canEditStatut"
              :organisation="organisation"
              @selected="handleChangeState($event)"
            /> -->
            <SelectTerritoireState
              v-if="canEditStatut"
              :modelValue="territoire.state"
              @selected="handleChangeState($event)"
            />
            <Actions
              v-if="['admin'].includes($stores.auth.contextRole)"
              :territoire="territoire"
              @territoireDeleted="handleDeleted"
              @territoireUpdated="$emit('updated')"
              :isMenuPinned="isPinned"
            />
          </slot>
        </div>
      </div>
    </div>
  </div>

  <div :class="['container pt-4', { 'opactity-0 lg:!pt-7 xl:!pt-[38px]': isPinned }]">
    <hr :class="['pb-8']" />
  </div>
</template>

<script>
import Actions from '@/components/section/territoire/Actions.vue'
import Badges from '@/components/section/territoire/Badges.vue'
import MixinTerritoire from '@/mixins/territoire'
import SelectTerritoireState from '@/components/custom/SelectTerritoireState.vue'

export default defineNuxtComponent({
  emits: ['showModalSwitchIsOnline', 'updated', 'isPinned'],
  mixins: [MixinTerritoire],
  data() {
    return {
      isPinned: false,
      waitingOnAnimRequest: false,
    }
  },
  components: {
    Actions,
    Badges,
    SelectTerritoireState,
  },
  props: {
    territoire: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, false)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    async handleChangeState(option) {
      await apiFetch(`/territoires/${this.territoire.id}`, {
        method: 'PUT',
        body: {
          ...this.territoire,
          state: option.key,
        },
      })
        .then(() => {
          this.territoire.state = option.key
        })
        .catch(() => {})
    },
    handleScroll() {
      if (!this.waitingOnAnimRequest) {
        window.requestAnimationFrame(() => {
          if (!this.$refs.menuActions) {
            return
          }
          this.isPinned = this.$refs.menuActions.getBoundingClientRect().top <= 0
          this.$emit('isPinned', this.isPinned)
          this.waitingOnAnimRequest = false
        })
      }
      this.waitingOnAnimRequest = true
    },
    handleDeleted() {
      this.$router.push('/admin/contenus/territoires')
    },
  },
})
</script>
