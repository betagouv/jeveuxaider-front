<template>
  <BaseBox variant="shadow">
    <BaseHeading as="h2" :level="3"> Nos campagnes et temps forts</BaseHeading>
    <div class="text-[#666666] mt-2">
      Trouvez des bénévoles plus facilement en créant des missions en lien avec nos thématiques.
    </div>

    <div class="flex flex-col gap-4 mt-6 lg:mt-8">
      <a
        :href="operation.link"
        target="_blank"
        v-for="(operation, i) in firstThreeOperations"
        :key="i"
        class="flex justify-center items-center gap-4 lg:gap-6 p-4 lg:p-6 border hover:shadow-md"
      >
        <div class="hidden lg:block">
          <img :src="operation.icon" :alt="operation.title" class="h-[48px] w-auto" />
        </div>
        <div class="flex-1">
          <div class="flex justify-between">
            <div class="text-gray-900 font-semibold">
              {{ operation.title }}
            </div>
            <div>
              <DsfrBadge v-if="isOperationInProgress(operation)" size="sm" type="yellow"
                >En cours</DsfrBadge
              >
              <DsfrBadge v-else size="sm" type="gray">À venir</DsfrBadge>
            </div>
          </div>
          <div class="text-[#666666] text-sm">{{ operation.subtitle }}</div>
          <div class="flex flex-wrap gap-2 mt-4">
            <DsfrTag size="sm" v-for="(tag, j) in operation.tags" :key="j">{{ tag }}</DsfrTag>
          </div>
        </div>
      </a>
    </div>
    <div class="mt-8">
      <a
        href="https://www.jeveuxaider.gouv.fr/engagement/campagnes-mobilisation-nationale/"
        target="_blank"
      >
        <DsfrButton type="secondary">Nos campagnes de mobilisation nationale</DsfrButton>
      </a>
    </div>
  </BaseBox>
</template>

<script>
export default defineNuxtComponent({
  components: {},
  props: {},
  data() {
    return {
      operations: [
        {
          title: 'Canicule et vagues de chaleur',
          icon: '/images/operations/vague-de-chaleur.png',
          subtitle: 'Du 1er juillet au 31 août',
          tags: ['Prévention canicule', 'Santé'],
          link: 'https://www.jeveuxaider.gouv.fr/engagement/canicule/',
          start_date: {
            month: 7,
            day: 1,
          },
          end_date: {
            month: 8,
            day: 31,
          },
        },
        {
          title: 'Septembre pour apprendre',
          icon: '/images/operations/septembre-pour-apprendre.svg',
          subtitle: 'Du 1er au 30 septembre',
          tags: ['Mentorat', 'Soutien scolaire', 'Ateliers éducatifs'],
          link: 'https://www.jeveuxaider.gouv.fr/engagement/septembre-pour-apprendre/',
          start_date: {
            month: 9,
            day: 1,
          },
          end_date: {
            month: 9,
            day: 30,
          },
        },
        {
          title: 'Décembre ensemble',
          icon: '/images/operations/operation-decembre-ensemble.png',
          subtitle: 'Du 1er au 30 novembre',
          tags: ['Solidarité et insertion', 'Lutte contre l’isolement ', 'Distribution', 'Maraude'],
          link: 'https://www.jeveuxaider.gouv.fr/engagement/decembre-ensemble/',
          start_date: {
            month: 11,
            day: 1,
          },
          end_date: {
            month: 11,
            day: 30,
          },
        },
        {
          title: 'Printemps pour la Planète',
          icon: '/images/operations/logo-printemps-pour-la-planete.svg',
          subtitle: 'Du 1er au 30 avril',
          tags: ['Protection de la nature', 'Sensibilisation', 'Travaux manuels'],
          link: 'https://www.jeveuxaider.gouv.fr/engagement/printemps-pour-la-planete/',
          start_date: {
            month: 4,
            day: 1,
          },
          end_date: {
            month: 4,
            day: 30,
          },
        },
        {
          title: 'La Tournée d’Été',
          icon: '/images/operations/logo-la-tournee-de-lete.svg',
          subtitle: 'Du 1er au 30 juin',
          tags: ['Culture', 'Sport', 'Loisirs'],
          link: 'https://www.jeveuxaider.gouv.fr/engagement/la-tournee-dete-cap-sur-les-solidarites-estivales/',
          start_date: {
            month: 6,
            day: 1,
          },
          end_date: {
            month: 6,
            day: 30,
          },
        },
      ],
    }
  },
  computed: {
    firstThreeOperations() {
      return this.sortedOperations.slice(0, 3)
    },
    sortedOperations() {
      const today = new Date()
      const currentYear = today.getFullYear()
      const nextYear = currentYear + 1

      const currentDateValue = (month, day, year) => new Date(year, month - 1, day).getTime()

      return this.operations
        .map((operation) => {
          const startDateThisYear = currentDateValue(
            operation.start_date.month,
            operation.start_date.day,
            currentYear
          )
          const endDateThisYear = currentDateValue(
            operation.end_date.month,
            operation.end_date.day,
            currentYear
          )
          const startDateNextYear = currentDateValue(
            operation.start_date.month,
            operation.start_date.day,
            nextYear
          )

          const isCurrentYear = today.getTime() <= endDateThisYear

          const startDateValue = isCurrentYear ? startDateThisYear : startDateNextYear
          const endDateValue = isCurrentYear
            ? endDateThisYear
            : currentDateValue(operation.end_date.month, operation.end_date.day, nextYear)

          return {
            ...operation,
            startDateValue,
            endDateValue,
          }
        })
        .sort((a, b) => {
          if (a.endDateValue >= today.getTime() && b.endDateValue < today.getTime()) return -1
          if (a.endDateValue < today.getTime() && b.endDateValue >= today.getTime()) return 1
          return a.startDateValue - b.startDateValue
        })
    },
  },
  methods: {
    isOperationInProgress(operation) {
      const now = new Date()
      const start = new Date(
        now.getFullYear(),
        operation.start_date.month - 1,
        operation.start_date.day
      )
      const end = new Date(now.getFullYear(), operation.end_date.month - 1, operation.end_date.day)
      return now >= start && now <= end
    },
  },
})
</script>
