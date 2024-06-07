<script>
export default {
  props: {
    step: {
      type: Number,
      default: 1,
    },
  },
  data: () => ({
    steps: [
      'Basic Information',
      'Audience & Participants',
      'Pricing & Restrictions',
      'Privacy',
      'Review And Confirm',
    ],
  }),
}
</script>

<template>
  <v-timeline align="start" side="start" fill-dot truncate-line="both">
    <v-timeline-item v-for="(item, index) in steps" :key="index" size="x-large" :class="{ active: index+1 === step }">
      <template #icon>
        <span class="text-h5">{{ index+1 }}</span>
      </template>
      <div class="d-flex flex-column align-end mr-2">
        <p class="paragraph-xsmall-medium">Step {{ index+1 }}</p>
        <p class="paragraph-large-semi-bold">{{ item }}</p>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<style lang="scss" scoped>
.active {
  :deep(.v-timeline-divider--fill-dot .v-timeline-divider__inner-dot) {
    background-color: rgb(var(--v-theme-primary));
    color: white;
  }
  :deep(.v-timeline-item__body) {
    color: rgb(var(--v-theme-primary));
  }
}

:deep(.v-timeline-divider--fill-dot .v-timeline-divider__inner-dot) {
  background-color: white;
  border: 1px solid rgb(var(--v-theme-neutral-200));
  border-radius: 8px;
  color: rgb(var(--v-theme-neutral-400));
}
:deep(.v-timeline-item__body) {
  color: rgb(var(--v-theme-neutral-500));
}
</style>
