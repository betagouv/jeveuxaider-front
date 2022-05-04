<template>
  <div class="flex flex-col gap-12">
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Plus de chiffres', link: '/admin/numbers' },
          { label: 'Départements' },
        ]"
      />
    </portal>

    <SectionHeading
      title="Départements"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <FiltersStatistics @refetch="refetch()" />
        </div>
      </template>
    </SectionHeading>

    <div class="grid grid-cols-1 gap-12">
      <ModerationByDepartments ref="moderationByDepartments" />
    </div>
  </div>
</template>

<script>
import FiltersStatistics from '@/components/custom/FiltersStatistics'
import ModerationByDepartments from '@/components/numbers/ModerationByDepartments.vue'

export default {
  components: {
    FiltersStatistics,
    ModerationByDepartments
  },
  layout: 'statistics',
  middleware: 'admin',
  data () {
    return {}
  },
  methods: {
    refetch () {
      this.$refs.moderationByDepartments.$fetch()
    }
  }
}
</script>

<style>

</style>
