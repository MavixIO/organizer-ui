<script setup>
import { UserStatus } from '~/enums'

useHead({ title: 'Users' })
definePageMeta({
  middleware: ['auth'],
})
const context = useContextStore()
const schoolStore = useSchoolsStore()

const loading = ref(false)
const users = ref({ data: [], meta: { total: 0 }})
const { data } = await useAsyncData('pending-users', () => {
  return schoolStore.getUsers({ id: context.me.schoolId, query: { status: UserStatus.PENDING } })
}, { server: false })

const pending = computed(() => data.value?.meta?.total || 0)

async function loadData (query) {
  loading.value = true
  users.value = await schoolStore.getUsers({ id: context.me.schoolId, query })
  loading.value = false
}

function goToPending() {
  navigateTo({ name: 'settings-school-pending-users' })
}
</script>

<template>
  <SettingsUsers :value="users" :loading="loading" :pending="pending" @load-items="loadData" @go-to-pending="goToPending" />
</template>
