<template>
  <aside class="flex flex-col bg-[#F9F6F2] h-full">
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
            :is-disabled="!$stores.formMission.isStepTitleCompleted && $stores.formMission.isDraft"
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
            :is-disabled="!$stores.formMission.isStepVisuelCompleted && $stores.formMission.isDraft"
            @next="$router.push(`/admin/missions/${mission.id}/informations`)"
          >
            <span v-if="$stores.formMission.isStepInformationsCompleted === false">À définir</span>
            <!-- @todo -->
            <span v-else>Présentation de la mission et 3 autres informations</span>
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
            :is-disabled="
              !$stores.formMission.isStepInformationsCompleted && $stores.formMission.isDraft
            "
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
            :is-disabled="!$stores.formMission.isStepDatesCompleted && $stores.formMission.isDraft"
            @next="$router.push(`/admin/missions/${mission.id}/lieux`)"
          >
            <template v-if="mission.type">
              <template v-if="mission.type === 'Mission à distance'"> Mission à distance </template>
              <template v-else-if="mission.addresses?.length > 0">
                <div>{{ mission.addresses[0].label }}</div>
                <div v-if="mission.addresses?.length > 1">
                  Et
                  {{
                    $filters.pluralize(
                      mission.addresses?.length - 1,
                      'autre adresse',
                      'autres adresses'
                    )
                  }}
                </div>
              </template>
              <template v-else>À définir</template>
            </template>
            <template v-else>À définir</template>
          </CustomMissionPreviewItem>
        </div>
        <div class="space-y-4">
          <h3 class="text-sm font-bold uppercase text-[#666666]">Bénévoles</h3>
          <CustomMissionPreviewItem
            id="admin-missions-id-benevoles"
            :title="
              $stores.formMission.isStepBenevolesCompleted
                ? $filters.pluralize(
                    mission.participations_max,
                    'bénévole recherché',
                    'bénévoles recherchés'
                  )
                : 'Nombre de bénévoles recherchés'
            "
            :is-current="$route.name === 'admin-missions-id-benevoles'"
            :is-completed="$stores.formMission.isStepBenevolesCompleted"
            :is-warning="$stores.formMission.isStepBenevolesWarning"
            :is-disabled="!$stores.formMission.isStepLieuxCompleted && $stores.formMission.isDraft"
            @next="$router.push(`/admin/missions/${mission.id}/benevoles`)"
          >
            <template v-if="mission.participations_max">
              {{ $filters.pluralize(mission.places_left, 'place restante', 'places restantes') }}
            </template>
            <template v-else>À définir</template>
          </CustomMissionPreviewItem>
          <CustomMissionPreviewItem
            id="admin-missions-id-benevoles-informations"
            title="Informations sur les bénévoles"
            :is-current="$route.name === 'admin-missions-id-benevoles-informations'"
            :is-completed="$stores.formMission.isStepBenevolesInformationsCompleted"
            :is-disabled="
              !$stores.formMission.isStepBenevolesCompleted && $stores.formMission.isDraft
            "
            @next="$router.push(`/admin/missions/${mission.id}/benevoles-informations`)"
          >
            <div v-if="$stores.formMission.isStepBenevolesInformationsCompleted === false">
              À définir
            </div>

            <template v-else>
              <div>
                <template v-if="mission.prerequisites?.filter((p) => p).length > 0">
                  {{ mission.prerequisites.filter((p) => p).length }} pré-requis
                </template>
                <template v-else>Aucun prérequis</template>
              </div>
              <div>
                {{
                  benevolesInfosItemsCount > 0
                    ? $filters.pluralize(benevolesInfosItemsCount, 'information')
                    : $stores.formMission.isStepBenevolesInformationsCompleted
                    ? 'Aucune information'
                    : 'À définir'
                }}
              </div>
            </template>
          </CustomMissionPreviewItem>
        </div>
        <div class="space-y-4">
          <h3 class="text-sm font-bold uppercase text-[#666666]">Responsables</h3>
          <CustomMissionPreviewItem
            id="admin-missions-id-responsables"
            :is-current="$route.name === 'admin-missions-id-responsables'"
            :is-completed="$stores.formMission.isStepResponsablesCompleted"
            :is-disabled="
              !$stores.formMission.isStepBenevolesInformationsCompleted &&
              $stores.formMission.isDraft
            "
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
        <div class="text-5xl" aria-hidden="true">✌️</div>
        <h3 class="text-2xl font-bold mb-4">Vous êtes à deux doigts de trouver vos bénévoles</h3>
        <p>
          Vous êtes sur le point de créer une mission de bénévolat, quelle bonne nouvelle ! Le
          formulaire vous guidera étape par étape pour décrire votre mission. Plus vous serez
          précis, plus vos futurs bénévoles pourront se projeter.
        </p>
        <p class="text-[#666666] mt-4 text-sm">
          Les champs marqués par
          <abbr title="required" class="text-[#E1000F] no-underline"><strong>*</strong></abbr> sont
          obligatoires
        </p>
      </div>
    </div>
  </aside>
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
  mounted() {
    this.scrollIntoView(this.$route.name, 0)
  },
  watch: {
    '$stores.formMission.mission': {
      handler(newVal) {
        if (!newVal) {
          this.mission = null
        } else {
          this.mission = _cloneDeep(newVal)
        }
      },
      immediate: true,
      deep: true,
    },
    '$route.name': {
      async handler(newVal) {
        this.scrollIntoView(newVal)
      },
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
    async scrollIntoView(id, duration = null) {
      await this.$nextTick()
      const _duration = duration ?? 1000
      const el = document.getElementById(id)
      if (!el || this.$utils.isElementInViewport(el)) {
        return
      }
      this.$scrollTo(`#${id}`, _duration, {
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
