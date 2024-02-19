<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <template v-if="responsable.missions_count > 0">
        <BaseModal
          :is-open="isOpen"
          icon="RiErrorWarningLine"
          :title="`Supprimer ${responsable.full_name}`"
          :prevent-click-outside="true"
          @close="$emit('cancel')"
        >
          <div class="space-y-4">
            <p>
              <span class="font-semibold">{{ responsable.full_name }}</span>
              ne fera plus partie de l'organisation
              <span class="font-semibold">{{ organisation.name }}</span> et ne pourra plus gérer les
              missions proposées sur JeVeuxAider.gouv.fr.
            </p>

            <form>
              <BaseFormControl
                label="Merci de sélectionner le nouveau responsable"
                html-for="responsable_id"
                required
                :error="errors.responsable_id"
              >
                <BaseRadioGroup
                  v-model="form.responsable_id"
                  name="responsable_id"
                  :options="
                    responsables
                      .filter((user) => user.profile.id != responsable.id)
                      .map((user) => {
                        return {
                          key: user.profile.id,
                          label: user.profile.full_name,
                        }
                      })
                  "
                />
              </BaseFormControl>
            </form>
          </div>

          <template #footer>
            <DsfrButton type="secondary" @click.native="$emit('cancel')"> Retour </DsfrButton>
            <DsfrButton :loading="loading" @click.native="handleSubmitAndSetNewResponsable">
              Supprimer
            </DsfrButton>
          </template>
        </BaseModal>
      </template>
      <template v-else>
        <BaseAlertDialog
          icon="RiErrorWarningLine"
          :title="`Supprimer ${responsable.full_name}`"
          :is-open="isOpen"
          @confirm="handleSubmit"
          @close="$emit('cancel')"
          @cancel="$emit('cancel')"
        >
          <p>
            <span class="font-semibold">{{ responsable.full_name }}</span> ne fera plus partie de
            l'organisation <span class="font-semibold">{{ organisation.name }}</span> et ne pourra
            plus gérer les missions proposées sur JeVeuxAider.gouv.fr.
          </p>
        </BaseAlertDialog>
      </template>
    </Teleport>
  </ClientOnly>
</template>

<script>
import { number, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  mixins: [FormErrors],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    responsable: {
      type: Object,
      required: true,
    },
    organisation: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      form: {},
      status: null,
      formSchema: object({
        responsable_id: number().nullable().required('Ce champ est requis'),
      }),
      responsables: [],
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const responsables = await apiFetch(`/structures/${this.organisation.id}/responsables`)
      this.responsables = responsables
    },
    async afterSubmit() {
      this.$emit('close')
      if (this.$stores.auth.profile.id === this.responsable.id) {
        await this.$stores.auth.fetchUser()
        this.$router.push('/')
      } else {
        this.$emit('submitted')
      }
    },
    async handleSubmitAndSetNewResponsable() {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await apiFetch(
            `/structures/${this.organisation.id}/members/${this.responsable.user_id}`,
            {
              method: 'DELETE',
              body: {
                new_responsable_id: this.form.responsable_id,
              },
            }
          )
          this.afterSubmit()
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
    async handleSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      await apiFetch(`/structures/${this.organisation.id}/members/${this.responsable.user_id}`, {
        method: 'DELETE',
      })
        .then(() => {
          this.afterSubmit()
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>
