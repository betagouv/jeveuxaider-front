<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">
        Référents
      </div>
      <Link :to="`/admin/utilisateurs?filter[user.role]=referent&filter[department]=${department}`" icon="ChevronRightIcon">
        Consulter
      </Link>
    </div>
    <Box :variant="boxVariant" :padding="boxPadding" :loading="loading">
      <DescriptionList>
        <div v-if="!referents.length" class="text-sm text-gray-500">
          Aucun
        </div>
        <div
          v-for="referent,i in referents"
          v-else
          :key="referent.id"
        >
          <div
            v-if="$store.getters.contextRole == 'admin' && referent.tags"
            :class="[
              'flex flex-wrap gap-1 mb-2',
              i === 0 ? 'mt-1' : 'mt-5'
            ]"
          >
            <Tag v-for="tag in referent.tags" :key="tag.id" size="sm">
              {{ tag.name }}
            </Tag>
          </div>
          <div class="py-2 sm:gap-4 sm:flex">
            <dt class="text-sm text-gray-500 flex-none" style="width: calc(33.3333%);">
              Nom
            </dt>
            <dd class="mt-1 text-sm text-gray-900 font-semibold sm:mt-0 flex-1" style="word-break: break-word;">
              {{ referent.full_name }}
            </dd>
          </div>
          <DescriptionListItem
            term="Email"
            :description="referent.email"
          />
          <DescriptionListItem
            term="Mobile"
            :description="referent.mobile"
          />
          <DescriptionListItem
            term="Der. connexion"
            :description="referent.user.last_online_at ? $dayjs(referent.user.last_online_at).fromNow() : '-'"
          />
          <div v-if="i < referents.length - 1" class="border-t -mx-6 my-3" />
        </div>
      </DescriptionList>
    </Box>
  </div>
</template>

<script>
import Tag from '@/components/dsfr/Tag.vue'

export default {
  components: {
    Tag
  },
  props: {
    department: {
      type: String,
      required: true
    },
    boxVariant: {
      type: String,
      default: 'flat'
    },
    boxPadding: {
      type: String,
      default: 'xs'
    }
  },
  data () {
    return {
      loading: false,
      referents: []
    }
  },
  async fetch () {
    if (!this.$labels.departments.find(dep => dep.key == this.department)) {
      return
    }

    this.loading = true
    const { data: referents } = await this.$axios.get('/profiles', {
      params: {
        pagination: 999,
        'filter[user.role]': 'referent',
        'filter[referent_department]': this.department,
        include: ['user', 'tags']
      }
    })
    this.referents = referents.data
    this.loading = false
  },
  computed: {
    lastConnexion () {
      return this.referents.length
        ? this.referents.reduce((m, current, index) =>
          (this.$dayjs(current.user.last_online_at).isAfter(m.user.last_online_at)) && index ? current : m).user.last_online_at
        : null
    }
  }
}
</script>
