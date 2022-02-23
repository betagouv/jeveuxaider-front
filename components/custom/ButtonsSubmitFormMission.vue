<template>
  <div class="flex-col gap-2 flex-shrink-0 items-center justify-center">
    <template v-if="mission">
      <template v-if="templateId">
        <Button v-if="['Brouillon', 'En attente de validation'].includes(mission.state) && structure.state === 'Validée'" size="xl" variant="green" @click.native="handleSubmit({state: 'Validée'})">
          Enregistrer et publier
        </Button>
        <Button v-else size="xl" variant="green" @click.native="handleSubmit()">
          Enregistrer
        </Button>
      </template>
      <template v-else>
        <Button v-if="['Brouillon'].includes(mission.state)" size="xl" variant="green" @click.native="handleSubmit({state: 'En attente de validation'})">
          Soumettre à validation
        </Button>
        <Button v-else size="xl" variant="green" @click.native="handleSubmit()">
          Enregistrer
        </Button>
      </template>
      <Link v-if="['Brouillon', 'En attente de validation'].includes(mission.state)" class="text-sm font-medium" @click.native="handleSubmit({state: 'Brouillon'})">
        Enregistrer en brouillon
      </Link>
    </template>
    <template v-else>
      <Button v-if="templateId && structure.state === 'Validée'" size="xl" variant="green" @click.native="handleSubmit({state: 'Validée'})">
        Enregistrer et publier
      </Button>
      <Button v-else size="xl" variant="green" @click.native="handleSubmit({state: 'En attente de validation'})">
        Soumettre à validation
      </Button>
      <Link class="text-sm font-medium" @click.native="handleSubmit({state: 'Brouillon'})">
        Enregistrer en brouillon
      </Link>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    mission: {
      type: Object,
      default: null
    },
    structure: {
      type: Object,
      required: true
    },
    templateId: {
      type: Number,
      default: null
    }
  },
  methods: {
    handleSubmit (payload) {
      this.$emit('submitted', payload)
    }
  }
}
</script>

<style>

</style>
