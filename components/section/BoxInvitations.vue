<template>
  <Box variant="flat" padding="xs">
    <AlertDialog
      theme="danger"
      title="Supprimer l'invitation"
      :text="`L'invitation pour ${invitationSelected.email}  sera supprimée.`"
      :is-open="showAlertDeleted"
      @confirm="handleConfirmDelete"
      @cancel="showAlertDeleted = false"
    />
    <Disclosure>
      <template #button="{ isOpen }">
        <div class="flex items-center group">
          <div class="font-bold flex mr-auto flex-shrink-0">
            <MailIcon class="mr-3" />{{ invitations.length | pluralize("invitation") }} en attente
          </div>
          <ChevronUpIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
          <ChevronDownIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
        </div>
      </template>
      <div class="divide-y divide-gray-200 mt-4">
        <div v-for="invitation in invitations" :key="invitation.id" class="grid grid-cols-12 gap-2 text-sm py-4">
          <div class="col-span-5 text-gray-900 font-semibold truncate flex items-center">
            {{ invitation.email }}
          </div>
          <div class="col-span-7 flex items-center justify-end">
            <div class="text-gray-500 mr-4">
              envoyée le {{ $dayjs(invitation.last_sent_at).format('D MMM YYYY') }}
            </div>

            <Dropdown :ref="`dropdown-${invitation.id}`">
              <template #button>
                <Button size="xs" variant="white">
                  Action
                </Button>
              </template>
              <template #items>
                <div class="w-56 divide-y">
                  <DropdownOptionsItem size="sm" @click.native="handleCopy(invitation)">
                    Copier le lien d'invitation
                  </DropdownOptionsItem>
                  <DropdownOptionsItem size="sm" @click.native="handleResendEmail(invitation)">
                    Renvoyer l'email
                  </DropdownOptionsItem>
                  <DropdownOptionsItem size="sm" @click.native="handleDelete(invitation)">
                    Supprimer l'invitation
                  </DropdownOptionsItem>
                </div>
              </template>
            </Dropdown>
          </div>
        </div>
      </div>
    </Disclosure>
  </Box>
</template>

<script>

export default {
  props: {
    invitations: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      invitationSelected: {},
      showAlertDeleted: false
    }
  },
  methods: {
    handleCopy (invitation) {
      navigator.clipboard.writeText(`${this.$config.appUrl}/invitations/${invitation.token}`)
        .then(() => {
          this.$refs[`dropdown-${invitation.id}`][0].show = false
          this.$toast.success("Le lien d'invitation a été copié dans votre presse papier (CTRL+V)")
        })
        .catch((err) => {
          this.$toast.error(`Votre navigateur ne permet pas de copier le lien : ${this.$config.appUrl}/invitations/${invitation.token}`)
          console.log('Something went wrong', err)
        })
    },
    handleResendEmail (invitation) {
      this.$axios.post(`/invitations/${invitation.token}/resend`).then(() => {
        this.$toast.success("L'invitation a été envoyée à " + invitation.email)
        this.$emit('updated')
      }).catch((err) => {
        console.log('Something went wrong', err)
      })
    },
    handleDelete (invitation) {
      this.invitationSelected = invitation
      this.showAlertDeleted = true
    },
    handleConfirmDelete () {
      this.$axios.delete(`/invitations/${this.invitationSelected.token}/delete`).then(() => {
        this.$toast.success("L'invitation a été supprimée : " + this.invitationSelected.email)
        this.$emit('updated')
        this.showAlertDeleted = false
      }).catch((err) => {
        console.log('Something went wrong', err)
        this.showAlertDeleted = false
      })
    }
  }

}
</script>
