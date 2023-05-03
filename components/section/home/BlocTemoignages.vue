<template>
  <div class="relative bg-[#6A6AF4] overflow-hidden">
    <div class="container py-12 xl:pt-24 xl:pb-16">
      <div class="lg:flex lg:justify-between lg:items-center lg:gap-6 xl:gap-8">
        <div class="">
          <Heading as="h2" size="alt-sm" class="mb-6 md:mb-2" color="text-white">
            Paroles de bénévoles
          </Heading>
          <p id="label-slideshow-temoignages" class="text-white text-xl xl:text-2xl">
            Découvrez les témoignages des bénévoles de la communauté JeVeuxAider.gouv.fr
          </p>
        </div>
        <div class="hidden lg:block flex-none">
          <SlideshowArrows
            :key="slideshowKey"
            variant="white"
            button-class="hover:bg-[#6666EA]"
            ref-name="slideshowTemoignages"
            :refs="$refs"
            @previous="handleSlideshowPreviousClick"
            @next="handleSlideshowNextClick"
          />
        </div>
      </div>
      <div v-if="temoignages.length" class="mt-12">
        <Slideshow
          ref="slideshowTemoignages"
          :key="slideshowKey"
          aria-labelledby="label-slideshow-temoignages"
          :adaptive-height="isSlideshowAdaptativeHeight"
          dots-variant="light"
        >
          <CardQuote v-for="(temoignage, i) in temoignages" :key="i" :quote="temoignage" />
        </Slideshow>
      </div>
    </div>

    <div class="flex justify-center">
      <img
        aria-hidden="true"
        srcset="
        /images/home/temoignages.webp,
        /images/home/temoignages@2x.webp 2x,
        /images/home/temoignages.png,
        /images/home/temoignages@2x.png 2x
      "
        src="/images/home/temoignages.png"
        alt=""
        width="1754"
        height="238"
        class="h-[110px] w-[818px] md:h-[119px] md:w-[877px] lg:h-[132px] lg:w-[976px] xl:h-[238px] xl:w-[1754px] mx-auto object-cover object-top pointer-events-none select-none"
      >
    </div>
  </div>
</template>

<script>
import Heading from '@/components/dsfr/Heading.vue'
import CardQuote from '@/components/card/CardQuote.vue'

export default {
  components: {
    Heading,
    CardQuote
  },
  data () {
    return {
      temoignages: [
        {
          content: 'Experience très positive qui m\'a permise d\'être utile envers les autres, mais aussi de rencontrer des belles personnes. Je me suis désormais active dans la Banque Alimentaire près de chez moi deux matinées par semaine&nbsp;<span aria-hidden="true">🙂</span>',
          author: {
            name: 'Anne-Marie',
            image: {
              default: '/images/temoignages/portraits/annemarie.jpg',
              x2: '/images/temoignages/portraits/annemarie@2x.jpg'
            }
          },
          organization: {
            name: 'Banque Alimentaire',
            logo: {
              default: '/images/temoignages/organisations/banques_alimentaires.png',
              x2: '/images/temoignages/organisations/banques_alimentaires@2x.png',
              width: 150,
              height: 34
            }
          }
        },
        {
          content: 'Une expérience formidable avec un super groupe de vacanciers et d\'accompagnateurs. On s\'est vite sentis comme en famille. Hâte de partir à nouveau avec l\'APF l\'année prochaine &nbsp;!',
          author: {
            name: 'Romain',
            image: {
              default: '/images/temoignages/portraits/romain.jpg',
              x2: '/images/temoignages/portraits/romain@2x.jpg'
            }
          },
          organization: {
            name: 'APF Evasion France Handicap',
            logo: {
              default: '/images/temoignages/organisations/APF_Evasion_France_Handicap.svg',
              x2: null,
              width: 95,
              height: 60
            }
          }
        },
        {
          content: 'Superbe et enrichissante. En tant que bénévole arbitre j’ai rencontré des joueurs tolérants passionnés qui ont la passion au dessus de l’enjeu. Une expérience sans pareil.',
          author: {
            name: 'Romaric',
            image: {
              default: '/images/temoignages/portraits/romaric.webp'
            }
          },
          organization: {
            name: 'Comité Départemental du Sport Adapté Drôme - Ardèche',
            logo: {
              default: '/images/temoignages/organisations/comite_departemental_sport_adapte_drome_ardeche.webp',
              x2: null
            }
          }
        },
        {
          content: 'Très belle expérience, une magnifique équipe, de beaux moments passés, beau spectacle.',
          author: {
            name: 'Ange',
            image: {
              default: '/images/temoignages/portraits/ange.webp'
            }
          },
          organization: {
            name: 'Le Temps des Rues',
            logo: {
              default: '/images/temoignages/organisations/le_temps_des_rues.webp',
              x2: null
            }
          }
        },
        {
          content: 'Bel échange et super accompagnement par l\'équipe. On se sent utile et les ateliers sont super bien encadrés !',
          author: {
            name: 'Maud'
          },
          organization: {
            name: 'Kodiko',
            logo: {
              default: '/images/temoignages/organisations/kodiko.webp',
              x2: null
            }
          }
        },
        {
          content: 'J’ai adoré cette expérience. L’équipe est formidable et les bénévoles sont tellement admirables. Pour une première, j’ai adoré. Un grand merci&nbsp;<span aria-hidden="true">🙏🏽</span>',
          author: {
            name: 'Kevin',
            image: {
              default: '/images/temoignages/portraits/kevin.webp'
            }
          },
          organization: {
            name: 'TRIATHL\'AIX',
            logo: {
              default: '/images/temoignages/organisations/triathlaix.webp',
              x2: null
            }
          }
        },
        {
          content: 'Très bonne expérience. J\'ai pû voir l\'organisation d\'un bureau de vote. Et par la même occasion rencontrer des gens très sympathiques!',
          author: {
            name: 'Corinne'
          },
          organization: {
            name: 'Commune de Beaussais-sur-Mer',
            logo: {
              default: '/images/temoignages/organisations/beaussais_sur_mer.webp',
              x2: null
            }
          }
        }
      ],
      isSlideshowAdaptativeHeight: true,
      slideshowKey: 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
      this.onResize()
    })
  },
  methods: {
    handleSlideshowPreviousClick () {
      this.$refs.slideshowTemoignages.previous()
    },
    handleSlideshowNextClick () {
      this.$refs.slideshowTemoignages.next()
    },
    onResize () {
      if (window.innerWidth >= 768) {
        this.isSlideshowAdaptativeHeight = false
      } else {
        this.isSlideshowAdaptativeHeight = true
      }
      this.slideshowKey++
    }
  }
}
</script>

<style lang="postcss" scoped>
:deep(.slick-track) {
  width: 100% !important;
}

:deep(.slick-slide) {
  width: 100%;
  flex: none;
  max-width: 708px !important;
}

blockquote {
  &::before {
    content: '\00AB ';
  }
  &::after {
    content: ' \00BB';
  }
}
</style>
