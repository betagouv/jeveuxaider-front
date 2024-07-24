<template>
  <BaseBox :key="responsable.id" variant="flat" padding="xs">
    <template #header>
      <div class="flex justify-between items-center mb-4">
        <BaseHeading as="h3" :level="5">
          {{ responsable.full_name }}
        </BaseHeading>
        <div class="space-x-2">
          <DsfrButton
            v-if="canSendMessage"
            size="xs"
            type="tertiary"
            icon="RiMessage3Line"
            icon-only
            @click="handleClickSendMessage"
          />
          <BaseDropdown v-if="showDropdownActions">
            <template #button>
              <DsfrButton size="xs" type="tertiary" icon="RiMoreFill" icon-only />
            </template>
            <template #items>
              <div class="w-[240px]">
                <BaseDropdownOptionsItem
                  v-if="canDeleteMember"
                  size="sm"
                  @click="handleDeleteMember(responsable)"
                >
                  Retirer ce responsable
                </BaseDropdownOptionsItem>
                <BaseDropdownOptionsItem
                  v-if="canMasquerade"
                  size="sm"
                  @click="handleImpersonate()"
                >
                  Prendre sa place
                </BaseDropdownOptionsItem>
                <BaseDropdownOptionsItem
                  v-if="canSetMissionOnline"
                  size="sm"
                  @click="showModalResponsableSetMissionsActive = true"
                >
                  Mettre en ligne ses missions
                </BaseDropdownOptionsItem>
                <BaseDropdownOptionsItem
                  v-if="canSetMissionOffline"
                  size="sm"
                  @click="showModalResponsableSetMissionsInactive = true"
                >
                  Mettre hors ligne ses missions
                </BaseDropdownOptionsItem>
              </div>
            </template>
          </BaseDropdown>
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
              profileStats?.missions_offline,
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
    </BaseDescriptionList>

    <template v-if="profileStats">
      <ModalResponsableSetMissionsIsActive
        :value="true"
        :is-open="showModalResponsableSetMissionsActive"
        :responsable="responsable"
        :profile-stats="profileStats"
        @confirm="afterSetMissionsIsActive"
        @cancel="showModalResponsableSetMissionsActive = false"
      />

      <ModalResponsableSetMissionsIsActive
        :value="false"
        :is-open="showModalResponsableSetMissionsInactive"
        :responsable="responsable"
        :profile-stats="profileStats"
        @confirm="afterSetMissionsIsActive"
        @cancel="showModalResponsableSetMissionsInactive = false"
      />
    </template>

    <ModalSendMessage
      :is-open="showModalSendMessage"
      :to-user="responsable"
      :conversable="conversable"
      :conversable-id="organisation.id"
      conversable-type="App\Models\Structure"
      @cancel="showModalSendMessage = false"
    />

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
  computed: {
    showDropdownActions() {
      return this.canDeleteMember || ['admin', 'referent'].includes(this.$stores.auth.contextRole)
    },
    canDeleteMember() {
      return this.organisation.members.length > 1
    },
    canMasquerade() {
      return ['admin'].includes(this.$stores.auth.contextRole)
    },
    canSetMissionOnline() {
      return (
        ['admin'].includes(this.$stores.auth.contextRole) && this.profileStats?.missions_offline > 0
      )
    },
    canSetMissionOffline() {
      return (
        ['admin'].includes(this.$stores.auth.contextRole) &&
        this.profileStats?.missions_available > 0
      )
    },
    canSendMessage() {
      return ['admin', 'referent'].includes(this.$stores.auth.contextRole) && this.conversable
    },
  },
  methods: {
    async fetch() {
      const conversations = await apiFetch('/conversations', {
        params: {
          'filter[conversable_id]': this.organisation.id,
          'filter[conversable_type]': 'App\\Models\\Structure',
          'filter[with_users]': `${this.responsable.user_id},${this.$stores.auth.profile?.user_id}`,
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
    async handleImpersonate() {
      await this.$stores.auth.impersonate(this.responsable.user_id)
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
