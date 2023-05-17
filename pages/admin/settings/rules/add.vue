<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Administration', to: '/admin' },
        { text: 'Paramètres' },
        { text: 'Règles', to: `/admin/settings/rules` },
        { text: 'Nouvelle règle' }
      ]"
    />
    <div class="py-6">
      <SectionHeading title="Création d'une nouvelle règle">
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <Button variant="green" size="xl" :loading="loading" @click.native="handleSubmit">
              Enregistrer
            </Button>
          </div>
        </template>
      </Sectionheading>

      <FormRule
        ref="form"
        class="mt-8"
      />
    </div>
  </div>
</template>

<script>
import FormRule from '@/components/form/FormRule'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: { FormRule, Breadcrumb },
  middleware: 'admin',
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async handleSubmit () {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.$refs.form.handleSubmit()
      this.loading = false
    }
  }
}
</script>
