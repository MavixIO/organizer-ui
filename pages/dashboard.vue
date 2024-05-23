<script setup>
definePageMeta({
  layout: 'empty',
})
const contextStore = useContextStore()
await contextStore.fetchContext()
const me = contextStore.me
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <h2>Hello, {{ me.firstname }}</h2>
  </div>
</template>
