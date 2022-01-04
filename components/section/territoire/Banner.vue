<template>
  <section class="relative">
    <img
      v-if="banner"
      :src="banner"
      :alt="`Bénévolat ${territoire.name}`"
      class="absolute object-cover object-center w-full h-full"
    >
    <div class="banner-gradient absolute inset-0" style="" />

    <div class="relative">
      <Breadcrumb theme="transparent" :items="breadcrumb" class="px-4" />

      <hr class="opacity-25">

      <div class="px-4 max-w-3xl mx-auto lg:max-w-7xl">
        <div
          class="py-20 flex flex-col lg:flex-row items-center gap-16 lg:gap-32"
        >
          <div class="text-white">
            <h1
              class="text-4xl lg:text-5xl leading-none font-extrabold text-white tracking-[-1px] lg:tracking-[-2px]"
            >
              Devenez bénévole {{ territoire.suffix_title }}
            </h1>

            <hr class="border-t-4 w-10 my-8">

            <h2 class="text-xl tracking-[-1px]">
              Trouvez une mission de
              <b class="font-extrabold">
                bénévolat {{ territoire.suffix_title }}
              </b>
              parmi les missions actuellement disponibles et faites vivre
              l'engagement de chacun pour tous
            </h2>
          </div>

          <div class="flex-none rounded-2xl w-full sm:w-auto">
            <div class="bg-white px-8 sm:px-20 py-6">
              <p
                class="font-extrabold text-[1.75rem] text-center leading-tight tracking-[-1px]"
              >
                Trouvez une nouvelle<br>cause à défendre
              </p>
            </div>

            <div class="bg-gray-100 px-10 py-6">
              <p
                class="text-center uppercase text-gray-700 text-xs tracking-[-1px] font-bold"
              >
                Choisissez un domaine d'action
              </p>

              <!-- <el-select
                  v-model="domaine"
                  placeholder="Choisissez un domaine d'action"
                  class="mb-4 rounded-2xl"
                >
                  <el-option
                    v-for="item in domaines"
                    :key="item.id"
                    :label="item.name.fr"
                    :value="item.name.fr"
                  />
                </el-select> -->
              <SelectAdvanced
                v-model="domaine"
                class="mb-4"
                name="domaine"
                placeholder="Choisissez un domaine d'action"
                :options="domaines.map((item) => { return {key: item.id, label: item.name.fr}})"
              />

              <button
                class="
                w-full
                flex
                items-center
                justify-center
                border
                border-transparent
                rounded-2xl
                text-white
                !outline-none
                focus:ring
                transition
                duration-150
                hover:scale-105
                transform
                will-change-transform
                ease-in-out
                font-bold
                text-xl
                px-5
                py-4
                leading-none"
                style="background-color: #09c19d"
                @click="onClick"
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
import slugify from 'slugify'

export default {
  props: {
    territoire: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      domaines: [],
      domaine: 'Solidarité et insertion'
    }
  },
  async fetch () {
    // @TODO: Fetch from labels.json
    const domaines = await this.$axios.get('/tags', { params: { 'filter[type]': 'domaine' } })
    this.domaines = domaines.data.data
  },
  computed: {
    banner () {
      return this.territoire.banner?.large
    },
    breadcrumb () {
      const breadcrumb = [
        { label: 'Missions de bénévolat', link: '/missions-benevolat' }
      ]
      if (this.territoire.type !== 'department' && this.territoire.department) {
        const departmentName = this.$options.filters.label(this.territoire.department, 'departments')

        breadcrumb.push({
          label:
            departmentName !== this.territoire.name
              ? `Bénévolat ${departmentName}`
              : `Bénévolat département ${departmentName}`,
          link: `/departements/${slugify(departmentName)}`
        })
      }

      breadcrumb.push({
        label: `Bénévolat ${this.territoire.name}`,
        h1: true
      })

      return breadcrumb
    }
  },
  methods: {
    link (withDomaine = true, type = this.territoire.type) {
      let link = null
      switch (type) {
        case 'department':
          link = `refinementList[department_name][0]=${this.$options.filters.label(this.territoire.department, 'departments')}`
          break
        case 'city':
          link = `refinementList[type][0]=Mission en présentiel&aroundLatLng=${this.territoire.latitude},${this.territoire.longitude}&place=${this.territoire.zips[0]}&aroundRadius=35000`
          break
      }
      return withDomaine
        ? `/missions-benevolat?refinementList[domaines][0]=${this.domaine}&${link}`
        : `/missions-benevolat?${link}`
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
</style>
