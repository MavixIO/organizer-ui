import { joinURL } from 'ufo'

export default defineEventHandler((event) => {
  const proxyUrl = useRuntimeConfig().proxyUrl
  const target = joinURL(proxyUrl, event.path)
  return proxyRequest(event, target)
})
