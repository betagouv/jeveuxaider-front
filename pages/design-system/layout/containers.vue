<template>
  <div>
    <Heading as="h1" :level="2" class="mb-8">
      Containers
    </Heading>
    <Heading as="h2" :level="3" class="mb-8">
      Container2Cols
    </Heading>
    <Container2Cols>
      <template #breadcrumb>
        <Box>
          Slot name Breadcrumb
        </Box>
      </template>
      <template #header>
        <Box>
          Slot name header
        </Box>
      </template>
      <template #left>
        <Box>
          Slot name left
        </Box>
      </template>
      <template #right>
        <Box>
          Slot name right
        </Box>
      </template>
      <template #footer>
        <Box>
          Slot name footer
        </Box>
      </template>
    </Container2Cols>
  </div>
</template>

<script>
export default {
  layout: 'design-system'
}
</script>
