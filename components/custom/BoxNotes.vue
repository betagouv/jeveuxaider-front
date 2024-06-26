<template>
  <BaseBox id="notes">
    <div class="flex justify-between items-center">
      <BaseHeading :level="3"> Notes </BaseHeading>
      <div>
        <DsfrButton type="tertiary" @click.native="showModalNote = true">
          Ajouter une note
        </DsfrButton>
      </div>
    </div>
    <template v-if="notes && notes.data.length > 0">
      <div>
        <div class="divide-y divide-gray-200">
          <div v-for="note in notes.data" :key="note.id" class="py-12">
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <BaseAvatar
                  :img-srcset="
                    note.user.profile.avatar ? note.user.profile.avatar.urls.thumbMedium : null
                  "
                  :img-src="
                    note.user.profile.avatar ? note.user.profile.avatar.urls.original : null
                  "
                  :initials="note.user.profile.short_name"
                  size="xs"
                />
                <div class="ml-4">
                  <h4 class="text-sm font-bold text-gray-900">
                    {{ note.user.profile.full_name }}
                  </h4>
                  <div class="text-gray-300 text-xs">
                    {{ $dayjs(note.created_at).fromNow() }}
                  </div>
                </div>
              </div>

              <div v-if="note.permissions.canUpdate">
                <RiPencilLine
                  class="h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-900 fill-current"
                  @click="handleUpdate(note)"
                />
              </div>
            </div>

            <div class="mt-4 space-y-6 text-base italic text-gray-600">
              <p class="break-word" v-html="$filters.nl2br(note.content)"></p>
            </div>
          </div>
          <BasePagination
            :current-page="notes.current_page"
            :total-rows="notes.total"
            :per-page="notes.per_page"
            @page-change="changePage"
          />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="text-gray-500 py-12">Aucune note pour le moment</div>
    </template>
    <ModalNote
      :is-open="showModalNote"
      :notable-type="notableType"
      :notable-id="notableId"
      :note="selectedNote"
      @confirm="onNoteSubmitted"
      @cancel="onModalCancel"
    />
  </BaseBox>
</template>

<script>
export default defineNuxtComponent({
  props: {
    notableType: {
      type: String,
      required: true,
    },
    notableId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      notes: null,
      showModalNote: false,
      selectedNote: null,
      page: 1,
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.loading = true
      await apiFetch(`/${this.notableType}/${this.notableId}/notes`, {
        params: {
          page: this.page,
        },
      }).then((response) => {
        this.loading = false
        this.notes = response
      })
    },
    changePage(page) {
      this.page = page
      this.fetch()
    },
    handleUpdate(note) {
      this.showModalNote = true
      this.selectedNote = note
    },
    onNoteSubmitted() {
      this.fetch()
      this.showModalNote = false
      this.selectedNote = null
    },
    onModalCancel() {
      this.showModalNote = false
      this.selectedNote = null
    },
  },
})
</script>
