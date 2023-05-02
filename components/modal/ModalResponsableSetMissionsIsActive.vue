<template>
  <portal to="body-end">
    <Modal
      v-scroll-lock="isOpen"
      :is-open="isOpen"
      theme="warning"
      :title="modalTitle"
      :prevent-click-outside="true"
      @close="$emit('cancel')"
    >
      <div class="formatted-text">
        <template v-if="value">
          <p>
            Vous êtes sur le point d'activer toutes les missions validées gérées par <strong>{{ responsable.full_name }}</strong> <span class="text-gray-500">#{{ responsable.id }}</span>. Les missions seront de nouveau visibles dans la recherche.
          </p>
          <p>
            Nombre de missions actuellement désactivées : <strong>{{ profileStats?.missions_inactive }}</strong><br>

            <Link
              :to="`/admin/missions?filter[responsable.id]=${responsable.id}&filter[is_active]=false`"
              target="_blank"
              class="text-sm"
            >
              Voir les missions concernées
            </Link>
          </p>
        </template>
        <template v-else>
          <p>
            Vous êtes sur le point de désactiver toutes les missions validées gérées par <strong>{{ responsable.full_name }}</strong> <span class="text-gray-500">#{{ responsable.id }}</span>. Les missions <strong>n'apparaîtront plus dans la recherche</strong> et il sera impossible pour de nouveaux bénévoles de s'y inscrire.
          </p>
          <p>
            Nombre de missions : <strong>{{ profileStats?.missions_available }}</strong><br>

            <Link
              :to="`/admin/missions?filter[responsable.id]=${responsable.id}&filter[available]=available`"
              target="_blank"
              class="text-sm"
            >
              Voir les missions concernées
            </Link>
          </p>
        </template>
      </div>

      <template #footer>
        <Button class="mr-3" variant="white" @click.native="$emit('cancel')">
          Annuler
        </Button>
        <Button @click.native="onConfirm()">
          Confirmer
        </Button>
      </template>
    </Modal>
  </portal>
</template>

<script>
import Link from '@/components/dsfr/Link.vue'

export default {
  components: {
    Link
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    responsable: {
      type: Object,
      required: true
    },
    profileStats: {
      type: Object,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    modalTitle () {
      return this.value ? 'Activer les missions validées du responsable' : 'Désactiver les missions validées du responsable'
    },
    toastMessageSucess () {
      return this.value ? 'Les missions ont bien été activées.' : 'Les missions ont bien été désactivées.'
    }
  },
  methods: {
    async onConfirm () {
      if (this.loading) {
        return
      }

      this.loading = true
      await this.$axios.post(`profiles/${this.responsable.id}/setMissionsIsActive`, {
        is_active: this.value
      })
      this.$toast.success(this.toastMessageSucess)
      this.loading = false
      this.$emit('confirm')
    }
  }
}
</script>
