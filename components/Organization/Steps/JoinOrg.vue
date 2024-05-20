<script lang="ts">
export default {
}
</script>

<template>
  <v-form ref="form">
    <h1 class="mb-1">
      Join Your Organization's Team
    </h1>
    <p class="text-gray mb-8">
      Your organisation is already registered and is currently managed by an existing admin. To create, manage, or make registrations for events on behalf of your organisation, please request to join.
    </p>
    <v-card class="d-flex align-center pa-5">
      <v-img
        class="mx-2"
        src="~/assets/logos/teems.png"
        max-width="80"
        height="80"
      />
      <div>
        <p>Teems Global</p>
        <p class="subtitle text-gray">
          Bangkok, Thailand
        </p>
      </div>
    </v-card>
  </v-form>
</template>

<style scoped>
.subtitle {
  font-size: 14px;
}
</style>
