<template>
  <div class="space-y-12">
    <div class="flex flex-col space-y-4">
      <div class="text-lg leading-6 font-medium text-gray-900">
        Primary buttons
      </div>
      <div class="flex flex-wrap -m-2 items-end">
        <BaseButton size="xs" class="m-2">
          Primary
        </BaseButton>
        <BaseButton size="sm" class="m-2">
          Primary
        </BaseButton>
        <BaseButton size="md" class="m-2">
          Primary
        </BaseButton>
        <BaseButton size="lg" class="m-2">
          Primary
        </BaseButton>
        <BaseButton size="xl" class="m-2">
          Primary
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
        Gray buttons
      </div>
      <div class="flex flex-wrap -m-2 items-end">
        <BaseButton variant="gray" size="xs" class="m-2">
          Primary
        </BaseButton>
        <BaseButton variant="gray" size="sm" class="m-2">
          Primary
        </BaseButton>
        <BaseButton variant="gray" size="md" class="m-2">
          Primary
        </BaseButton>
        <BaseButton variant="gray" size="lg" class="m-2">
          Primary
        </BaseButton>
        <BaseButton variant="gray" size="xl" class="m-2">
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
