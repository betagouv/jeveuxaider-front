<template>
  <div class="py-2 sm:gap-4" :class="[{'sm:grid sm:grid-cols-3': !termSize}, {'sm:flex': termSize}]">
    <dt class="text-sm text-gray-500" :style="style">
      Masquerade
    </dt>
    <dd class="mt-1 text-sm text-gray-900 font-semibold sm:mt-0 sm:col-span-2" style="word-break: break-word;">
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
    },
    termSize: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      style: {
        width: this.termSize ? `${this.termSize}px` : 'auto'
      }
    }
  },
  methods: {
    async handleImpersonate () {
      await this.$store.dispatch('auth/impersonate', this.profile.user_id)
    }
  }
}
</script>
