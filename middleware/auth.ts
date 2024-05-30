import { useContextStore } from '@/stores/context'

export default defineNuxtRouteMiddleware(() => {
  const context = useContextStore()

  if (!context.isLoggedIn) {
    return navigateTo({ name: 'registration' })
  }
})
