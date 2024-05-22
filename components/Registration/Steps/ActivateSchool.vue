<script lang="ts">
export default {
}
</script>

<template>
  <v-form ref="form">
    <h1 class="mb-1">
      Activate School Account
    </h1>
    <p class="text-gray mb-8">
      Activate your school account to begin registering for events. Setup is quick and easy, ensuring you're ready to participate with just a few clicks.
    </p>
    <v-card class="d-flex align-center pa-5">
      <v-img
        class="mx-2"
        src="~/assets/logos/shrewsbury.png"
        max-width="80"
        height="80"
      />
      <div>
        <p>Shrewsbury International School Bangkok</p>
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
