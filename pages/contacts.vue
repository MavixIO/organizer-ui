<script setup>
useHead({ title: 'Contacts' })
definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <div>
    <h1>Contacts</h1>
  </div>
</template>
