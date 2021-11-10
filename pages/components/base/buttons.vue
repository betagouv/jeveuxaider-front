<template>
  <div class="space-y-12">
    <div class="flex flex-col space-y-4">
      <div class="text-lg leading-6 font-medium text-gray-900">
        Primary buttons
      </div>
      <div class="flex flex-wrap gap-2 items-end">
        <Button size="xs">
          Button text
        </Button>
        <Button size="sm">
          Button text
        </Button>
        <Button size="md">
          Button text
        </Button>
        <Button size="lg">
          Button text
        </Button>
        <Button size="xl">
          Button text
        </Button>
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg leading-6 font-medium text-gray-900">
        Icons buttons
      </div>
      <div class="flex flex-wrap gap-2 items-end">
        <Button size="xs" loading>
          Button text
        </Button>
        <Button size="sm" loading>
          Button text
        </Button>
        <Button size="md" icon="SearchIcon">
          Button text
        </Button>
        <Button size="lg" icon="SearchIcon">
          Button text
        </Button>
        <Button size="xl" icon="SearchIcon">
          Button text
        </Button>
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg leading-6 font-medium text-gray-900">
        Green buttons
      </div>
      <div class="flex flex-wrap gap-2 items-end">
        <Button variant="green" size="xs">
          Button text
        </Button>
        <Button variant="green" size="sm">
          Button text
        </Button>
        <Button variant="green" size="md">
          Button text
        </Button>
        <Button variant="green" size="lg">
          Button text
        </Button>
        <Button variant="green" size="xl">
          Button text
        </Button>
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg leading-6 font-medium text-gray-900">
        Secondary buttons
      </div>
      <div class="flex flex-wrap gap-2 items-end">
        <Button variant="secondary" size="xs">
          Button text
        </Button>
        <Button variant="secondary" size="sm">
          Button text
        </Button>
        <Button variant="secondary" size="md">
          Button text
        </Button>
        <Button variant="secondary" size="lg">
          Button text
        </Button>
        <Button variant="secondary" size="xl">
          Button text
        </Button>
      </div>
    </div>

    <div class="flex flex-col space-y-4">
      <div class="text-lg leading-6 font-medium text-gray-900">
        Red buttons
      </div>
      <div class="flex flex-wrap gap-2 items-end">
        <Button variant="red" size="xs">
          Button text
        </Button>
        <Button variant="red" size="sm">
          Button text
        </Button>
        <Button variant="red" size="md">
          Button text
        </Button>
        <Button variant="red" size="lg">
          Button text
        </Button>
        <Button variant="red" size="xl">
          Button text
        </Button>
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg leading-6 font-medium text-gray-900">
        White buttons
      </div>
      <div class="flex flex-wrap gap-2 items-end">
        <Button variant="white" size="xs">
          Button text
        </Button>
        <Button variant="white" size="sm">
          Button text
        </Button>
        <Button variant="white" size="md">
          Button text
        </Button>
        <Button variant="white" size="lg">
          Button text
        </Button>
        <Button variant="white" size="xl">
          Button text
        </Button>
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg leading-6 font-medium text-gray-900">
        Rounded buttons
      </div>
      <div class="flex flex-wrap gap-2 items-end">
        <Button variant="primary" rounded>
          Button text
        </Button>
        <Button variant="green" rounded>
          Button text
        </Button>
        <Button variant="secondary" rounded>
          Button text
        </Button>
        <Button variant="white" rounded>
          Button text
        </Button>
      </div>
    </div>
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
  </div>
</template>

<script>
export default {
  layout: 'components',
  data () {
    return {
      form: {}
    }
  }
}
</script>
