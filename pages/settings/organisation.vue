<script setup>
useHead({ title: 'Organisation' })
definePageMeta({
  middleware: ['auth'],
})

const context = useContextStore()
const orgStore = useOrganisationsStore()

const { data } = useAsyncData('settings', () => {
  return orgStore.get(context.me.organizationId)
}, { server: false })
</script>

<template>
  <SettingsInfo v-if="data" :value="data" />
</template>
