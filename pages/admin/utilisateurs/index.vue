<template>
  <BaseContainerRightSidebar>
    <DrawerProfile :profile-id="drawerProfileId" @close="drawerProfileId = null" />
    <template #breadcrumb>
      <DsfrBreadcrumb
        :links="[{ text: 'Tableau de bord', to: '/dashboard' }, { text: 'Utilisateurs' }]"
      />
    </template>
    <template #sidebar>
      <BoxContext v-if="context" :key="`context-${$route.fullPath}`" :context="context" />
      <div class="flex flex-col gap-y-4 sticky top-8">
        <BaseSelectAdvanced
          :key="`role-${$route.fullPath}`"
          name="user.role"
          placeholder="Rôle"
          :options="[
            { key: 'responsable', label: 'Responsable' },
            { key: 'responsable_territoire', label: 'Responsable territorial' },
            { key: 'tete_de_reseau', label: 'Tête de réseau' },
            { key: 'referent', label: 'Référent départemental' },
            { key: 'referent_regional', label: 'Référent régional' },
            { key: 'admin', label: 'Modérateur' },
          ]"
          :modelValue="$route.query['filter[user.role]']"
          variant="transparent"
          clearable
          @update:modelValue="handleRoleChange"
        />
        <BaseSelectAdvanced
          v-if="$route.query['filter[user.role]'] === 'referent'"
          :key="`referent-department-${$route.fullPath}`"
          name="referent-department"
          placeholder="Département du référent"
          :options="
            $labels.departments.map((option) => {
              return {
                key: option.key,
                label: `${option.key} - ${option.label}`,
              }
            })
          "
          :modelValue="$route.query['filter[referent_department]']"
          variant="transparent"
          clearable
          @update:modelValue="changeFilter('filter[referent_department]', $event)"
        />
        <BaseSelectAdvanced
          v-if="$route.query['filter[user.role]'] === 'referent_regional'"
          :key="`referent-region-${$route.fullPath}`"
          name="referent-region"
          placeholder="Région du référent"
          :options="$labels.regions"
          :modelValue="$route.query['filter[referent_region]']"
          variant="transparent"
          clearable
          @update:modelValue="changeFilter('filter[referent_region]', $event)"
        />

        <BaseSelectAdvanced
          :key="`is_visible-${$route.fullPath}`"
          name="is_visible"
          placeholder="Visible dans la recherche"
          :options="[
            { key: 'true', label: 'Oui' },
            { key: 'false', label: 'Non' },
          ]"
          :modelValue="$route.query['filter[is_visible]']"
          variant="transparent"
          clearable
          @update:modelValue="changeFilter('filter[is_visible]', $event)"
        />
        <BaseSelectAdvanced
          :key="`min_participations-${$route.fullPath}`"
          name="min_participations"
          placeholder="Participations réalisées"
          :options="[
            { key: 1, label: 'Au moins 1' },
            { key: 3, label: 'Au moins 3' },
            { key: 5, label: 'Au moins 5' },
            { key: 10, label: 'Au moins 10' },
          ]"
          :modelValue="$route.query['filter[min_participations]']"
          variant="transparent"
          clearable
          @update:modelValue="changeFilter('filter[min_participations]', $event)"
        />
        <BaseSelectAdvanced
          :key="`department-${$route.fullPath}`"
          name="department"
          placeholder="Département"
          :options="
            $labels.departments.map((option) => {
              return {
                key: option.key,
                label: `${option.key} - ${option.label}`,
              }
            })
          "
          :modelValue="$route.query['filter[department]']"
          variant="transparent"
          clearable
          @update:modelValue="changeFilter('filter[department]', $event)"
        />
        <BaseInput
          :key="`zip-${$route.fullPath}`"
          name="zip"
          placeholder="Code postal"
          variant="transparent"
          :modelValue="$route.query['filter[zip]']"
          @update:modelValue="changeFilter('filter[zip]', $event)"
        />
        <BaseSelectAdvanced
          v-if="$stores.auth.contextRole == 'admin'"
          :key="`tags-${$route.fullPath}`"
          name="tags"
          placeholder="Tags"
          :options="tags"
          :modelValue="$route.query['filter[tags]']"
          variant="transparent"
          clearable
          @update:modelValue="changeFilter('filter[tags]', $event)"
        />
      </div>
    </template>
    <div>
      <BaseSectionHeading
        :title="`${$numeral(queryResult.total)} utilisateurs`"
        :loading="queryLoading"
      >
        <template #action>
          <div class="flex space-x-2">
            <DsfrButton
              v-if="
                ['referent'].includes($stores.auth.contextRole) &&
                $stores.auth.profile.can_export_profiles
              "
              type="secondary"
              icon="RiDownload2Line"
              :disabled="queryResult?.total === 0"
              :loading="exportLoading"
              @click.native="handleExport"
            >
              Exporter
            </DsfrButton>
          </div>
        </template>
      </BaseSectionHeading>
      <SearchFilters class="my-8">
        <BaseInput
          name="search"
          placeholder="Recherche par prénom, nom ou e-mail"
          icon="RiSearchLine"
          variant="transparent"
          :modelValue="$route.query['filter[search]']"
          clearable
          @update:modelValue="changeFilter('filter[search]', $event)"
        />
        <template #prefilters>
          <DsfrTag
            :key="`tous-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-active="hasActiveFilters()"
            @click.native="deleteAllFilters"
          >
            Tous
          </DsfrTag>

          <DsfrTag
            :key="`role-referents-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-active="$route.query['filter[user.role]'] == 'referent'"
            @click.native="changeFilter('filter[user.role]', 'referent')"
          >
            Référents départementaux
          </DsfrTag>

          <DsfrTag
            :key="`role-responsable-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-active="$route.query['filter[user.role]'] == 'responsable'"
            @click.native="changeFilter('filter[user.role]', 'responsable')"
          >
            Responsables d'organisations
          </DsfrTag>

          <DsfrTag
            :key="`role-tete_de_reseau-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-active="$route.query['filter[user.role]'] == 'tete_de_reseau'"
            @click.native="changeFilter('filter[user.role]', 'tete_de_reseau')"
          >
            Têtes de réseau
          </DsfrTag>
          <BaseFilterSelectAdvanced
            key="sort"
            name="sort"
            :options="[
              { key: '-created_at', label: 'Date de création' },
              {
                key: '-participations_validated_count',
                label: 'Nombre de participations réalisées',
              },
            ]"
            :modelValue="$route.query['sort']"
            placeholder="Trier par"
            @update:modelValue="changeFilter('sort', $event)"
          />
        </template>
      </SearchFilters>

      <div class="my-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardProfile
          v-for="profile in queryResult.data"
          :key="profile.id"
          :profile="profile"
          @click.native="drawerProfileId = profile.id"
        />
      </div>

      <DsfrPagination
        class="mt-12"
        :current-page="queryResult.current_page"
        :total-rows="queryResult.total"
        :per-page="queryResult.per_page"
        @page-change="changePage"
      />
    </div>
  </BaseContainerRightSidebar>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import MixinExport from '@/mixins/export'
