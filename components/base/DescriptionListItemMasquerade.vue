<template>
  <div class="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
    <dt class="text-sm text-gray-500">
      Masquerade
    </dt>
    <dd class="mt-1 text-sm text-gray-900 font-semibold sm:mt-0 sm:col-span-2 break-words">
      <Link @click.native="handleImpersonate()">
        Prendre sa place
      </Link>
    </dd>
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  methods: {
    async handleImpersonate () {
      await this.$store.dispatch('auth/impersonate', this.profile.user_id)
    }
  }
}
</script>
