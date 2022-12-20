<template>
  <footer class="relative z-1">
    <div v-if="!$store.getters.isLogged" class="bg-gray-50 py-8">
      <div class="container px-4 mx-auto">
        <div class="mx-auto max-w-6xl">
          <div class="grid grid-cols-1 md:grid-cols-5 text-xs gap-8">
            <div class="md:col-span-2">
              <div class="font-bold mb-8">
                Le bénévolat en France
              </div>
              <div class="grid grid-cols-2 gap-4">
                <nuxt-link
                  v-for="city in cities"
                  :key="city.name"
                  :to="city.url"
                  class="hover:underline text-gray-600"
                >
                  {{ city.name }}
                </nuxt-link>
              </div>
            </div>

            <div class="md:col-span-2">
              <div class="font-bold mb-8">
                Organisations populaires
              </div>
              <div class="grid grid-cols-2 gap-4">
                <nuxt-link
                  v-for="organization in organizations"
                  :key="organization.name"
                  :to="organization.url"
                  class="hover:underline text-gray-600 truncate"
                >
                  {{ organization.name }}
                </nuxt-link>
              </div>
            </div>
            <div>
              <div class="font-bold mb-8">
                Liens utiles
              </div>
              <div class="grid grid-cols-1 gap-4">
                <component
                  :is="
                    link.component
                      ? link.component
                      : link.external
                        ? 'a'
                        : 'nuxt-link'
                  "
                  v-for="(link) in usefullLinks"
                  :key="link.name"
                  :to="link.url"
                  :href="link.url"
                  :target="link.external ? '_blank' : null"
                  class="hover:underline text-gray-600 truncate"
                >
                  {{ link.name }}
                </component>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white py-8">
      <div class="container mx-auto px-4">
        <div class="mx-auto max-w-6xl">
          <div class="lg:flex">
            <nuxt-link
              to="/"
              class="flex flex-col space-y-8 items-center justify-center sm:flex-row sm:space-x-8 sm:space-y-0 lg:space-x-4 lg:justify-start xl:space-x-8"
            >
              <img
                src="@/assets/images/republique-francaise-logo.svg"
                alt="République Française"
                width="167"
                height="151"
                class="ml-[-19px]"
              >

              <img
                src="@/assets/images/jeveuxaider-logo.svg"
                alt="Bénévolat je veux aider"
                title="Bénévolat association"
                width="251"
                height="41"
              >
            </nuxt-link>

            <div class="ml-auto lg:pl-16">
              <div
                class="text-[#383838] text-sm lg:max-w-lg leading-relaxed mt-8 mb-6"
              >
                Trouvez une mission d'intérêt général auprès d'un organisme
                public
                <br class="hidden md:block">
                ou associatif et faites vivre les valeurs de la République.
              </div>

              <div class="flex flex-wrap -mx-3 -my-2">
                <a
                  v-for="link in gouvLinks"
                  :key="link.url"
                  class="hover:underline font-bold text-sm px-3 py-2"
                  :href="link.url"
                  target="_blank"
                  rel="noopener"
                >
                  {{ link.name }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr>

    <div class="bg-white py-4">
      <div class="container mx-auto px-4">
        <div class="mx-auto max-w-6xl text-gray-600 text-xs">
          <div class="divide-x">
            <component
              :is="
                link.component
                  ? link.component
                  : link.external
                    ? 'a'
                    : 'nuxt-link'
              "
              v-for="(link, index) in footerLinks"
              :key="link.name"
              :to="link.url"
              :href="link.url"
              :target="link.external ? '_blank' : null"
              class="cursor-pointer hover:underline px-3 my-1 inline-block"
              :class="[{ 'pl-0': index === 0 }]"
            >
              {{ link.name }}
            </component>
          </div>

          <div class="mt-6">
            Sauf mention contraire, tous les textes de ce site sont sous
            <a
              href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
              target="_blank"
              class="inline-flex items-baseline"
            >
              <span class="underline">licence etatlab-2.0</span> <ExternalSvg class="flex-none ml-1" width="10" height="10" /></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import ExternalSvg from '@/static/images/icons/external.svg?inline'

export default {
  components: {
    ExternalSvg
  },
  data () {
    return {
      cities: [
        {
          name: 'Paris',
          url: '/villes/paris'
        },
        {
          name: 'Lille',
          url: '/villes/lille'
        },
        {
          name: 'Rouen',
          url: '/villes/rouen'
        },
        {
          name: 'Toulouse',
          url: '/villes/toulouse'
        },
        {
          name: 'Rennes',
          url: '/villes/rennes'
        },
        {
          name: 'Grenoble',
          url: '/villes/grenoble'
        },
        {
          name: 'Lyon',
          url: '/villes/lyon'
        },
        {
          name: 'Montpellier',
          url: '/villes/montpellier'
        },
        {
          name: 'Tours',
          url: '/villes/tours'
        },
        {
          name: 'Marseille',
          url: '/villes/marseille'
        },
        {
          name: 'Strasbourg',
          url: '/villes/strasbourg'
        },
        {
          name: 'Dijon',
          url: '/villes/dijon'
        },
        {
          name: 'Bordeaux',
          url: '/villes/bordeaux'
        },
        {
          name: 'Angers',
          url: '/villes/angers'
        },
        {
          name: 'Nancy',
          url: '/villes/nancy'
        },
        {
          name: 'Nantes',
          url: '/villes/nantes'
        },
        {
          name: 'Nice',
          url: '/villes/nice'
        },
        {
          name: 'Caen',
          url: '/villes/caen'
        }
      ],
      organizations: [
        {
          name: 'Makesense',
          url: '/organisations/2747-makesense'
        },
        {
          name: 'Article 1',
          url: '/organisations/5265-article-1'
        },
        {
          name: 'AVDTM - ExplorJob',
          url: '/organisations/6144-avdtm-explorjob'
        },
        {
          name: 'JobIRL',
          url: '/organisations/1784-jobirl'
        },
        {
          name: 'Lobby des Consciences',
          url: '/organisations/7198-lobby-des-consciences'
        },
        {
          name: 'Entraide Scolaire Amicale',
          url: '/organisations/6638-entraide-scolaire-amicale'
        },
        {
          name: 'Emmaüs Connect - Paris',
          url: '/organisations/5605-emmaus-connect-paris'
        },
        {
          name: 'Singa',
          url: '/organisations/5575-singa'
        },
        {
          name: 'Secours Catholique - Délégation du Val de Marne',
          url: '/organisations/8818-secours-catholique-delegation-du-val-de-marne'
        },
        {
          name: 'Etendart',
          url: '/organisations/8507-etendart'
        },
        {
          name: '1 Lettre 1 Sourire',
          url: '/organisations/7490-1-lettre-1-sourire'
        },
        {
          name: 'Association Solidarité Universelle Monde',
          url: '/organisations/8281-association-solidarite-universelle-monde'
        },
        {
          name: 'Restos du coeur',
          url: '/organisations/7159-restos-du-coeur'
        },
        {
          name: 'Apprentis d\'Auteuil',
          url: '/organisations/7330-apprentis-dauteuil'
        },
        {
          name: 'Entourage',
          url: '/organisations/97-entourage'
        },
        {
          name: 'Mon Emile Association',
          url: '/organisations/4561-mon-emile-association'
        },
        {
          name: 'Coallia',
          url: '/organisations/6484-coallia'
        },
        {
          name: 'Le Bon Samaritain',
          url: '/organisations/6875-le-bon-samaritain'
        }
      ],
      gouvLinks: [
        {
          name: 'legifrance.gouv.fr',
          url: 'https://legifrance.gouv.fr'
        },
        {
          name: 'gouvernement.fr',
          url: 'https://gouvernement.fr'
        },
        {
          name: 'service-public.fr',
          url: 'https://service-public.fr'
        },
        {
          name: 'data.gouv.fr',
          url: 'https://www.data.gouv.fr'
        }
      ],
      footerLinks: [
        {
          name: 'Accessibilité : Non conforme',
          url: '/accessibilite'
        },
        {
          name: 'Données personnelles',
          url: '/politique-de-confidentialite'
        },
        {
          name: 'Mentions légales',
          url: '/mentions-legales'
        },
        {
          name: 'CGU',
          url: '/conditions-generales-d-utilisation'
        },
        {
          name: 'Plan du site',
          url: '/plan-du-site'
        },
        {
          name: 'Gestion des cookies',
          url: 'javascript:openAxeptioCookies()',
          component: 'a'
        }
      ],
      usefullLinks: [
        {
          name: 'Centre d\'aide',
          url: 'https://reserve-civique.crisp.help/fr/',
          external: true
        },
        {
          name: 'Charte de la Réserve Civique',
          url: '/charte-reserve-civique'
        },
        {
          name: 'Manifeste',
          url: 'https://www.jeveuxaider.gouv.fr/engagement/manifeste/',
          external: true
        },
        {
          name: 'Actualités du bénévolat',
          url: 'https://www.jeveuxaider.gouv.fr/engagement/actualites/',
          external: true
        },
        {
          name: 'Communication',
          url: 'https://www.jeveuxaider.gouv.fr/engagement/communication/',
          external: true
        },
        {
          name: 'Presse',
          url: 'https://www.jeveuxaider.gouv.fr/engagement/presse/',
          external: true
        },
        {
          name: 'Écoles et Universités',
          url: 'https://www.jeveuxaider.gouv.fr/engagement/ecoles-et-universites/',
          external: true
        },
        {
          name: 'Statistiques',
          url: '/statistiques'
        }
      ]
    }
  }
}
</script>

<style lang="postcss" scoped></style>
