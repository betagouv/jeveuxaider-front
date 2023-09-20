<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div v-if="showTitle" class="uppercase font-semibold text-gray-600">
        {{ title }}
      </div>
      <slot v-if="showAction" name="action">
        <DsfrLink v-if="showAction" :to="linkAction" class="text-jva-blue-500">
          {{ linkLabel }}
        </DsfrLink>
      </slot>
    </div>
    <BaseBox :variant="boxVariant" :padding="boxPadding">
      <BaseDescriptionList>
        <BaseDescriptionListItem
          v-if="
            profile.user?.departments_as_referent && profile.user.departments_as_referent.length > 0
          "
          term="Référent dep."
          :description="`${profile.user.departments_as_referent[0].number} - ${profile.user.departments_as_referent[0].name}`"
        />
        <BaseDescriptionListItem
          v-if="profile.user?.regions_as_referent && profile.user.regions_as_referent.length > 0"
          term="Référent rég."
          :description="profile.user.regions_as_referent[0].name"
        />
        <BaseDescriptionListItem
          v-if="$stores.auth.contextRole === 'admin'"
          term="User ID"
          :description="profile.user_id"
        />
        <BaseDescriptionListItem
          term="Crée le"
          :description="$dayjs(profile.created_at).format('D MMMM YYYY à HH:mm')"
        />
        <BaseDescriptionListItem
          v-if="profile.user"
          term="Der. connexion"
          :description="
            profile.user.last_online_at ? $dayjs(profile.user.last_online_at).fromNow() : null
          "
        />
        <BaseDescriptionListItem term="Nom" :description="profile.full_name" />
        <BaseDescriptionListItem term="Email" :description="profile.email" />
        <BaseDescriptionListItem term="Code postal" :description="profile.zip" />
        <BaseDescriptionListItem
          term="Profession"
          :description="$filters.label(profile.type, 'profile_type')"
        />
        <BaseDescriptionListItem term="Mobile" :description="profile.mobile" />
        <BaseDescriptionListItem term="Téléphone" :description="profile.phone" />
        <BaseDescriptionListItem
          term="Âge"
          :description="$dayjs(profile.birthday).fromNow('year')"
        />
        <BaseDescriptionListItem term="Disponibilités" :description="formattedCommitment" />
        <BaseDescriptionListItem
          v-if="profile.activities"
          term="Activités"
          :description="profile.activities.map((item) => item.name).join(', ')"
        />
        <BaseDescriptionListItem
          v-if="profile.skills"
          term="Compétences"
          :description="profile.skills.map((item) => item.name).join(', ')"
        />
      </BaseDescriptionList>
      <BaseDescriptionListItemMasquerade
        v-if="$stores.auth.contextRole === 'admin'"
        :profile="profile"
      />
    </BaseBox>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    profile: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      default: 'Profil',
    },
    showAction: {
      type: Boolean,
      default: true,
    },
    linkAction: {
      type: String,
      default: '/profile/edit',
    },
    linkLabel: {
      type: String,
      default: 'Modifier',
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    boxVariant: {
      type: [String],
      default: 'flat',
    },
    boxPadding: {
      type: [String, Boolean],
      default: 'xs',
    },
  },
  computed: {
    formattedCommitment() {
      if (this.profile.commitment__time_period) {
        return `${this.$filters.label(
          this.profile.commitment__duration,
          'duration'
        )} par ${this.$filters.label(this.profile.commitment__time_period, 'time_period')}`
      }
      return this.profile.commitment__duration
        ? this.$filters.label(this.profile.commitment__duration, 'duration')
        : null
    },
  },
})
</script>
