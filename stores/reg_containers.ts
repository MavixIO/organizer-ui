import { defineStore } from 'pinia'

export const useRegContainersStore = defineStore('regContainers', {
  actions: {
    async getRegPurposes() {
      return $fetch('/api/v1/registration_purposes')
    },
  },
})
