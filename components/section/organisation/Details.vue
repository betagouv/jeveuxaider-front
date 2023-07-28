<template>
  <div class="py-28">
    <div class="container grid grid-cols-1">
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
      <div class="mt-12 grid grid-cols-12 gap-12">
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

      <div class="mt-24 grid grid-cols-2 gap-10">
        <div class="relative">
          <img
            :srcset="srcSet"
            class="min-h-[630px] h-full w-auto object-cover"
            @error="onIllustrationError"
          >
          <div class="absolute bottom-7 left-7">
            <div class="flex space-x-4">
              <a
                v-if="organisation.website"
                :href="organisation.website"
                target="_blank"
                class="bg-white hover:bg-blue-50 text-jva-blue-500 h-12 w-12 flex items-center justify-center"
              >
                <RiLink class="h-6 w-6 fill-current" />
              </a>
              <a
                v-if="organisation.facebook"
                target="_blank"
                :href="organisation.facebook"
                class="bg-white hover:bg-blue-50 text-jva-blue-500 h-12 w-12 flex items-center justify-center"
              >
                <RiFacebookCircleFill class="h-6 w-6 fill-current" />
              </a>
              <a
                v-if="organisation.twitter"
                target="_blank"
                :href="organisation.twitter"
                class="bg-white hover:bg-blue-50 text-jva-blue-500 h-12 w-12 flex items-center justify-center"
              >
                <RiTwitterFill class="h-6 w-6 fill-current" />
              </a>
              <a
                v-if="organisation.instagram"
                target="_blank"
                :href="organisation.instagram"
                class="bg-white hover:bg-blue-50 text-jva-blue-500 h-12 w-12 flex items-center justify-center"
              >
                <RiInstagramFill class="h-6 w-6 fill-current" />
              </a>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-10">
          <div class="p-10 bg-white shadow-2xl">
            <IconPeuImporte class="-mt-3 w-[80px] h-[80px]" />
            <div class="text-5xl font-bold">
              {{ organisation.missions_available_count }}
            </div>
            <div class="text-2xl font-bold">
              {{ $options.filters.pluralize(organisation.missions_available_count, 'mission', 'missions', false) }} de bénévolat
            </div>
            <div class="text-[#666666]">
              sur JeVeuxAider.gouv.fr
            </div>
          </div>
          <div class="p-10 bg-white shadow-2xl">
            <template v-if="participationsCount === 0">
              <IconSuccess class="-mt-3 w-[80px] h-[80px]" />
            </template>
            <template v-else>
              <div class="flex mb-4">
                <img
                  v-for="(portrait, index) in portraits"
                  :key="index"
                  :src="portrait"
                  alt=""
                  :class="[{ '-ml-2': index !== 0 }]"
                  class="portrait rounded-full"
                  style="width: 52px"
                >
              </div>
            </template>
            <div class="text-5xl font-bold">
              {{ participationsCount }}
            </div>
            <div class="text-2xl font-bold">
              {{ $options.filters.pluralize(participationsCount, 'bénévole déjà passé', 'bénévoles déjà passés', false) }} par là
            </div>
            <div class="text-[#666666]">
              grâce à JeVeuxAider.gouv.fr
            </div>
          </div>
          <div class="p-10 bg-white shadow-2xl">
            <div class="text-2xl font-bold">
              Informations
            </div>
            <div class="mt-4 flex flex-col gap-4">
              <div class="flex space-x-3">
                <div class="w-[20px]">
                  <RiMapPinFill class="mt-1 w-[16px] text-[#929292] fill-current" />
                </div>
                <div class="flex-1">
                  <p class="font-bold">
                    Siège de l’association
                  </p>
                  <p>{{ organisation.full_address || 'Non renseigné' }}</p>
                </div>
              </div>
              <div class="flex space-x-2">
                <div class="w-[20px]">
                  <RiMailFill class="mt-1 w-[16px] text-[#929292] fill-current" />
                </div>
                <div class="flex-1">
                  <Link>
                    <span class="break-all">{{ organisation.email || 'Non renseigné' }}</span>
                  </Link>
                </div>
              </div>
              <div class="flex space-x-2">
                <div class="w-[20px]">
                  <RiPhoneFill class="mt-1 w-[16px] text-[#929292] fill-current" />
                </div>
                <div class="flex-1">
                  <p>{{ organisation.phone || 'Non renseigné' }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              style="border: 0; min-height: 300px"
              loading="lazy"
              allowfullscreen
              :src="`https://www.google.com/maps/embed/v1/place?key=${$config.google.places}
            &q=${organisation.full_address}`"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from '@/components/dsfr/Tag.vue'
import MixinDomaines from '@/mixins/domaines'
import IconPeuImporte from '@/static/images/icons/dsfr/peu_importe.svg?inline'
import IconSuccess from '@/static/images/icons/dsfr/success.svg?inline'

export default {
  components: {
    Tag,
    IconPeuImporte,
    IconSuccess
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
  computed: {
    participationsCount () {
      return this.organisation.participations_count
    },
    portraits () {
      const portraits = []
      const randomNumbers = []
      const portraitsCount = 74 // The total number of portraits existing
      const portraitsToGetCount = Math.min(this.participationsCount, 3)

      while (randomNumbers.length < portraitsToGetCount) {
        const result = Math.floor(Math.random() * portraitsCount) + 1
        if (!randomNumbers.includes(result)) {
          randomNumbers.push(result)
        }
      }

      randomNumbers.forEach((i) => {
        portraits.push(`/images/portraits/${i}.png`)
      })

      return portraits
    }
  },
  methods: {
    onIllustrationError ($event) {
      $event.target.srcset = '/images/organisation-default-1.webp'
    }
  }
}
</script>
