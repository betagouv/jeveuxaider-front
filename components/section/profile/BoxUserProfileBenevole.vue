<template>
  <BaseBox>
    <BaseHeading :level="3" class="text-black"> Vos préférences </BaseHeading>
    <div class="grid grid-cols-1 divide-y-gray-400 divide-y gap-6">
      <div class="pt-6">
        <div class="flex space-x-4 lg:space-x-6 text-black">
          <div class="w-[40px]">
            <img src="/images/icons/mail-send.svg" alt="" class="flex-none" data-not-lazy />
          </div>
          <div class="flex-1">
            <div class="text-xl font-bold">
              J’accepte d’être contacté<br />
              par des organisations
            </div>
            <div class="flex items-center space-x-6 mt-2">
              <div class="flex-1">
                <div class="text-lg">Elles vous enverront des propositions de missions</div>
                <div class="text-sm text-[#666666]">(5 par mois maximum !)</div>
              </div>
              <BaseToggle
                v-model="form.is_visible"
                @checked="handleProfileVisible()"
                @unchecked="handleProfileInvisible()"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="pt-6">
        <div class="flex space-x-4 lg:space-x-6 text-black">
          <div class="w-[40px]">
            <img src="/images/icons/calendar.svg" alt="" class="flex-none" data-not-lazy />
          </div>
          <div class="flex-1">
            <div class="text-xl font-bold">Ma disponibilité</div>
            <div class="text-lg mt-4">
              <template v-if="profile.commitment__duration">
                {{ commitmentLabel }}
              </template>
              <template v-else> <div class="text-[#666666] text-lg">Non renseignée</div> </template>
            </div>
            <div class="flex gap-3 flex-wrap mt-4">
              <DsfrTag v-for="(item, i) in profile.disponibilities" :key="i">
                {{ $filters.label(item, 'disponibilities') }}
              </DsfrTag>
            </div>
            <!-- <DsfrLink to="/profile/preferences" icon="RiArrowRightSLine" class="text-sm">
              Modifier
            </DsfrLink> -->
          </div>
        </div>
      </div>
      <div class="pt-6">
        <div class="flex space-x-4 lg:space-x-6 text-black">
          <div class="w-[40px]">
            <img src="/images/icons/culture.svg" alt="" class="flex-none" data-not-lazy />
          </div>
          <div class="flex-1">
            <div class="text-xl font-bold">Mes activités favorites</div>
            <div class="flex gap-3 flex-wrap mt-4">
              <template v-if="profile?.activities?.length > 0">
                <DsfrTag v-for="(item, i) in profile.activities" :key="i">
                  {{ item.name }}
                </DsfrTag>
              </template>
              <template v-else> <div class="text-[#666666] text-lg">Non renseignée</div> </template>
            </div>
            <!-- <DsfrLink to="/profile/preferences" icon="RiArrowRightSLine" class="text-sm">
              Modifier
            </DsfrLink> -->
          </div>
        </div>
      </div>
      <div class="pt-6">
        <nuxt-link to="/profile/preferences">
          <DsfrButton type="secondary">Modifier mes préférences</DsfrButton>
        </nuxt-link>
      </div>
    </div>
  </BaseBox>
</template>

<script>
import { useToast } from 'vue-toastification'

export default defineNuxtComponent({
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      form: _cloneDeep(this.profile),
    }
  },
  computed: {
    hasParticipations() {
      return this.$stores.auth.user.statistics?.participations_count
    },
    commitmentLabel() {
      if (this.profile.commitment__time_period) {
        return `${this.$filters.label(
          this.profile.commitment__duration,
          'duration'
        )} par ${this.$filters.label(this.profile.commitment__time_period, 'time_period')}`
      }
      return this.$filters.label(this.profile.commitment__duration, 'duration')
    },
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