import CardProfile from '@/components/card/CardProfile.vue'
import DrawerProfile from '@/components/drawer/DrawerProfile.vue'
import BoxContext from '@/components/section/BoxContext.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'

export default defineNuxtComponent({
  components: {
    CardProfile,
    DrawerProfile,
    BoxContext,
    SearchFilters,
  },
  mixins: [QueryBuilder, MixinExport],
  async setup() {
    const { $stores } = useNuxtApp()

    definePageMeta({
      middleware: ['authenticated'],
    })

    if (!['admin', 'referent'].includes($stores.auth.contextRole)) {
      return showError({ statusCode: 403 })
    }
  },
  data() {
    return {
      loading: false,
      endpoint: '/profiles',
      exportEndpoint: '/export/profiles',
      queryParams: {
        include: 'user,avatar',
      },
      drawerProfileId: null,
      tags: [],
    }
  },
  async mounted() {
    const terms = await apiFetch('/vocabularies/profiles/terms', {
      params: { pagination: 50 },
    })
    this.tags = terms.data.map((tag) => {
      return { key: tag.id, label: tag.name }
    })
  },
  methods: {
    handleRoleChange(role) {
      if (this.$route.query?.['filter[referent_region]']) {
        delete this.$route.query['filter[referent_region]']
      }
      if (this.$route.query?.['filter[referent_department]']) {
        delete this.$route.query['filter[referent_department]']
      }
      this.changeFilter('filter[user.role]', role)
    },
  },
})
</script>
