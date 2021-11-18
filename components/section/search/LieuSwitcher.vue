<template>
  <div class="flex flex-col lg:flex-row switch-items">
    <div
      v-for="(item, index) in radios"
      :key="item.value"
      class="flex item w-full lg:w-auto"
    >
      <el-radio
        v-model="radio"
        :label="item.value"
        :class="[
          { 'opacity-75': radio && radio != item.value },
          `el-radio-${index}`,
          radio && radio == item.value && color
            ? domainColor(domainId)
            : 'text-white',
        ]"
        @click.native.prevent="onClick(item.value)"
      >
        <span>{{ item.label }}</span>
      </el-radio>

      <div
        v-if="index == 0 && radio == 'Mission en présentiel'"
        class="w-full relative flex items-stretch bg-white rounded-tr-lg lg:rounded-tr-none"
      >
        <AlgoliaPlacesInput
          ref="alogoliaInput"
          :initial-value="initialPlace"
          selector="algolia-lieu-switcher--places-input"
          class="zipcode"
          :label="false"
          :description="false"
          type="city"
          :limit="4"
          :templates="templatesPlaces"
          placeholder="Ex: 75001"
          @initialized="onInit"
          @selected="$emit('selected', $event)"
          @clear="$emit('clear')"
        />
        <div class="radius pr-2">
          <AlgoliaRadiusFilter
            :initial-value="aroundRadius"
            @selected="$emit('change-radius', $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MixinColorsDomaines from '@/mixins/colors-domaines'

export default {
  name: 'AlgoliaLieuSwitcher',
  mixins: [MixinColorsDomaines],
  props: {
    initialType: {
      type: [String, Boolean],
      default: null
    },
    initialPlace: {
      type: [String, Boolean],
      default: undefined
    },
    aroundRadius: {
      type: [Number, String],
      default: 'all'
    },
    color: {
      type: [String, Boolean],
      default: null
    }
  },
  data () {
    return {
      radio: this.initialType,
      radios: [
        { value: 'Mission en présentiel', label: 'Près de chez moi' },
        { value: 'Mission à distance', label: 'À distance' }
      ],
      templatesPlaces: {
        value (suggestion) {
          return `${suggestion.postcode} ${suggestion.name}`
        },
        suggestion (suggestion) {
          const details = [suggestion.county, suggestion.administrative]
          let detailsOutput = ''
          details.forEach((element) => {
            if (element) {
              detailsOutput += ` - <span>${element}</span>`
            }
          })
          return (
            `<div class="text-black font-bold">${suggestion.highlight.name}</div>` +
            '<div class="text-[#242526] text-xs font-light">' +
            `<span>${suggestion.postcode}</span>${detailsOutput}` +
            '</div>'
          )
        }
      },
      doFocus: false
    }
  },
  watch: {
    initialType (newVal) {
      this.radio = newVal
    }
  },
  methods: {
    onClick (val) {
      this.$emit('click', val)
      this.doFocus = true
      if (this.radio === val) {
        this.radio = null
        this.$emit('typeRemoved')
      } else {
        this.radio = val
        this.$emit('typeChanged', val)
      }
    },
    onInit () {
      if (this.doFocus) {
        document.querySelector('#algolia-lieu-switcher--places-input').focus()
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
::v-deep {
  .el-radio {
    border-color: #504db2;
    color: #504db2;
    @apply m-0 border flex items-center w-full lg:h-full py-3 px-5 lg:py-6 lg:px-10 focus:ring;
    @screen lg {
      max-height: 70px;
    }
    &.is-checked {
      @apply bg-white border-white;
      .el-radio__label {
        color: #070192;
        @apply font-bold;
      }
      .el-radio__inner {
        border-color: #e6eaf5;
        background: #e6eaf5;
      }
      &.el-radio-0 {
        width: 30px !important;
        @apply rounded-tr-none;
        @screen lg {
          width: 100%;
        }
        .el-radio__label {
          @apply hidden;
        }
      }
    }
    &.el-radio-0 {
      @apply rounded-t-lg;
      @screen lg {
        @apply rounded-t-none rounded-l-lg;
      }
    }
    &.el-radio-1 {
      @apply rounded-b-lg border-t-0;
      @screen lg {
        @apply rounded-b-none rounded-r-lg border-t border-l-0;
      }
    }
    .el-radio__label {
      color: #817ee2;
      padding-left: 15px;
      @apply text-base;
    }
    .el-radio__inner {
      width: 20px;
      height: 20px;
      border-color: #504db2;
      background: #504db2;
      box-shadow: none !important;
      &::after {
        background: url(/images/check-primary.svg);
        width: 11px;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
}

.radius {
  position: relative;
  @apply border-l border-dashed border-gray-200;
  &::after {
    content: 'Rayon';
    position: absolute;
    pointer-events: none;
    left: 15px;
    top: 5px;
    font-size: 12px;
    color: #908e8e;
    letter-spacing: -0.1px;
    line-height: 18px;
    @screen lg {
      top: 15px;
    }
  }
  ::v-deep {
    .el-select {
      top: 6px;
      @apply relative;
      @screen lg {
        top: 15px;
      }
    }
    input {
      width: 80px;
      border: none !important;
      background: none !important;
      @apply pl-2 text-black font-bold text-base;
      @screen md {
        font-size: 14px;
      }
      @screen lg {
        width: 100px;
      }
    }
    .el-input__suffix {
      right: 10px;
      top: -5px;
      @screen lg {
        top: -8px;
      }
    }
  }
}

.zipcode {
  position: relative;
  height: 56px;
  @apply m-0 flex-1;
  @screen lg {
    height: 70px;
    @apply mb-0;
  }
  &::after {
    content: 'Votre code postal';
    position: absolute;
    pointer-events: none;
    left: 15px;
    top: 5px;
    font-size: 12px;
    color: #908e8e;
    letter-spacing: -0.1px;
    line-height: 18px;
    @screen lg {
      top: 15px;
    }
  }
  ::v-deep {
    .ap-dropdown-menu {
      border-radius: 8px;
    }
    .ap-suggestion {
      padding: 5px 15px;
      line-height: normal;
      height: inherit;
    }
    .ap-input {
      width: 100%;
      border: 1px solid white;
      color: black;
      font-weight: bold;
      background-color: transparent;
      border: none;
      top: 14px;
      padding: 0 15px;
      padding-right: 32px;
      @apply truncate;
      @screen lg {
        width: 250px;
        height: calc(100% - 10px);
      }
    }
    .ap-icon-pin {
      position: relative;
      pointer-events: none;
      svg {
        display: none;
      }
      &::after {
        content: '';
        position: absolute;
        width: 22px;
        height: 23px;
        background: url('/images/picker.svg');
        top: 0px;
        right: 0px;
        @screen lg {
          top: 7px;
        }
      }
    }
    .ap-icon-clear {
      width: 20px;
      height: 20px;
      margin: auto;
      display: flex;
      align-items: center;
      svg {
        right: 4px;
      }
    }
    .algolia-places {
      height: 100%;
    }
  }
}

.chevron {
  left: -12px;
  @apply absolute top-0 bottom-0 m-auto;
}
</style>
