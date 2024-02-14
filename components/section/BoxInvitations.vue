<template>
  <div>
    <BaseAlertDialog
      icon="RiErrorWarningLine"
      title="Supprimer l'invitation"
      button-label="Supprimer"
      :is-open="showAlertDeleted"
      @confirm="handleConfirmDeleteInvitation"
      @cancel="showAlertDeleted = false"
    >
      L'invitation pour {{ invitationSelected?.email }} sera supprimée. Êtes-vous sûr ?
    </BaseAlertDialog>

    <div class="text-sm flex justify-between px-2 mb-4 items-center">
      <div class="uppercase font-semibold text-gray-600">
        {{ title }}
      </div>
      <slot name="action" />
    </div>

    <BaseBox variant="flat" padding="xs">
      <div class="divide-y divide-gray-200">
        <div v-for="invitation in visibleInvitations" :key="invitation.id" class="py-4">
          <div class="flex justify-between items-center space-x-4">
            <div class="text-sm truncate">
              <div class="font-semibold truncate text-gray-900">
                Envoyée à {{ invitation.email }}
              </div>
              <div
                v-if="invitation.properties && invitation.properties.antenne_name"
                class="text-gray-500 truncate"
              >
                {{ invitation.properties.antenne_name }}
              </div>
              <div class="text-[#666666] text-xs">
                Envoyée par {{ invitation.user.profile.full_name }} le
                {{ $dayjs(invitation.last_sent_at).format('D MMM YYYY') }}
              </div>
            </div>
            <BaseDropdown>
              <template #button>
                <DsfrButton size="sm" type="tertiary" icon="RiMoreFill" icon-only />
              </template>
              <template #items>
                <div class="w-56">
                  <BaseDropdownOptionsItem size="sm" @click="handleCopy(invitation)">
                    Copier le lien d'invitation
                  </BaseDropdownOptionsItem>
                  <BaseDropdownOptionsItem size="sm" @click="handleResendEmail(invitation)">
                    Renvoyer l'email
                  </BaseDropdownOptionsItem>
                  <BaseDropdownOptionsItem size="sm" @click="handleDelete(invitation)">
                    Supprimer l'invitation
                  </BaseDropdownOptionsItem>
                </div>
              </template>
            </BaseDropdown>
          </div>
        </div>
        <div v-if="showMoreButton" class="pt-4 mb-2">
          <DsfrLink
            class="text-jva-blue-500 text-sm"
            @click="showAll = true"
            icon="RiArrowDownSLine"
            icon-position="right"
            >Afficher toutes les invitations</DsfrLink
          >
        </div>
      </div>
    </BaseBox>
  </div>
</template>

<script>
import MixinInvitation from '@/mixins/invitation'

export default defineNuxtComponent({
  emits: ['updated'],
  mixins: [MixinInvitation],
  props: {
    title: {
      type: String,
      required: true,
    },
    invitations: {
      type: Array,
      required: true,
    },
    trimLength: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      invitationSelected: null,
      showAlertDeleted: false,
      showAll: false,
    }
  },
  computed: {
    visibleInvitations() {
      return this.showAll ? this.invitations : this.invitations.slice(0, this.trimLength)
    },
    showMoreButton() {
      return this.invitations.length > this.trimLength && this.showAll === false
    },
  },
  methods: {
    async handleConfirmDeleteInvitation() {
      await this.handleConfirmDelete()
      this.$emit('updated')
    },
  },
})
</script>
