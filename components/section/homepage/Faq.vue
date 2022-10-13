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
                <p>
                  Bonjour et merci pour votre engagement !
                  <br><br>
                  L'activité de réserviste répond à des conditions précises.
                  <br><br>
                  Ainsi, tout citoyen ou résident régulier de plus de 16 ans souhaitant s’engager dans son temps libre dans le cadre des missions prioritaires pour la continuité de la Nation peut se rendre sur la plateforme JeVeuxAider.gouv.fr de la Réserve Civique et proposer son aide aux associations référencées.
                  <br><br>
                  <a class="text-jva-blue-500 hover:underline" href="https://reserve-civique.crisp.help/fr/article/qui-peut-realiser-une-mission-sur-jeveuxaidergouvfr-i15md9/" target="_blank">En lire plus ›</a>
                </p>
              </Accordion>
              <Accordion>
                <template slot="title">
                  Comment trouver une mission ?
                </template>
                <p>
                  Bonjour et merci pour votre engagement !
                  <br><br>
                  La plateforme JeVeuxAider.gouv.fr est alimentée par les propositions de missions émanant d'organisations telles que des associations ou des collectivités territoriales. Vous pouvez facilement voir les missions disponibles.
                  <br><br>
                  <a class="text-jva-blue-500 hover:underline" href="https://reserve-civique.crisp.help/fr/article/comment-trouver-une-missison-sur-jeveuxaidergouvfr-a1fbnf/" target="_blank">En lire plus ›</a>
                </p>
              </Accordion>
              <Accordion>
                <template slot="title">
                  Comment candidater à une mission ?
                </template>
                <p>
                  Bonjour,
                  <br><br>
                  Après avoir identifié la mission qui vous convenait et avoir bien pris connaissance du descriptif, vous pouvez candidater.
                  <br><br>
                  <ul class="list-disc pl-4">
                    <li>Cliquer sur le bouton vert situé à droite de l’écran « Je propose mon aide »</li>
                  </ul>
                  <br>
                  <a class="text-jva-blue-500 hover:underline" href="https://reserve-civique.crisp.help/fr/article/comment-candidater-a-une-mission-sur-jeveuxaidergouvfr-1cdiioe/" target="_blank">En lire plus ›</a>
                </p>
              </Accordion>
            </AccordionsGroup>
          </div>

          <div slot="tab-1" class="px-4 py-8">
            <AccordionsGroup>
              <Accordion>
                <template slot="title">
                  Comment s’inscrire sur JeVeuxAider.gouv.fr ?
                </template>
                <p>
                  Bonjour et merci pour votre engagement !
                  <br><br>
                  <ul class="list-decimal pl-6">
                    <li class="pl-2">
                      Une fois sur JeVeuxAider.gouv.fr, cliquez sur le bouton " Inscription " en haut à droite de l'écran.
                    </li>
                    <li class="pl-2">
                      Sélectionnez " Je veux publier des missions " afin de créer un compte organisation.
                    </li>
                  </ul>
                  <br>
                  <a class="text-jva-blue-500 hover:underline" href="https://reserve-civique.crisp.help/fr/article/comment-inscrire-mon-organisation-sur-jeveuxaidergouvfr-rku0gq/" target="_blank">En lire plus ›</a>
                </p>
              </Accordion>
              <Accordion>
                <template slot="title">
                  Qui peut s’inscrire sur JeVeuxAider.gouv.fr ?
                </template>
                <p>
                  Bonjour,
                  <br><br>
                  Peuvent déposer des missions relevant des 10 domaines d’action rappelés <a class="text-jva-blue-500 hover:underline" href="https://reserve-civique.crisp.help/fr/article/quelles-sont-les-missions-que-lon-peut-proposer-a8ahqy/" target="_blank">ici</a>:
                  <br><br>
                  <ul class="list-disc pl-4">
                    <li>les organismes sans but lucratif</li>
                    <li>
                      les structures publiques telles que :
                      <ul class="list-disc pl-4">
                        <li>les établissements scolaires</li>
                        <li>les établissements publics de santé</li>
                        <li>les collectivités territoriales</li>
                        <li>les services de l’Etat</li>
                      </ul>
                    </li>
                  </ul>
                  <br>
                  <a class="text-jva-blue-500 hover:underline" href="https://reserve-civique.crisp.help/fr/article/quest-ce-quune-organisation-1m7331c/" target="_blank">En lire plus ›</a>
                </p>
              </Accordion>
              <Accordion>
                <template slot="title">
                  Comment publier une mission ?
                </template>
                <p>
                  Bonjour,
                  <br><br>
                  Une fois votre organisation créée sur JeVeuxAider.gouv.fr, il vous est possible de mettre en ligne des missions.
                  <br><br>
                  <ul class="list-decimal pl-6">
                    <li class="pl-2">
                      Cliquez sur votre prénom puis sur le nom de votre organisation en haut à droite de votre écran. Vous arrivez alors sur votre espace responsable.
                    </li>
                    <li class="pl-2">
                      Cliquez sur l'onglet "Mes Missions" à gauche de votre écran.
                    </li>
                  </ul>
                  <br>
                  <a class="text-jva-blue-500 hover:underline" href="https://reserve-civique.crisp.help/fr/article/comment-publier-une-mission-sur-la-plateforme-16n8nk6/" target="_blank">En lire plus ›</a>
                </p>
              </Accordion>
            </AccordionsGroup>
          </div>
        </Tabs>

        <a
          href="https://reserve-civique.crisp.help/fr/"
          class="text-lg text-jva-blue-500 hover:underline inline-flex mt-8"
          target="_blank"
        >
          Toutes les réponses à vos questions ›
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import Heading from '@/components/dsfr/Heading.vue'
import Tabs from '@/components/dsfr/Tabs.vue'
import Accordion from '~/components/dsfr/Accordion.vue'
import AccordionsGroup from '~/components/dsfr/AccordionsGroup.vue'

export default {
  components: {
    Heading,
    Tabs,
    Accordion,
    AccordionsGroup
  },
  data () {
    return {}
  }
}
</script>
