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
      icon="RiErrorWarningLine"
      title="Supprimer l'invitation"
      :is-open="showAlertDeleted"
      @confirm="handleConfirmDeleteInvitation()"
      @updated="fetch"
      @cancel="showAlertDeleted = false"
    >
      L'invitation pour {{ invitationSelected.email }} sera supprimée.
    </BaseAlertDialog>

    <BaseSectionHeading
      :title="`${$numeral(queryResult.total)} ${$filters.pluralize(
        queryResult.total,
        'invitation',
        'invitations',
        false
      )} en attente`"
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

    <CustomSearchFilters class="mb-4" @reset-filters="deleteAllFilters">
      <DsfrInput
        type="search"
        size="lg"
        placeholder="Recherche par emails..."
        icon="RiSearchLine"
        :modelValue="$route.query['filter[search]']"
        @update:modelValue="changeFilter('filter[search]', $event)"
      />
      <template #prefilters>
        <div class="flex gap-3 items-center">
          <span class="text-base">Trier par</span>
          <BaseFilterSelectAdvanced
            key="sort"
            name="sort"
            :options="[
              { key: '-created_at', label: 'Les plus récentes' },
              { key: 'created_at', label: 'Les plus anciennes' },
              { key: '-last_sent_at', label: 'Les dernières envoyées' },
            ]"
            :modelValue="$route.query['sort']"
            placeholder="Les plus récentes"
            @update:modelValue="changeFilter('sort', $event)"
          />
          <div aria-hidden class="bg-gray-600 mx-1 w-[1px] h-6" />
        </div>

        <BaseFilterSelectAdvanced
          :key="`role-${$route.fullPath}`"
          name="role"
          placeholder="Rôles"
          :options="[
            { key: 'benevole', label: 'Bénévole' },
            { key: 'responsable_organisation', label: 'Responsable d\'organisation' },
            { key: 'responsable_antenne', label: 'Responsable d\'antenne' },
            { key: 'responsable_reseau', label: 'Responsable de réseau' },
            { key: 'responsable_territoire', label: 'Responsable de territoire' },
            { key: 'referent_departemental', label: 'Référent départemental' },
            { key: 'referent_regional', label: 'Référent régional' },
          ]"
          :modelValue="$route.query['filter[role]']"
          clearable
          @update:modelValue="changeFilter('filter[role]', $event)"
        />
        <BaseFilterSelectAdvanced
          name="department"
          :options="
            $labels.departments.map((option) => {
              return {
                key: option.key,
                label: `${option.key} - ${option.label}`,
              }
            })
          "
          :searchable="true"
          :modelValue="$route.query['filter[department]']"
          placeholder="Départements"
          @update:modelValue="changeFilter('filter[department]', $event)"
        />
        <BaseFilterInputAutocomplete
          v-model="selectedOrganisation"
          label="Organisations"
          name="autocomplete-organisations"
          :options="autocompleteOptionsOrga"
          :loading="loadingFetchOrganisations"
          @fetch-suggestions="onFetchSuggestionsOrga"
          @selected="onSelectOrganisation"
        />
        <BaseFilterInputAutocomplete
          v-model="selectedReseau"
          label="Réseaux"
          name="autocomplete-reseau"
          :options="autocompleteOptionsReseau"
          :loading="loadingFetchReseaux"
          @fetch-suggestions="onFetchSuggestionsReseau"
          @selected="onSelectReseau"
        />
      </template>
    </CustomSearchFilters>

    <BaseTable v-if="queryResult.total" :overflow="false">
      <BaseTableHead>
        <BaseTableHeadCell>E-mail</BaseTableHeadCell>
        <BaseTableHeadCell> Invité par </BaseTableHeadCell>
        <BaseTableHeadCell> Action </BaseTableHeadCell>
      </BaseTableHead>
      <BaseTableBody>
        <BaseTableRow v-for="invitation in queryResult.data" :key="invitation.id">
          <BaseTableRowCell class="">
            <div class="font-medium text-gray-900 truncate">
              {{ invitation.email }}
            </div>
            <div class="text-gray-500 text-xs truncate">
              {{ roleLabel(invitation.role) }} - {{ roleContext(invitation) }}
            </div>
            <div class="text-gray-500 text-xs truncate"></div>
          </BaseTableRowCell>
          <BaseTableRowCell class="max-w-[300px]">
            <div class="font-medium text-gray-900 truncate">
              {{ invitation.user.profile.full_name }}
            </div>
            <div class="text-gray-500 text-xs truncate">
              Le {{ $dayjs(invitation.last_sent_at).format('D MMM YYYY HH:mm:ss') }}
            </div>
          </BaseTableRowCell>
          <BaseTableRowCell class="max-w-[120px]">
            <BaseDropdown>
              <template #button>
                <DsfrButton type="secondary" size="sm" icon="RiSettings4Line">Actions</DsfrButton>
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

    <CustomEmptyState v-if="queryResult.total === 0 && !queryLoading" />

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
        include: 'user.profile',
      },
      loadingFetchReseaux: true,
      loadingFetchOrganisations: false,
      autocompleteOptionsOrga: [],
      autocompleteOptionsReseau: [],
    }
  },
  computed: {
    selectedReseau() {
      return {
        key: Number(this.$route.query['filter[reseau.id]']) || undefined,
        label: this.$route.query['reseau.name'],
      }
    },
    selectedOrganisation() {
      return {
        key: Number(this.$route.query['filter[structure.id]']) || undefined,
        label: this.$route.query['organisation.name'],
      }
    },
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
      switch (invitation.role) {
        case 'responsable_organisation':
        case 'responsable_reseau':
        case 'responsable_antenne':
        case 'responsable_territoire':
          return invitation.invitable.name
        case 'referent_departemental':
          return invitation.properties.referent_departemental
        case 'referent_regional':
          return invitation.properties.referent_regional
        case 'benevole':
          return 'Bénévole'
        default:
          return ''
      }
    },
    async onFetchSuggestionsOrga(value) {
      this.loadingFetchOrganisations = true
      const organisations = await apiFetch('/structures', {
        params: {
          'filter[search]': value,
          pagination: 20,
        },
      })
      this.autocompleteOptionsOrga = organisations.data
      this.loadingFetchOrganisations = false
    },
    async onFetchSuggestionsReseau(value) {
      this.loadingFetchReseaux = true
      const reseaux = await apiFetch('/reseaux', {
        params: {
          'filter[search]': value,
          pagination: 20,
        },
      })
      this.autocompleteOptionsReseau = reseaux.data
      this.loadingFetchReseaux = false
    },
    async onSelectOrganisation($event) {
      const queryOrganisationName =
        $event !== null && this.$route.query['organisation.name'] !== $event?.name
          ? $event.name
          : undefined
      const queryOrganisationId =
        $event !== null && Number(this.$route.query['filter[structure.id]']) !== $event?.id
          ? $event.id
          : undefined

      await this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: undefined,
          'organisation.name': queryOrganisationName,
          'filter[structure.id]': queryOrganisationId,
        },
      })
    },
    async onSelectReseau($event) {
      const queryReseauName =
        $event !== null && this.$route.query['reseau.name'] !== $event?.name
          ? $event.name
          : undefined
      const queryReseauId =
        $event !== null && Number(this.$route.query['filter[reseau.id]']) !== $event?.id
          ? $event.id
          : undefined

      await this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: undefined,
          'reseau.name': queryReseauName,
          'filter[reseau.id]': queryReseauId,
        },
      })
    },
  },
})
</script>
