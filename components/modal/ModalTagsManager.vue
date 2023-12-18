<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        v-scroll-lock="isOpen"
        :is-open="isOpen"
        title="Gestion des étiquettes"
        :prevent-click-outside="true"
        icon="RiPriceTag3Line"
        @close="handleCancel()"
      >
        <div class="">
          Vous pouvez créer des étiquettes pour organiser vos participations. Ces étiquettes sont
          communes à tous les membres de votre organisation.
        </div>
        <BaseContainerScrollable v-if="tags.length > 0" class="h-[340px] mt-8">
          <div class="flex flex-col gap-2 pl-1 pr-4">
            <TagEditableItem
              v-for="tag in tags"
              :key="tag.id"
              :tag="tag"
              :taggableOptions="taggableOptions"
              @updated="$emit('updated')"
            />
          </div>
        </BaseContainerScrollable>

        <template #footer>
          <!-- <BaseButton class="mr-3" variant="white" @click.stop="$emit('cancel')">
            Annuler
          </BaseButton> -->
          <BaseButton :loading="loading" @click.stop="$emit('cancel')"> Terminer </BaseButton>
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
