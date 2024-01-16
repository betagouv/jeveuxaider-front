<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        v-scroll-lock="isOpen"
        :is-open="isOpen"
        theme="warning"
        :title="modalTitle"
        :prevent-click-outside="true"
        :hide-close="true"
        @close="$emit('cancel')"
      >
        <div class="formatted-text">
          <template v-if="value">
            <p>
              Vous êtes sur le point de mettre en ligne toutes les missions validées gérées par
              <strong>{{ responsable.full_name }}</strong>
              <span class="text-gray-500">#{{ responsable.id }}</span
              >. Les missions seront de nouveau visibles dans la recherche.
            </p>
            <p>
              Nombre de missions actuellement hors ligne :
              <strong>{{ profileStats?.missions_offline }}</strong
              ><br />

              <DsfrLink
                :to="`/admin/missions?filter[responsable.id]=${responsable.id}&filter[is_online]=false`"
                target="_blank"
                class="text-sm"
              >
                Voir les missions concernées
              </DsfrLink>
            </p>
          </template>
          <template v-else>
            <p>
              Vous êtes sur le point de mettre hors ligne toutes les missions validées gérées par
              <strong>{{ responsable.full_name }}</strong>
              <span class="text-gray-500">#{{ responsable.id }}</span
              >. Les missions <strong>n'apparaîtront plus dans la recherche</strong> et il sera
              impossible pour de nouveaux bénévoles de s'y inscrire.
            </p>
            <p>
              Nombre de missions :
              <strong>{{ profileStats?.missions_available }}</strong
              ><br />

              <DsfrLink
                :to="`/admin/missions?filter[responsable.id]=${responsable.id}&filter[available]=available`"
                target="_blank"
                class="text-sm"
              >
                Voir les missions concernées
              </DsfrLink>
            </p>
          </template>
        </div>

        <template #footer>
          <BaseButton
            :disabled="loading"
            class="mr-3"
            variant="white"
            @click.native="$emit('cancel')"
          >
            Annuler
          </BaseButton>
          <BaseButton :disabled="loading" :loading="loading" @click.native="onConfirm()">
            Confirmer
          </BaseButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
export default defineNuxtComponent({
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    responsable: {
      type: Object,
      required: true,
    },
    profileStats: {
      type: Object,
      required: true,
    },
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    modalTitle() {
      return this.value
        ? 'Activer les missions validées du responsable'
        : 'Désactiver les missions validées du responsable'
    },
    toastMessageSucess() {
      return this.value
        ? 'Les missions ont bien été mises en ligne.'
        : 'Les missions ont bien été mises hors ligne.'
    },
  },
  methods: {
    async onConfirm() {
      if (this.loading) {
        return
      }

      this.loading = true
      await apiFetch(`profiles/${this.responsable.id}/setMissionsIsActive`, {
        method: 'POST',
        body: {
          is_active: this.value,
        },
      })
      this.$toast.success(this.toastMessageSucess)
      this.loading = false
      this.$emit('confirm')
    },
  },
})
</script>
