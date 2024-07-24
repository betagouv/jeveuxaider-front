<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">Référents</div>
      <BaseLink
        :to="`/admin/utilisateurs?filter[user.role]=referent&filter[referent_department]=${department}`"
        icon="RiArrowRightSLine"
      >
        Consulter
      </BaseLink>
    </div>
    <BaseBox :variant="boxVariant" :padding="boxPadding" :loading="loading">
      <BaseDescriptionList>
        <div v-if="!referents.length" class="text-sm text-gray-500">Aucun</div>
        <div v-for="(referent, i) in referents" v-else :key="referent.id">
          <div
            v-if="$stores.auth.contextRole == 'admin' && referent.tags"
            :class="['flex flex-wrap gap-1 mb-2', i === 0 ? 'mt-1' : 'mt-5']"
          >
            <DsfrTag v-for="tag in referent.tags" :key="tag.id" size="sm">
              {{ tag.name }}
            </DsfrTag>
          </div>
          <div class="py-2 sm:gap-4 sm:flex">
            <dt class="text-sm text-gray-500 flex-none" style="width: calc(33.3333%)">Nom</dt>
            <dd
              class="mt-1 text-sm text-gray-900 font-semibold sm:mt-0 flex-1"
              style="word-break: break-word"
            >
              {{ referent.full_name }}
            </dd>
          </div>
          <BaseDescriptionListItem term="Email" :description="referent.email" />
          <BaseDescriptionListItem term="Mobile" :description="referent.mobile" />
          <BaseDescriptionListItem
            term="Der. connexion"
            :description="
              referent.user.last_online_at ? $dayjs(referent.user.last_online_at).fromNow() : '-'
            "
          />
          <div v-if="i < referents.length - 1" class="border-t -mx-6 my-3" />
        </div>
      </BaseDescriptionList>
    </BaseBox>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    department: {
      type: String,
      default: null,
    },
    boxVariant: {
      type: String,
      default: 'flat',
    },
    boxPadding: {
      type: String,
      default: 'xs',
    },
  },
  data() {
    return {
      loading: false,
      referents: [],
    }
  },
  created() {
    this.fetch()
  },
  computed: {
    lastConnexion() {
      return this.referents.length
        ? this.referents.reduce((m, current, index) =>
            this.$dayjs(current.user.last_online_at).isAfter(m.user.last_online_at) && index
              ? current
              : m
          ).user.last_online_at
        : null
    },
  },
  methods: {
    async fetch() {
      if (!this.$labels.departments.find((dep) => dep.key == this.department)) {
        return
      }

      this.loading = true
      const referents = await apiFetch('/profiles', {
        params: {
          pagination: -1,
          'filter[user.role]': 'referent',
          'filter[referent_department]': this.department,
          include: 'user,tags',
        },
      })
      this.referents = referents.data
      this.loading = false
    },
  },
})
</script>
