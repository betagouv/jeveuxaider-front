<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :is-open="isOpen"
        title="Ajouter des dates"
        :prevent-click-outside="true"
        @close="$emit('cancel')"
      >
        <form id="form-mission-add-dates" @submit.prevent="handleSubmit" class="space-y-6">
          <DsfrFormControl label="Date" html-for="date" :error="errors.date" required>
            <DsfrInput type="date" v-model="form.date" name="date" />
          </DsfrFormControl>

          <DsfrFormControl
            label="Choisissez les créneaux pour cette date"
            html-for="creneaux"
            required
          >
            <DsfrTagsGroup v-model="form.slots" name="slots" :options="$labels.slots" />
          </DsfrFormControl>
        </form>

        <template #footer>
          <DsfrButton type="secondary" @click="$emit('cancel')"> Annuler </DsfrButton>
          <DsfrButton is-submit form="form-mission-add-dates"> Ajouter </DsfrButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  mixins: [FormErrors],
  components: {},
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        date: this.$dayjs().format('YYYY-MM-DD'),
        slots: [],
      },
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', {
        id: this.$dayjs(this.form.date).utc().format('YYYY-MM-DDTHH:mm:ssZ'),
        date: this.$dayjs(this.form.date).format('YYYY-MM-DDTHH:mm:ssZ'),
        slots: this.form.slots,
      })
      this.$emit('cancel')
    },
  },
})
</script>
