export type TypeVocabulary =
  | 'departments'
  | 'regions'
  | 'departments_regions'
  | 'duration'
  | 'geoType'
  | 'mission_publics_beneficiaires'
  | 'mission_publics_volontaires'
  | 'structure_legal_status'
  | 'association_types'
  | 'structure_publique_types'
  | 'structure_publique_etat_types'
  | 'structure_privee_types'
  | 'structure_workflow_states'
  | 'participation_workflow_states'
  | 'time_period'
  | 'domaines'
  | 'disponibilities'
  | 'profile_type'
  | 'profile_certifications'
  | 'profile_type_missions'
  | 'mission_types'
  | 'mission_workflow_states'
  | 'profile_fields'
  | 'structure_fields'
  | 'reseau_fields'
  | 'territoire_fields'
  | 'mission_template_workflow_states'
  | 'territoire_types'
  | 'territoire_workflow_states'
  | 'participation_declined_reasons'
  | 'participation_canceled_by_benevole_reasons'
  | 'testimonial_grade'
  | 'statistics_period'
  | 'responsable_fonction'
  | 'slots'
  | 'models'
  | 'roles'
  | 'rule_events'
  | 'rule_actions'
  | 'user_ban_reasons'
  | 'faq_tabs'
  | 'commitment'
  | 'commitment_duration_min'

type TypeLabels = {
  [Key in TypeVocabulary]: {
    key: string | number
    label: string
    [key: string]: any
  }[]
}

