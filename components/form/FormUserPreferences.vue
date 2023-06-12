<template>
  <div class="bg-white px-6 py-8 lg:px-12 lg:py-14">
    <div class="grid grid-cols-1 divide-y-gray-400 divide-y gap-12 lg:gap-16">
      <div class="">
        <Heading as="h2" :level="2">
          Ma disponibilité pour réaliser des actions bénévoles
        </Heading>
        <div class="text-lg text-[#3A3A3A] mt-4">
          Ces informations sont utilisées pour vous suggérer des missions en fonction de votre agenda.
        </div>
        <div class="mt-12 space-y-8">
          <div class="flex lg:space-x-10 items-center">
            <div class="hidden lg:block w-[90px]">
              <img
                src="/images/icons/calendar.svg"
                alt=""
                class=""
                data-not-lazy
              >
            </div>
            <div>
              <FormLabel html-for="frequence" required size="xl">
                Combien de temps pourriez-vous allouer à des actions de bénévolat&nbsp;?
              </FormLabel>
              <div class="mt-4 flex flex-col sm:flex-row gap-4 lg:gap-6">
                <div class="lg:w-1/2">
                  <SelectAdvanced
                    v-model="form.commitment__duration"
                    name="commitment__duration"
                    placeholder="Durée"
                    :options="$labels.duration"
                    @blur="validate('commitment__duration')"
                  />
                  <FormError v-if="errors.commitment__duration">
                    {{ errors.commitment__time_period }}
                  </FormError>
                </div>
                <div class="flex-none text-lg font-semibold sm:mt-2">
                  par
                </div>
                <div class="lg:w-1/2">
                  <SelectAdvanced
                    v-model="form.commitment__time_period"
                    name="commitment__time_period"
                    placeholder="Fréquence"
                    :options="$labels.time_period"
                    @blur="validate('commitment__time_period')"
                  />
                  <FormError v-if="errors.commitment__time_period">
                    {{ errors.commitment__time_period }}
                  </FormError>
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <div class="lg:pl-[130px]">
              <FormControl
                label="Cochez les créneaux pendant lesquels vous seriez disponible"
                label-size="xl"
                html-for="disponibilities"
                required
                :error="errors.disponibilities"
              >
                <TagsGroup
                  v-model="form.disponibilities"
                  name="disponibilities"
                  variant="button"
                  :options="$labels.disponibilities"
                  class="mt-6"
                  @updated="validate('disponibilities')"
                />
              </FormControl>
            </div>
          </div>
        </div>
      </div>
      <div class="pt-8 lg:pt-14">
        <div class="flex lg:space-x-10 items-center">
          <div class="hidden lg:block  w-[90px]">
            <img
              src="/images/icons/send-mail.svg"
              alt=""
              data-not-lazy
            >
          </div>
          <div>
            <Toggle
              v-model="form.is_visible"
              class="flex-1"
              position="right"
              size="xl"
              label="Recevoir des propositions de missions par les organisations"
              description="Recevez par e-mail des suggestions de missions de bénévolat"
            />
          </div>
        </div>
      </div>

      <div class="pt-8 lg:pt-14">
        <div class="text-3xl font-bold text-black">
          Quelles activités de bénévolat peuvent vous intéresser ?
        </div>
        <TagsGroup
          v-model="form.activities"
          name="activites"
          variant="button"
          :options="activitiesOptions"
          is-model
          class="mt-12"
        />
      </div>
      <div class="pt-8 lg:pt-14">
        <div class="text-3xl font-bold text-black">
          Les compétences que vous pourriez apporter
        </div>
        <FormControl label="Renseignez certaines de vos compétences" html-for="algolia-search" class="mt-12">
          <AlgoliaSkillsInput
            :items="form.skills"
            class="max-w-xl"
            @add-item="handleSelectSkillItems"
          />
        </FormControl>

        <div v-if="form.skills.length" class="mt-6">
          <div class="flex flex-wrap gap-4">
            <TagFormItem
              v-for="item in form.skills"
              :key="item.id"
              :tag="item"
              @removed="onRemovedSkillItem"
            >
              {{ item.name }}
            </TagFormItem>
          </div>
        </div>
      </div>
      <div class="hidden sm:block pt-8 lg:pt-14">
        <div class="text-center">
          <Button size="lg" variant="primary" :loading="loading" @click.native="handleSubmit()">
            Mettre à jour
          </Button>
        </div>
      </div>
      <div
        :class="[
          'sm:hidden fixed bottom-0 p-4 bg-white z-50 w-full left-0 right-0',
        ]"
        style="box-shadow: 0 25px 20px 30px rgb(0 0 0 / 25%);"
      >
        <div class="">
          <Button size="lg" class="w-full" variant="primary" :loading="loading" @click.native="handleSubmit()">
            Mettre à jour
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { object, array, string } from 'yup'
import FormErrors from '@/mixins/form/errors'
import FormUploads from '@/mixins/form/uploads'
import Emailable from '@/mixins/emailable.client'
import Button from '@/components/dsfr/Button.vue'
import TagsGroup from '@/components/dsfr/TagsGroup.vue'
import activitiesOptions from '@/assets/activities.json'
import AlgoliaSkillsInput from '@/components/section/search/AlgoliaSkillsSearch'

export default {
  components: {
    Button,
    TagsGroup,
    AlgoliaSkillsInput
  },
  mixins: [FormErrors, FormUploads, Emailable],
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      form: cloneDeep(this.profile),
      activitiesOptions: activitiesOptions.sort((a, b) =>
        a.name.localeCompare(b.name)),
      formSchema: object({
        commitment__duration: string().nullable().required('Merci de choisir une durée'),
        commitment__time_period: string().nullable().required('Merci de choisir une fréquence'),
        disponibilities: array().transform(v => (!v ? [] : v)).test(
          'test-disponibilities-required',
          'Merci de sélectionner au moins 1 disponibilité',
          (disponibilities) => {
            return ['admin'].includes(this.$store.getters.contextRole) || disponibilities.length >= 1
          }
        )
      }),
      domainsOptions: [
        'Art et culture pour tous',
        'Bénévolat de compétences',
        'Éducation pour tous',
        'Mémoire et citoyenneté',
        'Prévention et protection',
        'Protection de la nature',
        'Solidarité et insertion',
        'Sport pour tous'
      ]
    }
  },
  computed: {

  },
  methods: {
    async handleSubmit () {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await this.$store.dispatch('auth/updateProfile', {
            id: this.$store.getters.profile.id,
            ...this.form
          })
          this.$toast.success('Modifications enregistrées')
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleSelectSkillItems (item) {
      this.$set(this.form, 'skills', [...this.form.skills, item])
    },
    onRemovedSkillItem (item) {
      this.form.skills = this.form.skills.filter(skill => skill.id !== item.id)
    }
  }
}
</script>

<style>

</style>
