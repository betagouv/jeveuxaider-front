<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">
        Responsable
      </div>
      <Link v-if="['admin', 'referent'].includes($store.getters.contextRole)" :to="`/admin/utilisateurs/${responsable.id}`" icon="ChevronRightIcon">
        Consulter
      </Link>
    </div>
    <Box variant="flat" padding="xs">
      <DescriptionList v-if="responsable">
        <div
          v-if="$store.getters.contextRole == 'admin' && responsable.tags"
          class="mt-1 mb-2 flex flex-wrap gap-1"
        >
          <Tag v-for="tag in responsable.tags" :key="tag.id" size="sm">
            {{ tag.name }}
          </Tag>
        </div>
        <DescriptionListItem term="Nom" :description="responsable.full_name" />
        <DescriptionListItem term="Rôle" :description="role?.pivot.fonction" />
        <DescriptionListItem term="E-mail" :description="responsable.email" />
        <DescriptionListItem term="Mobile" :description="responsable.mobile" />
        <DescriptionListItem term="Invité par">
          <template v-if="role?.invited_by">
            <Link
              v-if="['admin'].includes($store.getters.contextRole)"
              class="inline-flex"
              :to="`/admin/utilisateurs/${role.invited_by.profile.id}`"
            >
              {{ role.invited_by.profile.full_name }}
            </Link>
            <span v-else>{{ role.invited_by.profile.full_name }}</span>
          </template>
          <span v-else> - </span>
        </DescriptionListItem>
        <DescriptionListItem
          v-if="responsable.user"
          term="Der. connexion"
          :description="responsable.user.last_online_at ? $dayjs(responsable.user.last_online_at).fromNow() : '-'"
        />
        <DescriptionListItemMasquerade v-if="$store.getters.contextRole === 'admin'" :profile="responsable" />
      </DescriptionList>
      <template v-if="['admin', 'referent'].includes($store.getters.contextRole)">
        <div v-if="conversableId" class="border-t -mx-4 xl:-mx-6 mt-6 mb-4" />
        <div v-if="conversableId" class="flex justify-center text-sm">
          <Link @click.native="handleClickSendMessage">
            <ChatAltIcon class="h-4 w-4 mr-2" /> Envoyer un message
          </Link>
          <ModalSendMessage
            :is-open="showModalSendMessage"
            :to-user="responsable"
            :conversable-id="conversableId"
            :conversable-type="conversableType"
            @cancel="showModalSendMessage = false"
          />
        </div>
      </template>
    </Box>
  </div>
</template>

<script>
import ModalSendMessage from '@/components/modal/ModalSendMessage.vue'
import Tag from '@/components/dsfr/Tag.vue'

export default {
  components: {
    ModalSendMessage,
    Tag
  },
  props: {
    responsable: {
      type: Object,
      required: true
    },
    conversableId: {
      type: Number,
      default: null
    },
    conversableType: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      showModalSendMessage: false,
      conversationCurrentUserAndResponsable: null,
      role: null
    }
  },
  async fetch () {
    const { data } = await this.$axios.get('/conversations', {
      params: {
        'filter[conversable_id]': this.conversableId,
        'filter[conversable_type]': this.conversableType,
        'filter[with_users]': `${this.responsable.user_id},${this.$store.getters.profile.user_id}`
      }
    })
    this.conversationCurrentUserAndResponsable = data.total > 0 && data.data[0]

    const { data: roles } = await this.$axios.get(`/users/${this.responsable.user_id}/roles`)
    this.role = roles.find(role => role.name === 'responsable' && role.pivot_model.id === this.conversableId)
  },
  methods: {
    handleClickSendMessage () {
      if (this.conversationCurrentUserAndResponsable) {
        this.$router.push(`/messages/${this.conversationCurrentUserAndResponsable.id}`)
      } else {
        this.showModalSendMessage = true
      }
    }
  }
}
</script>
