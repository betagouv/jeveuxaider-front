<template>
  <div>
    <BaseBox padding="sm">
      <BaseHeading :level="3" class="mb-8"> Paramètres </BaseHeading>
      <nav v-dragscroll class="grid grid-cols-2 mb-6">
        <div
          v-for="tab in tabs"
          :key="tab.key"
          class="flex justify-center pb-4 text-sm font-medium cursor-pointer group"
          :class="[
            tab.key == form.date_type
              ? 'border-b-2 border-jva-blue-500 text-jva-blue-500'
              : 'border-gray-300 border-b text-gray-500 hover:text-gray-800 hover:border-gray-500',
          ]"
          @click="
            () => {
              form.date_type = tab.key
              $emit('dateTypeChange', tab.key)
            }
          "
        >
          <component
            :is="tab.icon"
            class="mr-2"
            :class="[
              tab.key == form.date_type
                ? 'text-jva-blue-500'
                : 'text-gray-400 group-hover:text-gray-800',
            ]"
          />
          <span>{{ tab.name }}</span>
        </div>
      </nav>
      <div class="space-y-6 mb-6">
        <BaseAlert v-if="form.date_type == 'ponctual'">
          La mission se déroule sur une période limitée dans le temps : la présence du bénévole est
          ponctuelle.
        </BaseAlert>
        <BaseAlert v-else>
          L’engagement du bénévole se fait sur le long<br />
          terme : il doit pouvoir se rendre en mission de façon régulière.
        </BaseAlert>
        <BaseFormControl
          label="Nombre de bénévoles recherchés"
          html-for="participations_max"
          required
          :error="errors.participations_max"
        >
          <BaseInput
            v-model="form.participations_max"
            name="participations_max"
            type="number"
            suffix="bénévoles"
          />
        </BaseFormControl>
        <BaseAlert v-if="form.participations_max > 70" variant="warning">
          <span class="font-bold">Ça fait beaucoup de bénévoles 😅</span><br />
          Toutes les demandes de participations devront être mises à jour (validées ou refusées).<br />
          Nous vous conseillons de mobiliser progressivement des bénévoles, et de revoir votre
          besoin à la hausse si nécessaire.
        </BaseAlert>
        <BaseFormControl
          v-if="form.date_type == 'recurring'"
          label="Début de la mission"
          html-for="start_date"
          required
          :error="errors.start_date"
        >
          <BaseInputDate v-model="form.start_date" required name="start_date" />
        </BaseFormControl>
        <div
          class="grid gap-4"
          :class="[form.date_type == 'recurring' ? ' xl:grid-cols-2' : 'xl:grid-cols-1']"
        >
          <BaseFormControl
            label="Durée d'engagement"
            html-for="commitment__duration"
            required
            :error="errors.commitment__duration"
          >
            <BaseSelectAdvanced
              v-model="form.commitment__duration"
              name="commitment__duration"
              placeholder="Durée"
              :options="$labels.duration"
            />
          </BaseFormControl>
          <BaseFormControl
            v-if="form.date_type == 'recurring'"
            label="Fréquence"
            html-for="commitment__time_period"
            :error="errors.commitment__time_period"
            required
          >
            <BaseSelectAdvanced
              v-model="form.commitment__time_period"
              name="commitment__time_period"
              placeholder="Fréquence"
              :options="[
                { key: 'week', label: 'par semaine' },
                { key: 'month', label: 'par mois' },
              ]"
            />
          </BaseFormControl>
        </div>
      </div>

      <div v-if="form.date_type == 'recurring'" class="space-y-6">
        <BaseFormControl
          label="Précisez les créneaux horaires"
          html-for="recurrent_description"
          :error="errors.recurrent_description"
          required
        >
          <template #description>
            <div class="text-sm text-gray-500 mt-2">
              Précisez en une ligne la disponibilité attendue. Par exemple “Le samedi matin”, “En
              soirée, le lundi et le jeudi”
            </div>
          </template>
          <BaseInput
            v-model="form.recurrent_description"
            name="recurrent_description"
            placeholder="les mardis ou jeudis"
          />
        </BaseFormControl>
      </div>
    </BaseBox>
    <BaseBox v-if="form.date_type == 'ponctual'" padding="sm" class="mt-8 space-y-6">
      <BaseHeading :level="3" class="mb-8"> Dates de la mission </BaseHeading>
      <BaseRadioGroup
        :modelValue="withSlots"
        :options="[
          { key: true, label: 'Avec créneaux' },
          { key: false, label: 'Sans créneaux' },
        ]"
        variant="tabs"
        @update:modelValue="$emit('withSlotChange', $event)"
      />
      <template v-if="withSlots">
        <BaseAlert>
          Permettez aux bénévoles d'indiquer leurs disponibilités sur vos créneaux.
        </BaseAlert>
        <div class="divide-y divide-solid text-sm">
          <div
            v-for="date in form.dates"
            :key="date.id"
            class="py-3 flex items-center justify-between"
          >
            <div class="mr-2">
              <div class="first-letter:uppercase">
                {{ $dayjs(date.id).format('dddd D MMMM YYYY') }}
              </div>
              <div class="text-gray-500 font-medium">
                {{ date.slots.map((slot) => $filters.label(slot, 'slots')).join(', ') }}
              </div>
            </div>
            <div
              class="cursor-pointer text-gray-600 hover:text-red-500 underline text-xs"
              @click="handleDeleteDate(date.id)"
            >
              Supprimer
            </div>
          </div>
        </div>
        <BaseFormControl html-for="dates" required :error="errors.dates">
          <div v-if="showFormAddDate" class="space-y-6 border p-4">
            <BaseFormControl label="Ajouter une date" html-for="date" required>
              <BaseInputDate
                ref="inputDatePicker"
                v-model="selectedDate"
                required
                name="date"
                :min-date="new Date()"
                :attributes="[
                  {
                    highlight: {
                      class: 'is-highlight',
                      contentClass: 'is-highlight',
                    },
                    dates: form.dates.map((date) => date.id),
                  },
                ]"
                @popoverWillShow="handlePopoverWillShow"
              />
            </BaseFormControl>
            <BaseFormControl
              label="Choisissez les créneaux pour cette date"
              html-for="creneaux"
              required
            >
              <BaseCheckboxGroup
                v-model="selectedSlot"
                name="creneaux"
                variant="button"
                :options="$labels.slots"
              />
            </BaseFormControl>

            <BaseButton
              variant="white"
              size="sm"
              :disabled="selectedSlot.length == 0 || !selectedDate"
              @click.native="handleAddDate"
            >
              Ajouter
            </BaseButton>
          </div>
          <BaseButton
            v-if="!showFormAddDate"
            variant="white"
            @click.native="handleShowFormAddDate()"
          >
            Ajouter une date
          </BaseButton>
        </BaseFormControl>
      </template>
      <template v-else-if="!withSlots">
        <BaseAlert> Indiquez seulement la date de début et de fin de la mission. </BaseAlert>
        <div class="grid grid-cols-2 gap-4">
          <BaseFormControl
            label="Début de la mission"
            html-for="start_date"
            required
            :error="errors.start_date"
          >
            <BaseInputDate v-model="form.start_date" required name="start_date" />
          </BaseFormControl>
          <BaseFormControl label="Fin de la mission" html-for="end_date" :error="errors.end_date">
            <BaseInputDate v-model="form.end_date" name="end_date" />
          </BaseFormControl>
        </div>
      </template>
    </BaseBox>
  </div>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import CalendarPonctuelIcon from '../icon/CalendarPonctuelIcon.vue'
