<template>
  <div class="relative bg-[#081992]">
    <img
      class="z-1 object-cover absolute h-screen lg:h-auto w-full max-h-full object-top"
      alt="JeVeuxAider.gouv.fr"
      srcset="/images/bg-jva.webp, /images/bg-jva@2x.webp 2x, /images/bg-jva.jpg"
      data-not-lazy
    >
    <div class="relative container py-12 lg:py-16">
      <div class="mb-12 text-center text-white">
        <h1 class="text-4xl lg:text-5xl font-bold mb-4 lg:mb-8 max-w-4xl mx-auto tracking-tight">
          Les règles de bon fonctionnement
        </h1>
        <p class="text-lg lg:text-2xl">
          Charte co-rédigée avec les responsables d’organisation de la plateforme
        </p>
      </div>
      <Box :padding="false" class="max-w-[1000px] mx-auto px-6 py-8 md:py-12 md:px-16 lg:px-24 lg:py-16">
        <p class="md:text-center md:text-lg lg:text-xl mb-4 lg:mb-8">
          En vous inscrivant sur la plateforme, vous vous engagez à suivre des règles de fonctionnement qui facilitent la mobilisation de bénévoles.
        </p>

        <AccordionsGroup>
          <Accordion title-variant="xxl">
            <template slot="iconTitle">
              ✊
            </template>
            <template slot="title">
              Proposer des missions de bénévolat d’intérêt général, à l’exclusion de tout autre type de mission
            </template>

            <div class="formatted-text md:text-lg lg:text-xl">
              <p>
                Nous portons une attention toute particulière au fait que les missions publiées ne se substituent pas à l’emploi, et sont bien d’intérêt général.
              </p>
              <p>
                <span aria-hidden="true">❗</span> Si nous observons que votre mission ne respecte pas ce cadre, nous serons contraints de la signaler et de la supprimer de la plateforme. Ce serait dommage !
              </p>
            </div>
          </Accordion>
          <Accordion title-variant="xxl">
            <template slot="iconTitle">
              🙅
            </template>
            <template slot="title">
              Proposer des missions sans exiger de participation financière en contrepartie
            </template>

            <div class="formatted-text md:text-lg lg:text-xl">
              <p>
                Vous ne pouvez en aucun cas demander à un bénévole qui s’engage par l’intermédiaire de JeVeuxAider.gouv.fr une participation financière, dans le cadre d’une mission que vous publiez sur la plateforme, qu’il s’agisse d’un don financier ou d’une adhésion obligatoire à votre organisation.
              </p>
              <p>
                <span aria-hidden="true">❗</span> Là aussi, si vous ne respectez pas ce cadre, nous ne pourrons pas conserver votre mission sur la plateforme.
              </p>
            </div>
          </Accordion>
          <Accordion title-variant="xxl">
            <template slot="iconTitle">
              🤓
            </template>
            <template slot="title">
              Avoir des informations complètes et à jour sur la plateforme
            </template>

            <div class="formatted-text md:text-lg lg:text-xl">
              <p>
                Afin de faciliter le traitement des missions et les échanges que nous serions amenés à avoir avec vous, nous avons besoin d’informations complètes et à jour. Nous comptons sur vous pour mettre à jour sur la plateforme tout changement concernant : les responsables de votre organisation, les responsables des missions, les coordonnées (téléphone, e-mail, adresse…)
              </p>
              <p>
                Nous vous en remercions d’avance !
              </p>
            </div>
          </Accordion>
          <Accordion title-variant="xxl">
            <template slot="iconTitle">
              ✅
            </template>
            <template slot="title">
              Publier des missions dont les contenus respectent les exigences de la plateforme
            </template>

            <div class="formatted-text md:text-lg lg:text-xl">
              <p>
                Une mission publiée sur JeVeuxAider.gouv.fr doit comporter les les éléments suivants :
              </p>
              <ul>
                <li>Un titre accrocheur à la première personne décrivant la mission</li>
                <li>Le contexte de la mission</li>
                <li>L’engagement nécessaire (ponctuel ou récurrent) et les créneaux spécifiques le cas échéant</li>
                <li>Les actions / activités à effectuer par le bénévole</li>
                <li>Les publics auprès desquels le bénévole interviendra</li>
              </ul>
              <p>Pour la rendre plus agréable à lire, nous vous conseillons par ailleurs :</p>
              <ul>
                <li>De rédiger des phrases courtes et claires</li>
                <li>De faire une mise en page fluide</li>
                <li>De rédiger un message personnalisét</li>
              </ul>
              <p>
                Il n'est pas admis de mentionner un lien externe sur la fiche mission (Doodle, Airtable, Excel…), des coordonnées (email, téléphone) ou de proposer aux bénévoles de passer par un autre moyen que la plateforme JeVeuxAider.gouv.fr pour s’engager. Pas d'inquiétude, vous disposerez de toutes les informations nécessaires pour échanger avec les bénévoles via la messagerie JeVeuxAider.gouv.fr, par téléphone ou par e-mail lors de leur inscription à la mission que vous proposez.
              </p>
            </div>
          </Accordion>
          <Accordion title-variant="xxl">
            <template slot="iconTitle">
              ‼
            </template>
            <template slot="title">
              Éviter la publication de missions en doublon, triplon…
            </template>

            <div class="formatted-text md:text-lg lg:text-xl">
              <p>
                Nous souhaitons éviter d’avoir des missions en doublon, triplon… Ainsi, soyez attentif à la publication dans les cas suivants :
              </p>
              <ul>
                <li>
                  <strong>les missions à distance</strong>, qui sont disponibles auprès de l’ensemble des bénévoles, quelle que soit leur localisation.
                </li>
                <li>
                  <strong>les missions complètes</strong> : si vous cherchez de nouveaux bénévoles, il vous suffit d’augmenter la jauge de bénévoles recherchés dans la fiche mission pour que l’inscription soit de nouveau possible.
                </li>
                <li>
                  <strong>les missions avec une date de fin expirée</strong> : Si la date de votre mission est dépassée et que vous avez toujours besoin de mobiliser des bénévoles, vous pouvez repousser la date de fin, ou supprimer la date de fin en précisant que la mission est récurrente.
                </li>
              </ul>
            </div>
          </Accordion>
          <Accordion title-variant="xxl">
            <template slot="iconTitle">
              🛟
            </template>
            <template slot="title">
              Garantir la sécurité et le bon déroulement de la mission de bénévolat
            </template>

            <div class="formatted-text md:text-lg lg:text-xl">
              <p>
                Vous êtes garant de la sécurité du bénévole et de l’encadrement lui permettant de réaliser sa mission dans de bonnes conditions.
              </p>
              <p>
                <strong>La charte de la Réserve Civique rappelle que la structure d’accueille s’engage à couvrir le réserviste contre les dommages subis par lui ou causés à des tiers dans l'accomplissement de sa mission.</strong>
              </p>
              <p>
                <strong>Ceci implique que la structure d’accueil ait souscrit à une assurance afin de couvrir les bénévoles.</strong>
              </p>
              <p>
                Si votre structure d’accueil est une collectivité publique ou un service public assuré par une personne privée :
              </p>
              <ul>
                <li>S’il subit un préjudice pendant sa participation au service public, le bénévole peut obtenir une indemnisation tant que son engagement est formalisé.</li>
                <li>Si un bénévole cause un dommage à un tiers dans le cadre de sa mission, la collectivité publique prend en charge l’indemnisation des préjudices. En tant qu’organisation, vous pouvez vous retourner contre le réserviste s’il a commis une faute personnelle détachable du service. Ce mécanisme est d’origine jurisprudentielle, il est connu sous le nom de collaborateur occasionnel du service public.</li>
              </ul>
            </div>
          </Accordion>
          <Accordion title-variant="xxl">
            <template slot="iconTitle">
              😁
            </template>
            <template slot="title">
              Veiller au respect des règles élémentaires de politesse et de courtoisie
            </template>

            <div class="formatted-text md:text-lg lg:text-xl">
              <p>
                En tant qu’organisation, vous vous engagez à faire preuve de politesse et de respect lorsque vous communiquez ou interagissez avec les bénévoles. Aucun propos discriminant ne pourra être toléré. Ces règles concernent aussi bien les échanges ayant lieu sur la plateforme qu’en dehors de la plateforme. Des mesures pourront être prises en cas de non-respect de ces règles.
              </p>
            </div>
          </Accordion>
          <Accordion title-variant="xxl">
            <template slot="iconTitle">
              ⏰
            </template>
            <template slot="title">
              Répondre aux bénévoles dès que possible
            </template>

            <div class="formatted-text md:text-lg lg:text-xl">
              <p>
                Les bénévoles peuvent consulter plus de 10 000 missions sur JeVeuxAider.gouv.fr.
              </p>
              <p>
                Lorsqu’ils proposent leur aide, ils s’attendent à une réponse rapide de votre part. Ils choisiront souvent la première mission pour laquelle ils auront eu une réponse. Nous vous recommandons, en tant qu'organisation, de répondre aux sollicitations des bénévoles dans un délai raisonnable (si possible dans la semaine qui suit la demande de participation). La messagerie de JeVeuxAider.gouv.fr est à privilégier dans le cadre des échanges.
              </p>
            </div>
          </Accordion>
          <Accordion title-variant="xxl">
            <template slot="iconTitle">
              📋
            </template>
            <template slot="title">
              Mettre à jour les demandes de participations
            </template>

            <div class="formatted-text md:text-lg lg:text-xl">
              <p>
                Le suivi des participations que vous allez pouvoir réaliser sur la plateforme, est un élément clef à de nombreux niveaux. Nous vous demandons ainsi de bien passer les nouvelles demandes de participation au statut “En cours de traitement”, puis de les valider ou de les refuser en précisant le motif de refus, dans un délai de deux mois.
              </p>
              <p>
                Lorsqu’ils proposent leur aide, ils s’attendent à une réponse rapide de votre part. Ils choisiront souvent la première mission pour laquelle ils auront eu une réponse. Nous vous recommandons, en tant qu'organisation, de répondre aux sollicitations des bénévoles dans un délai raisonnable (si possible dans la semaine qui suit la demande de participation). La messagerie de JeVeuxAider.gouv.fr est à privilégier dans le cadre des échanges.
              </p>
            </div>
          </Accordion>
        </AccordionsGroup>

        <p class="md:text-lg lg:text-xl mt-4 lg:mt-8">
          En cas de non-respect de ces règles, des mesures restrictives d’utilisation seront mises en place (limitation des fonctionnalités de la plateforme jusqu’à l’exclusion de la plateforme). Nous ne le souhaitons pas et ce serait dommage d’en arriver là !
        </p>

        <div class="md:text-center mt-6 md:mt-10 lg:mt-12 flex flex-col items-center gap-4">
          <Button type="primary" size="lg" class="w-full md:w-auto" @click.native.prevent="onSubmit">
            J'accepte la charte
          </Button>
          <Button type="tertiary" icon="RiLogoutBoxLine" class="w-full md:w-auto" @click.native.prevent="onCancel">
            Abandonner l'inscription
          </Button>
        </div>
      </Box>
    </div>
  </div>
</template>

<script>
import Accordion from '~/components/dsfr/Accordion.vue'
import AccordionsGroup from '~/components/dsfr/AccordionsGroup.vue'
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    Accordion,
    AccordionsGroup,
    Button
  },
  data () {
    return {}
  },
  methods: {
    onSubmit () {
      console.log('onSubmit')
    },
    onCancel () {
      console.log('onCancel')
    }
  }
}
</script>
