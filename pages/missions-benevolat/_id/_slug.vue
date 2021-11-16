<template>
  <div>
    <div class="absolute w-full" style="height: 360px">
      <img
        src="/images/missions/bg_header_mission.jpg"
        alt="Mission bénévolat"
        class="object-cover w-full h-full"
      >
    </div>
    <div class="px-4 max-w-3xl mx-auto lg:max-w-7xl">
      <Breadcrumb
        theme="transparent"
        class="relative z-10"
        :items="[
          { label: 'Missions de bénévolat', link: '/missions-benevolat' },
          {
            label: domainName,
            link: `/missions-benevolat?refinementList[domaines][0]=${domainName}`,
          },
          {
            label:
              mission.type == 'Mission en présentiel'
                ? `Bénévolat ${mission.structure.name} à ${mission.city}`
                : `Bénévolat ${mission.structure.name} à distance`,
            h1: true,
          },
        ]"
      />
      <div class="lg:flex lg:items-start lg:gap-6">
        <div class="space-y-6">
          <Box class="relative z-10">
            <div class="flex justify-between mb-6">
              <div class="flex flex-wrap gap-2">
                <Badge
                  v-if="mission.domaine"
                  class="uppercase"
                  :color="mission.domaine.slug.fr"
                >
                  {{ mission.domaine.name.fr }}
                </Badge>
                <Badge
                  v-if="mission.domaine_secondaire"
                  class="uppercase"
                  color="gray-light"
                >
                  {{ mission.domaine_secondaire.name.fr }}
                </Badge>
              </div>
              <div>Share todo</div>
            </div>
            <Heading as="h1" :level="1">
              {{ mission.name }}
            </Heading>
            <div class="my-6 text-cool-gray-500 font-medium">
              <span>Publié par </span>
              <img
                v-if="mission.responsable.image"
                :src="
                  mission.responsable.image.thumb
                    ? mission.responsable.image.thumb
                    : mission.responsable.image.original
                "
                :alt="`Portrait de ${mission.responsable.full_name}`"
                class="inline-flex w-7 h-7 rounded-full border-2 border-gray-200"
              >
              <span class="text-gray-900">{{ mission.responsable.full_name }} </span>
              <span class="lowercase">de {{ mission.structure.statut_juridique|label('structure_legal_status')|prefix }}</span>
              <component
                :is="mission.structure.statut_juridique == 'Association' && mission.structure.state == 'Validée'
                  ? 'nuxt-link'
                  : 'span'
                "
                :to="`/organisations/${mission.structure.slug}`"
                target="_blank"
                class="font-bold uppercase text-jva-blue-500"
              >
                <h2 class="inline">
                  {{ mission.structure.name }}
                </h2>
              </component>
            </div>
            <div class="flex items-center gap-4 mb-4">
              <div
                class="flex-none font-bold text-xs uppercase text-gray-500"
              >
                Publics aidés
              </div>
              <hr class="text-gray-200 w-full">
            </div>
            <div class="flex flex-wrap gap-2">
              <Badge
                v-for="(
                  publicBeneficiaire, key
                ) in mission.publics_beneficiaires"
                :key="key"
                class="uppercase"
              >
                {{ publicBeneficiaire|label('mission_publics_beneficiaires') }}
              </Badge>
            </div>
            <template v-if="mission.skills && mission.skills.length">
              <div class="flex items-center gap-4 mt-8 mb-4">
                <div
                  class="flex-none font-bold text-xs uppercase text-gray-500"
                >
                  Compétences recherchées
                </div>
                <hr class="text-gray-200 w-full">
              </div>
              <div
                class="text-cool-gray-500"
                v-html="mission.skills.map((skill) => skill.name.fr).join(`<span class='mx-2'>•</span>`)"
              />
            </template>
          </Box>

          <Box v-if="mission.type == 'Mission en présentiel'" :padding="false">
            <iframe
              width="100%"
              height="100%"
              style="border: 0; min-height: 190px"
              loading="lazy"
              allowfullscreen
              :src="`https://www.google.com/maps/embed/v1/place?key=${$config.google.places}&q=${mission.full_address}`"
            />
            <div class="text-sm px-6 py-4">
              <span class="font-bold text-gray-800 uppercase">Mission sur le terrain</span> <br>
              📍 <span class="text-gray-500">{{ mission.full_address }}</span>
            </div>
          </Box>

          <Box v-else class="relative" :padding="false">
            <img
              src="/images/missions/mission_a_distance.jpg"
              srcset="/images/missions/mission_a_distance@2x.jpg 2x"
              alt="Personne assise devant un ordinateur portable"
              class="absolute inset-0 w-full h-full object-cover"
            >

            <div class="absolute inset-0 custom-gradient" />

            <div class="text-white relative px-6 xl:px-16 py-8">
              <div class="font-extrabold text-2xl mb-2">
                Mission à distance
              </div>
              <div>
                Réalisez cette mission de bénévolat<br>
                <strong>depuis chez vous</strong> ou
                <strong>en autonomie</strong>
              </div>
            </div>
          </Box>

          <Box>
            <Heading as="div" :level="3" class="mb-4">
              Présentation de la mission
            </Heading>

            <TextFormatted :max-lines="2" :text="mission.objectif" class="text-cool-gray-500" />

            <div
              v-if="mission.information"
              class="mt-6 p-6 md:p-8 xl:p-12 rounded-xl custom-gradient-2 relative min-h-[120px]"
            >
              <img
                class="absolute right-0 bottom-0 p-6"
                src="/images/icons/quote.svg"
                alt="Guillemets"
              >

              <h3 class="relative z-10 citation text-lg">
                <div v-html="mission.information" />
              </h3>
            </div>

            <Heading as="div" :level="3" class="mb-4 mt-10">
              Précisions
            </Heading>

            <TextFormatted :max-lines="3" :text="mission.description" class="text-cool-gray-500" />

            <div v-if="publicsVolontaires.length > 0" class="mt-8">
              <div class="flex items-center gap-4 mb-4">
                <div
                  class="flex-none font-bold text-xs uppercase text-gray-500"
                >
                  Mission ouverte également aux
                </div>
                <hr class="text-gray-200 w-full">
              </div>
              <div
                v-for="(public_volontaire, key) in publicsVolontaires"
                :key="key"
                class="flex items-center"
              >
                <svg
                  v-if="public_volontaire == 'Personnes en situation de handicap'"
                  class="w-6 h-6 mr-3"
                  fill="#808080"
                  height="23"
                  viewBox="0 0 23 23"
                  width="23"
                  xmlns="http://www.w3.org/2000/svg"
                ><path clip-rule="evenodd" d="m8.0615 15.3333c0 .2116-.17173.3834-.38333.3834-.21199 0-.38525-.1718-.38525-.3834s.16981-.3833.38103-.3833h.00422c.2116 0 .38333.1717.38333.3833zm3.6562 3.5091-.2564-.2569c-.1495-.1495-.3922-.1495-.5421 0-.1498.1499-.1498.3926 0 .5421l.2565.2568c-.9418.8169-2.16698 1.3156-3.50903 1.3156s-2.56757-.4987-3.50942-1.3156l.25645-.2568c.14988-.1495.14988-.3922 0-.5421-.1495-.1495-.39215-.1495-.54203 0l-.25645.2569c-.81689-.9423-1.31522-2.1674-1.31522-3.5091 0-1.342.49872-2.5672 1.3156-3.5094l.25607.2565c.07513.0747.17288.1123.27101.1123.09814 0 .19627-.0376.27102-.1123.14988-.1499.14988-.3926 0-.5421l-.25607-.2564c.94185-.8169 2.16737-1.31523 3.50904-1.31523 1.34166 0 2.56683.49833 3.50863 1.31523l-.2561.2561c-.1498.1498-.1498.3925 0 .5424.0748.0747.1729.1123.2711.1123.0981 0 .1962-.0376.271-.1123l.2564-.2561c.8169.9419 1.3156 2.1674 1.3156 3.509 0 1.3417-.4983 2.5668-1.3156 3.5091zm.286-7.8461c-.005-.0057-.0127-.0073-.0184-.0123-1.109-1.10167-2.6358-1.784-4.31863-1.784-1.68399 0-3.21042.68272-4.32017 1.7848-.00498.0046-.01188.0061-.01687.0115-.0046.0046-.00613.0115-.01111.0165-1.10247 1.1097-1.78519 2.6365-1.78519 4.3205 0 1.6852.68349 3.2127 1.7871 4.3225.00422.0042.00537.01.0092.0142.00422.0038.00997.005.0138.0088 1.10975 1.104 2.63772 1.7879 4.32324 1.7879 1.6836 0 3.21113-.6828 4.32013-1.7856.0054-.0042.0119-.0061.0169-.0111s.0069-.0115.0111-.0165c1.1021-1.1098 1.7852-2.6366 1.7852-4.3202 0-1.6832-.6827-3.2096-1.7844-4.319-.0046-.0057-.0065-.0126-.0119-.018zm-9.7037-10.612967c0-.2116.17135-.383333.38333-.383333h2.3c.15679 0 .29747.09545.35574.240733l1.43711 3.592597h6.64052c1.0568 0 1.9166.85982 1.9166 1.91667v.76667c0 .2116-.1717.38333-.3833.38333h-6.9c-.21198 0-.38333-.17173-.38333-.38333s.17135-.38334.38333-.38334h6.5167v-.38333c0-.63403-.516-1.15-1.15-1.15h-6.5167v2.3c0 .2116-.17173.38333-.38333.38333-.21199 0-.38334-.17173-.38334-.38333v-2.60973l-1.40951-3.523603h-2.04049c-.21198 0-.38333-.171734-.38333-.383334zm18.7833 21.849967c-.6344 0-1.15-.5159-1.15-1.15 0-.4991.3216-.9204.7667-1.0794v1.0794c0 .2116.1713.3834.3833.3834.2116 0 .3834-.1718.3834-.3834v-1.0794c.445.159.7666.5803.7666 1.0794 0 .6341-.5159 1.15-1.15 1.15zm.3834-3.0279v-6.5554-.7667c0-1.0568-.8599-1.91663-1.9167-1.91663h-4.7679c-.212 0-.3833.17173-.3833.38333s.1713.3833.3833.3833h4.7679c.634 0 1.15.516 1.15 1.15v.3834h-4.7737c-.2119 0-.3833.1717-.3833.3833s.1714.3833.3833.3833h4.7737v6.1721c-.874.1782-1.5333.9522-1.5333 1.8779 0 1.0569.8598 1.9167 1.9166 1.9167 1.0569 0 1.9167-.8598 1.9167-1.9167 0-.9257-.6597-1.6997-1.5333-1.8779zm-13.80003-1.5721c-1.26845 0-2.3-1.0315-2.3-2.3 0-1.2684 1.03155-2.3 2.3-2.3 1.26806 0 2.3 1.0316 2.3 2.3 0 1.2685-1.03194 2.3-2.3 2.3zm0-5.3666c-1.69089 0-3.06667 1.3757-3.06667 3.0666s1.37578 3.0667 3.06667 3.0667c1.69088 0 3.06663-1.3758 3.06663-3.0667s-1.37575-3.0666-3.06663-3.0666zm0 9.9666c-3.80459 0-6.900003-3.0954-6.900003-6.9s3.095413-6.89997 6.900003-6.89997c3.80453 0 6.90003 3.09537 6.90003 6.89997s-3.0955 6.9-6.90003 6.9zm0-14.56663c-4.22779 0-7.66667 3.43923-7.66667 7.66663s3.43888 7.6667 7.66667 7.6667c4.22743 0 7.66663-3.4393 7.66663-7.6667s-3.4392-7.66663-7.66663-7.66663z" fill-rule="evenodd" /></svg>
                <svg
                  v-else-if="public_volontaire == 'Mineurs'"
                  class="w-6 h-6 mr-3"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="#808080"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4463 14.3C13.4463 14.0608 13.2526 13.8666 13.013 13.8666H13.0087C12.7695 13.8666 12.5775 14.0608 12.5775 14.3C12.5775 14.5392 12.7738 14.7333 13.013 14.7333C13.2526 14.7333 13.4463 14.5392 13.4463 14.3ZM15.1666 11.7C15.4058 11.7 15.6 11.5058 15.6 11.2666H16.0333C16.2725 11.2666 16.4666 11.0725 16.4666 10.8333C16.4666 10.5941 16.2725 10.4 16.0333 10.4H14.3C14.0608 10.4 13.8666 10.5941 13.8666 10.8333C13.8666 11.0725 14.0608 11.2666 14.3 11.2666H14.7333C14.7333 11.5058 14.9274 11.7 15.1666 11.7ZM25.9869 25.4613L25.5445 23.6964C25.3218 23.0282 24.0066 20.8788 16.4666 20.8203V20.3666C16.4666 20.1274 16.2725 19.9333 16.0333 19.9333C15.7941 19.9333 15.6 20.1274 15.6 20.3666V21.2333C15.6 21.2363 15.6017 21.2389 15.6017 21.242C15.6017 21.2446 15.6 21.2467 15.6 21.2498C15.5982 21.5141 15.5111 23.8333 13 23.8333C10.4888 23.8333 10.4017 21.4981 10.4 21.2333V20.3666C10.4 20.1274 10.2059 19.9333 9.96667 19.9333C9.72747 19.9333 9.53333 20.1274 9.53333 20.3666V20.8043C3.91866 20.8485 1.10634 21.7446 0.446374 23.728L0.0130426 25.4613C-0.0450238 25.6936 0.0962422 25.9289 0.328508 25.987C0.559907 26.045 0.795639 25.9038 0.853706 25.6719L1.27794 23.9702C1.78147 22.4601 4.49282 21.7056 9.56193 21.6679C9.71923 22.9086 10.5629 24.7 13 24.7C15.4366 24.7 16.2803 22.9194 16.438 21.6853C22.3773 21.729 24.4425 23.1309 24.7129 23.9386L25.1463 25.6719C25.1957 25.8687 25.372 26 25.5662 26C25.6013 26 25.6364 25.9961 25.6719 25.987C25.9042 25.9289 26.045 25.6936 25.9869 25.4613ZM13 16.9C14.017 16.9 14.5491 16.3969 14.6063 16.3397C14.7736 16.1724 14.7732 15.9046 14.6089 15.7347C14.4443 15.5644 14.1713 15.5601 13.9984 15.7222C13.9849 15.7347 13.6582 16.0333 13 16.0333C12.3513 16.0333 12.0246 15.7434 12.002 15.7226C11.8326 15.5575 11.5613 15.5592 11.3936 15.7269C11.2246 15.8964 11.2246 16.1702 11.3936 16.3397C11.4513 16.3969 11.9834 16.9 13 16.9ZM12.1333 10.8333C12.1333 10.5941 11.9392 10.4 11.7 10.4H9.96667C9.72747 10.4 9.53333 10.5941 9.53333 10.8333C9.53333 11.0725 9.72747 11.2666 9.96667 11.2666H10.4C10.4 11.5058 10.5941 11.7 10.8333 11.7C11.0725 11.7 11.2667 11.5058 11.2667 11.2666H11.7C11.9392 11.2666 12.1333 11.0725 12.1333 10.8333ZM5.20002 11.7V9.96665C5.20002 9.24992 5.78328 8.66665 6.50001 8.66665C6.73921 8.66665 6.93335 8.86078 6.93335 9.09998C6.93725 9.23778 6.97798 9.39768 7.12531 9.47915C7.48888 8.74292 7.80001 8.04179 7.80001 7.36665C7.80001 7.12745 7.99414 6.93332 8.23334 6.93332C10.8507 6.93332 14.9231 5.77459 15.6619 4.54349C15.762 4.37666 15.9609 4.29693 16.149 4.34893C16.3366 4.40093 16.4666 4.57209 16.4666 4.76666C16.4666 6.30282 18.057 7.91092 18.073 7.92695C18.2424 8.09639 18.2424 8.37025 18.073 8.53969C17.904 8.70912 17.6297 8.70912 17.4603 8.53969C17.397 8.47642 16.1507 7.21542 15.7343 5.70396C14.1721 6.91165 10.8554 7.70205 8.63807 7.79132C8.53061 8.60772 8.13714 9.39552 7.75451 10.1603C7.68084 10.3072 7.53091 10.4 7.36668 10.4C6.72838 10.4 6.36222 10.0516 6.18975 9.66462C6.11392 9.74262 6.06668 9.84922 6.06668 9.96665V11.7C6.06668 11.9387 6.26125 12.1333 6.50001 12.1333C6.68678 12.1333 6.85231 12.2525 6.91125 12.4297C6.91948 12.4553 7.77314 15.0102 8.18784 15.8396C8.25371 15.9713 9.83753 19.0666 13 19.0666C16.1624 19.0666 17.7467 15.9713 17.8126 15.8396C18.2273 15.0102 19.0805 12.4553 19.0887 12.4297C19.1481 12.2525 19.3136 12.1333 19.5 12.1333C19.7387 12.1333 19.9333 11.9387 19.9333 11.7V9.96665C19.9333 9.72788 19.7387 9.53332 19.5 9.53332C19.2608 9.53332 19.0666 9.33918 19.0666 9.09998V6.49999C19.0662 6.32362 19.0086 2.16666 15.1666 2.16666C15.0167 2.16666 14.8772 2.08866 14.7983 1.96126C14.7194 1.83343 14.7121 1.67396 14.7792 1.53963C14.8637 1.3702 14.8273 1.31083 14.813 1.28873C14.7164 1.13186 14.2254 0.866665 13 0.866665C6.16505 0.866665 6.06755 7.10189 6.06668 7.36709C6.06625 7.60629 5.87212 7.79955 5.63335 7.79955H5.63292C5.39372 7.79955 5.20002 7.60585 5.20002 7.36665C5.20002 7.29299 5.28929 0 13 0C13.9286 0 15.125 0.1443 15.5506 0.832865C15.6255 0.954632 15.6936 1.1193 15.7005 1.32383C19.0324 1.6289 19.9333 4.78919 19.9333 6.49999V8.74075C20.4377 8.91972 20.8 9.40158 20.8 9.96665V11.7C20.8 12.3045 20.3853 12.8141 19.8254 12.9588C19.5931 13.6426 18.9527 15.4968 18.5878 16.227C17.8992 17.6037 15.9479 19.9333 13 19.9333C10.052 19.9333 8.10074 17.6037 7.41261 16.227C7.04731 15.4968 6.40685 13.6426 6.17502 12.9588C5.61515 12.8141 5.20002 12.3045 5.20002 11.7Z" />
                </svg>

                <div class="text-cool-gray-500">
                  {{ public_volontaire }}
                </div>
              </div>
            </div>
          </Box>

          <Box class="flex flex-col sm:flex-row gap-6 xl:gap-8 text-center sm:text-left">
            <img
              v-if="
                mission.structure.logo &&
                  (mission.structure.logo.thumb || mission.structure.logo.original)
              "
              :src="
                mission.structure.logo.thumb
                  ? mission.structure.logo.thumb
                  : mission.structure.logo.original
              "
              :alt="mission.structure.name"
              class="mx-auto lg:mx-0 my-auto h-20 object-contain"
              style="max-width: 150px"
            >

            <div>
              <h2 class="font-bold text-2xl tracking-[-1px] mb-4">
                Découvrez <span class="lowercase">{{ mission.structure.statut_juridique|label('structure_legal_status')|prefix }}</span>
                <component
                  :is="
                    mission.structure.statut_juridique == 'Association' && mission.structure.state == 'Validée' ? 'nuxt-link' : 'span'
                  "
                  target="_blank"
                  :to="`/organisations/${mission.structure.slug}`"
                  class="font-extrabold uppercase"
                >
                  {{ mission.structure.name }}
                </component>
              </h2>
              <div class="text-cool-gray-500 line-clamp-3">
                {{ mission.structure.description }}
              </div>

              <Button variant="white" rounded class="mt-4">
                <nuxt-link
                  v-if="mission.structure.statut_juridique == 'Association' && mission.structure.state == 'Validée'"
                  :to="`/organisations/${mission.structure.slug}`"
                >
                  En savoir plus
                </nuxt-link>
              </Button>
            </div>
          </Box>
        </div>

        <Box class="mt-6 lg:w-96 lg:mt-0 z-20 flex-shrink-0 sticky top-6" :padding="false">
          <img
            :src="illustration.default"
            :srcset="illustration.x2 ? `${illustration.x2} 2x` : false"
            alt=""
            class="w-full object-cover object-top"
            style="min-height: 180px"
            @error="defaultThumbnail($event)"
          >

          <component
            :is="mission.structure.statut_juridique == 'Association' && mission.structure.state == 'Validée'? 'nuxt-link' : 'div'"
            v-if="mission.structure.logo && (mission.structure.logo.thumb || mission.structure.logo.original)"
            target="_blank"
            :to="`/organisations/${mission.structure.slug}`"
            class="left-2/4 absolute -translate-x-1/2 -translate-y-3/4 bg-white shadow-lg rounded-xl p-4"
          >
            <img
              :src="mission.structure.logo.thumb ? mission.structure.logo.thumb : mission.structure.logo.original"
              :alt="mission.structure.name"
              class="my-auto h-10 object-contain"
              style="max-width: 120px"
            >
          </component>

          <div class="bg-white py-12">
            <div class="px-4 text-center">
              <div class="font-extrabold text-xl">
                <template v-if="!mission.has_places_left">
                  La mission est désormais complète
                </template>

                <template v-else>
                  <template
                    v-if="['Terminée', 'Annulée'].includes(mission.state)"
                  >
                    Ils recherchaient
                  </template>
                  <template v-else>
                    Ils recherchent
                  </template>

                  {{ mission.participations_max|pluralize('bénévole', 'bénévoles') }}
                </template>
              </div>

              <template v-if="participationsCount">
                <div
                  class="mt-2 uppercase text-cool-gray-500 text-xs font-bold"
                >
                  {{ participationsCount|pluralize('personne déjà inscrite','personnes déjà inscrites') }}
                </div>

                <div class="mt-4 flex justify-center">
                  <img
                    v-for="(portrait, index) in portraits"
                    :key="index"
                    :src="portrait"
                    alt=""
                    :class="[{ '-ml-1': index !== 0 }]"
                    class="portrait rounded-full"
                    style="width: 34px"
                  >
                  <div
                    v-if="participationsCount - 3 > 0"
                    class="h-9 w-9 text-cool-gray-500 shadow bg-gray-50 border font-bold inline-flex items-center justify-center rounded-full text-xs -ml-1"
                  >
                    {{ formattedBenevoleCount }}
                  </div>
                </div>
              </template>
            </div>

            <div class="px-8 sm:px-32 lg:px-8 mt-4 sm:mt-8">
              <div
                v-if="dates.length"
                class="grid sm:divide-x border-b pb-3 sm:pb-0"
                :class="[{ 'sm:grid-cols-2': dates.length == 2 }]"
              >
                <div
                  v-for="(date, i) in dates"
                  :key="i"
                  class="mx-auto sm:mx-0 sm:pb-3"
                  :class="[{ 'sm:pr-3': i == 0 }, { 'sm:pl-3': i == 1 }]"
                >
                  <div
                    class="flex items-center flex-col sm:flex-row gap-2"
                    :class="[{ 'justify-center': dates.length == 1 }]"
                  >
                    <CalendarIcon class="hidden sm:block  text-cool-gray-400" />

                    <div
                      class="font-bold text-center sm:text-left flex gap-2 items-baseline sm:block"
                    >
                      <div class="text-[#777E90]" style="font-size: 11px">
                        {{ date.label }}
                      </div>
                      <div class="text-black">
                        {{ date.date }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mx-8 sm:mx-12">
              <div v-if="mission.commitment__duration" class="text-center">
                <div
                  class="mt-6 uppercase text-[#777E90] text-xs font-bold"
                >
                  Engagement minimum
                </div>
                <div class="font-bold">
                  <span>{{ mission.commitment__duration|label('duration') }}</span>
                  <template v-if="mission.commitment__time_period">
                    <span class="font-normal">par</span>
                    <span>{{ mission.commitment__time_period|label('time_period') }}</span>
                  </template>
                </div>
              </div>

            <!-- <ButtonJeProposeMonAide
              class="mt-6"
              additional-btn-classes="shadow-xl"
              :mission="mission"
            /> -->
            </div>
          </div>
        </Box>
      </div>
    </div>
    <div
      v-if="similarMissions.length > 0"
      class="bg-[#282562] border-t-8 border-jva-red-500 overflow-hidden"
    >
      <div class="container mx-auto px-8 sm:px-4">
        <div class="pt-16 pb-24">
          <div class="text-white font-bold text-4xl text-center mb-8">
            Vous pourriez aussi aimer&nbsp;…
          </div>

          <Slideshow
            class="mb-6"
            :slides-are-links="true"
            :slides-count="similarMissions.length"
          >
            <nuxt-link
              v-for="mission in similarMissions"
              :key="mission.id"
              class="card--mission--wrapper"
              :to="`/missions-benevolat/${mission.id}/${mission.slug}`"
            >
              <CardMission :mission="mission" class="!h-full" />
            </nuxt-link>
          </Slideshow>

          <div class="text-center">
            <nuxt-link
              :to="`/missions-benevolat?refinementList[domaines][0]=${mission.domaine_name}`"
              class="inline-block border-2 border-gray-500 rounded-full text-white hover:border-white !outline-none focus:ring transition font-bold text-sm px-4 py-2 mt-6"
            >
              Plus de missions
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '~/components/layout/Breadcrumb.vue'
import Slideshow from '~/components/advanced/Slideshow'
import CardMission from '~/components/card/Mission'

export default {
  components: {
    Breadcrumb,
    Slideshow,
    CardMission
  },
  async asyncData ({ $api, params, error, store }) {
    const { data: mission } = await $api.getMission(params.id).catch((err) => {
      return error({ statusCode: err.response.status, message: err.response.statusText })
    })

    // if (['Brouillon', 'En attente de validation'].includes(mission.state)) {
    //   // Si on est pas modérateur
    //   // Ou si on n'est pas responsable de la structure
    //   if (store.getters.isLogged) {
    //     if (
    //       store.getters.user.context_role != 'admin' &&
    //       !store.getters.user.profile.structures.filter(
    //         structure => structure.id == mission.structure_id
    //       ).length
    //     ) {
    //       return error({ statusCode: 403 })
    //     }
    //   } else {
    //     return error({ statusCode: 403 })
    //   }
    // }

    // // Si mission signalée ou organisation désinscrite / signalée / en attente de validation
    // if (
    //   ['Signalée'].includes(mission.state) ||
    //   ['Désinscrite', 'Signalée', 'En attente de validation'].includes(
    //     mission.structure.state
    //   )
    // ) {
    //   if (store.getters.isLogged) {
    //     // Si on est pas modérateur
    //     // Si on ne participe pas à cette mission
    //     // Ou si on n'est pas responsable de la structure
    //     if (
    //       store.getters.user.context_role != 'admin' &&
    //       !store.getters.user.profile.participations.filter(
    //         participation => participation.mission_id == mission.id
    //       ).length &&
    //       !store.getters.user.profile.structures.filter(
    //         structure => structure.id == mission.structure_id
    //       ).length
    //     ) {
    //       return error({ statusCode: 403 })
    //     }
    //   } else {
    //     return error({ statusCode: 403 })
    //   }
    // }

    return {
      mission
    }
  },
  data () {
    return {
      similarMissions: []
    }
  },
  async fetch () {
    const { data: missions } = await this.$api.similarMission(this.mission.id)
    this.similarMissions = missions
  },
  computed: {
    dates () {
      const dates = []
      const startDate = this.mission.start_date?.substring(0, 10)
      const endDate = this.mission.end_date?.substring(0, 10)
      const startDateYear = startDate?.substring(0, 4)
      const endDateYear = endDate?.substring(0, 4)
      const format =
        startDate && endDate && startDateYear !== endDateYear
          ? 'D MMMM YYYY'
          : 'D MMMM'

      // Si date de départ dépassée et pas de date de fin, masquer les dates
      if (this.$dayjs(startDate).isBefore(this.$dayjs()) && !endDate) {
        return dates
      }

      if (startDate) {
        dates.push({
          date: this.$dayjs(startDate).format(format),
          label: 'À PARTIR DU'
        })
      }

      if (endDate) {
        dates.push({
          date: this.$dayjs(endDate).format(format),
          label: "JUSQU'AU"
        })
      }

      return dates
    },
    domainName () {
      return (
        this.mission?.domaine?.name.fr ??
        this.mission?.template?.domaine?.name.fr ??
        null
      )
    },
    formattedBenevoleCount () {
      const count = this.participationsCount - 3
      return count < 1000 ? `+${count}` : '+1k'
    },
    participationsCount () {
      return this.mission.participations_max - this.mission.places_left
    },
    portraits () {
      const portraits = []
      const randomNumbers = []
      const portraitsCount = 74 // The total number of portraits existing
      const portraitsToGetCount = Math.min(this.participationsCount, 3)

      while (randomNumbers.length < portraitsToGetCount) {
        const result = Math.floor(Math.random() * portraitsCount) + 1
        if (!randomNumbers.includes(result)) {
          randomNumbers.push(result)
        }
      }

      randomNumbers.forEach((i) => {
        portraits.push(`/images/portraits/${i}.png`)
      })

      return portraits
    },
    publicsVolontaires () {
      return this.mission.publics_volontaires
        ? this.mission.publics_volontaires.filter(
          item =>
            ![
              'Jeunes volontaires du Service National Universel',
              'Personnes en situation de handicap'
            ].includes(item)
        )
        : []
    },
    illustration () {
      if (this.mission.structure.statut_juridique === 'Association') {
        if (this.mission.structure?.override_image_1?.original) {
          return {
            default:
              this.mission.structure.override_image_1.large ??
              this.mission.structure.override_image_1.original,
            x2: null
          }
        } else if (this.mission.structure.image_1) {
          return {
            default: `/images/organisations/domaines/${this.mission.structure.image_1}.jpg`,
            x2: null
          }
        }
      }
      return {
        default: '/images/missions/mission-default.jpg',
        x2: '/images/missions/mission-default@2x.jpg'
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
  .custom-gradient {
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0) 70.1%
    );
  }
  .custom-gradient-2 {
    background: linear-gradient(to right, #070191 5px, #eeedf7 5px);
  }
  .citation {
    display: flex;
    &::before {
      content: '“\00A0';
    }
    &::after {
      content: '\00A0”';
    }
  }

  .card--mission--wrapper {
    @apply !flex flex-col h-full max-w-[323px] rounded-[10px] transition;
    width: calc(100vw - 64px) !important;
    @apply w-full;
  }

  ::v-deep .slick-slider {
    .slick-arrow {
      &.slick-prev {
        @apply translate-x-[-104px];
      }
      &.slick-next {
        @apply translate-x-[104px];
      }
    }
}
</style>
