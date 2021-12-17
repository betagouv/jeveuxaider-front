<template>
  <div>
    <div class="flex items-center space-x-2 mt-2">
      <div class="h-3 w-3 rounded-full bg-jva-green-500" />
      <div class="underline text-sm">
        En ligne
      </div>
      <ExternalLinkIcon class="h-4 w-4" />
    </div>
    <div class="mt-4 space-x-2">
      <Button variant="white" size="sm" icon="PencilIcon">
        Modifier
      </Button>
      <Button variant="white" size="sm" icon="DuplicateIcon">
        Dupliquer
      </Button>
    </div>
    <div class="border-t -mx-6 my-6" />
    <div class="mb-8">
      <div class="text-sm flex justify-between px-2 mb-2 items-center">
        <div class="uppercase font-semibold text-gray-600">
          Places
        </div>
        <Link to="/admin/participations" icon="ChevronRightIcon">
          Participations
        </Link>
      </div>
      <Box variant="flat" padding="xs">
        <div class="flex items-center">
          <div class="text-4xl font-semibold pr-4">
            13
          </div>
          <div>
            <div class="font-semibold">
              places restantes
            </div>
            <div class="text-gray-500 -mt-1">
              7 sur 20
            </div>
          </div>
        </div>
        <div class="border-t -mx-6 mt-6 mb-4" />
        <div class="flex justify-center text-sm">
          <Link>
            Trouver des bénévoles
          </Link>
        </div>
      </Box>
    </div>
    <div class="mb-8">
      <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">
        Mission
      </div>
      <Box variant="flat" padding="xs">
        <DescriptionList>
          <DescriptionListItem term="Crée le" description="12 août 2020 à 16:15" />
          <DescriptionListItem term="Modifié le" description="29 juillet 2021 à 13:30" />
          <DescriptionListItem term="Type" description="Mission en présentiel" />
          <DescriptionListItem term="Domaine" description="Solidarité et insertion" />
          <DescriptionListItem term="Publics bénéf." description="Tous publics" />
          <DescriptionListItem term="Adresse" description="Grenoble 38000" />
          <DescriptionListItem term="Département" description="28 - Eure-et-Loir" />
        </DescriptionList>
      </Box>
    </div>
    <div class="mb-8">
      <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">
        Responsable
      </div>
      <Box variant="flat" padding="xs">
        <DescriptionList>
          <DescriptionListItem term="Nom" description="Blanche Caroit" />
          <DescriptionListItem term="E-mail" description="blanche@makesense.org" />
          <DescriptionListItem term="Mobile" description="06 21 23 98 15" />
        </DescriptionList>
      </Box>
    </div>
    <div class="flex justify-center mb-10">
      <Link class="uppercase font-semibold text-sm">
        Consulter l'historique
      </Link>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    missionId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      mission: {}
    }
  },
  async fetch () {
    if (!this.missionId) {
      return null
    }
    const { data } = await this.$axios.get(`/mission/${this.missionId}`)
    this.mission = data
    this.$emit('loaded', data)
  },
  watch: {
    missionId: '$fetch'
  }
}
</script>
