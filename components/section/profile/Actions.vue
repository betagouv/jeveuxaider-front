<template>
  <ModalUserBan
    :user="profile.user"
    :is-open="showModalBan"
    @cancel="showModalBan = false"
    @confirm="handleUserBanConfirm"
  />

  <ModalUserUnban
    :user="profile.user"
    :is-open="showModalUnban"
    @cancel="showModalUnban = false"
    @confirm="handleUserUnbanConfirm"
  />
  <BaseDropdown>
    <template #button>
      <DsfrButton :size="buttonSize" type="tertiary" class="!text-gray-800">
        <RiMoreFill class="h-5 w-5 fill-current" />
      </DsfrButton>
    </template>
    <template #items>
      <NuxtLink
        :to="`/admin/participations?filter[profile.id]=${profile.id}&full_name=${profile.full_name}`"
      >
        <BaseDropdownOptionsItem>
          <div class="flex items-center">
            <RiMailStar class="h-4 w-4 mr-2 fill-current text-gray-600" /> Voir les participations
          </div>
        </BaseDropdownOptionsItem>
      </NuxtLink>
      <BaseDropdownOptionsItem
        v-if="['admin'].includes($stores.auth.contextRole) && !profile.user.banned_at"
        @click="showModalBan = true"
      >
        <div class="flex items-center">
          <RiUserForbid class="h-4 w-4 mr-2 fill-current text-gray-600" /> Bloquer l'utilisateur
        </div>
      </BaseDropdownOptionsItem>
      <BaseDropdownOptionsItem
        v-if="['admin'].includes($stores.auth.contextRole) && profile.user.banned_at"
        @click="showModalUnban = true"
      >
        <div class="flex items-center">
          <RiUserFollow class="h-4 w-4 mr-2 fill-current text-gray-600" /> Débloquer l'utilisateur
        </div>
      </BaseDropdownOptionsItem>
      <BaseDropdownOptionsItem
        v-if="['admin'].includes($stores.auth.contextRole)"
        @click="handleImpersonate()"
      >
        <div class="flex items-center">
          <RiSpy class="h-4 w-4 mr-2 fill-current text-gray-600" /> Prendre sa place
        </div>
      </BaseDropdownOptionsItem>
    </template>
  </BaseDropdown>
</template>

<script>
import ModalUserBan from '@/components/modal/ModalUserBan.vue'
import ModalUserUnban from '@/components/modal/ModalUserUnban.vue'

export default defineNuxtComponent({
  emits: ['updated'],
  components: {
    ModalUserBan,
    ModalUserUnban,
  },
  data() {
    return {
      showModalBan: false,
      showModalUnban: false,
    }
  },
  props: {
    profile: {
      type: Object,
      required: true,
    },
    buttonSize: {
      type: String,
      default: 'md',
    },
  },
  methods: {
    async handleImpersonate() {
      await this.$stores.auth.impersonate(this.profile.user.id)
    },
    async handleUserBanConfirm($event) {
      this.loading = true
      await apiFetch(`/users/${this.profile.user.id}/ban`, {
        method: 'POST',
        body: { ...$event },
      }).catch(() => {})
      this.$emit('updated')
      this.loading = false
      this.showModalBan = false
    },
    async handleUserUnbanConfirm($event) {
      this.loading = true
      await apiFetch(`/users/${this.profile.user.id}/unban`, { method: 'POST' }).catch(() => {})
      this.$emit('updated')
      this.loading = false
      this.showModalUnban = false
    },
  },
})
</script>
