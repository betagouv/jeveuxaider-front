<template>
  <div class="grid grid-cols-1 gap-4">
    <div v-for="(group, index) in query" :key="index">
      <div v-if="index > 0" class="flex justify-between items-center bg-gray-100 py-4 px-4">
        <div class="text-gray-700 font-semibold">
          {{ group.operator }}
        </div>
        <div>
          <RiCloseLine
            class="flex-none hover:text-red-600 h-4 w-4 cursor-pointer"
            @click="removeGroup(index)"
          />
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
          <BaseFormControl html-for="field" class="max-w-[170px]">
            <BaseSelectAdvanced
              v-model="condition.name"
              placeholder="Champ"
              name="field"
              :options="conditionFieldOptions"
              options-class="!min-w-[230px]"
            />
          </BaseFormControl>
          <BaseFormControl html-for="operand" class="max-w-[110px]">
            <BaseSelectAdvanced
              v-model="condition.operand"
              name="operand"
              :options="fieldResolver(condition.name).operands"
            />
          </BaseFormControl>
          <BaseFormControl :html-for="condition.name" class="flex-1">
            <template v-if="fieldResolver(condition.name).type === 'select'">
              <BaseSelectAdvanced
                v-model="condition.value"
                :placeholder="fieldResolver(condition.name).placeholder ?? 'Valeur'"
                :name="condition.name"
                :options="fieldResolver(condition.name).options"
                options-class="!min-w-[300px]"
              />
            </template>
            <template v-if="fieldResolver(condition.name).type === 'input'">
              <BaseInput
                v-model="condition.value"
                :placeholder="fieldResolver(condition.name).placeholder ?? 'Valeur'"
                :name="condition.name"
              />
            </template>
            <template v-if="fieldResolver(condition.name).type === 'date'">
              <BaseInput
                v-model="condition.value"
                type="date"
                :placeholder="fieldResolver(condition.name).placeholder ?? 'Valeur'"
                :name="condition.name"
              />
            </template>
          </BaseFormControl>
          <div class="flex-none w-[20px]">
            <RiCloseLine
              v-if="cIndex > 0"
              class="flex-none hover:text-red-600 h-4 w-4 cursor-pointer"
              @click="removeCondition(group, cIndex)"
            />
          </div>
        </div>
        <div class="pt-4 pl-[46px]">
          <BaseDropdown>
            <template #button>
              <DsfrButton size="sm" type="tertiary" icon="RiAddLine">
                Ajouter une condition
              </DsfrButton>
            </template>
            <template #items>
              <div class="w-[100px]">
                <BaseDropdownOptionsItem size="sm" @click.native="addCondition(group, 'AND')">
                  ET
                </BaseDropdownOptionsItem>
                <BaseDropdownOptionsItem size="sm" @click.native="addCondition(group, 'OR')">
                  OU
                </BaseDropdownOptionsItem>
              </div>
            </template>
          </BaseDropdown>
        </div>
      </div>
    </div>
    <div class="flex">
      <BaseDropdown>
        <template #button>
          <DsfrButton size="sm" type="tertiary" icon="RiAddLine">
            Ajouter un groupe de conditions
          </DsfrButton>
        </template>
        <template #items>
          <div class="w-[100px]">
            <BaseDropdownOptionsItem size="sm" @click.native="addGroup('AND')">
              ET
            </BaseDropdownOptionsItem>
            <BaseDropdownOptionsItem size="sm" @click.native="addGroup('OR')">
              OU
            </BaseDropdownOptionsItem>
          </div>
        </template>
      </BaseDropdown>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    conditionFieldOptions: {
      type: Array,
      required: true,
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
                operator: null,
              },
            ],
            operator: null,
          },
        ]
      },
    },
  },
  data() {
    return {
      query: this.modelValue,
    }
  },
  watch: {
    query: {
      deep: true,
      handler(value, oldValue) {
        this.$emit('update:modelValue', value)
      },
    },
  },
  methods: {
    fieldResolver(key) {
      return this.conditionFieldOptions.find((option) => option.key === key)
    },
    addGroup(operator) {
      this.query.splice(this.query.length, 0, {
        conditions: [
          {
            name: 'missions.domaine_id',
            operand: '=',
            value: '',
            operator: null,
          },
        ],
        operator,
      })
    },
    removeGroup(index) {
      this.query.splice(index, 1)
    },
    addCondition(group, operator) {
      group.conditions.splice(group.conditions.length, 0, {
        name: 'missions.domaine_id',
        operand: '=',
        value: '',
        operator,
      })
    },
    removeCondition(group, index) {
      group.conditions.splice(index, 1)
    },
  },
})
</script>
