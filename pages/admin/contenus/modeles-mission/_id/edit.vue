<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Contenus' },
        { label: 'Modèles de mission', link: `/admin/contenus/modeles-mission` },
        { label: missionTemplate.title }
      ]"
    />
    <div class="py-6">
      <SectionHeading :title="missionTemplate.title">
        <template #action>
          <div class="hidden lg:flex flex-col gap-2 flex-shrink-0 items-center justify-center">
            <Button size="xl" variant="green" @click.native="$refs.form.handleSubmit()">
              Enregistrer
            </Button>
            <Link class="text-sm font-medium" @click.native="$refs.form.handleSubmit({state: 'draft'})">
              Enregistrer en brouillon
            </Link>
          </div>
        </template>
      </Sectionheading>

      <FormMissionTemplate
        ref="form"
        :mission-template="missionTemplate"
        class="my-8"
      />
      <div class="flex lg:hidden flex-col gap-2 flex-shrink-0 items-center justify-center">
        <Button size="xl" variant="green" @click.native="$refs.form.handleSubmit()">
          Enregistrer
        </Button>
        <Link class="text-sm font-medium" @click.native="$refs.form.handleSubmit({state: 'draft'})">
          Enregistrer en brouillon
        </Link>
      </div>
    </div>
  </div>
</template>

<script>
import FormMissionTemplate from '~/components/form/FormMissionTemplate.vue'

export default {
  components: { FormMissionTemplate },
  layout: 'admin',
  middleware: 'admin',
  async asyncData ({ $axios, params, error, store }) {
    const { data: missionTemplate } = await $axios.get(`/mission-templates/${params.id}`)
    if (!missionTemplate) {
      return error({ statusCode: 404 })
    }
    return {
      missionTemplate
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.form.handleSubmit()
    }

  }
}
</script>
