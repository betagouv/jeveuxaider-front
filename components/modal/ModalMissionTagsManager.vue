<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :is-open="isOpen"
        title="Gestion des tags"
        :prevent-click-outside="true"
        icon="RiPriceTag3Line"
        @close="$emit('cancel')"
      >
        <DsfrFormControl label="Liste des tags" html-for="tags">
          <AlgoliaInputAutocomplete
            variant="dsfr"
            index="termsIndex"
            placeholder="Rechercher un tag..."
            :search-parameters="{
              facetFilters: [['vocabulary_name:Missions']],
              hitsPerPage: 6,
            }"
            :min-value-length="1"
            @selected="onSelectedTag"
          />
          <div>
            <div v-if="form.tags?.length" class="mt-6">
              <div class="flex flex-wrap gap-2">
                <DsfrTag
                  v-for="item in form.tags"
                  :key="item.id"
                  :tag="item"
                  context="deletable"
                  size="md"
                  @delete="onDeleteTag(item)"
                >
                  {{ item.name }}
                </DsfrTag>
              </div>
            </div>
          </div>
        </DsfrFormControl>

        <template #footer>
          <DsfrButton :loading="loading" @click.stop="onSave"> Sauvegarder </DsfrButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  emits: ['cancel', 'submit'],
  mixins: [FormErrors],
  components: {},
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    mission: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      form: {
        tags: [],
      },
    }
  },
  mounted() {
    this.form.tags = this.mission.tags
  },
  computed: {},
  methods: {
    onSelectedTag(tag) {
      this.form.tags.push(tag)
    },
    onDeleteTag(tag) {
      this.form.tags = this.form.tags.filter((item) => item.id !== tag.id)
    },
    async onSave() {
      this.loading = true
      await apiFetch(`/missions/${this.mission.id}`, {
        method: 'PUT',
        body: this.form,
      })
        .then(async (res) => {
          this.$emit('submit')
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>
