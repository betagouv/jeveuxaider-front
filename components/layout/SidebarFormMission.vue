<template>
  <div class="flex flex-col bg-[#F9F6F2] h-full">
    <div
      v-if="mission"
      id="sidebar-content"
      class="py-10 px-8 overflow-y-auto overflow-x-hidden h-full custom-scrollbar-gray"
    >
      <div class="space-y-10">
        <div class="space-y-4">
          <h3 class="text-sm font-bold uppercase text-[#666666]">Description</h3>
          <CustomMissionPreviewItem
            id="admin-missions-id-title"
            title="Titre"
            :is-current="$route.name === 'admin-missions-id-title'"
            :is-completed="$stores.formMission.isStepTitleCompleted"
            @next="$router.push(`/admin/missions/${mission.id}/title`)"
          >
            {{ mission.name ?? 'Titre à définir' }}
          </CustomMissionPreviewItem>
          <CustomMissionPreviewItem
            id="admin-missions-id-visuel"
            title="Visuel"
            :is-current="$route.name === 'admin-missions-id-visuel'"
            :is-completed="$stores.formMission.isStepVisuelCompleted"
            :is-disabled="!$stores.formMission.isStepTitleCompleted"
            @next="$router.push(`/admin/missions/${mission.id}/visuel`)"
          >
            <div class="">
              <NuxtImg
                ref="thumbnail"
                v-if="thumbnail && mission.domaine_id"
                src="/images/card-thumbnail-default.jpg"
                :srcset="thumbnail"
                :alt="$filters.label(mission.domaine_id, 'domaines')?.toString()"
                class="w-full h-full object-cover"
                width="300"
                height="143"
                @error="onImgError"
              />
            </div>
          </CustomMissionPreviewItem>
          <CustomMissionPreviewItem
            id="admin-missions-id-informations"
            title="Informations"
            :is-current="$route.name === 'admin-missions-id-informations'"
            :is-completed="$stores.formMission.isStepInformationsCompleted"
            :is-disabled="!$stores.formMission.isStepVisuelCompleted"
            @next="$router.push(`/admin/missions/${mission.id}/informations`)"
          >
            Présentation de la mission et 3 autres informations
          </CustomMissionPreviewItem>
        </div>
        <div class="space-y-4">
          <h3 class="text-sm font-bold uppercase text-[#666666]">Dates et fréquences</h3>
          <CustomMissionPreviewItem
            id="admin-missions-id-dates"
            :title="titleBoxDateType"
            :is-current="$route.name === 'admin-missions-id-dates'"
            :is-completed="$stores.formMission.isStepDatesCompleted"
            :is-warning="$stores.formMission.isStepDatesWarning"
            :is-disabled="!$stores.formMission.isStepInformationsCompleted"
            @next="$router.push(`/admin/missions/${mission.id}/dates`)"
          >
            <template v-if="mission.date_type">
              <template v-if="hasDates">
                {{ formattedDates }} <br />
                <template v-if="nextDates">
                  {{ $filters.pluralize(nextDates.length, 'date') }} à venir</template
                >
                <template v-else> Aucune date à venir</template>
              </template>
              <template v-else> {{ formattedDates }}</template>
            </template>
            <template v-else>À définir</template>
          </CustomMissionPreviewItem>
        </div>
        <div class="space-y-4">
          <h3 class="text-sm font-bold uppercase text-[#666666]">Lieux</h3>
          <CustomMissionPreviewItem
            id="admin-missions-id-lieux"
            :title="titleBoxLieux"
            :is-current="$route.name === 'admin-missions-id-lieux'"
            :is-completed="$stores.formMission.isStepLieuxCompleted"
            :is-disabled="!$stores.formMission.isStepDatesCompleted"
            @next="$router.push(`/admin/missions/${mission.id}/lieux`)"
          >
            <template v-if="mission.type">
              <template v-if="mission.type === 'Mission à distance'"> Mission à distance </template>
              <template v-if="mission.type === 'Mission en présentiel' && !mission.is_autonomy">
                {{ mission.full_address }}
              </template>
              <template v-if="mission.autonomy_zips && mission.autonomy_zips.length > 0">
                {{ $filters.pluralize(mission.autonomy_zips.length, 'lieu', 'lieux') }}
              </template>
            </template>
            <template v-else>À définir</template>
          </CustomMissionPreviewItem>
        </div>
        <div class="space-y-4">
          <h3 class="text-sm font-bold uppercase text-[#666666]">Bénévoles</h3>
          <CustomMissionPreviewItem
            id="admin-missions-id-benevoles"
            title="Information sur les places"
            :is-current="$route.name === 'admin-missions-id-benevoles'"
            :is-completed="$stores.formMission.isStepBenevolesCompleted"
            :is-warning="$stores.formMission.isStepBenevolesWarning"
            :is-disabled="!$stores.formMission.isStepLieuxCompleted"
            @next="$router.push(`/admin/missions/${mission.id}/benevoles`)"
          >
            <template v-if="mission.participations_max">
              {{
                $filters.pluralize(
                  mission.participations_max,
                  'bénévole recherché',
                  'bénévoles recherchés'
                )
              }}
              <template v-if="mission.state === 'Validée'">
                {{ $filters.pluralize(mission.places_left, 'place restante', 'places restantes') }}
              </template>
            </template>
            <template v-else>À définir</template>
          </CustomMissionPreviewItem>
          <CustomMissionPreviewItem
            id="admin-missions-id-benevoles-informations"
            title="Informations sur les bénévoles"
            :is-current="$route.name === 'admin-missions-id-benevoles-informations'"
            :is-completed="$stores.formMission.isStepBenevolesInformationsCompleted"
            :is-disabled="!$stores.formMission.isStepBenevolesCompleted"
            @next="$router.push(`/admin/missions/${mission.id}/benevoles-informations`)"
          >
            <div>
              <template v-if="mission.prerequisites">
                {{ mission.prerequisites.length }} pré-requis
              </template>
              <template v-else>Aucun prérequis</template>
            </div>
            <div>
              {{
                benevolesInfosItemsCount > 0
                  ? $filters.pluralize(benevolesInfosItemsCount, 'information')
                  : 'À définir'
              }}
            </div>
          </CustomMissionPreviewItem>
        </div>
        <div class="space-y-4">
          <h3 class="text-sm font-bold uppercase text-[#666666]">Responsables</h3>
          <CustomMissionPreviewItem
            id="admin-missions-id-responsables"
            :is-current="$route.name === 'admin-missions-id-responsables'"
            :is-completed="$stores.formMission.isStepResponsablesCompleted"
            :is-disabled="!$stores.formMission.isStepBenevolesInformationsCompleted"
            @next="$router.push(`/admin/missions/${mission.id}/responsables`)"
          >
            <template v-if="mission.responsables.length > 0">
              <div class="space-y-4">
                <div
                  class="flex items-center"
                  v-for="responsable in mission.responsables"
                  :key="responsable.id"
                >
                  <BaseAvatar
                    :img-srcset="responsable.avatar ? responsable.avatar.urls.thumbMedium : null"
                    :img-src="responsable.avatar ? responsable.avatar.urls.original : null"
                    :initials="responsable.short_name"
                    size="sm"
                    class="mr-4"
                  />
                  <div class="truncate font-bold">{{ responsable.full_name }}</div>
                </div>
              </div>
            </template>
            <template v-else>À définir</template>
          </CustomMissionPreviewItem>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="p-8">
        <h3 class="text-xl font-bold mb-4">Titre todo</h3>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam eligendi officiis
          inventore deleniti, fugiat consequatur esse tempora reiciendis. Nemo iste, reiciendis
          labore cum tempore ad alias sunt est repellat nisi.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MixinMission from '@/mixins/mission'

