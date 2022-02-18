<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Départements' }
      ]"
    />

    <div class="grid grid-cols-5 py-12 ">
      <aside class="relative col-span-1">
        <div class="sticky top-12">
          <SecondaryMenuAdmin />
        </div>
      </aside>
      <div class="col-span-4">
        <div class="flex flex-col gap-12">
          <SectionHeading title="Migrer des missions" />
          <div class="col-span-2 bg-yellow-100 p-4 text-sm rounded-lg">
            @TODO: Script de migration des missions d'une orga
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SecondaryMenuAdmin from '@/components/section/admin/SecondaryMenuAdmin'
import FormErrors from '@/mixins/form/errors'

export default {
  components: {
    SecondaryMenuAdmin
  },

  mixins: [FormErrors],
  middleware: 'admin',
  async asyncData ({ $axios }) {

  },
  data () {
    return {
      loading: false

    }
  },
  methods: {
    onSubmit () {
      //
    }
  }
}
</script>

<style>

</style>
