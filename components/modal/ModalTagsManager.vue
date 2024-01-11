<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        v-scroll-lock="isOpen"
        :is-open="isOpen"
        title="Gestion des tags"
        :prevent-click-outside="true"
        icon="RiPriceTag3Line"
        @close="handleCancel()"
      >
        <div class="mb-8">
          Vous pouvez créer des tags pour organiser vos participations. Ces tags sont communs à tous
          les membres de votre organisation.
        </div>
        <template v-if="mode === 'listing'">
          <BaseContainerScrollable scrollbar-class="max-h-[340px]">
            <div class="flex flex-col gap-6">
              <div class="">
                <BaseFormLabel suffix="(personnalisables)">Liste des tags </BaseFormLabel>
                <div class="flex flex-wrap gap-2" v-if="editableTags.length > 0">
                  <DsfrTag
                    v-for="tag in editableTags"
                    :key="tag.id"
                    icon="RiPencilLine"
                    icon-position="right"
                    context="clickable"
                    size="md"
                    iconClass="pointer-events-none"
                    @click="onSelectTag(tag)"
                  >
                    {{ tag.name }}
                  </DsfrTag>
                </div>
                <template v-else>
                  <div class="text-gray-400 text-sm">Aucun tag</div>
                </template>
              </div>
              <!-- <div class="">
                <BaseFormLabel suffix="(Non personnalisables)">Les tags génériques</BaseFormLabel>
                <div class="flex flex-wrap gap-2">
                  <DsfrTag
                    v-for="tag in genericTags"
                    :key="tag.id"
                    size="md"
                    iconClass="pointer-events-none"
                  >
                    {{ tag.name }}
                  </DsfrTag>
                </div>
              </div> -->
            </div>
          </BaseContainerScrollable>
        </template>
        <template v-if="['edit', 'add'].includes(mode)">
          <FormStructureTag
            ref="formStructureTag"
            :tag="selectedTag"
            @submitted="onFormSubmitted"
          />
        </template>
        <template v-if="['edit'].includes(mode)">
          <DsfrLink class="text-sm mt-2" @click="onActionDelete">Supprimer ce tag</DsfrLink>
        </template>

        <template #footer>
          <template v-if="mode === 'listing'">
            <DsfrButton class="mr-3" type="secondary" @click.stop="onClickModeAdd">
              Créer un tag
            </DsfrButton>
            <DsfrButton :loading="loading" @click.stop="onActionClose"> Terminer </DsfrButton>
          </template>
          <template v-if="mode === 'edit'">
            <DsfrButton class="mr-3" type="secondary" @click.stop="mode = 'listing'">
              Retour
            </DsfrButton>
            <DsfrButton :loading="loading" @click.stop="onActionEdit"> Modifier </DsfrButton>
          </template>
          <template v-if="mode === 'add'">
            <DsfrButton class="mr-3" type="secondary" @click.stop="mode = 'listing'">
              Retour
            </DsfrButton>
            <DsfrButton :loading="loading" @click.stop="onActionAdd"> Créer </DsfrButton>
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
  emits: ['cancel'],
  mixins: [FormErrors],
  components: {
    FormStructureTag,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
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
  computed: {
    editableTags() {
      return this.$stores.structureTags.options.filter((tag) => !tag.is_generic)
    },
    genericTags() {
      return this.$stores.structureTags.options.filter((tag) => tag.is_generic)
    },
  },
  methods: {
    onFormSubmitted() {
      this.selectedTag = null
      this.mode = 'listing'
      this.$stores.structureTags.fetchOptions()
    },
    onActionEdit() {
      this.$refs.formStructureTag.handleSubmit()
    },
    onActionClose() {
      this.mode = 'listing'
      this.$emit('cancel')
    },
    onClickModeAdd() {
      this.mode = 'add'
      this.selectedTag = null
    },
    onActionAdd() {
      this.$refs.formStructureTag.handleSubmit()
    },
    onActionDelete() {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce tag ?')) {
        this.$stores.structureTags.delete(this.selectedTag)
        this.mode = 'listing'
        this.selectedTag = null
      }
    },
    onSelectTag(tag) {
      this.selectedTag = tag
      this.mode = 'edit'
    },
    handleCancel() {
      this.mode = 'listing'
      this.$emit('cancel')
    },
  },
})
</script>
