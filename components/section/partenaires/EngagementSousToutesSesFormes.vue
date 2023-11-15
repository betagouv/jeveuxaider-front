<template>
  <div v-if="partenaires.length > 0" class="bg-[#F3EDE5] pb-12 md:pb-24">
    <div class="container">
      <DsfrHeading
        as="h2"
        size="alt-md"
        class="py-16 xl:pt-24 xl:pb-20 text-center max-w-[1000px] mx-auto"
      >
        <span class="relative">
          <span>{{ title }}</span>
          <img
            src="/images/home/sparkle-left.svg"
            alt=""
            width="40"
            height="43"
            aria-hidden="true"
            class="hidden lg:block absolute w-[31px] h-[33px] lg:w-[61px] lg:h-[67px] top-[-12px] left-[-22px] lg:top-[-25px] lg:left-[-47px] pointer-events-none"
          />
        </span>
      </DsfrHeading>
      <div class="flex flex-wrap justify-center gap-8">
        <template v-for="(partenaire, index) in partenaires" :key="index">
          <DsfrVisitCard
            v-if="partenaire.key === 'service-civique'"
            title="Service Civique"
            description="Engagez-vous dans une mission du Service Civique, aidez-vous vous-même et les autres, tout en étant indemnisé !"
            :link="partenaire.link"
            class="w-[384px]"
            @click="onClick(partenaire)"
          >
            <template #icon>
              <img
                src="/images/logos/service-civique.svg"
                alt="Service Civique"
                title="Service Civique"
                class="w-[50px] flex-none"
              />
            </template>
          </DsfrVisitCard>
          <DsfrVisitCard
            v-if="partenaire.key === 'france-volontaire'"
            title="France Volontaire"
            description="Vous souhaitez vous rendre utile et découvrir le monde ? Trouvez votre mission de volontariat international."
            :link="partenaire.link"
            class="w-[384px]"
            @click="onClick(partenaire)"
          >
            <template #icon>
              <img
                src="/images/logos/volontariat-international.webp"
                alt="France Volontaire"
                title="France Volontaire"
                class="w-[68px] flex-none"
              />
            </template>
          </DsfrVisitCard>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    title: {
      type: String,
      default: 'L‘engagement sous toutes ses formes',
    },
    partenaires: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onClick(partenaire) {
      this.$plausible.trackEvent('Engagement CTA sous toutes ses formes', {
        props: { title: this.title, partenaire: partenaire.key },
      })

      window.open(partenaire.link, '_blank').focus()
    },
  },
})
</script>
