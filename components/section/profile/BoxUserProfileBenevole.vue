<template>
  <BaseBox class="@container">
    <BaseHeading :level="3" class="text-black"> Vos préférences </BaseHeading>
    <div class="grid grid-cols-1 divide-y-gray-400 divide-y gap-6">
      <div class="pt-6">
        <SectionProfileCommunicationPreferences :profile="$stores.auth.profile" />
      </div>
      <div class="pt-6">
        <div class="flex space-x-4 lg:space-x-6 text-black">
          <div class="w-7 @sm:w-10 flex-none">
            <img src="/images/icons/calendar.svg" alt="" data-not-lazy />
          </div>
          <div class="flex-1">
            <div class="text-xl leading-snug font-bold text-balance">Ma disponibilité</div>
            <div class="text-base mt-2">
              <template v-if="$stores.auth.profile?.commitment">
                {{ $filters.label($stores.auth.profile.commitment, 'commitment') }}
              </template>
              <template v-else> <div class="text-[#666666] text-lg">Non renseignée</div> </template>
            </div>
            <div class="flex gap-2 flex-wrap mt-2">
              <DsfrTag v-for="(item, i) in $stores.auth.profile?.disponibilities" :key="i">
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
          <div class="w-7 @sm:w-10 flex-none">
            <img src="/images/icons/culture.svg" alt="" data-not-lazy />
          </div>
          <div class="flex-1">
            <div class="text-xl leading-snug font-bold text-balance">Mes activités favorites</div>
            <div class="flex gap-2 flex-wrap mt-2">
              <template v-if="hasActivities">
                <DsfrTag v-for="(item, i) in first3Activities" :key="i">
                  {{ item.name }}
                </DsfrTag>
                <DsfrTag v-if="hasMoreThan3Activities"
                  >+ {{ $stores.auth.profile?.activities?.length - 3 }}</DsfrTag
                >
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
export default defineNuxtComponent({
  data() {
    return {
      loading: false,
      form: _cloneDeep(this.$stores.auth.profile),
    }
  },
  computed: {
    hasActivities() {
      return this.$stores.auth.profile?.activities?.length > 0
    },
    hasMoreThan3Activities() {
      return this.$stores.auth.profile?.activities?.length > 3
    },
    first3Activities() {
      return this.$stores.auth.profile?.activities?.slice(0, 3)
    },
    hasParticipations() {
      return this.$stores.auth.user.statistics?.participations_count
    },
  },
})
</script>
