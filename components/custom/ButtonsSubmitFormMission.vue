<template>
  <div class="flex-col gap-2 flex-shrink-0 items-center justify-center">
    <template v-if="mission">
      <template v-if="templateId">
        <DsfrButton
          v-if="
            ['Brouillon', 'En attente de validation'].includes(mission.state) &&
            structure.state === 'Validée'
          "
          :loading="loading"
          @click.native="handleSubmit({ state: 'Validée' })"
        >
          Enregistrer et publier
        </DsfrButton>
        <DsfrButton v-else :loading="loading" @click.native="handleSubmit()">
          Enregistrer
        </DsfrButton>
      </template>
      <template v-else>
        <DsfrButton
          v-if="['Brouillon'].includes(mission.state)"
          :loading="loading"
          @click.native="handleSubmit({ state: 'En attente de validation' })"
        >
          Soumettre à validation
        </DsfrButton>
        <DsfrButton v-else :loading="loading" @click.native="handleSubmit()">
          Enregistrer
        </DsfrButton>
      </template>
      <BaseLink
        v-if="['Brouillon', 'En attente de validation'].includes(mission.state)"
        class="text-sm font-medium"
        @click.native="handleSubmit({ state: 'Brouillon' })"
      >
        Enregistrer en brouillon
      </BaseLink>
    </template>
    <template v-else>
      <DsfrButton
        v-if="templateId && structure.state === 'Validée'"
        :loading="loading"
        @click.native="handleSubmit({ state: 'Validée' })"
      >
        Enregistrer et publier
      </DsfrButton>
      <DsfrButton
        v-else
        :loading="loading"
        @click.native="handleSubmit({ state: 'En attente de validation' })"
      >
        Soumettre à validation
      </DsfrButton>
      <BaseLink class="text-sm font-medium" @click.native="handleSubmit({ state: 'Brouillon' })">
        Enregistrer en brouillon
      </BaseLink>
    </template>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    mission: {
      type: Object,
      default: null,
    },
    structure: {
      type: Object,
      required: true,
    },
    templateId: {
      type: Number,
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
