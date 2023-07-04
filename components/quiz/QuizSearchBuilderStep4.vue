<template>
  <div class="px-[64px] py-[48px] lg:px-[80px] lg:py-[56px]">
    <div class="text-[40px] text-black font-bold mb-12 leading-snug">
      Sélectionnez les activités pour lesquelles vous souhaitez aider
    </div>
    <div class="mb-12">
      <TagsGroup
        v-model="selectedActivities"
        name="activites"
        variant="button"
        :options="selectableActivities"
        is-model
      />
    </div>
    <div class="flex items-center gap-8">
      <Button
        size="lg"
        icon="RiArrowRightLine"
        icon-position="right"
        :disabled="selectedActivities.length === 0"
        @click.native="handleClick"
      >
        Continuer
      </Button>
    </div>
  </div>
</template>

<script>
import activities from '@/assets/activities.json'
import TagsGroup from '@/components/dsfr/TagsGroup.vue'
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    TagsGroup,
    Button
  },
  props: {
    selectableActivitiesIds: {
      type: Array,
      default () {
        return [1, 2, 3]
      }
    }
  },
  data () {
    return {
      activities,
      selectedActivities: []
    }
  },
  computed: {
    selectableActivities () {
      return this.activities.filter(item => this.selectableActivitiesIds.includes(item.id))
    },
    selectedActivitiesNames () {
      return this.activities.filter(item => this.selectedActivities.flatMap(element => element.id).includes(item.id))
    }
  },
  mounted () {
    // console.log('route', this.$route)
  },
  methods: {
    handleClick () {
      console.log('selectedActivities', this.selectedActivities)
      console.log('selectedActivitiesNames', this.selectedActivitiesNames)

      this.$store.commit('quiz/setQuery', {
        ...this.$store.getters['quiz/query'],
        'activities.name': this.selectedActivitiesNames.map(activity => activity.name).join('|')
      })

      this.$router.push({
        path: '/missions-benevolat',
        query: this.$store.getters['quiz/query']
      })
    }
  }
}
</script>

<style>

</style>
