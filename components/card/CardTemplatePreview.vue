<template>
  <div class="border border-t-[8px] rounded-t border-t-jva-blue-500">
    <div class="grid grid-cols-1 p-8">
      <template v-if="!template"><slot></slot></template>
      <template v-else>
        <div class="pb-8 text-lg font-bold text-[#161616] border-b">
          {{ template.subtitle }}
        </div>
        <div class="py-8 border-b">
          <div class="uppercase text-[#666666] font-bold text-sm mb-2">Type de mission</div>
          <div class="font-medium">{{ template.title }}</div>
        </div>
        <div class="py-8 border-b">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div>
              <div class="uppercase text-[#666666] font-bold text-sm mb-2">
                Domaine d’action principal
              </div>
              <DsfrTag v-if="template.domaine_id" size="md">
                {{ $labels.domaines.find((domaine) => domaine.key === template.domaine_id)?.label }}
              </DsfrTag>
            </div>
            <div>
              <div class="uppercase text-[#666666] font-bold text-sm mb-2">
                Domaine d’action secondaire
              </div>
              <DsfrTag v-if="template.domaine_secondary_id" size="md">
                {{
                  $labels.domaines.find((domaine) => domaine.key === template.domaine_secondary_id)
                    ?.label
                }}
              </DsfrTag>
            </div>
          </div>
        </div>
        <div class="py-8 border-b">
          <div class="uppercase text-[#666666] font-bold text-sm mb-2">Description</div>
          <div class="formatted-text font-medium" v-html="template.description" />
        </div>
        <div class="py-8 border-b">
          <div class="uppercase text-[#666666] font-bold text-sm mb-2">Objectif</div>
          <div class="formatted-text font-medium" v-html="template.objectif" />
        </div>
        <div class="pt-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div>
              <div class="uppercase text-[#666666] font-bold text-sm mb-2">Activité principale</div>
              <DsfrBadge v-if="template.activity_id" size="md">
                {{ activities.find((activity) => activity.key === template.activity_id)?.name }}
              </DsfrBadge>
            </div>
            <div>
              <div class="uppercase text-[#666666] font-bold text-sm mb-2">Activité secondaire</div>
              <DsfrBadge v-if="template.activity_secondary_id" size="md">
                {{
                  activities.find((activity) => activity.key === template.activity_secondary_id)
                    ?.name
                }}
              </DsfrBadge>
            </div>
          </div>
        </div>
      </template>
    </div>
    <slot name="footer" />
  </div>
</template>

<script>
import activities from '@/assets/activities.json'

export default defineNuxtComponent({
  data() {
    return {
      activities,
    }
  },
  props: {
    template: {
      type: Object,
      default: null,
    },
  },
  methods: {},
})
</script>
