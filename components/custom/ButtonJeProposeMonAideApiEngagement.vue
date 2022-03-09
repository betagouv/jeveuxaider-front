<template>
  <a
    :href="url"
    target="_blank"
    class="flex items-center border font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 hover:shadow-lg hover:scale-105 transform transition disabled:opacity-25 disabled:cursor-not-allowed text-white bg-jva-green-500 hover:bg-jva-green-600 border-transparent focus:ring-jva-green-500 px-6 py-3 text-lg w-full justify-center rounded-full max-w-xs mx-auto"
  >
    <span>Je propose mon aide</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4 ml-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  </a>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  methods: {
    onClick () {
      window.plausible &&
        window.plausible('Click CTA - Mission API Engagement', {
          props: { isLogged: this.$store.getters.isLogged }
        })
    }
  }
}
</script>
