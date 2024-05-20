<script lang="ts">
export default {
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
}
</script>

<template>
  <div
    class="element d-flex"
    :class="{ selected }"
  >
    <v-icon
      v-if="selected"
      class="check-icon"
      color="primary"
    >
      mdi-check-circle
    </v-icon>
    <div class="d-flex align-center mr-3">
      <slot />
    </div>
    <div>
      <p class="title">
        {{ title }}
      </p>
      <span class="description pr-2">
        {{ description }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.element {
  border: 1px #E5E5E5 solid;
  padding: .8em;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  .check-icon {
    position: absolute;
    right: 10px;
  }
}
.title {
  color: #424242;
  font-weight: 600;
}
.description {
  color: #737373;
  font-size: 16px;
}
.selected {
  border: 2px rgb(var(--v-theme-primary)) solid;
  .title {
    color: rgb(var(--v-theme-primary));
  }
}
</style>
