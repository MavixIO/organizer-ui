import { defineStore } from 'pinia'
import type { Organization, User } from '~/common/types'

interface RequestJoin {
  organizationId: string
  user: User
}

interface SignUp {
  displayRole: string
  user: User
  organization: Organization
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
  },
})
