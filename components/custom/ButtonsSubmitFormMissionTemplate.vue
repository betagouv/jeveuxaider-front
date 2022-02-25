<template>
  <div class="flex-col gap-2 flex-shrink-0 items-center justify-center">
    <template v-if="missionTemplate">
      <Button v-if="['draft'].includes(missionTemplate.state)" size="xl" variant="green" :loading="loading" @click.native="handleSubmit({state: 'waiting'})">
        Soumettre à validation
      </Button>
      <Button v-else size="xl" variant="green" :loading="loading" @click.native="handleSubmit()">
        Enregistrer
      </Button>
      <Link v-if="['draft', 'waiting'].includes(missionTemplate.state)" class="text-sm font-medium" @click.native="handleSubmit({state: 'draft'})">
        Enregistrer en brouillon
      </Link>
    </template>
    <template v-else>
      <Button v-if="$store.getters.contextRole === 'admin'" size="xl" variant="green" :loading="loading" @click.native="handleSubmit({state: 'waiting'})">
        Enregistrer
      </Button>
      <Button v-else size="xl" variant="green" :loading="loading" @click.native="handleSubmit({state: 'waiting'})">
        Soumettre à validation
      </Button>
      <Link class="text-sm font-medium" @click.native="handleSubmit({state: 'draft'})">
        Enregistrer en brouillon
      </Link>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    missionTemplate: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
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
