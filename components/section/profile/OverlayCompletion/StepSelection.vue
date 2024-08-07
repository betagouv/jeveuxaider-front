<script>
export default defineNuxtComponent({
  setup() {
    const { initialForm } = useProfileValidation()
    const { isMotMotivationCompleted, isSkillCompleted } = useProfileCompletion()

    return {
      initialForm,
      isMotMotivationCompleted,
      isSkillCompleted,
    }
  },
  props: {
    scrollContainer: {
      type: HTMLElement,
      default: null,
    },
  },
  data() {
    return {
      currentStep: null,
      steps: [
        {
          step: 'moreAboutYou',
          title: 'Dites-en un peu plus sur vous',
          description: ['À définir', 'Enchanté :)'],
          icon: '🐣',
          isCompleted: !!this.initialForm.type && this.isMotMotivationCompleted,
        },
        {
          step: 'skills',
          title: 'Vos compétences',
          description: [
            'À définir',
            this.$filters.pluralize(this.initialForm.skills.length, 'compétence'),
          ],
          icon: '🧰',
          isCompleted: this.isSkillCompleted,
        },
        {
          step: 'picture',
          title: 'Une photo',
          description: ['À définir', 'Woah !'],
          icon: '📸',
          isCompleted: false, // @todo
        },
      ],
    }
  },
  methods: {
    handleClick(item) {
      this.$emit('update', item.step)
      this.scrollToTop()
    },
    scrollToTop() {
      if (this.scrollContainer) {
        this.scrollContainer.scrollTop = 0
      }
    },
  },
})
</script>

<template>
  <div>
    <DsfrHeading size="lg" class="text-center">À propos de vous</DsfrHeading>

    <p class="mt-4 text-center text-pretty max-w-[500px] mx-auto">
      En complétant ces informations, vous augmentez vos chances de trouver une mission qui vous
      correspond.
    </p>

    <div
      class="flex flex-col items-center justify-center mt-8 gap-4 max-w-[494px] mx-auto"
      role="menu"
    >
      <button
        v-for="item in steps"
        :key="item.step"
        role="menuitem"
        class="group self-stretch border border-[#DDDDDD] shadow-[0px_6px_18px_0px_#00001229] p-6 pr-16 text-left"
        @click="handleClick(item)"
      >
        <div class="flex gap-4 items-center relative">
          <div class="text-[28px]">{{ item.icon }}</div>
          <div class="flex flex-col gap-1 items-start">
            <p class="text-lg font-bold leading-5 text-pretty">{{ item.title }}</p>
            <p class="text-base text-[#666666]">
              {{ item.isCompleted ? item.description[1] : item.description[0] }}
            </p>
          </div>
          <transition
            enter-active-class="ease-out duration-200"
            enter-from-class="opacity-0 -translate-x-[-8px]"
            enter-to-class="opacity-100 translate-x-0"
            leave-active-class="ease-out duration-200"
            leave-from-class="opacity-100 translate-x-0"
            leave-to-class="opacity-0 -translate-x-[8px]"
          >
            <RiCheckLine
              v-if="item.isCompleted"
              :class="[
                'text-[#18753C] fill-current size-6 ml-auto flex-none absolute -right-10 inset-y-0 my-auto',
                'transition ease-out opacity-100 transate-x-0 delay-150 group-hover:delay-0 group-focus:delay-0',
                'group-hover:opacity-0 group-hover:translate-x-6 group-focus:opacity-0 group-focus:translate-x-6',
              ]"
            />
          </transition>

          <RiArrowRightLine
            :class="[
              'text-jva-blue-500 fill-current size-6 ml-auto flex-none absolute inset-y-0 my-auto -right-10',
              'transition ease-out opacity-0 -translate-x-4',
              'group-hover:translate-x-0 group-hover:opacity-100 group-focus:opacity-100 group-focus:translate-x-0',
              { 'group-hover:delay-150 group-focus:delay-150': item.isCompleted },
            ]"
          />
        </div>
      </button>
    </div>
  </div>
</template>
