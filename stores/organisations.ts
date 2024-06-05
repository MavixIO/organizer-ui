import { defineStore } from 'pinia'
import type { Organization, User } from '~/common/types'
import type { UserStatus } from '~/enums'

interface RequestJoin {
  organizationId: string
  user: User
}

interface SignUp {
  displayRole: string
  user: User
  organization: Organization
}

interface UsersQuery {
  status: UserStatus
  page: number
  limit: number
  roleId: string
  search: string
}

export const useOrganisationsStore = defineStore('organisations', {
  actions: {
    async getOrganisationsByDomain(domain: string) {
      return $fetch(`/api/v1/organizations_by_email_domain/${domain}`)
    },
    async requestToJoin(body: RequestJoin) {
      return $fetch('/api/v1/signup/request_to_join_organization', { method: 'POST', body })
    },
    async signup(body: SignUp) {
      return $fetch('/api/v1/signup/organization', { method: 'POST', body })
    },
    async get(id: string) {
      return $fetch(`/api/v1/organizations/${id}`)
    },
    async getUsers({ id, query }: { id: string, query?: UsersQuery }) {
      return $fetch(`/api/v1/organizations/${id}/users`, { query })
    },
    async approveUser({ id, userId, roleId }: { id: string, userId: string, roleId?: string }) {
      return $fetch(`/api/v1/organizations/${id}/users/${userId}/approve`, { method: 'POST', body: { roleId } })
    },
    async rejectUser({ id, userId }: { id: string, userId: string }) {
      return $fetch(`/api/v1/organizations/${id}/users/${userId}/reject`, { method: 'POST' })
    },
  },
})
