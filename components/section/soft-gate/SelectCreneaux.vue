<template>
  <div>
    <div class="text-center mb-6">
      <Heading as="div" size="lg" class="mb-2 lg:mb-3">
        Sélectionner le ou les créneaux de vos disponibilités
      </Heading>
    </div>
    <div class="mx-auto">
      <div class="space-y-2">
        <Disclosure v-for="date in datesPaginated" :key="date.id" class="bg-white border hover:shadow">
          <template #button="{ isOpen }">
            <div class="flex items-center justify-between group p-4">
              <div class="font-bold text-sm first-letter:uppercase">
                {{ $dayjs(date.id).format('dddd D MMMM') }}
              </div>
              <div class="flex">
                <div v-if="selectedSlots.filter(selectedSlot => selectedSlot.date == date.id).length > 0" class="text-sm font-medium text-jva-green-500 mr-4">
                  Sélectionnée
                </div>
                <ChevronUpIcon v-if="isOpen" class="text-gray-800 group-hover:text-gray-600 h-5 w-5" />
                <ChevronDownIcon v-else class="text-gray-800 group-hover:text-gray-600 h-5 w-5" />
              </div>
            </div>
          </template>
          <div class="border-t p-4 flex space-x-2">
            <div v-for="slot in date.slots" :key="date.id + slot">
              <input
                :id="date.id + slot"
                v-model="selectedSlots"
                class="hidden"
                :name="date.id + slot"
                type="checkbox"
                :value="{date: date.id, slot}"
              >
              <label
                class="px-2.5 py-1.5 cursor-pointer text-sm border border-jva-blue-500"
                :class="[
                  selectedSlots.filter(selectedSlot => selectedSlot.date == date.id && selectedSlot.slot == slot).length > 0 ?
                    'bg-jva-blue-500 text-white font-bold' :
                    'text-jva-blue-500 hover:bg-gray-100'
                ]"
                :for="date.id + slot"
              >{{ slot | label('slots') }}</label>
            </div>
          </div>
        </Disclosure>
      </div>
      <div v-if="pageCount > 1" class="mt-6 grid justify-items-stretch">
        <div v-if="pageCurrent > 1" class="flex items-center justify-self-start cursor-pointer text-sm text-black hover:underline" @click="handlePreviousPage">
          <ChevronLeftIcon class="h-4 w-4 mr-3" /> Dates précédentes
        </div>
        <div v-if="pageCurrent < pageCount" class="flex justify-self-end items-center cursor-pointer text-sm text-black hover:underline" @click="handleNextPage">
          Dates suivantes <ChevronRightIcon class="h-4 w-4 ml-3" />
        </div>
      </div>

      <div v-if="selectedSlots.length > 0" class="mt-6">
        <div class="text-jva-green-500 font-bold text-center mb-2">
          {{ selectedSlots.length }} créneaux sélectionnés
        </div>
        <div class="flex flex-wrap justify-center space-x-2 mb-6">
          <Badge v-for="slot in [...new Map(selectedSlots.map(item => [item['date'], item])).values()] " :key="slot.date" :no-icon="true" type="new">
            {{ $dayjs(slot.date).format('D MMM') }}
          </Badge>
        </div>

        <Button :disabled="selectedSlots.length == 0" size="lg" class="w-full">
          Continuer
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Heading from '@/components/dsfr/Heading.vue'
import Button from '@/components/dsfr/Button.vue'
import Badge from '@/components/dsfr/Badge.vue'

export default {
  name: 'SoftGateSelectCreneaux',
  components: {
    Heading,
    Button,
    Badge
  },
  data () {
    return {
      selectedSlots: [],
      pageCurrent: 1,
      pageSize: 4
    }
  },
  computed: {
    pageCount () {
      return Math.round(this.mission.dates.length / this.pageSize)
    },
    indexStart () {
      return (this.pageCurrent - 1) * this.pageSize
    },
    indexEnd () {
      return this.indexStart + this.pageSize
    },
    datesPaginated () {
      return this.mission.dates.slice(this.indexStart, this.indexEnd)
    },
    mission () {
      return this.$store.state.softGate.selectedMission
    }
  },
  methods: {
    handlePreviousPage () {
      if (this.pageCurrent <= 1) {
        return
      }
      this.pageCurrent = this.pageCurrent - 1
    },
    handleNextPage () {
      if (this.pageCurrent >= this.pageCount) {
        return
      }
      this.pageCurrent = this.pageCurrent + 1
    }
  }
}
</script>
