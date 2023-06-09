<template>
  <Box padding="sm">
    <div class="grid grid-cols-1 divide-y-gray-400 divide-y gap-6 lg:gap-8">
      <Heading :level="3" class="text-black">
        Votre profil bénévole
      </Heading>
      <div class="pt-6 lg:pt-8">
        <div class="flex space-x-4 lg:space-x-6 text-black">
          <div class="w-[40px]">
            <img
              src="/images/icons/human-cooperation.svg"
              alt=""
              class="flex-none"
              data-not-lazy
            >
          </div>
          <div class="flex-1">
            <div class="text-xl text-black font-bold">
              <template v-if="hasParticipations">
                <nuxt-link to="/profile/missions" class="flex justify-between items-center group">
                  <span class="group-hover:underline">
                    {{ $store.state.auth.user.statistics?.participations_count|pluralize('mission', 'missions') }}</span>
                  <RiArrowRightSLine class="h-4 group-hover:h-5 transition-all" />
                </nuxt-link>
              </template>
              <template v-else>
                Aucune mission
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="pt-6 lg:pt-8">
        <div class="flex space-x-4 lg:space-x-6 text-black">
          <div class="w-[40px]">
            <img
              src="/images/icons/send-mail.svg"
              alt=""
              class="flex-none"
              data-not-lazy
            >
          </div>
          <div class="flex-1">
            <div class="text-xl font-bold">
              Recevoir des propositions
            </div>
            <div class="flex items-center space-x-6 mt-4">
              <div class="flex-1 text-lg">
                Recevez par e-mail des suggestions de missions
              </div>
              <Toggle
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
            <img
              src="/images/icons/calendar.svg"
              alt=""
              class="flex-none"
              data-not-lazy
            >
          </div>
          <div class="flex-1">
            <div class="text-xl font-bold">
              Ma disponibilité
            </div>
            <div class="text-lg mt-4">
              <template v-if="profile.commitment__duration">
                {{ commitmentLabel }}
              </template>
              <template v-else>
                Non renseignée
              </template>
            </div>
            <div class="flex gap-3 flex-wrap my-4">
              <Tag v-for="(item,i) in profile.disponibilities" :key="i">
                {{ $options.filters.label(item,'disponibilities') }}
              </Tag>
            </div>
            <Link to="/profile/preferences" icon="ChevronRightIcon" class="text-sm">
              Modifier
            </Link>
          </div>
        </div>
      </div>
    </div>
  </Box>
</template>

<script>
import { cloneDeep } from 'lodash'
import Tag from '@/components/dsfr/Tag.vue'

export default {
  components: {
    Tag
  },
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      form: cloneDeep(this.profile)
    }
  },
  computed: {
    hasParticipations () {
      return this.$store.state.auth.user.statistics?.participations_count
    },
    commitmentLabel () {
      if (this.profile.commitment__time_period) {
        return `${this.$options.filters.label(this.profile.commitment__duration, 'duration')} par ${this.$options.filters.label(this.profile.commitment__time_period, 'time_period')}`
      }
      return this.$options.filters.label(this.profile.commitment__duration, 'duration')
    }
  },
  methods: {
    async handleProfileVisible () {
      await this.$axios.post('/user/visible')
        .then(async () => {
          await this.$store.dispatch('auth/fetchUser')
          this.$toast.success('Votre profil est visible !')
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false
        })
    },
    async handleProfileInvisible () {
      await this.$axios.post('/user/invisible')
        .then(async () => {
          await this.$store.dispatch('auth/fetchUser')
          this.$toast.success('Votre profil est invisible !')
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style>

</style>
