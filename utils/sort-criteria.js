import dayjs from 'dayjs'

const publicationDate = (a, b) => {
  if (dayjs(b.meta.publicationDate).isAfter(dayjs(a.meta.publicationDate))) return 1
  return -1
}

const lastUpdatedDate = (a, b) => {
  const dateA = a.meta.lastUpdatedDate ? a.meta.lastUpdatedDate : a.meta.publicationDate
  const dateB = b.meta.lastUpdatedDate ? b.meta.lastUpdatedDate : b.meta.publicationDate
  if (dayjs(dateB).isAfter(dayjs(dateA))) return 1
  return -1
}

export { lastUpdatedDate, publicationDate }
