<template>
  <div>
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
        <FormControl
          v-if="form.date_type == 'recurring'"
          label="Début de la mission"
          html-for="start_date"
          required
          :error="errors.start_date"
        >
          <InputDate v-model="form.start_date" required name="start_date" />
        </FormControl>
        <div class="grid gap-4" :class="[form.date_type == 'recurring' ? ' xl:grid-cols-2' : 'xl:grid-cols-1']">
          <FormControl
            label="Durée d'engagement"
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
            :error="errors.commitment__time_period"
            required
          >
            <SelectAdvanced
              v-model="form.commitment__time_period"
              name="commitment__time_period"
              placeholder="Fréquence"
              :options="[
                { key: 'week', label: 'par semaine' },
                { key: 'month', label: 'par mois' },
              ]"
            />
          </FormControl>
        </div>
      </div>

      <div v-if="form.date_type == 'recurring'" class="space-y-6">
        <FormControl
          label="Précisez les créneaux horaires"
          html-for="recurrent_description"
          :error="errors.recurrent_description"
          required
        >
          <template #description>
            <div class="text-sm text-gray-500 mt-2">
              Précisez en une ligne la disponibilité attendue. Par exemple “Le samedi matin”, “En soirée, le lundi et le jeudi”
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
    <Box v-if="form.date_type == 'ponctual'" padding="sm" class="mt-8 space-y-6">
      <Heading :level="3" class="mb-8">
        Dates de la mission
      </Heading>
      <RadioGroup
        v-model="hasCreneaux"
        :options="[{ key:'yes',label:'Avec créneaux'}, { key:'no',label:'Sans créneaux'}]"
        variant="tabs"
      />
      <template v-if="hasCreneaux == 'yes'">
        <Alert>
          Permettez aux bénévoles d'indiquer leurs disponibilités sur vos créneaux.
        </Alert>
        <div class="divide-y divide-solid text-sm">
          <div v-for="date in form.dates" :key="date.id" class="py-3 flex items-center justify-between">
            <div class="mr-2">
              <div class="first-letter:uppercase">
                {{ $dayjs(date.id).format('dddd D MMMM YYYY') }}
              </div>
              <div class="text-gray-500 font-medium">
                {{ date.slots.map(slot => $options.filters.label(slot, 'slots')).join(', ') }}
              </div>
            </div>
            <div class="cursor-pointer text-gray-600 hover:text-red-500 underline text-xs" @click="handleDeleteDate(date.id)">
              Supprimer
            </div>
          </div>
        </div>
        <div v-if="showFormAddDate" class="space-y-6 border p-4">
          <FormControl
            label="Ajouter une date"
            html-for="date"
            required
          >
            <InputDate
              v-model="selectedDate"
              required
              name="date"
              :min-date="new Date()"
              :attributes="[{
                highlight: {
                  class: 'is-highlight',
                  contentClass: 'is-highlight',
                },
                dates: form.dates.map(date => date.id)
              }]"
              @popoverWillShow="handlePopoverWillShow"
            />
          </FormControl>
          <FormControl label="Choisissez les créneaux pour cette date" html-for="creneaux" required>
            <CheckboxGroup
              v-model="selectedSlot"
              name="creneaux"
              variant="button"
              :options="$labels.slots"
            />
          </FormControl>

          <Button variant="white" size="sm" :disabled="selectedSlot.length == 0 || !selectedDate" @click.native="handleAddDate">
            Ajouter
          </Button>
        </div>
        <Button v-if="!showFormAddDate" variant="white" @click.native="showFormAddDate = true">
          Ajouter une date
        </Button>
      </template>
      <template v-else-if="hasCreneaux == 'no'">
        <Alert>
          Indiquez seulement la date de début et de fin de la mission.
        </Alert>
        <div
          class="grid grid-cols-2 gap-4 "
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
      </template>
    </Box>
  </div>
</template>

<script>
import CalendarPonctuelIcon from '../icon/CalendarPonctuelIcon.vue'
import CalendarRecurentIcon from '../icon/CalendarRecurentIcon.vue'
import DsfrButton from '@/components/dsfr/Button.vue'

export default {
  components: { CalendarPonctuelIcon, CalendarRecurentIcon, DsfrButton },
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
      selectedSlot: [],
      selectedDate: null,
      showFormAddDate: true,
      hasCreneaux: (this.initialForm.start_date || this.initialForm.end_date) && !this.initialForm.dates ? 'no' : 'yes',
      lastDateAdded: null,
      form: {
        start_date: this.initialForm.start_date || null,
        end_date: this.initialForm.end_date || null,
        participations_max: this.initialForm.participations_max || 1,
        date_type: this.initialForm.date_type || (this.initialForm.commitment__time_period ? 'recurring' : 'ponctual'),
        dates: this.initialForm.dates || [],
        commitment__duration: this.initialForm.commitment__duration || '',
        commitment__time_period: this.initialForm.commitment__time_period || '',
        recurrent_description: this.initialForm.recurrent_description || ''

      }
    }
  },
  watch: {
    form: {
      deep: true,
      handler () {
        if (this.hasCreneaux == 'yes') {
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
    handleAddDate () {
      const newDate = {
        date: this.$dayjs(this.selectedDate).format(),
        id: this.selectedDate,
        slots: this.$labels.slots.filter(slot => this.selectedSlot.includes(slot.key)).map(slot => slot.key) // On part de $labels.slots pour garder l'ordre
      }
      const elementIndex = this.form.dates.findIndex(obj => obj.id == this.selectedDate)

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

      this.lastDateAdded = this.selectedDate
      this.showFormAddDate = false
      this.selectedDate = null
    },
    handleDeleteDate (dayId) {
      this.form.dates = this.form.dates.filter(day => dayId != day.id)
    },
    async handlePopoverWillShow (calendar) {
      if (this.lastDateAdded) {
        await calendar.move(this.lastDateAdded)
      }
    }
  }
}
</script>
