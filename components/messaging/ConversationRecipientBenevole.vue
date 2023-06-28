<template>
  <div>
    <ConversationRecipient :title="user.profile.full_name">
      <div v-dragscroll.x class="px-4 lg:px-8 flex gap-4 items-center overflow-hidden whitespace-nowrap">
        <div class="flex gap-1 items-center text-sm text-cool-gray-500">
          <RiChatHistoryFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p class="">
            {{ $dayjs($store.getters['messaging/activeConversation'].created_at).format('D MMM YYYY • HH[h]mm') }}
          </p>
        </div>
        <!-- <div class="flex gap-1 items-center text-sm text-cool-gray-500">
          <RiMailFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p class="">
            {{ user.profile.email }}
          </p>
        </div>
        <div v-if="user.profile.mobile" class="flex gap-1 items-center text-sm text-cool-gray-500">
          <RiPhoneLine class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p class="">
            {{ user.profile.mobile }}
          </p>
        </div> -->
        <div v-if="user.profile.birthday" class="flex gap-1 items-center text-sm text-cool-gray-500">
          <RiCakeFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p class="">
            {{ $dayjs(user.profile.birthday).fromNow('year') }}
          </p>
        </div>
        <div v-if="user.profile.zip" class="flex gap-1 items-center text-sm text-cool-gray-500">
          <RiMapPin2Fill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p class="">
            {{ user.profile.zip }}
          </p>
        </div>
        <div v-if="user.profile.type" class="flex gap-1 items-center text-sm text-cool-gray-500">
          <RiSuitcaseFill class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p class="">
            {{ user.profile.type | label('profile_type') }}
          </p>
        </div>
        <div v-if="user.profile.service_civique" class="flex gap-1 items-center text-sm text-cool-gray-500">
          <img
            src="/images/logo-service-civique-favicon.png"
            srcset="/images/logo-service-civique-favicon.png, /images/logo-service-civique-favicon@2x.png 2x"
            alt="Service Civique"
            title="Service Civique"
            class="w-[8px] h-[15px] flex-none"
            data-not-lazy
          >
          <p class="">
            Service Civique
          </p>
        </div>
        <div v-if="user.profile.cej" class="flex gap-1 items-center text-sm text-cool-gray-500">
          <RiFlagLine class="w-[14px] h-[14px] flex-none fill-current text-gray-400" />
          <p class="">
            Jeune en CEJ
          </p>
        </div>
      </div>
      <template #right>
        <div
          class="border-l px-6 lg:px-8 flex flex-col justify-center items-center text-jva-blue-500 hover:text-jva-blue-300"
          @click="drawerProfileId = user.profile.id"
        >
          <RiFileUserLine
            class="h-7 w-7 fill-current cursor-pointer"
          />
          <div class="text-sm">
            Infos
          </div>
        </div>
      </template>
    </ConversationRecipient>
    <DrawerConversationBenevole :profile-id="drawerProfileId" @close="drawerProfileId = null" />
  </div>
</template>

<script>
import ConversationRecipient from '@/components/messaging/ConversationRecipient.vue'
import MixinConversationParticipation from '@/mixins/conversation/participation'
import DrawerConversationBenevole from '@/components/drawer/DrawerConversationBenevole.vue'

export default {
  components: {
    ConversationRecipient,
    DrawerConversationBenevole
  },
  mixins: [MixinConversationParticipation],
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      drawerProfileId: null
    }
  },
  computed: {

  },
  methods: {
    handlClick () {
      this.showDrawerBenevole = true
      console.log('handlClick')
    }
  }
}
</script>

<style>

</style>
