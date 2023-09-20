<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">Statut</div>
      <slot name="action" :loading="loading" />
    </div>
    <BaseBox variant="flat" padding="xs" class="m-[-1px]">
      <BaseDescriptionList>
        <BaseDescriptionListItem term="État">
          <div class="flex flex-wrap">
            {{ labelStatus }}
          </div>
        </BaseDescriptionListItem>
        <BaseDescriptionListItem v-if="user.banned_at" term="Raison" :description="labelReason" />
      </BaseDescriptionList>
    </BaseBox>

    <ModalUserBan
      :user="user"
      :is-open="showModalBan"
      @cancel="showModalBan = false"
      @confirm="handleUserBanConfirm"
    />

    <ModalUserUnban
      :user="user"
      :is-open="showModalUnban"
      @cancel="showModalUnban = false"
      @confirm="handleUserUnbanConfirm"
    />
  </div>
</template>

<script>
import ModalUserBan from '@/components/modal/ModalUserBan.vue'
import ModalUserUnban from '@/components/modal/ModalUserUnban.vue'

export default defineNuxtComponent({
  components: {
    ModalUserBan,
    ModalUserUnban,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showModalBan: false,
      showModalUnban: false,
      loading: false,
    }
  },
  computed: {
    labelStatus() {
      return this.user.banned_at ? 'Bloqué' : 'Actif'
    },
    labelReason() {
      return this.$filters.label(this.user.banned_reason, 'user_ban_reasons')
    },
  },
  methods: {
    async handleUserBanConfirm($event) {
      this.loading = true
      await apiFetch(`/users/${this.user.id}/ban`, {
        method: 'POST',
        body: { ...$event },
      }).catch(() => {})
      this.$emit('update')
      this.loading = false
      this.showModalBan = false
    },
    async handleUserUnbanConfirm($event) {
      this.loading = true
      await apiFetch(`/users/${this.user.id}/unban`, { method: 'POST' }).catch(() => {})
      this.$emit('update')
      this.loading = false
      this.showModalUnban = false
    },
  },
})
</script>
