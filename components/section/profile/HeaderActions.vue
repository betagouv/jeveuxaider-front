<template>
  <div
    ref="menuActions"
    :class="[isPinned ? 'bg-white shadow-lg' : '']"
    class="z-40 sticky top-0 py-4 -mt-4"
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
              Utilisateur
              <span class="font-normal text-gray-500">#{{ profile.id }}</span>
            </BaseHeading>
            <Badges :class="[isPinned ? 'hidden xl:flex' : 'mt-2']" :profile="profile" />
          </div>
        </div>

        <div class="flex-col sm:flex-row flex gap-3 mt-4 lg:mt-0">
          <slot name="actions">
            <nuxt-link no-prefetch :to="`/admin/utilisateurs/${profile.id}/edit`">
              <DsfrButton type="primary">
                <RiPencilLine class="h-5 w-5 fill-current" /> Modifier
              </DsfrButton>
            </nuxt-link>

            <Actions :profile="profile" @updated="$emit('updated')" />
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
import Actions from '@/components/section/profile/Actions.vue'
import Badges from '@/components/section/profile/Badges.vue'

export default defineNuxtComponent({
  emits: ['updated'],
  data() {
    return {
      isPinned: false,
    }
  },
  components: {
    Actions,
    Badges,
  },
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    let timeout
    window.addEventListener(
      'scroll',
      () => {
        if (timeout) {
          window.cancelAnimationFrame(timeout)
        }
        timeout = window.requestAnimationFrame(() => {
          this.handleScroll()
        })
      },
      false
    )
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    handleScroll() {
      if (!this.$refs.menuActions) {
        return
      }
      this.isPinned = this.$refs.menuActions.getBoundingClientRect().top <= 0
    },
    handleDeleted() {
      this.$router.push('/admin/utilisateurs')
    },
  },
})
</script>
