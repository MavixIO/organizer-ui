<script lang="ts">
import type { SchoolPublicData } from '~/common/types'

export default {
  props: {
    schools: {
      type: Array<SchoolPublicData>,
      default: () => [],
    },
  },
  emits: ['onSelectSchool'],
  data: () => ({
    selected: 0,
  }),
  computed: {
    selectedSchool() {
      return this.schools![this.selected]
    },
    hasUsers() {
      return this.selectedSchool.hasUsers
    },
  },
  mounted() {
    this.selectSchool(this.selected)
  },
  methods: {
    selectSchool(index: number) {
      this.selected = index
      this.$emit('onSelectSchool', this.schools![index])
    },
  },
}
</script>

<template>
  <v-form ref="form">
    <section v-if="hasUsers">
      <h1 class="mb-1">
        Join Your School's Team
      </h1>
      <p class="text-gray mb-8">
        Your school is already registered and managed by an existing school admin. To make registrations or manage details on behalf of your school, please request to join.
      </p>
    </section>
    <section v-else>
      <h1 class="mb-1">
        Activate School Account
      </h1>
      <p class="text-gray mb-8">
        Activate your school account to begin registering for events. Setup is quick and easy, ensuring you're ready to participate with just a few clicks.
      </p>
    </section>
    <v-card
      v-for="(item, index) in schools"
      :key="item.id"
      class="d-flex align-center pa-5 mt-2"
      :class="{ selected: selected === index }"
      @click="selectSchool(index)"
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
  border: 1px rgb(var(--v-theme-primary)) solid;
  box-shadow: 0 0 0 1px rgb(var(--v-theme-primary));
}
</style>
