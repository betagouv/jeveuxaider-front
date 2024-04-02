<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <template v-if="isReady">
        <template v-if="modalToShow === 'unsubscibe-user'">
          <BaseAlertDialog
            icon="RiErrorWarningLine"
            title="Supprimer mon compte"
            button-label="Supprimer mon compte"
            :is-open="isOpen"
            @confirm="handleUnsubscribeUser()"
            @cancel="$emit('cancel')"
          >
            Attention, cette action est irréversible et toutes vos données de la plateforme
            JeVeuxAider.gouv.fr seront anonymisées.
          </BaseAlertDialog>
        </template>
        <template v-if="modalToShow === 'leave-structure-and-unsubscibe-user'">
          <BaseAlertDialog
            icon="RiErrorWarningLine"
            title="Supprimer mon compte"
            button-label="Supprimer mon compte"
            :is-open="isOpen"
            @confirm="handleLeaveStructureAndUnsubscribeUser()"
            @cancel="$emit('cancel')"
          >
            <div class="text-gray-700 space-y-4">
              <p>
                Vous êtes sur le point de vous désinscrire de la plateforme JeVeuxAider.gouv.fr.
              </p>
              <p>
                Vous serez retiré de l'organisation
                <span class="text-gray-700 font-semibold">{{ userStatus.structure.name }}</span
                >.
              </p>
              <p>
                Attention, cette action est irréversible et toutes vos données de la plateforme
                JeVeuxAider.gouv.fr seront anonymisées.
              </p>
            </div>
          </BaseAlertDialog>
        </template>
        <template v-if="modalToShow === 'contact-admin'">
          <BaseModal
            :is-open="isOpen"
            icon="RiErrorWarningLine"
            title="Demande de désinscription"
            :prevent-click-outside="true"
            @close="$emit('cancel')"
          >
            <div class="text-gray-700 space-y-4">
              <p>
                Vous êtes sur le point de vous désinscrire de la plateforme JeVeuxAider.gouv.fr.
              </p>
              <p>
                Cependant, vous êtes responsable de l'organisation
                <span class="text-gray-700 font-semibold">{{ userStatus.structure.name }}</span>
                et des participations
                {{ userStatus.structure_participations_i_m_responsable_count }}
                sont reliées à votre organisation.
              </p>
              <p>
                Un modérateur de JeVeuxAider.gouv.fr va être notifié de
                <span class="text-gray-700 font-semibold">votre demande de désinscription</span>
                et vous serez contacté très prochainement.
              </p>
            </div>
            <template #footer>
              <DsfrButton type="secondary" @click="$emit('cancel')"> Retour </DsfrButton>
              <DsfrButton @click.native="handleContactAdmin"> Je soumets ma demande </DsfrButton>
            </template>
          </BaseModal>
        </template>
        <template v-if="modalToShow === 'select-new-responsable-and-unsubscribe-user'">
          <BaseModal
            :is-open="isOpen"
            icon="RiErrorWarningLine"
            title="Supprimer mon compte"
            :prevent-click-outside="true"
            @close="$emit('cancel')"
          >
            <div class="space-y-4">
              <div class="text-gray-700 space-y-4">
                <p>
                  Vous êtes sur le point de vous désinscrire de la plateforme JeVeuxAider.gouv.fr.
                </p>
                <p>
                  Cependant, vous êtes responsable de l'organisation
                  <span class="text-gray-700 font-semibold">{{ userStatus.structure.name }}</span>
                  et des missions ({{ userStatus.structure_missions_where_i_m_responsable_count }})
                  sont reliées à votre compte.
                </p>
              </div>
              <form id="form" @submit.prevent="handleSetNewResponsableAndUnsubscribeUser">
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
                      userStatus.structure_responsables
                        .filter((user) => user.profile.id != $stores.auth.profile.id)
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
              <DsfrButton type="secondary" @click="$emit('cancel')"> Retour </DsfrButton>
              <DsfrButton
                :loading="loading"
                is-submit
                @click.native="handleSetNewResponsableAndUnsubscribeUser"
              >
                Supprimer mon compte
              </DsfrButton>
            </template>
          </BaseModal>
        </template>
        <template v-if="modalToShow === 'unsubscibe-organisation-and-user'">
          <BaseModal
            :is-open="isOpen"
            icon="RiErrorWarningLine"
            title="Supprimer mon compte"
            :prevent-click-outside="true"
            @close="$emit('cancel')"
          >
            <div class="text-gray-700 space-y-4">
              <p>
                Vous êtes sur le point de désinscrire
                <span class="text-gray-700 font-semibold">{{ userStatus.structure.name }}</span>
                de la plateforme JeVeuxAider.gouv.fr.
              </p>
              <p>
                Vous ne serez plus en mesure de publier de nouvelles missions de bénévolat ni de
                communiquer avec les bénévoles souhaitant s'investir au sein de votre organisation.
              </p>
              <p>
                Votre organisation sera désinscrite de la plateforme et toutes les missions en cours
                seront annulées ainsi que toutes participations des bénévoles.
              </p>
              <p>
                Si vous souhaitez ajouter un co-gestionnaire du compte de votre organisation avant
                de vous désinscrire,
                <a
                  class="text-gray-700 font-semibold underline"
                  href="https://reserve-civique.crisp.help/fr/article/comment-inviter-un-nouveau-gestionnaire-de-compte-responsable-1wm288q/"
                  target="_blank"
                >
                  c'est ici</a
                >.
              </p>
            </div>

            <template #footer>
              <DsfrButton type="secondary" @click="$emit('cancel')"> Retour </DsfrButton>
              <DsfrButton @click.native="handleUnsubscribeStructureAndUser">
                Supprimer mon compte
              </DsfrButton>
            </template>
          </BaseModal>
        </template>
      </template>
    </Teleport>
  </ClientOnly>
