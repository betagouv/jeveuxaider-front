<template>
  <Box padding="sm">
    <Heading :level="3" class="mb-8">
      Paramètres
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
    <div class="space-y-6 mb-6">
      <Alert v-if="form.date_type == 'ponctual'">
        La mission se déroule sur une période limitée dans le temps : la présence du bénévole est ponctuelle.
      </Alert>
      <Alert v-else>
        L’engagement du bénévole se fait sur le long<br> terme : il doit pouvoir se rendre en mission de façon régulière.
      </Alert>
      <FormControl
        label="Nombre de bénévoles recherchés"
        html-for="participations_max"
        required
        :error="errors.participations_max"
      >
        <Input
          v-model="form.participations_max"
          name="participations_max"
          type="number"
          suffix="bénévoles"
        />
      </FormControl>
      <div class="grid gap-4" :class="[form.date_type == 'recurring' ? ' xl:grid-cols-2' : 'xl:grid-cols-1']">
        <FormControl
          label="Durée d'engagement min."
          html-for="commitment__duration"
          required
          :error="errors.commitment__duration"
        >
          <SelectAdvanced
            v-model="form.commitment__duration"
            name="commitment__duration"
            placeholder="Durée"
            :options="$labels.duration"
          />
        </FormControl>
        <FormControl
          v-if="form.date_type == 'recurring'"
          label="Fréquence"
          html-for="commitment__time_period"
        >
          <SelectAdvanced
            v-model="form.commitment__time_period"
            name="commitment__time_period"
            placeholder="Fréquence"
            :options="$labels.time_period"
          />
        </FormControl>
      </div>
    </div>
    <div v-if="form.date_type == 'ponctual'" class="space-y-6">
      <div class="p-4 border rounded-lg">
        <Toggle
          v-model="form.showCalendar"
          label="<div class='font-medium text-base mb-2'>Configurer le calendrier de la mission</div>"
          position="right"
          description="Paramétrez les horaires de réalisation de la mission pour permettre aux bénévoles de choisir des créneaux sur lesquels ils souhaitent s’engager."
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
        label="Précisez les créneaux horaires"
        html-for="recurrent_description"
        :error="errors.recurrent_description"
        required
      >
        <template #description>
          <div class="text-sm  text-gray-800 mt-1">
            <div class="text-gray-600">
              Exemple:
            </div>
            <div class="italic">
              le samedi matin
            </div>
            <div class="italic">
              en soirée du lundi au vendredi
            </div>
            <div class="italic">
              de 7h à 9h les mardis
            </div>
          </div>
        </template>
        <Input
          v-model="form.recurrent_description"
          name="recurrent_description"
          placeholder="les mardis ou jeudis"
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
        { key: 'ponctual', name: 'Engagement ponctuel', icon: 'CalendarPonctuelIcon' },
        { key: 'recurring', name: 'Engagement récurrent', icon: 'CalendarRecurentIcon' }
      ],
      currentDay: null,
      currentSlot: null,
      form: {
        ...this.initialForm,
        date_type: this.initialForm.date_type || 'ponctual',
        showCalendar: !!this.initialForm.dates,
        dates: this.initialForm.dates || [],
        recurrent_description: this.initialForm.recurrent_description || '',
        commitment__duration: this.initialForm.commitment__duration || null,
        commitment__time_period: this.initialForm.commitment__time_period || null
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
        if (this.form.date_type == 'ponctual') {
          this.form.commitment__time_period = null
        }
        if (this.form.showCalendar) {
          // Autofill start_date and end_date
          if (this.form.dates.length == 1) {
            this.form.start_date = this.form.dates[0].id
            this.form.end_date = this.form.dates[0].id
          } else if (this.form.dates.length > 1) {
            this.form.start_date = this.form.dates[0].id
            this.form.end_date = this.form.dates[this.form.dates.length - 1].id
          }
          this.$emit('change', this.form)
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
