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
  border: 1px rgb(var(--v-theme-neutral-200)) solid;
  background: white;
  padding: .8em;
  border-radius: 10px;
  position: relative;
  transition: border 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
  cursor: pointer;
  .check-icon {
    position: absolute;
    right: 10px;
    transition: opacity 0.3s ease;
  }
}
.title {
  color: rgb(var(--v-theme-neutral-600));
  font-weight: 600;
  transition: color 0.3s ease;
}
.description {
  color: rgb(var(--v-theme-neutral-500));
  font-size: 16px;
}
.selected {
  border: 1px rgb(var(--v-theme-primary)) solid;
  box-shadow: 0 0 0 1px rgb(var(--v-theme-primary));
  .title {
    color: rgb(var(--v-theme-primary));
  }
}
</style>
