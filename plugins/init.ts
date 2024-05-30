import { defineNuxtPlugin } from '#app'
import { useContextStore } from '@/stores/context'

export default defineNuxtPlugin(async () => {
  const nuxtApp = useNuxtApp()
  const store = useContextStore(nuxtApp.$pinia)
  await store.fetchContext()
})
