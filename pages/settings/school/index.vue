<script setup>
useHead({ title: 'School' })
definePageMeta({
  middleware: ['auth'],
})

const context = useContextStore()
const schoolsStore = useSchoolsStore()

const { data } = useAsyncData('settings', () => {
  return schoolsStore.get(context.me.schoolId)
}, { server: false })
</script>

<template>
  <SettingsInfo v-if="data" :value="data" />
</template>
