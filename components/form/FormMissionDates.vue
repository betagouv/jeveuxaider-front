<template>
  <Box padding="sm">
    <Heading :level="3" class="mb-8">
      Dates de la mission
    </Heading>
    <nav v-dragscroll class="grid grid-cols-2 mb-6">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        class="flex justify-center pb-4 text-sm font-medium cursor-pointer group"
        :class="[tab.key == form.date_type ? 'border-b-2 border-jva-blue-500 text-jva-blue-500' : 'border-gray-300 border-b text-gray-500 hover:text-gray-800 hover:border-gray-500']"
        @click="form.date_type = tab.key"
      >
        <component :is="tab.icon" class="mr-2" :class="[tab.key == form.date_type ? 'text-jva-blue-500' : 'text-gray-400 group-hover:text-gray-800']" />
        <span>{{ tab.name }}</span>
      </div>
    </nav>
    <div v-if="form.date_type == 'ponctual'" class="space-y-6">
      <Alert>
        Le bénévole choisit un des créneaux proposés.
      </Alert>
      <div class="p-4 border rounded-lg">
        <Toggle
          v-model="form.showCalendar"
          label="<div class='font-medium text-base mb-2'>Configurer le calendrier de la mission</div>"
          position="right"
          description="Affichez les créneaux de disponibilité pour améliorer la qualité des candidatures de bénévoles."
        />
        <div v-if="form.showCalendar">
          <v-calendar is-expanded :attributes="attrs" @dayclick="handleDayClick" />
          <div
            v-if="currentDay"
          >
            <label class="block text-xs uppercase font-bold text-gray-700 mb-3">Créneaux du {{ currentDay.ariaLabel }}</label>
            <CheckboxGroup
              :key="currentDay.day"
              :value="currentSlot"
              variant="button"
              :options="$labels.slots"
              @input="handleSelectSlots"
            />
          </div>
        </div>
      </div>
      <div v-if="form.showCalendar && form.dates.length > 0">
        <div class="block text-xs uppercase font-bold text-gray-700 mb-2">
          Dates sélectionnées
        </div>
        <div class="border rounded-lg divide-y divide-solid text-sm">
          <div v-for="date in form.dates" :key="date.id" class="p-3 flex items-center justify-between">
            <div>
              <div class="first-letter:uppercase cursor-pointer hover:underline" @click="handleDayClick(date)">
                {{ date.ariaLabel }}
              </div>
              <div class="text-gray-500 font-medium">
                {{ date.slots.map(slot => $options.filters.label(slot, 'slots')).join(', ') }}
              </div>
            </div>
            <div class="cursor-pointer text-red-500 hover:underline text-xs" @click="handleDeleteDay(date.id)">
              Supprimer
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="!form.showCalendar"
        class="grid grid-cols-2 gap-4"
      >
        <FormControl
          label="Début de la mission"
          html-for="start_date"
          required
          :error="errors.start_date"
        >
          <InputDate v-model="form.start_date" required name="start_date" />
        </FormControl>
        <FormControl
          label="Fin de la mission"
          html-for="end_date"
          :error="errors.end_date"
        >
          <InputDate v-model="form.end_date" name="end_date" />
        </FormControl>
      </div>
    </div>
    <div v-else-if="form.date_type == 'recurring'" class="space-y-6">
      <Alert>
        Le bénévole doit être présent sur plusieurs créneaux.
      </Alert>
      <div class="grid grid-cols-2 gap-4">
        <FormControl
          label="Début de la mission"
          html-for="start_date"
          required
          :error="errors.start_date"
        >
          <InputDate v-model="form.start_date" required name="start_date" />
        </FormControl>
        <FormControl
          label="Fin de la mission"
          html-for="end_date"
          :error="errors.end_date"
        >
          <InputDate v-model="form.end_date" name="end_date" />
        </FormControl>
      </div>
      <FormControl
        label="Précisez la récurence demandée aux bénévoles"
        html-for="recurrent_description"
        :error="errors.recurrent_description"
        required
      >
        <template #description>
          <div class="text-sm  text-gray-800 mt-1">
            <div class="text-gray-600">Exemple:</div>
            <div class="italic">1 heure par semaine</div>
            <div class="italic">1 jour par mois, le samedi</div>
            <div class="italic">Tout les samedis matins</div>
          </div>
        </template>
        <Input
          v-model="form.recurrent_description"
          name="recurrent_description"
          placeholder="1 heure par semaine"
        />
      </FormControl>
    </div>
  </Box>
</template>

<script>
import CalendarPonctuelIcon from '../icon/CalendarPonctuelIcon.vue'
import CalendarRecurentIcon from '../icon/CalendarRecurentIcon.vue'

export default {
  components: { CalendarPonctuelIcon, CalendarRecurentIcon },
  props: {
    initialForm: {
      type: Object,
      default: null
    },
    errors: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      tabs: [
        { key: 'ponctual', name: 'Mission ponctuelle', icon: 'CalendarPonctuelIcon' },
        { key: 'recurring', name: 'Mission récurrente', icon: 'CalendarRecurentIcon' }
      ],
      currentDay: null,
      currentSlot: null,
      form: {
        ...this.initialForm,
        date_type: this.initialForm.date_type || 'ponctual',
        showCalendar: !!this.initialForm.dates,
        dates: this.initialForm.dates || [],
        recurrent_description: this.initialForm.recurrent_description || ''
      }
    }
  },
  computed: {
    attrs () {
      return [
        {
          key: 'dates',
          highlight: {
            fillMode: 'solid',
            contentClass: 'bg-jva-blue-500 focus:!bg-jva-blue-500'
          },
          dates: this.form.dates.map(day => day.date)
        }
      ]
    }
  },
  watch: {
    form: {
      deep: true,
      handler () {
        if (this.form.showCalendar) {
          // Autofill start_date and end_date
          if (this.form.dates.length == 1) {
            this.form.start_date = this.form.dates[0].id
            this.form.end_date = this.form.dates[0].id
          } else if (this.form.dates.length > 1) {
            this.form.start_date = this.form.dates[0].id
            this.form.end_date = this.form.dates[this.form.dates.length - 1].id
          }
          this.$emit('change', { ...this.form, commitment__duration: null })
        } else {
          this.$emit('change', { ...this.form, dates: null })
        }
      }
    }
  },
  methods: {
    handleDayClick (day) {
      this.currentDay = day
      const currentDay = this.form.dates.find(day => this.currentDay.id == day.id)
      this.currentSlot = currentDay ? currentDay.slots : null
    },
    handleSelectSlots (value) {
      const elementIndex = this.form.dates.findIndex(obj => obj.id == this.currentDay.id)
      const newDate = {
        id: this.currentDay.id,
        date: this.currentDay.date,
        ariaLabel: this.currentDay.ariaLabel,
        slots: value
      }
      if (elementIndex != -1) {
        this.form.dates[elementIndex] = newDate
      } else {
        this.form.dates.push(newDate)
      }

      this.form.dates = this.form.dates.sort(
        (dateA, dateB) => {
          return new Date(dateA.id) - new Date(dateB.id)
        }
      )
    },
    handleDeleteDay (dayId) {
      this.form.dates = this.form.dates.filter(day => dayId != day.id)
      this.currentDay = null
    }
  }
}
</script>

<style scoped>
.vc-container {
  border: none;
}
</style>
