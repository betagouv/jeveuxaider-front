export default defineNuxtPlugin(() => {
  const utils = {
    haversineDistanceBetweenPoints: (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371e3
      const p1 = (lat1 * Math.PI) / 180
      const p2 = (lat2 * Math.PI) / 180
      const deltaLon = lon2 - lon1
      const deltaLambda = (deltaLon * Math.PI) / 180
      const d =
        Math.acos(
          Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(deltaLambda)
        ) * R
      // console.log('haversine distance', d)
      return d
    },
    pythagoreanDistanceBetweenPoints: (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371e3
      const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2)
      const y = lat2 - lat1
      const d = Math.sqrt(x * x + y * y) * R
      // console.log('pythagorean distance', d)
      return d
    },
    isFirstLetterVowel: (str: string) => {
      const firstLetter = str.charAt(0).toLowerCase()
      const vowels = [
        'a',
        'e',
        'i',
        'o',
        'u',
        'á',
        'é',
        'í',
        'ó',
        'ú',
        'à',
        'è',
        'ì',
        'ò',
        'ù',
        'â',
        'ê',
        'î',
        'ô',
        'û',
        'ä',
        'ë',
        'ï',
        'ö',
        'ü',
      ]
      return vowels.includes(firstLetter)
    },
  }

  return {
    provide: {
      utils,
    },
  }
})
