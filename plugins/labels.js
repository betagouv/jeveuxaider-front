export default ({ app }, inject) => {
  // Inject $labels in Vue, context and store.
  inject('labels', labels)
}

const labels = {
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
    { key: '987', label: 'Polynésie française' }
  ],
  duration: [
    { key: '1_hour', label: '1 heure' },
    { key: '2_hours', label: '2 heures' },
    { key: 'half_day', label: 'Une demi-journée' },
    { key: 'day', label: '1 jour' },
    { key: '3_days', label: '3 jours' },
    { key: '5_days', label: '5 jours' }
  ],
  geoType: [
    { key: 'housenumber', label: 'Adresse' },
    { key: 'locality', label: 'Lieu-dit' },
    { key: 'municipality', label: 'Ville' },
    { key: 'street', label: 'Rue' }
  ],
  mission_publics_beneficiaires: [
    { key: 'seniors', label: 'Personnes âgées' },
    { key: 'persons_with_disabilities', label: 'Personnes en situation de handicap' },
    { key: 'people_in_difficulty', label: 'Personnes en difficulté' },
    { key: 'parents', label: 'Parents' },
    { key: 'children', label: 'Jeunes / enfants' },
    { key: 'any_public', label: 'Tous publics' }
  ],
  mission_publics_volontaires: [
    { key: 'Mineurs', label: 'Mineurs' },
    { key: 'Jeunes volontaires du Service National Universel', label: 'Jeunes volontaires du Service National Universel' }
  ],
  structure_legal_status: [
    { key: 'Association', label: 'Association', label2: "l'association" },
    { key: 'Collectivité', label: 'Collectivité', label2: 'la collectivité' },
    { key: 'Organisation publique', label: 'Organisation publique', label2: "l'organisation publique" },
    { key: 'Organisation privée', label: 'Organisation privée', label2: "l'organisation privée" },
    { key: 'Autre', label: 'Autre', label2: "l'organisation" }
  ],
  association_types: [
    { key: 'Agrément jeunesse et éducation populaire', label: 'Agrément jeunesse et éducation populaire' },
    { key: 'Agrément service civique', label: 'Agrément service civique' },
    { key: "Association complémentaire de l'enseignement public", label: "Association complémentaire de l'enseignement public" },
    { key: "Associations d'usagers du système de santé", label: "Associations d'usagers du système de santé" },
    { key: "Association sportive affiliée à une fédération sportive agréée par l'État", label: "Association sportive affiliée à une fédération sportive agréée par l'État" },
    { key: "Agrément des associations de protection de l'environnement", label: "Agrément des associations de protection de l'environnement" },
    { key: 'Association agréée de sécurité civile', label: 'Association agréée de sécurité civile' },
    { key: 'Autre agrément', label: 'Autre agrément' }
  ],
  structure_publique_types: [
    { key: 'Etablissement scolaire', label: 'Etablissement scolaire' },
    { key: 'Etablissement public de santé', label: 'Etablissement public de santé' },
    { key: 'Etablissement public', label: 'Etablissement public' },
    { key: "Service de l'Etat", label: "Service de l'Etat" }
  ],
  structure_publique_etat_types: [
    { key: "SDIS (Service départemental d'Incendie et de Secours)", label: "SDIS (Service départemental d'Incendie et de Secours)" },
    { key: 'Gendarmerie', label: 'Gendarmerie' },
    { key: 'Police', label: 'Police' },
    { key: 'Armées', label: 'Armées' },
    { key: "Autre service de l'état", label: "Autre service de l'état" },
    { key: 'Autre établissement public', label: 'Autre établissement public' }
  ],
  structure_privee_types: [
    { key: "Établissement de santé privé d'intérêt collectif", label: "Établissement de santé privé d'intérêt collectif" },
    { key: 'Entreprise agréée ESUS', label: 'Entreprise agréée ESUS' },
    { key: 'Autre', label: 'Autre' }
  ],
  structure_workflow_states: [
    { key: 'En attente de validation', label: 'En attente de validation', description: "L'organisation vient de s'inscrire. Elle est en attente de validation par un référent." },
    { key: 'En cours de traitement', label: 'En cours de traitement', from: ['En attente de validation'], description: "Le référent vérifie des informations avant de valider l'organisation." },
    { key: 'Validée', label: 'Validée', from: ['En cours de traitement', 'En attente de validation'], description: "L'organisation peut poster des missions et a une page publique qu'elle peut éditer." },
    { key: 'Signalée', label: 'Signalée', from: ['En cours de traitement', 'En attente de validation', 'Validée'], description: "L'organisation ne respecte pas la charte de JeVeuxAider.gouv.fr. La page de l'organisation est hors ligne, ainsi que que ses missions." },
    { key: 'Désinscrite', label: 'Désinscrite', description: "L'organisation s'est désinscrite. Sa page est hors ligne ainsi que ses missions." }
  ],
  participation_workflow_states: [
    { key: 'En attente de validation', label: 'En attente de validation', description: 'Le bénévole vient de candidater. Il est en attente de validation par le responsable de la mission.' },
    { key: 'En cours de traitement', label: 'En cours de traitement', from: ['En attente de validation'], description: 'Le responsable vérifie des informations avant de valider la participation.' },
    { key: 'Validée', label: 'Validée', from: ['En cours de traitement', 'En attente de validation'], description: 'La participation est validée, elle va avoir lieu ou a déjà été faite.' },
    { key: 'Annulée', label: 'Annulée', from: ['En cours de traitement', 'En attente de validation'], description: 'La participation est annulée si la mission a été annulée.' },
    { key: 'Refusée', label: 'Refusée', from: ['En cours de traitement', 'En attente de validation', 'Validée'], description: 'Le profil du bénévole ne correspond pas à la mission.' }
  ],
  time_period: [
    { key: 'week', label: 'semaine' },
    { key: 'month', label: 'mois' },
    { key: 'year', label: 'an' }
  ],
  domaines: [
    { key: 5, label: 'Mobilisation Covid19', icon: '/images/icons/domaine-covid.svg', color: 'text-domaine-covid', bg: 'bg-domaine-covid', emoji: '😷' },
    { key: 9, label: 'Éducation pour tous', icon: '/images/icons/domaine-education-pour-tous.svg', color: 'text-domaine-education', bg: 'bg-domaine-education', emoji: '📚' },
    { key: 1, label: 'Santé pour tous', icon: '/images/icons/domaine-sante-pour-tous.svg', color: 'text-domaine-sante', bg: 'bg-domaine-sante', emoji: '💊' },
    { key: 10, label: 'Protection de la nature', icon: '/images/icons/domaine-protection-nature.svg', color: 'text-domaine-nature', bg: 'bg-domaine-nature', emoji: '🌿' },
    { key: 7, label: 'Solidarité & Insertion', icon: '/images/icons/domaine-solidarite-insertion.svg', color: 'text-domaine-solidarite', bg: 'bg-domaine-solidarite', emoji: '🍲' },
    { key: 4, label: 'Sport pour tous', icon: '/images/icons/domaine-sport-pour-tous.svg', color: 'text-domaine-sport', bg: 'bg-domaine-sport', emoji: '🏀' },
    { key: 2, label: 'Prévention et protection', icon: '/images/icons/domaine-prevention-protection.svg', color: 'text-domaine-prevention', bg: 'bg-domaine-prevention', emoji: '🚨' },
    { key: 8, label: 'Mémoire et citoyenneté', icon: '/images/icons/domaine-memoire-citoyennete.svg', color: 'text-domaine-memoire', bg: 'bg-domaine-memoire', emoji: '📯' },
    { key: 6, label: 'Coopération internationale', icon: '/images/icons/domaine-cooperation-internationale.svg', color: 'text-domaine-cooperation', bg: 'bg-domaine-cooperation', emoji: '🌍' },
    { key: 3, label: 'Art & Culture pour tous', icon: '/images/icons/domaine-art-culture-pour-tous.svg', color: 'text-domaine-culture', bg: 'bg-domaine-culture', emoji: '🎨' }
  ],
  role: [
    { key: 'volontaire', label: 'Bénévole', espace: 'Mon espace bénévole' },
    { key: 'admin', label: 'Modérateur', espace: 'Mon espace modérateur' },
    { key: 'referent', label: 'Référent', espace: 'Mon espace référent' },
    { key: 'referent_regional', label: 'Régional', espace: 'Mon espace régional' },
    { key: 'tete_de_reseau', label: 'Tête de réseau', espace: 'Mon espace réseau' },
    { key: 'responsable', label: 'Responsable', espace: 'Mon espace organisation' },
    { key: 'responsable_territoire', label: 'Responsable de territoire', espace: 'Mon espace territoire' },
    { key: 'analyste', label: 'Analyste', espace: 'Mon espace analyste' }
  ],
  disponibilities: [
    { key: 'flexible', label: 'Flexible' },
    { key: 'journee', label: 'En journée' },
    { key: 'soiree', label: 'En soirée' },
    { key: 'semaine', label: 'La semaine' },
    { key: 'weekend', label: 'Le week-end' },
    { key: 'jours_feries', label: 'Pendant les jours fériés' },
    { key: 'vacances', label: 'Pendant les vacances' }
  ],
  profile_type: [
    { key: 'etudiant', label: 'Étudiant' },
    { key: 'salarie', label: 'Salarié' },
    { key: 'travailleur_independant', label: 'Travailleur Indépendant' },
    { key: 'agent_fonction_publique', label: 'Agent de la Fonction Publique' },
    { key: 'retraite', label: 'Retraité' },
    { key: 'chomeur', label: 'Sans activité professionnelle' },
    { key: 'autre', label: 'Autre' }
  ],
  mission_types: [
    { key: 'Mission en présentiel', label: 'Mission en présentiel' },
    { key: 'Mission à distance', label: 'Mission à distance' }
  ],
  mission_workflow_states: [
    { key: 'Brouillon', label: 'Brouillon', from: ['En attente de validation'], description: "La mission est en cours d'édition. Elle n'apparait pas dans la recherche." },
    { key: 'En attente de validation', from: ['Brouillon'], label: 'En attente de validation', description: 'La mission est en attente de validation par le référérent départemental.' },
    { key: 'En cours de traitement', label: 'En cours de traitement', from: ['Brouillon', 'En attente de validation'], description: 'La mission est en cours de traitement par le référent départemental.' },
    { key: 'Validée', label: 'Validée', from: ['En cours de traitement', 'En attente de validation'], description: 'La mission est en ligne. Les bénévoles peuvent y participer.' },
    { key: 'Terminée', label: 'Terminée', from: ['Validée'], description: 'La mission est terminée. Les participations en attente seront annulées.' },
    { key: 'Signalée', label: 'Signalée', from: ['En cours de traitement', 'En attente de validation', 'Validée'], description: 'La mission ne respecte pas la charte de JeVeuxAider.gouv.fr. Les participations en attente seront annulées. La mission est hors-ligne.' },
    { key: 'Annulée', label: 'Annulée', from: ['Validée'], description: 'La mission est annulée. Les participations en attente seront annulées. La mission est hors-ligne.' }
  ],
  profile_fields: [
    { key: 'mobile', label: 'Téléphone mobile' },
    { key: 'zip', label: 'Code postal' },
    { key: 'type', label: 'Profession' },
    { key: 'disponibilities', label: 'Disponibilités' },
    { key: 'commitment__time_period', label: 'Fréquence d\'engagement' },
    { key: 'commitment__duration', label: 'Durée d\'engagement' },
    { key: 'description', label: 'Motivation' },
    { key: 'birthday', label: 'Date de naissance' },
    { key: 'skills', label: 'Compétences' },
    { key: 'domaines', label: 'Domaines' }
  ],
  structure_fields: [
    { key: 'description', label: 'Description' },
    { key: 'publics_beneficiaires', label: 'Publics bénéficiaires' },
    { key: 'department', label: 'Département' },
    { key: 'logo', label: 'Logo' },
    { key: 'email', label: 'Email public' },
    { key: 'phone', label: 'Téléphone public' },
    { key: 'website', label: 'Site internet' },
    { key: 'domaines', label: 'Domaines' }
  ],
  mission_template_workflow_states: [
    { key: 'draft', label: 'Brouillon', from: ['waiting'], description: "Le modèle de mission est en cours d'édition. Elle n'apparait pas dans les propositions." },
    { key: 'waiting', label: 'En attente de validation', from: ['draft'], description: 'Le modèle de mission est en attente de validation par les modérateurs.' },
    { key: 'validated', label: 'Validé', from: ['waiting', 'refused'], description: 'Le modèle de mission est en ligne. Les responsables du réseau peuvent s\'en servir.' },
    { key: 'refused', label: 'Refusé', from: ['waiting', 'validated'], description: 'Le modèle de mission ne respecte pas la charte de JeVeuxAider.gouv.fr.' }
  ],
  territoire_types: [
    { key: 'department', label: 'Département' },
    { key: 'city', label: 'Ville' }
  ],
  territoire_workflow_states: [
    { key: 'waiting', label: 'En attente de validation', from: ['draft'], description: 'Le territoire est en attente de validation par les modérateurs.' },
    { key: 'validated', label: 'Validé', from: ['waiting', 'refused'], description: 'Le territoire est en ligne. Les responsables du réseau peuvent s\'en servir.' },
    { key: 'refused', label: 'Refusé', from: ['waiting', 'validated'], description: 'Le territoire ne respecte pas la charte de JeVeuxAider.gouv.fr.' }
  ],
  participation_declined_reasons: [
    { key: 'no_response', label: 'Le bénévole ne répond pas.' },
    { key: 'requirements_not_fulfilled', label: 'Le bénévole ne correspond pas aux besoins.' },
    { key: 'change_mind', label: 'Le bénévole a changé d\'avis.' },
    { key: 'mission_terminated', label: 'La mission est terminée.' },
    { key: 'other', label: 'Autres.' }
  ],
  participation_canceled_by_benevole_reasons: [
    { key: 'no_response', label: 'L\'organisation ne répond pas.' },
    { key: 'requirements_not_fulfilled', label: 'La mission ne correspond pas à mes attentes.' },
    { key: 'not_available', label: 'Je ne suis plus disponible.' },
    { key: 'other', label: 'Autres.' }
  ]
}
