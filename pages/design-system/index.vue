<template>
  <div>@TODO page d'accueilss</div>
</template>

<script>
export default {
  layout: 'design-system',
  asyncData ({ redirect }) {
    redirect('/design-system/theme/texts')
  },
  data () {
    return {
      form: {}
    }
  }
}
</script>
