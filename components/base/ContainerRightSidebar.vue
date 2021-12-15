<template>
  <div class="px-6 xl:px-0 max-w-[1313px] mx-auto h-full">
    <div class="flex custom-heigth">
      <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
        <div class="flex-1 relative z-0 flex overflow-hidden">
          <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none">
            <slot name="breadcrumb" />
            <div class="py-6">
              <slot />
            </div>
          </main>
          <aside class="hidden relative xl:flex xl:flex-col flex-shrink-0 w-96 border-l border-gray-200 overflow-y-auto py-16 px-8">
            <slot name="sidebar" />
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.custom-heigth {
      height: calc(100% - 58px);
}
</style>
