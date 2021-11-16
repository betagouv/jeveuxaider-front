<template>
  <div class="overflow-hidden">
    <hr class="opacity-25">

    <section class="section-subscribe bg-[#EEEDF8] relative">
      <div class="relative z-10 container mx-auto px-4 lg:px-12">
        <div class="pt-16 pb-8 lg:py-28">
          <h2 class="max-w-2xl mb-12">
            <p class="uppercase text-[#f56565] font-extrabold text-sm mb-4">
              Chacun pour tous
            </p>

            <p
              class="text-4xl xl:text-5xl leading-none font-extrabold tracking-[-1px] lg:tracking-[-2px] text-primary"
            >
              Suivez toute l'actualité du bénévolat
              {{ territoire.suffix_title }}
            </p>
          </h2>

          <p class="md:text-xl text-gray-700 sm:max-w-md md:max-w-lg mb-8">
            Trouvez des missions en quelques clics et devenez bénévole près de
            chez vous ou à distance
          </p>

          <div
            class="rounded-2xl py-4 px-6 sm:pr-4 sm:pl-8 bg-white shadow-lg lg:-mx-8"
            :class="[{ 'inline-block': submitted }]"
            style="max-width: 746px"
          >
            <el-form
              v-if="!submitted"
              ref="subscribeForm"
              :model="form"
              :rules="rules"
              class="flex flex-wrap sm:flex-nowrap gap-4 sm:gap-8"
            >
              <div class="input-wrapper relative">
                <el-form-item prop="email">
                  <el-input
                    v-model="form.email"
                    type="email"
                    placeholder="Renseignez votre e-mail"
                    class="w-full"
                  />
                </el-form-item>
              </div>

              <button
                :disabled="loading"
                class="w-full sm:w-auto sm:flex-none flex items-center justify-center border border-transparent rounded-2xl text-white !outline-none focus:ring transition duration-150 hover:scale-105 transform will-change-transform ease-in-out font-bold text-xl px-5 py-4 sm:px-8 sm:py-4 sm:pb-5 leading-none"
                style="background-color: #09c19d"
                @click.prevent="onSubmit"
              >
                Je m'engage
              </button>
            </el-form>

            <div v-else class="flex flex-wrap items-center">
              <div class="font-bold tracking-[-1px] w-full sm:w-auto">
                Merci pour votre inscription&nbsp;!
              </div>
              <button
                ref="buttonBack"
                class="mt-4 sm:ml-4 sm:mt-0 px-4 py-2 text-sm cursor-pointer rounded-lg bg-green-100 text-[#03543f] font-extrabold !outline-none focus:ring transition duration-150 hover:scale-105 transform will-change-transform ease-in-out"
                @click="onBack"
              >
                Retour
              </button>
            </div>
          </div>

          <p
            class="text-gray-600 text-sm mt-6 sm:max-w-md md:max-w-lg lg:max-w-full"
          >
            En m'inscrivant j'accepte la
            <nuxt-link to="/charte-reserve-civique" class="hover:underline">
              <strong>politique de confidentialité</strong>
            </nuxt-link>
            et la
            <nuxt-link
              to="/politique-de-confidentialite"
              class="hover:underline"
            >
              <strong>charte</strong>
            </nuxt-link>
            de JeVeuxAider.gouv.fr
          </p>
        </div>
      </div>

      <div
        class="max-w-md ml-auto xl:max-w-full h-full relative sm:absolute right-0 bottom-0 sm:pt-36 lg:pt-8 z-0"
      >
        <img
          src="/images/subscribe-pattern.svg"
          class="ml-auto w-full h-full object-contain object-right-bottom absolute"
        >
        <img
          src="/images/subscribe-illustration.png"
          srcset="/images/subscribe-illustration@2x.png 2x"
          :alt="`Suivez toute l'actualité du bénévolat
              ${territoire.suffix_title}`"
          class="ml-auto w-full h-full object-contain object-right-bottom relative"
        >
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    territoire: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      form: {},
      loading: false,
      submitted: false,
      error: null,
      rules: {
        email: [
          {
            required: true,
            message: 'Veuillez renseigner un email',
            trigger: 'change'
          },
          {
            type: 'email',
            message: "Le format de l'email n'est pas correct",
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.loading = true
      this.$refs.subscribeForm.validate(async (valid, fields) => {
        if (valid) {
          await this.$axios.post('/sendinblue/contact', {
            email: this.form.email,
            zipcode: this.territoire.zips ? this.territoire.zips[0] : null,
            department: this.territoire.department
          })
          this.submitted = true
        }
        this.loading = false
      })
    },
    onBack () {
      this.form.email = ''
      this.submitted = false
    }
  }
}
</script>

<style lang="postcss" scoped>
.input-wrapper {
  @apply w-full;

  &::after {
    content: 'E-MAIL';
    position: absolute;
    pointer-events: none;
    left: 0;
    top: 12px;
    font-size: 12px;
    color: black;
    letter-spacing: -0.1px;
    line-height: 18px;
    font-weight: bold;
  }

  .el-form-item {
    @apply mb-0;
  }

  .el-input {
    position: relative;
    top: 22px;
    margin-bottom: 25px;
    left: -15px;
    box-shadow: none !important;
    ::v-deep input {
      border: none !important;
    }
  }

  ::v-deep .el-form-item__error {
    top: auto;
    bottom: -3px;
  }
}
</style>
