export const autonomyCitiesHelper = async () => {
  const formatAutonomyCities = (autonomyCities: any[]) => {
    if (autonomyCities?.length) {
      const groupedByCity = autonomyCities.reduce((accumulator, current) => {
        const { city, zip, arrondissement } = current

        // city.includes('Arrondissement') is legacy
        const isArrondissement = city.includes('Arrondissement') || arrondissement
        const arrondissementLabel =
          (isArrondissement && (arrondissement ?? city.split(' ')[1])) ?? city

        let formattedCity = city
        if (isArrondissement) {
          const match = city.match(/^([^\d]+)/)
          if (match) {
            formattedCity = match[1].trim()
          }
        }

        const existingCity = accumulator.find((item: any) => item.city === formattedCity)

        if (existingCity) {
          if (!existingCity.zips.includes(zip)) {
            existingCity.zips.push(zip)
          }
          if (isArrondissement && !existingCity.arrondissements.includes(arrondissementLabel)) {
            existingCity.arrondissements.push(arrondissementLabel)
          }
        } else {
          accumulator.push({
            city: formattedCity,
            zips: [zip],
            arrondissements: isArrondissement ? [arrondissementLabel] : [],
          })
        }

        return accumulator
      }, [])

      const formattedString = groupedByCity
        .map((group: any) => {
          const sortedZips = group.zips.sort((a: string, b: string) =>
            a.localeCompare(b, 'fr', { numeric: true })
          )
          const sortedArrondissements = group.arrondissements.sort((a: string, b: string) =>
            a.localeCompare(b, 'fr', { numeric: true })
          )

          if (group.arrondissements.length > 0) {
            let isAllArrondissements = false
            switch (group.city) {
              case 'Paris':
                isAllArrondissements = sortedArrondissements.length === 20
                break
              case 'Marseille':
                isAllArrondissements = sortedArrondissements.length === 16
                break
              case 'Lyon':
                isAllArrondissements = sortedArrondissements.length === 9
                break
              default:
                break
            }

            return isAllArrondissements
              ? group.city
              : `${group.city} (${sortedArrondissements.join(', ')})`
          } else {
            return `${group.city} (${sortedZips.join(', ')})`
          }
        })
        .sort((a: string, b: string) => a.localeCompare(b, 'fr', { numeric: true }))
        .join(', ')

      return formattedString
    }
    return null
  }

  return {
    formatAutonomyCities,
  }
}
