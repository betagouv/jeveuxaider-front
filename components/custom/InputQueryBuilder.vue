<template>
  <div class="grid grid-cols-1 gap-4">
    <div v-for="(group, index) in query" :key="index">
      <div v-if="index > 0" class="flex justify-between items-center bg-gray-100 py-4 px-4">
        <div class="text-gray-700 font-semibold">
          {{ group.operator }}
        </div>
        <div class="">
          <XIcon class="flex-none hover:text-red-600 h-4 w-4 cursor-pointer" @click="removeGroup(index)" />
        </div>
      </div>
      <div class="bg-gray-50 py-4 px-4">
        <div
          v-for="(condition, cIndex) in group.conditions"
          :key="cIndex"
          class="flex items-center space-x-4 space-y-2"
        >
          <div class="flex-none w-[30px]">
            <div v-if="cIndex > 0" class="text-gray-500 font-semibold text-sm">
              {{ condition.operator }}
            </div>
          </div>
          <FormControl
            html-for="field"
            class="max-w-[170px]"
          >
            <SelectAdvanced
              v-model="condition.name"
              placeholder="Champ"
              name="field"
              :options="conditionFieldOptions"
            />
          </FormControl>
          <FormControl
            html-for="operand"
            class="max-w-[110px]"
          >
            <SelectAdvanced
              v-model="condition.operand"
              name="operand"
              :options="operandResolver(condition.name)"
            />
          </FormControl>
          <FormControl
            html-for="value"
            class="flex-1"
          >
            <SelectAdvanced
              v-if="fieldResolver(condition.name).type === 'select'"
              v-model="condition.value"
              placeholder="Valeur"
              name="value"
              :options="fieldResolver(condition.name).options"
            />
            <Input
              v-if="fieldResolver(condition.name).type === 'input'"
              v-model="condition.value"
              placeholder="Valeur"
              name="value"
            />
          </FormControl>
          <div class="flex-none w-[20px]">
            <XIcon v-if="cIndex > 0" class="flex-none hover:text-red-600 h-4 w-4 cursor-pointer" @click="removeCondition(group, cIndex)" />
          </div>
        </div>
        <div class="pt-4 pl-[46px]">
          <Dropdown>
            <template #button>
              <Button size="sm" type="tertiary" icon="PlusIcon">
                Ajouter une condition
              </Button>
            </template>
            <template #items>
              <div class="w-[100px]">
                <DropdownOptionsItem size="sm" @click.native="addCondition(group, 'AND')">
                  ET
                </DropdownOptionsItem>
                <DropdownOptionsItem size="sm" @click.native="addCondition(group, 'OR')">
                  OU
                </DropdownOptionsItem>
              </div>
            </template>
          </Dropdown>
        </div>
      </div>
    </div>
    <div class="flex">
      <Dropdown>
        <template #button>
          <Button size="sm" type="tertiary" icon="PlusIcon">
            Ajouter un groupe de conditions
          </Button>
        </template>
        <template #items>
          <div class="w-[100px]">
            <DropdownOptionsItem size="sm" @click.native="addGroup('AND')">
              ET
            </DropdownOptionsItem>
            <DropdownOptionsItem size="sm" @click.native="addGroup('OR')">
              OU
            </DropdownOptionsItem>
          </div>
        </template>
      </Dropdown>
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
    conditionFieldOptions: {
      type: Array,
      required: true
    },
    modelValue: {
      type: Array,
      default: () => {
        return [
          {
            conditions: [
              {
                name: 'missions.domaine_id',
                operand: '=',
                value: '',
                operator: null
              }
            ],
            operator: null
          }
        ]
      }
    }
  },
  data () {
    return {
      query: this.modelValue,
      operands: [
        { key: '=', label: '=' },
        { key: '!=', label: '!=' }
      ]
    }
  },
  watch: {
    query: {
      deep: true,
      handler (value, oldValue) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  methods: {
    fieldResolver (key) {
      return this.conditionFieldOptions.find(option => option.key === key)
    },
    operandResolver (key) {
      const fieldConfig = this.conditionFieldOptions.find(option => option.key === key)
      return fieldConfig.includesOperands ? this.operands.concat(fieldConfig.includesOperands) : this.operands
    },
    addGroup (operator) {
      this.query.splice(this.query.length, 0, {
        conditions: [
          {
            name: 'missions.domaine_id',
            operand: '=',
            value: '',
            operator: null
          }
        ],
        operator
      })
    },
    removeGroup (index) {
      this.query.splice(index, 1)
    },
    addCondition (group, operator) {
      group.conditions.splice(group.conditions.length, 0, {
        name: 'missions.domaine_id',
        operand: '=',
        value: '',
        operator
      })
    },
    removeCondition (group, index) {
      group.conditions.splice(index, 1)
    }
  }
}
</script>
