<template>
  <v-img
    aspect-ratio="1"
    :src="preview"
    class="rounded"
  >
    <slot />
  </v-img>
</template>

<script>
export default {
  name: 'ImagePreview',
  // eslint-disable-next-line vue/require-prop-types
  props: ['value'],

  data: () => ({
    preview: '',
  }),

  watch: {
    value() {
      this.refreshPreview()
    },
  },

  beforeMount() {
    this.refreshPreview()
  },

  beforeUnmount() {
    URL.revokeObjectURL(this.preview)
  },

  methods: {
    refreshPreview() {
      this.preview = URL.createObjectURL(this.value)
    },
  },
}
</script>
