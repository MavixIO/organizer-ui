<script lang="ts">
import type { GetOrganisation } from '~/common/types'

export default {
  props: {
    organisations: Array<GetOrganisation>,
  },
  emits: ['onSelectOrganisation'],
  data: () => ({
    selected: 0,
  }),
  computed: {
    selectedOrganisation() {
      return this.organisations![this.selected]
    },
    hasUsers() {
      return this.selectedOrganisation.hasUsers
    },
  },
  mounted() {
    this.selectOrganisation(this.selected)
  },
  methods: {
    selectOrganisation(index: number) {
      this.selected = index
      this.$emit('onSelectOrganisation', this.organisations![index])
    },
  },
}
</script>

<template>
  <v-form ref="form">
    <h1 class="mb-1">
      Join Your Organization's Team
    </h1>
    <p class="text-gray mb-8">
      Your organisation is already registered and is currently managed by an existing admin. To create, manage, or make registrations for events on behalf of your organisation, please request to join.
    </p>
    <v-card
      v-for="(item, index) in organisations"
      :key="item.id"
      class="d-flex align-center pa-5 mt-2"
      :class="{ selected: selected === index }"
      @click="selectOrganisation(index)"
    >
      <v-img
        v-if="item.logo"
        class="mx-2"
        :src="item.logo"
        max-width="80"
        height="80"
      />
      <div>
        <p>{{ item.name }}</p>
        <p class="subtitle text-gray">
          {{ item.address }}
        </p>
      </div>
    </v-card>
  </v-form>
</template>

<style scoped>
.subtitle {
  font-size: 14px;
}

.selected {
  border: 2px rgb(var(--v-theme-primary)) solid;
}
</style>
