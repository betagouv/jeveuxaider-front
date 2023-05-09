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
          v-if="$store.getters.contextRole == 'admin' && (responsable.tags || profileStats?.missions_inactive > 0)"
          class="mt-1 mb-2 flex flex-wrap gap-1"
        >
          <Tag v-if="profileStats?.missions_inactive > 0" :custom-theme="true" class="bg-jva-red-600 text-white">
            {{ profileStats.missions_inactive | pluralize('mission désactivée', 'missions désactivées') }}
          </Tag>
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

        <template v-if="['admin'].includes($store.getters.contextRole) && profileStats?.missions_inactive > 0">
          <div class="border-t -mx-4 xl:-mx-6 my-4" />
          <div class="flex justify-center text-sm">
            <Link @click.native="showModalResponsableSetMissionsActive = true">
              Activer les missions du responsable
            </Link>
            <ModalResponsableSetMissionsIsActive
              :value="true"
              :is-open="showModalResponsableSetMissionsActive"
              :responsable="responsable"
              :profile-stats="profileStats"
              @confirm="afterSetMissionsIsActive"
              @cancel="showModalResponsableSetMissionsActive = false"
            />
          </div>
        </template>

        <template v-if="['admin'].includes($store.getters.contextRole) && profileStats?.missions_available > 0">
          <div class="border-t -mx-4 xl:-mx-6 my-4" />
          <div class="flex justify-center text-sm">
            <Link @click.native="showModalResponsableSetMissionsInactive = true">
              Désactiver les missions du responsable
            </Link>
            <ModalResponsableSetMissionsIsActive
              :value="false"
              :is-open="showModalResponsableSetMissionsInactive"
              :responsable="responsable"
              :profile-stats="profileStats"
              @confirm="afterSetMissionsIsActive"
              @cancel="showModalResponsableSetMissionsInactive = false"
            />
          </div>
        </template>
      </template>
    </Box>
  </div>
</template>

<script>
import ModalSendMessage from '@/components/modal/ModalSendMessage.vue'
import ModalResponsableSetMissionsIsActive from '~/components/modal/ModalResponsableSetMissionsIsActive.vue'
import Tag from '@/components/dsfr/Tag.vue'

export default {
  components: {
    ModalSendMessage,
    ModalResponsableSetMissionsIsActive,
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
      showModalResponsableSetMissionsActive: false,
      showModalResponsableSetMissionsInactive: false,
      conversationCurrentUserAndResponsable: null,
      role: null,
      profileStats: null
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

    const { data: profileStats } = await this.$axios.get(`/statistics/profiles/${this.responsable.id}`)
    this.profileStats = profileStats
  },
  methods: {
    handleClickSendMessage () {
      if (this.conversationCurrentUserAndResponsable) {
        this.$router.push(`/messages/${this.conversationCurrentUserAndResponsable.id}`)
      } else {
        this.showModalSendMessage = true
      }
    },
    afterSetMissionsIsActive () {
      this.$fetch()
      this.showModalResponsableSetMissionsActive = false
      this.showModalResponsableSetMissionsInactive = false
      this.$emit('updated')
    }
  }
}
</script>
