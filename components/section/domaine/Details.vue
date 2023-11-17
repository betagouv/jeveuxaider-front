<template>
  <div class="py-8 lg:py-28">
    <div class="container grid grid-cols-1">
      <h2 class="text-3xl sm:text-5xl sm:!leading-[1.1] tracking-tighter">
        <span class="relative">
          <span class="font-bold">Rejoignez le mouvement</span>
          <img
            src="/images/home/sparkle-left.svg"
            alt=""
            aria-hidden="true"
            class="hidden lg:block absolute w-[31px] h-[33px] lg:w-[61px] lg:h-[67px] top-[-12px] left-[-22px] lg:top-[-25px] lg:left-[-47px] pointer-events-none"
          />
        </span>
      </h2>
      <div class="mt-6 lg:mt-10">
        <p class="text-lg lg:text-2xl lg:leading-10">
          Sur l’ensemble du territoire français, des milliers de bénévoles et d’organisations ont
          déjà rejoint JeVeuxAider.gouv.fr pour soutenir ce domaine d'action.
        </p>
      </div>

      <div class="mt-8 lg:mt-16 grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-10">
        <div class="grid grid-cols-2 gap-0 lg:col-span-2">
          <div v-for="media in images" :key="media.id">
            <NuxtImg
              ref="carousel"
              :src="media.urls.original"
              :srcset="media.urls.carousel"
              :alt="`illustration ${domaine.name}`"
              class="object-cover w-full h-full"
              sizes="(min-width: 1024px) 16.666vw, (min-width: 768px) 33.333vw, 50vw"
              height="430"
              width="430"
              @error="$refs.carousel.$el.remove()"
            />
          </div>
        </div>

        <div class="grid gris-cols-1 gap-8 lg:gap-10">
          <div class="p-10 bg-white shadow-2xl">
            <div class="flex mb-4">
              <img
                v-for="(portrait, index) in portraits"
                :key="index"
                :src="portrait"
                alt=""
                :class="[{ '-ml-2': index !== 0 }]"
                class="portrait rounded-full"
                style="width: 52px"
              />
            </div>
            <div class="text-4xl lg:text-5xl font-bold">
              {{ $numeral(statistics.participations_count) }}
            </div>
            <div class="text-2xl font-bold">
              {{
                $filters.pluralize(
                  statistics.participations_count,
                  'bénévole mobilisé',
                  'bénévoles mobilisés',
                  false
                )
              }}
            </div>
            <div class="text-[#666666]">grâce à JeVeuxAider.gouv.fr</div>
          </div>

          <div class="group p-10 bg-white shadow-2xl cursor-pointer" @click="onClickFindMissions">
            <DsfrPeuImporteIcon class="-mt-3 w-[80px] h-[80px]" />
            <div class="text-4xl lg:text-5xl font-bold">
              {{ $numeral(statistics.missions_available_count) }}
            </div>
            <div class="text-2xl font-bold">missions disponibles</div>
            <div class="">
              <DsfrLink icon="RiArrowRightSLine" class="text-jva-blue-500"
                >sur JeVeuxAider.gouv.fr </DsfrLink
              >
            </div>
          </div>
        </div>

        <SectionDomainePartenaires :domaine="domaine" />
      </div>

      <SectionAlgoliaFacetsCities
        title="Où trouver une mission ?"
        :redirect-parameters="{
          domaines: domaine.name,
        }"
        :search-parameters="{
          filters: `domaines:&quot;${domaine.name}&quot;`,
          maxFacetHits: 7,
        }"
        class="mt-8 lg:mt-12"
      />
    </div>
  </div>
</template>

<script>
import Tag from '@/components/dsfr/Tag.vue'
import MixinDomaines from '@/mixins/domaines'
import DsfrHealthIcon from '@/components/icon/dsfr/Health.vue'
import DsfrPeuImporteIcon from '@/components/icon/dsfr/PeuImporte.vue'

export default defineNuxtComponent({
  components: {
    DsfrHealthIcon,
    DsfrPeuImporteIcon,
    Tag,
  },
  mixins: [MixinDomaines],
  props: {
    domaine: {
      type: Object,
      required: true,
    },
    statistics: {
      type: Object,
      required: true,
    },
    redirectParameters: {
      type: Object,
      required: true,
    },
  },
  computed: {
    images() {
      return this.domaine.illustrations.slice(0, 4)
    },
    portraits() {
      const portraits = []
      const randomNumbers = []
      const portraitsCount = 74 // The total number of portraits existing
      const portraitsToGetCount = Math.min(this.statistics.participations_count, 3)

      while (randomNumbers.length < portraitsToGetCount) {
        const result = Math.floor(Math.random() * portraitsCount) + 1
        if (!randomNumbers.includes(result)) {
          randomNumbers.push(result)
        }
      }

      randomNumbers.forEach((i) => {
        portraits.push(`/images/portraits/${i}.png`)
      })

      return portraits
    },
  },
  methods: {
    onIllustrationError() {
      this.$refs.illustration.$el.srcset = '/images/organisation-default-1.webp'
    },
    onClickFindMissions() {
      this.$router.push({
        path: '/missions-benevolat',
        query: {
          ...this.redirectParameters,
        },
      })
    },
  },
})
</script>
