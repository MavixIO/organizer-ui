<script lang="ts">
import { Role } from '~/enums'

export default {
  props: {
    modelValue: String,
  },
  emits: ['update:modelValue'],
  data: () => ({
    roles: [
      {
        id: Role.COORDINATOR,
        icon: 'calendar',
        title: 'Event Coordinator',
        description: 'Register as an organiser to manage and coordinate registrations and events for schools and directly with parents.',
      },
      {
        id: Role.STAFF,
        icon: 'school',
        title: 'School Staff',
        description: 'For school administrators, teachers, and finance staff responsible for organising and overseeing school events and trips.',
      },
    ],
  }),
  computed: {
    selected() {
      return this.roles.findIndex(item => item.id === this.modelValue)
    },
  },
  methods: {
    select(index: number) {
      this.$emit('update:modelValue', this.roles[index].id)
    },
  },
}
</script>

<template>
  <div>
    <h1 class="mb-7">
      Choose your Role To Get Started
    </h1>
    <div>
      <SelectableElement
        :title="roles[0].title"
        :description="roles[0].description"
        :selected="selected === 0"
        class="mt-3"
        @click="select(0)"
      >
        <SvgoCalendar
          width="32"
          height="32"
        />
      </SelectableElement>
      <SelectableElement
        :title="roles[1].title"
        :description="roles[1].description"
        :selected="selected === 1"
        class="mt-3"
        @click="select(1)"
      >
        <SvgoSchool
          width="32"
          height="32"
        />
      </SelectableElement>
    </div>
  </div>
</template>

<style>
.selected svg path {
  stroke: rgb(var(--v-theme-primary));
}
</style>
