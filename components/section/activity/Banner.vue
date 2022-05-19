<template>
  <section class="relative bg-white">
    <picture v-if="activity.banner">
      <source
        media="(min-width: 1024px)"
        :srcset="activity.banner.urls.desktop"
      >
      <source
        media="(min-width: 768px) and (max-width: 1024px)"
        :srcset="activity.banner.urls.tablet"
      >
      <img
        :srcset="activity.banner.urls.mobile"
        :src="activity.banner.urls.original"
        sizes="100w"
        :alt="`Bénévolat ${activity.name}`"
        width="425"
        height="572"
        class="banner absolute object-cover object-center w-full h-full"
        @error="$event.target.remove()"
      >
    </picture>

    <div class="banner-gradient absolute inset-0" style="" />

    <div class="relative">
      <Breadcrumb v-if="showBreadcrumb" theme="transparent" :items="breadcrumb" class="container" />

      <hr class="opacity-25">

      <div class="px-4 max-w-3xl mx-auto lg:max-w-7xl">
        <div
          class="pt-20 lg:py-20 flex flex-col lg:flex-row items-center gap-16 lg:gap-32"
        >
          <div class="text-white">
            <h1
              class="text-4xl lg:text-5xl leading-none font-extrabold text-white tracking-[-1px] lg:tracking-[-2px]"
            >
              Réalisez une mission de bénévolat {{ activity.name }}
            </h1>

            <hr class="border-t-4 w-10 my-8">

            <h2 class="text-xl tracking-[-1px]">
              Trouvez une mission de
              <b class="font-extrabold">
                bénévolat {{ activity.name }}
              </b>
              parmi les missions actuellement disponibles et faites vivre
              l'engagement de chacun pour tous
            </h2>
          </div>

          <div v-if="showSearch" class="flex-none bg-transparent rounded-2xl w-full sm:w-auto shadow-lg lg:shadow-none lg:min-w-[450px] max-w-[550px]">
            <div class="bg-white rounded-t-2xl px-8 sm:px-20 py-6">
              <p
                class="font-extrabold text-[1.75rem] text-center leading-tight tracking-[-1px]"
              >
                Toutes les missions <br>de bénévolat
              </p>
            </div>

            <div class="bg-gray-100 rounded-b-2xl px-10 py-6">
              <p
                class="text-center uppercase text-gray-700 text-xs tracking-[-1px] font-bold mb-4"
              >
                Choisissez un département
              </p>
              <Combobox
                v-model="department"
                class="mb-4"
                name="department"
                placeholder="Toute la France"
                :options="$labels.departments.map((option) => { return { key: option.key, label: `${option.key} - ${option.label}` } })"
              />

              <Button
                variant="green"
                size="xl"
                full
                @click.native="onClick"
              >
                Je veux aider
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  props: {
    activity: {
      type: Object,
      required: true
    },
    showBreadcrumb: {
      type: Boolean,
      default: true
    },
    showSearch: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      department: null
    }
  },

  computed: {
    breadcrumb () {
      const breadcrumb = [
        { label: 'Missions de bénévolat', link: '/missions-benevolat' }
      ]
      breadcrumb.push({
        label: `Bénévolat ${this.activity.name}`,
        h1: true
      })

      return breadcrumb
    },
    departmentName () {
      return `${this.department} - ${this.$options.filters.label(this.department, 'departments')}`
    }
  },
  methods: {
    link () {
      if (this.department) {
        return `/missions-benevolat?refinementList[activity.name][0]=${this.activity.name}&refinementList[department_name][0]=${this.departmentName}`
      }
      return `/missions-benevolat?refinementList[activity.name][0]=${this.activity.name}`
    },
    onClick () {
      this.$router.push(this.link())
    }
  }
}
</script>

<style lang="postcss" scoped>
.banner-gradient {
  background: linear-gradient(
    90deg,
    rgba(11, 8, 86, 0.7) 8.07%,
    rgba(17, 14, 82, 0.147) 100%
  );
}

.banner,
.banner-gradient {
  height: calc(100% - 195px);
  @screen lg {
    height: 100%;
  }
}
</style>
