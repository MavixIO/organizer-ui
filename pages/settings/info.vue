<script setup>
useHead({ title: 'Settings' })
definePageMeta({
  middleware: ['auth'],
})
const context = useContextStore()
const orgStore = useOrganisationsStore()
const { data: organization } = useAsyncData(() => {
  return orgStore.get(context.me.organizationId)
}, { server: false })
console.log(organization.value)
</script>

<template>
  <div class="mx-10 my-8">
    <p class="heading-h2-semi-bold">Settings</p>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <SettingsTabs />
      </v-col>
      <v-col cols="12" sm="6" md="9">
        <SettingsInfo v-if="organization" :value="organization" />
      </v-col>
    </v-row>
  </div>
</template>
