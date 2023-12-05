<template>
  <div class="flex flex-col gap-8">
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb
          :links="[
            { text: 'Administration', to: '/admin' },
            { text: 'Autre' },
            { text: 'Invitations' },
          ]"
        />
      </Teleport>
    </ClientOnly>
    <BaseDrawer
      :is-open="showDrawerInvitation"
      form-id="form-invitation"
      submit-label="Envoyer l'invitation"
      @close="showDrawerInvitation = false"
    >
      <template #title>
        <BaseHeading :level="3"> Inviter un utilisateur </BaseHeading>
      </template>
      <FormInvitation class="mt-8" @submited="handleSubmitInvitation" />
    </BaseDrawer>
    <BaseAlertDialog
      theme="danger"
      title="Supprimer l'invitation"
      :text="`L'invitation pour ${invitationSelected.email}  sera supprimée.`"
      :is-open="showAlertDeleted"
      @confirm="handleConfirmDeleteInvitation()"
      @updated="fetch"
      @cancel="showAlertDeleted = false"
    />

    <BaseSectionHeading
      :title="`${$filters.pluralize($numeral(queryResult.total), 'invitation')} en attente`"
      :loading="queryLoading"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <DsfrButton
            :loading="loading"
            icon="RiAddLine"
            @click.native="showDrawerInvitation = true"
          >
            Inviter un utilisateur
          </DsfrButton>
        </div>
      </template>
    </BaseSectionHeading>

    <BaseTable v-if="queryResult.total" :overflow="false">
      <BaseTableHead>
        <BaseTableHeadCell>E-mail</BaseTableHeadCell>
        <BaseTableHeadCell> Contexte </BaseTableHeadCell>
        <BaseTableHeadCell> Invité par </BaseTableHeadCell>
        <BaseTableHeadCell> Envoyé le </BaseTableHeadCell>
        <BaseTableHeadCell> Action </BaseTableHeadCell>
      </BaseTableHead>
      <BaseTableBody>
        <BaseTableRow v-for="invitation in queryResult.data" :key="invitation.id">
          <BaseTableRowCell class="max-w-[350px]">
            <div class="font-medium text-gray-900 truncate">
              {{ invitation.email }}
            </div>
            <div class="text-gray-500">
              {{ roleLabel(invitation.role) }}
            </div>
          </BaseTableRowCell>
          <BaseTableRowCell class="max-w-[200px]">
            <div class="text-gray-500 whitespace-pre-wrap">
              {{ roleContext(invitation) }}
            </div>
          </BaseTableRowCell>
          <BaseTableRowCell class="max-w-[200px]">
            <div class="text-gray-500">
              {{ invitation.user.profile.full_name }}
            </div>
          </BaseTableRowCell>
          <BaseTableRowCell>
            <div class="text-gray-500">
              {{ $dayjs(invitation.last_sent_at).format('D MMM YYYY') }}
            </div>
          </BaseTableRowCell>
          <BaseTableRowCell center>
            <BaseDropdown :ref="`dropdown-${invitation.id}`">
              <template #button>
                <BaseButton size="xs" variant="white" icon="RiSettings4Line" />
              </template>
              <template #items>
                <div class="w-56 py-2">
                  <BaseDropdownOptionsItem
                    key="eee"
                    size="sm"
                    @click.native="handleCopy(invitation)"
                  >
                    Copier le lien d'invitation
                  </BaseDropdownOptionsItem>
                  <BaseDropdownOptionsItem
                    key="dfdf"
                    size="sm"
                    @click.native="handleResendEmail(invitation)"
                  >
                    Renvoyer l'email
                  </BaseDropdownOptionsItem>
                  <BaseDropdownOptionsItem
                    key="sqdds"
                    size="sm"
                    @click.native="handleDelete(invitation)"
                  >
                    Supprimer l'invitation
                  </BaseDropdownOptionsItem>
                </div>
              </template>
            </BaseDropdown>
          </BaseTableRowCell>
        </BaseTableRow>
      </BaseTableBody>
    </BaseTable>

    <Pagination
      class="mt-6"
      :current-page="queryResult.current_page"
      :total-rows="queryResult.total"
      :per-page="queryResult.per_page"
      @page-change="changePage"
    />
  </div>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import MixinInvitation from '@/mixins/invitation'
import FormInvitation from '@/components/form/FormInvitation.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import DsfrButton from '@/components/dsfr/Button.vue'

export default defineNuxtComponent({
  components: {
    FormInvitation,
    Pagination,
    Breadcrumb,
    DsfrButton,
  },
  mixins: [MixinInvitation, QueryBuilder],
  setup() {
    definePageMeta({
      layout: 'admin-with-sidebar-menu',
      middleware: ['admin'],
    })
  },
  data() {
    return {
      loading: false,
      showDrawerInvitation: false,
      endpoint: '/invitations',
      invitationSelected: {},
      showAlertDeleted: false,
      queryParams: {
        'filter[role]': 'referent_departemental,referent_regional,responsable_antenne',
        include: 'user.profile',
      },
    }
  },
  methods: {
    async handleConfirmDeleteInvitation() {
      await this.handleConfirmDelete()
      this.fetch()
    },
    handleSubmitInvitation() {
      this.showDrawerInvitation = false
      this.fetch()
    },
    roleContext(invitation) {
      if (invitation.role == 'referent_regional') {
        return invitation.properties.referent_regional
      }
      if (invitation.role == 'referent_departemental') {
        return (
          invitation.properties.referent_departemental +
          ' - ' +
          this.$filters.label(invitation.properties.referent_departemental, 'departments')
        )
      }
      if (invitation.role == 'responsable_antenne') {
        return invitation.properties.antenne_name
      }
    },
  },
})
</script>
