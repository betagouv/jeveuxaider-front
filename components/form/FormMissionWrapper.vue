<template>
  <main class="flex flex-col h-full">
    <ClientOnly>
      <Teleport to="#teleport-header"> <slot name="header"></slot></Teleport>
    </ClientOnly>

    <div id="content" class="flex-1 overflow-y-auto overflow-x-hidden h-full custom-scrollbar-gray">
      <div class="px-4 max-w-[696px] mx-auto">
        <div class="py-6 lg:py-14" v-if="$stores.formMission.loading === false">
          <slot></slot>
        </div>
      </div>
    </div>
    <footer id="footer-form-mission" class="border-t py-4 px-6 flex justify-end">
      <slot name="footer"></slot>
    </footer>
  </main>
</template>

<script>
export default defineNuxtComponent({
  async setup() {},
})
</script>
