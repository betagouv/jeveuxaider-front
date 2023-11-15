<template>
  <div class="bg-white pb-12 md:pb-20">
    <div class="container">
      <DsfrHeading as="h2" size="alt-md" class="py-16 xl:pt-24 xl:pb-24 text-center">
        <span class="relative">
          <span>Le bénévolat en quelques mots</span>
          <img
            src="/images/home/sparkle-right.svg"
            alt=""
            width="40"
            height="43"
            aria-hidden="true"
            class="absolute right-[-22px] top-[35px] xxs:top-[40px] sm:top-[-10px] w-8 xl:w-[50px] xl:right-[-40px] xl:top-[-20px] pointer-events-none"
          />
        </span>
      </DsfrHeading>
      <DsfrTabs
        name="Catégories de faq"
        :tabs="[
          { key: 'benevoles', content: 'Bénévoles' },
          { key: 'organisations', content: 'Organisations' },
        ]"
      >
        <template #tab-benevoles>
          <div class="px-4 py-8">
            <DsfrAccordionsGroup>
              <DsfrAccordion>
                <template #title>
                  Quelles sont les associations qui recherchent des bénévoles ?
                </template>
                <div class="formatted-text mb-6">
                  <p>
                    Il existe de nombreuses associations qui recherchent des bénévoles dans des
                    domaines d’action variés. Voici quelques exemples que vous connaissez à coup sûr
                    !
                  </p>
                  <ol>
                    <li>
                      <NuxtLink no-prefetch to="/organisations/14543-les-restos-du-coeur">
                        Les Restos du Cœur</NuxtLink
                      >
                      : cette association lutte contre la précarité et l'exclusion en distribuant
                      des repas aux personnes dans le besoin. Ils sont souvent à la recherche de
                      bénévoles pour la collecte et la distribution de denrées alimentaires et
                      produits de première nécessité.
                    </li>
                    <li>
                      <NuxtLink no-prefetch to="/organisations/9425-croix-rouge-francaise"
                        >La Croix-Rouge</NuxtLink
                      >
                      : organisation humanitaire internationale, la Croix-Rouge propose diverses
                      actions bénévoles, telles que les premiers secours, l'accompagnement des
                      personnes vulnérables, ou le secours aux migrants.
                    </li>
                    <li>
                      <NuxtLink no-prefetch to="/reseaux/6-petits-freres-des-pauvres"
                        >Les Petits Frères des Pauvres</NuxtLink
                      >
                      : cette association s'engage auprès des personnes âgées, isolées et précaires.
                      Les bénévoles peuvent rendre visite aux bénéficiaires, organiser des sorties
                      ou participer à des activités de loisirs.
                    </li>
                    <li>
                      <NuxtLink no-prefetch to="/organisations/6204-1-dechet-par-jour"
                        >1 déchet par jour</NuxtLink
                      >
                      : cette association de Bien-Fêteurs a pour objectif de rassembler tous ceux
                      qui veulent créer une barrière humaine entre la nature et les déchets. 1
                      déchet par jour investi une gestuelle quotidienne commune : se baisser,
                      ramasser et jeter dans la poubelle appropriée les déchets qui trainent au sol,
                      dans notre cadre de vie.
                    </li>
                    <li>
                      <NuxtLink no-prefetch to="/organisations/9655-secours-populaire-francais"
                        >Secours Populaire Français</NuxtLink
                      >
                      : cette association agit contre la pauvreté et l'exclusion en proposant des
                      actions de solidarité. Les bénévoles peuvent participer à des maraudes, des
                      distributions alimentaires ou des activités de soutien scolaire.
                    </li>
                    <li>
                      <NuxtLink
                        no-prefetch
                        to="/organisations/7384-la-societe-protectrice-des-animaux-la-spa"
                        >La Société Protectrice des Animaux</NuxtLink
                      >
                      : la SPA agit quotidiennement pour faire évoluer la cause animale. Les
                      bénévoles assurent la protection et la défense des animaux sur l'ensemble du
                      territoire en luttant contre la maltraitance et les abandons.
                    </li>
                    <li>
                      <NuxtLink no-prefetch to="/activites/medical">Médecins du Monde</NuxtLink>
                      : organisation médicale humanitaire, Médecins du Monde recherche régulièrement
                      des professionnels de la santé bénévoles pour intervenir dans les zones de
                      crise et les pays en développement. L’ONG lutte depuis 1980 pour garantir un
                      accès universel et durable aux soins.
                    </li>
                  </ol>
                </div>
              </DsfrAccordion>
              <DsfrAccordion>
                <template #title> Comment devenir bénévole ? </template>
                <div class="formatted-text mb-6">
                  <p>
                    Découvrez les étapes pour devenir bénévole et bien choisir sa mission et son
                    association. Suivez le guide !
                  </p>
                  <ol>
                    <li>
                      Choisissez votre domaine d’action : réfléchissez aux thématiques et aux causes
                      qui vous tiennent à cœur. Il peut s'agir de l'environnement, de la lutte
                      contre la pauvreté, de l'éducation, de la santé, etc. Vous pourrez ainsi
                      filtrer votre recherche par domaine d’action sur JeVeuxAider.gouv.fr. La
                      plate-forme vous proposera des missions bénévoles en lien qui se déroulent
                      près de chez vous. Vous pourrez même faire du bénévolat à distance depuis
                      votre salon en sélectionnant “depuis chez moi” !
                    </li>
                    <li>
                      Choisissez une structure : vous pouvez effectuer votre bénévolat au sein d’une
                      association, d’une collectivité ou d’une organisation publique. 12 750
                      organisations sont inscrites sur le site. C’est vaste. Demandez-vous ce qui
                      compte pour vous : taille humaine, ambiance, secteur, public aidé. Les
                      témoignages de bénévoles et la présentation de l’organisme sont là pour vous
                      aider à faire votre choix. Vous pouvez aussi compléter avec vos propres
                      recherches.
                    </li>
                    <li>
                      Contactez les organisations : ça y est vous avez sélectionné votre mission sur
                      JeVeuxAider.gouv.fr. Maintenant, indiquez votre intérêt à devenir bénévole sur
                      la mission. Vous serez alors mis en relation avec le porteur de projet et vous
                      pourrez obtenir des informations complémentaires.
                    </li>
                    <li>
                      Rencontrez l'association : dans de nombreux cas, les associations organisent
                      une réunion d'information à destination des nouveaux bénévoles. Profitez de
                      cette occasion pour rencontrer l’équipe, partager un premier temps de
                      convivialité. Posez vos questions, discutez des attentes et des enjeux afin
                      d’évaluer si cela correspond à ce que vous recherchez.
                    </li>
                    <li>
                      Commencez votre bénévolat : une fois que vous vous êtes mis d’accord sur le
                      cadre de votre action avec le responsable associatif, vous pourrez commencer
                      votre action de bénévolat. Respectez les horaires convenus car même si vous
                      n’avez rien signé, un organisme compte sur vous 😉. De son côté l’association
                      fera tout pour que votre mission se passe comme sur des roulettes.
                      L’engagement est valable dans les deux sens.
                    </li>
                  </ol>

                  <p>
                    Rappelez-vous que le bénévolat est une activité non rémunérée sur du temps
                    personnel. Il est important d’opter pour une cause qui vous porte et qui
                    correspond à vos envies, comme à vos disponibilités. Si d’aventure, une
                    expérience ne vous convenait pas, vous avez le droit de changer d’avis,
                    d’essayer autre chose, pour trouver l’activité et l’association qui vous
                    correspond ! Rien ne vous oblige à devenir bénévole sur le long terme.
                  </p>
                </div>
              </DsfrAccordion>
              <DsfrAccordion>
                <template #title> Qui peut faire du bénévolat ? </template>
                <div class="formatted-text mb-6">
                  <p>
                    Les timides, les personnes à mobilité réduite, les pressés, les pessimistes, les
                    optimistes, les mineurs, les infatigables… Le bénévolat est accessible à qui le
                    souhaite. Sur JeVeuxAider.gouv.fr, les
                    <NuxtLink no-prefetch to="/missions-benevolat">missions de bénévolat</NuxtLink
                    > sont ouvertes à toute personne âgée de plus de 16 ans et résidant en France,
                    sans condition de nationalité. Parmi les publics et leurs motivations, on trouve
                    :
                  </p>
                  <ol>
                    <li>
                      Les adultes : que vous soyez actif ou non, vous pouvez consacrer une partie de
                      votre temps libre à des activités bénévoles. A vous de déterminer si vous
                      souhaitez mettre vos compétences au service d’une cause. Par exemple, un
                      avocat peut fournir une assistance juridique et un informaticien, soutenir une
                      organisation dans la gestion de son infrastructure numérique. A l’inverse, le
                      bénévolat peut aussi composer une échappée qui va nourrir votre curiosité pour
                      d’autres thématiques.
                    </li>
                    <li>
                      <NuxtLink
                        no-prefetch
                        to="https://www.jeveuxaider.gouv.fr/engagement/actualites/le-benevolat-dans-le-cadre-du-contrat-dengagement-jeunes-cej-les-beneficiaires-temoignent/"
                        >Les jeunes</NuxtLink
                      > : étudiants ou non, certaines associations proposent des programmes
                      spécifiques pour les jeunes bénévoles. Cela peut représenter une excellente
                      occasion d’acquérir de l'expérience, de développer des compétences qui
                      viennent enrichir un parcours éducatif et professionnel, tout en agissant
                      concrètement en faveur de causes qui comptent. Depuis septembre 2021, sur
                      JeVeuxAider.gouv.fr, 1 bénévole sur 2 qui s'inscrit à moins de 30 ans.
                    </li>
                    <li>
                      <NuxtLink
                        no-prefetch
                        to="https://www.jeveuxaider.gouv.fr/engagement/actualite/lengagement-associatif-des-seniors-une-source-doptimisme/"
                        >Les séniors</NuxtLink
                      >
                      : les personnes âgées sont souvent investies durablement dans le bénévolat.
                      Leurs compétences, leur expérience de vie et leur disponibilité sont
                      précieuses pour de nombreuses organisations, y compris sur des missions de
                      gouvernance.
                    </li>
                  </ol>
                  <p>
                    Il est important de noter que certaines activités bénévoles peuvent comporter
                    des exigences spécifiques, telles que des compétences, une formation ou une
                    disponibilité particulière. Prenez le temps de lire les annonces. Pour quelques
                    heures, une ou plusieurs fois par mois, il y a forcément une mission qui
                    correspond à vos envies et à votre contexte.
                  </p>
                </div>
              </DsfrAccordion>
              <DsfrAccordion>
                <template #title>
                  Quels sont les avantages et les inconvénients du bénévolat ?
                </template>
                <div class="formatted-text mb-6">
                  <p>
                    Voici les principaux avantages et inconvénients du bénévolat. Attention spoiler
                    : la grande majorité des missions bénévoles sont synonymes d’expériences
                    collectives inoubliables.
                  </p>
                  <p class="underline">Avantages du bénévolat :</p>
                  <ol>
                    <li>
                      Satisfaction personnelle : le bénévolat permet de faire une différence dans la
                      vie des autres, de se reconnecter à la société et d’œuvrer positivement en
                      faveur d’un projet collectif qui fait sens. Cet engagement procure un double
                      sentiment d’utilité et d'accomplissement.
                    </li>
                    <li>
                      Développer de compétences : le bénévolat permet de développer des compétences
                      et d’en acquérir de nouvelles, qu'elles soient techniques ou relationnelles.
                      Cela vient enrichir votre parcours personnel et professionnel.
                    </li>
                    <li>
                      Réseautage : le bénévolat est un levier puissant pour tisser du lien humain,
                      investir des cercles intergénérationnels auprès de nouvelles personnes. Il est
                      rare qu’une mission de bénévolat soit solitaire. Le cœur battant du secteur de
                      la solidarité c’est ce collectif, et le soin qu’on y porte.
                    </li>
                    <li>
                      <NuxtLink
                        no-prefetch
                        to="https://www.jeveuxaider.gouv.fr/engagement/actualite/le-benevolat-pour-trouver-sa-voie-professionnelle/"
                        >Découvrir de nouvelles passions</NuxtLink
                      >
                      : tester un domaine, un rôle, faire un pas de côté, essayer, se
                      tromper, écouter plus attentivement sa petite voix  : c’est aussi ça le
                      bénévolat : une occasion d'élargir vos horizons.
                    </li>
                    <li>
                      Rejoindre une
                      <NuxtLink
                        no-prefetch
                        to="/missions-benevolat/13190/benevolat-jeveuxaidergouvfr-paris"
                        >communauté</NuxtLink
                      >
                      : le bénévolat renforce le tissu social et contribue à la construction de
                      communautés qui se rassemblent autour du “chacun pour tous”. Votre engagement
                      favorise la solidarité, l'entraide et le sentiment d'appartenance à un groupe.
                      Vous réancrez une habitude : celle de tisser de nouvelles relations.
                    </li>
                  </ol>
                  <p class="underline">Inconvénients du bénévolat :</p>
                  <ol>
                    <li>
                      Contraintes de temps : le bénévolat peut demander un investissement de temps
                      significatif, ce qui peut être difficile à concilier avec d'autres contraintes
                      personnelles, familiales ou professionnelles. Avant de vous lancer,
                      demandez-vous combien de temps vous souhaitez consacrer à votre engagement
                      bénévole.
                    </li>
                    <li>
                      <NuxtLink
                        no-prefetch
                        to="https://www.jeveuxaider.gouv.fr/engagement/actualite/lumiere-sur-le-benevolat-daccompagnement/"
                        >Charge émotionnelle</NuxtLink
                      >
                      : ce n’est pas toujours évident de ramasser des bouteilles à la mer et d’aider
                      des personnes en situation de vulnérabilité, de maladies ou de détresse. Le
                      bénévolat, peut être émotionnellement exigeant. D’ailleurs, les organisations
                      proposent souvent une formation sur mesure pour préparer les bénévoles à ces
                      enjeux.
                    </li>
                    <li>
                      Absence de reconnaissance financière : le bénévolat est une situation dans
                      laquelle une personne apporte temps et compétences à titre gratuit pour
                      l’intérêt général. Ce qui signifie que votre bénévolat ne vous procure pas de
                      revenus financiers. Selon les missions, des frais induits par l’activité
                      (déplacement, hébergement..) peuvent être dédommagés.
                    </li>
                  </ol>
                </div>
              </DsfrAccordion>
              <DsfrAccordionsGroup>
                <DsfrAccordion>
                  <template #title> Comment s’engager dans une association ? </template>
                  <div class="formatted-text mb-6">
                    <p>Pour s’engager dans une association, voici quelques étapes à suivre :</p>
                    <ol>
                      <li>
                        Choisissez une cause qui vous passionne : identifiez les domaines qui vous
                        intéressent et les causes pour lesquelles vous souhaitez vous engager.
                        Réfléchissez à vos valeurs, à ce qui vous motive et à ce que vous voulez
                        accomplir en tant que bénévole.
                      </li>
                      <li>
                        Faites des recherches : trouvez des associations qui travaillent dans le
                        domaine qui vous intéresse. De nombreuses options s’offrent à vous. Vous
                        pouvez : utiliser JeVeuxAider.gouv.fr, consulter des répertoires
                        d'associations, faire marcher le bouche-à-oreille : demandez des
                        recommandations à des amis, des collègues ou à votre entourage.
                      </li>
                      <li>
                        Renseignez-vous sur l'association : apprenez-en davantage sur l'association
                        qui vous intéresse. Consultez son site web, lisez ses publications, ses
                        mesures d’impact ou sa page sur les réseaux sociaux. Comprenez sa mission,
                        ses activités et sa raison d’être.
                      </li>
                      <li>
                        Contactez l'association : prenez contact avec l'association pour lui
                        indiquer votre intérêt à vous engager. Expliquez brièvement pourquoi vous
                        souhaitez vous impliquer et demandez, si nécessaire, des précisions sur les
                        opportunités de bénévolat disponibles.
                      </li>
                      <li>
                        Rencontrez l'association : dans de nombreux cas, l'association organise une
                        réunion d'information ou une entrevue avec les bénévoles potentiels.
                        Profitez de cette occasion pour en apprendre davantage sur l'association,
                        ses valeurs, ses objectifs et les attentes vis-à-vis des bénévoles. Posez
                        des questions pour clarifier vos doutes et assurez-vous que cela correspond
                        à ce que vous recherchez.
                      </li>
                      <li>
                        Identifiez vos compétences et disponibilités : réfléchissez à vos attentes,
                        à vos connaissances et à vos disponibilités. Discutez avec l'association
                        pour trouver un rôle qui correspond à leurs besoins mais aussi à vos
                        capacités, vos envies et votre emploi du temps.
                      </li>
                      <li>
                        Commencez votre mission : vous pouvez commencer votre engagement au sein de
                        l'association. Respectez les horaires convenus, un organisme compte sur vous
                        😉. De son côté l’association fera tout pour que votre mission se passe
                        comme sur des roulettes. L’engagement est valable dans les deux sens.
                      </li>
                    </ol>
                    <p>
                      Chaque association peut avoir ses propres processus d'engagement de bénévoles.
                      Surtout, préparez-vous à faire de belles rencontres et à contribuer de manière
                      positive à la cause qui vous tient à cœur !
                    </p>
                  </div>
                </DsfrAccordion>
              </DsfrAccordionsGroup>
            </DsfrAccordionsGroup>
          </div>
        </template>

        <template #tab-organisations>
          <div class="px-4 py-8">
            <DsfrAccordionsGroup>
              <DsfrAccordion>
                <template #title> Comment attirer de nouveaux bénévoles ? </template>
                <div class="formatted-text mb-6">
                  <p>
                    Les bénévoles représentent la force vive des organisations. En offrant une
                    expérience de bénévolat significative, en communiquant régulièrement, ou encore
                    en célébrant leurs réussites, les associations peuvent améliorer leur capacité à
                    engager durablement des bénévoles aussi passionnés que motivés ! Nos conseils :
                  </p>
                  <ol>
                    <li>
                      Une mission bien rédigée : elle doit être informative, claire et donner envie.
                      Assurez-vous que la mission et les objectifs sont clairement définis. Les
                      bénévoles sont attirés par des causes qui résonnent avec leurs valeurs
                      personnelles et participent à changer le monde. Mettez en avant l’impact
                      concret qu’a votre association et montrez comment les bénévoles contribuent à
                      ces réalisations.
                    </li>
                    <li>
                      Les plateformes en ligne sont vos alliées : utilisez JeVeuxAider.gouv.fr mais
                      aussi les réseaux sociaux, votre site web, cherchez des relais médiatiques
                      pour promouvoir vos opportunités de bénévolat. Ne minimisez pas votre
                      visibilité numérique.
                    </li>
                  </ol>
                  <p>
                    Au fond s’investir dans le bénévolat, c’est surtout l’occasion de donner,
                    recevoir, partager, faire de nouvelles rencontres, et en sortir transformé.
                  </p>
                </div>
              </DsfrAccordion>
              <DsfrAccordion>
                <template #title> Comment fidéliser des bénévoles ? </template>
                <div class="formatted-text mb-6">
                  <p>
                    La fidélisation des bénévoles est essentielle pour assurer la continuité des
                    activités de votre association. Voici quelques stratégies pour engager
                    durablement votre équipe de choc :
                  </p>
                  <ol>
                    <li>
                      Créez un environnement accueillant : assurez-vous que votre association offre
                      un environnement convivial et inclusif. Faites en sorte que les bénévoles se
                      sentent écoutés et respectés. Favorisez un esprit d'équipe et encouragez les
                      interactions sociales entre les bénévoles.
                    </li>
                    <li>
                      Montrez vous reconnaissant : saluer et apprécier les efforts des bénévoles est
                      crucial. célébrez et remerciez les bénévoles en dévoilant publiquement leurs
                      contributions. Cela peut aussi être par le biais d'événements conviviaux, de
                      lettres de remerciement ou de cadeaux symboliques. Vous pouvez suggérer à vos
                      bénévoles de les soutenir dans leur démarche de Validation des acquis par
                      l’expérience (VAE), les informer sur leurs droits à la formation au travers du
                      CFGA ou CEC. Pour les bénévoles étudiants, il est possible d’obtenir des
                      crédits ECTS dans le cadre de leurs formations et de prendre en compte leur
                      engagement au sein de Parcoursup. Vous pouvez enfin développer des badges et
                      une expérience de gamification pour rendre plus concrets leurs progrès et
                      leurs investissements.
                    </li>
                    <li>
                      Communication claire et régulière : maintenez une communication ouverte et
                      régulière avec les bénévoles. Tenez-les informés des activités de
                      l'association, des projets en cours et des opportunités de bénévolat. Écoutez
                      leurs idées, leurs suggestions et leurs préoccupations. Montrez-leur l'impact
                      positif de leur engagement. Utilisez différents canaux de communication tels
                      que les réunions, les e-mails, les newsletters ou les groupes de discussion en
                      ligne.
                    </li>
                    <li>
                      Offrez des opportunités de développement : proposez à vos bénévoles des
                      occasions de grandir personnellement et professionnellement. Comment ? En
                      organisant des formations, des ateliers ou des conférences pour renforcer
                      leurs compétences et leur expertise. Encouragez leur progression au sein de
                      votre association et assurez-vous qu’ils trouvent ce qu’ils sont venus
                      chercher en devenant bénévole.
                    </li>
                    <li>
                      Impliquez-les dans la prise de décisions : n’hésitez pas à partager de façon
                      transparente les grandes orientations, les besoins et les enjeux de votre
                      structure. En plus d’être enrichissant intellectuellement, cela aidera vos
                      bénévoles à se sentir intégrés dans l’aventure et concernés par vos défis.
                      Organisez des réunions où les bénévoles peuvent donner leur avis, proposer des
                      idées et participer à la planification des activités.
                    </li>
                    <li>
                      Créez des liens sociaux : organisez des activités sociales régulières pour
                      favoriser les liens entre les bénévoles. Des sorties, des fêtes, des
                      pique-niques ou des événements informels peuvent renforcer les relations
                      interpersonnelles et l'esprit d'équipe.
                    </li>
                    <li>
                      Flexibilité et reconnaissance des disponibilités : respectez les
                      disponibilités des bénévoles et offrez-leur des opportunités de créneaux
                      flexibles. Tenez compte de leurs contraintes personnelles et professionnelles
                      et adaptez les missions en conséquence.
                    </li>
                    <li>
                      Évaluez et ajustez continuellement : faites des évaluations régulières de la
                      satisfaction des bénévoles et de leur expérience. Utilisez leurs retours pour
                      identifier les points forts et les axes d'amélioration. Vous pouvez utiliser
                      des sondages ou des entretiens individuels.
                    </li>
                  </ol>
                  <p>
                    La fidélisation des bénévoles demande une attention constante et une volonté de
                    répondre à leurs besoins. En créant un environnement positif, en les
                    reconnaissant et en les impliquant activement, vous engagerez vos bénévoles
                    durablement. 😊
                  </p>
                </div>
              </DsfrAccordion>
              <DsfrAccordion>
                <template #title> Comment trouver des membres pour une association ? </template>
                <div class="formatted-text mb-6">
                  <p>
                    Être membre et être bénévole ce n’est pas tout à fait la même chose. Lorsque
                    vous empruntez un livre dans la bibliothèque associative de votre quartier, vous
                    êtes membres. Vous bénéficiez de ce service, payez éventuellement un abonnement
                    pour permettre le renouvellement des manuels. Le bénévole lui s’implique plus en
                    avant dans le fonctionnement de la structure. Et là on passe au niveau du dessus
                    : bénévole (on vous explique ici comment les dénicher). Trouver des membres pour
                    une association est aussi un processus important pour assurer la stabilité et le
                    succès de votre association. Nos meilleures stratégies :
                  </p>
                  <ol>
                    <li>
                      Bouche-à-oreille : le bénévolat se vit souvent localement. Voir très
                      localement. Encouragez vos membres et vos bénévoles à recommander votre
                      association autour d’eux. Les conseils de nos proches ont toujours plus
                      d’impact qu’un témoignage d’un parfait inconnu.
                    </li>
                    <li>
                      Présence dans la commune : ne négligez pas votre présence dans votre
                      communauté locale. Votre ville ou village organise un forum des associations ?
                      Vous pouvez animer un conférence, tenir une buvette ? En participant à des
                      événements, en organisant des activités et en vous engageant dans des projets
                      vous faites connaître votre association. Pour exister, sortez et prenez part à
                      la vie de votre territoire !
                    </li>
                    <li>
                      Allo le réseau : si vous avez la chance d’avoir un réseau personnel et
                      professionnel, activez-le ! Utilisez vos contacts pour faire connaître votre
                      association et trouver de nouveaux membres. Parlez de votre association à vos
                      amis, votre famille, vos collègues et vos connaissances au moyen d’un kit de
                      communication à diffuser largement. Demandez-leur de le transmettre autour
                      d’eux.
                    </li>
                    <li>
                      Les plateformes en ligne sont vos alliées : mettez à jour votre page
                      organisation sur [JeVeuxAider.gouv.fr](http://JeVeuxAider.gouv.fr). Utilisez
                      les réseaux sociaux, votre site web, cherchez des relais médiatiques pour
                      promouvoir vos actions et votre impact. Ne minimisez pas votre visibilité
                      numérique. Partagez régulièrement des informations sur votre association, ses
                      activités et les (nombreux) avantages à devenir membre.
                    </li>
                    <li>
                      Partenariats avec d'autres organisations : à plusieurs on va plus loin.
                      Etablissez des partenariats avec des organisations similaires ou
                      complémentaires à la vôtre. Cela peut inclure des collaborations pour des
                      événements, des échanges de visibilité ou la promotion croisée de vos
                      associations auprès de vos membres respectifs.
                    </li>
                    <li>
                      Événements : organisez des événements spécifiques pour trouver de nouveaux
                      membres. Il peut s'agir de journées portes ouvertes, de salons, de conférences
                      ou d'ateliers thématiques. Profitez de ces occasions pour expliquer les
                      avantages d'adhérer à votre association et faciliter le processus
                      d'inscription.
                    </li>
                    <li>
                      Publicités ciblées : selon vos moyens, vous pouvez utiliser des publicités
                      ciblées en ligne ou dans des médias locaux pour promouvoir votre association
                      et attirer de nouveaux membres. Identifiez les médias ou les publications qui
                      sont populaires auprès de votre public cible et diffusez des annonces sur ces
                      canaux de communication.
                    </li>
                  </ol>
                  <p>
                    N'oubliez pas de mettre en avant les valeurs, les objectifs et l’impact de votre
                    association. Faites en sorte que le processus d'adhésion soit simple,
                    accessible, et veillez à offrir une expérience de membre enrichissante pour
                    encourager l’engagement à long terme.
                  </p>
                </div>
              </DsfrAccordion>
              <DsfrAccordion>
                <template #title> Comment faire grandir une association ? </template>
                <div class="formatted-text mb-6">
                  <p>
                    Faire grandir une association demande du temps, de l'engagement, un projet qui
                    emporte l’enthousiasme de votre équipe de bénévoles ET une stratégie efficace.
                    Découvrez nos conseils pour favoriser le développement de votre association. Zé
                    barti :
                  </p>
                  <ol>
                    <li>
                      Clarifiez votre vision : définissez votre projet associatif et ses objectifs.
                      Avoir un manifeste claire motive vos bénévoles et attire de nouveaux membres
                      qui partagent vos valeurs. Ne restez pas dans la théorie. Pour cela,
                      assurez-vous que vos engagements sont déclinés en objectifs actionnables et
                      communiqués de manière transparente et convaincante en feuille de route.
                    </li>
                    <li>
                      Développez une stratégie de marketing et de communication : Pour promouvoir
                      votre association, vous pouvez utiliser les médias sociaux, les sites web, les
                      newsletters, les relations publiques, et tant d’autres canaux. Demandez-vous
                      où se situe votre cible, physiquement et en ligne. C’est en ce lieu qu’il
                      faudra vous situer pour accroître votre visibilité. Mettez en avant
                      régulièrement les avantages et les activités de votre association.
                    </li>
                    <li>
                      Renforcez l'engagement des membres actuels : veillez à prendre soin de vos
                      membres et bénévoles pour les garder engagés durablement. Offrez-leur des
                      avantages spécifiques, tels que des formations, des événements exclusifs ou
                      des opportunités de développement personnel. Impliquez-les dans la prise de
                      décisions et veillez à instaurer une ambiance conviviale où tout le monde
                      puisse s’épanouir.
                    </li>
                    <li>
                      Créez des partenariats : établissez des échanges de visibilité avec d'autres
                      organisations, entreprises locales ou institutions pour élargir votre portée
                      et toucher de nouveaux publics. Collaborez sur des projets, organisez des
                      événements communs ou proposez des offres mutualisées. De nombreux formats
                      sont à inventer.
                    </li>
                    <li>
                      Développez des programmes : ils attireront de nouveaux membres en plus de
                      renforcer l'image de votre association. Proposez des projets, des événements
                      ou des activités qui répondent aux besoins et aux intérêts de vos publics.
                      Cherchez à comprendre leurs attentes et leurs engagements et créez des offres
                      impactantes qui les inciteront à rejoindre votre association pour faire bouger
                      les lignes à vos côtés.
                    </li>
                    <li>
                      Impliquez la communauté locale : soyez actif au sein de votre localité en
                      organisant ou en rejoignant des initiatives, des événements, des ateliers et
                      autres actions à impact positif. Faites connaître votre association et montrez
                      son engagement en faveur du dynamisme de votre territoire et du
                      vivre-ensemble.
                    </li>
                    <li>
                      Évaluez et ajustez votre stratégie : faites régulièrement le point sur les
                      actions de votre association et évaluez leur efficacité respective. Identifiez
                      ce qui fonctionne bien et ce qui peut être amélioré. Adaptez votre feuille de
                      route en fonction des retours des membres, des besoins de la communauté et des
                      évolutions de votre environnement.
                    </li>
                  </ol>
                  <p>
                    Le développement d'une association demande du temps et de la persévérance. Rome
                    ne s’est pas fait en un jour. Soyez patient, faites en sorte d’entretenir votre
                    motivation et de vous entourer. Avec une stratégie engagée et des efforts
                    continus, votre association va faire tourner le monde plus rond. Chaque
                    initiative est un pas en avant.
                  </p>
                </div>
              </DsfrAccordion>
              <DsfrAccordion>
                <template #title> Comment améliorer la visibilité d'une association ? </template>
                <div class="formatted-text mb-6">
                  <p>
                    Vous avez l’impression de parler dans le vide ? Vos événements ne rencontrent
                    pas le succès escompté ? En utilisant les stratégies suivantes, vous allez
                    améliorer significativement la visibilité de votre association et peut être même
                    attirer de nouveaux bénévoles passionnés et engagés. 3, 2, 1… Action !
                  </p>
                  <ol>
                    <li>
                      Développez une identité visuelle forte : vous devez être reconnaissable entre
                      mille. Créez un logo ainsi qu'une identité visuelle cohérente avec qui vous
                      êtes et ce que vous incarnez. Utilisez systématiquement cette identité sur vos
                      supports de communication, votre site web et dans vos communications. Vous
                      renforcez la mémorisation de votre structure.
                    </li>
                    <li>
                      Utilisez les médias sociaux : créez et maintenez une présence active sur les
                      médias sociaux pertinents pour votre association. Partagez régulièrement des
                      informations, des actualités, des histoires inspirantes et des événements liés
                      à la vie de votre association. Encouragez l'interaction avec votre contenu.
                    </li>
                    <li>
                      Créez un site web : une présence en ligne est essentielle pour améliorer la
                      visibilité de votre association. Assurez-vous que celui-ci présente clairement
                      votre mission, vos activités, vos projets et les avantages de rejoindre votre
                      association. Optimisez votre site pour les moteurs de recherche (SEO) afin
                      d'augmenter sa visibilité en ligne. Si vous n’avez pas de compétences en
                      développement web, votre “page organisation” sur JeVeuxAider.gouv.fr peut
                      faire office de mini-site vitrine.
                    </li>
                    <li>
                      L’événementiel : organisez ou prenez part à des événements, des ateliers, des
                      conférences ou des activités liées à votre cause. Ces temps forts vous
                      permettront de vous connecter avec votre communauté et de faire connaître
                      votre association. Faites venir des intervenants pertinents, collaborez avec
                      d'autres organisations et bénéficiez de la couverture médiatique liée à
                      l’événement pour augmenter votre visibilité.
                    </li>
                    <li>
                      Collaborez avec les médias : contactez les médias locaux, les radios, la
                      presse et les leaders d’opinion pour partager les actualités de votre
                      association. Rédigez des communiqués de presse, proposez des interviews ou des
                      articles et améliorez la notoriété et la crédibilité de votre association.
                    </li>
                    <li>
                      Utilisez le marketing de contenu : créez et partagez du contenu pertinent et
                      de qualité lié à votre cause. Cela peut inclure des articles de blog, des
                      vidéos, des infographies, des guides pratiques ou des témoignages. Partagez ce
                      contenu sur votre site web, vos réseaux sociaux et d'autres plateformes en
                      ligne pour attirer l'attention et démontrer votre expertise dans votre
                      domaine.
                    </li>
                    <li>
                      Établissez des partenariats : collaborez avec d'autres organisations, des
                      entreprises locales, des institutions ou des influenceurs qui partagent des
                      intérêts communs avec votre association. Ces partenariats peuvent vous aider à
                      étendre votre visibilité en bénéficiant de leurs audiences.
                    </li>
                    <li>
                      Impliquez vos membres et bénévoles : encouragez vos membres et bénévoles à
                      promouvoir activement votre association. Fournissez-leur des outils et des
                      ressources, comme un kit de communication, pour partager votre message avec
                      leur propre réseau.
                    </li>
                  </ol>

                  <p>
                    En combinant ces stratégies, vous pouvez améliorer la visibilité de votre
                    association, atteindre un public plus large et renforcer votre impact sociétal.
                    Soyez cohérent, créatif et persévérant dans vos efforts de communication tout en
                    vous rappelant ceci : vous n’êtes pas une agence de communication. Si vous ne
                    communiquez pas chaque jour ce n’est pas dramatique. Faites au mieux, en
                    fonction de vos besoins et de vos moyens.
                  </p>
                </div>
              </DsfrAccordion>
            </DsfrAccordionsGroup>
          </div>
        </template>
      </DsfrTabs>
      <!-- <div class="mt-8 text-center md:text-left">
        <DsfrLink
          to="https://reserve-civique.crisp.help/fr/"
          :is-external="true"
          class="text-jva-blue-500"
        >
          Toutes les réponses à vos questions
        </DsfrLink>
      </div> -->
    </div>
  </div>
</template>
