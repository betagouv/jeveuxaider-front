<template>
  <div class="container">
    <div class="relative flex">
      <main class="w-full">
        <slot name="breadcrumb" />
        <div class="pb-6 xl:pr-6">
          <slot />
        </div>
      </main>
      <aside class="hidden relative xl:flex xl:flex-col flex-shrink-0 w-72 border-l border-gray-200  py-16 px-8">
        <slot name="sidebar" />
      </aside>
    </div>
  </div>
</template>
