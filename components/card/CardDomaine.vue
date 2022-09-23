<template>
  <div class="card--domaine relative">
    <div
      class="h-[200px] w-full absolute my-4 custom-shadow"
      :class="[$options.filters.label(domaine.id, 'domaines', 'bg'), { 'bottom-0': domaine.bottom }]"
    />

    <div class="px-4">
      <div class="relative overflow-hidden safari-fix-scale custom-shadow">
        <img
          :srcset="domaine.image"
          :alt="domaine.name"
          class="w-full object-cover object-right-top"
          style="min-height: 180px"
          width="328"
          height="405"
        >

        <div
          class="absolute inset-0 gradient"
          :class="[{ inverted: domaine.bottom }]"
        />

        <div
          class="absolute p-6 sm:p-8 space-y-4"
          :class="[
            { 'bottom-0': domaine.bottom },
            { 'top-0': !domaine.bottom },
          ]"
        >
          <Tag class="mb-2">
            {{ domaine.name }}
          </Tag>

          <h3
            class="text-white font-bold text-2xl leading-[28px] text-shadow"
          >
            {{ domaine.description }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from '@/components/dsfr/Tag.vue'

export default {
  components: {
    Tag
  },
  props: {
    domaine: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="postcss" scoped>
.custom-shadow {
  box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.05);
}

.card--domaine {
  img {
    transition: all 0.25s;
  }
  @screen sm {
    &:hover {
      img {
        transform: scale(1.05);
      }
    }
  }
}

.gradient {
  background: linear-gradient(
    7deg,
    rgba(0, 0, 0, 0) 60%,
    rgba(0, 0, 0, 0.7) 100%
  );
  &.inverted {
    background: linear-gradient(
      183.3deg,
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 0.7) 100%
    );
  }
}

.text-shadow {
  text-shadow: 0px 4px 14px rgba(0, 0, 0, 0.25),
    0px 4px 30px rgba(0, 0, 0, 0.85);
}
</style>
