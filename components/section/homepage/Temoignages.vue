<template>
  <section class="py-16 bg-[#ECECFE] overflow-hidden relative">
    <img
      src="/images/homepage/deco_2.svg"
      alt=""
      class="deco--2 absolute hidden lg:block pointer-events-none"
      data-not-lazy
    >

    <img
      src="/images/homepage/deco_3.svg"
      alt=""
      class="deco--3 absolute hidden lg:block pointer-events-none"
      data-not-lazy
    >

    <div class="container mx-auto px-4 ">
      <Heading :id="`label-paroles-benevoles-${uuid}`" as="h2" size="2xl" class="text-center">
        Paroles de bénévoles
      </Heading>

      <Slideshow
        :settings="settings"
        class="mt-12"
        :aria-labelledby="`label-paroles-benevoles-${uuid}`"
      >
        <div v-for="testimony,index in testimonies" :key="index">
          <div
            class="testimony--wrapper flex flex-col items-center space-y-6 text-center max-w-[768px] mx-auto lg:flex-row lg:text-left lg:space-y-0"
          >
            <div class="flex-none rounded-full bg-white w-[184px] h-[184px] flex items-center justify-center">
              <img
                :src="testimony.organization.logo.default"
                :srcset="
                  testimony.organization.logo.x2
                    ? `${testimony.organization.logo.x2} 2x`
                    : false
                "
                :alt="testimony.organization.name"
                class="flex-none max-w-[120px] max-h-[60px] object-contain w-full h-full"
                :width="testimony.organization.logo.width"
                :height="testimony.organization.logo.height"
                data-not-lazy
              >
            </div>

            <div class="hidden lg:flex flex-none self-stretch w-[1px] bg-[#C1C1FB] mx-8" />

            <div>
              <RiDoubleQuotesL class="text-[#8B8BF6] fill-current w-6 h-6 mb-4 hidden lg:block" />

              <blockquote class="text-[#161616] text-xl font-bold" v-html="testimony.content" />

              <div class="text-center lg:text-left mt-4">
                <div class="font-bold text-[#3A3A3A]">
                  {{ testimony.author.name }}
                </div>
                <div class="text-[#666666] text-xs mt-1">
                  Bénévole chez <span class="uppercase"> {{ testimony.organization.name }} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slideshow>
    </div>
  </section>
</template>

<script>
import Heading from '@/components/dsfr/Heading.vue'
import uuid from '@/mixins/uuid'

export default {
  components: {
    Heading
  },
  mixins: [uuid],
  data () {
    return {
      testimonies: [
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
      settings: {
        arrows: true,
        dots: true,
        speed: 500,
        edgeFriction: 0,
        touchThreshold: 100,
        infinite: true
      }
    }
  }
}
</script>

<style lang="postcss" scoped>

.deco--2 {
  left: calc(50% - 728px);
  top: 50px;
}

.deco--3 {
  right: calc(50% - 728px);
  top: -12px;
}

.testimony--wrapper {
  @screen sm {
    width: calc(100% - 150px);
  }
}

:deep(.slick-slider) {
  .wrapper--slick-dots {
    display: block !important;
  }

  .slick-dots {
    @apply !text-center !mr-0;
    @screen xl {
      display: none !important;
    }
  }

  .slick-track {
    @apply space-x-0;
  }

  .slick-list {
    overflow: hidden;
  }
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
