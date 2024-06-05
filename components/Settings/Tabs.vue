<script setup>
const context = useContextStore()
const infoLink = computed(() => {
  return context.isOrgUser ? { name: 'settings-organisation' } : { name: 'settings-school' }
})
const usersPage = computed(() => context.isSchoolUser ? 'settings-school-users' : 'settings-organisation-users')
</script>

<template>
  <v-card rounded="lg" variant="outlined">
    <v-list>
      <v-list-item :to="infoLink">
        <template #prepend>
          <SvgoInformationSquare width="24" height="24" class="mr-3" />
        </template>
        <v-list-item-title>Information</v-list-item-title>
      </v-list-item>
      <v-list-item :to="{ name: usersPage}">
        <template #prepend>
          <SvgoUserGroup width="24" height="24" class="mr-3" />
        </template>
        <v-list-item-title>Users</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <template #prepend>
          <SvgoFolderSecurity width="24" height="24" class="mr-3" />
        </template>
        <v-list-item-title>Roles & Permissions</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <template #prepend>
          <SvgoBank width="24" height="24" class="mr-3" />
        </template>
        <v-list-item-title>Payment Options</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <template #prepend>
          <SvgoSetup02 width="24" height="24" class="mr-3" />
        </template>
        <v-list-item-title>Integrations</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style lang="scss" scoped>
.v-list-item--active {
  border-left: 4px solid rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-primary));
  svg :deep(path) {
    stroke: rgb(var(--v-theme-primary));
  }
}
.v-list-item--active > :deep(.v-list-item__overlay) {
  opacity: 0;
}
</style>
