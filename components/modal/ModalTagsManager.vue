<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        v-scroll-lock="isOpen"
        :is-open="isOpen"
        title="Gestion des étiquettes"
        :prevent-click-outside="true"
        icon="RiTodoLine"
        @close="handleCancel()"
      >
        <!-- <div class="space-y-4">
          <template v-if="canUseMessageTemplate">
            <BaseFormControl html-for="message-template" label="Modèle de message">
              <SelectAdvancedMessageTemplate
                :recipient-user="toUser"
                :conversable-type="conversableType"
                :conversable="conversable"
                @selected="handleMessageTemplateSelected"
                @clear="form.message = ''"
              />
              <BaseFormHelperText class="mt-1">
                Gérez vos modèles de message depuis
                <DsfrLink to="/messages/modeles">votre espace dédié</DsfrLink>
              </BaseFormHelperText>
            </BaseFormControl>
          </template>
          <BaseFormControl html-for="message" label="Message">
            <BaseTextarea v-model="form.message" name="message" />
          </BaseFormControl>
        </div> -->

        <template #footer>
          <BaseButton class="mr-3" variant="white" @click.native="$emit('cancel')">
            Annuler
          </BaseButton>
          <BaseButton :loading="loading" @click.native="$emit('cancel')"> Terminer </BaseButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
import FormErrors from '@/mixins/form/errors'
import SelectAdvancedMessageTemplate from '@/components/custom/SelectAdvancedMessageTemplate.vue'

export default defineNuxtComponent({
  emits: ['cancel'],
  mixins: [FormErrors],
  components: {
    SelectAdvancedMessageTemplate,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    taggableOptions: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      tags: [],
    }
  },
  created() {
    this.fetch()
  },
  computed: {
    // canUseMessageTemplate() {
    //   return ['referent', 'admin'].includes(this.$stores.auth.contextRole)
    // },
  },
  methods: {
    handleMessageTemplateSelected(payload) {
      this.form.message = payload
    },
    async fetch() {
      const tags = await apiFetch(this.taggableOptions.tags_endpoint)
      this.tags = tags
    },
    handleCancel() {
      this.$emit('cancel')
    },
  },
})
</script>
