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
            title="Ponctuelle ou régulière"
            :is-current="$route.name === 'admin-missions-id-dates'"
            :is-completed="!!mission.date_type && !!mission.commitment__duration"
            @click="$router.push(`/admin/missions/${mission.id}/dates`)"
          >
            Dates ou engagement à définir
          </CustomMissionPreviewItem>
        </div>
        <div class="space-y-4">
          <h3 class="text-sm font-bold uppercase text-[#666666]">Lieux</h3>
          <CustomMissionPreviewItem
            title="En présentiel ou à distance"
            :is-current="$route.name === 'admin-missions-id-lieux'"
            :is-completed="!!mission.type"
            @click="$router.push(`/admin/missions/${mission.id}/lieux`)"
          >
            Lieu à définir
          </CustomMissionPreviewItem>
        </div>
        <div class="space-y-4">
          <h3 class="text-sm font-bold uppercase text-[#666666]">Bénévoles</h3>
          <CustomMissionPreviewItem
            :title="
              $filters.pluralize(
                $stores.formMission.mission.participations_max,
                'bénévole recherché',
                'bénévoles recherchés'
              )
            "
            :is-current="$route.name === 'admin-missions-id-benevoles'"
            :is-completed="!!mission.participations_max"
            @click="$router.push(`/admin/missions/${mission.id}/benevoles`)"
          >
            {{
              $filters.pluralize(
                $stores.formMission.mission.places_left,
                'place restante',
                'places restantes'
              )
            }}
          </CustomMissionPreviewItem>
          <CustomMissionPreviewItem
            title="Informations sur les bénévoles"
            :is-current="$route.name === 'admin-missions-id-benevoles-informations'"
            :is-completed="false"
            @click="$router.push(`/admin/missions/${mission.id}/benevoles-informations`)"
          >
            <div>
              <template v-if="$stores.formMission.mission.prerequisites">
                {{ $stores.formMission.mission.prerequisites.length }} pré-requis
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
  </div>
</template>

<script>
import MixinMission from '@/mixins/mission'

export default defineNuxtComponent({
  mixins: [MixinMission],
  props: {},
  computed: {
    mission() {
      return this.$stores.formMission.mission
    },
    benevolesInfosItemsCount() {
      return 5
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
