<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4 ">
      <div class="mx-auto max-w-6xl">
        <div class="flex justify-between items-baseline mb-12">
          <Heading as="h2" size="2xl" class="text-center md:text-left">
            Toutes les réponses à vos questions
          </Heading>
          <span
            class="hidden md:block ml-4 text-[32px] xl:text-[40px] text-[#A7A7B0]"
          >
            #faq
          </span>
        </div>

        <Tabs
          name="hello"
          :tabs="[
            { content: 'Bénévoles' },
            { content: 'Organisation' },
          ]"
        >
          <div slot="tab-0" class="px-4 py-8">
            <AccordionsGroup>
              <Accordion>
                <template slot="title">
                  Qui peut s'inscrire sur JeVeuxAider.gouv.fr ?
                </template>

                <div class="formatted-text mb-6">
                  <p>Bonjour et merci pour votre engagement !</p>
                  <p>L'activité de réserviste répond à des conditions précises.</p>
                  <p>
                    Ainsi, tout citoyen ou résident régulier de plus de 16 ans souhaitant s’engager dans son temps libre dans le cadre des missions prioritaires pour la continuité de la Nation peut se rendre sur la plateforme JeVeuxAider.gouv.fr de la Réserve Civique et proposer son aide aux associations référencées.
                  </p>
                </div>

                <Link
                  to="https://reserve-civique.crisp.help/fr/article/qui-peut-realiser-une-mission-sur-jeveuxaidergouvfr-i15md9/"
                  :is-external="true"
                  class="text-jva-blue-500"
                >
                  En lire plus
                </Link>
              </Accordion>

              <Accordion>
                <template slot="title">
                  Comment trouver une mission ?
                </template>

                <div class="formatted-text mb-6">
                  <p>Bonjour et merci pour votre engagement !</p>
                  <p>
                    La plateforme JeVeuxAider.gouv.fr est alimentée par les propositions de missions émanant d'organisations telles que des associations ou des collectivités territoriales. Vous pouvez facilement voir les missions disponibles.
                  </p>
                </div>

                <Link
                  to="https://reserve-civique.crisp.help/fr/article/comment-trouver-une-missison-sur-jeveuxaidergouvfr-a1fbnf/"
                  :is-external="true"
                  class="text-jva-blue-500"
                >
                  En lire plus
                </Link>
              </Accordion>

              <Accordion>
                <template slot="title">
                  Comment candidater à une mission ?
                </template>

                <div class="formatted-text mb-6">
                  <p>Bonjour,</p>
                  <p>
                    Après avoir identifié la mission qui vous convenait et avoir bien pris connaissance du descriptif, vous pouvez candidater.
                  </p>
                  <ul>
                    <li>Cliquer sur le bouton vert situé à droite de l’écran « Je propose mon aide »</li>
                  </ul>
                </div>

                <Link
                  to="https://reserve-civique.crisp.help/fr/article/comment-candidater-a-une-mission-sur-jeveuxaidergouvfr-1cdiioe/"
                  :is-external="true"
                  class="text-jva-blue-500"
                >
                  En lire plus
                </Link>
              </Accordion>
            </AccordionsGroup>
          </div>

          <div slot="tab-1" class="px-4 py-8">
            <AccordionsGroup>
              <Accordion>
                <template slot="title">
                  Comment s’inscrire sur JeVeuxAider.gouv.fr ?
                </template>

                <div class="formatted-text mb-6">
                  <p>
                    Bonjour et merci pour votre engagement !
                  </p>
                  <ol>
                    <li>
                      Une fois sur JeVeuxAider.gouv.fr, cliquez sur le bouton " Inscription " en haut à droite de l'écran.
                    </li>
                    <li>
                      Sélectionnez " Je veux publier des missions " afin de créer un compte organisation.
                    </li>
                  </ol>
                </div>

                <Link
                  to="https://reserve-civique.crisp.help/fr/article/comment-inscrire-mon-organisation-sur-jeveuxaidergouvfr-rku0gq/"
                  :is-external="true"
                  class="text-jva-blue-500"
                >
                  En lire plus
                </Link>
              </Accordion>

              <Accordion>
                <template slot="title">
                  Qui peut s’inscrire sur JeVeuxAider.gouv.fr ?
                </template>

                <div class="formatted-text mb-6">
                  <p>Bonjour,</p>
                  <p>
                    Peuvent déposer des missions relevant des
                    <a
                      href="https://reserve-civique.crisp.help/fr/article/quelles-sont-les-missions-que-lon-peut-proposer-a8ahqy/"
                      target="_blank"
                    >
                      10 domaines d’action rappelés ici
                    </a> :
                  </p>
                  <ul>
                    <li>les organismes sans but lucratif</li>
                    <li>
                      les structures publiques telles que :
                      <ul>
                        <li>les établissements scolaires</li>
                        <li>les établissements publics de santé</li>
                        <li>les collectivités territoriales</li>
                        <li>les services de l’Etat</li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <Link
                  to="https://reserve-civique.crisp.help/fr/article/quest-ce-quune-organisation-1m7331c/"
                  :is-external="true"
                  class="text-jva-blue-500"
                >
                  En lire plus
                </Link>
              </Accordion>

              <Accordion>
                <template slot="title">
                  Comment publier une mission ?
                </template>

                <div class="formatted-text mb-6">
                  <p>Bonjour,</p>
                  <p>
                    Une fois votre organisation créée sur JeVeuxAider.gouv.fr, il vous est possible de mettre en ligne des missions.
                  </p>
                  <ul>
                    <li>
                      Cliquez sur votre prénom puis sur le nom de votre organisation en haut à droite de votre écran. Vous arrivez alors sur votre espace responsable.
                    </li>
                    <li>
                      Cliquez sur l'onglet "Mes Missions" à gauche de votre écran.
                    </li>
                  </ul>
                </div>

                <Link
                  to="https://reserve-civique.crisp.help/fr/article/comment-publier-une-mission-sur-la-plateforme-16n8nk6/"
                  :is-external="true"
                  class="text-jva-blue-500"
                >
                  En lire plus
                </Link>
              </Accordion>
            </AccordionsGroup>
          </div>
        </Tabs>

        <div class="mt-8">
          <Link
            to="https://reserve-civique.crisp.help/fr/"
            :is-external="true"
            class="text-jva-blue-500"
          >
            Toutes les réponses à vos questions
          </Link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Heading from '@/components/dsfr/Heading.vue'
import Tabs from '@/components/dsfr/Tabs.vue'
import Accordion from '~/components/dsfr/Accordion.vue'
import AccordionsGroup from '~/components/dsfr/AccordionsGroup.vue'
import Link from '~/components/dsfr/Link.vue'

export default {
  components: {
    Heading,
    Tabs,
    Accordion,
    AccordionsGroup,
    Link
  },
  data () {
    return {}
  }
}
</script>
