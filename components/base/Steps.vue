<template>
  <nav aria-label="Progress">
    <ol class="hidden lg:block overflow-hidden -m-1 p-1">
      <template v-for="(step, stepIdx) in steps">
        <template v-if="step">
          <li
            v-if="!step.disable"
            :key="step.name"
            :class="[stepIdx !== steps.length - 1 ? 'pb-10' : '', 'relative']"
          >
            <template v-if="step.status === 'complete'">
              <div
                v-if="stepIdx !== steps.length - 1"
                class="-ml-px absolute mt-0.5 w-0.5 h-full bg-jva-blue-500"
                style="top: 1rem; left: 1rem"
                aria-hidden="true"
              />
              <nuxt-link :to="step.href" class="relative flex items-center group">
                <span class="h-9 flex items-center">
                  <div
                    class="relative z-10 w-8 h-8 flex items-center justify-center bg-jva-blue-500 rounded-full group-hover:bg-[#1f0391]"
                  >
                    <CheckIcon
                      class="w-5 h-5 text-white"
                    />
                  </div>
                </span>
                <span class="ml-4 min-w-0 flex flex-col">
                  <span class="text-xs font-semibold tracking-wide uppercase">{{
                    step.name
                  }}</span>
                  <span class="text-sm text-gray-500">{{
                    step.description
                  }}</span>
                </span>
              </nuxt-link>
            </template>
            <template
              v-else-if="step.status === 'current'"
              condition="step.status === 'current'"
            >
              <div
                v-if="stepIdx !== steps.length - 1"
                class="-ml-px absolute mt-0.5 w-0.5 h-full bg-gray-300"
                style="top: 1rem; left: 1rem"
                aria-hidden="true"
              />
              <div class="relative flex items-center group" aria-current="step">
                <span class="h-9 flex items-center" aria-hidden="true">
                  <span
                    class="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-jva-blue-500 rounded-full"
                  >
                    <span class="h-2.5 w-2.5 bg-jva-blue-500 rounded-full" />
                  </span>
                </span>
                <span class="ml-4 min-w-0 flex flex-col">
                  <span
                    class="text-xs font-semibold tracking-wide uppercase text-jva-blue-500"
                  >{{ step.name }}</span>
                  <span class="text-sm text-gray-500">{{
                    step.description
                  }}</span>
                </span>
              </div>
            </template>
            <template v-else>
              <div
                v-if="stepIdx !== steps.length - 1"
                class="-ml-px absolute mt-0.5 w-0.5 h-full bg-gray-300"
                style="top: 1rem; left: 1rem"
                aria-hidden="true"
              />
              <div class="relative flex items-center group">
                <span class="h-9 flex items-center" aria-hidden="true">
                  <span
                    class="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400"
                  >
                    <span
                      class="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"
                    />
                  </span>
                </span>
                <span class="ml-4 min-w-0 flex flex-col">
                  <span
                    class="text-xs font-semibold tracking-wide uppercase text-gray-500"
                  >{{ step.name }}</span>
                  <span class="text-sm text-gray-500">{{
                    step.description
                  }}</span>
                </span>
              </div>
            </template>
          </li>
        </template>
      </template>
    </ol>

    <ol class="lg:hidden flex items-center justify-center">
      <template v-for="(step, stepIdx) in steps">
        <li
          v-if="step && !step.disable"
          :key="step.name"
          :class="[
            stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '',
            'relative',
          ]"
        >
          <template v-if="step.status === 'complete'">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="h-0.5 w-full bg-jva-blue-500" />
            </div>
            <nuxt-link
              :to="step.href"
              class="relative w-8 h-8 flex items-center justify-center bg-jva-blue-500 rounded-full hover:bg-jva-blue-400"
            >
              <CheckIcon
                class="w-5 h-5 text-white"
              />
              <span class="sr-only">{{ step.name }}</span>
            </nuxt-link>
          </template>
          <template
            v-else-if="step.status === 'current'"
            condition="step.status === 'current'"
          >
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="h-0.5 w-full bg-gray-200" />
            </div>
            <div
              class="relative w-8 h-8 flex items-center justify-center bg-white border-2 border-jva-blue-500 rounded-full"
              aria-current="step"
            >
              <span
                class="h-2.5 w-2.5 bg-jva-blue-500 rounded-full"
                aria-hidden="true"
              />
              <span class="sr-only">{{ step.name }}</span>
            </div>
          </template>
          <template v-else>
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="h-0.5 w-full bg-gray-200" />
            </div>
            <div
              class="group relative w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full hover:border-gray-400"
            >
              <span
                class="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"
                aria-hidden="true"
              />
              <span class="sr-only">{{ step.name }}</span>
            </div>
          </template>
        </li>
      </template>
    </ol>
  </nav>
</template>

<script>
export default {
  props: {
    steps: {
      type: Array,
      required: true
    }
  }
}
</script>
