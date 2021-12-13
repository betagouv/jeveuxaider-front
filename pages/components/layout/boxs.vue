<template>
  <div>
    <Heading as="h2" :level="3" class="mb-8">
      Boxs
    </Heading>
    <div class="grid grid-cols-2 gap-6">
      <Box>
        <Heading as="h3" :level="3" class="mb-8">
          Shadow
        </Heading>
        {{ lorem }}
      </Box>
      <Box variant="flat">
        <Heading as="h3" :level="3" class="mb-8">
          Flat
        </Heading>
        {{ lorem }}
      </Box>
      <Box padding="sm">
        <Heading as="h3" :level="3" class="mb-8">
          Small Padding
        </Heading>
        {{ lorem }}
      </Box>
      <Box padding="xs">
        <Heading as="h3" :level="3" class="mb-8">
          Extra Small Padding
        </Heading>
        {{ lorem }}
      </Box>
      <Box :padding="false">
        <img
          src="/images/bg_header_mission.jpg"
          alt="Mission bénévolat"
        >
        <Heading as="h3" :level="3" class="mb-8">
          No Padding
        </Heading>
      </Box>
      <Box loading />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'components',
  data () {
    return {
      lorem: 'Postremo ad id indignitatis est ventum, ut cum peregrini arum liberalium inpendio paucis sine respiratione ulla extrusis, tenerentur minimarum adseclae veri, quique id simularunt ad tempus, et tria milia saltatricum ne interpellata quidem cum choris totidemque remanerent magistris.'
    }
  }
}
</script>
