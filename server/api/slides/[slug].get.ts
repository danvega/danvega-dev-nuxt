import { slideDecks } from '../../data/slides'

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug || !slideDecks[slug]) {
    throw createError({ statusCode: 404, statusMessage: 'Slide deck not found' })
  }

  return slideDecks[slug]
})
