<script>
const textMap = {
  approve: {
    title: 'Approve the user',
    text: 'Are you sure you want to approve the user?',
  },
  reject: {
    title: 'Reject the user',
    text: 'Are you sure you want to reject the user?',
  },
  approveAll: {
    title: 'Approve checked users',
    text: 'Are you sure you want to approve checked users?',
  },
  rejectAll: {
    title: 'Reject checked users',
    text: 'Are you sure you want to reject checked users?',
  },
}
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
  },
  emits: ['loadItems', 'approve', 'reject', 'approveAll', 'rejectAll'],
  data: () => ({
    itemsPerPage: 5,
    headers: [
      { title: 'Name', align: 'start', key: 'name', sortable: false },
      { title: 'User Group', key: 'roleId', align: 'center', sortable: false },
      { title: 'Action', key: 'action', align: 'center', sortable: false, width: 200 },
    ],
    dialogTitle: '',
    dialogText: '',
    dialog: false,
    selectedId: '',
    type: '',
    selected: [],
  }),
  computed: {
    serverItems () {
      return this.value.data
    },
    totalItems () {
      return this.value.meta.total
    },
  },
  methods: {
    loadItems({ page }) {
      this.$emit('loadItems', { page, limit: this.itemsPerPage })
    },
    openDialog(type, id) {
      this.dialogTitle = textMap[type].title
      this.dialogText = textMap[type].text
      this.type = type
      this.selectedId = id || ''
      this.dialog = true
    },
    confirm() {
      if (this.type === 'approve') {
        this.$emit('approve', this.selectedId)
      } else if (this.type === 'reject') {
        this.$emit('reject', this.selectedId)
      } else if (this.type === 'approveAll') {
        this.$emit('approveAll', this.selected)
      } else if (this.type === 'rejectAll') {
        this.$emit('rejectAll', this.selected)
      }
      this.cancel()
    },
    cancel() {
      this.dialog = false
    },
  },
}
</script>

<template>
  <v-card rounded="lg" class="pa-6">
    <div class="d-flex">
      <div class="flex-grow-1">
        <p class="heading-h6-semi-bold">Pending Users</p>
        <p class="paragraph-small-regular">Some helper text explaining this is for the organisation page.</p>
      </div>
      <div class="flex-shrink-1">
          <v-btn variant="text" color="destructive-600" :disabled="!selected.length" @click="openDialog('rejectAll')">
            Reject All
          </v-btn>
          <v-btn variant="text" color="success-600" :disabled="!selected.length" @click="openDialog('approveAll')">
            Approve All
          </v-btn>
      </div>
    </div>
    <hr class="mt-6" >

    <client-only>
      <v-data-table-server
        v-model="selected"
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="serverItems"
        :items-length="totalItems"
        :loading="loading"
        item-value="id"
        show-select
        :hide-default-footer="serverItems.length <= itemsPerPage"
        @update:options="loadItems"
      >
        <template #item.name="{item}">
          <div>
            <p class="paragraph-medium-semi-bold">{{ item.displayName }}</p>
            <p>{{ item.email }}</p>
          </div>
        </template>
        <template #item.action="{item}">
          <v-btn variant="text" color="destructive-600" @click="openDialog('reject', item.id)">
            Reject
          </v-btn>
          <v-btn variant="text" color="success-600" @click="openDialog('approve', item.id)">
            Approve
          </v-btn>
        </template>
      </v-data-table-server>
    </client-only>

    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        max-width="400"
        :text="dialogText"
        :title="dialogTitle"
      >
        <template #actions>
          <div class="d-flex justify-end w-100">
            <v-btn
              text="No"
              @click="cancel"
            />
            <v-btn
              text="Yes"
              color="primary"
              @click="confirm"
            />
          </div>
        </template>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<style scoped>
</style>
