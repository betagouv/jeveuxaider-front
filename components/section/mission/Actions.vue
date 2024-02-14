<template>
  <BaseAlertDialog
    v-if="mission"
    icon="RiErrorWarningLine"
    title="Supprimer la mission"
    :is-open="showModalDelete"
    @confirm="handleConfirmDelete()"
    @cancel="showModalDelete = false"
  >
    Vous êtes sur le point de supprimer la mission {{ mission.name }}.
  </BaseAlertDialog>
  <BaseDropdown>
    <template #button>
      <DsfrButton :size="buttonSize" type="tertiary" class="!text-gray-800">
        <RiMoreFill class="h-5 w-5 fill-current" />
      </DsfrButton>
    </template>
    <template #items>
      <BaseDropdownOptionsItem
        v-if="['admin'].includes($stores.auth.contextRole) && mission.state == 'Validée'"
        @click.native="$emit('showModalSwitchIsOnline')"
      >
        <div class="flex items-center">
          <div
            :class="[
              'h-3 w-3 rounded-full mr-3',
              mission.is_online ? 'bg-jva-red-600' : 'bg-jva-green-600',
            ]"
          />
          {{ mission.is_online ? 'Mettre hors ligne' : 'Mettre en ligne' }}
        </div>
      </BaseDropdownOptionsItem>
      <BaseDropdownOptionsItem
        v-if="mission.places_left > 0 && mission.is_online && mission.state == 'Validée'"
        @click.native="handleChangeIsRegistrationOpen(!mission.is_registration_open)"
      >
        <div
          v-if="mission.is_registration_open"
          class="flex items-center"
          v-tooltip="{
            content: 'La mission reste en ligne. Les bénévoles ne peuvent plus postuler.',
          }"
        >
          <RiUserUnfollow class="h-4 w-4 mr-2 fill-current text-gray-600" />Fermer les inscriptions
        </div>
        <div
          v-else
          class="flex items-center"
          v-tooltip="{
            content: 'La mission reste en ligne. Les bénévoles ne peuvent plus postuler.',
          }"
        >
          <RiUserFollow class="h-4 w-4 mr-2 fill-current text-gray-600" />Ouvrir les inscriptions
        </div>
      </BaseDropdownOptionsItem>
      <NuxtLink
        v-if="mission.places_left > 0 && mission.is_online"
        :to="`/admin/missions/${mission.id}/trouver-des-benevoles`"
      >
        <BaseDropdownOptionsItem>
          <div class="flex items-center">
            <RiUserSearch class="h-4 w-4 mr-2 fill-current text-gray-600" /> Trouver des bénévoles
          </div>
        </BaseDropdownOptionsItem>
      </NuxtLink>
      <BaseDropdownOptionsItem v-if="canDuplicateMission">
        <ButtonMissionDuplicate
          :mission-id="mission.id"
          :mission="mission"
          theme="link"
          :canDuplicateMission="canDuplicateMission"
          :redirectToMission="true"
        />
      </BaseDropdownOptionsItem>
      <BaseDropdownOptionsItem
        v-if="['admin', 'responsable'].includes($stores.auth.contextRole)"
        @click="showModalDelete = true"
      >
        <div class="flex items-center">
          <RiDeleteBinLine class="h-4 w-4 mr-2 fill-current text-gray-600" /> Supprimer
        </div>
      </BaseDropdownOptionsItem>
    </template>
  </BaseDropdown>
</template>

<script>
import MixinMission from '@/mixins/mission'
import ButtonMissionDuplicate from '@/components/custom/ButtonMissionDuplicate.vue'

export default defineNuxtComponent({
  emits: ['showModalSwitchIsOnline', 'missionDeleted'],
  data() {
    return {
      showModalDelete: false,
    }
  },
  components: {
    ButtonMissionDuplicate,
  },
  mixins: [MixinMission],
  props: {
    mission: {
      type: Object,
      required: true,
    },
    buttonSize: {
      type: String,
      default: 'md',
    },
  },
  methods: {
    async handleConfirmDelete() {
      await this.deleteMission()
      this.showModalDelete = false
      this.$emit('missionDeleted')
    },
  },
})
</script>