</template>

<script>
import { object, number } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  mixins: [FormErrors],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      isReady: false,
      userStatus: null,
      form: {},
      formSchema: object({
        responsable_id: number().nullable().required('Ce champ est requis'),
      }),
    }
  },
  created() {
    this.fetch()
  },
  computed: {
    modalToShow() {
      if (this.userStatus.structure) {
        if (
          this.userStatus.structure_missions_where_i_m_responsable_count === 0 &&
          this.userStatus.structure_responsables.length > 1
        ) {
          return 'leave-structure-and-unsubscibe-user'
        }
        if (
          this.userStatus.structure_missions_where_i_m_responsable_count > 0 &&
          this.userStatus.structure_responsables.length > 1
        ) {
          return 'select-new-responsable-and-unsubscribe-user'
        }
        if (
          this.userStatus.structure_responsables.length === 1 &&
          this.userStatus.structure_participations_count > 0
        ) {
          return 'contact-admin'
        }
        return 'unsubscibe-organisation-and-user'
      }
      return 'unsubscibe-user'
    },
  },
  methods: {
    async fetch() {
      const userStatus = await apiFetch('/user/status')
      this.userStatus = userStatus
      this.isReady = true
    },
    async handleUnsubscribeUser() {
      if (this.loading) {
        return
      }
      this.loading = true
      await apiFetch('/user/anonymize', {
        method: 'POST',
      })
        .then(() => {
          this.$stores.auth.logout()
          this.$router.push('/')
          this.$toast.success('Le compte a bien été supprimé !')
          this.$emit('close')
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false
        })
    },
    async handleContactAdmin() {
      if (this.loading) {
        return
      }
      this.loading = true
      await apiFetch(`/structures/${this.userStatus.structure.id}/ask-to-unregister`, {
        method: 'POST',
      })
        .then(() => {
          this.$emit('close')
          this.$toast.success('Une demande de désinscription a été soumise aux modérateurs')
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false
        })
    },
    async handleLeaveStructureAndUnsubscribeUser() {
      if (this.loading) {
        return
      }
      this.loading = true
      await apiFetch(
        `/structures/${this.userStatus.structure.id}/members/${this.$stores.auth.profile.id}`,
        {
          method: 'DELETE',
        }
      )
        .then(async () => {
          this.loading = false
          await this.handleUnsubscribeUser()
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false
        })
    },
    handleSetNewResponsableAndUnsubscribeUser() {
      if (this.loading) {
        return
      }
      this.loading = true
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await apiFetch(
            `/structures/${this.userStatus.structure.id}/members/${this.$stores.auth.user.id}`,
            {
              method: 'DELETE',
              body: {
                new_responsable_id: this.form.responsable_id,
              },
            }
          )
          this.loading = false
          await this.handleUnsubscribeUser()
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
    async handleUnsubscribeStructureAndUser() {
      if (this.loading) {
        return
      }
      this.loading = true
      await apiFetch(`/structures/${this.userStatus.structure.id}/unregister`, {
        method: 'POST',
      })
        .then(async () => {
          this.loading = false
          await this.handleUnsubscribeUser()
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>
