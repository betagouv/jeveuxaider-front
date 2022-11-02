<template>
  <Box id="notes">
    <div class="flex justify-between items-center">
      <Heading :level="3">
        Notes
      </Heading>
      <div class="">
        <Button variant="white" @click.native="showDrawer = true">
          Ajouter une note
        </Button>
      </div>
    </div>
    <template v-if="notes && notes.data.length > 0">
      <div class="">
        <div class="divide-y divide-gray-200">
          <div v-for="note in notes.data" :key="note.id" class="py-12">
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <Avatar
                  :img-srcset="note.user.profile.avatar ? note.user.profile.avatar.urls.thumbMedium : null"
                  :img-src="note.user.profile.avatar ? note.user.profile.avatar.urls.original : null"
                  :initials="note.user.profile.short_name"
                  size="xs"
                  class=""
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

              <div v-if="note.permissions.canUpdate" class="">
                <PencilIcon class="h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-900" @click="handleUpdate(note)" />
              </div>
            </div>

            <div class="mt-4 space-y-6 text-base italic text-gray-600">
              <nl2br
                tag="p"
                :text="note.content"
                class-name="break-word"
              />
            </div>
          </div>
          <Pagination
            :current-page="notes.current_page"
            :total-rows="notes.total"
            :per-page="notes.per_page"
            @page-change="changePage"
          />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="text-gray-500 py-12">
        Aucune note pour le moment
      </div>
    </template>
    <Drawer :is-open="showDrawer" form-id="form-note" submit-label="Enregsitrer la note" @close="showDrawer = false">
      <template #title>
        <Heading :level="3">
          Ajouter une note
        </Heading>
      </template>
      <FormNote
        class="mt-8"
        :notable-type="notableType"
        :notable-id="notableId"
        :note="selectedNote"
        @submitted="onSubmitted()"
      />
    </Drawer>
  </Box>
</template>

<script>
import FormNote from '@/components/form/FormNote.vue'

export default {
  components: {
    FormNote
  },
  props: {
    notableType: {
      type: String,
      required: true
    },
    notableId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      loading: true,
      notes: null,
      showDrawer: false,
      selectedNote: null,
      page: 1
    }
  },
  async fetch () {
    this.loading = true
    await this.$axios.get(`/${this.notableType}/${this.notableId}/notes`, {
      params: {
        page: this.page
      }
    }).then((response) => {
      this.loading = false
      this.notes = response.data
    })
  },
  methods: {
    changePage (page) {
      // console.log('changePage', page)
      this.page = page
      this.$fetch()
    },
    handleUpdate (note) {
      this.showDrawer = true
      this.selectedNote = note
    },
    onSubmitted () {
      this.$fetch()
      this.showDrawer = false
      this.selectedNote = null
    }
  }
}
</script>

<style>

</style>
