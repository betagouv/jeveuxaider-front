<template>
  <Container2Cols>
    <template #breadcrumb>
      <Breadcrumb
        :items="[{ label: 'Mon profil' }]"
      />
    </template>
    <template #header>
      <SectionHeading title="Ravi de vous retrouver 👋" :secondary-title="`Bonjour ${$store.state.auth.user.profile.first_name }`">
        <template #action>
          <Button size="xl" icon="SearchIcon" @click.native="$store.commit('toggleSearchOverlay')">
            Trouver une mission
          </Button>
        </template>
      </Sectionheading>
    </template>
    <template #left>
      <Box :loading="loadingActions" loading-text="Récupération des actions en attente ...">
        <Heading as="h2" :level="3" class="mb-8">
          Vous avez {{ formattedActions.length }} action(s) en attente
        </Heading>
        <StackedList :divided="false">
          <StackedListItem
            v-for="action, i in formattedActions"
            :key="i"
            :icon="action.icon"
            :link="action.link"
            :icon-variant="action.iconVariant"
          >
            <div class="text-gray-900 font-semibold" v-html="action.title" />
            <div v-if="action.subtitle" class="text-gray-500 text-sm" v-html="action.subtitle" />
          </StackedListItem>
        </StackedList>
      </Box>
      <LePetitMot />
      <Box>Mes missions</Box>
    </template>
    <template #right>
      <CardProfile v-if="$store.state.auth.user" :profile="$store.state.auth.user.profile" />

      <Box v-if="$store.state.auth.user" padding="sm">
        <div class="space-y-8">
          <div class="">
            <div class="text-sm font-medium text-gray-500 mb-4">
              Domaines
            </div>
            <template v-if="$store.state.auth.user.profile.domaines.length">
              <div class="flex flex-wrap gap-4">
                <Badge v-for="domaine in $store.state.auth.user.profile.domaines" :key="domaine" :color="domaine" size="sm">
                  {{ domaine | label('domaines') }}
                </Badge>
              </div>
            </template>
            <template v-else>
              <div class="text-gray-400 font-semibold">
                Vous n'avez pas renseigné de domaine
              </div>
            </template>
          </div>
          <div class="">
            <div class="text-sm font-medium text-gray-500 mb-4">
              Disponibilités
            </div>
            <template v-if="$store.state.auth.user.profile.disponibilities.length">
              <div class="flex flex-wrap gap-4">
                <Badge v-for="item,i in $store.state.auth.user.profile.disponibilities" :key="i" color="gray-light" size="sm">
                  {{ $options.filters.label(
                    item,
                    'disponibilities'
                  ) }}
                </Badge>
                <template v-if="$store.state.auth.user.profile.commitment__duration">
                  <Badge color="gray-light" size="sm">
                    {{ $store.state.auth.user.profile.commitment__duration | label('duration') }}
                    <template v-if="$store.state.auth.user.profile.commitment__time_period">
                      par {{
                        $store.state.auth.user.profile.commitment__time_period | label('time_period')
                      }}
                    </template>
                  </Badge>
                </template>
              </div>
            </template>
            <template v-else>
              <div class="text-gray-400 font-semibold">
                Vous n'avez pas renseigné vos disponibilités
              </div>
            </template>
          </div>
          <div class="">
            <div class="text-sm font-medium text-gray-500 mb-4">
              Compétences
            </div>
            <template v-if="$store.state.auth.user.profile.skills.length">
              <div class="flex flex-wrap gap-4">
                <Badge v-for="skill in $store.state.auth.user.profile.skills" :key="skill.id" color="gray-light" size="sm">
                  {{ skill.name.fr }}
                </Badge>
              </div>
            </template>
            <template v-else>
              <div class="text-gray-400 font-semibold">
                Vous n'avez pas renseigné de compétence
              </div>
            </template>
          </div>
          <Button variant="white" icon="PencilIcon" full size="lg" @click.native="$router.push('/profile/edit')">
            Modifier mes informations
          </Button>
        </div>
      </Box>

      <Box>
        <Heading as="h2" :level="2" class="mb-8 font-extrabold">
          Suivez le guide
        </Heading>
        <StackedList>
          <StackedListItem
            v-for="link,i in links"
            :key="i"
            :icon="link.icon"
            :link="link.link"
          >
            <div class="group-hover:underline font-bold">
              {{ link.title }}
            </div>
          </StackedListItem>
        </StackedList>
      </Box>
      <HelpCenter />
    </template>
  </Container2Cols>
</template>

<script>
import MixinAction from '@/mixins/action'
import HelpCenter from '@/components/section/dashboard/HelpCenter'
import LePetitMot from '@/components/section/dashboard/LePetitMot'
import CardProfile from '@/components/card/CardProfile'

export default {
  components: {
    HelpCenter,
    LePetitMot,
    CardProfile
  },
  mixins: [MixinAction],
  layout: 'dashboard',
  middleware: 'authenticated',
  data () {
    return {
      loadingActions: true,
      links: [
        { icon: '🔎', title: 'Question 1', link: '#' },
        { icon: '📇', title: 'Question 2', link: '#' },
        { icon: '📇', title: 'Question 2', link: '#' }
      ]
    }
  },
  created () {
    this.$axios.get('/user/actions').then((response) => {
      this.loadingActions = false
      this.actions = response.data
    })
  }
}
</script>

<style>

</style>