export default defineNuxtComponent({
  mixins: [MixinMission],
  props: {},
  data() {
    return {
      mission: null,
    }
  },
  watch: {
    '$route.name': {
      async handler(newVal, oldVal) {
        this.scrollIntoView(newVal)
      },
    },
  },
  mounted() {
    this.scrollIntoView(this.$route.name)
  },
  watch: {
    '$stores.formMission.mission': {
      handler(newVal) {
        if (!newVal) {
          this.mission = null
        } else {
          this.mission = { ...newVal }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    benevolesInfosItemsCount() {
      let count = 0
      if (this.mission?.publics_volontaires?.length > 0) count++
      if (this.mission?.skills?.length > 0) count++
      if (this.mission?.is_snu_mig_compatible) count++
      if (this.mission?.is_motivation_required) count++
      return count
    },
    titleBoxLieux() {
      if (!this.mission?.type) return 'En présentiel ou à distance'
      return this.mission?.type === 'Mission à distance' ? 'À distance' : 'En présentiel'
    },
    titleBoxDateType() {
      if (!this.mission?.date_type) return 'Ponctuelle ou régulière'
      return this.mission?.date_type === 'ponctual' ? 'Ponctuelle' : 'Régulière'
    },
  },
  methods: {
    scrollIntoView(id) {
      this.$scrollTo(`#${id}`, 300, {
        container: '#sidebar-content',
        offset: -75,
      })
    },
    onImgError() {
      this.$refs.thumbnail.$el.srcset =
        '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
    },
  },
})
</script>
