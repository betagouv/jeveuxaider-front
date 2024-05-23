<template>
  <div class="flex bg-[#F9F6F2] h-full">
    <div
      v-if="mission"
      class="py-10 px-8 overflow-y-auto overflow-x-hidden h-full custom-scrollbar-gray"
    >
      <div class="space-y-10">
        <div class="space-y-4">
          <h3 class="text-sm font-bold uppercase text-[#666666]">Description</h3>
          <CustomMissionPreviewItem
            title="Titre"
            :is-current="$route.name === 'admin-missions-id-title'"
            :is-completed="!!mission.name"
            @click="$router.push(`/admin/missions/${mission.id}/title`)"
          >
            {{ mission.name }}
          </CustomMissionPreviewItem>
          <CustomMissionPreviewItem
            title="Visuel"
            :is-current="$route.name === 'admin-missions-id-visuel'"
            :is-completed="!!thumbnail"
            @click="$router.push(`/admin/missions/${mission.id}/visuel`)"
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
            title="Informations"
            :is-current="$route.name === 'admin-missions-id-informations'"
            :is-completed="
              !!mission.description &&
              !!mission.objectif &&
              !!mission.information &&
              !!mission.publics_beneficiaires
            "
            @click="$router.push(`/admin/missions/${mission.id}/informations`)"
          >
            Présentation de la mission et 3 autres informations
          </CustomMissionPreviewItem>
        </div>
        <div class="space-y-4">
          <h3 class="text-sm font-bold uppercase text-[#666666]">Dates et fréquences</h3>
          <CustomMissionPreviewItem
            :title="titleBoxDateType"
            :is-current="$route.name === 'admin-missions-id-dates'"
            :is-completed="!!mission.date_type && !!mission.commitment__duration"
            @click="$router.push(`/admin/missions/${mission.id}/dates`)"
          >
            <template v-if="mission.date_type">
              <template v-if="hasDates">
                <template v-if="nextDates">
                  {{ $filters.pluralize(nextDates.length, 'date') }} à venir</template
                >
                <template v-else> Aucune date à venir</template></template
              >
              <template v-else> {{ formattedDates }}</template>
            </template>
            <template v-else>À définir</template>
          </CustomMissionPreviewItem>
        </div>
        <div class="space-y-4">
          <h3 class="text-sm font-bold uppercase text-[#666666]">Lieux</h3>
          <CustomMissionPreviewItem
            :title="titleBoxLieux"
            :is-current="$route.name === 'admin-missions-id-lieux'"
            :is-completed="!!mission.type"
            @click="$router.push(`/admin/missions/${mission.id}/lieux`)"
          >
            <template v-if="mission.type">
              <template v-if="mission.type === 'Mission à distance'"> Misison à distance </template>
              <template v-if="mission.type === 'Mission en présentiel' && !mission.is_autonomy">
                {{ mission.city }}, {{ mission.zip }}
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
            :title="
              $filters.pluralize(
                mission.participations_max,
                'bénévole recherché',
                'bénévoles recherchés'
              )
            "
            :is-current="$route.name === 'admin-missions-id-benevoles'"
            :is-completed="!!mission.participations_max"
            @click="$router.push(`/admin/missions/${mission.id}/benevoles`)"
          >
            {{ $filters.pluralize(mission.places_left, 'place restante', 'places restantes') }}
          </CustomMissionPreviewItem>
          <CustomMissionPreviewItem
            title="Informations sur les bénévoles"
            :is-current="$route.name === 'admin-missions-id-benevoles-informations'"
            :is-completed="mission.prerequisites?.length > 0 || benevolesInfosItemsCount > 0"
            @click="$router.push(`/admin/missions/${mission.id}/benevoles-informations`)"
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
            :is-current="$route.name === 'admin-missions-id-responsables'"
            :is-completed="!!mission.responsable"
            @click="$router.push(`/admin/missions/${mission.id}/responsables`)"
          >
            <div class="flex items-center">
              <BaseAvatar
                :img-srcset="
                  mission.responsable.avatar ? mission.responsable.avatar.urls.thumbMedium : null
                "
                :img-src="
                  mission.responsable.avatar ? mission.responsable.avatar.urls.original : null
                "
                :initials="mission.responsable.short_name"
                size="sm"
                class="mr-4"
              />
              <div class="truncate font-bold">{{ mission.responsable.full_name }}</div>
            </div>
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
  computed: {
    mission() {
      return _cloneDeep(this.$stores.formMission.mission)
    },
    benevolesInfosItemsCount() {
      let count = 0
      if (this.mission.publics_volontaires?.length > 0) count++
      if (this.mission.skills?.length > 0) count++
      if (this.mission.is_snu_mig_compatible) count++
      if (this.mission.is_motivation_required) count++
      return count
    },
    titleBoxLieux() {
      if (!this.mission.type) return 'En présentiel ou à distance'
      return this.mission.type === 'Mission à distance' ? 'À distance' : 'En présentiel'
    },
    titleBoxDateType() {
      if (!this.mission.date_type) return 'Ponctuelle ou régulière'
      return this.mission.date_type === 'ponctual' ? 'Ponctuelle' : 'Régulière'
    },
  },
  methods: {
    onImgError() {
      this.$refs.thumbnail.$el.srcset =
        '/images/card-thumbnail-default.jpg, /images/card-thumbnail-default@2x.jpg 2x'
    },
  },
})
</script>
