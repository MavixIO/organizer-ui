<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ActiLynk` : 'ActiLynk'
  },
})
</script>

<template>
  <v-app>
    <NavigationDrawer />
    <v-main>
      <AppBar />
      <slot />
    </v-main>
  </v-app>
</template>
