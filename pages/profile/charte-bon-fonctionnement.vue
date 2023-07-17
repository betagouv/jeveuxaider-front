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
          Charte co-rédigée avec quelques bénévoles de la plateforme
        </p>
      </div>
      <Box :padding="false" class="max-w-[1000px] mx-auto px-6 py-8 md:py-12 md:px-16 lg:px-24 lg:py-16">
        <p class="md:text-center md:text-lg lg:text-xl mb-4 lg:mb-8">
          Afin d’assurer une bonne utilisation de la plateforme par tous, nous vous demandons de respecter certaines règles d’usage.
        </p>

        <AccordionsGroup>
          <Accordion title-variant="xxl" title-emoji="✅">
            <template slot="title">
              Respectez les conditions d’inscription pour les bénévoles
            </template>

            <div class="formatted-text md:text-lg lg:text-xl">
              <p>
                Ne peuvent s’inscrire sur la plateforme que les personnes de plus de 16 ans<sup><strong>*</strong></sup>, citoyennes Françaises ou résidentes régulières en France.
              </p>
              <p class="text-sm italic">
                <strong>*</strong> Vous pouvez vous engager sur la plateforme si vous avez entre 16 ans et 18 ans avec <Link to="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000033934948/2020-10-27/" target="_blank">
                  l’accord explicite de votre représentant légal
                </Link> (c’est-à-dire vos parents ou votre tuteur).
              </p>
            </div>
          </Accordion>

          <Accordion title-variant="xxl" title-emoji="😁">
            <template slot="title">
              La politesse et le respect sont de mise
            </template>

            <div class="formatted-text md:text-lg lg:text-xl">
              <p>
                En tant que bénévole, vous vous engagez à faire preuve de politesse et de respect lorsque vous communiquez ou interagissez avec les autres. Aucun propos discriminant et/ou insultant ne pourra être toléré.
              </p>
            </div>
          </Accordion>

          <Accordion title-variant="xxl" title-emoji="📋">
            <template slot="title">
              Pensez à compléter et à mettre à jour votre profil
            </template>

            <div class="formatted-text md:text-lg lg:text-xl">
              <p>
                Merci de compléter votre profil (disponibilité, compétences, …) et de mettre à jour vos coordonnées, sur votre profil, pour que l’on puisse vous joindre.
              </p>
            </div>
          </Accordion>

          <Accordion title-variant="xxl" title-emoji="⏰">
            <template slot="title">
              Soyez sympa, répondez dans un délai raisonnable
            </template>

            <div class="formatted-text md:text-lg lg:text-xl">
              <p>
                Les responsables reçoivent de nombreuses demandes de participation. Merci de répondre dans un délai raisonnable quand une organisation vous contacte (si possible dans la semaine). C’est beaucoup plus agréable pour tout le monde !
              </p>
            </div>
          </Accordion>

          <Accordion title-variant="xxl" title-emoji="‼️">
            <template slot="title">
              Merci de prévenir votre responsable de mission en cas de difficulté
            </template>

            <div class="formatted-text md:text-lg lg:text-xl">
              <p>
                Les empêchements peuvent toujours arriver… Mais dans ce cas-là, nous vous demandons de prévenir le responsable de la mission afin de ne pas la mettre en difficulté, voire en péril.
              </p>
            </div>
          </Accordion>

          <Accordion title-variant="xxl" title-emoji="✊">
            <template slot="title">
              Suivez les règles de l’organisation
            </template>

            <div class="formatted-text md:text-lg lg:text-xl">
              <p>
                Lorsque vous vous engagez pour une mission de bénévolat, vous vous engagez à suivre les règles données par l’organisation et le cadre d’intervention de la mission.
              </p>
            </div>
          </Accordion>
        </AccordionsGroup>

        <p class="md:text-center md:text-lg lg:text-xl mt-4 lg:mt-8">
          👉 Si vous ne respectez pas ces règles, nous serons contraints de mettre en place des mesures restrictives qui limiteront votre accès à certaines fonctionnalités de la plateforme, pouvant aller jusqu’à l’exclusion. Nous ne souhaitons pas en arriver là et comptons sur vous pour respecter ces quelques règles 🙂
        </p>

        <div v-if="!$store.state.auth.user?.has_agreed_benevole_terms_at" class="md:text-center mt-6 md:mt-10 lg:mt-12 flex flex-col items-center gap-4">
          <Button type="primary" size="lg" class="w-full md:w-auto" @click.native.prevent="onSubmit">
            J'accepte la charte
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
import Link from '@/components/dsfr/Link.vue'

export default {
  components: {
    Accordion,
    AccordionsGroup,
    Button,
    Link
  },
  data () {
    return {}
  },
  methods: {
    async onSubmit () {
      await this.$store.dispatch('auth/updateUser', {
        has_agreed_benevole_terms_at: this.$dayjs().utc(true).toISOString()
      })

      this.$router.push(this.$route.query?.redirect || '/profile')
    }
  }
}
</script>
