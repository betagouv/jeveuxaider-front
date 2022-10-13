<template>
  <Box :key="responsable.id" variant="flat" padding="xs">
    <template #header>
      <div class="flex justify-between items-center mb-4">
        <Heading as="h3" :level="5">
          {{ responsable.full_name }}
        </Heading>
        <div v-if="responsable.id !== $store.state.auth.user.profile.id && organisation.members.length > 1" class="text-sm flex items-center cursor-pointer group hover:text-red-500" @click="$emit('clickDelete', responsable)">
          <div class="group-hover:block hidden">
            Supprimer
          </div>
          <div><TrashIcon class="ml-2 h-5 w-5" /></div>
        </div>
      </div>
    </template>
    <DescriptionList v-if="responsable">
      <DescriptionListItem term="E-mail" :description="responsable.email" />
      <DescriptionListItem term="Mobile" :description="responsable.mobile" />
      <DescriptionListItem v-if="responsable.pivot.fonction" term="Rôle" :description="responsable.pivot.fonction" />
      <DescriptionListItemMasquerade v-if="$store.getters.contextRole === 'admin'" :profile="responsable" />
    </DescriptionList>
    <template v-if="['admin', 'referent'].includes($store.getters.contextRole)">
      <div class="border-t -mx-4 xl:-mx-6 mt-6 mb-4" />
      <div class="flex justify-center text-sm">
        <Link @click.native="handleClickSendMessage">
          <ChatAltIcon class="h-4 w-4 mr-2" /> Envoyer un message
        </Link>
        <ModalSendMessage
          :is-open="showModalSendMessage"
          :to-user="responsable"
          :conversable-id="organisation.id"
          conversable-type="App\Models\Structure"
          @cancel="showModalSendMessage = false"
        />
      </div>
    </template>
  </Box>
</template>

<script>
import ModalSendMessage from '@/components/modal/ModalSendMessage.vue'

export default {
  components: {
    ModalSendMessage
  },
  props: {
    organisation: {
      type: Object,
      required: true
    },
    responsable: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showModalSendMessage: false,
      conversationCurrentUserAndResponsable: null
    }
  },
  async fetch () {
    const { data } = await this.$axios.get('/conversations', {
      params: {
        'filter[conversable_id]': this.organisation.id,
        'filter[conversable_type]': 'App\\Models\\Structure',
        'filter[with_users]': `${this.responsable.user_id},${this.$store.getters.profile.user_id}`
      }
    })
    console.log(data)
    this.conversationCurrentUserAndResponsable = data.total > 0 && data.data[0]
  },
  methods: {
    handleClickSendMessage () {
      if (this.conversationCurrentUserAndResponsable) {
        this.$router.push(`/messages/${this.conversationCurrentUserAndResponsable.id}`)
      } else {
        this.showModalSendMessage = true
      }
    }
  }
}
</script>
