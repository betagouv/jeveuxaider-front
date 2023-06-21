<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">
        Statut
      </div>
    </div>
    <Box variant="flat" padding="xs" class="m-[-1px]">
      <DescriptionList>
        <DescriptionListItem
          term="État"
        >
          <div>{{ labelStatus }}</div>
          <Link v-if="!user.is_blocked" :disabled="loading" class="text-jva-blue-500" @click.native="showModal = true">
            Bloquer l'utilisateur
          </Link>
        </DescriptionListItem>
        <DescriptionListItem v-if="user.is_blocked" term="Raison" :description="labelReason" />
      </DescriptionList>
    </Box>

    <ModalUserBan
      :user="user"
      :is-open="showModal"
      @cancel="showModal = false"
      @confirm="handleUserBanConfirm"
    />
  </div>
</template>

<script>
import ModalUserBan from '@/components/modal/ModalUserBan.vue'
import Link from '@/components/dsfr/Link.vue'

export default {
  components: {
    ModalUserBan,
    Link
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showModal: false,
      loading: false
    }
  },
  computed: {
    labelStatus () {
      return this.user.is_blocked ? 'Bloqué' : 'Actif'
    },
    labelReason () {
      return this.$options.filters
        .label(
          this.user.is_blocked_reason,
          'user_ban_reasons'
        )
    }
  },
  methods: {
    async handleUserBanConfirm ($event) {
      this.loading = true
      console.log('handleUserBanConfirm', $event)
      await this.$axios.post(`/users/${this.user.id}/ban`, { ...$event }).catch(() => {})
      this.$emit('update')
      this.loading = false
      this.showModal = false
    }
  }
}
</script>
