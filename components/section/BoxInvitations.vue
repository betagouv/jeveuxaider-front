<template>
  <BaseBox variant="flat" padding="xs">
    <BaseAlertDialog
      theme="danger"
      title="Supprimer l'invitation"
      :text="`L'invitation pour ${invitationSelected.email} sera supprimée.`"
      :is-open="showAlertDeleted"
      @confirm="handleConfirmDeleteInvitation"
      @cancel="showAlertDeleted = false"
    />
    <BaseDisclosure>
      <template #button="{ isOpen }">
        <div class="flex items-center group">
          <div class="font-bold flex mr-auto flex-shrink-0 items-center">
            <RiMailLine class="mr-3 h-4" />{{
              $filters.pluralize(invitations.length, 'invitation')
            }}
            en attente
          </div>
          <RiArrowUpSLine
            v-if="isOpen"
            class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5 flex-none"
          />
          <RiArrowDownSLine
            v-else
            class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5 flex-none"
          />
        </div>
      </template>
      <div class="divide-y divide-gray-200 mt-4">
        <div v-for="invitation in invitations" :key="invitation.id" class="py-4">
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
              <div class="text-gray-400 text-xs italic">
                Le {{ $dayjs(invitation.last_sent_at).format('D MMM YYYY') }}
              </div>
            </div>
            <BaseDropdown :ref="`dropdown-${invitation.id}`">
              <template #button>
                <BaseButton size="xs" variant="white" icon="RiSettings4Line" />
              </template>
              <template #items>
                <div class="w-56 divide-y">
                  <BaseDropdownOptionsItem size="sm" @click.native="handleCopy(invitation)">
                    Copier le lien d'invitation
                  </BaseDropdownOptionsItem>
                  <BaseDropdownOptionsItem size="sm" @click.native="handleResendEmail(invitation)">
                    Renvoyer l'email
                  </BaseDropdownOptionsItem>
                  <BaseDropdownOptionsItem size="sm" @click.native="handleDelete(invitation)">
                    Supprimer l'invitation
                  </BaseDropdownOptionsItem>
                </div>
              </template>
            </BaseDropdown>
          </div>
        </div>
      </div>
    </BaseDisclosure>
  </BaseBox>
</template>

<script>
import MixinInvitation from '@/mixins/invitation'

export default defineNuxtComponent({
  mixins: [MixinInvitation],
  props: {
    invitations: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      invitationSelected: {},
      showAlertDeleted: false,
    }
  },
  methods: {
    async handleConfirmDeleteInvitation() {
      await this.handleConfirmDelete()
      this.$emit('updated')
    },
  },
})
</script>
