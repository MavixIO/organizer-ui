<script setup>
useHead({ title: 'Settings' })
definePageMeta({
  middleware: ['auth'],
})

const context = useContextStore()
const orgStore = useOrganisationsStore()
const schoolsStore = useSchoolsStore()

const { data } = useAsyncData('settings', () => {
  if (context.isOrgUser) {
    return orgStore.get(context.me.organizationId)
  } else {
    return schoolsStore.get(context.me.schoolId)
  }
}, { server: false })
</script>

<template>
  <SettingsInfo v-if="data" :value="data" />
</template>
