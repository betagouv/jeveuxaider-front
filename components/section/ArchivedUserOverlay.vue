<template>
  <BaseOverlay title="Compte archivé" :is-open="true" @close="onClose">
    <div>
      <div class="text-center mb-6">
        <DsfrHeading as="div" size="lg" class="mb-2 lg:mb-3">{{ title }}</DsfrHeading>
        <div class="text-cool-gray-500 text-lg lg:text-xl">
          {{ this.$stores.archivedUser.email }}
        </div>
      </div>
      <div class="mb-8">
        <template v-if="step === 'first'">
          <div class="space-y-4">
            <p>
              Votre compte est archivé car on ne vous a pas vu depuis un long moment. Souhaitez-vous
              réactiver le compte utilisateur associé à l'adresse mail
              <strong>{{ this.$stores.archivedUser.email }}</strong> ?
            </p>
            <p>
              En réactivant votre compte, vous retrouverez toutes vos informations sur votre compte
              utilisateur.
            </p>
            <p>
              Vous pouvez également choisir de vous créer un nouveau compte avec cette adresse
              email.
            </p>
          </div>
        </template>
        <template v-else-if="step === 'second'">
          <div class="space-y-4">
            <p>
              Saisissez le code de réactivation qui vous a été envoyé par email à
              <strong>{{ this.$stores.archivedUser.email }}</strong
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
                @on-change="handleOTPOnChange"
                @on-complete="handleOTPOnComplete"
              />
            </div>
          </div>
        </template>
        <template v-else-if="step === 'third'">
          <div class="space-y-4">
            <p>Votre compte a été réactivé avec succès.</p>
            <p>
              Un e-mail de réinitialisation de mot de passe vous a été envoyé à
              <strong>{{ this.$stores.archivedUser.email }}</strong
              >.
            </p>
          </div>
        </template>
      </div>
      <div>
        <template v-if="step === 'first'">
          <DsfrButton size="lg" class="w-full" @click="sendCode" :loading="loading">
            Envoyer mon code de réactivation
          </DsfrButton>
        </template>
        <template v-else-if="step === 'second'">
          <DsfrButton
            size="lg"
            class="w-full"
            @click="validateCode"
            :disabled="!isOTPCodeValid"
            :loading="loading"
          >
            Réactiver mon compte
          </DsfrButton>
        </template>
        <template v-else-if="step === 'third'">
          <DsfrButton size="lg" class="w-full" @click="onClose"> C'est compris ! </DsfrButton>
        </template>
      </div>
    </div>
  </BaseOverlay>
</template>

<script>
import VOtpInput from 'vue3-otp-input'

export default defineNuxtComponent({
  name: 'ArchivedUserOverlay',
  components: {
    VOtpInput,
  },
  data() {
    return {
      loading: false,
      step: 'first',
      isOTPCodeValid: false,
      form: {
        code: '',
      },
    }
  },
  computed: {
    title() {
      if (this.step === 'second') {
        return 'Vérification de votre compte'
      }
      if (this.step === 'third') {
        return 'Réactivation de votre compte réussie'
      }
      return 'Réactiver votre compte utilisateur'
    },
  },
  methods: {
    async sendCode() {
      this.loading = true
      await apiFetch(`/user/archive/send-code`, {
        method: 'POST',
        body: { email: this.$stores.archivedUser.email },
      })
        .then(() => {
          this.step = 'second'
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
        body: { code: this.form.code, email: this.$stores.archivedUser.email },
      })
        .then(async () => {
          await apiFetch('/password/forgot', {
            body: {
              email: this.$stores.archivedUser.email,
            },
            method: 'POST',
          })
          this.step = 'third'
        })
        .catch(() => {
          this.loading = false
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleOTPOnChange(value) {
      this.isOTPCodeValid = false
      this.form.code = value
    },
    handleOTPOnComplete(value) {
      this.form.code = value
      this.isOTPCodeValid = true
    },
    onClose() {
      this.$stores.archivedUser.hideOverlay()
    },
  },
})
</script>
