<template>
  <div>
    <ConversationRecipient :title="user.profile.full_name">
      <div
        v-dragscroll.x
        class="px-4 lg:px-6 flex gap-4 items-center overflow-hidden whitespace-nowrap"
      >
        <!-- <div class="flex gap-1 items-center text-sm text-cool-gray-500">
          <RiChatHistoryFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p>
            {{
              $dayjs($stores.messaging.activeConversation.created_at).format('D MMM YYYY • HH[h]mm')
            }}
          </p>
        </div> -->
        <div class="flex gap-1 items-center text-sm text-cool-gray-500">
          <RiMailFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p>
            {{ user.profile.email }}
          </p>
        </div>
        <div v-if="user.profile.mobile" class="flex gap-1 items-center text-sm text-cool-gray-500">
          <RiPhoneLine class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p>
            {{ user.profile.mobile }}
          </p>
        </div>
        <div
          v-if="user.profile.birthday"
          class="flex gap-1 items-center text-sm text-cool-gray-500"
        >
          <RiCakeFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p>
            {{ $dayjs(user.profile.birthday).fromNow('year') }}
          </p>
        </div>
        <div v-if="user.profile.zip" class="flex gap-1 items-center text-sm text-cool-gray-500">
          <RiMapPin2Fill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p>
            {{ user.profile.zip }}
          </p>
        </div>
        <div v-if="user.profile.type" class="flex gap-1 items-center text-sm text-cool-gray-500">
          <RiSuitcaseFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p>
            {{ $filters.label(user.profile.type, 'profile_type') }}
          </p>
        </div>
        <div
          v-if="user.profile.service_civique"
          class="flex gap-1 items-center text-sm text-cool-gray-500"
        >
          <img
            src="/images/logo-service-civique-favicon.png"
            srcset="
              /images/logo-service-civique-favicon.png,
              /images/logo-service-civique-favicon@2x.png 2x
            "
            alt="Service Civique"
            title="Service Civique"
            class="w-[8px] h-[15px] flex-none"
            data-not-lazy
          />
          <p>Service Civique</p>
        </div>
        <div v-if="user.profile.cej" class="flex gap-1 items-center text-sm text-cool-gray-500">
          <RiFlagLine class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p>Jeune en CEJ</p>
        </div>
        <div class="flex gap-1 items-center">
          <DsfrLink @click="drawerProfileId = user.profile.id" class="text-jva-blue-500 text-sm"
            >Plus de détails</DsfrLink
          >
        </div>
      </div>
      <div class=""></div>
      <template #right>
        <div class="px-4 flex flex-col justify-center items-center">
          <SelectTags
            v-model="participation.tags"
            :taggableOptions="taggableOptions"
            @updated="$emit('updated')"
            @attach-tag="attachTag"
            @detach-tag="detachTag"
            class="mt-2"
            label="Attribuer une étiquette"
            options-class="right-0 "
          />
        </div>
      </template>
    </ConversationRecipient>
    <DrawerConversationBenevole :profile-id="drawerProfileId" @close="drawerProfileId = null" />
  </div>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import ConversationRecipient from '@/components/messaging/ConversationRecipient.vue'
import MixinConversationParticipation from '@/mixins/conversation/participation'
import SelectTags from '@/components/tag/SelectTags.vue'

export default defineNuxtComponent({
  directives: {
    dragscroll,
  },
  components: {
    ConversationRecipient,
    SelectTags,
  },
  mixins: [MixinConversationParticipation],
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      drawerProfileId: null,
    }
  },
  computed: {
    taggableOptions() {
      return {
        id: this.participation?.id,
        type: 'App\\Models\\Participation',
        tags_endpoint: `/structures/${this.participation?.mission.structure_id}/tags`,
        taggable_endpoint: `/participations/${this.participation?.id}/tags`,
      }
    },
  },
  methods: {
    async attachTag(payload) {
      const { tags } = await apiFetch(
        `${this.taggableOptions.taggable_endpoint}/${payload}/attach`,
        {
          method: 'POST',
        }
      )
      this.$emit('refreshed-tags', tags)
    },
    async detachTag(payload) {
      const { tags } = await apiFetch(
        `${this.taggableOptions.taggable_endpoint}/${payload}/detach`,
        {
          method: 'POST',
        }
      )
      this.$emit('refreshed-tags', tags)
    },
    handlClick() {
      this.showDrawerBenevole = true
    },
  },
})
</script>
