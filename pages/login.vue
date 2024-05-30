<template>
  <h1>Login Page</h1>
</template>

<script setup>
definePageMeta({
  layout: 'empty',
})
navigateTo('/api/v1/auth/login')
</script>
