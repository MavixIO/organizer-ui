<template>
  <h1>Redirect Page</h1>
</template>

<script setup>
definePageMeta({
  layout: 'empty',
})
navigateTo({ name: 'dashboard' })
</script>
