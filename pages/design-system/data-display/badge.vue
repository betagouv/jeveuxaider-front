<template>
  <div class="space-y-12">
    <div class="flex flex-col space-y-4">
      <div class="text-lg font-medium text-gray-900">
        Default
      </div>
      <div class="flex flex-wrap gap-2 items-end">
        <Badge color="gray">
          Gray (default)
        </Badge>
        <Badge color="gray-light">
          Gray light
        </Badge>
        <Badge color="blue">
          Blue
        </Badge>
        <Badge color="orange">
          Orange
        </Badge>
        <Badge color="green">
          Green
        </Badge>
        <Badge color="red">
          Red
        </Badge>
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg font-medium text-gray-900">
        Plain
      </div>
      <div class="flex flex-wrap gap-2 items-end">
        <Badge color="gray" plain>
          Gray (default)
        </Badge>
        <Badge color="gray-light" plain>
          Gray light
        </Badge>
        <Badge color="blue" plain>
          Blue
        </Badge>
        <Badge color="orange" plain>
          Orange
        </Badge>
        <Badge color="green" plain>
          Green
        </Badge>
        <Badge color="red" plain>
          Red
        </Badge>
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg font-medium text-gray-900">
        Domaines d'action
      </div>
      <div class="flex flex-wrap gap-2 items-end">
        <Badge color="covid">
          COVID
        </Badge>
        <Badge color="education">
          ÉDUCATION
        </Badge>
        <Badge color="sante">
          SANTÉ POUR TOUS
        </Badge>
        <Badge color="nature">
          PROTECTION DE LA NATURE
        </Badge>
        <Badge color="solidarite">
          SOLIDARITÉ & INSERTION
        </Badge>
        <Badge color="sport">
          SPORT POUR TOUS
        </Badge>
        <Badge color="prevention">
          PRÉVENTION ET PROTECTION
        </Badge>
        <Badge color="memoire">
          MÉMOIRE & CITOYENNETÉ
        </Badge>
        <Badge color="cooperation">
          COOPÉRATION INTERNALE
        </Badge>
        <Badge color="culture">
          ART & CULTURE POUR TOUS
        </Badge>
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg font-medium text-gray-900">
        Statut
      </div>
      <div class="flex flex-wrap gap-2 items-end">
        <Badge v-for="statut in $labels.mission_workflow_states" :key="statut.key" :color="statut.key" plain>
          {{ statut.label }}
        </Badge>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'design-system',
  data () {
    return {
    }
  }

}
</script>