const labels: TypeLabels = {
  departments: [
    { key: '01', label: 'Ain' },
    { key: '02', label: 'Aisne' },
    { key: '03', label: 'Allier' },
    { key: '04', label: 'Alpes-de-Haute-Provence' },
    { key: '05', label: 'Hautes-Alpes' },
    { key: '06', label: 'Alpes-Maritimes' },
    { key: '07', label: 'Ardèche' },
    { key: '08', label: 'Ardennes' },
    { key: '09', label: 'Ariège' },
    { key: '10', label: 'Aube' },
    { key: '11', label: 'Aude' },
    { key: '12', label: 'Aveyron' },
    { key: '13', label: 'Bouches-du-Rhône' },
    { key: '14', label: 'Calvados' },
    { key: '15', label: 'Cantal' },
    { key: '16', label: 'Charente' },
    { key: '17', label: 'Charente-Maritime' },
    { key: '18', label: 'Cher' },
    { key: '19', label: 'Corrèze' },
    { key: '21', label: "Côte-d'Or" },
    { key: '22', label: "Côtes-d'Armor" },
    { key: '23', label: 'Creuse' },
    { key: '24', label: 'Dordogne' },
    { key: '25', label: 'Doubs' },
    { key: '26', label: 'Drôme' },
    { key: '27', label: 'Eure' },
    { key: '28', label: 'Eure-et-Loir' },
    { key: '29', label: 'Finistère' },
    { key: '2A', label: 'Corse-du-Sud' },
    { key: '2B', label: 'Haute-Corse' },
    { key: '30', label: 'Gard' },
    { key: '31', label: 'Haute-Garonne' },
    { key: '32', label: 'Gers' },
    { key: '33', label: 'Gironde' },
    { key: '34', label: 'Hérault' },
    { key: '35', label: 'Ille-et-Vilaine' },
    { key: '36', label: 'Indre' },
    { key: '37', label: 'Indre-et-Loire' },
    { key: '38', label: 'Isère' },
    { key: '39', label: 'Jura' },
    { key: '40', label: 'Landes' },
    { key: '41', label: 'Loir-et-Cher' },
    { key: '42', label: 'Loire' },
    { key: '43', label: 'Haute-Loire' },
    { key: '44', label: 'Loire-Atlantique' },
    { key: '45', label: 'Loiret' },
    { key: '46', label: 'Lot' },
    { key: '47', label: 'Lot-et-Garonne' },
    { key: '48', label: 'Lozère' },
    { key: '49', label: 'Maine-et-Loire' },
    { key: '50', label: 'Manche' },
    { key: '51', label: 'Marne' },
    { key: '52', label: 'Haute-Marne' },
    { key: '53', label: 'Mayenne' },
    { key: '54', label: 'Meurthe-et-Moselle' },
    { key: '55', label: 'Meuse' },
    { key: '56', label: 'Morbihan' },
    { key: '57', label: 'Moselle' },
    { key: '58', label: 'Nièvre' },
    { key: '59', label: 'Nord' },
    { key: '60', label: 'Oise' },
    { key: '61', label: 'Orne' },
    { key: '62', label: 'Pas-de-Calais' },
    { key: '63', label: 'Puy-de-Dôme' },
    { key: '64', label: 'Pyrénées-Atlantiques' },
    { key: '65', label: 'Hautes-Pyrénées' },
    { key: '66', label: 'Pyrénées-Orientales' },
    { key: '67', label: 'Bas-Rhin' },
    { key: '68', label: 'Haut-Rhin' },
    { key: '69', label: 'Rhône' },
    { key: '70', label: 'Haute-Saône' },
    { key: '71', label: 'Saône-et-Loire' },
    { key: '72', label: 'Sarthe' },
    { key: '73', label: 'Savoie' },
    { key: '74', label: 'Haute-Savoie' },
    { key: '75', label: 'Paris' },
    { key: '76', label: 'Seine-Maritime' },
    { key: '77', label: 'Seine-et-Marne' },
    { key: '78', label: 'Yvelines' },
    { key: '79', label: 'Deux-Sèvres' },
    { key: '80', label: 'Somme' },
    { key: '81', label: 'Tarn' },
    { key: '82', label: 'Tarn-et-Garonne' },
    { key: '83', label: 'Var' },
    { key: '84', label: 'Vaucluse' },
    { key: '85', label: 'Vendée' },
    { key: '86', label: 'Vienne' },
    { key: '87', label: 'Haute-Vienne' },
    { key: '88', label: 'Vosges' },
    { key: '89', label: 'Yonne' },
    { key: '90', label: 'Territoire de Belfort' },
    { key: '91', label: 'Essonne' },
    { key: '92', label: 'Hauts-de-Seine' },
    { key: '93', label: 'Seine-Saint-Denis' },
    { key: '94', label: 'Val-de-Marne' },
    { key: '95', label: "Val-d'Oise" },
    { key: '971', label: 'Guadeloupe' },
    { key: '972', label: 'Martinique' },
    { key: '973', label: 'Guyane' },
    { key: '974', label: 'La Réunion' },
    { key: '976', label: 'Mayotte' },
    { key: '987', label: 'Polynésie française' },
    { key: '988', label: 'Nouvelle-Calédonie' },
  ],
  regions: [
    { key: 'Auvergne-Rhône-Alpes', label: 'Auvergne-Rhône-Alpes' },
    { key: 'Bourgogne-Franche-Comté', label: 'Bourgogne-Franche-Comté' },
    { key: 'Bretagne', label: 'Bretagne' },
    { key: 'Centre-Val de Loire', label: 'Centre-Val de Loire' },
    { key: 'Corse', label: 'Corse' },
    { key: 'Grand Est', label: 'Grand Est' },
    { key: 'Hauts-de-France', label: 'Hauts-de-France' },
    { key: 'Île-de-France', label: 'Île-de-France' },
    { key: 'Normandie', label: 'Normandie' },
    { key: 'Nouvelle-Aquitaine', label: 'Nouvelle-Aquitaine' },
    { key: 'Occitanie', label: 'Occitanie' },
    { key: 'Pays de la Loire', label: 'Pays de la Loire' },
    { key: "Provence-Alpes-Côte d'Azur", label: "Provence-Alpes-Côte d'Azur" },
    { key: 'Guadeloupe', label: 'Guadeloupe' },
    { key: 'Martinique', label: 'Martinique' },
    { key: 'Guyane', label: 'Guyane' },
    { key: 'La Réunion', label: 'La Réunion' },
    { key: 'Mayotte', label: 'Mayotte' },
  ],
  departments_regions: [
    { key: '01', label: 'Auvergne-Rhône-Alpes' },
    { key: '02', label: 'Hauts-de-France' },
    { key: '03', label: 'Auvergne-Rhône-Alpes' },
    { key: '04', label: "Provence-Alpes-Côte d'Azur" },
    { key: '05', label: "Provence-Alpes-Côte d'Azur" },
    { key: '06', label: "Provence-Alpes-Côte d'Azur" },
    { key: '07', label: 'Auvergne-Rhône-Alpes' },
    { key: '08', label: 'Grand Est' },
    { key: '09', label: 'Occitanie' },
    { key: '10', label: 'Grand Est' },
    { key: '11', label: 'Occitanie' },
    { key: '12', label: 'Occitanie' },
    { key: '13', label: "Provence-Alpes-Côte d'Azur" },
    { key: '14', label: 'Normandie' },
    { key: '15', label: 'Auvergne-Rhône-Alpes' },
    { key: '16', label: 'Nouvelle-Aquitaine' },
    { key: '17', label: 'Nouvelle-Aquitaine' },
    { key: '18', label: 'Centre-Val de Loire' },
    { key: '19', label: 'Nouvelle-Aquitaine' },
    { key: '21', label: 'Bourgogne-Franche-Comté' },
    { key: '22', label: 'Bretagne' },
    { key: '23', label: 'Nouvelle-Aquitaine' },
    { key: '24', label: 'Nouvelle-Aquitaine' },
    { key: '25', label: 'Bourgogne-Franche-Comté' },
    { key: '26', label: 'Auvergne-Rhône-Alpes' },
    { key: '27', label: 'Normandie' },
    { key: '28', label: 'Centre-Val de Loire' },
    { key: '29', label: 'Bretagne' },
    { key: '2A', label: 'Corse' },
    { key: '2B', label: 'Corse' },
    { key: '30', label: 'Occitanie' },
    { key: '31', label: 'Occitanie' },
    { key: '32', label: 'Occitanie' },
    { key: '33', label: 'Nouvelle-Aquitaine' },
    { key: '34', label: 'Occitanie' },
    { key: '35', label: 'Bretagne' },
    { key: '36', label: 'Centre-Val de Loire' },
    { key: '37', label: 'Centre-Val de Loire' },
    { key: '38', label: 'Auvergne-Rhône-Alpes' },
    { key: '39', label: 'Bourgogne-Franche-Comté' },
    { key: '40', label: 'Nouvelle-Aquitaine' },
    { key: '41', label: 'Centre-Val de Loire' },
    { key: '42', label: 'Auvergne-Rhône-Alpes' },
    { key: '43', label: 'Auvergne-Rhône-Alpes' },
    { key: '44', label: 'Pays de la Loire' },
    { key: '45', label: 'Centre-Val de Loire' },
    { key: '46', label: 'Occitanie' },
    { key: '47', label: 'Nouvelle-Aquitaine' },
    { key: '48', label: 'Occitanie' },
    { key: '49', label: 'Pays de la Loire' },
    { key: '50', label: 'Normandie' },
    { key: '51', label: 'Grand Est' },
    { key: '52', label: 'Grand Est' },
    { key: '53', label: 'Pays de la Loire' },
    { key: '54', label: 'Grand Est' },
    { key: '55', label: 'Grand Est' },
    { key: '56', label: 'Bretagne' },
    { key: '57', label: 'Grand Est' },
    { key: '58', label: 'Bourgogne-Franche-Comté' },
    { key: '59', label: 'Hauts-de-France' },
    { key: '60', label: 'Hauts-de-France' },
    { key: '61', label: 'Normandie' },
    { key: '62', label: 'Hauts-de-France' },
    { key: '63', label: 'Auvergne-Rhône-Alpes' },
    { key: '64', label: 'Nouvelle-Aquitaine' },
    { key: '65', label: 'Occitanie' },
    { key: '66', label: 'Occitanie' },
    { key: '67', label: 'Grand Est' },
    { key: '68', label: 'Grand Est' },
    { key: '69', label: 'Auvergne-Rhône-Alpes' },
    { key: '70', label: 'Bourgogne-Franche-Comté' },
    { key: '71', label: 'Bourgogne-Franche-Comté' },
    { key: '72', label: 'Pays de la Loire' },
    { key: '73', label: 'Auvergne-Rhône-Alpes' },
    { key: '74', label: 'Auvergne-Rhône-Alpes' },
    { key: '75', label: 'Île-de-France' },
    { key: '76', label: 'Normandie' },
    { key: '77', label: 'Île-de-France' },
    { key: '78', label: 'Île-de-France' },
    { key: '79', label: 'Nouvelle-Aquitaine' },
    { key: '80', label: 'Hauts-de-France' },
    { key: '81', label: 'Occitanie' },
    { key: '82', label: 'Occitanie' },
    { key: '83', label: "Provence-Alpes-Côte d'Azur" },
    { key: '84', label: "Provence-Alpes-Côte d'Azur" },
    { key: '85', label: 'Pays de la Loire' },
    { key: '86', label: 'Nouvelle-Aquitaine' },
    { key: '87', label: 'Nouvelle-Aquitaine' },
    { key: '88', label: 'Grand Est' },
    { key: '89', label: 'Bourgogne-Franche-Comté' },
    { key: '90', label: 'Bourgogne-Franche-Comté' },
    { key: '91', label: 'Île-de-France' },
    { key: '92', label: 'Île-de-France' },
    { key: '93', label: 'Île-de-France' },
    { key: '94', label: 'Île-de-France' },
    { key: '95', label: 'Île-de-France' },
    { key: '971', label: 'Guadeloupe' },
    { key: '972', label: 'Martinique' },
    { key: '973', label: 'Guyane' },
    { key: '974', label: 'La Réunion' },
    { key: '976', label: 'Mayotte' },
    { key: '987', label: 'Polynésie française' },
    { key: '988', label: 'Nouvelle-Calédonie' },
  ],
  duration: [
    { key: '1_hour', label: '1 heure' },
    { key: '2_hours', label: '2 heures' },
    { key: 'half_day', label: 'Une demi-journée' },
    { key: 'day', label: '1 jour' },
    { key: '2_days', label: '2 jours' },
    { key: '3_days', label: '3 jours' },
    { key: '4_days', label: '4 jours' },
    { key: '5_days', label: '5 jours' },
    { key: 'more_5_days', label: 'Plus de 5 jours' },
  ],
  commitment_duration_min: [
    { key: '1_month', label: '1 mois' },
    { key: '2_month', label: '2 mois' },
    { key: '3_month', label: '3 mois' },
    { key: '6_month', label: '6 mois' },
    { key: '1_year', label: '1 an' },
  ],
  commitment: [
    { key: 'few_hours', label: 'Quelques heures' },
    { key: 'few_days', label: 'Quelques jours' },
    { key: 'few_hours_a_week', label: 'Quelques heures par semaine' },
    { key: 'few_days_a_week', label: 'Quelques jours par semaine' },
    { key: 'few_hours_a_month', label: 'Quelques heures par mois' },
    { key: 'few_days_a_month', label: 'Quelques jours par mois' },
  ],
  geoType: [
    { key: 'housenumber', label: 'Adresse' },
    { key: 'locality', label: 'Lieu-dit' },
    { key: 'municipality', label: 'Ville' },
    { key: 'street', label: 'Rue' },
  ],
  mission_publics_beneficiaires: [
    { key: 'seniors', label: 'Personnes âgées' },
    {
      key: 'persons_with_disabilities',
      label: 'Personnes en situation de handicap',
    },
    { key: 'people_in_difficulty', label: 'Personnes en difficulté' },
    { key: 'parents', label: 'Parents' },
    { key: 'children', label: 'Jeunes / enfants' },
    { key: 'refugees', label: 'Nouveaux Arrivants / Réfugiés' },
    {
      key: 'people_being_excluded',
      label: 'Personnes en situation d’exclusion',
    },
    { key: 'people_sick', label: 'Personnes malades' },
    { key: 'any_public', label: 'Tous publics' },
  ],
  mission_publics_volontaires: [{ key: 'Mineurs', label: 'Mineurs' }],
  structure_legal_status: [
    { key: 'Association', label: 'Association', label2: "l'association" },
    {
      key: 'Collectivité',
      label: 'Collectivité territoriale',
      label2: 'la collectivité territoriale',
    },
    {
      key: 'Organisation publique',
      label: 'Organisation publique',
      label2: "l'organisation publique",
    },
    {
      key: 'Organisation privée',
      label: 'Organisation privée',
      label2: "l'organisation privée",
    },
    { key: 'Autre', label: 'Autre', label2: "l'organisation" },
  ],
  association_types: [
    {
      key: "Reconnue d'utilité publique",
      label: "Reconnue d'utilité publique",
    },
    {
      key: 'Agrément jeunesse et éducation populaire',
      label: 'Agrément jeunesse et éducation populaire',
    },
    { key: 'Agrément service civique', label: 'Agrément service civique' },
    {
      key: "Association complémentaire de l'enseignement public",
      label: "Association complémentaire de l'enseignement public",
    },
    {
      key: "Associations d'usagers du système de santé",
      label: "Associations d'usagers du système de santé",
    },
    {
      key: "Association sportive affiliée à une fédération sportive agréée par l'État",
      label: "Association sportive affiliée à une fédération sportive agréée par l'État",
    },
    {
      key: "Agrément des associations de protection de l'environnement",
      label: "Agrément des associations de protection de l'environnement",
    },
    {
      key: 'Association agréée de sécurité civile',
      label: 'Association agréée de sécurité civile',
    },
    { key: 'Autre agrément', label: 'Autre agrément' },
  ],
  structure_publique_types: [
    { key: 'Etablissement scolaire', label: 'Etablissement scolaire' },
    {
      key: 'Etablissement public de santé',
      label: 'Etablissement public de santé',
    },
    { key: 'Etablissement public', label: 'Etablissement public' },
    { key: "Service de l'Etat", label: "Service de l'Etat" },
  ],
  structure_publique_etat_types: [
    {
      key: "SDIS (Service départemental d'Incendie et de Secours)",
      label: "SDIS (Service départemental d'Incendie et de Secours)",
    },
    { key: 'Gendarmerie', label: 'Gendarmerie' },
    { key: 'Police', label: 'Police' },
    { key: 'Armées', label: 'Armées' },
    { key: "Autre service de l'état", label: "Autre service de l'état" },
    { key: 'Autre établissement public', label: 'Autre établissement public' },
  ],
  structure_privee_types: [
    {
      key: "Établissement de santé privé d'intérêt collectif",
      label: "Établissement de santé privé d'intérêt collectif",
    },
    { key: 'Entreprise agréée ESUS', label: 'Entreprise agréée ESUS' },
    { key: 'Fondation', label: 'Fondation' },
    { key: 'Fonds de dotation', label: 'Fonds de dotation' },
    { key: 'Autre', label: 'Autre' },
  ],
  structure_workflow_states: [
    {
      key: 'Brouillon',
      to: ['Brouillon', 'En attente de validation'],
      roles: ['admin'],
      label: 'Brouillon',
      description: "L'organisation vient de s'inscrire. Elle est en cours de création.",
    },
    {
      key: 'En attente de validation',
      to: ['En attente de validation', 'En cours de traitement', 'Validée', 'Signalée'],
      roles: ['admin', 'referent', 'referent_regional'],
      label: 'En attente de validation',
      description:
        "L'organisation a rempli les champs obligatoires. Elle est en attente de validation par un référent.",
    },
    {
      key: 'En cours de traitement',
      to: ['En cours de traitement', 'Validée', 'Signalée'],
      roles: ['admin', 'referent', 'referent_regional'],
      label: 'En cours de traitement',
      description: "Le référent vérifie des informations avant de valider l'organisation.",
    },
    {
      key: 'Validée',
      to: ['En cours de traitement', 'Validée', 'Signalée'],
      roles: ['admin', 'referent', 'referent_regional'],
      label: 'Validée',
      description:
        "L'organisation peut poster des missions et a une page publique qu'elle peut éditer.",
    },
    {
      key: 'Signalée',
      to: ['En cours de traitement', 'Signalée'],
      roles: ['admin'],
      label: 'Signalée',
      description:
        "L'organisation ne respecte pas la charte de JeVeuxAider.gouv.fr. La page de l'organisation est hors ligne, ainsi que que ses missions.",
    },
    {
      key: 'Désinscrite',
      to: ['Désinscrite'],
      roles: ['admin'],
      label: 'Désinscrite',
      description:
        "L'organisation s'est désinscrite. Sa page est hors ligne ainsi que ses missions. Les participations en cours seront annulées.",
    },
  ],
  participation_workflow_states: [
    {
      key: 'En attente de validation',
      roles: ['admin', 'responsable'],
      label: 'En attente de validation',
      description:
        'Le bénévole vient de candidater. Il est en attente de validation par le responsable de la mission.',
    },
    {
      key: 'En cours de traitement',
      roles: ['admin', 'responsable'],
      label: 'En cours de traitement',
      from: ['En attente de validation'],
      description: 'Le responsable vérifie des informations avant de valider la participation.',
    },
    {
      key: 'Validée',
      label: 'Validée',
      roles: ['admin', 'responsable'],
      description: 'La participation est validée, elle va avoir lieu ou a déjà été faite.',
    },
    {
      key: 'Annulée',
      label: 'Annulée',
      roles: ['admin', 'responsable'],
      description: 'La participation est annulée si la mission a été annulée.',
    },
    {
      key: 'Refusée',
      label: 'Refusée',
      roles: ['admin', 'responsable'],
      description: 'Le profil du bénévole ne correspond pas à la mission.',
    },
  ],
  time_period: [
    { key: 'day', label: 'jour' },
    { key: 'week', label: 'semaine' },
    { key: 'month', label: 'mois' },
    { key: 'year', label: 'an' },
  ],
  domaines: [
    {
      key: 3,
      title: 'Engagez vous pour l’art et la culture',
      engagementTitle: 'L’engagement pour l’art et la culture sous toutes ses formes',
      benevolatTitle: 'Le bénévolat pour l’art et la culture',
      label: 'Art et Culture pour tous',
      icon: '/images/icons/domaine-art-culture-pour-tous.svg',
      color: 'text-domaine-culture',
      bg: 'bg-domaine-culture',
      textColor: 'text-black',
      emoji: '🎨',
      partenaires: [
        {
          key: 'service-civique',
          link: 'http://api.api-engagement.beta.gouv.fr/r/campaign/654cb9eb424c28f2c1499094',
        },
        { key: 'france-volontaire', link: 'https://france-volontaires.org/offres-de-missions/' },
      ],
    },
    {
      key: 11,
      title: 'Engagez vous pour le bénévolat de compétences',
      engagementTitle: 'Le bénévolat de compétences sous toutes ses formes',
      benevolatTitle: 'Le bénévolat pour le bénévolat de compétences',
      label: 'Bénévolat de compétences',
      icon: '/images/icons/domaine-benevolat-de-competences.svg',
      color: 'text-domaine-benevolat-competences',
      bg: 'bg-domaine-benevolat-competences',
      textColor: 'text-white',
      emoji: '💼',
      partenaires: [
        {
          key: 'service-civique',
          link: 'http://api.api-engagement.beta.gouv.fr/r/campaign/654cba175fdeb9fef2f22aaf',
        },
        { key: 'france-volontaire', link: 'https://france-volontaires.org/offres-de-missions/' },
      ],
    },
    {
      key: 6,
      title: 'Engagez vous pour la coopération internationale',
      engagementTitle: 'L’engagement pour la coopération internationale sous toutes ses formes',
      benevolatTitle: 'Le bénévolat pour la coopération internationale',
      label: 'Coopération internationale',
      icon: '/images/icons/domaine-cooperation-internationale.svg',
      color: 'text-domaine-cooperation',
      bg: 'bg-domaine-cooperation',
      textColor: 'text-white',
      emoji: '🌍',
      partenaires: [
        {
          key: 'service-civique',
          link: 'http://api.api-engagement.beta.gouv.fr/r/campaign/654cba569dd37caad1882c87',
        },
        { key: 'france-volontaire', link: 'https://france-volontaires.org/offres-de-missions/' },
      ],
    },
    {
      key: 9,
      title: 'Engagez vous pour l’éducation pour tous',
      engagementTitle: 'L’engagement pour l’éducation sous toutes ses formes',
      benevolatTitle: 'Le bénévolat pour l’éducation',
      label: 'Éducation pour tous',
      icon: '/images/icons/domaine-education-pour-tous.svg',
      color: 'text-domaine-education',
      bg: 'bg-domaine-education',
      textColor: 'text-black',
      emoji: '📚',
      partenaires: [
        {
          key: 'service-civique',
          link: 'http://api.api-engagement.beta.gouv.fr/r/campaign/654cba9c5fdeb9fef2f23037',
        },
        { key: 'france-volontaire', link: 'https://france-volontaires.org/offres-de-missions/' },
      ],
    },
    {
      key: 8,
      title: 'Engagez vous pour la mémoire et la citoyenneté',
      engagementTitle: 'L’engagement pour la mémoire et citoyenneté sous toutes ses formes',
      benevolatTitle: 'Le bénévolat pour la mémoire et la citoyenneté',
      label: 'Mémoire et citoyenneté',
      icon: '/images/icons/domaine-memoire-citoyennete.svg',
      color: 'text-domaine-memoire',
      bg: 'bg-domaine-memoire',
      textColor: 'text-white',
      emoji: '📯',
      partenaires: [
        {
          key: 'service-civique',
          link: 'http://api.api-engagement.beta.gouv.fr/r/campaign/654cba809dd37caad1882fb5',
        },
        { key: 'france-volontaire', link: 'https://france-volontaires.org/offres-de-missions/' },
      ],
    },
    {
      key: 2,
      title: 'Engagez vous pour la prévention et la protection',
      engagementTitle: 'L’engagement pour la prévention et protection sous toutes ses formes',
      benevolatTitle: 'Le bénévolat pour la prévention et protection',
      label: 'Prévention et protection',
      icon: '/images/icons/domaine-prevention-protection.svg',
      color: 'text-domaine-prevention',
      bg: 'bg-domaine-prevention',
      textColor: 'text-black',
      emoji: '🚨',
      partenaires: [
        {
          key: 'service-civique',
          link: 'http://api.api-engagement.beta.gouv.fr/r/campaign/654cba175fdeb9fef2f22aaf',
        },
        { key: 'france-volontaire', link: 'https://france-volontaires.org/offres-de-missions/' },
      ],
    },
    {
      key: 10,
      title: 'Engagez vous pour la protection de la nature',
      engagementTitle: 'L’engagement pour la nature sous toutes ses formes',
      benevolatTitle: 'Le bénévolat pour la protection de la nature',
      label: 'Protection de la nature',
      icon: '/images/icons/domaine-protection-nature.svg',
      color: 'text-domaine-nature',
      bg: 'bg-domaine-nature',
      textColor: 'text-black',
      emoji: '🌿',
      partenaires: [
        {
          key: 'service-civique',
          link: 'http://api.api-engagement.beta.gouv.fr/r/campaign/654cb9c55fdeb9fef2f22353',
        },
        { key: 'france-volontaire', link: 'https://france-volontaires.org/offres-de-missions/' },
      ],
    },
    {
      key: 1,
      title: 'Engagez vous pour la santé pour tous',
      engagementTitle: 'L’engagement pour la santé sous toutes ses formes',
      benevolatTitle: 'Le bénévolat pour la santé',
      label: 'Santé pour tous',
      icon: '/images/icons/domaine-sante-pour-tous.svg',
      color: 'text-domaine-sante',
      bg: 'bg-domaine-sante',
      textColor: 'text-white',
      emoji: '💊',
      partenaires: [
        {
          key: 'service-civique',
          link: 'http://api.api-engagement.beta.gouv.fr/r/campaign/654cbad59dd37caad18832c3',
        },
        { key: 'france-volontaire', link: 'https://france-volontaires.org/offres-de-missions/' },
      ],
    },
    {
      key: 7,
      title: 'Engagez vous pour la solidarité et l’insertion',
      engagementTitle: 'L’engagement pour la solidarité sous toutes ses formes',
      benevolatTitle: 'Le bénévolat pour la solidarité',
      label: 'Solidarité et Insertion',
      icon: '/images/icons/domaine-solidarite-insertion.svg',
      color: 'text-domaine-solidarite',
      bg: 'bg-domaine-solidarite',
      textColor: 'text-black',
      emoji: '🍲',
      partenaires: [
        {
          key: 'service-civique',
          link: 'http://api.api-engagement.beta.gouv.fr/r/campaign/654cbaff424c28f2c149a286',
        },
        { key: 'france-volontaire', link: 'https://france-volontaires.org/offres-de-missions/' },
      ],
    },
    {
      key: 4,
      title: 'Engagez vous pour le sport pour tous',
      engagementTitle: 'L’engagement pour le sport sous toutes ses formes',
      benevolatTitle: 'Le bénévolat pour le sport',
      label: 'Sport pour tous',
      icon: '/images/icons/domaine-sport-pour-tous.svg',
      color: 'text-domaine-sport',
      bg: 'bg-domaine-sport',
      textColor: 'text-black',
      emoji: '🏀',
      partenaires: [
        {
          key: 'service-civique',
          link: 'http://api.api-engagement.beta.gouv.fr/r/campaign/654cbb22424c28f2c149a649',
        },
        { key: 'france-volontaire', link: 'https://france-volontaires.org/offres-de-missions/' },
      ],
    },
  ],
  roles: [
    { key: 'volontaire', label: 'Bénévole', espace: 'Mon espace bénévole' },
    { key: 'admin', label: 'Modérateur', espace: 'Mon espace modérateur' },
    { key: 'referent', label: 'Référent', espace: 'Mon espace référent' },
    {
      key: 'referent_regional',
      label: 'Régional',
      espace: 'Mon espace régional',
    },
    {
      key: 'tete_de_reseau',
      label: 'Tête de réseau',
      espace: 'Mon espace réseau',
    },
    {
      key: 'responsable',
      label: 'Responsable',
      espace: 'Mon espace organisation',
    },
    {
      key: 'responsable_territoire',
      label: 'Responsable de territoire',
      espace: 'Mon espace territoire',
    },
  ],
  disponibilities: [
    { key: 'flexible', label: 'Flexible' },
    { key: 'journee', label: 'En journée' },
    { key: 'soiree', label: 'En soirée' },
    { key: 'semaine', label: 'La semaine' },
    { key: 'weekend', label: 'Le week-end' },
    { key: 'jours_feries', label: 'Pendant les jours fériés' },
    { key: 'vacances', label: 'Pendant les vacances' },
  ],
  profile_type: [
    { key: 'etudiant', label: 'Étudiant' },
    { key: 'salarie', label: 'Salarié' },
    { key: 'travailleur_independant', label: 'Travailleur Indépendant' },
    { key: 'agent_fonction_publique', label: 'Agent de la Fonction Publique' },
    { key: 'retraite', label: 'Retraité' },
    { key: 'chomeur', label: 'Sans activité professionnelle' },
    { key: 'autre', label: 'Autre' },
  ],
  profile_certifications: [
    { key: 'permis_b', label: 'Permis B' },
    { key: 'psc1', label: 'PSC1' },
    { key: 'pse1', label: 'PSE1' },
    { key: 'pse2', label: 'PSE2' },
    { key: 'bafa', label: 'BAFA' },
  ],
  profile_type_missions: [
    { key: 'presentiel', label: 'Sur place' },
    { key: 'distance', label: 'À distance' },
    { key: 'all', label: 'Les deux' },
  ],
  mission_types: [
    { key: 'Mission en présentiel', label: 'Mission en présentiel' },
    { key: 'Mission à distance', label: 'Mission à distance' },
  ],
  mission_workflow_states: [
    {
      key: 'Brouillon',
      to: ['Brouillon'],
      roles: ['admin'],
      label: 'Brouillon',
      description: "La mission est en cours d'édition. Elle n'apparait pas dans la recherche.",
    },
    {
      key: 'En attente de validation',
      to: ['En attente de validation', 'En cours de traitement', 'Validée', 'Signalée'],
      roles: ['admin', 'referent', 'referent_regional'],
      label: 'En attente de validation',
      description: 'La mission est en attente de validation par le référérent départemental.',
    },
    {
      key: 'En cours de traitement',
      to: ['En cours de traitement', 'Validée', 'Signalée'],
      roles: ['admin', 'referent', 'referent_regional'],
      label: 'En cours de traitement',
      description: 'La mission est en cours de traitement par le référent départemental.',
    },
    {
      key: 'Validée',
      to: ['Validée', 'Terminée', 'Signalée', 'Annulée'],
      roles: ['admin', 'referent', 'referent_regional', 'responsable'],
      label: 'Validée',
      description: 'La mission est en ligne. Les bénévoles peuvent y participer.',
    },
    {
      key: 'Terminée',
      to: ['Terminée', 'Validée', 'Annulée'],
      roles: ['admin'],
      label: 'Terminée',
      description:
        'La mission est terminée. Les participations en attente seront automatiquement déclinées.',
    },
    {
      key: 'Signalée',
      to: ['Signalée', 'Annulée'],
      roles: ['admin'],
      label: 'Signalée',
      description:
        'La mission ne respecte pas la charte de JeVeuxAider.gouv.fr. Les participations en attente seront annulées. La mission est hors-ligne.',
    },
    {
      key: 'Annulée',
      to: ['Annulée', 'Signalée'],
      roles: ['admin'],
      label: 'Annulée',
      description:
        'La mission est annulée. Les participations en attente seront annulées. La mission est hors-ligne.',
    },
  ],
  profile_fields: [
    { key: 'mobile', label: 'Téléphone mobile' },
    { key: 'zip', label: 'Code postal' },
    { key: 'type', label: 'Profession' },
    { key: 'disponibilities', label: 'Disponibilités' },
    { key: 'commitment', label: 'Engagement' },
    { key: 'description', label: 'Motivation' },
    { key: 'birthday', label: 'Date de naissance' },
    { key: 'skills', label: 'Compétences' },
    { key: 'domaines', label: 'Domaines' },
  ],
  structure_fields: [
    { key: 'description', label: 'Description' },
    { key: 'publics_beneficiaires', label: 'Publics bénéficiaires' },
    { key: 'department', label: 'Département' },
    { key: 'logo', label: 'Logo' },
    { key: 'email', label: 'Email public' },
    { key: 'phone', label: 'Téléphone public' },
    { key: 'website', label: 'Site internet' },
    { key: 'domaines', label: 'Domaines' },
    { key: 'siret', label: 'SIRET' },
  ],
  reseau_fields: [
    { key: 'description', label: 'Description' },
    { key: 'publics_beneficiaires', label: 'Publics bénéficiaires' },
    { key: 'department', label: 'Département' },
    { key: 'logo', label: 'Logo' },
    { key: 'email', label: 'Email public' },
    { key: 'phone', label: 'Téléphone public' },
    { key: 'website', label: 'Site internet' },
    { key: 'domaines', label: 'Domaines' },
    { key: 'address', label: 'Adresse' },
    { key: 'zip', label: 'Code postal' },
    { key: 'city', label: 'Ville' },
  ],
  territoire_fields: [
    { key: 'suffix_title', label: 'Sous titre' },
    { key: 'department', label: 'Département' },
    { key: 'banner', label: 'Bannière' },
    { key: 'zips', label: 'Codes postaux' },
    { key: 'seo_recruit_title', label: 'Titre de recrutement' },
    {
      key: 'seo_recruit_description',
      label: 'Description pour le recrutement',
    },
    { key: 'seo_engage_title', label: "Titre pour l'engagement" },
    { key: 'seo_engage_paragraphs', label: "Description pour l'engagement" },
  ],
  mission_template_workflow_states: [
    {
      key: 'draft',
      to: ['draft', 'waiting'],
      roles: ['admin', 'tete_de_reseau'],
      label: 'Brouillon',
      description:
        "Le modèle de mission est en cours d'édition. Elle n'apparait pas dans les propositions.",
    },
    {
      key: 'waiting',
      to: ['waiting', 'draft', 'validated', 'refused'],
      roles: ['admin', 'tete_de_reseau'],
      label: 'En attente de validation',
      description: 'Le modèle de mission est soumis à validation par les modérateurs.',
    },
    {
      key: 'validated',
      to: ['validated', 'refused'],
      roles: ['admin'],
      label: 'Validé',
      description:
        "Le modèle de mission est en ligne. Les responsables du réseau peuvent s'en servir.",
    },
    {
      key: 'refused',
      to: ['refused', 'validated'],
      roles: ['admin'],
      label: 'Refusé',
      description: 'Le modèle de mission ne respecte pas la charte de JeVeuxAider.gouv.fr.',
    },
  ],
  territoire_types: [
    { key: 'department', label: 'Département' },
    { key: 'city', label: 'Ville' },
  ],
  territoire_workflow_states: [
    {
      key: 'waiting',
      to: ['waiting', 'validated', 'refused'],
      roles: ['admin'],
      label: 'En attente de validation',
      description: 'Le territoire est en attente de validation par les modérateurs.',
    },
    {
      key: 'validated',
      to: ['validated', 'refused'],
      roles: ['admin'],
      label: 'Validé',
      description: "Le territoire est en ligne. Les responsables du réseau peuvent s'en servir.",
    },
    {
      key: 'refused',
      to: ['validated', 'refused'],
      roles: ['admin'],
      label: 'Refusé',
      description: 'Le territoire ne respecte pas la charte de JeVeuxAider.gouv.fr.',
    },
  ],
  participation_declined_reasons: [
    {
      key: 'requirements_not_fulfilled',
      label: 'Le bénévole ne correspond pas aux besoins.',
    },
    { key: 'change_mind', label: "Le bénévole a changé d'avis." },
    { key: 'mission_terminated', label: 'La mission est terminée.' },
    { key: 'no_response', label: 'Le bénévole ne répond pas.' },
    { key: 'other', label: 'Autres.' },
  ],
  participation_canceled_by_benevole_reasons: [
    { key: 'no_response', label: "L'organisation ne répond pas." },
    {
      key: 'requirements_not_fulfilled',
      label: 'La mission ne correspond pas à mes attentes.',
    },
    { key: 'not_available', label: 'Je ne suis plus disponible.' },
    { key: 'other', label: 'Autres.' },
  ],
  testimonial_grade: [
    { key: 1, label: '1 étoile' },
    { key: 2, label: '2 étoiles' },
    { key: 3, label: '3 étoiles' },
    { key: 4, label: '4 étoiles' },
    { key: 5, label: '5 étoiles' },
  ],
  statistics_period: [
    { key: 'current_year', label: 'Cette année' },
    { key: 'last_year', label: "L'année dernière" },
    { key: 'current_month', label: 'Ce mois-ci' },
    { key: 'last_month', label: 'Le mois dernier' },
    { key: 'current_week', label: 'Cette semaine' },
    { key: 'last_week', label: 'La semaine dernière' },
    { key: 'all', label: 'Depuis le début' },
  ],
  responsable_fonction: [
    {
      key: 'Vie citoyenne / associative',
      label: 'Vie citoyenne / associative',
      statut_juridique: 'Collectivité',
    },
    {
      key: 'Éducation / Jeunesse',
      label: 'Éducation / Jeunesse',
      statut_juridique: 'Collectivité',
    },
    {
      key: 'Solidarité / Action sociale',
      label: 'Solidarité / Action sociale',
      statut_juridique: 'Collectivité',
    },
    {
      key: 'Direction de la communication',
      label: 'Direction de la communication',
      statut_juridique: 'Collectivité',
    },
    {
      key: 'Service des élections',
      label: 'Service des élections',
      statut_juridique: 'Collectivité',
    },
    {
      key: 'Service des Sports',
      label: 'Service des Sports',
      statut_juridique: 'Collectivité',
    },
    {
      key: 'Élu ou membre du cabinet',
      label: 'Élu ou membre du cabinet',
      statut_juridique: 'Collectivité',
    },
    {
      key: 'Autre direction thématique',
      label: 'Autre direction thématique',
      statut_juridique: 'Collectivité',
    },
    {
      key: 'Directeur de service',
      label: 'Directeur de service',
      statut_juridique: 'Organisation publique',
    },
    {
      key: 'Chef d’unité',
      label: 'Chef d’unité',
      statut_juridique: 'Organisation publique',
    },
    { key: 'Autre', label: 'Autre', statut_juridique: 'Organisation publique' },
    {
      key: 'Membre du bureau (président, SG, trésorier, …)',
      label: 'Membre du bureau (président, SG, trésorier, …)',
      statut_juridique: 'Association',
    },
    {
      key: 'Administrateur',
      label: 'Administrateur',
      statut_juridique: 'Association',
    },
    {
      key: 'Communication',
      label: 'Communication',
      statut_juridique: 'Association',
    },
    {
      key: 'Ressources humaines',
      label: 'Ressources humaines',
      statut_juridique: 'Association',
    },
    {
      key: 'Recrutement bénévoles',
      label: 'Recrutement bénévoles',
      statut_juridique: 'Association',
    },
    {
      key: 'Vie associative',
      label: 'Vie associative',
      statut_juridique: 'Association',
    },
    {
      key: 'Gestion de projets',
      label: 'Gestion de projets',
      statut_juridique: 'Association',
    },
  ],
  slots: [
    { key: 'day', label: 'Toute la journée' },
    { key: 'morning', label: 'Matinée' },
    { key: 'midday', label: 'Le midi' },
    { key: 'afternoon', label: 'Après-midi' },
    { key: 'evening', label: 'En soirée' },
    { key: 'night', label: 'La nuit' },
  ],
  models: [
    { key: 'App\\Models\\Structure', label: 'Organisation' },
    { key: 'App\\Models\\Participation', label: 'Participation' },
    { key: 'App\\Models\\Mission', label: 'Mission' },
  ],
  rule_events: [
    { key: 'none', label: 'Aucun (script seulement)' },
    { key: 'mission_updated', label: 'Mission est modifiée' },
  ],
  rule_actions: [
    { key: 'mission_attach_tag', label: 'Ajouter un tag à la mission' },
    { key: 'mission_detach_tag', label: 'Retirer un tag à la mission' },
  ],
  user_ban_reasons: [
    {
      key: 'not_regular_resident',
      label: 'Le bénévole ne réside pas régulièrement en France',
    },
    { key: 'younger_than_16', label: 'Le bénévole est âgé de moins de 16 ans' },
    {
      key: 'inappropriate_behavior',
      label:
        'Le bénévole a un comportement inadapté (insulte, propos discriminatoires / racistes, …)',
    },
  ],
  faq_tabs: [
    { key: 'benevole', label: 'Pour les bénévoles' },
    { key: 'organisation', label: 'Pour les organisations' },
  ],
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      labels,
    },
  }
})
