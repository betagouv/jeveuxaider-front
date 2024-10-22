<template>
  <BaseOverlay :is-open="$stores.userAlert.showOverlay" @close="onClose">
    <SoftGateEmail v-if="step == 'email'" @login="goToLogin" @register="goToRegister" />
    <SoftGateLogin v-if="step == 'login'" :datas="datas" @next="step == 'alert'" />
    <SoftGateRegister v-if="step == 'register'" :datas="datas" @next="step == 'alert'" />
    <UserAlertStepForm v-if="step == 'alert'" @next="handleNextFormAlert" />
    <template #footer>
      <div class="text-center text-white mt-4">Vous pouvez la désactiver à tout moment.</div>
    </template>
  </BaseOverlay>
</template>

<script>
import SoftGateEmail from '@/components/section/soft-gate/Email.vue'
import SoftGateLogin from '@/components/section/soft-gate/Login.vue'
import SoftGateRegister from '@/components/section/soft-gate/Register.vue'
import UserAlertStepForm from '@/components/section/user-alert/StepForm.vue'

export default defineNuxtComponent({
  name: 'UserAlertOverlay',
  components: {
    SoftGateEmail,
    SoftGateLogin,
    SoftGateRegister,
    UserAlertStepForm,
  },
  data() {
    return {
      datas: null,
      step: 'email',
    }
  },
  created() {
    this.step = this.firstStepResolver()
  },
  methods: {
    firstStepResolver() {
      if (!this.$stores.auth.isLogged) {
        return 'email'
      }
      return 'alert'
    },
    goToLogin(datas) {
      this.step = 'login'
      this.datas = datas
    },
    goToRegister(datas) {
      this.step = 'register'
      this.datas = datas
    },
    handleNextFormAlert() {
      this.$stores.userAlert.closeOverlay()
    },
    onClose() {
      this.$stores.userAlert.closeOverlay()
    },
  },
})
</script>
