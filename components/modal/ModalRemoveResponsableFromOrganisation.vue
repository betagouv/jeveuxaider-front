<template>
  <portal to="body-end">
    <template v-if="responsable.missions_as_responsable_count > 0">
      <Modal
        v-scroll-lock="isOpen"
        :is-open="isOpen"
        theme="danger"
        :title="`Supprimer ${responsable.full_name}`"
        :prevent-click-outside="true"
        @close="$emit('cancel')"
      >
        <div class="space-y-4">
          <div class="text-sm text-gray-500 space-y-4">
            <p>
              <span class="font-semibold">{{ responsable.full_name }}</span> ne fera plus partie de l'organisation <span class="font-semibold">{{ organisation.name }}</span> et ne pourra plus gérer les missions proposées sur JeVeuxAider.gouv.fr.
            </p>
          </div>

          <form>
            <FormControl
              label="Merci de sélectionner le nouveau responsable"
              class=""
              html-for="responsable_id"
              required
              :error="errors.responsable_id"
            >
              <RadioGroup
                v-model="form.responsable_id"
                name="responsable_id"
                :options="responsables.filter((member) => member.id != responsable.id).map((member) => {return {key: member.id, label: member.full_name}})"
              />
            </FormControl>
          </form>
        </div>

        <template #footer>
          <Button class="mr-3" variant="white" @click.native="$emit('cancel')">
            Retour
          </Button>
          <Button :loading="loading" variant="red" @click.native="handleSubmitAndSetNewResponsable">
            Supprimer
          </Button>
        </template>
      </Modal>
    </template>
    <template v-else>
      <AlertDialog
        theme="danger"
        :title="`Supprimer ${ responsable.full_name }`"
        :is-open="isOpen"
        @confirm="handleSubmit"
        @close="$emit('cancel')"
        @cancel="$emit('cancel')"
      >
        <div class="text-gray-500 space-y-4 text-sm">
          <p>
            <span class="font-semibold">{{ responsable.full_name }}</span> ne fera plus partie de l'organisation <span class="font-semibold">{{ organisation.name }}</span> et ne pourra plus gérer les missions proposées sur JeVeuxAider.gouv.fr.
          </p>
        </div>
      </AlertDialog>
    </template>
  </portal>
</template>

<script>
import { number, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default {
  mixins: [FormErrors],
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    responsable: {
      type: Object,
      required: true
    },
    organisation: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      form: {},
      status: null,
      formSchema: object({
        responsable_id: number().nullable().required('Ce champ est requis')
      }),
      responsables: []
    }
  },
  async fetch () {
    const { data: responsables } = await this.$axios.get(`/structures/${this.organisation.id}/responsables`)
    this.responsables = responsables
  },
  methods: {
    async afterSubmit () {
      this.$emit('close')
      if (this.$store.getters.profile.id === this.responsable.id) {
        await this.$store.dispatch('auth/fetchUser')
        this.$router.push('/')
      } else {
        this.$emit('submitted')
      }
    },
    async handleSubmitAndSetNewResponsable () {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await this.$axios.delete(`/structures/${this.organisation.id}/members/${this.responsable.id}`, {
            data: {
              new_responsable_id: this.form.responsable_id
            }
          })
          this.afterSubmit()
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
    async handleSubmit () {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.$axios.delete(`/structures/${this.organisation.id}/members/${this.responsable.id}`)
        .then(() => {
          this.afterSubmit()
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
