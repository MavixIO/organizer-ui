<script setup>
useHead({ title: 'Registrations' })
definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <div class="mx-10 my-10">
    <div class="d-flex">
      <p class="heading-h2-semi-bold">Registrations</p>
      <v-spacer />
      <v-btn color="primary" variant="outlined" rounded="xl" size="large">
        More
        <template #append>
          <v-icon>mdi-chevron-down</v-icon>
        </template>
      </v-btn>
      <v-btn color="primary" rounded="xl" class="ml-3" size="large" :to="{ name: 'registrations-add' }">
        <template #prepend>
          <SvgoAddSquare width="20" height="20" />
        </template>
        New Registration
      </v-btn>
    </div>
  </div>
</template>
