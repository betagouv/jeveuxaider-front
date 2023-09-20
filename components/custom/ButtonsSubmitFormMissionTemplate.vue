<template>
  <div class="flex-col gap-2 flex-shrink-0 items-center justify-center">
    <template v-if="missionTemplate">
      <BaseButton
        v-if="['draft'].includes(missionTemplate.state)"
        size="xl"
        variant="green"
        :loading="loading"
        @click.native="handleSubmit({ state: 'waiting' })"
      >
        Soumettre à validation
      </BaseButton>
      <BaseButton
        v-else
        size="xl"
        variant="green"
        :loading="loading"
        @click.native="handleSubmit()"
      >
        Enregistrer
      </BaseButton>
      <BaseLink
        v-if="['draft', 'waiting'].includes(missionTemplate.state)"
        class="text-sm font-medium"
        @click.native="handleSubmit({ state: 'draft' })"
      >
        Enregistrer en brouillon
      </BaseLink>
    </template>
    <template v-else>
      <BaseButton
        v-if="$stores.auth.contextRole === 'admin'"
        size="xl"
        variant="green"
        :loading="loading"
        @click.native="handleSubmit({ state: 'waiting' })"
      >
        Enregistrer
      </BaseButton>
      <BaseButton
        v-else
        size="xl"
        variant="green"
        :loading="loading"
        @click.native="handleSubmit({ state: 'waiting' })"
      >
        Soumettre à validation
      </BaseButton>
      <BaseLink class="text-sm font-medium" @click.native="handleSubmit({ state: 'draft' })">
        Enregistrer en brouillon
      </BaseLink>
    </template>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    missionTemplate: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleSubmit(payload) {
      this.$emit('submitted', payload)
    },
  },
})
</script>
