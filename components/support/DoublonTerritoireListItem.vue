<template>
  <div class="px-6 py-3 bg-white rounded">
    <div class="flex justify-between cursor-pointer rounded-md" @click="onClick">
      <div class="text-lg font-medium">{{ territoire.trimname }}</div>
      <div class="text-jva-blue-500 text-sm">{{ territoire.count }} occurences</div>
    </div>
    <div v-if="isOpen" class="mt-2 space-y-2">
      <div
        :id="item.id"
        v-for="item in doublons"
        class="bg-gray-50 rounded flex items-center justify-between p-2 text-gray-600 text-sm"
      >
        <div class="flex space-x-4">
          <div>
            <DsfrBadge>{{ item.id }}</DsfrBadge>
          </div>
          <div class="">{{ item.name }}</div>
          <div class="">Crée le {{ $dayjs(item.created_at).format('d MMMM YYYY à HH:mm') }}</div>
        </div>
        <DsfrLink
          type="secondary"
          class="text-sm"
          icon="RiArrowRightLine"
          target="_blank"
          :to="`/admin/contenus/territoires/${item.id}`"
          >Details</DsfrLink
        >
      </div>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    territoire: {
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
      const response = await apiFetch('/support/contents/doublons-territoires/list', {
        method: 'POST',
        body: {
          search: this.territoire.trimname,
        },
      })
      this.doublons = response
    },
  },
})
</script>
