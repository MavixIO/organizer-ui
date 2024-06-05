<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: false,
    },
    pending: {
      type: Number,
      default: 0,
    },
  },
  emits: ['loadItems', 'goToPending'],
  data: () => ({
    itemsPerPage: 5,
    headers: [
      { title: 'Name', align: 'start', key: 'name', sortable: false },
      { title: 'Email', key: 'email', align: 'start', sortable: false },
      { title: 'User Group', key: 'roleId', align: 'center', sortable: false },
      { title: 'Status', key: 'status', align: 'center', sortable: false },
      { title: 'Action', key: 'action', align: 'center', sortable: false },
    ],
    search: '',
  }),
  computed: {
    serverItems () {
      return this.value.data
    },
    totalItems () {
      return this.value.meta.total
    },
    lastPage () {
      return this.value.meta.lastPage
    },
  },
  methods: {
    loadItems({ page }) {
      this.$emit('loadItems', { page, limit: this.itemsPerPage, search: this.search })
    },
  },
}
</script>

<template>
  <v-card rounded="lg" class="pa-6">
    <div class="d-flex">
      <div class="flex-grow-1">
        <p class="heading-h6-semi-bold">Users</p>
        <p class="paragraph-small-regular">Some helper text explaining this is for the organisation page.</p>
      </div>
      <div class="flex-shrink-1">
        <v-btn variant="outlined" class="primary-button" rounded="xl">
          <SvgoUserAdd01 width="20" height="20" class="mr-2" />
          Invite User
        </v-btn>
      </div>
    </div>
    <hr class="mt-6" >
    <v-row class="mt-2 mb-4">
      <v-col cols="12" md="5">
        <v-text-field
          v-model="search"
          variant="outlined"
          density="compact"
          hide-details
          placeholder="Search Users"
          rounded="xl"
          @update:model-value="loadItems"
        >
          <template #prepend-inner>
            <SvgoSearch
              width="20"
              height="20"
            />
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          variant="outlined"
          density="compact"
          hide-details
          placeholder="Filter By User Role"
          rounded="xl"
        />
      </v-col>
      <v-col cols="12" md="4" class="d-flex align-center justify-end">
        <NuxtLink class="cursor-pointer text-neutral-500" @click="$emit('goToPending')">{{ pending }} Pending Users</NuxtLink>
      </v-col>
    </v-row>

    <client-only>
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="serverItems"
        :items-length="totalItems"
        :loading="loading"
        item-value="name"
        :hide-default-footer="lastPage === 1"
        @update:options="loadItems"
      >
        <template #item.name="{item}">
          <div>
            <p class="paragraph-medium-semi-bold">{{ item.displayName }}</p>
            <p>{{ item.displayRole }}</p>
          </div>
        </template>
        <template #item.status="{item}">
          <UserStatus :value="item.status" />
        </template>
        <template #item.action>
          <v-btn min-width="30" width="40" height="40" variant="outlined" class="more-button">
            <SvgoMoreVertical width="20" height="20" />
          </v-btn>
        </template>
      </v-data-table-server>
    </client-only>
  </v-card>
</template>

<style scoped>
.primary-button {
  border-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-primary));
  :deep(path) {
    stroke: rgb(var(--v-theme-primary));
  }
}
.more-button.v-btn--variant-outlined {
  border-color: rgb(var(--v-theme-neutral-200));
}
</style>
