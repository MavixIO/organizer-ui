<script setup>
import { UserStatus } from '~/enums'

useHead({ title: 'Users' })
definePageMeta({
  middleware: ['auth'],
})
const context = useContextStore()
const orgStore = useOrganisationsStore()

const loading = ref(false)
const users = ref({ data: [], meta: { total: 0 }})
const { data } = await useAsyncData('pending-users', () => {
  return orgStore.getUsers({ id: context.me.organizationId, query: { status: UserStatus.PENDING } })
}, { server: false })

const pending = computed(() => data.value?.meta?.total || 0)

async function loadData (query) {
  loading.value = true
  users.value = await orgStore.getUsers({ id: context.me.organizationId, query })
  loading.value = false
}

function goToPending () {
  navigateTo({ name: 'settings-organisation-pending-users'})
}
</script>

<template>
  <SettingsUsers :value="users" :loading="loading" :pending="pending" @load-items="loadData" @go-to-pending="goToPending" />
</template>
