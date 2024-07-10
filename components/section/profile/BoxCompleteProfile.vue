<template>
  <BaseBox>
    <BaseHeading as="h2" :level="3" class="text-black"> Complétez votre profil </BaseHeading>
    <div class="text-[#666666] mt-2">
      Trouvez des bénévoles plus facilement en créant des missions en lien avec nos thématiques.
    </div>
  </BaseBox>
</template>

<script>
export default defineNuxtComponent({
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {},
  methods: {},
})
</script>
