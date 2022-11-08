<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div v-if="showTitle" class="uppercase font-semibold text-gray-600">
        {{ title }}
      </div>
      <slot v-if="showAction" name="action">
        <Link v-if="showAction" :to="linkAction" icon="ChevronRightIcon">
          {{ linkLabel }}
        </Link>
      </slot>
    </div>
    <Box :variant="boxVariant" :padding="boxPadding">
      <DescriptionList>
        <DescriptionListItem v-if="profile.user?.departments_as_referent && profile.user.departments_as_referent.length > 0" term="Référent dep." :description="`${profile.user.departments_as_referent[0].number} - ${profile.user.departments_as_referent[0].name}`" />
        <DescriptionListItem v-if="profile.user?.regions_as_referent && profile.user.regions_as_referent.length > 0" term="Référent rég." :description="profile.user.regions_as_referent[0].name" />
        <DescriptionListItem v-if="$store.getters.contextRole === 'admin'" term="User ID" :description="profile.user_id" />
        <DescriptionListItem term="Crée le" :description="$dayjs(profile.created_at).format('D MMMM YYYY à HH:mm')" />
        <!-- todo timeago il y a -->
        <DescriptionListItem v-if="profile.user" term="Der. connexion" :description="profile.user.last_online_at ? $dayjs(profile.user.last_online_at).fromNow() : null" />
        <DescriptionListItem term="Nom" :description="profile.full_name" />
        <DescriptionListItem term="Email" :description="profile.email" />
        <DescriptionListItem term="Code postal" :description="profile.zip" />
        <DescriptionListItem term="Profession" :description="$options.filters.label(profile.type,'profile_type')" />
        <DescriptionListItem term="Mobile" :description="profile.mobile" />
        <DescriptionListItem term="Téléphone" :description="profile.phone" />
        <DescriptionListItem term="Date de naissance" :description="profile.birthday" />
        <DescriptionListItem
          v-if="profile.activities"
          term="Activités"
          :description="profile.activities.map((item) => item.name).join(', ')"
        />
        <DescriptionListItem
          v-if="profile.skills"
          term="Compétences"
          :description="profile.skills.map((item) => item.name).join(', ')"
        />
      </DescriptionList>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default: 'Profil'
    },
    showAction: {
      type: Boolean,
      default: true
    },
    linkAction: {
      type: String,
      default: '/profile/edit'
    },
    linkLabel: {
      type: String,
      default: 'Modifier'
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    boxVariant: {
      type: [String],
      default: 'flat'
    },
    boxPadding: {
      type: [String, Boolean],
      default: 'xs'
    }
  }
}
</script>