import CalendarRecurentIcon from '../icon/CalendarRecurentIcon.vue'

export default defineNuxtComponent({
  directives: {
    dragscroll,
  },
  components: { CalendarPonctuelIcon, CalendarRecurentIcon },
  props: {
    initialForm: {
      type: Object,
      default: null,
    },
    withSlots: {
      type: Boolean,
      required: true,
    },
    errors: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      tabs: [
        {
          key: 'ponctual',
          name: 'Engagement ponctuel',
          icon: 'CalendarPonctuelIcon',
        },
        {
          key: 'recurring',
          name: 'Engagement récurrent',
          icon: 'CalendarRecurentIcon',
        },
      ],
      selectedSlot: [],
      selectedDate: null,
      showFormAddDate: !this.initialForm.dates?.length > 0 ?? true,
      lastDateAdded: null,
      form: {
        start_date: this.initialForm.start_date || null,
        end_date: this.initialForm.end_date || null,
        participations_max: this.initialForm.participations_max || 1,
        date_type: this.initialForm.date_type,
        dates: this.initialForm.dates || [],
        commitment__duration: this.initialForm.commitment__duration || '',
        commitment__time_period: this.initialForm.commitment__time_period || '',
        recurrent_description: this.initialForm.recurrent_description || '',
      },
    }
  },
  watch: {
    withSlots(newWithSlots) {
      if (newWithSlots) {
        this.autofillStartAndEndDates()
        this.$emit('change', this.form)
      } else {
        this.$emit('change', { ...this.form, dates: null })
      }
    },
    form: {
      deep: true,
      handler() {
        if (this.withSlots) {
          this.autofillStartAndEndDates()
          this.$emit('change', this.form)
        } else {
          this.$emit('change', { ...this.form, dates: null })
        }
      },
    },
  },
  methods: {
    handleShowFormAddDate() {
      this.showFormAddDate = true
      this.$nextTick(() => {
        this.$refs.inputDatePicker.$refs.datePicker.showPopover()
      })
    },
    handleAddDate() {
      const newDate = {
        date: this.$dayjs(this.selectedDate).format(),
        id: this.selectedDate,
        slots: this.$labels.slots
          .filter((slot) => this.selectedSlot.includes(slot.key))
          .map((slot) => slot.key), // On part de $labels.slots pour garder l'ordre
      }
      const elementIndex = this.form.dates.findIndex((obj) => obj.id == this.selectedDate)

      if (elementIndex != -1) {
        this.form.dates[elementIndex] = newDate
      } else {
        this.form.dates.push(newDate)
      }

      this.form.dates = this.form.dates.sort((dateA, dateB) => {
        return new Date(dateA.id) - new Date(dateB.id)
      })

      this.lastDateAdded = this.selectedDate
      this.showFormAddDate = false
      this.selectedDate = null
    },
    handleDeleteDate(dayId) {
      this.form.dates = this.form.dates.filter((day) => dayId != day.id)
    },
    async handlePopoverWillShow(calendar) {
      if (this.lastDateAdded) {
        await calendar.move(this.lastDateAdded)
      }
    },
    autofillStartAndEndDates() {
      if (!this.form.dates.length) {
        return
      }
      this.form.start_date = this.form.dates[0].id
      this.form.end_date = this.form.dates[this.form.dates.length - 1].id
    },
  },
})
</script>
