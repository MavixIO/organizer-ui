<template>
  <h1>Main Page</h1>
</template>

<script setup>
definePageMeta({
  layout: 'empty',
})
const contextStore = useContextStore()
await contextStore.fetchContext()
const isLoggedIn = contextStore.isLoggedIn
if (isLoggedIn) {
  navigateTo({ name: 'dashboard' })
} else {
  navigateTo({ name: 'registration' })
}
</script>
