import { defineStore } from 'pinia'

export const useContextStore = defineStore('context', {
  state: () => ({
    me: null,
  }),

  getters: {
    isLoggedIn: state => !!state.me,
  },

  actions: {
    async callback(query: object) {
      return $fetch('/api/v1/auth/callback', { query }).catch(e => console.error(e))
    },

    async fetchContext() {
      try {
        const headers = useRequestHeaders(['cookie'])
        const { data } = await useFetch('/api/v1/auth/context', { headers })
        this.me = data.value.user || null
      }
      catch (e) {
        // console.error(e)
      }
    },

    async signUpSchool({ email, password }: { email: string, password: string }) {
      await $fetch('/api/v1/signup/school', {
        method: 'POST',
        body: {
          email,
          password,
        },
      })
    },

    async logOut() {
      await $fetch('/api/v1/logout')
      this.me = null
    },
  },
})
