<template>
  <div class="grid grid-cols-1 gap-4">
    <div v-for="(action, index) in actions" :key="index" class="bg-gray-50 py-4 px-4">
      <div class="flex items-center justify-center space-x-4">
        <FormControl
          html-for="key"
        >
          <SelectAdvanced
            v-model="action.key"
            placeholder="Nom de l'action"
            name="key"
            :options="actionFieldOptions"
          />
        </FormControl>
        <FormControl
          html-for="value"
        >
          <Input
            v-model="action.value"
            placeholder="Valeur"
            name="value"
          />
        </FormControl>
        <div class="flex-none w-[30px]">
          <XIcon v-if="index > 0" class="flex-none hover:text-red-600 h-4 w-4 cursor-pointer" @click="removeAction(index)" />
        </div>
      </div>
    </div>
    <div class="flex">
      <Button size="sm" type="tertiary" icon="PlusIcon" @click="addAction()">
        Ajouter une action
      </Button>
    </div>
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    Button
  },
  props: {
    actionFieldOptions: {
      type: Array,
      required: true
    },
    modelValue: {
      type: Array,
      default: () => {
        return [
          {
            action: 'attach_tag',
            value: null
          }
        ]
      }
    }
  },
  data () {
    return {
      actions: this.modelValue
    }
  },
  watch: {
    actions: {
      deep: true,
      handler (value, oldValue) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  methods: {
    addAction () {
      this.actions.splice(this.actions.length, 0, {
        action: null,
        value: null
      })
    },
    removeAction (index) {
      this.actions.splice(index, 1)
    }
  }
}
</script>
