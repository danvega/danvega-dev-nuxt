import { speakingPhotos } from '../../../data/speaking-photos'

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    return []
  }

  return speakingPhotos[slug] || []
})
