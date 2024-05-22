<template>
  <h1>Callback Page</h1>
</template>

<script setup>
definePageMeta({
  layout: 'empty',
})
const contextStore = useContextStore()
const route = useRoute()
await contextStore.callback(route.query)
</script>
