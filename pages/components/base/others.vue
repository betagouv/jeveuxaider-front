<template>
  <div class="space-y-12">
    <div class="flex flex-col space-y-4">
      <div class="text-lg leading-6 font-medium text-gray-900">
        Badges
      </div>
      <div class="flex flex-wrap gap-2 items-end">
        <Badge color="gray">
          Default
        </Badge>
        <Badge color="gray-light">
          Default light
        </Badge>
        <Badge color="orange">
          En attente de validation
        </Badge>
        <Badge color="green">
          Validée
        </Badge>
        <Badge color="red">
          Signalée
        </Badge>
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg leading-6 font-medium text-gray-900">
        Par domaine d'action
      </div>
      <div class="flex flex-wrap gap-2 items-end">
        <Badge color="covid">
          Covid
        </Badge>
        <Badge color="education">
          Éducation
        </Badge>
        <Badge color="sante">
          Santé
        </Badge>
        <Badge color="nature">
          Nature
        </Badge>
        <Badge color="solidarite">
          Solidarité
        </Badge>
        <Badge color="sport">
          Sport
        </Badge>
        <Badge color="prevention">
          Prévention
        </Badge>
        <Badge color="memoire">
          Mémoire
        </Badge>
        <Badge color="cooperation">
          Coopération
        </Badge>
        <Badge color="culture">
          Culture
        </Badge>
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg leading-6 font-medium text-gray-900">
        Links
      </div>
      <div class="flex flex-col gap-2">
        <Link to="/components">
          Link to components ›
        </Link>
        <Link to="/components" icon="ArrowRightIcon">
          Link with icon
        </Link>
        <Link @click.native="onClick">
          Link with click
        </Link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'components',
  data () {
    return {
      form: {}
    }
  },
  methods: {
    onClick () {
      alert('CLICK')
    }
  }
}
</script>
