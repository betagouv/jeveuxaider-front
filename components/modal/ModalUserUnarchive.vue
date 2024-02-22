<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :is-open="isOpen"
        :icon="modalIcon"
        :title="modalTitle"
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
            <div class="flex justify-center">
              <v-otp-input
                ref="otpInput"
                v-model:value="form.code"
                input-classes="m-2 h-12 lg:h-16 w-8 lg:w-12 bg-gray-100 border-gray-300 text-center rounded text-black"
                separator=""
                :num-inputs="6"
                :should-auto-focus="true"
                input-type="letter-numeric"
                :placeholder="['*', '*', '*', '*', '*', '*']"
                @on-change="handleOnChange"
                @on-complete="handleOnComplete"
              />
            </div>
          </div>
        </template>
        <template v-else-if="step === 'success'">
          <div class="space-y-4">
            <p>Votre compte a été réactivé avec succès.</p>
            <p>
              Un e-mail de réinitialisation de mot de passe vous a été envoyé à
              <strong>{{ email }}</strong
              >.
            </p>
          </div>
        </template>
        <template #footer>
          <template v-if="step === 'question'">
            <DsfrButton @click="sendCode" :loading="loading">
              Envoyer mon code de réactivation
            </DsfrButton>
          </template>
          <template v-else-if="step === 'code'">
            <DsfrButton @click="validateCode" :disabled="!isCodeValid" :loading="loading">
              Réactiver mon compte
            </DsfrButton>
          </template>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
import VOtpInput from 'vue3-otp-input'

export default defineNuxtComponent({
  emits: ['cancel', 'create-new-account'],
  components: { VOtpInput },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true,
    },
    sendForgotPassword: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: false,
      step: 'question',
      isCodeValid: false,
      form: {
        code: '',
      },
    }
  },
  computed: {
    modalIcon() {
      if (this.step === 'code') {
        return 'RiLockLine'
      }
      if (this.step === 'success') {
        return 'RiCheckLine'
      }
      return 'RiErrorWarningLine'
    },
    modalTitle() {
      if (this.step === 'code') {
        return 'Code de réactivation'
      }
      if (this.step === 'success') {
        return 'Réactivation réussie'
      }
      return 'Réactiver votre compte utilisateur'
    },
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
    async validateCode() {
      this.loading = true
      await apiFetch(`/user/archive/validate-code`, {
        method: 'POST',
        body: { code: this.form.code, email: this.email },
      })
        .then(async () => {
          if (this.sendForgotPassword) {
            await apiFetch('/password/forgot', {
              body: {
                email: this.email,
              },
              method: 'POST',
            })
          }
          this.step = 'success'
        })
        .catch(() => {
          this.loading = false
        })
        .finally(() => {
          this.loading = false
        })
    },
    goToLogin() {
      this.$emit('cancel')
      this.$router.push(`/login?email=${this.email}`)
    },
    handleOnChange(value) {
      this.isCodeValid = false
      this.form.code = value
    },
    handleOnComplete(value) {
      this.form.code = value
      this.isCodeValid = true
    },
  },
})
</script>
