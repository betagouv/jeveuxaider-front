<template>
  <BaseBox :padding="false" class="!shadow-sm hover:!shadow-md cursor-pointer w-full">
    <div
      class="grid grid-cols-1 lg:grid-cols-3 w-full divide-y lg:divide-y-0 lg:divide-x divide-[#E5E5E5]"
    >
      <template v-if="participation.mission">
        <div class="col-span-1 px-6 py-8 flex flex-col justify-between gap-6">
          <div>
            <div class="truncate text-sm text-gray-600 mb-8">
              <span>📍</span>

              <template
                v-if="
                  participation.mission.city &&
                  participation.mission.type == 'Mission en présentiel'
                "
              >
                <template v-if="participation.mission.zip">
                  <span class="font-semibold">{{ missionCity }}</span>
                  <span> ({{ participation.mission.zip }})</span>
                </template>

                <template v-else-if="participation.mission.department">
                  <span class="font-semibold">{{ missionCity }}</span>
                  <span> ({{ participation.mission.department }})</span>
                </template>

                <template v-else>
                  <span class="font-semibold">{{ missionCity }}</span>
                </template>
              </template>

              <template v-else-if="participation.mission.is_autonomy"> En autonomie </template>

              <template v-else> À distance </template>
            </div>
            <div class="mb-8">
              <!-- <div class="text-xs text-[#666666] leading-tight flex space-x-2 mb-2">
                <RiBuildingFill class="w-4 h-4 fill-current" /> <span>{{ participation.mission.structure.name }}</span>
              </div> -->
              <div class="font-bold line-clamp-3 text-black leading-tight">
                {{ participation.mission.name }}
              </div>
            </div>
            <div class="text-xs text-[#666666] leading-tight flex space-x-2">
              <RiCalendarEventFill class="w-4 h-4 fill-current" />
              <span
                >à partir du
                {{ $dayjs(participation.mission.start_date).format('D MMMM YYYY') }}
              </span>
            </div>
          </div>
          <div
            v-if="!isBenevole"
            class="hidden lg:block pt-4 border-t border-[#E5E5E5] border-dashed"
          >
            <div class="flex space-x-1 text-sm truncate max-w-full text-gray-600">
              <span>Responsable :</span>
              <span v-if="participation.mission.responsable" class="font-bold truncate">{{
                participation.mission.responsable.full_name
              }}</span>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div>La mission n'existe plus</div>
      </template>
      <div class="col-span-2 px-6 py-10 flex flex-col justify-between gap-6">
        <div class="space-y-6">
          <div class="flex flex-col space-y-4 lg:flex-row lg:space-y-0">
            <div class="flex">
              <BaseAvatar
                :img-srcset="profile.avatar ? profile.avatar.urls.thumbMedium : null"
                :img-src="profile.avatar ? profile.avatar.urls.original : null"
                :initials="profile.short_name"
                size="sm"
                class="mr-4"
              />
              <div>
                <div class="font-bold">
                  {{ profile.full_name }}
                  <div
                    v-if="display == 'benevole' && participation.profile.cej"
                    class="inline-flex font-normal text-gray-600 text-sm"
                  >
                    <span class="ml-1 mr-2">•</span>
                    <a
                      class="inline-flex items-center hover:underline hover:text-jva-blue-500"
                      href="https://travail-emploi.gouv.fr/emploi-et-insertion/mesures-jeunes/contrat-engagement-jeune/article/qu-est-ce-que-le-contrat-d-engagement-jeune-cej"
                      target="_blank"
                      @click.stop
                    >
                      <span>Jeune en CEJ</span>
                      <RiExternalLinkLine class="ml-1 h-3 w-3 inline-block" />
                    </a>
                  </div>
                </div>
                <div class="text-sm text-gray-600 first-letter:uppercase">
                  {{ $dayjs(participation.created_at).fromNow() }}
                </div>
              </div>
            </div>
            <div class="lg:ml-auto lg:pl-2">
              <DsfrBadge size="sm" :type="badgeTypeParticipationSate">
                {{ participation.state }}
              </DsfrBadge>
            </div>
          </div>
          <BaseTextFormatted
            v-if="participation.conversation && participation.conversation.latest_message"
            :max-lines="4"
            :text="participation.conversation.latest_message.content"
            class="text-gray-600"
          />
          <div v-if="participation.slots">
            <div class="text-sm font-semibold">Disponibilités :</div>
            <div class="mt-2">
              <div
                v-for="(date, index) in participation.slots"
                :key="date.id"
                :class="[
                  {
                    'border-b-0 pb-0 mb-0': index == participation.slots.length - 1,
                  },
                  'pb-2 mb-2 border-b',
                ]"
              >
                <div class="text-sm text-black first-letter:uppercase">
                  {{ $dayjs(date.date).format('dddd D MMMM')
                  }}<span class="font-normal text-gray-600">
                    :
                    {{ date.slots.map((slot) => $filters.label(slot, 'slots')).join(', ') }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="showTags && canSeeTags && participation.tags?.length > 0"
          class="flex-none flex space-x-4 items-center max-w-full"
        >
          <RiPriceTag3Fill class="flex-none w-4 h-4 text-[#666666] fill-current" />
          <div class="flex flex-wrap gap-2 truncate">
            <DsfrTag
              v-for="(tag, index) in $stores.structureTags.resolveTagsName(participation.tags)"
              :key="tag.id"
              size="md"
              as="button"
            >
              {{ tag.name }}
            </DsfrTag>
          </div>
        </div>
      </div>
    </div>
    <ParticipationBenevoleActions
      v-if="isBenevole"
      :participation="participation"
      class="border-t border-[#E5E5E5]"
      @updated="$emit('refetch')"
    />
  </BaseBox>
</template>

<script>
import MixinMission from '@/mixins/mission'
import ParticipationBenevoleActions from '@/components/custom/ParticipationBenevoleActions.vue'

export default defineNuxtComponent({
  components: {
    ParticipationBenevoleActions,
  },
  mixins: [MixinMission],
  props: {
    participation: {
      type: Object,
      default: null,
    },
    display: {
      type: String,
      default: 'benevole',
    },
    showTags: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    mission() {
      return this.participation.mission
    },
    profile() {
      return this.display === 'benevole'
        ? this.participation.profile
        : this.participation.mission.responsable
    },
    isBenevole() {
      return this.participation.profile_id == this.$stores.auth.profile.id
    },
    canSeeTags() {
      return ['admin', 'referent', 'tete_de_reseau', 'responsable'].includes(
        this.$stores.auth.contextRole
      )
    },
    badgeTypeParticipationSate() {
      switch (this.participation.state) {
        case 'Validée':
          return 'success'
        case 'Annulée':
        case 'Refusée':
          return 'error'
        case 'En attente de validation':
        case 'En cours de traitement':
          return 'warning'
        default:
          return 'info'
      }
    },
  },
})
</script>
