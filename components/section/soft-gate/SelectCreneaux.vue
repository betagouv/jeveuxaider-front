<template>
  <div>
    <div class="text-center mb-6">
      <DsfrHeading as="div" size="lg" class="mb-2 lg:mb-3">
        Renseignez vos prochaines disponibilités
      </DsfrHeading>
    </div>
    <div class="mx-auto">
      <DsfrAccordionsGroup class="px-4 sm:px-0 bg-white">
        <DsfrAccordion
          v-for="date in datesPaginated"
          :key="date.id"
          title-color-class="bg-white hover:bg-white active:bg-white"
        >
          <template #title>
            <RiCheckboxCircleLine
              v-if="selectedSlots.filter((selectedSlot) => selectedSlot.date == date.id).length > 0"
              class="text-jva-green-500 mr-2 h-5 w-5 inline fill-current"
            />
            <span class="first-letter:uppercase">{{ $dayjs(date.id).format('dddd D MMMM') }}</span>
          </template>
          <div class="flex flex-wrap -mx-1">
            <div v-for="slot in date.slots" :key="date.id + slot" class="mx-1 mb-2">
              <input
                :id="date.id + slot"
                v-model="selectedSlots"
                class="hidden"
                :name="date.id + slot"
                type="checkbox"
                :value="{ date: date.id, slot }"
              />
              <DsfrTag
                as="label"
                size="md"
                context="selectable"
                :for="date.id + slot"
                :is-selected="
                  selectedSlots.filter(
                    (selectedSlot) => selectedSlot.date == date.id && selectedSlot.slot == slot
                  ).length > 0
                "
              >
                {{ $filters.label(slot, 'slots') }}
              </DsfrTag>
            </div>
          </div>
        </DsfrAccordion>
      </DsfrAccordionsGroup>
      <div class="sm:flex mt-6">
        <div v-if="pageCount > 1" class="flex items-center">
          <div
            :class="[
              pageCurrent > 1
                ? 'bg-white cursor-pointer text-black hover:bg-gray-100'
                : 'bg-gray-200 text-gray-500',
            ]"
            class="border border-r-0 p-2 flex"
            @click="handlePreviousPage"
          >
            <RiArrowLeftLine class="h-4 w-4 fill-current" />
          </div>
          <div
            :class="[
              pageCurrent < pageCount
                ? 'bg-white cursor-pointer text-black hover:bg-gray-100'
                : 'bg-gray-200 text-gray-500',
            ]"
            class="border p-2 flex"
            @click="handleNextPage"
          >
            <RiArrowRightLine class="h-4 w-4 fill-current" />
          </div>
        </div>
        <div
          class="flex flex-col sm:flex-row items-center mt-2 sm:mt-0 sm:ml-auto font-semibold text-sm text-gray-600"
        >
          <div class="block mb-3 sm:mb-0 text-center sm:text-left sm:inline">
            {{
              $filters.pluralize(
                selectedSlots.length,
                'créneau sélectionné',
                'créneaux sélectionnés'
              )
            }}
          </div>
          <DsfrButton
            :disabled="selectedSlots.length == 0"
            size="lg"
            class="sm:ml-4 flex items-center"
            icon="RiArrowRightSLine"
            icon-position="right"
            @click.native="handleSubmit"
          >
            Continuer
          </DsfrButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  name: 'SoftGateSelectCreneaux',
  data() {
    return {
      selectedSlots: [],
      pageCurrent: 1,
      pageSize: 4,
    }
  },
  computed: {
    mission() {
      return this.$stores.softGate.selectedMission
    },
    nextDates() {
      return this.mission.dates.filter(
        (date) =>
          this.$dayjs(date.id).isAfter(this.$dayjs()) ||
          this.$dayjs(date.id).isSame(this.$dayjs(), 'day')
      )
    },
    pageCount() {
      return Math.ceil(this.nextDates.length / this.pageSize)
    },
    indexStart() {
      return (this.pageCurrent - 1) * this.pageSize
    },
    indexEnd() {
      return this.indexStart + this.pageSize
    },
    datesPaginated() {
      return this.nextDates.slice(this.indexStart, this.indexEnd)
    },
  },
  methods: {
    handlePreviousPage() {
      if (this.pageCurrent <= 1) {
        return
      }
      this.pageCurrent = this.pageCurrent - 1
    },
    handleNextPage() {
      if (this.pageCurrent >= this.pageCount) {
        return
      }
      this.pageCurrent = this.pageCurrent + 1
    },
    handleSubmit() {
      // On groupe les slots dans un tableau par date
      const selectedSlots = this.selectedSlots.reduce((acc, cur) => {
        if (!acc.some((item) => item.date === cur.date)) {
          acc.push({ date: cur.date, slots: [] })
        }
        const found = acc.find((item) => item.date === cur.date)
        found.slots.push(cur.slot)
        return acc
      }, [])
      this.$stores.softGate.selectedMission = {
        ...this.mission,
        selectedSlots,
      }
      this.$emit('next')
    },
  },
})
</script>
