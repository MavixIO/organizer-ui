import { defineStore } from 'pinia'
import type { School, User } from '~/common/types'
import type { UserStatus } from '~/enums'

interface RequestJoin {
  schoolId: string
  user: User
}

interface SignUp {
  displayRole: string
  user: User
  school: School
}

interface UsersQuery {
  status: UserStatus
  page: number
  limit: number
  roleId: string
  search: string
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
    async get(id: string) {
      return $fetch(`/api/v1/schools/${id}`)
    },
    async getUsers({ id, query }: { id: string, query: UsersQuery }) {
      return $fetch(`/api/v1/schools/${id}/users`, { query })
    },
  },
})
