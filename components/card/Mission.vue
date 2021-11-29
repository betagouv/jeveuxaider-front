<template>
  <div
    class="card--mission h-auto flex flex-col flex-1 bg-white rounded-xl overflow-hidden safari-fix-scale"
  >
    <div class="thumbnail--wrapper relative">
      <img
        v-if="thumbnail"
        :srcset="thumbnail"
        :alt="domaine.name.fr"
        class="w-full h-full object-cover"
        width="300"
        height="143"
      >

      <div class="custom-gradient absolute inset-0" />

      <div
        class="absolute px-[30px] mb-2 bottom-0 left-0 text-white text-[15px] w-full"
      >
        <div class="truncate">
          <span>📍</span>

          <template
            v-if="mission.city && mission.type == 'Mission en présentiel'"
          >
            <template v-if="mission.zip">
              <span class="font-bold">{{ missionCity }}</span>
              <span>({{ mission.zip }})</span>
            </template>

            <template v-else-if="mission.department">
              <span class="font-bold">{{ missionCity }}</span>
              <span>({{ mission.department }})</span>
            </template>

            <template v-else>
              <span class="font-bold">{{ missionCity }}</span>
            </template>
          </template>

          <template v-else>
            Mission à distance
          </template>
        </div>
      </div>

      <div
        v-if="formattedDate"
        class="absolute top-0 flex justify-center inset-x-0"
      >
        <div class="pill !rounded-t-none">
          {{ formattedDate }}
        </div>
      </div>
    </div>

    <div class="mx-8 my-6 flex-1 flex flex-col items-start">
      <Badge :color="domaine.id" class="uppercase mb-4">
        {{ domaine.name.fr }}
      </Badge>

      <h3
        :title="mission.name"
        class="font-black text-black text-lg relative mb-auto line-clamp-3"
      >
        {{ mission.name }}
      </h3>

      <div
        class="text-gray-500 text-sm mt-2 truncate max-w-full"
        v-text="mission.structure.name"
      />

      <div
        v-if="mission.provider == 'api_engagement'"
        class="text-gray-500 text-sm self-stretch"
      >
        <div class="flex items-center justify-between space-x-8">
          <div>
            <div>Mission proposée par</div>
            <div class="font-bold text-black">
              {{ mission.publisher_name }}
            </div>
          </div>
          <img
            :src="mission.publisher_logo"
            :alt="mission.publisher_name"
            width="70px"
            class="h-auto max-h-[38px] object-contain"
          >
        </div>
      </div>
    </div>

    <div
      class="border-t p-4 text-center flex items-center justify-center space-x-2"
      :class="[domainColor(domaine.id)]"
    >
      <span class="text-sm font-bold">
        {{ placesLeftText }}
      </span>

      <ExternalSvg v-if="mission.provider == 'api_engagement'" class="flex-none" width="15" height="16" />
    </div>
  </div>
</template>

<script>
import MixinColorsDomaines from '@/mixins/colors-domaines'
import MixinMission from '@/mixins/mission'
import ExternalSvg from '@/static/images/icons/external.svg?inline'

export default {
  components: {
    ExternalSvg
  },
  mixins: [MixinMission, MixinColorsDomaines],
  props: {
    mission: {
      type: Object,
      default: null
    }
  },
  computed: {
    placesLeftText () {
      if (
        this.mission.publisher_name &&
        this.mission.publisher_name !== 'Réserve Civique' &&
        this.mission.places_left > 99
      ) {
        return 'Plusieurs bénévoles recherchés'
      } else if (this.mission.places_left && this.mission.places_left > 0) {
        return (
          this.$options.filters.pluralize(
            this.mission.places_left,
            'bénévole recherché',
            'bénévoles recherchés'
          )
        )
      } else {
        return this.mission.has_places_left === false
          ? 'Complet'
          : 'Plusieurs bénévoles recherchés'
      }
    },
    formattedDate () {
      const startDate = this.mission.start_date
      if (!startDate) {
        return
      }

      const now = this.$dayjs()
      const startDateObject =
        Number.isInteger(startDate) && this.$dayjs.unix(startDate).isValid()
          ? this.$dayjs.unix(startDate)
          : this.$dayjs(startDate, 'YYYY-MM-DD HH:mm:ss', 'fr', true).isValid()
            ? this.$dayjs(startDate, 'YYYY-MM-DD HH:mm:ss')
            : this.$dayjs(startDate).isValid()
              ? this.$dayjs(startDate)
              : null

      return startDateObject && startDateObject.isAfter(now)
        ? `À partir du ${startDateObject.format('D MMMM')}`
        : null
    },
    missionCity () {
      if (this.mission.city?.includes('Paris')) {
        return 'Paris'
      } else if (this.mission.city?.includes('Lyon')) {
        return 'Lyon'
      } else if (this.mission.city?.includes('Marseille')) {
        return 'Marseille'
      } else {
        return this.mission?.city
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.card--mission {
  box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.05);
  @apply transition;
  @screen sm {
    &:hover {
      .thumbnail--wrapper img {
        transform: scale(1.05);
      }
      @apply shadow-xl;
    }
  }
}

.thumbnail--wrapper {
  height: 143px;
  @apply bg-gray-200 overflow-hidden;
  img {
    transition: all 0.4s ease-in-out;
  }
}

.pill {
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 11px;
  font-weight: bold;
  color: #171725;
  height: 23.5px;
  @apply px-3 inline-flex items-center truncate;
}

.custom-gradient {
  background: linear-gradient(
    183.3deg,
    rgba(0, 0, 0, 0) 66.74%,
    rgba(0, 0, 0, 0.7) 102.8%
  );
}
</style>
