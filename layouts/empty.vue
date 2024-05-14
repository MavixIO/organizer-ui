<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ActiLynk` : 'ActiLynk'
  },
})
</script>

<template>
  <v-app>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
