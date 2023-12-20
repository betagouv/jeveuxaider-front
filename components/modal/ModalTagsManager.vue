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
        <div class="mb-8">
          Vous pouvez créer des étiquettes pour organiser vos participations. Ces étiquettes sont
          communes à tous les membres de votre organisation.
        </div>
        <template v-if="mode === 'listing'">
          <BaseContainerScrollable class="max-h-[340px]">
            <div class="flex flex-wrap gap-2 mb-4" v-if="tags.length > 0">
              <DsfrTag
                v-for="tag in tags"
                :key="tag.id"
                icon="RiPencilLine"
                icon-position="right"
                context="clickable"
                size="md"
                @click="onSelectTag(tag)"
              >
                {{ tag.name }}
              </DsfrTag>
            </div>
          </BaseContainerScrollable>
        </template>
        <template v-if="['edit', 'add'].includes(mode)">
          <FormStructureTag
            ref="formStructureTag"
            :tag="selectedTag"
            :taggable-options="taggableOptions"
            @submitted="onFormSubmitted"
          />
        </template>

        <template #footer>
          <template v-if="mode === 'listing'">
            <BaseButton class="mr-3" variant="white" @click.stop="onClickModeAdd">
              Ajouter une étiquette
            </BaseButton>
            <BaseButton :loading="loading" @click.stop="onActionClose"> Terminer </BaseButton>
          </template>
          <template v-if="mode === 'edit'">
            <BaseButton class="mr-3" variant="white" @click.stop="mode = 'listing'">
              Annuler
            </BaseButton>
            <BaseButton :loading="loading" @click.stop="onActionEdit"> Modifier </BaseButton>
          </template>
          <template v-if="mode === 'add'">
            <BaseButton class="mr-3" variant="white" @click.stop="mode = 'listing'">
              Annuler
            </BaseButton>
            <BaseButton :loading="loading" @click.stop="onActionAdd"> Ajouter </BaseButton>
          </template>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
import FormErrors from '@/mixins/form/errors'
import FormStructureTag from '@/components/form/FormStructureTag.vue'

export default defineNuxtComponent({
  emits: ['cancel', 'updated-structure-tags'],
  mixins: [FormErrors],
  components: {
    FormStructureTag,
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
      mode: 'listing',
      selectedTag: null,
    }
  },
  created() {
    this.fetch()
  },
  computed: {},
  methods: {
    onFormSubmitted() {
      this.selectedTag = null
      this.mode = 'listing'
      this.fetch()
    },
    onActionEdit() {
      this.$refs.formStructureTag.handleSubmit()
    },
    onActionClose() {
      this.mode = 'listing'
      this.$emit('updated-structure-tags', this.tags)
      this.$emit('cancel')
    },
    onClickModeAdd() {
      this.mode = 'add'
      this.selectedTag = null
    },
    onActionAdd() {
      this.$refs.formStructureTag.handleSubmit()
    },
    onSelectTag(tag) {
      this.selectedTag = tag
      this.mode = 'edit'
    },
    async fetch() {
      const tags = await apiFetch(this.taggableOptions.tags_endpoint)
      this.tags = tags
    },
    handleCancel() {
      this.mode = 'listing'
      this.$emit('updated-structure-tags', this.tags)
      this.$emit('cancel')
    },
  },
})
</script>
