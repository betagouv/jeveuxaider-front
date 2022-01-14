<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="uppercase font-semibold text-gray-600">
        Informations
      </div>
      <Link to="/profile/edit" icon="ChevronRightIcon">
        Modifier
      </Link>
    </div>
    <Box variant="flat" padding="xs">
      <DescriptionList>
        <DescriptionListItem term="Crée le" :description="$dayjs(profile.created_at).format('D MMMM YYYY à HH:mm')" />
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
          :description="profile.domaines.map((item) => $options.filters.label(item, 'domaines')).join(', ')"
        />
        <DescriptionListItem
          v-if="profile.skills"
          term="Compétences"
          :description="profile.skills.map((item) => item.name.fr).join(', ')"
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
    }
  }
}
</script>
