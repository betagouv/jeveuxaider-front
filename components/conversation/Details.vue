<template>
  <div class="message--details">
    <section>
      <h2 class="text-xl leading-8 font-bold text-gray-900">
        Mission proposée par {{ participation.mission.structure.name }}
      </h2>
      <div
        v-if="participation.mission.responsable"
        class="text-lg leading-8 font-semibold text-secondary"
      >
        Responsable : {{ participation.mission.responsable.full_name }}
      </div>
      <div class="flex flex-wrap mt-2">
        <nuxt-link
          :to="`/missions-benevolat/${participation.mission.id}/${participation.mission.slug}`"
          class="rounded-full border py-1 px-3 text-sm font-bold text-gray-900 hover:shadow-md hover:border-black transition"
        >
          Consulter la fiche
        </nuxt-link>
      </div>
    </section>

    <ConversationBenevole v-if="!isBenevole" />

    <section>
      <div v-if="participation.mission.domaine" class="mb-4">
        <img
          class="bg-primary rounded-md p-3"
          :src="participation.mission.domaine.image"
          width="56"
          :alt="participation.mission.domaine.name.fr"
        />
      </div>

      <h3 class="text-xl leading-8 font-bold text-gray-900 mb-4">
        {{ participation.mission.name }}
      </h3>

      <div class="font-light">
        La participation est
        <span
          class="font-bold text-primary"
          :class="{
            'text-[#f6ad55]': participation.state == 'En attente de validation',
            'text-[#03543f]': participation.state == 'Validée',
            'text-[#f56565]': participation.state == 'Refusée',
          }"
          >{{ participation.state | lowercase }}</span
        >
      </div>

      <ButtonParticipationCancel
        v-if="isBenevole && participation.state == 'En attente de validation'"
        class="mt-3"
        :form="participation"
        @updated="onParticipationUpdate"
        @messages-added="
          $store.commit('messaging/incrementNewMessagesCount', $event.count)
        "
      />

      <hr class="my-6" />

      <div class="flex mb-6">
        <div
          v-if="participation.mission.start_date"
          class="w-1/2 border-r pr-4"
        >
          <div class="text-sm text-gray-500 mb-4 font-light">Début</div>
          <div class="font-light">
            {{ participation.mission.start_date | formatCustom('ddd D MMM') }}
          </div>
          <div class="text-2xl">
            {{ participation.mission.start_date | formatCustom('HH[h]mm') }}
          </div>
        </div>
        <div v-if="participation.mission.end_date" class="w-1/2 ml-4">
          <div class="text-sm text-gray-500 mb-4 font-light">Fin</div>
          <div class="font-light">
            {{ participation.mission.end_date | formatCustom('ddd D MMM') }}
          </div>
          <div class="text-2xl">
            {{ participation.mission.end_date | formatCustom('HH[h]mm') }}
          </div>
        </div>
      </div>

      <div
        v-if="participation.mission.type == 'Mission en présentiel'"
        class="mb-6"
      >
        <div class="text-sm text-gray-500 mb-4 font-light">Adresse</div>
        <div class="font-light">
          {{ participation.mission.address }}<br />
          {{ participation.mission.zip }} {{ participation.mission.city }}
        </div>
      </div>

      <div class="mb-6">
        <div class="-m-2">
          <div
            v-if="participation.mission.type"
            class="px-4 py-1 m-2 shadow-md inline-flex text-sm font-semibold rounded-full bg-gray-100 text-gray-500"
          >
            {{ participation.mission.type }}
          </div>
        </div>
      </div>
    </section>

    <template v-if="isBenevole">
      <section>
        <h3 class="text-xl leading-8 font-bold text-gray-900 mb-4">
          Objectif de la mission
        </h3>
        <div class="font-light" v-html="participation.mission.objectif"></div>
      </section>

      <section>
        <h3 class="text-xl leading-8 font-bold text-gray-900 mb-4">
          Description de la mission
        </h3>
        <div
          class="font-light"
          v-html="participation.mission.description"
        ></div>
      </section>

      <section>
        <h3 class="text-xl leading-8 font-bold text-gray-900 mb-4">
          Public bénéficiaire
        </h3>
        <ul>
          <li
            v-for="beneficiaryPublic in participation.mission
              .publics_beneficiaires"
            :key="beneficiaryPublic"
            class="flex items-start font-light"
          >
            <div class="flex-shrink-0" style="margin-top: 2px">
              <svg
                class="h-5 w-5 text-jva-green"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <p class="ml-3">
              {{
                beneficiaryPublic
                  | labelFromValue('mission_publics_beneficiaires')
              }}
            </p>
          </li>
        </ul>
      </section>

      <section>
        <h3 class="text-xl leading-8 font-bold text-gray-900 mb-4">
          Commentaires de l'organisation
        </h3>
        <div
          class="font-light"
          v-html="participation.mission.information"
        ></div>
      </section>
    </template>
  </div>
</template>

<script>
export default {
  computed: {
    conversation() {
      return this.$store.getters['messaging/conversation']
    },
    participation() {
      return this.conversation.conversable
    },
    isBenevole() {
      return (
        this.participation.profile_id == this.$store.getters.user.profile.id
      )
    },
  },
  methods: {
    async onParticipationUpdate(participation) {
      // A participation update adds 1 or 2 new messages, so re-fetch them.
      const messages = await this.$api.fetchMessages(this.conversation.id, {
        itemsPerPage:
          this.$store.getters['messaging/messages'].length +
          this.$store.getters['messaging/newMessagesCount'],
      })
      this.$store.commit('messaging/setMessages', messages.data.data)

      // Refresh the conversation to get the latest message
      // up to date (inside the teaser)
      await this.$store.dispatch(
        'messaging/refreshConversation',
        this.conversation
      )
    },
  },
}
</script>

<style lang="postcss" scoped>
.message--details {
  background-color: #ebebeb;
}

section,
::v-deep section {
  @apply bg-white p-6;
  &:not(:last-of-type) {
    @apply mb-1;
  }
}

hr {
  @apply border-gray-200;
}
</style>
