<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    name () {
      return this.value.name
    },
    displayName () {
      return this.value.displayName || this.value.abbreviation
    },
    website () {
      return this.value.website
    },
    address () {
      return this.value.address
    },
  },
}
</script>

<template>
  <v-card rounded="lg" class="pa-6">
    <v-row>
      <v-col>
        <p class="heading-h6-semi-bold">Information</p>
        <p class="paragraph-small-regular">Some helper text explaining this is for the organisation page.</p>
      </v-col>
      <v-col md="3" lg="2">
        <v-btn variant="outlined">
          <SvgoEdit02 width="20" height="20" />
          Edit Profile
        </v-btn>
      </v-col>
    </v-row>
    <hr class="mt-6" >
    <v-row class="my-0">
      <v-col md="3">
        <p class="text-neutral-500">Name</p>
      </v-col>
      <v-col>
        <p>{{ name }}</p>
      </v-col>
    </v-row>
    <hr>
    <v-row class="my-0">
      <v-col md="3">
        <p class="text-neutral-500">Display Name</p>
      </v-col>
      <v-col>
        <p>{{ displayName }}</p>
      </v-col>
    </v-row>
    <hr>
    <v-row class="my-0">
      <v-col md="3">
        <p class="text-neutral-500">Website</p>
      </v-col>
      <v-col>
        <p>{{ website }}</p>
      </v-col>
    </v-row>
    <hr>
    <v-row class="my-0">
      <v-col md="3">
        <p class="text-neutral-500">Address</p>
      </v-col>
      <v-col>
        <p>{{ address }}</p>
      </v-col>
    </v-row>
    <hr>
    <v-row class="my-0">
      <v-col md="3">
        <p class="text-neutral-500">Logo</p>
      </v-col>
      <v-col>
        <!-- <v-img src="/path/to/logo.png" alt="Teems Logo" /> -->
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
</style>
