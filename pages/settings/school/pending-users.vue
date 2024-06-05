<script setup>
import { UserStatus } from '~/enums'

useHead({ title: 'Pending Users' })
definePageMeta({
  middleware: ['auth'],
})
const context = useContextStore()
const schoolStore = useSchoolsStore()

const loading = ref(false)
const users = ref({ data: [], meta: { total: 0 }})

async function loadData (query) {
  loading.value = true
  users.value = await schoolStore.getUsers({ id: context.me.schoolId, query: { ...query, status: UserStatus.PENDING } })
  loading.value = false
}

async function approve (userId) {
  await schoolStore.approveUser({ id: context.me.schoolId, userId })
  await loadData()
}
async function reject (userId) {
  await schoolStore.rejectUser({ id: context.me.schoolId, userId })
  await loadData()
}
async function approveMultiple (users) {
  for (const userId of users) {
    await schoolStore.approveUser({ id: context.me.schoolId, userId })
  }
  await loadData()
}
async function rejectMultiple (users) {
  for (const userId of users) {
    await schoolStore.rejectUser({ id: context.me.schoolId, userId })
  }
  await loadData()
}
</script>

<template>
  <SettingsPendingUsers
    :value="users"
    :loading="loading"
    @load-items="loadData"
    @approve="approve"
    @reject="reject"
    @approve-all="approveMultiple"
    @reject-all="rejectMultiple"
  />
</template>
