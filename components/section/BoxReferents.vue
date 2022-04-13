<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">
        Référents
      </div>
      <Link :to="`/admin/utilisateurs?filter[role]=referent&filter[referent_department]=${department}`" icon="ChevronRightIcon">
        Consulter
      </Link>
    </div>
    <Box :variant="boxVariant" :padding="boxPadding" :loading="loading">
      <DescriptionList>
        <div
          v-for="referent,i in referents"
          :key="referent.id"
        >
          <DescriptionListItem
            term="Nom"
            :description="referent.full_name"
          />
          <DescriptionListItem
            term="Email"
            :description="referent.email"
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
export default {
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
    this.loading = true
    const { data: referents } = await this.$axios.get('/profiles', {
      params: {
        pagination: 0,
        'filter[role]': 'referent',
        'filter[referent_department]': this.department,
        include: 'user'
      }
    })
    this.loading = false
    this.referents = referents.data
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
