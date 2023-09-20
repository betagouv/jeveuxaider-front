<template>
  <BaseBox padding="sm">
    <div class="grid grid-cols-1 divide-y-gray-400 divide-y gap-6 lg:gap-8">
      <BaseHeading :level="3" class="text-black"> Votre profil bénévole </BaseHeading>
      <div class="pt-6 lg:pt-8">
        <div class="flex space-x-4 lg:space-x-6 text-black">
          <div class="w-[40px]">
            <img src="/images/icons/human-cooperation.svg" alt="" class="flex-none" data-not-lazy />
          </div>
          <div class="flex-1">
            <div class="text-xl text-black font-bold">
              <template v-if="hasParticipations">
                <nuxt-link to="/profile/missions" class="flex justify-between items-center group">
                  <span class="group-hover:underline">
                    {{
                      $filters.pluralize(
                        $stores.auth.user.statistics?.participations_count,
                        'mission',
                        'missions'
                      )
                    }}</span
                  >
                  <RiArrowRightSLine class="h-5 group-hover:h-6 transition-all" />
                </nuxt-link>
              </template>
              <template v-else> Aucune mission </template>
            </div>
          </div>
        </div>
      </div>
      <div class="pt-6 lg:pt-8">
        <div class="flex space-x-4 lg:space-x-6 text-black">
          <div class="w-[40px]">
            <img src="/images/icons/send-mail.svg" alt="" class="flex-none" data-not-lazy />
          </div>
          <div class="flex-1">
            <div class="text-xl font-bold">Recevoir des propositions</div>
            <div class="flex items-center space-x-6 mt-4">
              <div class="flex-1 text-lg">Recevez par e-mail des suggestions de missions</div>
              <BaseToggle
                v-model="form.is_visible"
                @checked="handleProfileVisible()"
                @unchecked="handleProfileInvisible()"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="pt-6 lg:pt-8">
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
              <template v-else> Non renseignée </template>
            </div>
            <div class="flex gap-3 flex-wrap my-4">
              <DsfrTag v-for="(item, i) in profile.disponibilities" :key="i">
                {{ $filters.label(item, 'disponibilities') }}
              </DsfrTag>
            </div>
            <BaseLink to="/profile/preferences" icon="RiArrowRightSLine" class="text-sm">
              Modifier
            </BaseLink>
          </div>
        </div>
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
