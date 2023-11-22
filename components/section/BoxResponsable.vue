<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">Responsable</div>
      <BaseLink
        v-if="['admin', 'referent'].includes($stores.auth.contextRole)"
        :to="`/admin/utilisateurs/${responsable.id}`"
        icon="RiArrowRightSLine"
      >
        Consulter
      </BaseLink>
    </div>
    <BaseBox variant="flat" padding="xs">
      <BaseDescriptionList v-if="responsable">
        <div
          v-if="
            $stores.auth.contextRole == 'admin' &&
            (responsable.tags || profileStats?.missions_inactive > 0)
          "
          class="mt-1 mb-2 flex flex-wrap gap-1"
        >
          <DsfrTag
            v-if="profileStats?.missions_inactive > 0"
            :custom-theme="true"
            class="bg-jva-red-600 text-white"
          >
            {{
              $filters.pluralize(
                profileStats.missions_inactive,
                'mission désactivée',
                'missions désactivées'
              )
            }}
          </DsfrTag>
          <DsfrTag v-for="tag in responsable.tags" :key="tag.id" size="sm">
            {{ tag.name }}
          </DsfrTag>
        </div>
        <BaseDescriptionListItem term="Nom" :description="responsable.full_name" />
        <BaseDescriptionListItem term="Rôle" :description="role?.pivot.fonction" />
        <BaseDescriptionListItem term="E-mail" :description="responsable.email" />
        <BaseDescriptionListItem term="Mobile" :description="responsable.mobile" />
        <BaseDescriptionListItem term="Invité par">
          <template v-if="role?.invited_by">
            <BaseLink
              v-if="['admin'].includes($stores.auth.contextRole)"
              class="inline-flex"
              :to="`/admin/utilisateurs/${role.invited_by.profile.id}`"
            >
              {{ role.invited_by.profile.full_name }}
            </BaseLink>
            <span v-else>{{ role.invited_by.profile.full_name }}</span>
          </template>
          <span v-else> - </span>
        </BaseDescriptionListItem>
        <BaseDescriptionListItem
          v-if="responsable.user"
          term="Der. connexion"
          :description="
            responsable.user.last_online_at
              ? $dayjs(responsable.user.last_online_at).fromNow()
              : '-'
          "
        />
        <BaseDescriptionListItemMasquerade
          v-if="$stores.auth.contextRole === 'admin'"
          :profile="responsable"
        />
      </BaseDescriptionList>
      <template v-if="['admin', 'referent'].includes($stores.auth.contextRole)">
        <div v-if="conversableId" class="border-t -mx-4 xl:-mx-6 mt-6 mb-4" />
        <div v-if="conversableId" class="flex justify-center text-sm">
          <BaseLink @click.native="handleClickSendMessage">
            <RiMessage3Line class="h-4 w-4 mr-2" /> Envoyer un message
          </BaseLink>
          <ModalSendMessage
            :is-open="showModalSendMessage"
            :to-user="responsable"
            :conversable="conversable"
            :conversable-id="conversableId"
            :conversable-type="conversableType"
            @cancel="showModalSendMessage = false"
          />
        </div>

        <template
          v-if="['admin'].includes($stores.auth.contextRole) && profileStats?.missions_inactive > 0"
        >
          <div class="border-t -mx-4 xl:-mx-6 my-4" />
          <div class="flex justify-center text-sm">
            <BaseLink @click.native="showModalResponsableSetMissionsActive = true">
              Activer les missions du responsable
            </BaseLink>
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

        <template
          v-if="
            ['admin'].includes($stores.auth.contextRole) && profileStats?.missions_available > 0
          "
        >
          <div class="border-t -mx-4 xl:-mx-6 my-4" />
          <div class="flex justify-center text-sm">
            <BaseLink @click.native="showModalResponsableSetMissionsInactive = true">
              Désactiver les missions du responsable
            </BaseLink>
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
    </BaseBox>
  </div>
</template>

<script>
import ModalSendMessage from '@/components/modal/ModalSendMessage.vue'
import ModalResponsableSetMissionsIsActive from '@/components/modal/ModalResponsableSetMissionsIsActive.vue'

export default defineNuxtComponent({
  components: {
    ModalSendMessage,
    ModalResponsableSetMissionsIsActive,
  },
  props: {
    responsable: {
      type: Object,
      required: true,
    },
    conversableId: {
      type: Number,
      default: null,
    },
    conversableType: {
      type: String,
      default: null,
    },
    conversable: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      showModalSendMessage: false,
      showModalResponsableSetMissionsActive: false,
      showModalResponsableSetMissionsInactive: false,
      conversationCurrentUserAndResponsable: null,
      role: null,
      profileStats: null,
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const conversations = await apiFetch('/conversations', {
        params: {
          'filter[conversable_id]': this.conversableId,
          'filter[conversable_type]': this.conversableType,
          'filter[with_users]': `${this.responsable.user_id},${this.$stores.auth.profile.user_id}`,
        },
      })
      this.conversationCurrentUserAndResponsable = conversations.total > 0 && conversations.data[0]

      const roles = await apiFetch(`/users/${this.responsable.user_id}/roles`)
      this.role = roles.find(
        (role) => role.name === 'responsable' && role.pivot_model.id === this.conversableId
      )

      const profileStats = await apiFetch(`/statistics/profiles/${this.responsable.id}`)
      this.profileStats = profileStats
    },
    handleClickSendMessage() {
      if (this.conversationCurrentUserAndResponsable) {
        this.$router.push(`/messages/${this.conversationCurrentUserAndResponsable.id}`)
      } else {
        this.showModalSendMessage = true
      }
    },
    afterSetMissionsIsActive() {
      this.fetch()
      this.showModalResponsableSetMissionsActive = false
      this.showModalResponsableSetMissionsInactive = false
      this.$emit('updated')
    },
  },
})
</script>
