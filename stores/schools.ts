import { defineStore } from 'pinia'
import type { School, User } from '~/common/types'

interface RequestJoin {
  schoolId: string
  user: User
}

interface SignUp {
  displayRole: string
  user: User
  school: School
}

export const useSchoolsStore = defineStore('schools', {
  actions: {
    async getSchoolsByDomain(domain: string) {
      return $fetch(`/api/v1/schools_by_email_domain/${domain}`)
    },
    async requestToJoin(body: RequestJoin) {
      return $fetch('/api/v1/signup/request_to_join_school', { method: 'POST', body })
    },
    async signup(body: SignUp) {
      return $fetch('/api/v1/signup/school', { method: 'POST', body })
    },
  },
})
