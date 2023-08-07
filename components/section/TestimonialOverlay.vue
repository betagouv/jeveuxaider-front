<template>
  <portal to="body-end">
    <transition
      enter-active-class="ease-out duration-300"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <Overlay v-if="isOpen" :is-open="isOpen" title="Laissez votre témoignage" @close="onCloseOverlay">
        <div class="text-center">
          <h1
            class="text-2xl sm:leading-tight font-bold text-jva-blue-500 tracking-[-1px]"
          >
            <template v-if="currentStepIndex < 2">
              {{ benevole.first_name }}, comment s'est déroulée votre mission&nbsp;?
            </template>
            <template v-else>
              Merci pour votre retour&nbsp;!
            </template>
          </h1>

          <div v-if="currentStepIndex < 2" class="font-medium text-md sm:text-xl text-[#808080] mt-6">
            {{ mission.name }}
          </div>

          <template v-if="currentStepIndex === 0">
            <div class="py-8">
              <StarRating
                v-model="form.grade"
                :rating="form.grade"
                class="justify-center"
                :show-rating="false"
                inactive-color="#E0E0E0"
                active-color="#EF9F03"
                :rounded-corners="true"
                :stars-size="50"
                :padding="10"
                @rating-selected="onRatingSelected"
              />
            </div>

            <div class="sm:text-lg text-[#808080] max-w-[420px] mx-auto">
              Cette note est <strong>réservée à l’administration</strong> pour
              améliorer la qualité des missions proposées.
            </div>
          </template>

          <template v-if="currentStepIndex === 1">
            <div
              class="py-8 max-w-[638px] mx-auto grid gap-6 lg:gap-8"
              style="filter: drop-shadow(0px 20px 50px rgba(0, 0, 0, 0.15))"
            >
              <FormControl
                html-for="testimony"
              >
                <Textarea
                  v-model="form.testimony"
                  name="testimony"
                  :placeholder="placeholder"
                  @blur="validate('testimony')"
                />
              </FormControl>

              <div class="">
                <Button
                  type="submit"
                  size="xl"
                  full
                  :loading="loading"
                  @click.native="onSubmit"
                >
                  {{ labelCta }}
                </Button>

                <Link class="mt-4" icon="RiArrowLeftLine" icon-position="left" @click.native="currentStepIndex--">
                  Retour à l'étape précédente
                </Link>
              </div>
            </div>
          </template>

          <template v-if="currentStepIndex === 2">
            <template v-if="form.grade >= 3">
              <div class="font-medium text-md sm:text-xl text-[#808080] mt-6">
                Partagez votre expérience chez
                <strong>{{ structure.name }}</strong> sur vos réseaux
              </div>

              <div class="flex justify-center space-x-5 mt-4">
                <ShareFacebook :url="mission.full_url" size="lg" />
                <ShareTwitter :url="mission.full_url" :message="message" size="lg" />
                <ShareLinkedin :url="mission.full_url" :message="message" size="lg" />
                <!-- <ShareMail :url="mission.full_url" :message="message" size="lg" /> -->
                <ShareWhatsApp :url="mission.full_url" :message="message" size="lg" />
              </div>
            </template>
            <template v-else>
              <div
                class="font-medium text-md sm:text-xl text-[#808080] max-w-[745px] mt-4"
              >
                La mission n’a malheureusement pas été à la hauteur de votre
                engagement. {{ structureType }} {{ structure.name }} et l’équipe de
                JVA vont tout mettre en oeuvre pour améliorer l’expérience durant
                cette mission.
              </div>
            </template>

            <Link class="mt-8" @click.native="onCloseOverlay">
              Fermer
            </Link>
          </template>
        </div>
      </Overlay>
    </transition>
  </portal>
</template>

<script>
import { string, object, number } from 'yup'
import FormErrors from '@/mixins/form/errors'
import Link from '@/components/dsfr/Link.vue'
import ShareFacebook from '@/components/share/Facebook.vue'
import ShareTwitter from '@/components/share/Twitter.vue'
import ShareLinkedin from '@/components/share/Linkedin.vue'
// import ShareMail from '@/components/share/Mail.vue'
import ShareWhatsApp from '@/components/share/WhatsApp'

export default {
  name: 'TestimonialOverlay',
  components: {
    Link,
    ShareFacebook,
    ShareTwitter,
    ShareLinkedin,
    // ShareMail,
    ShareWhatsApp
  },
  mixins: [FormErrors],
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    participation: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      currentStepIndex: 0,
      form: {},
      formSchema: object({
        grade: number().required('Une note est requise'),
        testimony: string().min(50).required('Votre témoignage est requis')
      }),
      message: encodeURIComponent("J'ai réalisé une mission de bénévolat grâce à #JeVeuxAider. Rejoignez le mouvement #ChacunPourTous"),
      testimonialHasBeenCreated: false
    }
  },
  computed: {
    mission () {
      return this.participation.mission
    },
    benevole () {
      return this.participation.profile
    },
    placeholder () {
      return this.form.grade < 3
        ? 'Dites-nous comment améliorer la qualité de cette mission'
        : 'Partagez votre expérience avec la communauté de bénévoles'
    },
    labelCta () {
      return this.form.grade < 3
        ? 'Partager mon retour'
        : 'Publier mon témoignage'
    },
    structure () {
      return this.participation.mission.structure
    },
    structureType () {
      let status = this.$options.filters
        .label(
          this.structure.statut_juridique,
          'structure_legal_status'
        )
        .toLowerCase()
      if (status == 'autre') {
        status = 'organisation'
      }
      return status.match('^[aieouAIEOU].*') ? `L'${status}` : `La ${status}`
    }
  },
  methods: {
    onRatingSelected (payload) {
      this.form.grade = payload
      this.currentStepIndex++
    },
    onSubmit () {
      this.loading = true
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await this.$axios.post('/temoignages', {
            ...this.form,
            participation_id: this.participation.id
          })
            .then(() => {
              this.currentStepIndex++
              this.testimonialHasBeenCreated = true
            })
            .catch((errors) => {
              this.setErrors(errors)
            })
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
    onCloseOverlay () {
      this.$emit('close', this.testimonialHasBeenCreated)
      this.currentStepIndex = 0
      this.form = {}
    }
  }
}
</script>
