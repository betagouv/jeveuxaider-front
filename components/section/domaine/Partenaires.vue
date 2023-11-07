<template>
  <div class="p-10 bg-white shadow-2xl">
    <div class="text-2xl font-bold text-center">En partenariat</div>
    <div class="mt-4 border-t pt-4">
      <BaseContainerScrollable class="lg:h-[500px]">
        <div class="py-4 flex flex-col gap-10 justify-center items-center">
          <!-- Santé pour tous -->
          <template v-if="domaine.id === 1">
            <a href="https://www.fhf.fr/" target="_blank">
              <NuxtImg
                class="h-14"
                alt="FHF"
                src="/images/domaines-logos/logo-fhf.svg"
                title="FHF"
              />
            </a>
            <a href="https://www.fehap.fr/" target="_blank">
              <NuxtImg
                class="h-10"
                alt="FEHAP"
                src="/images/domaines-logos/fehap-logo.svg"
                title="FEHAP"
              />
            </a>
            <a href="https://www.protection-civile.org/" target="_blank">
              <NuxtImg
                class=""
                alt="Protection Civile"
                src="/images/domaines-logos/logo-protection-civile.png"
                title="Protection Civile"
              />
            </a>
          </template>
          <!-- Prévention et protection -->
          <template v-if="domaine.id === 2">
            <a href="https://www.bon-samaritain.org/" target="_blank">
              <NuxtImg
                class="h-28"
                alt="Bon Samaritain"
                src="/images/domaines-logos/logo-bon-samaritain.png"
                title="Bon Samaritain"
              />
            </a>
            <a href="https://www.protection-civile.org/" target="_blank">
              <NuxtImg
                class=""
                alt="Protection Civile"
                src="/images/domaines-logos/logo-protection-civile.png"
                title="Protection Civile"
              />
            </a>
            <a href="https://www.police-nationale.interieur.gouv.fr/" target="_blank">
              <NuxtImg
                class="h-28"
                alt="Police Nationale"
                src="/images/domaines-logos/logo-police-nationale.jpg"
                title="Police Nationale"
              />
            </a>
          </template>
          <!-- Art et culture -->
          <template v-if="domaine.id === 3">
            <a href="https://www.culturesducoeur.org/" target="_blank">
              <NuxtImg
                class="h-32"
                alt="Cultures du coeur"
                src="/images/domaines-logos/cultures-du-coeur.png"
                title="Cultures du coeur"
              />
            </a>
            <a href="https://momartre.net/" target="_blank">
              <NuxtImg
                class="h-14"
                alt="Momartre"
                src="/images/domaines-logos/momartre.jpg"
                title="Momartre"
              />
            </a>
          </template>
          <!-- Sport pour tous -->
          <template v-if="domaine.id === 4">
            <a href="https://www.paris2024.org/fr/" target="_blank">
              <NuxtImg
                class="h-32"
                alt="JO Paris 2024"
                src="/images/domaines-logos/logo-jo-paris-2024.svg"
                title="JO Paris 2024"
              />
            </a>
            <a href="https://www.ufolep.org/" target="_blank">
              <NuxtImg
                class="h-14"
                alt="UFOLEP"
                src="/images/domaines-logos/logo-ufolep.png"
                title="UFOLEP"
              />
            </a>
            <a href="https://sportadapte.fr/" target="_blank">
              <NuxtImg
                class="h-40"
                alt="FÉDÉRATION FRANÇAISE DU SPORT ADAPTÉ"
                src="/images/domaines-logos/logo-ffsa.png"
                title="FÉDÉRATION FRANÇAISE DU SPORT ADAPTÉ"
              />
            </a>
          </template>
          <!-- Coopération internationale -->
          <template v-if="domaine.id === 6">
            <a href="https://singafrance.com/" target="_blank">
              <NuxtImg
                class="h-14"
                alt="Singa"
                src="/images/domaines-logos/singa.svg"
                title="Singa"
              />
            </a>
            <a href="https://coallia.org/" target="_blank">
              <NuxtImg
                class="h-16"
                alt="Coallia"
                src="/images/domaines-logos/coallia.png"
                title="Coallia"
              />
            </a>
          </template>
          <!-- Solidarité et insertion -->
          <template v-if="domaine.id === 7">
            <a href="https://www.ssvp.fr/" target="_blank">
              <NuxtImg
                class="h-14"
                alt="Société de Saint-Vincent-de-Paul"
                src="/images/domaines-logos/ssvp-logo.svg"
                title="Société de Saint-Vincent-de-Paul"
              />
            </a>
            <a href="https://www.banquealimentaire.org/" target="_blank">
              <NuxtImg
                class="h-14"
                alt="Banques Alimentaires"
                src="/images/domaines-logos/logo-banques-alimentaires.svg"
                title="Banques Alimentaires"
              />
            </a>
            <a href="https://andes-france.com/" target="_blank">
              <NuxtImg
                class="h-28"
                alt="ANDES"
                src="/images/domaines-logos/logo-andes.png"
                title="ANDES"
              />
            </a>
          </template>
          <!-- Mémoire et Citoyenneté -->
          <template v-if="domaine.id === 8">
            <a href="https://www.ecoledelaphilanthropie.org/" target="_blank">
              <NuxtImg
                class="h-16"
                alt="L'Ecole de la Philantropie"
                src="/images/domaines-logos/logo-ecole-de-la-philanthropie.jpg"
                title="L'Ecole de la Philantropie"
              />
            </a>
            <a href="https://www.contesrendus.org/" target="_blank">
              <NuxtImg
                class="h-10"
                alt="Contes Rendus"
                src="/images/domaines-logos/logo-contes-rendus.webp"
                title="Contes Rendus"
              />
            </a>
            <a href="https://www.concordia.fr/" target="_blank">
              <NuxtImg
                class="h-14"
                alt="Concordia"
                src="/images/domaines-logos/logo-concordia.png"
                title="Concordia"
              />
            </a>
          </template>
          <!-- Education pour tous -->
          <template v-if="domaine.id === 9">
            <a href="https://afev.org/" target="_blank">
              <NuxtImg
                class="h-10"
                alt="AFEV"
                src="/images/domaines-logos/logo-afev.svg"
                title="AFEV"
              />
            </a>
            <a href="https://article-1.eu/" target="_blank">
              <NuxtImg
                class="h-10"
                alt="Article 1"
                src="/images/domaines-logos/logo-article-1.png"
                title="Article 1"
              />
            </a>
            <a href="https://zupdeco.org/" target="_blank">
              <NuxtImg
                class="h-14"
                alt="ZUPDECO"
                src="/images/domaines-logos/zupdeco.jpg"
                title="ZUPDECO"
              />
            </a>
          </template>
          <!-- Protection de la nature -->
          <template v-if="domaine.id === 10">
            <a href="https://www.ademe.fr/particulier/" target="_blank">
              <NuxtImg
                class="h-20"
                alt="Ademe"
                src="/images/domaines-logos/ademe.svg"
                title="Ademe"
              />
            </a>
            <a href="https://mtaterre.fr/" target="_blank">
              <NuxtImg
                class="h-14"
                alt="MTaTerre"
                src="/images/domaines-logos/mtaterre.svg"
                title="MTaTerre"
              />
            </a>
            <a href="https://nosgestesclimat.fr/?lang=fr" target="_blank">
              <NuxtImg
                class="h-14"
                alt="Nos Gestes Climat"
                src="/images/domaines-logos/nos-gestes-climat.webp"
                title="Nos Gestes Climat"
              />
            </a>
            <a href="https://www.jagispourlanature.org/" target="_blank">
              <NuxtImg
                class="h-14"
                alt="J'agis pour la nature"
                src="/images/domaines-logos/jagis-pour-la-nature.webp"
                title="J'agis pour la nature"
              />
            </a>
            <a href="https://www.ofb.gouv.fr/" target="_blank">
              <NuxtImg class="h-14" alt="OFB" src="/images/domaines-logos/ofb.webp" title="OFB" />
            </a>
          </template>
          <!-- Benevolat de compétences -->
          <template v-if="domaine.id === 11">
            <a href="https://passerellesetcompetences.org/" target="_blank">
              <NuxtImg
                class="h-28"
                alt="Passerelles et Compétences"
                src="/images/domaines-logos/passerelles-et-competences.jpg"
                title="Passerelles et Compétences"
              />
            </a>
            <a href="https://www.probonolab.org/" target="_blank">
              <NuxtImg
                class="h-28"
                alt="Probonolab"
                src="/images/domaines-logos/probonolab.png"
                title="Probonolab"
              />
            </a>
          </template>
        </div>
      </BaseContainerScrollable>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    domaine: {
      type: Object,
      required: true,
    },
  },
  computed: {},
  methods: {},
})
</script>
