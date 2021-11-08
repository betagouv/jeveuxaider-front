<template>
  <div class="space-y-12">
    <div class="flex flex-col space-y-4">
      <div class="text-lg leading-6 font-medium text-gray-900">
        Primary buttons
      </div>
      <div class="flex flex-wrap -m-2 items-end">
        <Button size="xs" class="m-2">
          Button text
        </Button>
        <Button size="sm" class="m-2">
          Button text
        </Button>
        <Button size="md" class="m-2">
          Button text
        </Button>
        <Button size="lg" class="m-2">
          Button text
        </Button>
        <Button size="xl" class="m-2">
          Button text
        </Button>
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg leading-6 font-medium text-gray-900">
        Primary green buttons
      </div>
      <div class="flex flex-wrap -m-2 items-end">
        <Button variant="primary-green" size="xs" class="m-2">
          Button text
        </Button>
        <Button variant="primary-green" size="sm" class="m-2">
          Button text
        </Button>
        <Button variant="primary-green" size="md" class="m-2">
          Button text
        </Button>
        <Button variant="primary-green" size="lg" class="m-2">
          Button text
        </Button>
        <Button variant="primary-green" size="xl" class="m-2">
          Button text
        </Button>
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg leading-6 font-medium text-gray-900">
        Secondary buttons
      </div>
      <div class="flex flex-wrap -m-2 items-end">
        <Button variant="secondary" size="xs" class="m-2">
          Primary
        </Button>
        <Button variant="secondary" size="sm" class="m-2">
          Primary
        </Button>
        <Button variant="secondary" size="md" class="m-2">
          Primary
        </Button>
        <Button variant="secondary" size="lg" class="m-2">
          Primary
        </Button>
        <Button variant="secondary" size="xl" class="m-2">
          Primary
        </Button>
      </div>
    </div>

    <div class="flex flex-col space-y-4">
      <div class="text-lg leading-6 font-medium text-gray-900">
        Red buttons
      </div>
      <div class="flex flex-wrap -m-2 items-end">
        <Button variant="red" size="xs" class="m-2">
          Primary
        </Button>
        <Button variant="red" size="sm" class="m-2">
          Primary
        </Button>
        <Button variant="red" size="md" class="m-2">
          Primary
        </Button>
        <Button variant="red" size="lg" class="m-2">
          Primary
        </Button>
        <Button variant="red" size="xl" class="m-2">
          Primary
        </Button>
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg leading-6 font-medium text-gray-900">
        White buttons
      </div>
      <div class="flex flex-wrap -m-2 items-end">
        <Button variant="white" size="xs" class="m-2">
          Primary
        </Button>
        <Button variant="white" size="sm" class="m-2">
          Primary
        </Button>
        <Button variant="white" size="md" class="m-2">
          Primary
        </Button>
        <Button variant="white" size="lg" class="m-2">
          Primary
        </Button>
        <Button variant="white" size="xl" class="m-2">
          Primary
        </Button>
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg leading-6 font-medium text-gray-900">
        Rounded buttons
      </div>
      <div class="flex flex-wrap -m-2 items-end">
        <Button variant="primary" class="m-2" rounded>
          Button text
        </Button>
        <Button variant="primary-green" class="m-2" rounded>
          Button text
        </Button>
        <Button variant="secondary" class="m-2" rounded>
          Button text
        </Button>
        <Button variant="white" class="m-2" rounded>
          Button text
        </Button>
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg leading-6 font-medium text-gray-900">
        Badges
      </div>
      <div class="flex flex-wrap -m-2 items-end">
        <Badge color="gray" class="m-2">
          Brouillon
        </Badge>
        <Badge color="orange" class="m-2">
          En attente de validation
        </Badge>
        <Badge color="green" class="m-2">
          Validée
        </Badge>
        <Badge color="red" class="m-2">
          Signalée
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
