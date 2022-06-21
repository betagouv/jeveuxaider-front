<template>
  <section class="py-16 bg-gray-50 overflow-hidden relative">
    <img
      src="/images/homepage/deco_2.svg"
      alt="Décorations"
      class="deco--2 absolute hidden lg:block pointer-events-none"
      data-not-lazy
    >

    <img
      src="/images/homepage/deco_3.svg"
      alt="Décorations"
      class="deco--3 absolute hidden lg:block pointer-events-none"
      data-not-lazy
    >

    <div class="container mx-auto px-4 xl:max-w-[1412px]">
      <h2
        class="text-4xl lg:text-[40px] lg:leading-[42px] tracking-tight text-center text-[#AFAFAE]"
      >
        Paroles de
        <strong class="font-extrabold">bénévoles</strong>
      </h2>

      <Slideshow :slides-count="testimonies.length" :settings="settings" class="mt-12">
        <div v-for="testimony,index in testimonies" :key="index">
          <div
            class="testimony--wrapper flex flex-col items-center space-y-6 text-center max-w-[768px] mx-auto"
          >
            <img
              :src="testimony.organization.logo.default"
              :srcset="
                testimony.organization.logo.x2
                  ? `${testimony.organization.logo.x2} 2x`
                  : false
              "
              :alt="testimony.organization.name"
              class="max-w-[150px] max-h-[60px] object-contain w-full h-full"
              :width="testimony.organization.logo.width"
              :height="testimony.organization.logo.height"
              data-not-lazy
            >

            <div class="text-xl lg:text-2xl leading-relaxed">
              "{{ testimony.content | decodeHTMLEntities }}"
            </div>

            <div class="flex items-center space-x-4">
              <img
                v-if="testimony.author.image"
                :src="testimony.author.image.default"
                :srcset="
                  testimony.author.image.x2
                    ? `${testimony.author.image.x2} 2x`
                    : false
                "
                :alt="testimony.author.name"
                width="40"
                height="40"
                class="flex-none rounded-full overflow-hidden"
              >

              <div
                class="text-left flex flex-col md:flex-row md:flex-wrap md:items-center"
              >
                <span class="font-bold text-[#111827]">
                  {{ testimony.author.name }}
                </span>
                <span
                  class="text-[#A7A7B0] font-bold mx-2 text-lg hidden md:inline-block"
                >/</span>
                <span class="text-[#A7A7B0]">
                  Bénévole chez
                  <span class="uppercase font-bold">
                    {{ testimony.organization.name }}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Slideshow>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      testimonies: [
        {
          content: `Experience très positive qui m'a permise d'être utile envers les autres, mais aussi de rencontrer des belles personnes.
Je me suis désormais active dans la Banque Alimentaire près de chez moi deux matinées par semaine&nbsp;🙂`,
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
            name: 'Romaric'
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
            name: 'Ange'
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
          content: 'J’ai adoré cette expérience. L’équipe est formidable et les bénévoles sont tellement admirables. Pour une première, j’ai adoré. Un grand merci 🙏🏽',
          author: {
            name: 'Kevin'
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
        },
        {
          content: 'Très belle expérience! J\'ai fait le plein de bonnes ondes grâce à cette matinée de collecte.“',
          author: {
            name: 'Jennifer'
          },
          organization: {
            name: 'Banque Alimentaire de l\'Hérault',
            logo: {
              default: '/images/temoignages/organisations/banques_alimentaires.png',
              x2: '/images/temoignages/organisations/banques_alimentaires@2x.png',
              width: 150,
              height: 34
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

::v-deep .slick-slider {
  .wrapper--slick-dots {
    display: block !important;
  }

  .slick-dots {
    @apply !text-center;
  }

  .slick-track {
    @apply space-x-0;
  }

  .slick-list {
    overflow: hidden;
  }
}

</style>
