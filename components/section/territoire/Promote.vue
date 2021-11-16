<template>
  <div>
    <section
      class="section-promote bg-white"
      :class="[{ 'bg-[#fafaff]': territoire.type == 'city' }]"
    >
      <div class="container px-4 mx-auto">
        <div
          :class="[
            {
              'transform -translate-y-32 -mb-32 lg:-translate-y-1/2':
                territoire.type != 'city',
            },
          ]"
        >
          <div class="shadow-lg rounded-2xl overflow-hidden">
            <div class="relative">
              <img
                src="/images/bg-promote.jpg"
                srcset="/images/bg-promote@2x.jpg 2x"
                class="bg-img absolute object-cover w-full h-full"
              >

              <div
                class="absolute inset-0 w-full h-full opacity-[0.85]"
                style="background-color: #070191"
              />
              <div class="absolute inset-0 w-full h-full gradient" />

              <div class="relative text-white">
                <div class="flex items-stretch flex-col lg:flex-row">
                  <div
                    class="flex-shrink-0 p-8 lg:p-10 xl:p-16 lg:border-r flex"
                  >
                    <img
                      src="/images/territoires/jva_logo_territoires.svg"
                      alt="Je Veux Aider"
                      width="150px"
                      class="m-auto"
                    >
                  </div>

                  <div class="flex flex-col w-full">
                    <div class="px-4 lg:pt-8 lg:px-10 xl:px-16">
                      <h2
                        class="text-2xl xl:text-[1.75rem] tracking-[-1px] font-semibold mb-8 text-center lg:text-left"
                      >
                        Favoriser et promouvoir l’engagement de chacun pour tous
                      </h2>
                    </div>

                    <div class="flex flex-wrap">
                      <div
                        class="pb-4 sm:p-4 md:px-8 lg:px-10 xl:px-16 xl:pb-8 sm:border-r flex-grow w-full sm:w-1/2 lg:w-auto text-center lg:text-left"
                      >
                        <div class="font-extrabold text-4xl">
                          1ère
                        </div>
                        <div class="text-lg">
                          plateforme<br>d'engagement
                        </div>
                      </div>
                      <div
                        class="p-4 md:px-8 lg:px-10 xl:px-16 xl:pb-8 sm:border-r flex-grow w-full sm:w-1/2 lg:w-auto text-center lg:text-left"
                      >
                        <div class="font-extrabold text-4xl">
                          330 000
                        </div>
                        <div class="text-lg">
                          bénévoles inscrits<br>depuis 2018
                        </div>
                      </div>
                      <div
                        class="p-4 pb-8 md:px-8 lg:px-12 xl:px-16 flex-grow w-full sm:w-1/2 lg:w-auto text-center lg:text-left"
                      >
                        <div class="font-extrabold text-4xl">
                          5000
                        </div>
                        <div class="text-lg">
                          organisations publiques<br>et associatives
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  }
}
</script>

<style lang="postcss" scoped>
.gradient {
  background: linear-gradient(94.64deg, #070191 20%, rgba(7, 1, 145, 0) 77%);
}

.section-promote * {
  border-color: #3936a5;
}
</style>
