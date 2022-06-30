<template>
  <div
    class="px-6 pt-10 pb-12 lg:px-8 lg:py-12 xl:px-16 xl:py-12 bg-[#D0E2FF] rounded-[10px] shadow-xl relative overflow-hidden"
  >
    <div class="flex flex-col text-center md:text-left h-full relative z-10">
      <h2
        class="text-4xl lg:text-[40px] lg:leading-[42px] tracking-tight mb-6 lg:mb-0 max-w-[442px] self-center md:self-auto"
      >
        <span>Un</span>
        <strong class="font-extrabold">e-mail par mois</strong>
        <span>pour plus d'engagement</span>
      </h2>

      <div id="newsletter-headline" class="text-[#696974] text-xl mb-7 lg:my-auto">
        Chaque mois, nous vous proposons de nouvelles missions de
        bénévolat à distance ou près de chez vous.
      </div>

      <form
        v-if="!form.isSuccess"
        aria-labelledby="newsletter-headline"
        class="relative flex flex-col lg:flex-row lg:items-start"
      >
        <input
          v-model="form.email"
          aria-label="Email address"
          type="email"
          required
          class="w-full px-5 py-3 appearance-none border-0 rounded-full text-gray-900 bg-white placeholder-gray-500 focus:placeholder-gray-400 transition mb-4 lg:mb-0 lg:mr-4 outline-none focus-visible:ring focus-visible:ring-jva-blue-500"
          placeholder="Renseignez votre e-mail"
        >

        <button
          class="w-full lg:w-auto flex items-center justify-center px-12 py-3 font-bold rounded-full text-white bg-jva-blue-500 hover:scale-105 transform transition outline-none focus-visible:ring focus-visible:ring-offset-1 focus-visible:ring-jva-blue-500"
          :class="[{'opacity-50 cursor-not-allowed': loading}]"
          @click.prevent="onSubmit()"
        >
          <img
            src="/images/homepage/envelope.svg"
            alt="Enveloppe"
            class="mr-2"
            width="16"
            height="14"
            data-not-lazy
          >
          <span>S'inscrire</span>
        </button>

        <div
          v-if="form.error"
          class="text-red-600 absolute w-full text-center md:text-left pt-2 bottom-0 translate-y-full"
        >
          {{ form.error }}
        </div>
      </form>

      <div
        v-else
        class="text-jva-green text-xl text-center md:text-left"
      >
        Merci&nbsp;! Vous êtes désormais inscrit(e) à notre
        newsletter&nbsp;😉
      </div>
    </div>

    <img
      src="/images/homepage/newsletter.svg"
      alt="Newsletter"
      class="hidden md:flex absolute top-[58px] right-0 transform translate-x-[101px] md:top-[72px] md:translate-x-[47px] md:w-[175px] lg:top-[80px] lg:translate-x-[-15px] xl:w-auto xl:top-[44px] xl:translate-x-[20px]"
      width="200"
      height="153"
    >
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      form: {
        email: '',
        error: '',
        isSuccess: false
      }
    }
  },
  methods: {
    onSubmit () {
      if (this.loading) {
        return
      }
      this.loading = true
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (re.test(String(this.form.email).toLowerCase())) {
        this.$axios
          .post('/sendinblue/contact', { email: this.form.email })
          .then(() => {
            this.form.isSuccess = true
          })
          .catch((error) => {
            console.log(error)
            this.form.error = 'Erreur !'
          })
          .finally(() => {
            this.loading = false
          })
      } else {
        this.form.error = "L'email renseigné n'est pas valide"
      }
    }
  }
}
</script>

<style>

</style>
