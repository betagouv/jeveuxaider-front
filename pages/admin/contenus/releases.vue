<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Releases' }
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
          <SectionHeading title="Releases" />
          <div class="col-span-2 bg-yellow-100 p-4 text-sm rounded-lg">
            @TODO: Listing des Releases
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuAdmin from '@/components/section/admin/MenuAdmin'
import MixinForm from '@/mixins/form'

export default {
  components: {
    MenuAdmin
  },
  mixins: [MixinForm],
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
