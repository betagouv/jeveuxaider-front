<template>
  <div class="px-6 py-3 bg-white rounded">
    <div class="flex justify-between cursor-pointer rounded-md" @click="onClick">
      <div class="text-lg font-medium">{{ organisation.trimname }}</div>
      <div class="text-jva-blue-500 text-sm">{{ organisation.count }} occurences</div>
    </div>
    <div v-if="isOpen" class="mt-2 space-y-2">
      <div
        :id="item.id"
        v-for="item in doublons"
        class="bg-gray-50 rounded flex items-center justify-between p-2 text-gray-600 text-sm"
      >
        <div class="flex space-x-4">
          <DsfrBadge type="gray">#{{ item.id }}</DsfrBadge>
          <DsfrBadge type="gray">RNA {{ item.rna ?? 'NC' }}</DsfrBadge>
          <Badges :organisation="item" />
          <div class="font-medium text-[#161616]">{{ item.name }}</div>
          <div class="text-xs">
            Crée le {{ $dayjs(item.created_at).format('d MMMM YYYY à HH:mm') }}
          </div>
        </div>
        <DsfrLink
          type="secondary"
          class="text-sm"
          icon="RiArrowRightLine"
          target="_blank"
          :to="`/admin/organisations/${item.id}`"
          >Details</DsfrLink
        >
      </div>
    </div>
  </div>
</template>

<script>
import MixinOrganisation from '@/mixins/organisation'
import Badges from '@/components/section/organisation/Badges.vue'

export default defineNuxtComponent({
  mixins: [MixinOrganisation],
  components: {
    Badges,
  },
  props: {
    organisation: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
      doublons: [],
    }
  },
  methods: {
    async onClick() {
      this.isOpen = !this.isOpen
      if (this.doublons.length === 0) {
        this.fetchDoublonItems()
      }
    },
    async fetchDoublonItems() {
      const response = await apiFetch('/support/contents/doublons-organisations/list', {
        method: 'POST',
        body: {
          search: this.organisation.trimname,
        },
      })
      this.doublons = response
    },
  },
})
</script>
