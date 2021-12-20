<template>
  <div class="space-y-12">
    <div class="flex flex-col space-y-4">
      <div class="text-lg font-medium text-gray-900">
        Headings
      </div>
      <Heading as="h1" :level="1">
        Heading 1
      </Heading>
      <Heading as="h2" :level="2">
        Heading 2
      </Heading>
      <Heading as="h3" :level="3">
        Heading 3
      </Heading>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg font-medium text-gray-900">
        Text - XS
      </div>
      <div class="text-xs">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, vero, voluptas eum adipisci ad cupiditate excepturi corrupti illum aliquam mollitia quod ex ducimus nobis, porro voluptatum a vitae. In, laboriosam!
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg font-medium text-gray-900">
        Text - SM
      </div>
      <div class="text-sm">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, vero, voluptas eum adipisci ad cupiditate excepturi corrupti illum aliquam mollitia quod ex ducimus nobis, porro voluptatum a vitae. In, laboriosam!
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg font-medium text-gray-900">
        Text - BASE
      </div>
      <div class="text-base">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, vero, voluptas eum adipisci ad cupiditate excepturi corrupti illum aliquam mollitia quod ex ducimus nobis, porro voluptatum a vitae. In, laboriosam!
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg font-medium text-gray-900">
        Text - LG
      </div>
      <div class="text-lg">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, vero, voluptas eum adipisci ad cupiditate excepturi corrupti illum aliquam mollitia quod ex ducimus nobis, porro voluptatum a vitae. In, laboriosam!
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg font-medium text-gray-900">
        Text - XL
      </div>
      <div class="text-xl">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, vero, voluptas eum adipisci ad cupiditate excepturi corrupti illum aliquam mollitia quod ex ducimus nobis, porro voluptatum a vitae. In, laboriosam!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'design-system',
  data () {
    return {
      form: {}
    }
  }
}
</script>
