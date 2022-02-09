<template>
  <Container2Cols>
    <template #breadcrumb>
      <Breadcrumb
        :items="[{ label: 'Mes paramètres' }]"
      />
    </template>
    <template #header>
      <SectionHeading title="Paramètres de compte" />
    </template>
    <template #left>
      <Box>
        <Heading as="h2" :level="3" class="mb-8">
          Modification de votre mot de passe
        </Heading>
        <FormPassword />
      </Box>
    </template>
    <template #right>
      <Box>
        <Heading as="h3" :level="3" class="mb-8">
          Désinscription
        </Heading>
        <div class="text-gray-600 mb-8">
          Vous souhaitez désactiver votre compte ?<br><br> Attention, cette action est irréversible et toutes vos données de la plateforme JeVeuxAider.gouv.fr seront anonymisées.
        </div>
        <div class="ml-auto">
          <Button variant="white" size="lg" type="submit">
            Je souhaite me désinscrire
          </Button>
        </div>
      </Box>
    </template>
  </Container2Cols>
</template>

<script>
import FormPassword from '@/components/form/FormPassword.vue'

export default {
  components: {
    FormPassword
  },
  middleware: 'authenticated',
  data () {
    return {

    }
  },
  created () {

  }
}
</script>

<style>

</style>
