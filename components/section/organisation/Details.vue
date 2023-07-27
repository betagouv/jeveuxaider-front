<template>
  <div class="py-28">
    <div class="container grid grid-cols-1 gap-12">
      <h2
        class="text-3xl sm:text-5xl sm:!leading-[1.1] tracking-tighter"
      >
        <span class="relative">
          <span class="font-bold">{{ organisation.name }}</span> en quelques mots
          <img
            src="/images/home/sparkle-left.svg"
            alt=""
            width="61"
            height="67"
            aria-hidden="true"
            class="absolute top-[-23px] left-[-47px] pointer-events-none"
          >
        </span><br>
      </h2>
      <div class="grid grid-cols-12 gap-12">
        <div class="col-span-7">
          <TextFormatted :max-lines="6" :text="organisation.description" class="text-2xl leading-10" />
        </div>

        <div class="col-span-5 grid grid-cols-1 gap-10 border-l border-l-[#DBD5CE] pl-10">
          <div class="">
            <h3 class="text-2xl font-bold mb-4">
              Publics aidés
            </h3>
            <div v-if="organisation.publics_beneficiaires" class="flex flex-wrap gap-4">
              <Tag
                v-for="option,i in organisation.publics_beneficiaires"
                :key="i"
                size="md"
                :custom-theme="true"
                class="text-jva-blue-500 bg-[#E3E3FD]"
              >
                {{ option | label('mission_publics_beneficiaires') }}
              </Tag>
            </div>
          </div>
          <div class="">
            <h3 class="text-2xl font-bold mb-4">
              Causes défendues
            </h3>
            <div v-if="organisation.domaines" class="flex flex-wrap gap-4">
              <Tag
                v-for="domaine,i in organisation.domaines"
                :key="i"
                size="md"
                :custom-theme="true"
                :class="`${domaineBackgroundColor(domaine.id)} text-white`"
              >
                {{ $options.filters.label(domaine.id, 'domaines') }}
              </Tag>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-12">
        <div class="relative">
          <img
            :srcset="srcSet"
            class="min-h-[630px] w-auto object-cover"
            @error="onIllustrationError"
          >
          <div class="absolute bottom-7 left-7">
            <div class="flex space-x-4">
              <nuxt-link
                v-if="organisation.website"
                :to="organisation.website"
                class="bg-white hover:bg-blue-50 text-jva-blue-500 h-12 w-12 flex items-center justify-center"
              >
                <RiLink class="h-6 w-6 fill-current" />
              </nuxt-link>
              <nuxt-link
                v-if="organisation.facebook"
                :to="organisation.facebook"
                class="bg-white hover:bg-blue-50 text-jva-blue-500 h-12 w-12 flex items-center justify-center"
              >
                <RiFacebookCircleFill class="h-6 w-6 fill-current" />
              </nuxt-link>
              <nuxt-link
                v-if="organisation.twitter"
                :to="organisation.twitter"
                class="bg-white hover:bg-blue-50 text-jva-blue-500 h-12 w-12 flex items-center justify-center"
              >
                <RiTwitterFill class="h-6 w-6 fill-current" />
              </nuxt-link>
              <nuxt-link
                v-if="organisation.instagram"
                :to="organisation.instagram"
                class="bg-white hover:bg-blue-50 text-jva-blue-500 h-12 w-12 flex items-center justify-center"
              >
                <RiInstagramFill class="h-6 w-6 fill-current" />
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-12">
          <div class="bg-white shadow-2xl">
            Box 1
          </div>
          <div class="bg-white shadow-2xl">
            Box 2
          </div>
          <div class="bg-white shadow-2xl">
            Box 3
          </div>
          <div class="bg-white shadow-2xl">
            Box 4
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from '@/components/dsfr/Tag.vue'
import MixinDomaines from '@/mixins/domaines'

export default {
  components: {
    Tag
  },
  mixins: [MixinDomaines],
  props: {
    organisation: {
      type: Object,
      required: true
    },
    srcSet: {
      type: String,
      required: true
    }
  },
  methods: {
    onIllustrationError ($event) {
      $event.target.srcset = '/images/organisation-default-1.webp'
    }
  }
}
</script>
