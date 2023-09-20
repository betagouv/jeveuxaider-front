<template>
  <div class="grid grid-cols-1 gap-4">
    <div v-for="(action, index) in actions" :key="index" class="bg-gray-50 py-4 px-4">
      <div class="flex items-center justify-center space-x-4">
        <BaseFormControl html-for="key">
          <BaseSelectAdvanced
            v-model="action.key"
            placeholder="Nom de l'action"
            name="key"
            :options="actionFieldOptions"
          />
        </BaseFormControl>
        <BaseFormControl html-for="value">
          <BaseInput v-model="action.value" placeholder="Valeur" name="value" />
        </BaseFormControl>
        <div class="flex-none w-[30px]">
          <RiCloseLine
            v-if="index > 0"
            class="flex-none hover:text-red-600 h-4 w-4 cursor-pointer"
            @click="removeAction(index)"
          />
        </div>
      </div>
    </div>
    <div class="flex">
      <DsfrButton size="sm" type="tertiary" icon="RiAddLine" @click="addAction()">
        Ajouter une action
      </DsfrButton>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    actionFieldOptions: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: Array,
      default: () => {
        return [
          {
            action: 'attach_tag',
            value: null,
          },
        ]
      },
    },
  },
  data() {
    return {
      actions: this.modelValue,
    }
  },
  watch: {
    actions: {
      deep: true,
      handler(value, oldValue) {
        this.$emit('update:modelValue', value)
      },
    },
  },
  methods: {
    addAction() {
      this.actions.splice(this.actions.length, 0, {
        action: null,
        value: null,
      })
    },
    removeAction(index) {
      this.actions.splice(index, 1)
    },
  },
})
</script>
