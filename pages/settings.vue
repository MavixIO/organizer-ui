<script setup>
const context = useContextStore()
const orgStore = useOrganisationsStore()
const schoolsStore = useSchoolsStore()

const { data, pending } = useAsyncData('settings', () => {
  if (context.isOrgUser) {
    return orgStore.get(context.me.organizationId)
  } else {
    return schoolsStore.get(context.me.schoolId)
  }
}, { server: false })
</script>

<template>
  <div class="mx-10 my-8">
    <p class="paragraph-small-regular mb-2">
      <span v-if="context.isOrgUser">Organisation /</span>
      <span v-else>School /</span>
    </p>
    <p v-if="!pending" class="heading-h2-semi-bold mb-8">{{ data.name }}</p>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <SettingsTabs />
      </v-col>
      <v-col cols="12" sm="6" md="9">
        <NuxtPage />
      </v-col>
    </v-row>
  </div>
</template>
