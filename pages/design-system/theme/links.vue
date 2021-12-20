<template>
  <div class="space-y-12">
    <div class="flex flex-col space-y-4">
      <div class="text-lg font-medium text-gray-900">
        Links
      </div>
      <div class="flex flex-col gap-2">
        <Link to="/components">
          Link to components ›
        </Link>
        <Link to="/components" icon="ArrowRightIcon">
          Link with icon
        </Link>
        <Link @click.native="onClick">
          Link with click
        </Link>
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
  },
  methods: {
    onClick () {
      alert('CLICK')
    }
  }
}
</script>
