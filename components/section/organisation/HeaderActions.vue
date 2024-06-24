<template>
  <div
    ref="menuActions"
    :class="[isPinned ? 'bg-white shadow-lg !z-[51]' : '']"
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
              Organisation
              <span
                v-if="['admin'].includes($stores.auth.contextRole)"
                class="font-normal text-gray-500"
                >#{{ organisation.id }}</span
              >
            </BaseHeading>
            <div :class="['flex items-center gap-3 flex-wrap', isPinned ? '' : 'mt-2']">
              <Badges :class="[isPinned ? 'hidden xl:flex' : '']" :organisation="organisation" />
              <DsfrLink
                v-if="hasPageOnline"
                :to="`/organisations/${organisation.slug}`"
                :is-external="true"
                class="text-xs font-normal flex-shrink-0"
              >
                Voir l'organisation
              </DsfrLink>
            </div>
          </div>
        </div>

        <div class="flex-col sm:flex-row flex gap-3 mt-4 lg:mt-0">
          <slot name="actions">
            <nuxt-link no-prefetch :to="`/admin/organisations/${organisation.id}/edit`">
              <DsfrButton type="primary">
                <RiPencilLine class="h-5 w-5 fill-current" /> Modifier
              </DsfrButton>
            </nuxt-link>
            <SelectOrganisationState
              v-if="canEditStatut"
              :organisation="organisation"
              @selected="handleChangeState($event)"
            />
            <Actions
              v-if="
                ['admin', 'referent', 'referent_regional', 'responsable'].includes(
                  $stores.auth.contextRole
                )
              "
              :organisation="organisation"
              @organisationDeleted="handleDeleted"
              @organisationUpdated="$emit('updated')"
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
import Actions from '@/components/section/organisation/Actions.vue'
import Badges from '@/components/section/organisation/Badges.vue'
import MixinOrganisation from '@/mixins/organisation'
import SelectOrganisationState from '@/components/custom/SelectOrganisationState.vue'

export default defineNuxtComponent({
  emits: ['showModalSwitchIsOnline', 'updated', 'isPinned'],
  mixins: [MixinOrganisation],

  data() {
    return {
      isPinned: false,
      waitingOnAnimRequest: false,
    }
  },
  components: {
    Actions,
    Badges,
    SelectOrganisationState,
  },
  props: {
    organisation: {
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
      this.$router.push('/admin/organisations')
    },
  },
})
</script>
