<template>
  <div id="infos" class="relative bg-white md:grid md:grid-cols-3 lg:grid-cols-2">
    <!-- LEFT -->
    <div class="col-span-2 lg:col-span-1">
      <div class="max-w-3xl ml-auto">
        <div class="p-4 py-8 md:p-8 xl:p-16">
          <h2
            class="mb-6 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
          >
            <span
              >Contactez
              {{
                $filters.label(organisation.statut_juridique, 'structure_legal_status', 'label2')
              }}
            </span>
            <br class="hidden xl:block" />
            <span class="font-extrabold">{{ organisation.name }}</span>
          </h2>

          <div class="mb-8">
            <div class="text-gray-400 font-bold uppercase tracking-wider text-sm">Adresse</div>
            <p>{{ organisation.full_address }}</p>
          </div>

          <div>
            <div class="text-gray-400 font-bold uppercase tracking-wider text-sm">Contact</div>
            <p>
              <span v-if="organisation.phone">{{ organisation.phone }}<br /></span>
              <span v-if="organisation.email">{{ organisation.email }}</span>
              <span v-if="!organisation.email && !organisation.phone"> Non renseigné </span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT -->
    <div>
      <iframe
        width="100%"
        height="100%"
        style="border: 0; min-height: 320px"
        loading="lazy"
        allowfullscreen
        :src="`https://www.google.com/maps/embed/v1/place?key=${googlePlacesKey}
            &q=${organisation.full_address}`"
      />
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    organisation: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const runtimeConfig = useRuntimeConfig()

    return {
      googlePlacesKey: runtimeConfig.public.google.places,
    }
  },
})
</script>
