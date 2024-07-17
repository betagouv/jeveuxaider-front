<template>
  <div class="flex gap-4 @sm:gap-6 text-black">
    <div class="w-7 @sm:w-10 flex-none">
      <img src="/images/icons/mail-send.svg" alt="" class="" data-not-lazy />
    </div>
    <div class="flex-1">
      <div class="text-xl leading-snug font-bold text-balance">
        J’accepte d’être contacté par des organisations
      </div>
      <div class="flex flex-wrap @sm:flex-nowrap items-start gap-6 mt-2">
        <div class="@sm:flex-1">
          <div class="text-base text-balance @sm:text-wrap">
            Elles vous enverront des propositions de missions
          </div>
          <div class="text-sm text-[#666666] mt-1">(5 par mois maximum !)</div>
        </div>
        <BaseToggle
          v-model="form.is_visible"
          @checked="handleProfileVisible()"
          @unchecked="handleProfileInvisible()"
          :button-labels="{ on: 'Oui', off: 'non' }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification'

export default defineNuxtComponent({
  props: {
    profile: { type: Object, required: true },
  },
  data() {
    return {
      loading: false,
      form: _cloneDeep(this.profile),
    }
  },
  methods: {
    async handleProfileVisible() {
      await apiFetch('/user/visible', {
        method: 'POST',
      })
        .then(async () => {
          await this.$stores.auth.fetchUser()
          const toast = useToast()
          toast.success('Votre profil est visible !')
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false
        })
    },
    async handleProfileInvisible() {
      await apiFetch('/user/invisible', {
        method: 'POST',
      })
        .then(async () => {
          await this.$stores.auth.fetchUser()
          const toast = useToast()
          toast.success('Votre profil est invisible !')
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>
