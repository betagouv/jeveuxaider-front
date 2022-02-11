<template>
  <div class="space-y-12">
    <Box>
      <Heading :level="2" class="mb-8">
        Modal
      </Heading>
      <Button @click.native="showModal = true">
        Afficher la modal
      </Button>
      <Modal
        :is-open="showModal"
        title="Titre"
        @close="showModal = false"
      >
        Duis pellentesque nisl tellus, eu maximus lacus pharetra sed. Aenean at dignissim magna, id cursus leo. Sed blandit, ante in vulputate gravida, erat sapien tincidunt mi, sit amet accumsan nisl mi ut dui.
      </Modal>
    </Box>
  </div>
</template>

<script>
export default {
  layout: 'design-system',
  data () {
    return {
      showModal: false
    }
  }
}
</script>
