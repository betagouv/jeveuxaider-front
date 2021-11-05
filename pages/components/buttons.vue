<template>
  <div class="space-y-12">
    <div class="flex flex-col space-y-4">
      <div class="text-lg leading-6 font-medium text-gray-900">
        Primary buttons
      </div>
      <div class="flex flex-wrap -m-2 items-end">
        <BaseButton size="xs" class="m-2">
          Button text
        </BaseButton>
        <BaseButton size="sm" class="m-2">
          Button text
        </BaseButton>
        <BaseButton size="md" class="m-2">
          Button text
        </BaseButton>
        <BaseButton size="lg" class="m-2">
          Button text
        </BaseButton>
        <BaseButton size="xl" class="m-2">
          Button text
        </BaseButton>
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg leading-6 font-medium text-gray-900">
        Primary green buttons
      </div>
      <div class="flex flex-wrap -m-2 items-end">
        <BaseButton variant="primary-green" size="xs" class="m-2">
          Button text
        </BaseButton>
        <BaseButton variant="primary-green" size="sm" class="m-2">
          Button text
        </BaseButton>
        <BaseButton variant="primary-green" size="md" class="m-2">
          Button text
        </BaseButton>
        <BaseButton variant="primary-green" size="lg" class="m-2">
          Button text
        </BaseButton>
        <BaseButton variant="primary-green" size="xl" class="m-2">
          Button text
        </BaseButton>
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg leading-6 font-medium text-gray-900">
        Secondary buttons
      </div>
      <div class="flex flex-wrap -m-2 items-end">
        <BaseButton variant="secondary" size="xs" class="m-2">
          Primary
        </BaseButton>
        <BaseButton variant="secondary" size="sm" class="m-2">
          Primary
        </BaseButton>
        <BaseButton variant="secondary" size="md" class="m-2">
          Primary
        </BaseButton>
        <BaseButton variant="secondary" size="lg" class="m-2">
          Primary
        </BaseButton>
        <BaseButton variant="secondary" size="xl" class="m-2">
          Primary
        </BaseButton>
      </div>
    </div>

    <div class="flex flex-col space-y-4">
      <div class="text-lg leading-6 font-medium text-gray-900">
        Red buttons
      </div>
      <div class="flex flex-wrap -m-2 items-end">
        <BaseButton variant="red" size="xs" class="m-2">
          Primary
        </BaseButton>
        <BaseButton variant="red" size="sm" class="m-2">
          Primary
        </BaseButton>
        <BaseButton variant="red" size="md" class="m-2">
          Primary
        </BaseButton>
        <BaseButton variant="red" size="lg" class="m-2">
          Primary
        </BaseButton>
        <BaseButton variant="red" size="xl" class="m-2">
          Primary
        </BaseButton>
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg leading-6 font-medium text-gray-900">
        White buttons
      </div>
      <div class="flex flex-wrap -m-2 items-end">
        <BaseButton variant="white" size="xs" class="m-2">
          Primary
        </BaseButton>
        <BaseButton variant="white" size="sm" class="m-2">
          Primary
        </BaseButton>
        <BaseButton variant="white" size="md" class="m-2">
          Primary
        </BaseButton>
        <BaseButton variant="white" size="lg" class="m-2">
          Primary
        </BaseButton>
        <BaseButton variant="white" size="xl" class="m-2">
          Primary
        </BaseButton>
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg leading-6 font-medium text-gray-900">
        Rounded buttons
      </div>
      <div class="flex flex-wrap -m-2 items-end">
        <BaseButton variant="primary" class="m-2" rounded>
          Button text
        </BaseButton>
        <BaseButton variant="primary-green" class="m-2" rounded>
          Button text
        </BaseButton>
        <BaseButton variant="secondary" class="m-2" rounded>
          Button text
        </BaseButton>
        <BaseButton variant="white" class="m-2" rounded>
          Button text
        </BaseButton>
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg leading-6 font-medium text-gray-900">
        Badges
      </div>
      <div class="flex flex-wrap -m-2 items-end">
        <BaseBadge color="gray" class="m-2">
          Brouillon
        </BaseBadge>
        <BaseBadge color="orange" class="m-2">
          En attente de validation
        </BaseBadge>
        <BaseBadge color="green" class="m-2">
          Validée
        </BaseBadge>
        <BaseBadge color="red" class="m-2">
          Signalée
        </BaseBadge>
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
