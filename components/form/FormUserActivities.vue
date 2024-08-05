<template>
  <p class="uppercase text-sm font-bold text-[#666666] mt-9 mb-5">Activités les plus recherchées</p>
  <DsfrCheckboxRichGroup
    v-model="formPopularActivities"
    :options="popularActivitiesOptions"
    name="activities"
    class="grid @xl:grid-cols-2 gap-2"
    option-class="text-sm rounded-[4px] py-3 px-4"
    label-class="w-full whitespace-normal"
  >
    <template #default="{ option }">
      <div class="flex items-center justify-between gap-2">
        <div class="line-clamp-2">{{ option.name }}</div>
        <div class="text-sm @xl:text-xl !leading-none">{{ option.icon }}</div>
      </div>
    </template>
  </DsfrCheckboxRichGroup>

  <p class="uppercase text-sm font-bold text-[#666666] mt-9 mb-5">Toutes les autres activités</p>
  <DsfrCheckboxRichGroup
    v-model="formActivities"
    :options="otherActivitiesOptions"
    name="activities"
    class="grid @xl:grid-cols-2 gap-2"
    option-class="text-sm rounded-[4px] py-3 px-4"
    label-class="w-full whitespace-normal"
  >
    <template #default="{ option }">
      <div class="flex items-center justify-between gap-2">
        <div class="line-clamp-2">{{ option.name }}</div>
        <div class="text-sm @xl:text-xl !leading-none">{{ option.icon }}</div>
      </div>
    </template>
  </DsfrCheckboxRichGroup>
</template>

<script>
export default defineNuxtComponent({
  props: {
    initialActivities: { type: Array, default: null },
  },
  setup() {
    const {
      popularActivities,
      activitiesOptions,
      popularActivitiesOptions,
      otherActivitiesOptions,
    } = useProfileActivities()

    return {
      popularActivities,
      activitiesOptions,
      popularActivitiesOptions,
      otherActivitiesOptions,
    }
  },
  data() {
    return {
      formActivities: this.getformActivities(this.initialActivities),
      formPopularActivities: this.getFormPopularActivities(this.initialActivities),
    }
  },
  watch: {
    initialActivities: {
      handler(newVal) {
        this.formActivities = this.getformActivities(newVal)
        this.formPopularActivities = this.getFormPopularActivities(newVal)
      },
      deep: true,
      immediate: true,
    },
    formActivities: {
      handler(newVal) {
        this.$emit('update:formActivities', newVal)
      },
      immediate: true,
    },
    formPopularActivities: {
      handler(newVal) {
        this.$emit('update:formPopularActivities', newVal)
      },
      immediate: true,
    },
  },
  methods: {
    getformActivities(payload) {
      return payload
        .filter((act) => !this.popularActivities.includes(act.name))
        .map((act) => {
          return this.activitiesOptions.find((opt) => act.id === opt.id)
        })
    },
    getFormPopularActivities(payload) {
      return payload
        .filter((act) => this.popularActivities.includes(act.name))
        .map((act) => {
          return this.activitiesOptions.find((opt) => act.id === opt.id)
        })
    },
  },
})
</script>
