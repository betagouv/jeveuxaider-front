<template>
  <section class="relative bg-white">
    <picture v-if="territoire.banner">
      <source media="(min-width: 1024px)" :srcset="territoire.banner.urls.desktop" />
      <source
        media="(min-width: 768px) and (max-width: 1024px)"
        :srcset="territoire.banner.urls.tablet"
      />
      <NuxtImg
        ref="banner"
        :src="territoire.banner.urls.original"
        :srcset="territoire.banner.urls.mobile"
        sizes="100w"
        :alt="`Bénévolat ${territoire.name}`"
        width="425"
        height="572"
        class="banner absolute object-cover object-center w-full h-full"
        @error="$refs.banner.$el.remove()"
      />
    </picture>

    <div class="banner-gradient absolute inset-0" style="" />

    <div class="relative">
      <div class="px-4 max-w-3xl mx-auto lg:max-w-7xl xl:!container">
        <DsfrBreadcrumb v-if="showBreadcrumb" theme="white" :links="breadcrumb" />
      </div>

      <hr class="opacity-25" />

      <div class="px-4 max-w-3xl mx-auto lg:max-w-7xl">
        <div class="pt-20 lg:py-20 flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          <div class="text-white">
            <h2
              class="text-4xl lg:text-5xl leading-none font-extrabold text-white tracking-[-1px] lg:tracking-[-2px]"
            >
              Devenez bénévole {{ territoire.suffix_title }}
            </h2>

            <hr class="border-t-4 w-10 my-8" />

            <div class="text-xl tracking-[-1px]">
              Trouvez une mission de
              <b class="font-extrabold"> bénévolat {{ territoire.suffix_title }} </b>
              parmi les missions actuellement disponibles et faites vivre l'engagement de chacun
              pour tous
            </div>
          </div>

          <div
            v-if="showSearch"
            class="flex-none bg-transparent rounded-2xl w-full sm:w-auto shadow-lg lg:shadow-none"
          >
            <div class="bg-white rounded-t-2xl px-8 sm:px-20 py-6">
              <p class="font-extrabold text-[1.75rem] text-center leading-tight tracking-[-1px]">
                Trouvez une nouvelle<br />cause à défendre
              </p>
            </div>

            <div class="bg-gray-100 rounded-b-2xl px-10 py-6">
              <p class="text-center uppercase text-gray-700 text-xs tracking-[-1px] font-bold mb-4">
                Choisissez un domaine d'action
              </p>
              <BaseSelectAdvanced
                v-model="domaine"
                class="mb-4"
                name="domaine"
                placeholder="Tous les domaines d'action"
                :options="$labels.domaines"
              />

              <BaseButton variant="green" size="xl" full @click.native="onClick">
                Je veux aider
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import slugify from 'slugify'

export default defineNuxtComponent({
  props: {
    territoire: {
      type: Object,
      required: true,
    },
    showBreadcrumb: {
      type: Boolean,
      default: true,
    },
    showSearch: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      domaine: null, // Solidarite et insertion
    }
  },

  computed: {
    breadcrumb() {
      const breadcrumb = [{ text: 'Missions de bénévolat', to: '/missions-benevolat' }]
      if (
        this.territoire.type !== 'department' &&
        this.territoire.department &&
        this.territoire.department != '75'
      ) {
        const departmentName = this.$filters.label(this.territoire.department, 'departments')

        breadcrumb.push({
          text:
            departmentName !== this.territoire.name
              ? `Bénévolat ${departmentName}`
              : `Bénévolat département ${departmentName}`,
          to: `/departements/${slugify(departmentName, { lower: true })}`,
        })
      }

      breadcrumb.push({
        text: `Bénévolat ${this.territoire.name}`,
        is: 'h1',
      })

      return breadcrumb
    },
    domaineName() {
      return this.$filters.label(this.domaine, 'domaines')
    },
  },
  methods: {
    link(withDomaine = true, type = this.territoire.type) {
      let link = null
      switch (type) {
        case 'department':
          link = `department_name=${this.territoire.department} - ${this.$filters.label(
            this.territoire.department,
            'departments'
          )}`
          break
        case 'city':
          link = `type=Mission en présentiel&aroundLatLng=${this.territoire.latitude},${this.territoire.longitude}&city=${this.territoire.name}&aroundRadius=35000`
          break
      }

      return withDomaine && this.domaineName
        ? `/missions-benevolat?domaines=${this.domaineName}&${link}`
        : `/missions-benevolat?${link}`
    },
    onClick() {
      this.$router.push(this.link())
    },
  },
})
</script>

<style lang="postcss" scoped>
.banner-gradient {
  background: linear-gradient(90deg, rgba(11, 8, 86, 0.7) 8.07%, rgba(17, 14, 82, 0.147) 100%);
}

.banner,
.banner-gradient {
  height: calc(100% - 195px);
  @screen lg {
    height: 100%;
  }
}

:deep(.fr-breadcrumb) {
  padding: 18px 0 10px !important;
}
</style>
