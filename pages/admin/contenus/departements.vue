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
          <MenuAdmin />
        </div>
      </aside>
      <div class="col-span-4">
        <div class="flex flex-col gap-12">
          <SectionHeading title="Départements" />
          <div class="col-span-2 bg-yellow-100 p-4 text-sm rounded-lg">
            @TODO: Listing des départements
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuAdmin from '@/components/section/admin/MenuAdmin'
import FormErrors from '@/mixins/form/errors'

export default {
  components: {
    MenuAdmin
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
