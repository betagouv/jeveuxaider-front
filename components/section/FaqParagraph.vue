<template>
  <div v-if="paragraphs.length > 0" class="bg-white pb-12 md:pb-20">
    <div class="container">
      <DsfrHeading
        as="h2"
        size="alt-md"
        class="py-16 xl:pt-24 xl:pb-24 text-center max-w-[900px] mx-auto"
      >
        <span class="relative">
          <span>{{ title }}</span>
          <img
            src="/images/home/sparkle-left.svg"
            alt=""
            width="40"
            height="43"
            aria-hidden="true"
            class="hidden lg:block absolute w-[31px] h-[33px] lg:w-[61px] lg:h-[67px] top-[-12px] left-[-22px] lg:top-[-25px] lg:left-[-47px] pointer-events-none"
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
