import events from '~/assets/data/events.json'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // Return only upcoming events if requested
  if (query.upcoming === 'true') {
    const upcomingEvents = events
      .filter((event) => {
        const eventDate = new Date(event.startDate)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return event.startDate && eventDate >= today
      })
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

    return upcomingEvents
  }

  // Return all events by default, sorted by date (newest first)
  const sortedEvents = events.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())

  return sortedEvents
})