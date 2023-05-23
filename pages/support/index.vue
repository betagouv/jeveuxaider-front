<template>
  <div>
    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Support' },
          { text: `Objectifs & Topitos` },
        ]"
      />
    </portal>

    <div class="space-y-12 mb-24">
      <SectionHeading :title="`Alors, on en est où aujourd'hui?`" :secondary-title="`Bonjour ${$store.state.auth.user.profile.first_name }`" />
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    Breadcrumb
  },
  layout: 'support',
  data () {
    return {
    }
  },
  methods: {

  }

}
</script>
