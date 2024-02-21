<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :is-open="isOpen"
        icon="RiErrorWarningLine"
        title="Réactiver votre compte utilisateur"
        :prevent-click-outside="true"
        @close="$emit('cancel')"
      >
        <template v-if="step === 'question'">
          <div class="space-y-4">
            <p>
              Souhaitez-vous réactiver le compte utilisateur associé à l'adresse mail
              <strong>{{ email }}</strong> ?
            </p>
            <p>
              En réactivant votre compte, vous retrouverez toutes vos informations sur votre compte
              utilisateur.
            </p>
          </div>
        </template>
        <template v-else-if="step === 'code'">
          <div class="space-y-4">
            <p>
              Un code de réactivation vous a été envoyé par email à l'adresse mail
              <strong>{{ email }}</strong
              >.
            </p>
            <p>FORM CODE</p>
          </div>
        </template>
        <template v-else-if="step === 'success'">
          <div class="space-y-4">
            <p>
              Votre compte a été réactivé avec succès. Vous pouvez maintenant vous connecter avec
              <strong>{{ email }}</strong
              >.
            </p>
          </div>
        </template>
        <template #footer>
          <template v-if="step === 'question'">
            <DsfrButton type="secondary" @click="$emit('create-new-account')">
              Non, je créé un nouveau compte
            </DsfrButton>
            <DsfrButton @click="sendCode" :loading="loading">
              Oui, je réactive mon compte
            </DsfrButton>
          </template>
          <template v-else-if="step === 'code'">
            <DsfrButton @click="validateCode"> Réactiver mon compte </DsfrButton>
          </template>
          <template v-else-if="step === 'success'">
            <DsfrButton @click="$router.push(`login?email=${email}`)"> Je me connecte </DsfrButton>
          </template>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
export default defineNuxtComponent({
  emits: ['cancel', 'create-new-account'],
  components: {},
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      step: 'question',
      form: {
        code: '',
      },
    }
  },
  methods: {
    async sendCode() {
      this.loading = true
      await apiFetch(`/user/archive/send-code`, {
        method: 'POST',
        body: { email: this.email },
      })
        .then(() => {
          this.step = 'code'
        })
        .catch(() => {
          this.loading = false
        })
        .finally(() => {
          this.loading = false
        })
    },
    validateCode() {
      console.log('validateCode')
      this.step = 'success'
    },
  },
})
</script>
