<template>
  <div class="card--domaine relative">
    <div
      class="h-[200px] w-full rounded-[10px] absolute my-4"
      :class="[$options.filters.label(domaine.id, 'domaines', 'bg'), { 'bottom-0': domaine.bottom }]"
    />

    <div class="px-4">
      <div class="relative rounded-[10px] overflow-hidden safari-fix-scale">
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
          <Badge :color="domaine.id" class="uppercase mb-4">
            {{ domaine.name }}
          </Badge>

          <h3
            class="text-white font-extrabold text-2xl leading-[28px] text-shadow"
          >
            {{ domaine.description }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    domaine: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="postcss" scoped>
.card--domaine {
  filter: drop-shadow(0px 20px 40px rgba(0, 0, 0, 0.1));
  img {
    transition: all 0.4s ease-in-out;
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
    rgba(0, 0, 0, 0) 66.74%,
    rgba(0, 0, 0, 0.7) 102.8%
  );
  &.inverted {
    background: linear-gradient(
      183.3deg,
      rgba(0, 0, 0, 0) 66.74%,
      rgba(0, 0, 0, 0.7) 102.8%
    );
  }
}

.pill-2 {
  border-radius: 35px;
  font-size: 11px;
  letter-spacing: 0.01em;
  color: white;
  @apply font-bold uppercase py-1 px-3 inline-flex;
}

.text-shadow {
  text-shadow: 0px 4px 14px rgba(0, 0, 0, 0.25),
    0px 4px 30px rgba(0, 0, 0, 0.85);
}
</style>
