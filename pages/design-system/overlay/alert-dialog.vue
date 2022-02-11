<template>
  <div class="space-y-12">
    <Box>
      <Heading :level="2" class="mb-8">
        Alert Dialog
      </Heading>
      <div class="mb-4">
        <Button variant="green" @click.native="showAlert1 = true">
          Valider
        </Button>
      </div>
      <div class="mb-4">
        <Button variant="white" @click.native="showAlert2 = true">
          Confirmer
        </Button>
      </div>
      <div class="mb-4">
        <Button variant="red" @click.native="showAlert3 = true">
          Supprimer
        </Button>
      </div>
      <AlertDialog
        v-if="showAlert1"
        :is-open="showAlert1"
        theme="success"
        title="Confirmez le changement de statut"
        text="Maecenas sit amet lorem a risus vehicula placerat. Pellentesque finibus est ut tempus varius."
        @cancel="showAlert1 = false"
        @confirm="handleConfirm($event)"
      />
      <AlertDialog
        v-if="showAlert2"
        :is-open="showAlert2"
        theme="warning"
        title="Êtes-vous sur de votre choix ?"
        text="Maecenas sit amet lorem a risus vehicula placerat. Pellentesque finibus est ut tempus varius."
        @cancel="showAlert2 = false"
        @confirm="handleConfirm($event)"
      />
      <AlertDialog
        :is-open="showAlert3"
        theme="danger"
        title="Supprimer le contenu"
        text="Maecenas sit amet lorem a risus vehicula placerat. Pellentesque finibus est ut tempus varius."
        @cancel="showAlert3 = false"
        @confirm="handleConfirm($event)"
      />
    </Box>
  </div>
</template>

<script>
export default {
  layout: 'design-system',
  data () {
    return {
      showAlert1: false,
      showAlert2: false,
      showAlert3: false
    }
  },
  methods: {
    handleConfirm () {
      alert('confirmed')
    }
  }
}
</script>
