<template>
  <div>
    <BaseDrawer
      :is-open="showDrawerInvitation"
      form-id="form-invitation"
      submit-label="Envoyer l'invitation"
      @close="showDrawerInvitation = false"
    >
      <template #title>
        <BaseHeading :level="3"> Inviter une nouvelle antenne </BaseHeading>
      </template>
      <FormInvitation
        class="mt-8"
        role="responsable_antenne"
        :invitable-id="reseau.id"
        invitable-type="App\Models\Reseau"
        @submited="handleSubmitInvitation"
      />
    </BaseDrawer>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">Antennes</div>
      <BaseLink
        :to="`/admin/organisations?filter[ofReseau]=${reseau.id}&reseau_name=${reseau.name}`"
        icon="RiArrowRightSLine"
      >
        Consulter
      </BaseLink>
    </div>
    <BaseBox variant="flat" padding="xs" :loading="!stats">
      <template v-if="stats">
        <div class="flex items-center">
          <div class="text-4xl font-semibold pr-4">
            {{ stats.organisations_actives }}
          </div>
          <div>
            <div class="font-semibold">
              {{
                $filters.pluralize(
                  stats.organisations_actives,
                  'antenne active',
                  'antennes actives',
                  false
                )
              }}
            </div>
            <div class="text-gray-500 -mt-1">
              sur {{ $filters.pluralize(stats.organisations, 'antenne') }}
            </div>
          </div>
        </div>
      </template>
      <div class="border-t -mx-4 xl:-mx-6 mt-6 mb-4" />
      <div
        class="flex justify-center items-center text-sm text-jva-blue-500 font-medium hover:underline cursor-pointer"
        @click="showDrawerInvitation = true"
      >
        Inviter une nouvelle antenne
      </div>
    </BaseBox>
  </div>
</template>

<script>
import FormInvitation from '@/components/form/FormInvitation.vue'

export default defineNuxtComponent({
  components: {
    FormInvitation,
  },
  props: {
    reseau: {
      type: Object,
      required: true,
    },
    stats: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      showDrawerInvitation: false,
    }
  },
  methods: {
    handleSubmitInvitation() {
      this.showDrawerInvitation = false
      this.$emit('updated')
    },
  },
})
</script>
