<template>
  <div class="space-y-12">
    <Heading as="h2" :level="2" class="mb-8">
      List
    </Heading>
    <Heading as="h2" :level="3" class="mb-8">
      Simple
    </Heading>
    <Box>
      <StackedList :divided="false">
        <StackedListItem>
          Lorem ipsum dolor sit amet
        </StackedListItem>
        <StackedListItem>Facilisis in pretium nisl aliquet</StackedListItem>
        <StackedListItem icon="🔎">
          With icon adipiscing elit
        </StackedListItem>
        <StackedListItem icon="📇" icon-variant="info">
          With icon variant molestie lorem at massa
        </StackedListItem>
      </StackedList>
    </Box>
    <Heading as="h2" :level="3" class="mb-8">
      Divided
    </Heading>
    <Box>
      <StackedList>
        <StackedListItem>
          Lorem ipsum dolor sit amet
        </StackedListItem>
        <StackedListItem>Facilisis in pretium nisl aliquet</StackedListItem>

        <StackedListItem icon="🔎">
          With icon adipiscing elit
        </StackedListItem>
        <StackedListItem icon="📇" icon-variant="warning">
          With icon variant molestie lorem at massa
        </StackedListItem>
      </StackedList>
    </Box>
  </div>
</template>

<script>
export default {
  layout: 'components',
  data () {
    return {
      form: {}
    }
  }
}
</script>
