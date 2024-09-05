<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :is-open="isOpen"
        title="Ajouter un responsable"
        :prevent-click-outside="true"
        @close="$emit('cancel')"
      >
        <form
          id="form-mission-add-responsable"
          @submit.prevent="handleSubmit"
          class="py-6 space-y-6"
        >
          <DsfrFormControl
            label="Responsable"
            html-for="responsable_id"
            :error="errors.responsable_id"
            info=""
            required
          >
            <DsfrSelect
              name="responsable_id"
              v-model="form.responsable_id"
              placeholder="Sélectionner un responsable"
              :options="selectableResponsables"
              required
            />
          </DsfrFormControl>
        </form>

        <template #footer>
          <DsfrButton type="secondary" @click="$emit('cancel')"> Annuler </DsfrButton>
          <DsfrButton is-submit form="form-mission-add-responsable"> Ajouter </DsfrButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
import FormErrors from '@/mixins/form/errors'
import { string, object, number } from 'yup'

export default defineNuxtComponent({
  emits: ['submit', 'cancel'],
  mixins: [FormErrors],
  components: {},
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    responsables: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      form: {
        responsable_id: null,
      },
      formSchema: object({
        responsable_id: number().required('Vous devez sélectionner un responsable'),
      }),
    }
  },
  computed: {
    selectedResponsable() {
      return this.$stores.formMission.mission.structure.members.find(
        (member) => member.profile.id == this.form.responsable_id
      )?.profile
    },
    selectableResponsables() {
      const responsablesIds = this.responsables.map((responsable) => responsable.id)
      return this.$stores.formMission.mission.structure.members
        .filter((member) => !responsablesIds.includes(member.profile.id))
        .map((member) => ({
          key: member.profile.id,
          label: member.profile.full_name,
        }))
    },
  },
  methods: {
    handleSubmit() {
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          this.$emit('submit', this.selectedResponsable)
          this.$emit('cancel')
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
    },
  },
})
</script>
