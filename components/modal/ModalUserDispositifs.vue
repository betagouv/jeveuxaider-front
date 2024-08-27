<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :is-open="isOpen"
        title="Ajouter un dispositif"
        :prevent-click-outside="true"
        @close="$emit('cancel')"
      >
        <div v-if="!selectedItem" class="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div
            class="p-4 flex flex-col items-center border-2 border-[DDDDDD] hover:border-jva-blue-500 hover:bg-[#F5F5FE] cursor-pointer"
          >
            <img
              src="/images/logo-service-civique.png"
              srcset="/images/logo-service-civique.png, /images/logo-service-civique@2x.png 2x"
              alt="Service Civique"
              title="Service Civique"
              class="hidden lg:block flex-none h-[50px] w-auto object-contain object-left"
              data-not-lazy
            />
            <div class="mt-2 font-medium">Service Civique</div>
          </div>
          <div
            class="p-4 flex flex-col items-center border-2 border-[DDDDDD] hover:border-jva-blue-500 hover:bg-[#F5F5FE] cursor-pointer"
          >
            <img
              src="/images/logo-cej.png"
              srcset="/images/logo-cej.png, /images/logo-cej@2x.png 2x"
              alt="Contrat d'Engagement Jeune"
              title="Contrat d'Engagement Jeune"
              class="hidden lg:block flex-none h-[50px] w-auto object-contain object-left"
              data-not-lazy
            />
            <div class="mt-2 font-medium">CEJ</div>
          </div>
          <div
            class="p-4 flex flex-col items-center border-2 border-[DDDDDD] hover:border-jva-blue-500 hover:bg-[#F5F5FE] cursor-pointer"
          >
            <img
              src="/images/logo-france-travail.svg"
              alt="France Travail"
              title="France Travail"
              class="hidden lg:block flex-none h-[50px] w-auto object-contain object-left"
              data-not-lazy
            />
            <div class="mt-2 font-medium">France travail</div>
          </div>
        </div>
        <div v-else class="">
          <template v-if="selectedItem === 'service_civique'">
            <DsfrFormControl
              label="Date de début de votre Service Civique"
              html-for="service_civique_completion_date"
              :error="errors.service_civique_completion_date"
              required
            >
              <DsfrInput
                v-model="form.service_civique_completion_date"
                required
                type="date"
                name="service_civique_completion_date"
                @blur="validate('service_civique_completion_date')"
              />
            </DsfrFormControl>
          </template>
        </div>

        <template #footer>
          <DsfrButton type="secondary" @click="$emit('cancel')"> Annuler </DsfrButton>
          <DsfrButton is-submit @click="$emit('submit')"> Enregistrer </DsfrButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
export default defineNuxtComponent({
  components: {},
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    profile: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      selectedItem: null,
    }
  },
})
</script>
