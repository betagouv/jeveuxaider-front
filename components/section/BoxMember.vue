<template>
  <BaseBox :key="responsable.id" variant="flat" padding="xs">
    <template #header>
      <div class="flex justify-between items-center mb-4">
        <BaseHeading as="h3" :level="5">
          {{ responsable.full_name }}
        </BaseHeading>
        <div
          v-if="organisation.members.length > 1"
          class="text-sm flex items-center cursor-pointer group hover:text-red-500"
          @click="handleDeleteMember(responsable)"
        >
          <div class="group-hover:block hidden">Supprimer</div>
          <div><RiDeleteBinLine class="ml-2 h-5 w-5 fill-current" /></div>
        </div>
      </div>
    </template>
    <BaseDescriptionList v-if="responsable">
      <div
        v-if="
          $stores.auth.contextRole == 'admin' &&
          (responsable.tags || profileStats?.missions_offline > 0)
        "
        class="mt-1 mb-2 flex flex-wrap gap-1"
      >
        <DsfrTag
          v-if="profileStats?.missions_offline > 0"
          :custom-theme="true"
          class="bg-jva-red-600 text-white"
        >
          {{
            $filters.pluralize(
              profileStats.missions_offline,
              'mission hors ligne',
              'missions hors ligne'
            )
          }}
        </DsfrTag>
        <DsfrTag v-for="tag in responsable.tags" :key="tag.id" size="sm">
          {{ tag.name }}
        </DsfrTag>
      </div>
      <BaseDescriptionListItem term="Rôle" :description="role?.pivot.fonction" />
      <BaseDescriptionListItem term="E-mail" :description="responsable.email" />
      <BaseDescriptionListItem term="Mobile" :description="responsable.mobile" />
      <BaseDescriptionListItem
        v-if="responsable.pivot?.fonction"
        term="Rôle"
        :description="responsable.pivot.fonction"
      />
      <BaseDescriptionListItem term="Nb missions" :description="responsable.missions_count" />
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
      <BaseDescriptionListItemMasquerade
        v-if="$stores.auth.contextRole === 'admin'"
        :profile="responsable"
      />
    </BaseDescriptionList>
    <template v-if="['admin', 'referent'].includes($stores.auth.contextRole)">
      <template v-if="conversable">
        <div class="border-t -mx-4 xl:-mx-6 mt-6 mb-4" />
        <div class="flex justify-center text-sm">
          <BaseLink @click.native="handleClickSendMessage">
            <RiMessage3Line class="h-4 w-4 mr-2" /> Envoyer un message
          </BaseLink>
          <ModalSendMessage
            :is-open="showModalSendMessage"
            :to-user="responsable"
            :conversable="conversable"
            :conversable-id="organisation.id"
            conversable-type="App\Models\Structure"
            @cancel="showModalSendMessage = false"
          />
        </div>
      </template>
    </template>

    <template
      v-if="['admin'].includes($stores.auth.contextRole) && profileStats?.missions_offline > 0"
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
      v-if="['admin'].includes($stores.auth.contextRole) && profileStats?.missions_available > 0"
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

    <ModalRemoveResponsableFromOrganisation
      v-if="memberSelected"
      :is-open="showAlertMemberDeleted"
      :responsable="memberSelected"
      :organisation="organisation"
      @cancel="showAlertMemberDeleted = false"
      @close="showAlertMemberDeleted = false"
      @submitted="$emit('removed')"
    />
  </BaseBox>
</template>

<script>
import ModalSendMessage from '@/components/modal/ModalSendMessage.vue'
import ModalRemoveResponsableFromOrganisation from '@/components/modal/ModalRemoveResponsableFromOrganisation.vue'
import ModalResponsableSetMissionsIsActive from '@/components/modal/ModalResponsableSetMissionsIsActive.vue'

export default defineNuxtComponent({
  components: {
    ModalSendMessage,
    ModalRemoveResponsableFromOrganisation,
    ModalResponsableSetMissionsIsActive,
  },
  props: {
    organisation: {
      type: Object,
      required: true,
    },
    responsable: {
      type: Object,
      required: true,
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
      memberSelected: null,
      showAlertMemberDeleted: false,
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
          'filter[conversable_id]': this.organisation.id,
          'filter[conversable_type]': 'App\\Models\\Structure',
          'filter[with_users]': `${this.responsable.user_id},${this.$stores.auth.profile.user_id}`,
        },
      })
      this.conversationCurrentUserAndResponsable = conversations.total > 0 && conversations.data[0]

      const roles = await apiFetch(`/users/${this.responsable.user_id}/roles`)
      this.role = roles.find(
        (role) => role.name === 'responsable' && role.pivot_model.id === this.organisation.id
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
    handleDeleteMember(member) {
      this.memberSelected = member
      this.showAlertMemberDeleted = true
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
