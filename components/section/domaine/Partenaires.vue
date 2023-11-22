<template>
  <div class="p-10 bg-white shadow-2xl">
    <div class="text-2xl font-bold text-center">En partenariat</div>
    <div class="mt-4 border-t pt-4">
      <BaseContainerScrollable class="lg:h-[500px]" scrollbarClass="pr-2">
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
            <a href="https://www.ligue-cancer.net/" target="_blank">
              <NuxtImg
                class="h-16"
                alt="La Ligue contre le cancer"
                src="/images/domaines-logos/logo-la-ligue-contre-le-cancer.png"
                title="La Ligue contre le cancer"
              />
            </a>
            <a href="https://www.admr.org/" target="_blank">
              <NuxtImg
                class="h-20"
                alt="ADMR"
                src="/images/domaines-logos/logo-admr.webp"
                title="ADMR"
              />
            </a>
            <a href="https://www.lenvol.asso.fr/" target="_blank">
              <NuxtImg
                class="h-36"
                alt="L'Envol"
                src="/images/domaines-logos/logo-lenvol.webp"
                title="L'Envol"
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
            <a href="https://www.preventionroutiere.asso.fr/" target="_blank">
              <NuxtImg
                class=""
                alt="Association Prévention Routière"
                src="/images/domaines-logos/logo-association-prevention-routiere.png"
                title="Association Prévention Routière"
              />
            </a>
            <a href="https://www.ordredemaltefrance.org/" target="_blank">
              <NuxtImg
                class="h-24"
                alt="Ordre de Malte"
                src="/images/domaines-logos/logo-ordre-de-malte.webp"
                title="Ordre de Malte"
              />
            </a>
            <a href="https://www.asrm-europe.org/" target="_blank">
              <NuxtImg
                class="h-20"
                alt="ASRM"
                src="/images/domaines-logos/logo-asrm.png"
                title="ASRM"
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
            <a href="https://www.apprentis-auteuil.org/" target="_blank">
              <NuxtImg
                class="h-24"
                alt="Apprentis d'Auteuil"
                src="/images/domaines-logos/logo-apprentis-dauteuil.svg"
                title="Apprentis d'Auteuil"
              />
            </a>
            <a href="https://dunlivrealautre.org/" target="_blank">
              <NuxtImg
                class="h-24"
                alt="D'un livre à l'autre"
                src="/images/domaines-logos/logo-dun-livre-a-lautre.png"
                title="D'un livre à l'autre"
              />
            </a>
            <a href="https://www.habitat-humanisme.org/" target="_blank">
              <NuxtImg
                class="h-12"
                alt="Habitat et Urbanisme"
                src="/images/domaines-logos/logo-habitat-et-urbanisme.svg"
                title="Habitat et Urbanisme"
              />
            </a>
            <a href="https://www.lyre-muses.fr/" target="_blank">
              <NuxtImg
                class="h-20"
                alt="Lyre & Muses"
                src="/images/domaines-logos/logo-lyre-et-muses.png"
                title="Lyre & Muses"
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
            <a href="https://www.lechappeebelledonne.com/" target="_blank">
              <NuxtImg
                class="h-36"
                alt="L'échappée Belle"
                src="/images/domaines-logos/logo-lechappee-belle.jpg"
                title="L'échappée Belle"
              />
            </a>
            <a href="https://www.sportspourtous.org/" target="_blank">
              <NuxtImg
                class="h-12"
                alt="Fédération Fraçaise Sports pour Tous"
                src="/images/domaines-logos/logo-sportspourtous.png"
                title="Fédération Fraçaise Sports pour Tous"
              />
            </a>
            <a href="https://www.courtside.co/" target="_blank">
              <NuxtImg
                class="h-16"
                alt="Courtside Etendart"
                src="/images/domaines-logos/logo-etendart.webp"
                title="Courtside Etendart"
              />
            </a>
            <a href="https://usep.org/" target="_blank">
              <NuxtImg
                class="h-24"
                alt="USEP"
                src="/images/domaines-logos/logo-usep.png"
                title="USEP"
              />
            </a>
            <a
              href="https://www.fff.fr/competition/club/560815-club-athletique-de-vitry-94-2/information.html"
              target="_blank"
            >
              <NuxtImg
                class="h-24"
                alt="Club athlétique de Vitry"
                src="/images/domaines-logos/logo-ca-vitry.png"
                title="Club athlétique de Vitry"
              />
            </a>
          </template>
          <!-- Coopération internationale -->
          <template v-if="domaine.id === 6">
            <a href="https://singafrance.com/" target="_blank">
              <NuxtImg
                class="h-12"
                alt="Singa"
                src="/images/domaines-logos/singa.svg"
                title="Singa"
              />
            </a>
            <a href="https://coallia.org/" target="_blank">
              <NuxtImg
                class="h-14"
                alt="Coallia"
                src="/images/domaines-logos/coallia.png"
                title="Coallia"
              />
            </a>
            <a href="https://www.actioncontrelafaim.org/" target="_blank">
              <NuxtImg
                class="h-16"
                alt="Action contre la faim"
                src="/images/domaines-logos/logo-action-contre-la-faim.png"
                title="Action contre la faim"
              />
            </a>
            <a href="https://www.secourspopulaire.fr/" target="_blank">
              <NuxtImg
                class="h-28"
                alt="Secours Populaire Français"
                src="/images/domaines-logos/logo-secours-populaire-francais.svg"
                title="Secours Populaire Français"
              />
            </a>
            <a href="https://supeducation.org/" target="_blank">
              <NuxtImg
                class="h-28"
                alt="SupEducation"
                src="/images/domaines-logos/logo-supeducation.jpg"
                title="SupEducation"
              />
            </a>
            <a href="https://www.lesfemmesenaction.fr/" target="_blank">
              <NuxtImg
                class=""
                alt="Les Femmes en Action"
                src="/images/domaines-logos/logo-femmes-en-action.jpg"
                title="Les Femmes en Action"
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
                class="h-10"
                alt="Banques Alimentaires"
                src="/images/domaines-logos/logo-banques-alimentaires.svg"
                title="Banques Alimentaires"
              />
            </a>
            <a href="https://andes-france.com/" target="_blank">
              <NuxtImg
                class="h-24"
                alt="ANDES"
                src="/images/domaines-logos/logo-andes.png"
                title="ANDES"
              />
            </a>
            <a href="https://www.armeedusalut.fr/" target="_blank">
              <NuxtImg
                class=""
                alt="Armée du Salut"
                src="/images/domaines-logos/logo-armee-du-salut.png"
                title="Armée du Salut"
              />
            </a>
            <a href="https://www.actioncontrelafaim.org/" target="_blank">
              <NuxtImg
                class="h-16"
                alt="Action contre la faim"
                src="/images/domaines-logos/logo-action-contre-la-faim.png"
                title="Action contre la faim"
              />
            </a>
            <a href="https://www.secours-catholique.org/" target="_blank">
              <NuxtImg
                class="h-20"
                alt="Secours Catholique Caritas France"
                src="/images/domaines-logos/logo-secours-catholique.svg"
                title="Secours Catholique Caritas France"
              />
            </a>
            <a href="https://www.croix-rouge.fr/" target="_blank">
              <NuxtImg
                class="h-16"
                alt="Croix-Rouge Française"
                src="/images/domaines-logos/logo-croix-rouge.svg"
                title="Croix-Rouge Française"
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
            <a href="https://www.democratieouverte.org/" target="_blank">
              <NuxtImg
                class="h-20"
                alt="Démocratie Ouverte"
                src="/images/domaines-logos/logo-democratie-ouverte.png"
                title="Démocratie Ouverte"
              />
            </a>
            <a href="https://cif-sp.org/" target="_blank">
              <NuxtImg
                class="h-28"
                alt="CIF-SP"
                src="/images/domaines-logos/logo-cif-sp.png"
                title="CIF-SP"
              />
            </a>
            <a href="https://www.atd-quartmonde.fr/" target="_blank">
              <NuxtImg
                class="h-12"
                alt="ATD Quart Monde"
                src="/images/domaines-logos/logo-atd-quart-monde.png"
                title="ATD Quart Monde"
              />
            </a>
            <a href="https://www.fondationresistance.org/pages/accueil/" target="_blank">
              <NuxtImg
                class="h-20"
                alt="Fondation de la Résistance"
                src="/images/domaines-logos/logo-fondation-de-la-resistance.jpg"
                title="Fondation de la Résistance"
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
                class="h-12"
                alt="ZUPDECO"
                src="/images/domaines-logos/zupdeco.jpg"
                title="ZUPDECO"
              />
            </a>
            <a href="https://energiejeunes.fr/" target="_blank">
              <NuxtImg
                class="h-20"
                alt="Énergie Jeunes"
                src="/images/domaines-logos/logo-energie-jeunes.png"
                title="Énergie Jeunes"
              />
            </a>
            <a href="https://www.entraidescolaireamicale.org/" target="_blank">
              <NuxtImg
                class="h-24"
                alt="Entraide Scolaire Amicale"
                src="/images/domaines-logos/logo-esa.jpg"
                title="Entraide Scolaire Amicale"
              />
            </a>
            <a href="https://lacravatesolidaire.org/" target="_blank">
              <NuxtImg
                class="h-24"
                alt="La Cravate Solidaire"
                src="/images/domaines-logos/logo-la-cravate-solidaire.png"
                title="La Cravate Solidaire"
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
            <a href="https://activille.org/" target="_blank">
              <NuxtImg
                class="h-14"
                alt="Activille"
                src="/images/domaines-logos/logo-activille.png"
                title="Activille"
              />
            </a>
            <a href="https://jardindeterraferma.fr/" target="_blank">
              <NuxtImg
                class="h-20"
                alt="Jardin de Terra Ferma"
                src="/images/domaines-logos/logo-terra-ferma.jpg"
                title="Jardin de Terra Ferma"
              />
            </a>
            <a href="https://www.1dechetparjour.com/" target="_blank">
              <NuxtImg
                class="h-20"
                alt="1 Déchet par Jour"
                src="/images/domaines-logos/logo-1-dechet-par-jour.png"
                title="1 Déchet par Jour"
              />
            </a>
            <a href="https://noplasticinmysea.org/" target="_blank">
              <NuxtImg
                class="h-20"
                alt="No Plastic In My Sea"
                src="/images/domaines-logos/logo-no-plastic-in-my-sea.webp"
                title="No Plastic In My Sea"
              />
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
