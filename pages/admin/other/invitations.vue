<template>
  <div class="flex flex-col gap-8">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Autre' },
          { label: 'Invitations' }
        ]"
      />
    </portal>
    <Drawer :is-open="showDrawerInvitation" form-id="form-invitation" submit-label="Envoyer l'invitation" @close="showDrawerInvitation = false">
      <template #title>
        <Heading :level="3">
          Inviter un utilisateur
        </Heading>
      </template>
      <FormInvitation
        class="mt-8"
        @submited="handleSubmitInvitation"
      />
    </Drawer>
    <AlertDialog
      theme="danger"
      title="Supprimer l'invitation"
      :text="`L'invitation pour ${invitationSelected.email}  sera supprimée.`"
      :is-open="showAlertDeleted"
      @confirm="handleConfirmDeleteInvitation()"
      @updated="$fetch"
      @cancel="showAlertDeleted = false"
    />

    <SectionHeading :title="`${$options.filters.pluralize($options.filters.formatNumber(queryResult.total), 'invitation')} en attente`">
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <Button size="lg" :loading="loading" icon="PlusIcon" @click.native="showDrawerInvitation = true">
            Inviter un utilisateur
          </Button>
        </div>
      </template>
    </SectionHeading>

    <Table v-if="queryResult.total" :overflow="false">
      <TableHead>
        <TableHeadCell>E-mail</TableHeadCell>
        <TableHeadCell center>
          Rôle
        </TableHeadCell>
        <TableHeadCell center>
          Contexte
        </TableHeadCell>
        <TableHeadCell center>
          Envoyé le
        </TableHeadCell>
        <TableHeadCell center>
          Action
        </TableHeadCell>
      </TableHead>
      <TableBody>
        <TableRow
          v-for="invitation in queryResult.data"
          :key="invitation.id"
        >
          <TableRowCell>
            <div class="font-medium text-gray-900">
              {{ invitation.email }}
            </div>
          </TableRowCell>
          <TableRowCell center>
            <div class="text-gray-500">
              {{ roleLabel(invitation.role) }}
            </div>
          </TableRowCell>
          <TableRowCell>
            <div class="text-gray-500">
              {{ roleContext(invitation) }}
            </div>
          </TableRowCell>
          <TableRowCell center>
            <div class="text-gray-500">
              {{ $dayjs(invitation.last_sent_at).format('D MMM YYYY') }}
            </div>
          </TableRowCell>
          <TableRowCell center>
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
          </TableRowCell>
        </TableRow>
      </TableBody>
    </Table>

    <Pagination
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
import FormInvitation from '@/components/form/FormInvitation'

export default {
  components: {
    FormInvitation
  },
  mixins: [MixinInvitation, QueryBuilder],
  layout: 'admin-with-sidebar-menu',
  middleware: 'admin',
  data () {
    return {
      loading: false,
      showDrawerInvitation: false,
      endpoint: '/invitations',
      invitationSelected: {},
      showAlertDeleted: false,
      queryParams: {
        'filter[role]': 'referent_departemental,referent_regional,responsable_antenne'
      }
    }
  },
  methods: {
    async handleConfirmDeleteInvitation () {
      await this.handleConfirmDelete()
      this.$fetch()
    },
    handleSubmitInvitation () {
      this.showDrawerInvitation = false
      this.$fetch()
    },
    roleContext (invitation) {
      if (invitation.role == 'referent_regional') {
        return invitation.properties.referent_regional
      }
      if (invitation.role == 'referent_departemental') {
        return invitation.properties.referent_departemental + ' - ' + this.$options.filters.label(invitation.properties.referent_departemental, 'departments')
      }
      if (invitation.role == 'responsable_antenne') {
        return invitation.properties.antenne_name
      }
    }
  }
}
</script>
