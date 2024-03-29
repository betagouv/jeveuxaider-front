export const multidistributedCitiesHelper = async () => {
  const find = (zip: string, label: string) =>
    multidistributedCities.find((c) => c.zip === zip && c.label === label)

  const getMultidistributedCity = (zip: string, label: string) => {
    const found = find(zip, label)
    return found ? multidistributedCities.filter((c) => c.group === found.group) : null
  }

  return {
    getMultidistributedCity,
  }
}

type multidistributedCityType = {
  key: string
  group: string
  label: string
  labelArrondissement?: string
  arrondissement?: string
  zip: string
  latitude: number
  longitude: number
}

const multidistributedCities: multidistributedCityType[] = [
  {
    key: 'amiens_1',
    group: 'amiens',
    label: 'Amiens',
    zip: '80000',
    latitude: 49.8963037,
    longitude: 2.2384335,
  },
  {
    key: 'amiens_2',
    group: 'amiens',
    label: 'Amiens',
    zip: '80080',
    latitude: 49.9249782,
    longitude: 2.2500037,
  },
  {
    key: 'amiens_3',
    group: 'amiens',
    label: 'Amiens',
    zip: '80090',
    latitude: 49.8675234,
    longitude: 2.2338522,
  },

  {
    key: 'lille_1',
    group: 'lille',
    label: 'Lille',
    zip: '59000',
    latitude: 50.6198148,
    longitude: 3.0334056,
  },
  {
    key: 'lille_2',
    group: 'lille',
    label: 'Lille',
    zip: '59160',
    latitude: 50.6433434,
    longitude: 2.967208,
  },
  {
    key: 'lille_3',
    group: 'lille',
    label: 'Lille',
    zip: '59260',
    latitude: 50.6100652,
    longitude: 3.096712,
  },
  {
    key: 'lille_4',
    group: 'lille',
    label: 'Lille',
    zip: '59777',
    latitude: 50.6386243,
    longitude: 3.0561706,
  },
  {
    key: 'lille_5',
    group: 'lille',
    label: 'Lille',
    zip: '59800',
    latitude: 50.6369113,
    longitude: 3.0480606,
  },

  {
    key: 'nancy_1',
    group: 'nancy',
    label: 'Nancy',
    zip: '54000',
    latitude: 48.68803,
    longitude: 6.0955985,
  },
  {
    key: 'nancy_2',
    group: 'nancy',
    label: 'Nancy',
    zip: '54100',
    latitude: 48.7007043,
    longitude: 6.1396005,
  },

  {
    key: 'metz_1',
    group: 'metz',
    label: 'Metz',
    zip: '57000',
    latitude: 49.102425,
    longitude: 6.141601,
  },
  {
    key: 'metz_2',
    group: 'metz',
    label: 'Metz',
    zip: '57050',
    latitude: 49.1340119,
    longitude: 6.0889569,
  },
  {
    key: 'metz_3',
    group: 'metz',
    label: 'Metz',
    zip: '57070',
    latitude: 49.1245285,
    longitude: 6.1780303,
  },

  {
    key: 'clermont_ferrand_1',
    group: 'clermont_ferrand',
    label: 'Clermont-Ferrand',
    zip: '63000',
    latitude: 45.7714351,
    longitude: 3.0799642,
  },
  {
    key: 'clermont_ferrand_2',
    group: 'clermont_ferrand',
    label: 'Clermont-Ferrand',
    zip: '63100',
    latitude: 45.7963326,
    longitude: 3.066566,
  },

  {
    key: 'orleans_1',
    group: 'orleans',
    label: 'Orléans',
    zip: '45000',
    latitude: 47.9139476,
    longitude: 1.832125,
  },
  {
    key: 'orleans_2',
    group: 'orleans',
    label: 'Orléans',
    zip: '45100',
    latitude: 47.8545529,
    longitude: 1.8721795,
  },

  {
    key: 'tours_1',
    group: 'tours',
    label: 'Tours',
    zip: '37000',
    latitude: 47.3877892,
    longitude: 0.621658,
  },
  {
    key: 'tours_2',
    group: 'tours',
    label: 'Tours',
    zip: '37100',
    latitude: 47.4181144,
    longitude: 0.6785993,
  },
  {
    key: 'tours_3',
    group: 'tours',
    label: 'Tours',
    zip: '37200',
    latitude: 47.36231,
    longitude: 0.663464,
  },

  {
    key: 'angers_1',
    group: 'angers',
    label: 'Angers',
    zip: '49000',
    latitude: 47.4977752,
    longitude: -0.7089986,
  },
  {
    key: 'angers_2',
    group: 'angers',
    label: 'Angers',
    zip: '49100',
    latitude: 47.4942701,
    longitude: -0.5678337,
  },

  {
    key: 'nantes_1',
    group: 'nantes',
    label: 'Nantes',
    zip: '44000',
    latitude: 47.2219302,
    longitude: -1.571088,
  },
  {
    key: 'nantes_2',
    group: 'nantes',
    label: 'Nantes',
    zip: '44100',
    latitude: 47.2118905,
    longitude: -1.6250554,
  },
  {
    key: 'nantes_3',
    group: 'nantes',
    label: 'Nantes',
    zip: '44200',
    latitude: 47.1994181,
    longitude: -1.5933448,
  },
  {
    key: 'nantes_4',
    group: 'nantes',
    label: 'Nantes',
    zip: '44300',
    latitude: 47.2563071,
    longitude: -1.5771882,
  },

  {
    key: 'le_mans_1',
    group: 'le_mans',
    label: 'Le Mans',
    zip: '72000',
    latitude: 47.9926252,
    longitude: 0.1214019,
  },
  {
    key: 'le_mans_2',
    group: 'le_mans',
    label: 'Le Mans',
    zip: '72100',
    latitude: 47.9818529,
    longitude: 0.1665064,
  },

  {
    key: 'toulouse_1',
    group: 'toulouse',
    label: 'Toulouse',
    zip: '31000',
    latitude: 43.6040689,
    longitude: 1.4140213,
  },
  {
    key: 'toulouse_2',
    group: 'toulouse',
    label: 'Toulouse',
    zip: '31004',
    latitude: 43.608169,
    longitude: 1.4505391,
  },
  {
    key: 'toulouse_3',
    group: 'toulouse',
    label: 'Toulouse',
    zip: '31043',
    latitude: 43.5960209,
    longitude: 1.4624077,
  },
  {
    key: 'toulouse_4',
    group: 'toulouse',
    label: 'Toulouse',
    zip: '31090',
    latitude: 43.6146946,
    longitude: 1.4262272,
  },
  {
    key: 'toulouse_5',
    group: 'toulouse',
    label: 'Toulouse',
    zip: '31100',
    latitude: 43.5678513,
    longitude: 1.3572811,
  },
  {
    key: 'toulouse_6',
    group: 'toulouse',
    label: 'Toulouse',
    zip: '31200',
    latitude: 43.6389804,
    longitude: 1.4082513,
  },
  {
    key: 'toulouse_7',
    group: 'toulouse',
    label: 'Toulouse',
    zip: '31300',
    latitude: 43.6037785,
    longitude: 1.3529872,
  },
  {
    key: 'toulouse_8',
    group: 'toulouse',
    label: 'Toulouse',
    zip: '31400',
    latitude: 43.5779438,
    longitude: 1.4166174,
  },
  {
    key: 'toulouse_9',
    group: 'toulouse',
    label: 'Toulouse',
    zip: '31500',
    latitude: 43.6020538,
    longitude: 1.4544802,
  },

  {
    key: 'limoges_1',
    group: 'limoges',
    label: 'Limoges',
    zip: '87000',
    latitude: 45.8213423,
    longitude: 1.2097174,
  },
  {
    key: 'limoges_2',
    group: 'limoges',
    label: 'Limoges',
    zip: '87100',
    latitude: 45.8536719,
    longitude: 1.1839053,
  },
  {
    key: 'limoges_3',
    group: 'limoges',
    label: 'Limoges',
    zip: '87280',
    latitude: 45.8917578,
    longitude: 1.2477988,
  },

  {
    key: 'bordeaux_1',
    group: 'bordeaux',
    label: 'Bordeaux',
    zip: '33000',
    latitude: 44.838815,
    longitude: -0.6086462,
  },
  {
    key: 'bordeaux_2',
    group: 'bordeaux',
    label: 'Bordeaux',
    zip: '33100',
    latitude: 44.8456125,
    longitude: -0.5714395,
  },
  {
    key: 'bordeaux_3',
    group: 'bordeaux',
    label: 'Bordeaux',
    zip: '33200',
    latitude: 44.8539463,
    longitude: -0.6370097,
  },
  {
    key: 'bordeaux_4',
    group: 'bordeaux',
    label: 'Bordeaux',
    zip: '33300',
    latitude: 44.883905,
    longitude: -0.5832028,
  },
  {
    key: 'bordeaux_5',
    group: 'bordeaux',
    label: 'Bordeaux',
    zip: '33800',
    latitude: 44.8239488,
    longitude: -0.5809676,
  },

  {
    key: 'rennes_1',
    group: 'rennes',
    label: 'Rennes',
    zip: '35000',
    latitude: 48.1120192,
    longitude: -1.7297718,
  },
  {
    key: 'rennes_2',
    group: 'rennes',
    label: 'Rennes',
    zip: '35200',
    latitude: 48.0893253,
    longitude: -1.6867074,
  },
  {
    key: 'rennes_3',
    group: 'rennes',
    label: 'Rennes',
    zip: '35700',
    latitude: 48.1325249,
    longitude: -1.6739641,
  },

  {
    key: 'montpellier_1',
    group: 'montpellier',
    label: 'Montpellier',
    zip: '34000',
    latitude: 43.6034329,
    longitude: 3.8525666,
  },
  {
    key: 'montpellier_2',
    group: 'montpellier',
    label: 'Montpellier',
    zip: '34070',
    latitude: 43.5930207,
    longitude: 3.8261197,
  },
  {
    key: 'montpellier_3',
    group: 'montpellier',
    label: 'Montpellier',
    zip: '34080',
    latitude: 43.6265782,
    longitude: 3.80962,
  },
  {
    key: 'montpellier_4',
    group: 'montpellier',
    label: 'Montpellier',
    zip: '34090',
    latitude: 43.632921,
    longitude: 3.8383459,
  },

  {
    key: 'nice_1',
    group: 'nice',
    label: 'Nice',
    zip: '06000',
    latitude: 43.7182297,
    longitude: 7.2338355,
  },
  {
    key: 'nice_2',
    group: 'nice',
    label: 'Nice',
    zip: '06100',
    latitude: 43.730313,
    longitude: 7.2376744,
  },
  {
    key: 'nice_3',
    group: 'nice',
    label: 'Nice',
    zip: '06200',
    latitude: 43.7030133,
    longitude: 7.1724864,
  },
  {
    key: 'nice_4',
    group: 'nice',
    label: 'Nice',
    zip: '06300',
    latitude: 43.7217902,
    longitude: 7.2552261,
  },

  {
    key: 'grenoble_1',
    group: 'grenoble',
    label: 'Grenoble',
    zip: '38000',
    latitude: 45.1970755,
    longitude: 5.6898352,
  },
  {
    key: 'grenoble_2',
    group: 'grenoble',
    label: 'Grenoble',
    zip: '38100',
    latitude: 45.1719264,
    longitude: 5.7062565,
  },

  {
    key: 'saint_etienne_1',
    group: 'saint_etienne',
    label: 'Saint-Étienne',
    zip: '42000',
    latitude: 45.4518842,
    longitude: 4.3685946,
  },
  {
    key: 'saint_etienne_2',
    group: 'saint_etienne',
    label: 'Saint-Étienne',
    zip: '42100',
    latitude: 45.4098213,
    longitude: 4.3823653,
  },
  {
    key: 'saint_etienne_3',
    group: 'saint_etienne',
    label: 'Saint-Étienne',
    zip: '42230',
    latitude: 45.4322023,
    longitude: 4.2620088,
  },

  {
    key: 'rouen_1',
    group: 'rouen',
    label: 'Rouen',
    zip: '76000',
    latitude: 49.4465131,
    longitude: 1.0535886,
  },
  {
    key: 'rouen_2',
    group: 'rouen',
    label: 'Rouen',
    zip: '76100',
    latitude: 49.4335918,
    longitude: 1.0290735,
  },

  {
    key: 'strasbourg_1',
    group: 'strasbourg',
    label: 'Strasbourg',
    zip: '67000',
    latitude: 48.5984641,
    longitude: 7.7388301,
  },
  {
    key: 'strasbourg_2',
    group: 'strasbourg',
    label: 'Strasbourg',
    zip: '67100',
    latitude: 48.534958,
    longitude: 7.7273441,
  },
  {
    key: 'strasbourg_3',
    group: 'strasbourg',
    label: 'Strasbourg',
    zip: '67200',
    latitude: 48.5787045,
    longitude: 7.6935635,
  },

  {
    key: 'ajaccio_1',
    group: 'ajaccio',
    label: 'Ajaccio',
    zip: '20000',
    latitude: 41.9194588,
    longitude: 8.6340929,
  },
  {
    key: 'ajaccio_2',
    group: 'ajaccio',
    label: 'Ajaccio',
    zip: '20090',
    latitude: 41.9383805,
    longitude: 8.6262578,
  },
  {
    key: 'ajaccio_3',
    group: 'ajaccio',
    label: 'Ajaccio',
    zip: '20167',
    latitude: 41.9963194,
    longitude: 8.1771348,
  },

  {
    key: 'bastia_1',
    group: 'bastia',
    label: 'Bastia',
    zip: '20200',
    latitude: 42.7292957,
    longitude: 9.3869041,
  },
  {
    key: 'bastia_2',
    group: 'bastia',
    label: 'Bastia',
    zip: '20600',
    latitude: 42.6669617,
    longitude: 9.3799932,
  },

  {
    key: 'dunkerque_1',
    group: 'dunkerque',
    label: 'Dunkerque',
    zip: '59140',
    latitude: 51.041789,
    longitude: 2.3055559,
  },
  {
    key: 'dunkerque_2',
    group: 'dunkerque',
    label: 'Dunkerque',
    zip: '59240',
    latitude: 51.0441209,
    longitude: 2.3948189,
  },
  {
    key: 'dunkerque_3',
    group: 'dunkerque',
    label: 'Dunkerque',
    zip: '59430',
    latitude: 51.0311405,
    longitude: 2.2510016,
  },
  {
    key: 'dunkerque_4',
    group: 'dunkerque',
    label: 'Dunkerque',
    zip: '59640',
    latitude: 51.0188383,
    longitude: 2.3159077,
  },
  {
    key: 'dunkerque_5',
    group: 'dunkerque',
    label: 'Dunkerque',
    zip: '59279',
    latitude: 50.9999037,
    longitude: 2.1787525,
  },

  {
    key: 'le_havre_1',
    group: 'le_havre',
    label: 'Le Havre',
    zip: '76600',
    latitude: 49.4785487,
    longitude: 0.0990001,
  },
  {
    key: 'le_havre_2',
    group: 'le_havre',
    label: 'Le Havre',
    zip: '76610',
    latitude: 49.5148876,
    longitude: 0.1416661,
  },
  {
    key: 'le_havre_3',
    group: 'le_havre',
    label: 'Le Havre',
    zip: '76620',
    latitude: 49.5200626,
    longitude: 0.0836572,
  },

  {
    key: 'perpignan_1',
    group: 'perpignan',
    label: 'Perpignan',
    zip: '66000',
    latitude: 42.7010633,
    longitude: 2.8634097,
  },
  {
    key: 'perpignan_2',
    group: 'perpignan',
    label: 'Perpignan',
    zip: '66100',
    latitude: 42.6729966,
    longitude: 2.8821386,
  },

  {
    key: 'nimes_1',
    group: 'nimes',
    label: 'Nîmes',
    zip: '30000',
    latitude: 43.8625301,
    longitude: 4.2777437,
  },
  {
    key: 'nimes_2',
    group: 'nimes',
    label: 'Nîmes',
    zip: '30900',
    latitude: 43.8247937,
    longitude: 4.2399465,
  },

  {
    key: 'toulon_1',
    group: 'toulon',
    label: 'Toulon',
    zip: '83000',
    latitude: 43.1195941,
    longitude: 5.9267284,
  },
  {
    key: 'toulon_2',
    group: 'toulon',
    label: 'Toulon',
    zip: '83100',
    latitude: 43.1261002,
    longitude: 5.9453123,
  },
  {
    key: 'toulon_3',
    group: 'toulon',
    label: 'Toulon',
    zip: '83200',
    latitude: 43.1642213,
    longitude: 5.8939285,
  },

  {
    key: 'mulhouse_1',
    group: 'mulhouse',
    label: 'Mulhouse',
    zip: '68100',
    latitude: 47.7446131,
    longitude: 7.3243308,
  },
  {
    key: 'mulhouse_2',
    group: 'mulhouse',
    label: 'Mulhouse',
    zip: '68200',
    latitude: 47.7554641,
    longitude: 7.291366,
  },

  {
    key: 'aix_en_provence_1',
    group: 'aix_en_provence',
    label: 'Aix-en-Provence',
    zip: '13080',
    latitude: 43.4910115,
    longitude: 5.4183168,
  },
  {
    key: 'aix_en_provence_2',
    group: 'aix_en_provence',
    label: 'Aix-en-Provence',
    zip: '13090',
    latitude: 43.5400846,
    longitude: 5.3633017,
  },
  {
    key: 'aix_en_provence_3',
    group: 'aix_en_provence',
    label: 'Aix-en-Provence',
    zip: '13100',
    latitude: 43.5517271,
    longitude: 5.4542656,
  },
  {
    key: 'aix_en_provence_4',
    group: 'aix_en_provence',
    label: 'Aix-en-Provence',
    zip: '13290',
    latitude: 43.4913787,
    longitude: 5.3021167,
  },
  {
    key: 'aix_en_provence_5',
    group: 'aix_en_provence',
    label: 'Aix-en-Provence',
    zip: '13540',
    latitude: 43.5879811,
    longitude: 5.360933,
  },

  {
    key: 'auxerre_1',
    group: 'auxerre',
    label: 'Auxerre',
    zip: '89000',
    latitude: 47.8026762,
    longitude: 3.5173518,
  },
  {
    key: 'auxerre_2',
    group: 'auxerre',
    label: 'Auxerre',
    zip: '89290',
    latitude: 47.7462533,
    longitude: 3.5693046,
  },

  {
    key: 'saint_maur_des_fosses_1',
    group: 'saint_maur_des_fosses',
    label: 'Saint-Maur-des-Fossés',
    zip: '94100',
    latitude: 48.7997805,
    longitude: 2.4646721,
  },
  {
    key: 'saint_maur_des_fosses_2',
    group: 'saint_maur_des_fosses',
    label: 'Saint-Maur-des-Fossés',
    zip: '94210',
    latitude: 48.796954,
    longitude: 2.4975523,
  },

  {
    key: 'cannes_1',
    group: 'cannes',
    label: 'Cannes',
    zip: '06150',
    latitude: 43.554745,
    longitude: 6.9486819,
  },
  {
    key: 'cannes_2',
    group: 'cannes',
    label: 'Cannes',
    zip: '06400',
    latitude: 43.5371752,
    longitude: 6.9866262,
  },

  {
    key: 'villeneuve_d_ascq_1',
    group: 'villeneuve_d_ascq',
    label: "Villeneuve d'Ascq",
    zip: '59493',
    latitude: 50.6179654,
    longitude: 3.1566223,
  },
  {
    key: 'villeneuve_d_ascq_2',
    group: 'villeneuve_d_ascq',
    label: "Villeneuve d'Ascq",
    zip: '59494',
    latitude: 50.6361306,
    longitude: 3.006166,
  },
  {
    key: 'villeneuve_d_ascq_3',
    group: 'villeneuve_d_ascq',
    label: "Villeneuve d'Ascq",
    zip: '59650',
    latitude: 50.6273048,
    longitude: 3.0733078,
  },

  {
    key: 'meudon_1',
    group: 'meudon',
    label: 'Meudon',
    zip: '92190',
    latitude: 48.806518,
    longitude: 2.2129249,
  },
  {
    key: 'meudon_2',
    group: 'meudon',
    label: 'Meudon',
    zip: '92360',
    latitude: 48.7969004,
    longitude: 2.2092574,
  },

  {
    key: 'saint_denis_la_plaine_1',
    group: 'saint_denis_la_plaine',
    label: 'Saint-Denis',
    zip: '93200',
    latitude: 48.9267515,
    longitude: 2.3452015,
  },
  {
    key: 'saint_denis_la_plaine_2',
    group: 'saint_denis_la_plaine',
    label: 'Saint-Denis',
    zip: '93210',
    latitude: 48.9120595,
    longitude: 2.3480548,
  },

  {
    key: 'antibes_juan_les_pins_1',
    group: 'antibes_juan_les_pins',
    label: 'Antibes',
    zip: '06600',
    latitude: 43.5977068,
    longitude: 7.0780731,
  },
  {
    key: 'antibes_juan_les_pins_2',
    group: 'antibes_juan_les_pins',
    label: 'Juan-les-Pins',
    zip: '06160',
    latitude: 43.5710752,
    longitude: 7.106276,
  },

  {
    key: 'grasse_1',
    group: 'grasse',
    label: 'Grasse',
    zip: '06130',
    latitude: 43.6558885,
    longitude: 6.8959608,
  },
  {
    key: 'grasse_2',
    group: 'grasse',
    label: 'Grasse',
    zip: '06520',
    latitude: 43.6819178,
    longitude: 6.9471165,
  },

  {
    key: 'marseille_1',
    group: 'marseille',
    label: 'Marseille',
    labelArrondissement: 'Marseille 1er Arrondissement',
    arrondissement: '1er',
    zip: '13001',
    latitude: 43.3001999,
    longitude: 5.3722813,
  },
  {
    key: 'marseille_2',
    group: 'marseille',
    label: 'Marseille',
    labelArrondissement: 'Marseille 2e Arrondissement',
    arrondissement: '2e',
    zip: '13002',
    latitude: 43.3152813,
    longitude: 5.3359582,
  },
  {
    key: 'marseille_3',
    group: 'marseille',
    label: 'Marseille',
    labelArrondissement: 'Marseille 3e Arrondissement',
    arrondissement: '3e',
    zip: '13003',
    latitude: 43.3113453,
    longitude: 5.3704256,
  },
  {
    key: 'marseille_4',
    group: 'marseille',
    label: 'Marseille',
    labelArrondissement: 'Marseille 4e Arrondissement',
    arrondissement: '4e',
    zip: '13004',
    latitude: 43.3062255,
    longitude: 5.3898182,
  },
  {
    key: 'marseille_5',
    group: 'marseille',
    label: 'Marseille',
    labelArrondissement: 'Marseille 5e Arrondissement',
    arrondissement: '5e',
    zip: '13005',
    latitude: 43.2924995,
    longitude: 5.3904456,
  },
  {
    key: 'marseille_6',
    group: 'marseille',
    label: 'Marseille',
    labelArrondissement: 'Marseille 6e Arrondissement',
    arrondissement: '6e',
    zip: '13006',
    latitude: 43.2876169,
    longitude: 5.3710505,
  },
  {
    key: 'marseille_7',
    group: 'marseille',
    label: 'Marseille',
    labelArrondissement: 'Marseille 7e Arrondissement',
    arrondissement: '7e',
    zip: '13007',
    latitude: 43.277901,
    longitude: 5.2887739,
  },
  {
    key: 'marseille_8',
    group: 'marseille',
    label: 'Marseille',
    labelArrondissement: 'Marseille 8e Arrondissement',
    arrondissement: '8e',
    zip: '13008',
    latitude: 43.2452228,
    longitude: 5.3274454,
  },
  {
    key: 'marseille_9',
    group: 'marseille',
    label: 'Marseille',
    labelArrondissement: 'Marseille 9e Arrondissement',
    arrondissement: '9e',
    zip: '13009',
    latitude: 43.2367016,
    longitude: 5.4110793,
  },
  {
    key: 'marseille_10',
    group: 'marseille',
    label: 'Marseille',
    labelArrondissement: 'Marseille 10e Arrondissement',
    arrondissement: '10e',
    zip: '13010',
    latitude: 43.2743051,
    longitude: 5.4041433,
  },
  {
    key: 'marseille_11',
    group: 'marseille',
    label: 'Marseille',
    labelArrondissement: 'Marseille 11e Arrondissement',
    arrondissement: '11e',
    zip: '13011',
    latitude: 43.2877727,
    longitude: 5.4374098,
  },
  {
    key: 'marseille_12',
    group: 'marseille',
    label: 'Marseille',
    labelArrondissement: 'Marseille 12e Arrondissement',
    arrondissement: '12e',
    zip: '13012',
    latitude: 43.306997,
    longitude: 5.3638828,
  },
  {
    key: 'marseille_13',
    group: 'marseille',
    label: 'Marseille',
    labelArrondissement: 'Marseille 13e Arrondissement',
    arrondissement: '13e',
    zip: '13013',
    latitude: 43.3529939,
    longitude: 5.3863895,
  },
  {
    key: 'marseille_14',
    group: 'marseille',
    label: 'Marseille',
    labelArrondissement: 'Marseille 14e Arrondissement',
    arrondissement: '14e',
    zip: '13014',
    latitude: 43.3470687,
    longitude: 5.3708416,
  },
  {
    key: 'marseille_15',
    group: 'marseille',
    label: 'Marseille',
    labelArrondissement: 'Marseille 15e Arrondissement',
    arrondissement: '15e',
    zip: '13015',
    latitude: 43.3531262,
    longitude: 5.3236784,
  },
  {
    key: 'marseille_16',
    group: 'marseille',
    label: 'Marseille',
    labelArrondissement: 'Marseille 16e Arrondissement',
    arrondissement: '16e',
    zip: '13016',
    latitude: 43.3628326,
    longitude: 5.2954437,
  },

  {
    key: 'lyon_1',
    group: 'lyon',
    label: 'Lyon',
    labelArrondissement: 'Lyon 1er Arrondissement',
    arrondissement: '1er',
    zip: '69001',
    latitude: 45.7696535,
    longitude: 4.8161371,
  },
  {
    key: 'lyon_2',
    group: 'lyon',
    label: 'Lyon',
    labelArrondissement: 'Lyon 2e Arrondissement',
    arrondissement: '2e',
    zip: '69002',
    latitude: 45.7463741,
    longitude: 4.8058098,
  },
  {
    key: 'lyon_3',
    group: 'lyon',
    label: 'Lyon',
    labelArrondissement: 'Lyon 3e Arrondissement',
    arrondissement: '3e',
    zip: '69003',
    latitude: 45.7513804,
    longitude: 4.8477762,
  },
  {
    key: 'lyon_4',
    group: 'lyon',
    label: 'Lyon',
    labelArrondissement: 'Lyon 4e Arrondissement',
    arrondissement: '4e',
    zip: '69004',
    latitude: 45.7804333,
    longitude: 4.8157449,
  },
  {
    key: 'lyon_5',
    group: 'lyon',
    label: 'Lyon',
    labelArrondissement: 'Lyon 5e Arrondissement',
    arrondissement: '5e',
    zip: '69005',
    latitude: 45.7561083,
    longitude: 4.7805348,
  },
  {
    key: 'lyon_6',
    group: 'lyon',
    label: 'Lyon',
    labelArrondissement: 'Lyon 6e Arrondissement',
    arrondissement: '6e',
    zip: '69006',
    latitude: 45.7753476,
    longitude: 4.8444095,
  },
  {
    key: 'lyon_7',
    group: 'lyon',
    label: 'Lyon',
    labelArrondissement: 'Lyon 7e Arrondissement',
    arrondissement: '7e',
    zip: '69007',
    latitude: 45.7320594,
    longitude: 4.8187094,
  },
  {
    key: 'lyon_8',
    group: 'lyon',
    label: 'Lyon',
    labelArrondissement: 'Lyon 8e Arrondissement',
    arrondissement: '8e',
    zip: '69008',
    latitude: 45.7340972,
    longitude: 4.8492521,
  },
  {
    key: 'lyon_9',
    group: 'lyon',
    label: 'Lyon',
    labelArrondissement: 'Lyon 9e Arrondissement',
    arrondissement: '9e',
    zip: '69009',
    latitude: 45.7834716,
    longitude: 4.7920233,
  },

  {
    key: 'paris_1',
    group: 'paris',
    label: 'Paris',
    labelArrondissement: 'Paris 1er Arrondissement',
    arrondissement: '1er',
    zip: '75001',
    latitude: 48.8619641,
    longitude: 2.3256215,
  },
  {
    key: 'paris_2',
    group: 'paris',
    label: 'Paris',
    labelArrondissement: 'Paris 2e Arrondissement',
    arrondissement: '2e',
    zip: '75002',
    latitude: 48.8677328,
    longitude: 2.3308086,
  },
  {
    key: 'paris_3',
    group: 'paris',
    label: 'Paris',
    labelArrondissement: 'Paris 3e Arrondissement',
    arrondissement: '3e',
    zip: '75003',
    latitude: 48.8625546,
    longitude: 2.3541801,
  },
  {
    key: 'paris_4',
    group: 'paris',
    label: 'Paris',
    labelArrondissement: 'Paris 4e Arrondissement',
    arrondissement: '4e',
    zip: '75004',
    latitude: 48.8540568,
    longitude: 2.3465862,
  },
  {
    key: 'paris_5',
    group: 'paris',
    label: 'Paris',
    labelArrondissement: 'Paris 5e Arrondissement',
    arrondissement: '5e',
    zip: '75005',
    latitude: 48.8453863,
    longitude: 2.3409224,
  },
  {
    key: 'paris_6',
    group: 'paris',
    label: 'Paris',
    labelArrondissement: 'Paris 6e Arrondissement',
    arrondissement: '6e',
    zip: '75006',
    latitude: 48.8495167,
    longitude: 2.3203636,
  },
  {
    key: 'paris_7',
    group: 'paris',
    label: 'Paris',
    labelArrondissement: 'Paris 7e Arrondissement',
    arrondissement: '7e',
    zip: '75007',
    latitude: 48.8548166,
    longitude: 2.233718,
  },
  {
    key: 'paris_8',
    group: 'paris',
    label: 'Paris',
    labelArrondissement: 'Paris 8e Arrondissement',
    arrondissement: '8e',
    zip: '75008',
    latitude: 48.8732244,
    longitude: 2.3007962,
  },
  {
    key: 'paris_9',
    group: 'paris',
    label: 'Paris',
    labelArrondissement: 'Paris 9e Arrondissement',
    arrondissement: '9e',
    zip: '75009',
    latitude: 48.8770383,
    longitude: 2.3275051,
  },
  {
    key: 'paris_10',
    group: 'paris',
    label: 'Paris',
    labelArrondissement: 'Paris 10e Arrondissement',
    arrondissement: '10e',
    zip: '75010',
    latitude: 48.8759474,
    longitude: 2.3520474,
  },
  {
    key: 'paris_11',
    group: 'paris',
    label: 'Paris',
    labelArrondissement: 'Paris 11e Arrondissement',
    arrondissement: '11e',
    zip: '75011',
    latitude: 48.8600697,
    longitude: 2.371225,
  },
  {
    key: 'paris_12',
    group: 'paris',
    label: 'Paris',
    labelArrondissement: 'Paris 12e Arrondissement',
    arrondissement: '12e',
    zip: '75012',
    latitude: 48.8351099,
    longitude: 2.3758919,
  },
  {
    key: 'paris_13',
    group: 'paris',
    label: 'Paris',
    labelArrondissement: 'Paris 13e Arrondissement',
    arrondissement: '13e',
    zip: '75013',
    latitude: 48.8304034,
    longitude: 2.3450533,
  },
  {
    key: 'paris_14',
    group: 'paris',
    label: 'Paris',
    labelArrondissement: 'Paris 14e Arrondissement',
    arrondissement: '14e',
    zip: '75014',
    latitude: 48.8295766,
    longitude: 2.3022868,
  },
  {
    key: 'paris_15',
    group: 'paris',
    label: 'Paris',
    labelArrondissement: 'Paris 15e Arrondissement',
    arrondissement: '15e',
    zip: '75015',
    latitude: 48.841715,
    longitude: 2.2731896,
  },
  {
    key: 'paris_16',
    group: 'paris',
    label: 'Paris',
    labelArrondissement: 'Paris 16e Arrondissement',
    arrondissement: '16e',
    zip: '75016,75116',
    latitude: 48.8557088,
    longitude: 2.2371484,
  },
  {
    key: 'paris_17',
    group: 'paris',
    label: 'Paris',
    labelArrondissement: 'Paris 17e Arrondissement',
    arrondissement: '17e',
    zip: '75017',
    latitude: 48.8873703,
    longitude: 2.2840809,
  },
  {
    key: 'paris_18',
    group: 'paris',
    label: 'Paris',
    labelArrondissement: 'Paris 18e Arrondissement',
    arrondissement: '18e',
    zip: '75018',
    latitude: 48.8919574,
    longitude: 2.328056,
  },
  {
    key: 'paris_19',
    group: 'paris',
    label: 'Paris',
    labelArrondissement: 'Paris 19e Arrondissement',
    arrondissement: '19e',
    zip: '75019',
    latitude: 48.8871193,
    longitude: 2.3671247,
  },
  {
    key: 'paris_20',
    group: 'paris',
    label: 'Paris',
    labelArrondissement: 'Paris 20e Arrondissement',
    arrondissement: '20e',
    zip: '75020',
    latitude: 48.8624993,
    longitude: 2.3760379,
  },
]
