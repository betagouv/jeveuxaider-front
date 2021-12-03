<template>
  <div id="petit-mot" class="bg-[#FEF8F4] p-12 rounded-xl shadow-lg border-l-4 border-[#EADBD1] text-gray-800">
    <div class="flex justify-center flex-col lg:flex-row lg:items-start gap-6 items-start">
      <img
        srcset="/images/dashboard/giulietta.png, /images/dashboard/giulietta@2x.png 2x"
        alt="Gulietta"
        data-not-lazy
      >
      <div class="flex-1">
        <div class="text-xl mb-6">
          <span class="font-bold">Le petit mot de Giulietta</span> de l'équipe JeVeuxAider.gouv.fr
        </div>
        <div class="text-lg">
          “{{ item.body }}”
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      item: {
        user: {
          id: 1,
          profile: {
            first_name: 'Giulietta'
          }
        },
        body: "C'est la rentrée !  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem apriam, eaque ipsa quae ab illo veritatis dicta sunt explicabo"
      }
    }
  },
  created () {
    // @TODO: fetchLastPetitMot
  }
}
</script>

<style lang="postcss" scoped>
#petit-mot{
  background-image: url('/images/dashboard/bg-petit-mot.png');
  background-position: right 38px bottom 38px;
  background-repeat: no-repeat;
}
</style>
