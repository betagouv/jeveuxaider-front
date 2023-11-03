<template>
  <div class="bg-white pb-12 md:pb-20">
    <div class="container">
      <DsfrHeading as="h2" size="alt-md" class="py-16 xl:pt-24 xl:pb-24 text-center">
        <span class="relative">
          <span>{{ title }}</span>
          <img
            src="/images/home/sparkle-right.svg"
            alt=""
            width="40"
            height="43"
            aria-hidden="true"
            class="absolute right-[-22px] top-[35px] xxs:top-[40px] sm:top-[-10px] w-8 xl:w-[50px] xl:right-[-40px] xl:top-[-20px] pointer-events-none"
          />
        </span>
      </DsfrHeading>
      <DsfrTabs name="Catégories de faq" :tabs="tabs">
        <template v-for="tab in tabs" :key="tab.key" v-slot:[`tab-${tab.key}`]>
          <div class="px-4 py-8">
            <DsfrAccordionsGroup>
              <DsfrAccordion
                v-for="(paragraph, index) in paragraphs.filter(
                  (paragraph) => paragraph.tab === tab.key
                )"
                :key="index"
              >
                <template #title>
                  {{ paragraph.question }}
                </template>
                <div class="formatted-text mb-6" v-html="paragraph.description" />
              </DsfrAccordion>
            </DsfrAccordionsGroup>
          </div>
        </template>
      </DsfrTabs>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    title: {
      type: String,
      default: 'Foire aux questions',
    },
    paragraphs: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    tabs() {
      const uniqueTabs = Array.from(new Set(this.paragraphs.map((item) => item.tab)))
      return uniqueTabs.map((tab) => ({
        key: tab,
        content: this.$labels.faq_tabs.find((item) => item.key === tab)?.label,
      }))
    },
  },
})
</script>
