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
        <DescriptionListItem v-if="profile.referent_department" term="Référent dep." :description="`${profile.referent_department} - ${$options.filters.label(profile.referent_department, 'departments')}`" />
        <DescriptionListItem v-if="profile.referent_region" term="Référent dep." :description="profile.referent_region" />
        <DescriptionListItem v-if="profile.is_analyste" term="Analyste" description="Oui" />
        <DescriptionListItem v-if="$store.getters.contextRole === 'admin'" term="User ID" :description="profile.user_id" />
        <DescriptionListItem term="Crée le" :description="$dayjs(profile.created_at).format('D MMMM YYYY à HH:mm')" />
        <DescriptionListItem term="Dernière co." :description="profile.user.last_online_at ? $dayjs(profile.user.last_online_at).format('D MMMM YYYY à HH:mm') : null" />
        <DescriptionListItem term="Nom" :description="profile.full_name" />
        <DescriptionListItem term="Email" :description="profile.email" />
        <DescriptionListItem term="Code postal" :description="profile.zip" />
        <DescriptionListItem term="Profession" :description="$options.filters.label(profile.type,'profile_type')" />
        <DescriptionListItem term="Mobile" :description="profile.mobile" />
        <DescriptionListItem term="Téléphone" :description="profile.phone" />
        <DescriptionListItem term="Date de naissance" :description="profile.birthday" />
        <DescriptionListItem
          v-if="profile.domaines"
          term="Domaines"
          :description="profile.domaines.map((item) => $options.filters.label(item.id, 'domaines')).join(', ')"
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
