<template>
  <div class="bg-white p-6 shadow-xl rounded-xl">
    <div class="group flex justify-between items-end cursor-pointer">
      <div>
        <div class="text-gray-500 mb-1">
          Localisation
        </div>
        <div class="flex space-x-2 items-center text-gray-900">
          <template v-if="!$route.query.type || $route.query.type == 'Mission en présentiel'">
            <LocationMarkerIcon class="h-5 w-5" />
            <div v-if="$store.state.algoliaSearchMissions.results.aroundLatLng">
              Autour de moi
            </div>
            <div v-else>
              {{ $route.query.city }}
            </div>
          </template>
          <template v-else>
            <DesktopComputerIcon class="h-5 w-5" />
            <div>Depuis chez moi</div>
          </template>
        </div>
      </div>
      <PencilIcon class="text-gray-500 h-4 w-4 group-hover:text-gray-900 mb-1" />
    </div>
  </div>
</template>
