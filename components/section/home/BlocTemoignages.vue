<template>
  <div class="relative bg-[#6A6AF4]">
    <div class="px-4 py-12">
      <Heading as="h2" size="alt-xs" class="mb-6" color="text-white">
        Paroles de bénévoles
      </Heading>
      <p id="label-slideshow-temoignages" class="text-white text-xl">
        Découvrez les témoignages des bénévoles de la communauté JeVeuxAider.gouv.fr
      </p>
      <div v-if="temoignages.length" class="overflow-hidden mt-12">
        <Slideshow
          aria-labelledby="label-slideshow-temoignages"
          :adaptive-height="true"
          dots-variant="light"
        >
          <div
            v-for="temoignage,i in temoignages"
            :key="i"
            class="slide-wrapper bg-white p-6"
          >
            <img
              :src="temoignage.organization.logo.default"
              :srcset="
                temoignage.organization.logo.x2
                  ? `${temoignage.organization.logo.x2} 2x`
                  : false
              "
              :alt="temoignage.organization.name"
              class="flex-none max-w-[120px] max-h-[60px] object-contain w-full h-full mt-6 mb-12 mx-auto"
              :width="temoignage.organization.logo.width"
              :height="temoignage.organization.logo.height"
              data-not-lazy
            >
            <RiChatQuoteLine aria-hidden="true" class="text-[#8B8BF6] fill-current w-6 h-6" />
            <blockquote class="text-[#161616] text-xl font-bold" v-html="temoignage.content" />
            <div class="mt-4">
              <p class="font-bold text-[#3A3A3A]">
                {{ temoignage.author.name }}
              </p>
              <p class="text-[#666666] text-xs mt-1">
                Bénévole chez <span class="uppercase"> {{ temoignage.organization.name }} </span>
              </p>
            </div>
          </div>
        </Slideshow>
      </div>
    </div>

    <img
      srcset="
        /images/home/temoignages.webp,
        /images/home/temoignages@2x.webp 2x,
        /images/home/temoignages.png,
        /images/home/temoignages@2x.png 2x
      "
      src="/images/home/temoignages.png"
      alt=""
      class="h-[110px] object-cover pointer-events-none"
    >
  </div>
</template>

<script>
import Heading from '@/components/dsfr/Heading.vue'

export default {
  components: {
    Heading
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
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>
.slide-wrapper {
  @apply !flex flex-col h-full max-w-[708px] transition;
  width: calc(100vw - 32px) !important;
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
